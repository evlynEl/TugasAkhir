from pulp import PULP_CBC_CMD, LpVariable, LpProblem, LpMinimize, lpSum, LpBinary, value
from pulp import *
import numpy as np
import pandas as pd
from datetime import datetime
from bisect import insort
from collections import defaultdict
import re
import time

def main(data_list):
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

def proses_jumlah_orders(orders, order_specs):
    jumlah_all   = defaultdict(list)   # rekam original string
    jumlah_order = {}                  # total per order (float)
    valid_orders = []                  # list order final

    for o in dict.fromkeys(orders):    # urut unik sambil jaga urutan
        total_jumlah = 0.0             # akumulasi meter
        total_mesin  = 0               # akumulasi mesin
        base_spec    = None

        for spec in order_specs[o]:
            jstr = spec['Jumlah'].strip().upper()
            jumlah_all[o].append(jstr)

            # --- kasus Jumlah reguler (tidak diawali '+') -----------------
            if not jstr.startswith('+'):
                try:
                    val = float(jstr.replace('.', '').replace(',', ''))
                    total_jumlah += val
                    total_mesin  += extract_mesin(spec['Mesin'])
                    if base_spec is None:               # simpan salah satu sebagai template
                        base_spec = spec.copy()
                except ValueError:
                    print(f"[SKIP] Jumlah tak valid di {o}: '{jstr}'")
                continue

            # --- kasus '+MESIN' (tak menambah Jumlah, hanya mesin) --------
            if '+MESIN' in jstr:
                total_mesin += extract_mesin(spec['Mesin'])
                continue

            # --- kasus '+<angka>' menambah jumlah -------------------------
            try:
                inc = float(jstr[1:].replace('.', '').replace(',', ''))
                total_jumlah += inc
                total_mesin += extract_mesin(spec['Mesin'])
            except ValueError:
                print(f"[SKIP] Jumlah plus tak valid di {o}: '{jstr}'")

        # kalau punya basis & total_jumlah >0 -> simpan
        if base_spec and total_jumlah:
            base_spec['Jumlah'] = str(int(total_jumlah) if total_jumlah.is_integer() else total_jumlah)
            base_spec['Mesin']  = f"{total_mesin} MESIN"
            order_specs[o]      = [base_spec]
            jumlah_order[o]     = total_jumlah
            valid_orders.append(o)
        else:
            print(f"[SKIP] Order {o} tidak bisa digabung.")

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

def to_minutes(jam_str):
    if isinstance(jam_str, float) or isinstance(jam_str, int):
        # Asumsikan format desimal jam (misal: 10.5 → 10:30)
        jam = int(jam_str)
        menit = int(round((jam_str - jam) * 60))
        return jam * 60 + menit

    if isinstance(jam_str, str) and ':' in jam_str:
        jam, menit = map(int, jam_str.split(":"))
        return jam * 60 + menit

    raise ValueError(f"Format jam tidak dikenali: {jam_str}")

def clean_waktu(t):
    if isinstance(t, str) and ':' in t:
        parts = t.split(":")
        if len(parts) == 2:
            try:
                jam = int(float(parts[0]))
                menit = int(float(parts[1]))
                return f"{str(jam).zfill(2)}:{str(menit).zfill(2)}"
            except Exception as e:
                print(f"[clean_waktu] Error parsing str '{t}': {e}")
    try:
        t = float(t)
        jam = int(t)
        menit = int(round((t - jam) * 60))
        return f"{str(jam).zfill(2)}:{str(menit).zfill(2)}"
    except Exception as e:
        print(f"[clean_waktu] Error parsing float '{t}': {e}")
        return None  # ← lebih baik kembalikan None, bukan "00:00"

def to_jam(menit_total):
    return f"{str(menit_total // 60).zfill(2)}:{str(menit_total % 60).zfill(2)}"

