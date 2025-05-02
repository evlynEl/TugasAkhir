import pulp
import pandas as pd
from datetime import datetime, timedelta
from collections import defaultdict, OrderedDict
import re

# function unk update jumlah mesin kalau +mesin
# def merge_orders(data):
#     # print("Data:", data)

#     merged = {}

#     for item in data:
#         no_order = item["NoOrder"]
#         jumlah = item["Jumlah"]
#         mesin = item["Mesin"]

#         if no_order not in merged:
#             merged[no_order] = item.copy()
#             # Pastikan Jumlah angka, jika bukan (seperti '+mesin'), default 0
#             merged[no_order]["Jumlah"] = jumlah if isinstance(jumlah, (int, float)) else 0
#             merged[no_order]["Mesin"] = mesin
#         else:
#             # Update mesin
#             merged[no_order]["Mesin"] += mesin
#             # Jumlah hanya diisi jika belum diset dan input jumlah bukan '+mesin'
#             if isinstance(jumlah, (int, float)) and merged[no_order]["Jumlah"] == 0:
#                 merged[no_order]["Jumlah"] = jumlah

#     return list(merged.values())

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
        return int(match.group(1))  # Ambil angka yang ditemukan
    return 0  # Jika tidak ada angka MESIN, return 0

def buat_model(orders, order_specs):
    # print("Orders:", orders)
    # print("Order Specs:", order_specs)

    # SET
    days = range(7)
    shifts = ['pagi', 'sore', 'malam']
    machines = ['SO{:02d}'.format(i) for i in range(1, 41)] + ['ST{:02d}'.format(i) for i in range(1, 77)]

    # SDP Mapping
    SDP_CL1 = ['SO{:02d}'.format(i) for i in range(1, 17)]
    SDP_CL2 = ['SO{:02d}'.format(i) for i in range(17, 33)]
    SDP_CL3 = ['SO{:02d}'.format(i) for i in range(33, 41)] + ['ST{:02d}'.format(i) for i in range(1, 5)]
    SDP_CL4 = ['ST{:02d}'.format(i) for i in list(range(5,13)) + list(range(25,29)) + list(range(33,45))]
    SDP_CL5 = ['ST{:02d}'.format(i) for i in list(range(13,25)) + list(range(45,69))]
    SDP_CL6 = ['ST{:02d}'.format(i) for i in list(range(29,33)) + list(range(69,77))]

    SDP_rest_allowed = SDP_CL1 + SDP_CL2 + SDP_CL3 + SDP_CL4
    special_machines = ['ST07', 'ST08'] + ['ST{:02d}'.format(i) for i in range(25,33)]

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
    shift_intervals = {
        'pagi': [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(7, 15)],
        'sore': [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(15, 23)],
        'malam': [f"{str(h%24).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(23, 31)],
    }

    jumlah_all, jumlah_order, valid_orders = proses_jumlah_orders(orders, order_specs)
    # print(valid_orders)

    # PROBLEM
    prob = pulp.LpProblem("Scheduling_Minimize_Max_SDP_Load", pulp.LpMinimize)

    # VARIABLES
    intervals = [f"{str(h).zfill(2)}:00-{str((h+1)%24).zfill(2)}:00" for h in range(24)]
    # Menentukan jam istirahat yang relevan
    istirahat_intervals = ['19:00-20:00', '20:00-21:00', '21:00-22:00']

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

    r = pulp.LpVariable.dicts("rest", (machines, days), cat="Binary")
    start = pulp.LpVariable.dicts("start", (machines, orders, days, intervals), cat="Binary")
    # waktu 24 jam
    all_intervals = [
        f"{str(h % 24).zfill(2)}:00-{str((h + 1) % 24).zfill(2)}:00"
        for h in range(7, 31)
    ]

    # Per hari, daya listrik maksimum SDP
    max_load_per_day = pulp.LpVariable.dicts("max_load", days, cat="Continuous", lowBound=0)

    # INTERNAL: total aktif mesin di setiap SDP setiap hari
    load_SDP_day = pulp.LpVariable.dicts("load_SDP_day", (SDP_names, days), cat="Continuous", lowBound=0)

    # OBJECTIVE
    prob += pulp.lpSum(max_load_per_day[d] for d in days)

    # CONSTRAINTS
    # Mesin khusus ST07, ST08, ST25-32 hanya boleh kerjakan order Lebar > 110 dan Denier > 1000
    for m in special_machines:
        for o in orders:
            for spec in order_specs[o]:
                if float(spec['Lebar']) <= 110 or float(spec['Denier']) <= 1000:
                    for d in days:
                        for s in intervals:
                            prob += x[m][o][d][s] == 0

    # Mesin dari SDP CL1-CL4 bisa istirahat, jika mesin beristirahat mulai jam 19.00, update r[m][d] menjadi 1
    for m in SDP_rest_allowed:
        for d in days:
            istirahat = [interval for interval in shift_intervals['sore'] if interval in istirahat_intervals]
            # Menambahkan constraint untuk memeriksa apakah mesin mengerjakan order pada shift istirahat
            prob += r[m][d] == pulp.lpSum(x[m][o][d][s] for o in orders for s in istirahat)  # Periksa apakah mesin mengerjakan order di shift istirahat
            # Mengatur r[m][d] menjadi 1 jika ada pekerjaan pada interval istirahat
            prob += r[m][d] >= pulp.lpSum(x[m][o][d][s] for o in orders for s in istirahat)


    # Mesin di SDP CL5, CL6 tidak bisa istirahat
    for m in (SDP_CL5 + SDP_CL6):
        for d in days:
            prob += r[m][d] == 0

    # Jumlah mesin istirahat per hari hanya boleh 3
    for d in days:
        prob += pulp.lpSum(r[m][d] for m in SDP_rest_allowed) == 3

    # Kapasitas mesin dihitung berdasarkan RjtWE (Weft)
    kapasitas_mesin = {}

    for o in orders:
        for spec in order_specs[o]:
            RjtWE = float(spec['RjtWE'])  # Ambil Weft dari order_specs
            kapasitas_mesin[o] = ((100 * 6 * 2.54) / RjtWE) * 60  # Kapasitas mesin dalam meter/jam

    # Hitung durasi pekerjaan hanya untuk order yang valid
    durasi_pekerjaan = {}

    for o in valid_orders:
        if o in kapasitas_mesin:
            kapasitas = kapasitas_mesin[o]
            durasi_pekerjaan[o] = jumlah_order[o] / kapasitas
        else:
            print(f"[SKIP] Tidak bisa hitung durasi untuk order {o}")

    # satu start point per mesin-order-hari
    for m in machines:
        for o in valid_orders:
            for d in days:
                prob += pulp.lpSum(start[m][o][d][s] for s in intervals) <= 1

    # antrian order per mesin
    order_queue = {
        m: [o for o in valid_orders]  # Menyimpan urutan order valid yang harus dikerjakan oleh mesin m
        for m in machines
    }

    # Mesin mesin mengerjakan satu order per shift
    for m in machines:
        for d in days:
            for shift in shifts:
                prob += pulp.lpSum(x[m][o][d][s] for o in order_queue[m] for s in shift_intervals[shift]) == 1

    # Menambahkan constraint untuk durasi pekerjaan
    for o in valid_orders:
        for m in machines:
            for d in days:
                # Memastikan mesin hanya mengerjakan pekerjaan sesuai dengan durasi yang diperlukan
                prob += pulp.lpSum(x[m][o][d][interval] for interval in all_intervals) >=  durasi_pekerjaan[o]

    # Waktu order harus dikerjakan seterusnya berdasarkan durasi setelah start
    interval_index = {s: i for i, s in enumerate(intervals)}

    # Pastikan interval berkelanjutan
    for m in machines:
        for o in valid_orders:
            durasi = int(round(durasi_pekerjaan[o]))
            for d in days:
                for i in range(len(all_intervals) - durasi + 1):  # jaga agar tidak overflow
                    start_interval = all_intervals[i]
                    next_intervals = all_intervals[i:i + durasi]

                    # Jika order dimulai di sini, maka semua interval berikutnya harus terpakai
                    for j, interval in enumerate(next_intervals):
                        prob += x[m][o][d][interval] >= start[m][o][d][start_interval]




    # Alokasikan mesin dan order untuk interval tertentu
    for m in machines:
        for o in valid_orders:
            for d in days:
                for i in range(1, len(all_intervals)):
                    prev = all_intervals[i - 1]
                    curr = all_intervals[i]
                    # Jika interval sekarang aktif, maka interval sebelumnya harus aktif juga
                    prob += x[m][o][d][curr] <= x[m][o][d][prev] + (1 - pulp.lpSum(start[m][o][d][s] for s in all_intervals))  # allow first active block


    # Tambahkan variabel sisa waktu kerja
    sisa_pekerjaan = pulp.LpVariable.dicts("sisa_pekerjaan", (machines, orders, days), lowBound=0)

    # Constraint untuk memindahkan pekerjaan ke hari berikutnya
    for m in machines:
        for o in valid_orders:
            for d in days:
                if d < 6:
                    kerja_hari_ini = pulp.lpSum(x[m][o][d][interval] for interval in all_intervals)
                    prob += sisa_pekerjaan[m][o][d+1] == sisa_pekerjaan[m][o][d] - kerja_hari_ini

    # Mengalokasikan sisa pekerjaan pada hari berikutnya
    for m in machines:
        for o in valid_orders:
            for d in days:
                prob += pulp.lpSum(x[m][o][d][interval] for interval in all_intervals) + sisa_pekerjaan[m][o][d] >= durasi_pekerjaan[o]  # Pastikan pekerjaan selesai

    # Jumlah mesin yang mengerjakan setiap order
    for o in valid_orders:
        for spec in order_specs[o]:
            mesin_dibutuhkan = extract_mesin(spec["Mesin"])
            prob += pulp.lpSum(x[m][o][d][s] for m in machines for d in days for s in all_intervals) <= float(mesin_dibutuhkan) * durasi_pekerjaan[o]

    # Menghitung beban tertinggi untuk setiap SDP pada setiap hari
    for d in days:
        for sdp in SDP_names:
            max_beban = pulp.lpSum(load_SDP_day[sdp][d] for m in machines if m in SDP_rest_allowed)  # Beban tertinggi di SDP CL1-4
            for m in machines:
                # Jika mesin adalah mesin dengan beban tertinggi pada SDP CL
                if pulp.lpSum(load_SDP_day[sdp][d] for m in machines if m == m) == max_beban and m in SDP_rest_allowed:
                    prob += r[m][d] == 1  # Mesin bisa diistirahatkan
                else:
                    prob += r[m][d] == 0  # Mesin tetap bekerja

    # Mengatur mesin yang diistirahatkan (r[m][d] == 1) untuk tidak mengerjakan order pada shift tertentu
    for m in machines:
        for d in days:
            for interval in all_intervals:
                prob += pulp.lpSum(x[m][o][d][interval] for o in orders) <= (1 - r[m][d])  # Mesin tidak mengerjakan order jika diistirahatkan

    # satu hari dan satu interval Mesin tidak boleh mengerjakan lebih dari satu order
    for m in machines:
        for d in days:
            for s in all_intervals:
                prob += pulp.lpSum(x[m][o][d][s] for o in orders) <= 1


    start_time_value = {}
    finish_time_value = {}

    for m in machines:
        for o in valid_orders:
            for d in days:
                for interval in all_intervals:
                    start_hour = int(interval.split('-')[0].split(':')[0])
                    start_time_value[m, o, d, interval] = start_hour
                    durasi = durasi_pekerjaan[o]
                    finish_time_value[m, o, d, interval] = start_hour + durasi


    # Constraint agar mesin terus mengerjakan order yang sama tanpa berganti
    for m in machines:
        for o in valid_orders:
            for d in days:
                for i, interval in enumerate(all_intervals):
                    durasi = int(round(durasi_pekerjaan[o]))
                    jam_mulai = int(interval.split('-')[0].split(':')[0])
                    jam_selesai = jam_mulai + durasi
                    interval_aktif = []

                    for next_interval in all_intervals[i:]:
                        next_jam = int(next_interval.split('-')[0].split(':')[0])
                        if next_jam < jam_selesai:
                            interval_aktif.append(next_interval)

                    prob += (
                        pulp.lpSum([x[m][o][d][intv] for intv in interval_aktif]) >= durasi * x[m][o][d][interval]
                    )

    # SOLVE
    prob.solve()

    # Generate jadwal
    durasi_per_shift = 8
    jadwal_produksi = []

    # Loop untuk mengambil hasil dari variabel x dan menyusun jadwal produksi
    for d in days:
        for o in valid_orders:
            for m in machines:
                for shift in ['pagi', 'sore', 'malam']:
                    for interval in shift_intervals[shift]:

                        # Jika mesin m mengerjakan order o pada hari d dan interval waktu tertentu
                        if pulp.value(x[m][o][d][interval]) == 1:
                            tgl_mulai = next(
                                (spec['TglMulai'] for spec in order_specs[o] if '+MESIN' not in spec['Jumlah'].upper()),
                                order_specs[o][0]['TglMulai']  # fallback jika semua "+MESIN"
                            )


                            # Hitung jam mulai berdasarkan tanggal mulai dan interval shift
                            jam_awal = int(interval.split('-')[0].split(':')[0])
                            jam_mulai = datetime.strptime(tgl_mulai, "%m/%d/%Y") + timedelta(days=d, hours=jam_awal)

                            jam_selesai = jam_mulai + timedelta(hours=1)

                            jadwal_produksi.append({
                                'Order': o,
                                'Mesin': m,
                                'Hari': d,
                                'Shift': interval,
                                'Jam Mulai': jam_mulai.strftime("%H:%M"),
                                'Jam Selesai': jam_selesai.strftime("%H:%M"),
                                'Durasi (jam)': 1,
                                'Waktu Istirahat': '19:00 - 21:00' if (interval == '15:00-16:00' and pulp.value(r[m][d]) == 1) else None
                            })




    # Konversi ke DataFrame untuk kemudahan manipulasi dan visualisasi
    df_jadwal = pd.DataFrame(jadwal_produksi)
    # print(df_jadwal)

    # Menampilkan DataFrame dalam format tabel
    return df_jadwal.to_dict(orient='records')

