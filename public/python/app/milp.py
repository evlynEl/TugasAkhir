from pulp import PULP_CBC_CMD, LpVariable, LpProblem, LpMinimize, lpSum
from pulp import *
import pandas as pd
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
                    print(f"[SKIP] Jumlah tidak valid di {o}: '{jstr}'")
                continue

            # '+MESIN' (tidak menambah Jumlah, hanya mesin)
            if '+MESIN' in jstr:
                total_mesin += extract_mesin(spec['Mesin'])
                continue

            # '+<angka>' menambah jumlah
            try:
                inc = float(jstr[1:].replace('.', '').replace(',', ''))
                total_jumlah += inc
                total_mesin += extract_mesin(spec['Mesin'])
            except ValueError:
                print(f"[SKIP] Jumlah plus tidak valid di {o}: '{jstr}'")

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

def hhmm_to_minutes(hhmm: str) -> int:
    jam, menit = map(int, hhmm.split(":"))
    return jam * 60 + menit

def to_hhmm(total_minutes: int) -> str:
    jam = total_minutes // 60
    menit = total_minutes % 60
    return f"{jam:02d}:{menit:02d}"

def to_str(m, is_end=False):
    m = m % 1440
    if m == 0 and is_end:
        return "24:00"
    return f"{m // 60:02d}:{m % 60:02d}"

def merge_adjacent_blocks(jadwal):
    df = pd.DataFrame(jadwal)
    df['Start'] = df['Jam Mulai'].apply(lambda x: int(x.split(':')[0]) * 60 + int(x.split(':')[1]))
    df['End'] = df['Jam Selesai'].apply(lambda x: int(x.split(':')[0]) * 60 + int(x.split(':')[1]))

    df = df.sort_values(by=['Order', 'Mesin', 'Hari', 'Start']).reset_index(drop=True)

    merged = []
    prev = None

    for _, row in df.iterrows():
        curr = {
            'Order': row['Order'],
            'Mesin': row['Mesin'],
            'Hari': row['Hari'],
            'Start': row['Start'],
            'End': row['End'],
        }

        if prev and all([
            prev['Order'] == curr['Order'],
            prev['Mesin'] == curr['Mesin'],
            prev['Hari'] == curr['Hari'],
            prev['End'] == curr['Start']
        ]):
            prev['End'] = curr['End']
        else:
            if prev:
                merged.append(prev)
            prev = curr

    if prev:
        merged.append(prev)

    def to_str(m):
        return f"{m // 60:02d}:{m % 60:02d}" if m < 1440 else "24:00"

    final = [{
        'Order': m['Order'],
        'Mesin': m['Mesin'],
        'Hari': m['Hari'],
        'Jam Mulai': to_str(m['Start']),
        'Jam Selesai': to_str(m['End'])
    } for m in merged]

    return final

