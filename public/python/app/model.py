import pulp
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from bisect import insort
from collections import defaultdict
import re

def main(data_list):
    # merged_data = merge_orders(data_list)

    orders = []
    order_specs = defaultdict(list)

    for item in data_list:
        NoOrder = item['NoOrder']
        orders.append(NoOrder)
        # Menambahkan dictionary ke dalam list, bukan menggantikan nilai sebelumnya
        order_specs[NoOrder].append({
            'Lebar': item['Lebar'],
            'RjtWA': item['RjtWA'],
            'RjtWE': item['RjtWE'],
            'Denier': item['Denier'],
            'Corak': item['Corak'],
            'BngWA': item['BngWA'],
            'BngWE': item['BngWE'],
            'Jumlah': item['Jumlah'],
            'TglMulai': item['TglMulai'],
            'Mesin': item['Mesin'],
            'PnjPotong': item['PnjPotong'],
            'Keterangan': item['Keterangan'],
        })

    return {'orders': orders, 'order_specs': order_specs}

#  fungsi ambil semua jumlah dan pilah jumlah yg ada +MESIN
def proses_jumlah_orders(orders, order_specs):
    seen = set()
    unique_orders = []

    for o in orders:
        if o not in seen:
            unique_orders.append(o)
            seen.add(o)

    jumlah_all = defaultdict(list)
    jumlah_order = {}
    valid_orders = []

    # Loop untuk mengiterasi unique orders
    for o in unique_orders:
        base_spec = None  # Menyimpan base spec
        mesin_plus = 0    # Jumlah mesin tambahan
        total_jumlah = 0  # Total jumlah untuk menggabungkan +MESIN atau +ORDER

        for spec in order_specs[o]:
            jumlah_str = spec['Jumlah'].upper()
            jumlah_all[o].append(jumlah_str)

            # Proses jika jumlah tidak mengandung '+MESIN' atau '+ORDER'
            if '+MESIN' not in jumlah_str and 'MSN' not in jumlah_str:
                if '+' in jumlah_str:  # Jika jumlah adalah penambahan (misalnya '+20,000')
                    # print(f"[SKIP] Order {o} memiliki jumlah tambahan, tidak bisa diproses.")
                    continue  # Skip jika jumlahnya adalah penambahan
                try:
                    jumlah = float(jumlah_str.replace('.', '').replace(',', '').strip())
                    if base_spec is None:  # Jika belum ada base spec, tentukan base spec
                        base_spec = spec
                    total_jumlah += jumlah  # Tambahkan jumlahnya
                except ValueError:
                    print(f"[SKIP] Jumlah tidak valid di order {o}: '{jumlah_str}'")

            # Proses jika +MESIN ditemukan
            elif '+MESIN' in jumlah_str:
                if o in jumlah_order:  # Pastikan jumlah_order sebelumnya ada
                    # try:
                        mesin_plus += extract_mesin(spec['Mesin'])  # Ambil jumlah mesin dari Mesin
                    # except ValueError:
                        # print(f"[SKIP] Jumlah mesin tidak valid di order {o}: '{jumlah_str}'")
                else:
                    print(f"[SKIP] Tidak ada jumlah sebelumnya untuk order {o} - tidak bisa proses +MESIN")

        # Gabungkan jumlah dan mesin hanya jika ada base_spec
        if base_spec and total_jumlah > 0:
            # Tambahkan mesin jika ada
            if mesin_plus > 0:
                mesin_base = extract_mesin(base_spec['Mesin'])
                mesin_total = mesin_base + mesin_plus
                base_spec['Mesin'] = f"{mesin_total} MESIN"

            # Update jumlah dan masukkan ke valid_orders jika ada base_spec
            base_spec['Jumlah'] = str(total_jumlah)
            jumlah_order[o] = total_jumlah
            valid_orders.append(o)
            jumlah_all[o] = [str(total_jumlah)]  # Update jumlah order dengan yang sudah digabung

        # Jika base_spec tidak ada, artinya order ini tidak valid untuk penggabungan
        else:
            print(f"[SKIP] Order {o} tidak valid untuk digabungkan.")

    return jumlah_all, jumlah_order, valid_orders

