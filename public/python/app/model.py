from pulp import PULP_CBC_CMD, LpVariable, LpProblem, LpMinimize, lpSum, LpBinary, value
from pulp import *
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
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

# Order yang sama di mesin yang sama gabungkan jamnya
def merge_slots(jadwal_list):
    df = pd.DataFrame(jadwal_list)
    merged = []
    for (order, mesin, hari), group in df.groupby(['Order', 'Mesin', 'Hari']):
        group = group.sort_values(by='Jam Mulai')
        start = None
        end = None
        for _, row in group.iterrows():
            jm = to_minutes(row['Jam Mulai'])
            js = to_minutes(row['Jam Selesai'])
            if start is None:
                start, end = jm, js
            else:
                if jm <= end:
                    end = max(end, js)
                else:
                    merged.append({'Order': order, 'Mesin': mesin, 'Hari': hari,
                                'Jam Mulai': to_jam(start), 'Jam Selesai': to_jam(end)})
                    start, end = jm, js
        if start is not None:
            merged.append({'Order': order, 'Mesin': mesin, 'Hari': hari,
                        'Jam Mulai': to_jam(start), 'Jam Selesai': to_jam(end)})
    return merged


def deteksi_mesin_aktif_di_waktu_break(
    x, assigned_machines, durasi_pekerjaan,
    all_intervals, valid_orders, machines_max_cl, mesin_ranking,
    ISTIRAHAT_AWAL=19*60, ISTIRAHAT_AKHIR=21*60):

    mesin_kandidat_break = set()

    def interval_to_minutes(interval):
        h, m = map(int, interval.split("-")[0].split(":"))
        return h * 60 + m

    for o in valid_orders:
        durasi_per_mesin = int(round(durasi_pekerjaan[o] * 60))
        for m in assigned_machines[o]:
            if m not in machines_max_cl:
                continue

            aktif_slot = []
            for d in x[m][o]:
                for s in all_intervals:
                    if value(x[m][o][d][s]) == 1:
                        aktif_slot.append(interval_to_minutes(s))

            if not aktif_slot:
                continue

            start = min(aktif_slot)
            end = start + durasi_per_mesin

            # Deteksi apakah kerja mesin tumpang tindih dengan waktu istirahat
            if start < ISTIRAHAT_AKHIR and end > ISTIRAHAT_AWAL:
                mesin_kandidat_break.add(m)

    # Urutkan dari mesin terburuk ke terbaik (ranking besar = lebih buruk)
    mesin_terurut = sorted(
        [m for m in mesin_kandidat_break if m in mesin_ranking],
        key=lambda m: mesin_ranking[m],
        reverse=True
    )

    # Ambil maksimal 5
    mesin_terpakai_wbp = mesin_terurut[:5]

    return mesin_terpakai_wbp