# Break
def apply_manual_break(jadwal_list, mesin_terpakai_wbp, max_break_per_hari=5):
    if mesin_terpakai_wbp:
        mesin_index = {m: i for i, m in enumerate(mesin_terpakai_wbp)}
        jadwal_list = sorted(jadwal_list, key=lambda row: mesin_index.get(row["Mesin"], float('inf')))

    ISTIRAHAT_AWAL, ISTIRAHAT_AKHIR = 19*60, 21*60
    AKHIR_HARI = 24*60
    to_min = lambda t: int(t.split(":")[0]) * 60 + int(t.split(":")[1])
    # to_str  = lambda m: f'{m//60:02d}:{m%60:02d}'


    jadwal_dibagi = []
    for row in jadwal_list:
        jam_mulai = to_min(row["Jam Mulai"])
        jam_selesai = to_min(row["Jam Selesai"])
        hari = int(row["Hari"].split()[-1])

        if jam_selesai <= 1440:
            jadwal_dibagi.append(row)
        else:
            # Bagi ke dua hari
            jadwal_dibagi.append({
                "Order": row["Order"],
                "Mesin": row["Mesin"],
                "Hari": f"Day {hari}",
                "Jam Mulai": row["Jam Mulai"],
                "Jam Selesai": "24:00"
            })
            jadwal_dibagi.append({
                "Order": row["Order"],
                "Mesin": row["Mesin"],
                "Hari": f"Day {hari + 1}",
                "Jam Mulai": "00:00",
                "Jam Selesai": to_str(jam_selesai - 1440, is_end=True)
            })

    jadwal_baru, break_counter = [], {}
    occupied_until = defaultdict(lambda: defaultdict(int))

    for row in jadwal_dibagi:
        o, m = row["Order"], row["Mesin"]
        hari = int(row["Hari"].replace("Day ", "")) if isinstance(row["Hari"], str) else row["Hari"]
        jam_mulai = to_min(row["Jam Mulai"])
        sisa      = to_min(row["Jam Selesai"]) - jam_mulai

        if m not in mesin_terpakai_wbp:
            jadwal_baru.append(row)
            continue

        while sisa > 0:
            if jam_mulai >= AKHIR_HARI:
                shift, jam_mulai = divmod(jam_mulai, AKHIR_HARI)
                hari += shift
                occupied_until[m][hari] = max(occupied_until[m][hari], jam_mulai)
                # lanjutkan loop tanpa continue agar `sisa` tetap diproses

            jam_mulai = max(jam_mulai, occupied_until[m][hari])

            if jam_mulai < ISTIRAHAT_AWAL:
                blok = min(sisa, ISTIRAHAT_AWAL - jam_mulai)
                jadwal_baru.append(dict(Order=o, Mesin=m, Hari=f"Day {hari}",
                                        **{"Jam Mulai": to_str(jam_mulai),
                                           "Jam Selesai": to_str(jam_mulai + blok, is_end=True)}))
                jam_mulai += blok
                sisa      -= blok
                occupied_until[m][hari] = jam_mulai

                if sisa == 0:
                    break
                if jam_mulai == ISTIRAHAT_AWAL:
                    jam_mulai = ISTIRAHAT_AKHIR
                continue

            if jam_mulai >= ISTIRAHAT_AKHIR:
                if sisa <= 15:
                    jam_mulai = max(ISTIRAHAT_AWAL, occupied_until[m][hari])
                    jadwal_baru.append(dict(Order=o, Mesin=m, Hari=f"Day {hari}",
                                            **{"Jam Mulai": to_str(jam_mulai),
                                               "Jam Selesai": to_str(jam_mulai + sisa, is_end=True)}))

                    if ISTIRAHAT_AWAL <= jam_mulai < ISTIRAHAT_AKHIR and jam_mulai + sisa <= ISTIRAHAT_AKHIR:
                        occupied_until[m][hari] = ISTIRAHAT_AKHIR
                    else:
                        occupied_until[m][hari] = jam_mulai + sisa

                    break

                break_counter.setdefault(hari, [])
                if (m not in break_counter[hari] and len(break_counter[hari]) < max_break_per_hari):
                    break_counter[hari].append(m)
                else:
                    jam_mulai = max(ISTIRAHAT_AWAL, occupied_until[m][hari])
                    jadwal_baru.append(dict(Order=o, Mesin=m, Hari=f"Day {hari}",
                                            **{"Jam Mulai": to_str(jam_mulai),
                                               "Jam Selesai": to_str(jam_mulai + sisa, is_end=True)}))
                    occupied_until[m][hari] = jam_mulai + sisa
                    sisa = 0
                    break

                kapasitas_today = AKHIR_HARI - jam_mulai
                blok = min(sisa, kapasitas_today)
                # print(hari, blok)
                jadwal_baru.append(dict(Order=o, Mesin=m, Hari=f"Day {hari}",
                                        **{"Jam Mulai": to_str(jam_mulai),
                                           "Jam Selesai": to_str(jam_mulai + blok, is_end=True)}))
                jam_mulai += blok
                sisa      -= blok
                occupied_until[m][hari] = jam_mulai

                if jam_mulai >= AKHIR_HARI :
                    hari     += 1
                    jam_mulai = occupied_until[m][hari] = 0
                    continue

    # merge blok order sama
    merged_jadwal = merge_adjacent_blocks(jadwal_baru)

    # hitung break per order, mesin, hari
    AFTER_TOLERANCE = 15

    istirahat_per_order = {}
    grouped = defaultdict(list)
    for r in merged_jadwal:
        hari = int(r["Hari"].split()[-1])
        key = (r["Order"], r["Mesin"], hari)
        grouped[key].append(r)

    for (order, mesin, hari), items in grouped.items():
        items.sort(key=lambda x: to_min(x["Jam Mulai"]))

        last_before_break = None
        first_after_break = None

        for item in items:
            start = to_min(item["Jam Mulai"])
            end = to_min(item["Jam Selesai"])
            if end <= ISTIRAHAT_AWAL:
                last_before_break = end
            elif start >= ISTIRAHAT_AKHIR and first_after_break is None:
                first_after_break = start
                break

        if last_before_break is not None and first_after_break is not None:
            actual_break = first_after_break - max(last_before_break, ISTIRAHAT_AWAL)
            istirahat_per_order[(order, mesin, hari)] = actual_break

    # idle saat break
    mesin_per_hari = defaultdict(list)
    for row in merged_jadwal:
        hari = int(row["Hari"].split()[-1])
        mesin_per_hari[(row["Mesin"], hari)].append(row)

    for (mesin, hari), items in mesin_per_hari.items():
        items.sort(key=lambda x: to_min(x["Jam Mulai"]))
        last_end = 0
        for item in items:
            start = to_min(item["Jam Mulai"])
            if last_end <= ISTIRAHAT_AWAL and start >= ISTIRAHAT_AKHIR:
                if mesin not in break_counter.get(hari, []):
                    break_counter.setdefault(hari, []).append(mesin)
            last_end = to_min(item["Jam Selesai"])

        for i in range(len(items) - 1):
            end_i = to_min(items[i]["Jam Selesai"])
            start_j = to_min(items[i+1]["Jam Mulai"])
            order_i = items[i]["Order"]
            order_j = items[i+1]["Order"]
            idle_start = max(end_i, ISTIRAHAT_AWAL)
            idle_end   = min(start_j, ISTIRAHAT_AKHIR)

            if end_i >= ISTIRAHAT_AWAL and end_i <= ISTIRAHAT_AWAL + AFTER_TOLERANCE and \
            start_j >= ISTIRAHAT_AKHIR and order_i != order_j and idle_start < idle_end:

                if mesin not in break_counter.get(hari, []):
                    break_counter.setdefault(hari, []).append(mesin)

                istirahat_per_order[("__IDLE__", mesin, hari)] = idle_end - idle_start


    return (
        merged_jadwal,
        {h: set(v) for h, v in break_counter.items()},
        istirahat_per_order
    )