# Fungsi untuk mengambil jumlah mesin dari string
def extract_mesin(jumlah_mesin_str):
    match = re.match(r'(\d+)\s*MESIN', jumlah_mesin_str.upper())
    if match:
        return int(match.group(1))  # Ambil angka yang ditemukan
    return 1  # Jika tidak ada angka MESIN, return 0

# Fungsi tambah jumlah Mesin
def add_mesin(order_specs):
    updated_order_specs = defaultdict(list)

    for no_order, specs in order_specs.items():
        ada_plus_mesin = any(str(s['Jumlah']).strip().upper() == '+MESIN' for s in specs)

        if ada_plus_mesin:
            total_mesin = 0
            base_spec = None

            for spec in specs:
                jumlah = str(spec['Jumlah']).strip().upper()
                mesin = extract_mesin(spec['Mesin'])

                if jumlah == '+MESIN':
                    total_mesin += mesin
                else:
                    try:
                        # pastikan hanya menerima nilai angka valid sebagai base
                        _ = float(jumlah.replace('.', '').replace(',', '').strip())
                        base_spec = spec
                        total_mesin += mesin  # tambahkan juga mesin dari base
                    except ValueError:
                        continue

            if base_spec:
                base_spec['Mesin'] = f"{total_mesin} MESIN"
                updated_order_specs[no_order].append(base_spec)
            else:
                updated_order_specs[no_order] = specs  # fallback: tidak ada base yang valid
        else:
            updated_order_specs[no_order] = specs  # tidak ada +MESIN, simpan semua

    return updated_order_specs

