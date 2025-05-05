import pulp
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
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

    for o in unique_orders:
        for spec in order_specs[o]:
            jumlah_str = spec['Jumlah'].upper()
            jumlah_all[o].append(jumlah_str)

            if o not in jumlah_order and '+MESIN' not in jumlah_str and 'MSN' not in jumlah_str:
                try:
                    jumlah_order[o] = float(jumlah_str.replace(',', '').strip())
                    valid_orders.append(o)
                except ValueError:
                    print(f"[SKIP] Jumlah tidak valid di order {o}: '{jumlah_str}'")

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
        if len(specs) > 1:
            base_spec = None
            mesin_plus = 0

            for spec in specs:
                jumlah = str(spec['Jumlah']).strip().upper()
                if jumlah == '+MESIN':
                    mesin_plus += extract_mesin(spec['Mesin'])
                else:
                    try:
                        _ = float(jumlah.replace(',', ''))  # pastikan valid angka
                        base_spec = spec
                    except ValueError:
                        continue

            if base_spec and mesin_plus > 0:
                mesin_base = extract_mesin(base_spec['Mesin'])
                mesin_total = mesin_base + mesin_plus
                base_spec['Mesin'] = (f"{mesin_total} MESIN")
                updated_order_specs[no_order].append(base_spec)
            else:
                # jika tidak ditemukan kombinasi valid, simpan semuanya apa adanya
                updated_order_specs[no_order] = specs
        else:
            updated_order_specs[no_order] = specs

    return updated_order_specs