def x_to_jadwal_final(x, assigned_machines, durasi_pekerjaan, all_intervals, valid_orders, mesin_terpakai_wbp):
    mesin_kena_break_per_hari = {}
    jadwal = []
    slot_terakhir = {}

    ISTIRAHAT_AWAL = 19 * 60
    ISTIRAHAT_AKHIR = 21 * 60
    AKHIR_HARI = 24 * 60
    START_HARI_PERTAMA = 7 * 60
    START_HARI_BERIKUTNYA = 0

    def interval_to_minutes(interval):
        h, m = map(int, interval.split("-")[0].split(":"))
        return h * 60 + m

    def minutes_to_str(m):
        h = m // 60
        m = m % 60
        return f"{str(h).zfill(2)}:{str(m).zfill(2)}"


    for o in valid_orders:
        mesin_list = assigned_machines[o]
        durasi_per_mesin = int(round(durasi_pekerjaan[o] * 60))

        for m in mesin_list:
            aktif = []
            for d in x[m][o]:
                for s in all_intervals:
                    if value(x[m][o][d][s]) == 1:
                        aktif.append((d, interval_to_minutes(s)))
            if not aktif:
                continue

            aktif.sort()
            hari = aktif[0][0]
            key = (m, hari)
            jam_mulai = START_HARI_PERTAMA if hari == 1 else START_HARI_BERIKUTNYA
            jam_mulai = max(jam_mulai, slot_terakhir.get(key, jam_mulai))

            sisa = durasi_per_mesin

            while sisa > 0:
                if m in mesin_terpakai_wbp:
                    if jam_mulai < ISTIRAHAT_AWAL:
                        durasi_hari_ini = min(sisa, ISTIRAHAT_AWAL - jam_mulai)
                        jam_selesai = jam_mulai + durasi_hari_ini
                        jadwal.append({
                            'Order': o, 'Mesin': m, 'Hari': f'Day {hari}',
                            'Jam Mulai': minutes_to_str(jam_mulai),
                            'Jam Selesai': minutes_to_str(jam_selesai)
                        })
                        slot_terakhir[key] = jam_selesai
                        sisa -= durasi_hari_ini
                        jam_mulai = ISTIRAHAT_AKHIR
                    elif jam_mulai >= ISTIRAHAT_AKHIR:
                        if sisa <= 15:
                            jam_mulai = ISTIRAHAT_AWAL
                        else:
                            mesin_kena_break_per_hari.setdefault(hari, set()).add(m)

                        durasi_hari_ini = min(sisa, AKHIR_HARI - jam_mulai)
                        jam_selesai = jam_mulai + durasi_hari_ini
                        jadwal.append({
                            'Order': o, 'Mesin': m, 'Hari': f'Day {hari}',
                            'Jam Mulai': minutes_to_str(jam_mulai),
                            'Jam Selesai': minutes_to_str(jam_selesai)
                        })
                        slot_terakhir[key] = jam_selesai
                        sisa -= durasi_hari_ini
                        if jam_selesai >= AKHIR_HARI:
                            hari += 1
                            key = (m, hari)
                            jam_mulai = START_HARI_BERIKUTNYA
                        else:
                            jam_mulai = jam_selesai
                    else:
                        jam_mulai = ISTIRAHAT_AKHIR
                else:
                    durasi_hari_ini = min(sisa, AKHIR_HARI - jam_mulai)
                    jam_selesai = jam_mulai + durasi_hari_ini
                    jadwal.append({
                        'Order': o, 'Mesin': m, 'Hari': f'Day {hari}',
                        'Jam Mulai': minutes_to_str(jam_mulai),
                        'Jam Selesai': minutes_to_str(jam_selesai)
                    })
                    slot_terakhir[key] = jam_selesai
                    sisa -= durasi_hari_ini
                    if jam_selesai >= AKHIR_HARI:
                        hari += 1
                        key = (m, hari)
                        jam_mulai = START_HARI_BERIKUTNYA
                    else:
                        jam_mulai = jam_selesai

    return jadwal, mesin_kena_break_per_hari




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
    mesin_ranking = {mesin: idx for idx, mesin in enumerate(machines)}


    intervals = [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(24)] # waktu 24 jam
    istirahat_intervals = ['19:00-20:00', '20:00-21:00'] # jam istirahat

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
        'CL1': 67.0,
        'CL2': 110.4,
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
    print('sorted_jumlah : ', sorted_jumlah)

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


    # 9. Atur mesin yg ada di machines_max_cl dan bekerja pada interval sore jam 19, 20, 21 diistirahatkan
    # Ambil mesin dari CL tertinggi yang digunakan pada interval sore-malam
    # mesin_terpakai_wbp = {
    #     m for m in set(m for lst in assigned_machines.values() for m in lst)
    #     if m in machines_max_cl and any((m, t) in isRunning for t in istirahat_intervals)
    # }


    # 10. Mesin dari CL tertinggi yang bekerja pada 19:00-21:00 harus istirahat
    for m in machines_max_cl:
        for t in istirahat_intervals:
            prob += isRunning[(m, t)] == 0, f"Machine_{m}_RestDuringSore_{t}"

    # 11. Mesin yang ada di SDP_mapping dan tidak termasuk mesin_terpakai_wbp
    for mesin_list in SDP_mapping.values():
        for m in mesin_list:
            for d in days:
                for t in istirahat_intervals:
                    if m in isRunning:
                        mesin_digunakan = any(m in assigned_machines[o] for o in assigned_machines)

                        if mesin_digunakan and m not in machines_max_cl:         # Mesin digunakan tapi bukan di machines_max_cl
                            # Mesin tidak bisa istirahat jika ter-assign untuk order
                            prob += isRunning[m][t] == 1, f"Machine_{m}_MustRun_IfAssigned_{d}_{t}"
                        else:
                            # Mesin tidak digunakan, bisa istirahat
                            prob += isRunning[m][t] + r[m][d] <= 1, f"RestOrRun_{m}_{d}_{t}"
                    # else:
                        # print(f"[WARNING] Mesin {m} tidak ada di isRunning, dilewati")

    #  12. Batas waktu kerja per hari
    for m in machines:
        for d in days:
            if m in machines_max_cl:
                allowed = [s for s in all_intervals if 7 <= int(s[:2]) < 19 or 21 <= int(s[:2]) < 24]
            else:
                allowed = [s for s in all_intervals if (7 <= int(s[:2]) < 24 if d == 1 else 0 <= int(s[:2]) < 24)]

            for o in valid_orders:
                if m in assigned_machines[o]:
                    for s in all_intervals:
                        if s not in allowed:
                            prob += x[m][o][d][s] == 0



    # Fungsi objektif: Minimalkan jumlah mesin CL tertinggi yang aktif saat waktu istirahat
    mesin_dipakai = set(m for lst in assigned_machines.values() for m in lst)

    prob += lpSum(
        isRunning[m][t]
        for m in mesin_dipakai
        if m in isRunning and m not in machines_max_cl
        for t in istirahat_intervals
    ) + lpSum(
        isRunning[m][t]
        for m in machines_max_cl
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

    mesin_terpakai_wbp = deteksi_mesin_aktif_di_waktu_break(
        x=x,
        assigned_machines=assigned_machines,
        durasi_pekerjaan=durasi_pekerjaan,
        all_intervals=all_intervals,
        valid_orders=valid_orders,
        machines_max_cl=machines_max_cl,
        mesin_ranking=mesin_ranking
    )

    jadwal_final, mesin_kena_break_per_hari = x_to_jadwal_final(
        x=x,
        assigned_machines=assigned_machines,
        durasi_pekerjaan=durasi_pekerjaan,
        all_intervals=all_intervals,
        valid_orders=valid_orders,
        mesin_terpakai_wbp=mesin_terpakai_wbp
    )



    print('mesin_terpakai_wbp ', mesin_terpakai_wbp)

    jadwal_akhir = merge_slots(jadwal_final)
    # # sort chart berdasarkan hari, mesin, jam mulai
    jadwal_akhir = sorted(jadwal_akhir, key=lambda x: (int(x['Hari'].split()[-1]), mesin_ranking.get(x['Mesin'], 71.04), to_minutes(x['Jam Mulai'])))
    df_jadwal_final = pd.DataFrame(jadwal_akhir)
    print(df_jadwal_final)



    #  hitung makespan
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



    # hitung daya & rupiahnya
    for hari, mesin_set in mesin_kena_break_per_hari.items():
        print(f"{hari}: {len(mesin_set)} mesin kena break")

    total_mesin_kena_break = sum(len(mesin_set) for mesin_set in mesin_kena_break_per_hari.values())
    print('total_mesin_kena_break ', total_mesin_kena_break)

    dayaPerMenit = 30.37/60                                             # rata2 daya per jam / 1 jam
    dayaIst1Mesin = dayaPerMenit * 120
    dayaIstTotal = dayaIst1Mesin * total_mesin_kena_break               # daya semua mesin yg diistirahatkan

    # print("DEBUG: hitungAvgDaya =", hitungAvgDaya)

    # dayaIst1Mesin = hitungAvgDaya['average_power_per_minute'] * 120
    # dayaIstTotal = dayaIst1Mesin * total_mesin_kena_break               # daya semua mesin yg diistirahatkan

    # print('mesin delay', mesin_delay, 'per menit: ', dayaPerMenit, 'selama 2 jam: ', dayaIst1Mesin)


    # Menampilkan DataFrame dalam format tabel
    return df_jadwal_final.to_dict(orient='records'), makespan_jam, excTime, dayaIstTotal