def jam_total(hari, jam_string):
    try:
        if isinstance(jam_string, str) and ':' in jam_string:
            jam, menit = map(int, jam_string.split(':'))
        else:
            jam_float = float(jam_string)
            jam = int(jam_float)
            menit = int((jam_float - jam) * 60)
        return hari * 24 + jam + menit / 60
    except Exception as e:
        raise ValueError(f"Gagal parsing jam_string '{jam_string}': {e}")


def buat_model(orders, order_specs):
# def buat_model(orders, order_specs, resultCL, hitungAvgDaya):
    order_specs = add_mesin(order_specs)
    # print(order_specs)
    jumlah_all, jumlah_order, valid_orders = proses_jumlah_orders(orders, order_specs)
    print(valid_orders)

    # SETS
    days = [1, 2, 3, 4, 5, 6, 7]

    # mesin berdasarkan adjusted eff
    mesin = r"C:\Users\Evelyn\Downloads\summary_adjusted_eff.csv"
    df = pd.read_csv(mesin)
    sorted_mesin = df.sort_values(by='AdjustedEff', ascending=False)
    mesin_raw = sorted_mesin['NoMesin'].tolist()
    all_machines = [m.replace('-', '') for m in mesin_raw]
    # print(machines)
    special_machines = ['ST07', 'ST08', 'ST28', 'ST32', 'ST27', 'ST30', 'ST26', 'ST31',  'ST29', 'ST25'] # mesin Lebar & Dn besar
    # Exclude special_machines from machines
    machines = [m for m in all_machines if m not in special_machines]

    intervals = [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(24)] # waktu 24 jam
    istirahat_intervals = ['22:00-23:00', '23:00-24:00'] # jam istirahat

    # Shift harian dimulai dari jam 07:00
    all_intervals = [
        f"{str(h % 24).zfill(2)}:00-{str((h + 1) % 24).zfill(2)}:00"
        for h in range(7, 31)
    ]

    interval_start_times = {
        interval: datetime.strptime(interval.split('-')[0], "%H:%M")
        for interval in all_intervals
    }

    shift_intervals = {
        'pagi': [],
        'sore': [],
        'malam': []
    }

    for interval, dt in interval_start_times.items():
        hour = dt.hour
        if 7 <= hour < 15:
            shift_intervals['pagi'].append(interval)
        elif 15 <= hour < 23:
            shift_intervals['sore'].append(interval)
        else:  # 23:00–07:00
            shift_intervals['malam'].append(interval)

    assigned_machines = defaultdict(list)

    # VARIABLES
    isRunning = LpVariable.dicts("isRunning",
                             [(m, t) for m in all_machines for t in intervals],
                             cat=LpBinary)
    x = LpVariable.dicts("x", (all_machines, orders, days, intervals), cat=LpBinary)
    r = LpVariable.dicts("rest", (all_machines, days), cat=LpBinary)

    # PROBLEM
    # Mendeklarasikan model dengan tujuan minimisasi
    prob = LpProblem("Minimize_CL1_Energy", LpMinimize)

    # SDP Mapping
    CL1 = ['SO{:02d}'.format(i) for i in range(1, 17)]                                                      #SO1-16 = 16
    CL2 = ['SO{:02d}'.format(i) for i in range(17, 33)]                                                     #SO17-32 = 16
    CL3 = ['SO{:02d}'.format(i) for i in range(33, 41)] + ['ST{:02d}'.format(i) for i in range(1, 5)]       #SO33-40, ST1-4 = 12
    CL4 = ['ST{:02d}'.format(i) for i in list(range(5,13)) + list(range(25,29)) + list(range(33,45))]       #ST5-12,25-28, 33-44 = 24
    CL5 = ['ST{:02d}'.format(i) for i in list(range(13,25)) + list(range(45,69))]                           #ST13-24, 45-68 = 36
    CL6 = ['ST{:02d}'.format(i) for i in list(range(29,33)) + list(range(69,77))]                           #ST29-32, 69-76 = 12

    SDP_mapping = {
        'CL1': CL1,
        'CL2': CL2,
        'CL3': CL3,
        'CL4': CL4
    }

    totalPower = {
        'CL1': 167.0,
        'CL2': 10.4,
        'CL3': 8.0,
        'CL4': 12.7
    }

    # totalPower = {item['cl']: float(item['totalPerDay']) for item in resultCL}
    max_power_cl = max(totalPower, key=totalPower.get)
    machines_max_cl = SDP_mapping[max_power_cl]

    print('Total Power: ', totalPower)
    print('Machines max CL: ', machines_max_cl)


    # CONSTRAINTS
    # 1. Mesin CL1-4 bisa rest/running
    for mesin_list in SDP_mapping.values():
        for m in mesin_list:
            if m in isRunning:
                for d in days:
                    for t in istirahat_intervals:
                        prob += isRunning[m][t] + r[m][d] <= 1, f"Rest_vs_Run_{m}_{d}_{t}"


    # 2. Kapasitas & durasi mesin
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
            prob += lpSum(
                x[m][o][d][s]
                for d in days
                for m in assigned_machines[o]
                for s in all_intervals
            ) <= durasi_pekerjaan[o]

        print(f"Order: {o}, Jumlah: {jumlah_order[o]}, Mesin Dibutuhkan: {mesin_dibutuhkan[o]}, Durasi Pekerjaan: {durasi_pekerjaan[o]}")


    # 3. Mesin hanya boleh 1 order per jam
    for m in machines:
        for d in days:
            for h in range(24):
                prob += lpSum(
                    x[m][o][d][s]
                    for o in valid_orders if m in assigned_machines[o]
                    for s in all_intervals
                    if interval_start_times[s].hour == h
                ) <= 1


    # 4. Constraint “No Overlap” per mesin per hari
    for m in machines:
        for d in days:
            for s in all_intervals:
                prob += lpSum(
                    x[m][o][d][s] for o in valid_orders if m in assigned_machines[o]) <= 1


    # 5. Mesin khusus ST07, ST08, ST25-32 hanya boleh kerjakan order Lebar > 110 dan Denier > 1000
    for o in orders:
        for spec in order_specs[o]:
            lebar = float(spec['Lebar'])
            denier = float(spec['Denier'])

            # Jika order TIDAK memenuhi syarat, maka mesin khusus TIDAK BOLEH digunakan
            if lebar < 110 or denier < 1000:
                for d in days:
                    for s in intervals:
                        for m in special_machines:
                            prob += x[m][o][d][s] == 0


    # 6. Distribusi mesin
    # Urur berdasarkan jumlah
    sorted_jumlah = sorted(valid_orders, key=lambda o: jumlah_order[o], reverse=True)

    # # Urutkan berdasarkan TglMulai
    # for specs in order_specs.values():
    #     for item in specs:
    #         if isinstance(item['TglMulai'], str):
    #             item['TglMulai'] = pd.to_datetime(item['TglMulai'])

    # # Ambil tanggal mulai pertama dari setiap order
    # sorted_tgl = sorted(
    #     valid_orders,
    #     key=lambda o: order_specs[o][0]['TglMulai']
    # )

    # Assign mesin
    assigned_machines = {}
    mesin_index = 0
    bngwa_to_machine = defaultdict(list)

    for o in sorted_jumlah:
        assigned_machines[o] = []
        used_machines = set()

        for spec in order_specs[o]:
            jumlah_mesin = extract_mesin(spec["Mesin"])
            bngWA = spec.get("BngWA")
            lebar = float(spec['Lebar'])
            denier = float(spec['Denier'])

            for _ in range(jumlah_mesin):
                # Check if special machine is needed
                if lebar > 110 and denier > 1000:
                    # Use special machines
                    candidate = next((m for m in special_machines if m not in used_machines), None)
                    if candidate:
                        m = candidate
                    else:
                        # Take a new machine
                        m = machines[mesin_index % len(machines)]
                        bngwa_to_machine[bngWA].append(m)
                        mesin_index += 1
                else:
                    # Try to use a machine already used for this BngWA but not used in this order
                    candidate = next((m for m in bngwa_to_machine[bngWA] if m not in used_machines), None)
                    if candidate:
                        m = candidate
                    else:
                        # Take a new machine
                        m = machines[mesin_index % len(machines)]
                        bngwa_to_machine[bngWA].append(m)
                        mesin_index += 1

                assigned_machines[o].append(m)
                used_machines.add(m)

        # Assuming prob is defined and you want to add constraints
            prob += lpSum(x[m][o][d][s] for m in machines for o in valid_orders for d in days for s in all_intervals) >= 1

    # print(assigned_machines)

    # 7. Mesin di SDP CL5, CL6 tidak bisa istirahat, selain itu bisa istirahat
    for m in (CL5 + CL6):
        for o in valid_orders:
            # Cek apakah mesin digunakan dalam assigned_machines untuk order ini
            if m in assigned_machines[o]:
                for t in istirahat_intervals:
                    if m in isRunning:
                        # Mesin ini tidak bisa rest pada interval t jika digunakan di order
                        prob += isRunning[m][t] == 1

    # 8. Atur jam mulai di shift pagi hari Day 0
    for o in valid_orders:
        for m in assigned_machines[o]:
            if 'pagi' in shift_intervals:
                prob += lpSum(x[m][o][1][interval] for interval in shift_intervals['pagi']) >= 1


    # 9. Atur mesin yg ada di machines_max_cl dan bekerja pada interval sore jam 22,23,24 diistirahatkan
    # Ambil mesin dari CL tertinggi yang digunakan pada interval sore-malam
    mesin_terpakai_wbp = {
        m
        for mesin_list in assigned_machines.values()
        for m in mesin_list
        if m in machines_max_cl and m in isRunning
    }

    # 10. Mesin dari CL tertinggi yang bekerja pada 22:00-24:00 harus istirahat
    for m in mesin_terpakai_wbp:
        for t in istirahat_intervals:
            prob += isRunning[m][t] == 0, f"Machine_{m}_RestDuringSore_{t}"

    # 11. Mesin yang ada di SDP_mapping dan tidak termasuk mesin_terpakai_wbp
    for mesin_list in SDP_mapping.values():
        for m in mesin_list:
            for d in days:
                for t in istirahat_intervals:
                    if m in isRunning:
                        mesin_digunakan = any(m in assigned_machines[o] for o in assigned_machines)

                        if mesin_digunakan and m not in mesin_terpakai_wbp:         # Mesin digunakan tapi bukan di mesin_terpakai_wbp
                            # Mesin tidak bisa istirahat jika ter-assign untuk order
                            prob += isRunning[m][t] == 1, f"Machine_{m}_MustRun_IfAssigned_{d}_{t}"
                        else:
                            # Mesin tidak digunakan, bisa istirahat
                            prob += isRunning[m][t] + r[m][d] <= 1, f"RestOrRun_{m}_{d}_{t}"
                    # else:
                        # print(f"[WARNING] Mesin {m} tidak ada di isRunning, dilewati")



    # Fungsi objektif: Minimalkan jumlah mesin CL tertinggi yang aktif saat waktu istirahat
    mesin_dipakai = set(m for lst in assigned_machines.values() for m in lst)

    prob += lpSum(
        isRunning[m][t]
        for m in mesin_dipakai
        if m in isRunning and m not in mesin_terpakai_wbp
        for t in istirahat_intervals
    ) + lpSum(
        isRunning[m][t]
        for m in mesin_terpakai_wbp
        if m in isRunning
        for t in istirahat_intervals
    ), "Minimize_MachinesRunningDuringBreak"



    # print("Variables:", len(prob.variables()))
    # print("Constraints:", len(prob.constraints))

    start_time = time.time()

    # SOLVE
    solver = PULP_CBC_CMD(presolve=False)
    solver = PULP_CBC_CMD(gapRel=0.005) # solution is within 5% of the best possible
    prob.solve(solver)

    end_time = time.time()
    excTime = end_time - start_time
    # print("Status:", LpStatus[prob.status])
    # print("Objective value =", value(prob.objective)) # Semakin kecil nilai objektif ini, semakin baik jadwal menghindari operasi mesin saat waktu istirahat.


    # Generate jadwal
    jadwal_produksi = []
    waktu_terpakai = {}

    for o in sorted_jumlah:
        for m in assigned_machines[o]:
            aktif_slots = []
            sisa_durasi = durasi_pekerjaan[o] * 60  # dalam menit

            for d in days:
                if sisa_durasi <= 0:
                    break

                for shift in ['pagi']:
                    for interval in shift_intervals[shift]:
                        if value(x[m][o][d][interval]) is not None:
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
                total_menit_selesai = int(round(menit_awal + durasi_hari_ini))
                jam_selesai = total_menit_selesai // 60
                menit_selesai = total_menit_selesai % 60

                # Cek bentrok di slot awal
                bentrok = any(
                    not (menit_awal + durasi_hari_ini <= mulai or menit_awal >= selesai)
                    for mulai, selesai in waktu_terpakai[m][hari]
                )

                if bentrok:
                    found_slot = False

                    # Urutkan jadwal terpakai
                    waktu_terpakai[m][hari].sort()

                    # Coba geser ke kanan (slot setelah jadwal terakhir hari ini)
                    for idx, (start, end) in enumerate(waktu_terpakai[m][hari]):
                        next_start = waktu_terpakai[m][hari][idx + 1][0] if idx + 1 < len(waktu_terpakai[m][hari]) else 1440
                        gap = next_start - end

                        if gap >= durasi_hari_ini:
                            menit_awal = end
                            jam_selesai = (menit_awal + durasi_hari_ini) // 60
                            menit_selesai = (menit_awal + durasi_hari_ini) % 60
                            found_slot = True
                            break

                    # Jika tidak ditemukan slot di hari ini, lanjut ke hari berikutnya
                    if not found_slot:
                        hari += 1
                        menit_awal = 0
                        continue  # ulangi pencarian di hari baru

                # Tidak bentrok, simpan jadwal
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
                menit_awal = 0


    df_jadwal = pd.DataFrame(jadwal_produksi)
    print(df_jadwal)

    df_jadwal['Jam Mulai'] = df_jadwal['Jam Mulai'].apply(clean_waktu)
    df_jadwal['Jam Selesai'] = df_jadwal['Jam Selesai'].apply(clean_waktu)

    # Ambil mesin yang ada di df_jadwal dan juga ada di machines_max_cl
    mesin_dipakai = df_jadwal['Mesin'].unique()
    mesin_terpakai_max_cl = [m for m in mesin_dipakai if m in machines_max_cl]

    istirahat_awal = 22 * 60
    istirahat_akhir = 24 * 60

    # Filter hanya mesin yang aktif saat istirahat
    mesin_aktif_istirahat = set()
    for i, row in df_jadwal.iterrows():
        if row['Mesin'] not in mesin_terpakai_max_cl:
            continue
        jam_mulai = to_minutes(row['Jam Mulai'])
        jam_selesai = to_minutes(row['Jam Selesai'])

        # Cek apakah job aktif saat istirahat
        if jam_mulai < istirahat_akhir and jam_selesai > istirahat_awal:
            mesin_aktif_istirahat.add(row['Mesin'])

    # Urutkan berdasarkan urutan dari belakang `machines`
    machines_reversed = machines[::-1]
    mesin_terurut = [m for m in machines_reversed if m in mesin_aktif_istirahat]
    # print('urut: ',mesin_terurut)

    # Ambil 5 mesin terakhir yang aktif saat istirahat
    target_mesin = mesin_terurut[:5]
    # print('target: ',target_mesin)

    jadwal_diperbaiki = []
    mesin_delay = set()  # Menyimpan nama mesin yang terkena delay


    def to_hhmm(menit):
        jam = int(menit // 60)
        mnt = int(menit % 60)
        return f"{jam:02d}:{mnt:02d}"

    for i, row in df_jadwal.iterrows():
        jam_mulai = to_minutes(row['Jam Mulai'])
        jam_selesai = to_minutes(row['Jam Selesai'])
        hari = row['Hari']
        order = row['Order']
        mesin = row['Mesin']
        key = (order, mesin)

        if mesin not in target_mesin:
            jadwal_diperbaiki.append({
                'Order': order,
                'Mesin': mesin,
                'Hari': hari,
                'Jam Mulai': row['Jam Mulai'],
                'Jam Selesai': row['Jam Selesai']
            })
            continue

        if jam_mulai < istirahat_akhir and jam_selesai > istirahat_awal:
            sisa_durasi = durasi_pekerjaan[order] * 60  # Total durasi dalam menit

            # Durasi kerja hari ini (07:00–22:00)
            durasi_hari_ini = istirahat_awal - 7 * 60  # 22:00 - 07:00 = 900 menit

            # Baris pertama: potong di 22:00
            jadwal_diperbaiki.append({
                'Order': order,
                'Mesin': mesin,
                'Hari': hari,
                'Jam Mulai': row['Jam Mulai'],
                'Jam Selesai': to_hhmm(istirahat_awal)
            })

            # Baris kedua: di hari berikutnya
            sisa_besok = sisa_durasi - durasi_hari_ini
            jam_mulai_baru = 0   # 00:00
            jam_selesai_baru = jam_mulai_baru + sisa_besok

            hari_baru = f"Day {int(hari.split()[-1]) + 1}"

            jadwal_diperbaiki.append({
                'Order': order,
                'Mesin': mesin,
                'Hari': hari_baru,
                'Jam Mulai': to_hhmm(jam_mulai_baru),
                'Jam Selesai': to_hhmm(jam_selesai_baru)
            })

            mesin_delay.add(mesin)
        else:
            jadwal_diperbaiki.append({
                'Order': order,
                'Mesin': mesin,
                'Hari': hari,
                'Jam Mulai': row['Jam Mulai'],
                'Jam Selesai': row['Jam Selesai']
            })


    df_jadwal_final = pd.DataFrame(jadwal_diperbaiki)
    # print(df_jadwal_final)

    jam_mulai_semua = []
    jam_selesai_semua = []

    for _, row in df_jadwal_final.iterrows():
        if isinstance(row['Hari'], str):
            hari = int(row['Hari'].replace('Day ', ''))
        else:
            hari = int(row['Hari'])

        if 'Jam Mulai' in row.index:
            jam_mulai_semua.append(jam_total(hari, row['Jam Mulai']))
        if 'Jam Selesai' in row.index:
            jam_selesai_semua.append(jam_total(hari, row['Jam Selesai']))

    if jam_mulai_semua and jam_selesai_semua:
        makespan_jam = max(jam_selesai_semua) - min(jam_mulai_semua)

    # print('jumlah mesin delay: ', len(mesin_delay))

    dayaPerMenit = 30.37/60                                       # rata2 daya per jam / 1 jam
    dayaIst1Mesin = dayaPerMenit * 120
    dayaIstTotal = dayaIst1Mesin * len(mesin_delay)               # daya semua mesin yg diistirahatkan

    # print("DEBUG: hitungAvgDaya =", hitungAvgDaya)


    # dayaIst1Mesin = hitungAvgDaya['average_power_per_minute'] * 120
    # dayaIstTotal = dayaIst1Mesin * len(mesin_delay)               # daya semua mesin yg diistirahatkan

    # print('mesin delay', mesin_delay, 'per menit: ', dayaPerMenit, 'selama 2 jam: ', dayaIst1Mesin)


    # Menampilkan DataFrame dalam format tabel
    return df_jadwal_final.to_dict(orient='records'), makespan_jam, excTime, dayaIstTotal