def generate_shift_intervals(start_hour, end_hour):
    return [f"{str(h%24).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(start_hour, end_hour)]

def is_first_day(d):
    return d == 0  # Hari pertama adalah hari dengan d == 1

def is_within_first_day_interval(s):
    # Format interval waktu: "07:00-08:00", "08:00-09:00", dll.
    start_time = s.split('-')[0]  # Ambil waktu mulai, contoh: "07:00"
    start_hour = int(start_time.split(':')[0])  # Ambil jam dari waktu mulai

    # Membatasi interval waktu antara 07:00 dan 23:59
    return 7 <= start_hour <= 23  # Pastikan jam mulai antara 07:00 dan 23:00 (rentang 17 jam)

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
    machines = ['SO{:02d}'.format(i) for i in range(1, 41)] + ['ST{:02d}'.format(i) for i in range(1, 77)]
    special_machines = ['ST07', 'ST08'] + ['ST{:02d}'.format(i) for i in range(25,33)]

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

    # Mengubah shift sore menjadi interval per jam


    jumlah_all, jumlah_order, valid_orders = proses_jumlah_orders(orders, order_specs)
    print(valid_orders)
    # job = job_desc(valid_orders, order_specs, machines, jumlah_order)
    # print(job)

    # PROBLEM
    prob = pulp.LpProblem("Scheduling_Minimize_Max_SDP_Load", pulp.LpMinimize)

    # VARIABLES
    intervals = [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(24)]
    # Menentukan jam istirahat yang relevan
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
    # 1. Interval 24 jam
    # intervals_by_day = {}

    # for d in days:
    #     if d == 0:
    #         # Hari 0: 07:00 - 24:00
    #         intervals_by_day[d] = [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(7, 24)]
    #     else:
    #         # Hari 1, 2, ...: 00:00 - 24:00
    #         intervals_by_day[d] = [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(0, 24)]


    # 2. Mesin khusus ST07, ST08, ST25-32 hanya boleh kerjakan order Lebar > 110 dan Denier > 1000
    for m in special_machines:
        for o in orders:
            for spec in order_specs[o]:
                if float(spec['Lebar']) <= 110 or float(spec['Denier']) <= 1000:
                    assigned_machines[o].append(m)
                    for d in days:
                        for s in intervals:
                            prob += x[m][o][d][s] == 0

    # 3. Mesin dari SDP CL1-CL4 bisa istirahat, jika mesin beristirahat mulai jam 19.00, update r[m][d] menjadi 1
    for m in SDP_rest_allowed:
        for d in days:
            istirahat = [interval for interval in shift_intervals['sore'] if interval in istirahat_intervals]
            # Menambahkan constraint untuk memeriksa apakah mesin mengerjakan order pada shift istirahat
            prob += r[m][d] == pulp.lpSum(x[m][o][d][s] for o in orders for s in istirahat)  # Periksa apakah mesin mengerjakan order di shift istirahat
            # Mengatur r[m][d] menjadi 1 jika ada pekerjaan pada interval istirahat
            prob += r[m][d] >= pulp.lpSum(x[m][o][d][s] for o in orders for s in istirahat)


    # 4. Mesin di SDP CL5, CL6 tidak bisa istirahat
    for m in (SDP_CL5 + SDP_CL6):
        for d in days:
            prob += r[m][d] == 0

    # 5. Jumlah mesin istirahat per hari hanya boleh 3
    for d in days:
        prob += pulp.lpSum(r[m][d] for m in SDP_rest_allowed) == 3

    # Kapasitas, durasi, penyebaran mesin
    kapasitas_mesin = {}
    durasi_pekerjaan = {}
    mesin_dibutuhkan = {}
    assigned_machines = {}  # Menggunakan dictionary
    mesin_index = 0

    for o in valid_orders:
        assigned_machines[o] = []
        for spec in order_specs[o]:
            mesin_dibutuhkan[o] = extract_mesin(spec["Mesin"])

            # Menyebar pemilihan mesin secara merata
            for _ in range(mesin_dibutuhkan[o]):
                m = machines[mesin_index % len(machines)]
                assigned_machines[o].append(m)
                mesin_index += 1  # Geser index agar tidak selalu dari awal


                RjtWE = float(spec['RjtWE'])  # Ambil Weft dari order_specs

                # Hitung kapasitas mesin dan durasi total pekerjaan untuk order ini
                kapasitas_mesin[o] = ((100 * 6 * 2.54) / RjtWE) * 60  # Kapasitas mesin dalam meter/jam
                durasi_total = jumlah_order[o] / kapasitas_mesin[o]
                durasi_pekerjaan[o] = durasi_total / mesin_dibutuhkan[o]  # Durasi per mesin

                prob += pulp.lpSum(x[m][o][d][s] for d in days for m in assigned_machines[o] for s in all_intervals) <= durasi_pekerjaan[o]
            print(f"Order: {o}, Mesin Dibutuhkan: {mesin_dibutuhkan[o]}, Durasi Pekerjaan: {durasi_pekerjaan[o]}, Mesin: {assigned_machines[o]}")


    # Mesin hanya boleh 1 order per jam
    for m in machines:
        for d in days:
            for h in range(24):
                prob += pulp.lpSum(x[m][o][d][s] for o in valid_orders if m in assigned_machines[o]
                                    for s in all_intervals if int(s.split('-')[0].split(':')[0]) == h
                                    ) <= 1


    # #13. Alokasikan mesin dan order untuk interval tertentu
    # for m in machines:
    #     for o in valid_orders:
    #         for d in days:
    #             for i in range(1, len(all_intervals)):
    #                 prev = all_intervals[i - 1]
    #                 curr = all_intervals[i]
    #                 # Jika interval sekarang aktif, maka interval sebelumnya harus aktif juga
    #                 prob += x[m][o][d][curr] <= x[m][o][d][prev] + (1 - pulp.lpSum(start[m][o][d][s] for s in all_intervals))  # allow first active block

    # Membatasi durasi hanya pada hari pertama dengan 17 jam (07:00 - 23:59)
    # for o in valid_orders:
    #     for m in assigned_machines[o]:
    #         prob += pulp.lpSum(
    #             x[m][o][0][s] for s in all_intervals if is_within_first_day_interval(s)) <= durasi_pekerjaan

            # # Jika durasi pekerjaan lebih dari 17, maka sisa dikerjakan di hari berikutnya
            # if durasi_pekerjaan > 17:
            #     sisa = durasi_pekerjaan - 17
            #     prob += pulp.lpSum(
            #         x[m][o][d][s]
            #         for d in days if d != 1  # hari ke-2 dan seterusnya
            #         for s in all_intervals
            #     ) >= sisa



    # # 14. Constraint untuk memindahkan pekerjaan ke hari berikutnya
    # for m in machines:
    #     for o in valid_orders:
    #         for d in days:
    #             if d < max(days):
    #                 kerja_hari_ini = pulp.lpSum(x[m][o][d][interval] for interval in intervals_by_day[d])
    #                 prob += sisa_pekerjaan[m][o][d+1] == sisa_pekerjaan[m][o][d] - kerja_hari_ini

    # # 15. Pastikan total pekerjaan dihitung untuk semua mesin yang mengerjakan order pada hari d
    # for o in valid_orders:
    #     for d in days:
    #         total_kerja = pulp.lpSum(x[m][o][d][interval] for m in machines for interval in intervals_by_day[d])

    #         # Memastikan total kerja + sisa pekerjaan dari mesin manapun lebih besar atau sama dengan durasi pekerjaan
    #         prob += total_kerja + pulp.lpSum(sisa_pekerjaan[m][o][d] for m in machines) >= durasi_pekerjaan[o]


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

    # Hanya set jam mulai di pagi hari Day 0
    for o in valid_orders:
        for m in assigned_machines[o]:
            if 'pagi' in shift_intervals:
                prob += pulp.lpSum(x[m][o][0][interval] for interval in shift_intervals['pagi']) >= 1


    # print("Status:", pulp.LpStatus[prob.status])

    # SOLVE
    prob.solve()
    print("Status:", pulp.LpStatus[prob.status])

    # Generate jadwal
    jadwal_produksi = []

    # Loop untuk mengambil hasil dari variabel x dan menyusun jadwal produksi
    for o in valid_orders:
        print(assigned_machines)
        for m in assigned_machines[o]:
            aktif_slots = []

            for d in days:
                for shift in ['pagi', 'sore', 'malam']:
                    for interval in shift_intervals[shift]:
                        if pulp.value(x[m][o][d][interval]) is not None and pulp.value(x[m][o][d][interval]) >= 0.9:
                            aktif_slots.append((d, interval))

            if not aktif_slots:
                print(f"[WARNING] Mesin {m} tidak aktif untuk order {o}, padahal terdaftar di assigned_machines.")
                continue

            aktif_slots.sort(key=lambda x: (x[0], int(x[1].split('-')[0].split(':')[0])))

            d_mulai, interval_mulai = aktif_slots[0]
            durasi_dalam_menit = int(round(durasi_pekerjaan[o] * 60))

            jam_mulai = int(interval_mulai.split('-')[0].split(':')[0])
            jadwal_mulai_menit = jam_mulai * 60
            total_menit_selesai = jadwal_mulai_menit + durasi_dalam_menit

            if total_menit_selesai <= 1440:
                # Tidak melewati hari
                jam_selesai = total_menit_selesai // 60
                menit_selesai = total_menit_selesai % 60
                jadwal_produksi.append({
                    'Order': o,
                    'Mesin': m,
                    'Hari': f'Day {d_mulai}',
                    'Jam Mulai': f"{str(jam_mulai).zfill(2)}:00",
                    'Jam Selesai': f"{str(jam_selesai % 24).zfill(2)}:{str(menit_selesai).zfill(2)}"
                })
            else:
                # Melewati hari, bagi menjadi dua entri
                sisa_menit_hari_ini = 1440 - jadwal_mulai_menit
                menit_hari_berikutnya = durasi_dalam_menit - sisa_menit_hari_ini

                jadwal_produksi.append({
                    'Order': o,
                    'Mesin': m,
                    'Hari': f'Day {d_mulai}',
                    'Jam Mulai': f"{str(jam_mulai).zfill(2)}:00",
                    'Jam Selesai': "24:00"
                })

                jam_selesai_berikutnya = menit_hari_berikutnya // 60
                menit_selesai_berikutnya = menit_hari_berikutnya % 60

                jadwal_produksi.append({
                    'Order': o,
                    'Mesin': m,
                    'Hari': f'Day {d_mulai + 1}',
                    'Jam Mulai': "00:00",
                    'Jam Selesai': f"{str(jam_selesai_berikutnya).zfill(2)}:{str(menit_selesai_berikutnya).zfill(2)}"
                })


    # Konversi ke DataFrame untuk kemudahan manipulasi dan visualisasi
    df_jadwal = pd.DataFrame(jadwal_produksi)
    print(df_jadwal)

    # Menampilkan DataFrame dalam format tabel
    return df_jadwal.to_dict(orient='records')

