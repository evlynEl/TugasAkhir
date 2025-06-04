from pulp import PULP_CBC_CMD, LpVariable, LpProblem, LpMinimize, lpSum, LpBinary, value, LpStatusInfeasible
from pulp import *
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from bisect import insort
from collections import defaultdict
import re
import time
import math

def main(data_list):
    orders = []
    order_specs = defaultdict(list)

    for item in data_list:
        NoOrder = item['NoOrder']
        orders.append(NoOrder)
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
    jumlah_all   = defaultdict(list)
    jumlah_order = {}
    valid_orders = []

    for o in dict.fromkeys(orders):
        total_jumlah = 0.0
        total_mesin  = 0
        base_spec    = None

        for spec in order_specs[o]:
            jstr = spec['Jumlah'].strip().upper()
            jumlah_all[o].append(jstr)

            # Jumlah reguler (tidak diawali '+')
            if not jstr.startswith('+'):
                try:
                    val = float(jstr.replace('.', '').replace(',', ''))
                    total_jumlah += val
                    total_mesin  += extract_mesin(spec['Mesin'])
                    if base_spec is None:
                        base_spec = spec.copy()
                except ValueError:
                    print(f"[SKIP] Jumlah tak valid di {o}: '{jstr}'")
                continue

            # '+MESIN' (tak menambah Jumlah, hanya mesin)
            if '+MESIN' in jstr:
                total_mesin += extract_mesin(spec['Mesin'])
                continue

            # '+<angka>' menambah jumlah
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
        return int(match.group(1))
    return 1  # Jika tidak ada angka MESIN, return 1

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
                        _ = float(jumlah.replace('.', '').replace(',', '').strip())
                        base_spec = spec
                        total_mesin += mesin
                    except ValueError:
                        continue

            if base_spec:
                base_spec['Mesin'] = f"{total_mesin} MESIN"
                updated_order_specs[no_order].append(base_spec)
            else:
                updated_order_specs[no_order] = specs
        else:
            updated_order_specs[no_order] = specs
    return updated_order_specs

# Hitung makespan
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

def slot_to_datetime(slot, slot_per_hour):
    total_minutes = slot
    day = slot // (24 * slot_per_hour)
    minutes_in_day = total_minutes % (24 * 60)
    hour = minutes_in_day // 60
    minute = minutes_in_day % 60
    return f"Day {day+1}", f"{hour:02d}:{minute:02d}"