def generate_shift_intervals(start_hour, end_hour):
    return [f"{str(h%24).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(start_hour, end_hour)]

# def job_desc(valid_orders, order_specs, machines, jumlah_order):
    kapasitas_mesin = {}
    durasi_pekerjaan = {}
    assigned_machines = {}  # Menggunakan dictionary
    job = []

    for o in valid_orders:
        assigned_machines[o] = []  # Inisialisasi list untuk setiap order
        for spec in order_specs[o]:
            mesin_dibutuhkan = extract_mesin(spec["Mesin"])

            for m in machines:  # Pilih mesin sesuai jumlah yang dibutuhkan
                if len(assigned_machines[o]) < mesin_dibutuhkan:
                    assigned_machines[o].append(m)

            RjtWE = float(spec['RjtWE'])  # Ambil Weft dari order_specs

            # Hitung kapasitas mesin dan durasi total pekerjaan untuk order ini
            kapasitas_mesin[o] = ((100 * 6 * 2.54) / RjtWE) * 60  # Kapasitas mesin dalam meter/jam
            durasi_total = jumlah_order[o] / kapasitas_mesin[o]
            durasi_pekerjaan[o] = durasi_total / mesin_dibutuhkan  # Durasi per mesin

            # Menyimpan informasi pekerjaan dalam format yang benar
            job.append({
                'Ord': o,
                'JmlMesin': mesin_dibutuhkan,
                'Durasi': durasi_pekerjaan[o],
                'Mesin': assigned_machines[o]
            })

    return job

def waktu_ke_menit(jam_str, day_index):
    jam, menit = map(int, jam_str.split(":"))
    return day_index * 24 * 60 + jam * 60 + menit

def buat_model(orders, order_specs):
    # print("Orders:", orders)
    order_specs = add_mesin(order_specs)
    # print("Order Specs:", order_specs)

    # SET
    days = [0, 1, 2, 3, 4, 5, 6]
    shift_intervals = {
        'pagi': generate_shift_intervals(7, 15),
        'sore': generate_shift_intervals(15, 23),
        'malam': generate_shift_intervals(23, 31)
    }

    # mesin berdasarkan adjusted eff
    mesin = r"C:\Users\Evelyn\Downloads\summary_adjusted_eff.csv"
    df = pd.read_csv(mesin)
    sorted_mesin = df.sort_values(by='AdjustedEff', ascending=False)
    mesin_raw = sorted_mesin['NoMesin'].tolist()
    machines = [m.replace('-', '') for m in mesin_raw]
    # print(machines)
    special_machines = ['ST07', 'ST08'] + ['ST{:02d}'.format(i) for i in range(25,33)] # mesin Lebar & Dn besar

    # SDP Mapping
    SDP_CL1 = ['SO{:02d}'.format(i) for i in range(1, 17)]
    SDP_CL2 = ['SO{:02d}'.format(i) for i in range(17, 33)]
    SDP_CL3 = ['SO{:02d}'.format(i) for i in range(33, 41)] + ['ST{:02d}'.format(i) for i in range(1, 5)]
    SDP_CL4 = ['ST{:02d}'.format(i) for i in list(range(5,13)) + list(range(25,29)) + list(range(33,45))]
    SDP_CL5 = ['ST{:02d}'.format(i) for i in list(range(13,25)) + list(range(45,69))]
    SDP_CL6 = ['ST{:02d}'.format(i) for i in list(range(29,33)) + list(range(69,77))]

    SDP_rest_allowed = SDP_CL1 + SDP_CL2 + SDP_CL3 + SDP_CL4

    # Mesin per SDP
    SDP_mapping = {
        'CL1': SDP_CL1,
        'CL2': SDP_CL2,
        'CL3': SDP_CL3,
        'CL4': SDP_CL4,
        'CL5': SDP_CL5,
        'CL6': SDP_CL6,
    }
    SDP_names = list(SDP_mapping.keys())


    jumlah_all, jumlah_order, valid_orders = proses_jumlah_orders(orders, order_specs)
    print(valid_orders)
    # job = job_desc(valid_orders, order_specs, machines, jumlah_order)
    # print(job)

    # PROBLEM
    prob = pulp.LpProblem("Scheduling_Minimize_Max_SDP_Load", pulp.LpMinimize)

    # VARIABLES
    intervals = [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(24)]
    istirahat_intervals = ['19:00-20:00', '20:00-21:00']

    x = {
        m: {
            o: {
                d: {
                    s: pulp.LpVariable(f"x_{m}_{o}_{d}_{s}", cat="Binary")
                    for s in intervals
                }
                for d in days
            }
            for o in orders
        }
        for m in machines
    }
    # y = pulp.LpVariable.dicts("y", (machines, valid_orders), cat="Binary")


    r = pulp.LpVariable.dicts("rest", (machines, days), cat="Binary")
    # start = pulp.LpVariable.dicts("start", (machines, orders, days, intervals), cat="Binary")

    # waktu 24 jam
    all_intervals = [
        f"{str(h % 24).zfill(2)}:00-{str((h + 1) % 24).zfill(2)}:00"
        for h in range(7, 31)
    ]

    # Per hari, daya listrik maksimum SDP
    max_load_per_day = pulp.LpVariable.dicts("max_load", days, cat="Continuous", lowBound=0)

    # INTERNAL: total aktif mesin di setiap SDP setiap hari
    # load_SDP_day = pulp.LpVariable.dicts("load_SDP_day", (SDP_names, days), cat="Continuous", lowBound=0)

    # Tambahkan variabel sisa waktu kerja
    # sisa_pekerjaan = pulp.LpVariable.dicts("sisa_pekerjaan", (machines, orders, days), lowBound=0)

    assigned_machines = defaultdict(list)

    # start_time = defaultdict(dict)

    # for o in valid_orders:
    #     for m in assigned_machines.get(o, []):
    #         start_time[o][m] = pulp.LpVariable(f"start_time_{o}_{m}", lowBound=0, cat='Continuous')

    # OBJECTIVE
    prob += pulp.lpSum(max_load_per_day[d] for d in days)

    # CONSTRAINTS
    # 1. Mesin khusus ST07, ST08, ST25-32 hanya boleh kerjakan order Lebar > 110 dan Denier > 1000
    for m in special_machines:
        for o in orders:
            for spec in order_specs[o]:
                if float(spec['Lebar']) <= 110 or float(spec['Denier']) <= 1000:
                    assigned_machines[o].append(m)
                    for d in days:
                        for s in intervals:
                            prob += x[m][o][d][s] == 0

    # 2. Mesin dari SDP CL1-CL4 bisa istirahat, jika mesin beristirahat mulai jam 19.00, update r[m][d] menjadi 1
    for m in SDP_rest_allowed:
        for d in days:
            istirahat = [interval for interval in shift_intervals['sore'] if interval in istirahat_intervals]
            # Menambahkan constraint untuk memeriksa apakah mesin mengerjakan order pada shift istirahat
            prob += r[m][d] == pulp.lpSum(x[m][o][d][s] for o in orders for s in istirahat)  # Periksa apakah mesin mengerjakan order di shift istirahat
            # Mengatur r[m][d] menjadi 1 jika ada pekerjaan pada interval istirahat
            prob += r[m][d] >= pulp.lpSum(x[m][o][d][s] for o in orders for s in istirahat)


    # 3. Mesin di SDP CL5, CL6 tidak bisa istirahat
    for m in (SDP_CL5 + SDP_CL6):
        for d in days:
            prob += r[m][d] == 0

    # 4. Jumlah mesin istirahat per hari hanya boleh 3
    for d in days:
        prob += pulp.lpSum(r[m][d] for m in SDP_rest_allowed) == 3

    # 5. Kapasitas, durasi
    kapasitas_mesin = {}
    durasi_pekerjaan = {}
    mesin_dibutuhkan = {}

    for o in valid_orders:
        for spec in order_specs[o]:
            mesin_dibutuhkan[o] = extract_mesin(spec["Mesin"])

            RjtWE = float(spec['RjtWE'])

            # Hitung kapasitas mesin (meter/jam)
            kapasitas_mesin[o] = ((100 * 6 * 2.54) / RjtWE) * 60

            # Total durasi (jam)
            durasi_total = jumlah_order[o] / kapasitas_mesin[o]

            # Durasi per mesin (karena order dibagi ke beberapa mesin)
            durasi_pekerjaan[o] = durasi_total / mesin_dibutuhkan[o]

            # Constraint total alokasi waktu untuk order ini
            prob += pulp.lpSum(
                x[m][o][d][s]
                for d in days
                for m in assigned_machines[o]
                for s in all_intervals
            ) <= durasi_pekerjaan[o]

        # print(f"Order: {o}, Jumlah: {jumlah_order[o]}, Mesin Dibutuhkan: {mesin_dibutuhkan[o]}, Durasi Pekerjaan: {durasi_pekerjaan[o]}, Mesin: {assigned_machines[o]}")


    # 6. Mesin hanya boleh 1 order per jam
    for m in machines:
        for d in days:
            for h in range(24):
                prob += pulp.lpSum(x[m][o][d][s] for o in valid_orders if m in assigned_machines[o]
                                    for s in all_intervals if int(s.split('-')[0].split(':')[0]) == h
                                    ) <= 1

    # 7. Constraint “No Overlap” per mesin per hari
    for m in machines:
        for d in days:
            for s in all_intervals:
                prob += pulp.lpSum(
                    x[m][o][d][s] for o in valid_orders if m in assigned_machines[o]) <= 1


    # 8. Atur jam mulai di shift pagi hari Day 0
    for o in valid_orders:
        for m in assigned_machines[o]:
            if 'pagi' in shift_intervals:
                prob += pulp.lpSum(x[m][o][0][interval] for interval in shift_intervals['pagi']) >= 1

    # 9. Prioritas Jumlah
    # Urutkan order berdasarkan Jumlah secara descending
    sorted_jumlah = sorted(valid_orders, key=lambda o: jumlah_order[o], reverse=True)

    # Assign mesin
    assigned_machines = {}
    mesin_index = 0
    bngwe_to_machine = {}       # Simpan mesin yang sudah digunakan untuk BngWE tertentu

    for o in sorted_jumlah:
        assigned_machines[o] = []
        used_machines = set()  # Melacak mesin yang sudah digunakan untuk order ini

        for spec in order_specs[o]:
            jumlah_mesin = extract_mesin(spec["Mesin"])
            bngwe = spec.get("BngWE")

            for _ in range(jumlah_mesin):
                if bngwe in bngwe_to_machine:
                    # Mesin yang sudah pernah dipakai untuk BngWE ini, pastikan mesin belum digunakan
                    m = bngwe_to_machine[bngwe]
                    if m in used_machines:
                        # Cari mesin lain yang belum digunakan
                        m = next(machine for machine in machines if machine not in used_machines)
                else:
                    # Ambil mesin baru
                    m = machines[mesin_index % len(machines)]
                    bngwe_to_machine[bngwe] = m

                assigned_machines[o].append(m)
                used_machines.add(m)  # Tandai mesin telah digunakan untuk order ini
                mesin_index += 1

            prob += pulp.lpSum(x[m][o][d][s] for m in machines for o in valid_orders for d in days for s in all_intervals)
    print(assigned_machines)

    # FIFO
    # Step 1: Ambil tanggal mulai order
    order_start_dates = {}
    for o in valid_orders:
        for spec in order_specs[o]:
            tgl = spec.get("TglMulai")
            if tgl:
                try:
                    order_start_dates[o] = datetime.strptime(tgl, "%d/%m/%Y")
                except:
                    order_start_dates[o] = datetime.max  # fallback kalau tanggal salah format
            else:
                order_start_dates[o] = datetime.max

    # Step 2: Urutkan berdasarkan TglMulai
    sorted_tgl = sorted(valid_orders, key=lambda x: order_start_dates.get(x, datetime.max))

    # Step 3: Tambahkan constraint FIFO untuk order di mesin yang sama
    for i in range(len(sorted_tgl)):
        for j in range(i + 1, len(sorted_tgl)):
            oi = sorted_tgl[i]
            oj = sorted_tgl[j]

            mesin_i = set(assigned_machines[oi])
            mesin_j = set(assigned_machines[oj])
            mesin_sama = mesin_i & mesin_j

            if mesin_sama:
                for m in mesin_sama:
                    jam_awal = s.split('-')[0]
                    start_oi = pulp.lpSum(x[m][oi][d][s] * waktu_ke_menit(jam_awal, d) for d in days for s in all_intervals)
                    start_oj = pulp.lpSum(x[m][oj][d][s] * waktu_ke_menit(jam_awal, d) for d in days for s in all_intervals)
                    prob += start_oi <= start_oj

    # #13. Alokasikan mesin dan order untuk interval tertentu
    # for m in machines:
    #     for o in valid_orders:
    #         for d in days:
    #             for i in range(1, len(all_intervals)):
    #                 prev = all_intervals[i - 1]
    #                 curr = all_intervals[i]
    #                 # Jika interval sekarang aktif, maka interval sebelumnya harus aktif juga
    #                 prob += x[m][o][d][curr] <= x[m][o][d][prev] + (1 - pulp.lpSum(start[m][o][d][s] for s in all_intervals))  # allow first active block


    # 16. Menghitung beban tertinggi untuk setiap SDP pada setiap hari
    # for d in days:
    #     for sdp in SDP_names:
    #         max_beban = pulp.lpSum(load_SDP_day[sdp][d] for m in machines if m in SDP_rest_allowed)  # Beban tertinggi di SDP CL1-4
    #         for m in machines:
    #             # Jika mesin adalah mesin dengan beban tertinggi pada SDP CL
    #             if pulp.lpSum(load_SDP_day[sdp][d] for m in machines if m == m) == max_beban and m in SDP_rest_allowed:
    #                 prob += r[m][d] == 1  # Mesin bisa diistirahatkan
    #             else:
    #                 prob += r[m][d] == 0  # Mesin tetap bekerja

    ## 17. Mengatur mesin yang diistirahatkan (r[m][d] == 1) untuk tidak mengerjakan order pada shift tertentu
    # for m in machines:
    #     for d in days:
    #         for interval in intervals_by_day[d]:
    #             prob += pulp.lpSum(x[m][o][d][interval] for o in orders) <= (1 - r[m][d])

    # # No overlap constraint
    # for o in valid_orders:
    #     for m in assigned_machines.get(o, []):
    #         interval_expr = []
    #         for d in days:
    #             for interval in all_intervals:
    #                 hour = int(interval.split('-')[0].split(':')[0])
    #                 interval_expr.append(hour * start[m][o][d][interval])
    #         prob += start_time[o][m] == pulp.lpSum(interval_expr)

    # big_M = 200
    # for m in machines:
    #     for i, o1 in enumerate(valid_orders):
    #         for o2 in valid_orders[i + 1:]:
    #             if m in assigned_machines[o1] and m in assigned_machines[o2]:
    #                 before = pulp.LpVariable(f"before_{m}_{o1}_{o2}", cat='Binary')

    #                 dur1 = int(round(durasi_pekerjaan[o1]))
    #                 dur2 = int(round(durasi_pekerjaan[o2]))

    #                 prob += (
    #                     start_time[o2][m] >= start_time[o1][m] + dur1 - (1 - before) * big_M
    #                 )
    #                 prob += (
    #                     start_time[o1][m] >= start_time[o2][m] + dur2 - before * big_M
    #                 )


    # for o in valid_orders:
    #     for m in assigned_machines[o]:
    #         for d in days:
    #             if d != 0:  # Jika hari bukan hari target (selain hari 0)
    #                 # Pastikan shift pagi ada sebelum mengakses
    #                 if 'malam' in shift_intervals:
    #                     for interval in shift_intervals['malam']:  # Iterasi shift pagi
    #                         prob += x[m][o][d][interval] == 0  # Set semua interval pada hari selain hari 0 menjadi 0
    #             else:  # Jika hari adalah hari 0 (misalnya hari target)
    #                 # Pastikan shift pagi ada sebelum mengakses
    #                 if 'pagi' in shift_intervals:
    #                     for interval in shift_intervals['pagi']:  # Tetap menggunakan semua interval di shift 'pagi'
    #                         prob += x[m][o][0][interval] == 1  # Set semua interval di hari 0 menjadi 1 (menandakan jam mulai)


    # SOLVE
    prob.solve()
    print("Status:", pulp.LpStatus[prob.status])

    # Generate jadwal
    jadwal_produksi = []
    waktu_terpakai = {}

    for o in sorted_jumlah:
        for m in assigned_machines[o]:
            aktif_slots = []
            sisa_durasi = durasi_pekerjaan[o] * 60  # dalam menit

            # for d in days:
            #     for s in all_intervals:
            #         if pulp.value(x[m][o][d][s]) == 1:
            #             aktif_slots.append((d, s))

            # aktif_slots.sort(key=lambda x: (x[0], waktu_ke_menit(x[1], x[0])))  # benar-benar urut waktu

            for d in days:
                if sisa_durasi <= 0:
                    break

                for shift in ['pagi']:
                    for interval in shift_intervals[shift]:
                        if pulp.value(x[m][o][d][interval]) is not None:
                            aktif_slots.append((d, interval))

            if not aktif_slots:
                print(f"[WARNING] Mesin {m} tidak aktif untuk order {o}")
                continue

            aktif_slots.sort(key=lambda x: (x[0], int(x[1].split('-')[0].split(':')[0])))

            d_mulai, interval_mulai = aktif_slots[0]
            jam_mulai = int(interval_mulai.split('-')[0].split(':')[0])
            menit_awal = jam_mulai * 60

            hari = d_mulai
            while sisa_durasi > 0:
                if m not in waktu_terpakai:
                    waktu_terpakai[m] = {}

                if hari not in waktu_terpakai[m]:
                    waktu_terpakai[m][hari] = []

                kapasitas_hari_ini = 1440 - menit_awal
                durasi_hari_ini = min(sisa_durasi, kapasitas_hari_ini)
                jam_selesai = int((menit_awal + durasi_hari_ini) // 60)
                menit_selesai = int((menit_awal + durasi_hari_ini) % 60)

                # Cek benturan waktu dan mencoba menggeser
                bentrok = False
                for mulai, selesai in waktu_terpakai[m][hari]:
                    if not (menit_awal >= selesai or (menit_awal + durasi_hari_ini) <= mulai):
                        bentrok = True
                        break

                if bentrok:
                    # Urutkan waktu terpakai terlebih dahulu
                    waktu_terpakai[m][hari].sort()

                    # Coba geser ke kanan terlebih dahulu
                    for idx, (start, end) in enumerate(waktu_terpakai[m][hari]):
                        # Cek slot kosong setelah jadwal yang bentrok
                        if idx == len(waktu_terpakai[m][hari]) - 1:
                            gap_akhir = 1440 - end  # Waktu kosong setelah slot terakhir
                        else:
                            gap_akhir = waktu_terpakai[m][hari][idx + 1][0] - end

                        if gap_akhir >= durasi_hari_ini:
                            menit_awal = end
                            jam_selesai = int((menit_awal + durasi_hari_ini) // 60)
                            menit_selesai = int((menit_awal + durasi_hari_ini) % 60)
                            bentrok = False
                            break

                    # Jika tidak bisa geser ke kanan, coba geser ke kiri
                    if bentrok:
                        for idx, (start, end) in enumerate(waktu_terpakai[m][hari]):
                            if idx == 0:
                                gap_awal = start  # Waktu kosong sebelum slot pertama
                            else:
                                gap_awal = start - waktu_terpakai[m][hari][idx - 1][1]

                            if gap_awal >= durasi_hari_ini:
                                menit_awal = max(0, start - durasi_hari_ini)
                                jam_selesai = int((menit_awal + durasi_hari_ini) // 60)
                                menit_selesai = int((menit_awal + durasi_hari_ini) % 60)
                                bentrok = False
                                break

                # Jika masih bentrok setelah mencoba geser
                if bentrok:
                    hari += 1
                    menit_awal = 0
                    continue


                # Simpan waktu
                insort(waktu_terpakai[m][hari], (menit_awal, menit_awal + durasi_hari_ini))

                jadwal_produksi.append({
                    'Order': o,
                    'Mesin': m,
                    'Hari': f'Day {hari}',
                    'Jam Mulai': f"{str(menit_awal // 60).zfill(2)}:{str(menit_awal % 60).zfill(2)}",
                    'Jam Selesai': f"{str(jam_selesai).zfill(2)}:{str(menit_selesai).zfill(2)}"
                })

                sisa_durasi -= durasi_hari_ini
                hari += 1
                menit_awal = 0  # hari berikutnya mulai dari 00:00


    # Konversi ke DataFrame untuk kemudahan manipulasi dan visualisasi
    df_jadwal = pd.DataFrame(jadwal_produksi)
    print(df_jadwal)

    # Menampilkan DataFrame dalam format tabel
    return df_jadwal.to_dict(orient='records')

