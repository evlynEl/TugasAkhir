# import pulp
from pulp import *
import pandas as pd
from datetime import datetime, timedelta
from collections import defaultdict
import re
from math import ceil

def main(data_list):
    # merged_data = merge_orders(data_list)

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

            if o not in jumlah_order and '+MESIN' not in jumlah_str:
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
        return int(match.group(1))
    return 0

def generate_shift_intervals(start_hour, end_hour):
    return [f"{str(h%24).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(start_hour, end_hour)]

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

def job_desc(valid_orders, order_specs, machines, jumlah_order):
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
    days = range(7)
    machines = ['SO{:02d}'.format(i) for i in range(1, 41)] + ['ST{:02d}'.format(i) for i in range(1, 77)]
    special_machines = ['ST07', 'ST08'] + ['ST{:02d}'.format(i) for i in range(25,33)]

    # SDP Mapping
    SDP_CL1 = ['SO{:02d}'.format(i) for i in range(1, 17)]
    SDP_CL2 = ['SO{:02d}'.format(i) for i in range(17, 33)]
    SDP_CL3 = ['SO{:02d}'.format(i) for i in range(33, 41)] + ['ST{:02d}'.format(i) for i in range(1, 5)]
    SDP_CL4 = ['ST{:02d}'.format(i) for i in list(range(5,13)) + list(range(25,29)) + list(range(33,45))]
    SDP_CL5 = ['ST{:02d}'.format(i) for i in list(range(13,25)) + list(range(45,69))]
    SDP_CL6 = ['ST{:02d}'.format(i) for i in list(range(29,33)) + list(range(69,77))]

    # Mengubah shift sore menjadi interval per jam
    shift_intervals = {
        'pagi': generate_shift_intervals(7, 15),
        'sore': generate_shift_intervals(15, 23),
        'malam': generate_shift_intervals(23, 31)
    }

    jumlah_all, jumlah_order, valid_orders = proses_jumlah_orders(orders, order_specs)
    job = job_desc(valid_orders, order_specs, machines, jumlah_order)
    print(job)

    intervals = [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(24)]

    completion_time = {
        o['Ord']: LpVariable(f"completion_{o['Ord']}", lowBound=0, cat="Integer")
        for o in job
    }

    used = {
        (o['Ord'], m): LpVariable(f"Used_{o['Ord']}_{m}", cat='Binary')
        for o in job for m in o['Mesin']
    }



    model = LpProblem("Penjadwalan_Produksi", LpMinimize)

    # Variabel keputusan biner
    x = LpVariable.dicts("schedule",
                        ((o['Ord'], m, d, h)
                        for o in job
                        for m in o['Mesin']
                        for d in days
                        for h in range(24)),
                        cat='Binary')


    # CONSTRAINT
    # Durasi Order
    for o in job:
        total_jam = lpSum(x[o['Ord'], m, d, h]
                        for m in o['Mesin']
                        for d in days
                        for h in range(24))
        model += total_jam == int(round(o['Durasi'])), f"Durasi_{o['Ord']}"


    # Setiap Mesin Hanya Boleh Menangani Satu Order per Jam
    for m in machines:
        for d in days:
            for h in range(24):
                model += lpSum(x[o['Ord'], m, d, h]
                            for o in job
                            if m in o['Mesin']) <= 1, f"SatuOrderPerMesin_{m}_{d}_{h}"

    # variabel biner: apakah order dijadwalkan
    scheduled = {o['Ord']: LpVariable(f"Scheduled_{o['Ord']}", cat='Binary') for o in job}

    for o in job:
        ord_id = o['Ord']
        durasi = o['Durasi']
        jml_mesin = o['JmlMesin']
        mesin_list = o['Mesin']

        total_required_slots = math.ceil(durasi * jml_mesin)

        # Allow skipping order if scheduled[ord_id] == 0
        model += lpSum(x[ord_id, m, d, h]
                    for m in mesin_list
                    for d in days
                    for h in range(24)) >= total_required_slots * scheduled[ord_id], \
                f"OrderScheduled_{ord_id}"
    #
    for o in job:
        ord_id = o['Ord']
        for m in o['Mesin']:
            model += lpSum(x[ord_id, m, d, h] for d in days for h in range(24)) >= 0.1 * used[ord_id, m], \
                    f"LinkUse_{ord_id}_{m}"

    # Jumlah Mesin Per Order
    for o in job:
        ord_id = o['Ord']
        model += lpSum(used[ord_id, m] for m in o['Mesin']) == o['JmlMesin'], \
                f"MesinAktif_{ord_id}"


    # SOLVE
    model.solve()
    # print("Status:", pulp.LpStatus[model.status])

    # Generate jadwal
    schedule_result = []

    for o in job:
        ord_id = o['Ord']
        durasi = o['Durasi']

        # cari semua (m,d,h) di mana order ini dijalankan
        used_slots = []
        for m in o['Mesin']:
            for d in days:
                for h in range(24):
                    key = (ord_id, m, d, h)
                    if x[key].varValue is not None and x[key].varValue > 0.5:
                        used_slots.append((m, d, h))

        # kelompokkan slot berdasarkan mesin
        mesin_group = {}
        for m, d, h in used_slots:
            mesin_group.setdefault(m, []).append((d, h))

        for mesin, dh_list in mesin_group.items():
            # urutkan waktu
            dh_list.sort()
            # ambil waktu paling awal (jam mulai)
            day, h_mulai = dh_list[0]
            jam_mulai = day * 24 + h_mulai
            jam_selesai = jam_mulai + durasi

            schedule_result.append({
                'Order': ord_id,
                'Mesin': mesin,
                'Hari': day,
                'Jam Mulai': f"{h_mulai:02d}:00",
                'Jam Selesai': f"{int(jam_selesai % 24):02d}:00"
            })


    # Konversi ke DataFrame untuk kemudahan manipulasi dan visualisasi
    df_jadwal = pd.DataFrame(schedule_result)
    # print(df_jadwal)

    # Menampilkan DataFrame dalam format tabel
    return df_jadwal.to_dict(orient='records')