def buat_model(orders, order_specs):
    order_specs = add_mesin(order_specs)
    # print(order_specs)
    jumlah_all, jumlah_order, valid_orders = proses_jumlah_orders(orders, order_specs)
    print(valid_orders)

    # SETS

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

    SLOT_PER_HOUR = 60  # 10-minute slots
    SLOT_PER_DAY = 24 * SLOT_PER_HOUR
    TOTAL_SLOTS = 7 * SLOT_PER_DAY

    ISTIRAHAT_AWAL = 19 * SLOT_PER_HOUR
    ISTIRAHAT_AKHIR = 21 * SLOT_PER_HOUR

    # SDP Mapping
    CL1 = ['SO{:02d}'.format(i) for i in range(1, 17)]                                                      #SO1-16 = 16
    CL2 = ['SO{:02d}'.format(i) for i in range(17, 33)]                                                     #SO17-32 = 16
    CL3 = ['SO{:02d}'.format(i) for i in range(33, 41)] + ['ST{:02d}'.format(i) for i in range(1, 5)]       #SO33-40, ST1-4 = 12
    CL4 = ['ST{:02d}'.format(i) for i in list(range(5,13)) + list(range(25,29)) + list(range(33,45))]       #ST5-12,25-28, 33-44 = 24
    # CL5 = ['ST{:02d}'.format(i) for i in list(range(13,25)) + list(range(45,69))]                           #ST13-24, 45-68 = 36
    # CL6 = ['ST{:02d}'.format(i) for i in list(range(29,33)) + list(range(69,77))]                           #ST29-32, 69-76 = 12

    SDP_mapping = {
        'CL1': CL1,
        'CL2': CL2,
        'CL3': CL3,
        'CL4': CL4
    }

    totalPower = {
        'CL1': 67.0,
        'CL2': 10.4,
        'CL3': 8.0,
        'CL4': 12.7
    }

    # totalPower = {item['cl']: float(item['totalPerDay']) for item in resultCL}
    max_power_cl = max(totalPower, key=totalPower.get)
    machines_max_cl = SDP_mapping[max_power_cl]

    model = LpProblem("MachineOrderScheduling", LpMinimize)

    # Kapasitas & durasi mesin
    kapasitas_mesin = {}
    durasi_pekerjaan = {}
    mesin_dibutuhkan = {}

    for o in valid_orders:
        for spec in order_specs[o]:
            mesin_dibutuhkan[o] = extract_mesin(spec["Mesin"])

            RjtWE = float(spec['RjtWE'])
            kapasitas_mesin[o] = ((100 * 6 * 2.54) / RjtWE) * 60
            durasi_total = jumlah_order[o] / kapasitas_mesin[o]
            durasi_pekerjaan[o] = (durasi_total / mesin_dibutuhkan[o])
        print(f"Order: {o}, Jumlah: {jumlah_order[o]}, Mesin Dibutuhkan: {mesin_dibutuhkan[o]}, Durasi Pekerjaan: {durasi_pekerjaan[o]}")

    # Calculate duration and capacity
    durasi_slot = {}
    for o in valid_orders:
        durasi_slot[o] = math.ceil(durasi_pekerjaan[o] * SLOT_PER_HOUR)
        # print(o, durasi_slot[o])

    # Create variables
    x = {}  # x[o][m][t] = 1 if machine m processes order o at time t
    y = {}  # y[o][m] = 1 if machine m is assigned to order o


    start_slot = {
        o: {
            m: LpVariable(f"start_{o}_{m}", lowBound=0, cat="Integer")
            for m in all_machines
        }
        for o in valid_orders
    }

    end_slot = {
        o: {
            m: LpVariable(f"end_{o}_{m}", lowBound=0, cat="Integer")
            for m in all_machines
        }
        for o in valid_orders
    }

    for o in valid_orders:
        x[o] = {}
        y[o] = {}
        for m in all_machines:
            y[o][m] = LpVariable(f"y_{o}_{m}", cat="Binary")
            x[o][m] = [LpVariable(f"x_{o}_{m}_{t}", cat="Binary") for t in range(TOTAL_SLOTS)]



    # Objective: Minimize total working slots
    model += lpSum(x[o][m][t] for o in valid_orders for m in all_machines for t in range(TOTAL_SLOTS))


    # CONSTRAINT
    DAY1_START_SLOT = 420  # Jam 07:00
    for o in valid_orders:
        for m in all_machines:
            model += start_slot[o][m] >= DAY1_START_SLOT

    sorted_jumlah = sorted(valid_orders, key=lambda o: jumlah_order[o], reverse=True)
    # Mesin yang belum dipakai & sesuai BngWA
    used_machines = set()
    machine_bngwa = {}  # machine → assigned BngWA

    for o in sorted_jumlah:
        for spec in order_specs[o]:
            jumlah_mesin = extract_mesin(spec["Mesin"])
            bngwa = spec.get("BngWA")
            lebar = float(spec['Lebar'])
            denier = float(spec['Denier'])
            mesin_dipakai = 0

             # PILIH MESIN SESUAI SPESIFIKASI
            if lebar > 110 and denier > 1000:
                mesin_kandidat = [m for m in special_machines]
            else:
                mesin_kandidat = [m for m in mesin_ranking]

            for m in mesin_kandidat:
                # Mesin belum dipakai atau BngWA-nya sama
                if m not in used_machines or machine_bngwa.get(m) == bngwa:
                    model += y[o][m] == 1
                    used_machines.add(m)
                    machine_bngwa[m] = bngwa
                    mesin_dipakai += 1
                else:
                    model += y[o][m] == 0
                if mesin_dipakai == jumlah_mesin:
                    break

    for i in range(len(sorted_jumlah)):
        o1 = sorted_jumlah[i]
        b1 = order_specs[o1][0]['BngWA']

        for j in range(i + 1, len(sorted_jumlah)):
            o2 = sorted_jumlah[j]
            b2 = order_specs[o2][0]['BngWA']

            if b1 == b2:
                for m in all_machines:
                    # If both o1 and o2 use the same machine
                    model += start_slot[o2][m] >= end_slot[o1][m] + 1 - (1 - y[o1][m]) * TOTAL_SLOTS - (1 - y[o2][m]) * TOTAL_SLOTS

    # # Constraint: each machine only assigned to one BngWA
    # for m in all_machines:
    #     assigned_bngwa = {}
    #     for o in valid_orders:
    #         b = order_specs[o][0]['BngWA']
    #         assigned_bngwa.setdefault(b, []).append(y[o][m])
    #     model += lpSum([lpSum(group) for group in assigned_bngwa.values()]) <= 1



    # for o in valid_orders:
    #     for m in all_machines:
    #         for d in range(7):
    #             for t in range(SLOT_PER_DAY):
    #                 global_slot = d * SLOT_PER_DAY + t
    #                 if d == 0 and t < DAY1_START_SLOT:  # Day 1, before 07:00
    #                     model += x[o][m][global_slot] == 0

    # for o in valid_orders:
    #         for m in all_machines:
    #             model += lpSum(x[o][m][t] for t in range(TOTAL_SLOTS)) == y[o][m] * durasi_slot[o]

    for o in valid_orders:
        for m in all_machines:
            model += end_slot[o][m] == start_slot[o][m] + durasi_slot[o] - 1

    # for o in valid_orders:
    #     for m in all_machines:
    #         model += lpSum(z[o][m][t] for t in range(TOTAL_SLOTS)) == y[o][m]

    # for t in range(TOTAL_SLOTS):
    #     model += x[o][m][t] <= y[o][m]
    #     model += x[o][m][t] <= (t >= start_slot[o][m])
    #     model += x[o][m][t] <= (t <= end_slot[o][m])


    start_time = time.time()

    solver = PULP_CBC_CMD(presolve=False)
    solver = PULP_CBC_CMD(gapRel=0.005) # solution is within 5% of the best possible
    model.solve(solver)


    end_time = time.time()
    excTime = end_time - start_time

    # print("Status:", LpStatus[model.status])
    # print("Nilai objektif (objective value):", value(model.objective))

    def hhmm_to_minutes(hhmm: str) -> int:
        jam, menit = map(int, hhmm.split(":"))
        return jam * 60 + menit


    mesin_kandidat_break = set()
    schedule_data = []

    for o in valid_orders:
        for m in all_machines:
            if y[o][m].varValue == 1:
                start = int(start_slot[o][m].value())
                end = int(end_slot[o][m].value())

                curr = start
                while curr <= end:
                    day_idx = curr // SLOT_PER_DAY
                    day_start = day_idx * SLOT_PER_DAY
                    day_end = day_start + SLOT_PER_DAY - 1

                    seg_start = curr
                    seg_end = min(end, day_end)

                    hari, jam_mulai = slot_to_datetime(seg_start, SLOT_PER_HOUR)
                    _, jam_selesai = slot_to_datetime(seg_end + 1, SLOT_PER_HOUR)

                    # Perbaikan: jika selesai di akhir hari, ubah ke "24:00"
                    if (seg_end + 1) % SLOT_PER_DAY == 0:
                        jam_selesai = "24:00"
                        selesai_menit = 1440
                    else:
                        selesai_menit = hhmm_to_minutes(jam_selesai)

                    mulai_menit = hhmm_to_minutes(jam_mulai)

                    if m in machines_max_cl:
                        if mulai_menit < ISTIRAHAT_AKHIR and selesai_menit > ISTIRAHAT_AWAL:
                            mesin_kandidat_break.add(m)

                    schedule_data.append({
                        "Order": o,
                        "Mesin": m,
                        "Hari": hari,
                        "Jam Mulai": jam_mulai,
                        "Jam Selesai": jam_selesai
                    })

                    curr = seg_end + 1


    df_hasil = pd.DataFrame(schedule_data)
    print(df_hasil)

    mesin_terurut = sorted(
        [m for m in mesin_kandidat_break if m in mesin_ranking],
        key=lambda m: mesin_ranking[m],
        reverse=True
    )

    mesin_terpakai_wbp = mesin_terurut[:5]
    print('mesin_terpakai_wbp ', mesin_terpakai_wbp)





    #  hitung makespan
    jam_mulai_semua = []
    jam_selesai_semua = []

    for _, row in df_hasil.iterrows():
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


    return df_hasil.to_dict(orient='records'), makespan_jam, excTime