# Alokasi jam kerja
def allocation_schedule(merged_jadwal, durasi_pekerjaan, mesin_break_aware, breaks=None):
    if breaks is None:
        breaks = {}

    to_min = lambda t: 1440 if t == "24:00" else int(t.split(":")[0]) * 60 + int(t.split(":")[1])
    to_str = lambda m, is_end=False: (
        "24:00" if is_end and m % 1440 == 0 else f"{(m % 1440) // 60:02d}:{(m % 1440) % 60:02d}"
    )

    ISTIRAHAT_AWAL, ISTIRAHAT_AKHIR = 19 * 60, 21 * 60
    AKHIR_HARI = 24 * 60

    durasi_terjadwal = defaultdict(int)
    last_slot_per_order = {}

    for row in merged_jadwal:
        order, mesin = row['Order'], row['Mesin']
        key = (order, mesin)
        start = to_min(row['Jam Mulai'])
        end = to_min(row['Jam Selesai'])
        hari = int(row['Hari'].split()[-1])

        durasi_terjadwal[key] += end - start

        if key not in last_slot_per_order or (hari > last_slot_per_order[key][0]) or \
           (hari == last_slot_per_order[key][0] and end > last_slot_per_order[key][1]):
            last_slot_per_order[key] = (hari, end)

    mesin_order_break_set = {(o.strip(), m.strip()) for (m, o, _) in mesin_break_aware}

    for (order, mesin), durasi_terjadwal_menit in durasi_terjadwal.items():
        durasi_butuh_jam = durasi_pekerjaan.get((order, mesin), durasi_pekerjaan.get(order, 0))
        durasi_butuh_menit = round(durasi_butuh_jam * 60)

        if durasi_terjadwal_menit >= durasi_butuh_menit:
            continue

        sisa = durasi_butuh_menit - durasi_terjadwal_menit
        # sisaJam = sisa // 60
        # print('durasi tambahan:', sisaJam)
        hari_mulai, jam_mulai = last_slot_per_order.get((order, mesin), (1, 0))


        if jam_mulai >= AKHIR_HARI:
            hari_mulai += 1
            jam_mulai = 0

        while sisa > 0:
            wajib_break = (mesin, order) in mesin_order_break_set

            if jam_mulai >= AKHIR_HARI:
                hari_mulai += 1
                jam_mulai = 0

            if wajib_break:
                # 00:00–19:00
                if jam_mulai < ISTIRAHAT_AWAL:
                    end_jam = min(ISTIRAHAT_AWAL, jam_mulai + sisa)
                    if end_jam > jam_mulai:
                        merged_jadwal.append({
                            "Order": order,
                            "Mesin": mesin,
                            "Hari": f"Day {hari_mulai}",
                            "Jam Mulai": to_str(jam_mulai),
                            "Jam Selesai": to_str(end_jam, is_end=True)
                        })
                        sisa -= (end_jam - jam_mulai)
                        jam_mulai = end_jam

                if jam_mulai < ISTIRAHAT_AKHIR and sisa > 0:
                    if jam_mulai < ISTIRAHAT_AWAL:
                        break_duration = ISTIRAHAT_AKHIR - ISTIRAHAT_AWAL
                    else:
                        break_duration = ISTIRAHAT_AKHIR - jam_mulai

                    if break_duration > 0:
                        key = (order, mesin, hari_mulai)
                        if key not in breaks:
                            breaks[key] = 0
                        breaks[key] += break_duration

                    jam_mulai = ISTIRAHAT_AKHIR


                # 21:00–24:00
                if jam_mulai < AKHIR_HARI and sisa > 0:
                    end_jam = min(AKHIR_HARI, jam_mulai + sisa)
                    if end_jam > jam_mulai:
                        merged_jadwal.append({
                            "Order": order,
                            "Mesin": mesin,
                            "Hari": f"Day {hari_mulai}",
                            "Jam Mulai": to_str(jam_mulai),
                            "Jam Selesai": to_str(end_jam, is_end=True)
                        })
                        sisa -= (end_jam - jam_mulai)
                        jam_mulai = end_jam

            else:
                if jam_mulai < AKHIR_HARI:
                    end_jam = min(AKHIR_HARI, jam_mulai + sisa)
                    if end_jam > jam_mulai:
                        merged_jadwal.append({
                            "Order": order,
                            "Mesin": mesin,
                            "Hari": f"Day {hari_mulai}",
                            "Jam Mulai": to_str(jam_mulai),
                            "Jam Selesai": to_str(end_jam, is_end=True)
                        })
                        sisa -= (end_jam - jam_mulai)
                        jam_mulai = end_jam

    jadwal_final = merge_adjacent_blocks(merged_jadwal)

    return jadwal_final, breaks




def buat_model(orders, order_specs, mesin_df):
# def buat_model(orders, order_specs, mesin_df, resultCL, hitungAvgDaya):
    order_specs = add_mesin(order_specs)
    # print(order_specs)
    jumlah_all, jumlah_order, valid_orders = proses_jumlah_orders(orders, order_specs)
    print(valid_orders)

    all_machines = mesin_df['NoMesin'].tolist()
    special_machines = ['ST07', 'ST08', 'ST28', 'ST32', 'ST27', 'ST30', 'ST26', 'ST31',  'ST29', 'ST25'] # mesin Lebar & Dn besar
    machines = [m for m in all_machines if m not in special_machines]
    mesin_ranking = {mesin: idx for idx, mesin in enumerate(mesin_df['NoMesin'])}
    # print(dict(list(mesin_ranking.items())[:5]))


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
        'CL2': 110.4,
        'CL3': 18.0,
        'CL4': 12.7
    }

    # totalPower = {item['cl']: float(item['totalPerDay']) for item in resultCL}
    max_power_cl = max(totalPower, key=totalPower.get)
    machines_max_cl = SDP_mapping[max_power_cl]
    print(machines_max_cl)

    model = LpProblem("MachineOrderScheduling", LpMinimize)

    # Kapasitas & durasi mesin
    kapasitas_mesin = {}
    durasi_pekerjaan = {}
    mesin_dibutuhkan = {}

    for o in valid_orders:
        for spec in order_specs[o]:
            mesin_dibutuhkan[o] = extract_mesin(spec["Mesin"])

            RjtWE = float(spec['RjtWE'])
            kapasitas_mesin[o] = (((100 * 6 * 2.54) / RjtWE) / 100) * 60
            durasi_total = jumlah_order[o] / kapasitas_mesin[o]
            durasi_pekerjaan[o] = (durasi_total / mesin_dibutuhkan[o])
        print(f"Order: {o}, Jumlah: {jumlah_order[o]}, Mesin Dibutuhkan: {mesin_dibutuhkan[o]}, Durasi Pekerjaan: {durasi_pekerjaan[o]}")

    durasi_slot = {}
    for o in valid_orders:
        durasi_slot[o] = math.ceil(durasi_pekerjaan[o] * SLOT_PER_HOUR)
        # print(o, durasi_slot[o])

    # Variable
    x = {}
    y = {}


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
    print('sorted_jumlah : ', sorted_jumlah)

    used_machines = set()
    machine_bngwa = {}

    for o in sorted_jumlah:
        for spec in order_specs[o]:
            jumlah_mesin = extract_mesin(spec["Mesin"])
            bngwa = spec.get("BngWA")
            lebar = float(spec['Lebar'])
            denier = float(spec['Denier'])
            mesin_dipakai = 0

            # seleksi mesin
            if lebar > 110 and denier > 1000:
                mesin_kandidat = [m for m in special_machines]
            else:
                mesin_kandidat = [m for m in machines]

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
                    model += start_slot[o2][m] >= end_slot[o1][m] + 1 - (1 - y[o1][m]) * TOTAL_SLOTS - (1 - y[o2][m]) * TOTAL_SLOTS


    for o in valid_orders:
        for m in all_machines:
            model += end_slot[o][m] == start_slot[o][m] + durasi_slot[o] - 1




    start_time = time.time()

    solver = PULP_CBC_CMD(presolve=False)
    solver = PULP_CBC_CMD(gapRel=0.005) # solution is within 5% of the best possible
    model.solve(solver)


    end_time = time.time()
    excTime = end_time - start_time

    print("Variables:", len(model.variables()))
    print("Constraints:", len(model.constraints))
    print("Status:", LpStatus[model.status])


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

                    if (seg_end + 1) % SLOT_PER_DAY == 0:
                        jam_selesai = "24:00"
                        selesai_menit = 1440
                    else:
                        # jam_selesai = to_hhmm(seg_end + 1)  # <-- Perlu batasi agar tidak lebih dari 24:00
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
    # print(df_hasil)

    mesin_terurut = sorted(
        [m for m in mesin_kandidat_break if m in mesin_ranking],
        key=lambda m: mesin_ranking[m],
        reverse=True
    )
    # print('mesin_terurut ', mesin_terurut)


    jadwal_break, mesin_kena_break_per_hari, breaks = apply_manual_break(df_hasil.to_dict(orient="records"), mesin_terurut)
    jadwal_final, updated_breaks = allocation_schedule(
        jadwal_break,
        durasi_pekerjaan,
        mesin_break_aware=breaks,
        breaks=breaks
    )

    merged_jadwal = sorted(jadwal_final, key=lambda x: (int(x['Hari'].split()[-1]), mesin_ranking[x['Mesin']]))
    df_hasil_break = pd.DataFrame(merged_jadwal)
    print(df_hasil_break)


    #  hitung makespan
    jam_mulai_semua = []
    jam_selesai_semua = []

    for _, row in df_hasil_break.iterrows():
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



    total_menit = 0
    for (order, mesin, hari), menit in sorted(updated_breaks.items(), key=lambda x: int(x[0][2])):
        # print(f"{order} ({mesin}) – Day {hari}: break {menit // 60} jam {menit % 60} menit")
        total_menit += menit

    print('Mesin beristirahat selama: ', total_menit)

    # total_mesin_kena_break = sum(len(mesin_set) for mesin_set in mesin_kena_break_per_hari.values())
    # print('total_mesin_kena_break ', total_mesin_kena_break)



    # dayaPerMenit = 151.25/60                  # CL3 / 60
    dayaPerMenit = 28.52 / 60                  # CL1, CL2 / 60
    # dayaIst1Mesin = dayaPerMenit * 120
    # dayaIstTotal = dayaIst1Mesin * total_mesin_kena_break
    dayaIstTotal = dayaPerMenit * total_menit

    # REAL
    # print("DEBUG: hitungAvgDaya =", hitungAvgDaya)
    # dayaIstTotal = hitungAvgDaya['average_power_per_minute'] * total_menit


    return df_hasil_break.to_dict(orient='records'), makespan_jam, excTime, dayaIstTotal
    # return df_hasil_break.to_dict(orient='records'), '', excTime, dayaIstTotal

