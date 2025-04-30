import pulp
import pandas as pd
# import matplotlib.pyplot as plt
# import matplotlib.dates as mdates
from datetime import datetime, timedelta
import pandas as pd

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
    order_specs = {}

    for item in data_list:
        NoOrder = item['NoOrder']
        orders.append(NoOrder)
        order_specs[NoOrder] = {
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
        }

    return {'orders': orders, 'order_specs': order_specs}

def generate_intervals(start_hour=7):
        intervals = []
        start = datetime.strptime(f"{start_hour}:00", "%H:%M")
        for _ in range(24):
            end = start + timedelta(hours=1)
            intervals.append(f"{start.strftime('%H:%M')}-{end.strftime('%H:%M')}")
            start = end
        return intervals

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

    from datetime import datetime, timedelta

    all_intervals = generate_intervals()


    jumlah_mesin_order = pulp.LpVariable.dicts("jumlah_mesin_order", orders, cat="Integer", lowBound=0)

    # Per hari, daya listrik maksimum SDP
    max_load_per_day = pulp.LpVariable.dicts("max_load", days, cat="Continuous", lowBound=0)

    # INTERNAL: total aktif mesin di setiap SDP setiap hari
    load_SDP_day = pulp.LpVariable.dicts("load_SDP_day", (SDP_names, days), cat="Continuous", lowBound=0)

    # OBJECTIVE
    prob += pulp.lpSum(max_load_per_day[d] for d in days)

    # CONSTRAINTS

    # Mesin hanya bisa kerjakan 1 order dalam 1 waktu
    for m in machines:
        for d in days:
            for s in intervals:
                prob += pulp.lpSum(x[m][o][d][s] for o in orders) <= 1

    # Mesin khusus ST07, ST08, ST25-32 hanya boleh kerjakan order Lebar > 110 dan Denier > 1000
    for m in special_machines:
        for o in orders:
            if float(order_specs[o]['Lebar']) <= 110 or float(order_specs[o]['Denier']) <= 1000:
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
        RjtWE = float(order_specs[o]['RjtWE'])  # Ambil Weft dari order_specs
        kapasitas_mesin[o] = ((100 * 6 * 2.54) / RjtWE) * 60  # Kapasitas mesin dalam meter/jam

    # Durasi pengerjaan pesanan dihitung berdasarkan kapasitas mesin
    durasi_pekerjaan = {}
    valid_orders = []

    for o in orders:
        jumlah_str = order_specs[o]['Jumlah']

        if 'MESIN' not in jumlah_str.upper():
            try:
                Jumlah = float(jumlah_str.replace(',', '').strip())
                kapasitas = kapasitas_mesin[o]
                durasi_pekerjaan[o] = Jumlah / kapasitas
                valid_orders.append(o)  # simpan hanya order valid
            except (ValueError, KeyError):
                print(f"[SKIP] Order {o} gagal dikonversi atau kapasitas tidak ditemukan.")
        else:
            print(f"[SKIP] Order {o} mengandung kata 'MESIN', tidak dihitung durasinya.")


    # Menambahkan constraint untuk durasi pekerjaan
    for o in valid_orders:
        durasi = durasi_pekerjaan[o]  # Durasi pekerjaan per order (jam)
        for m in machines:
            for d in days:
                # Memastikan mesin hanya mengerjakan pekerjaan sesuai dengan durasi yang diperlukan
                prob += pulp.lpSum(x[m][o][d][interval] for interval in all_intervals) >= durasi

    # Alokasikan mesin dan order untuk interval tertentu
    for m in machines:
        for d in days:
            for interval in all_intervals:
                prob += pulp.lpSum(x[m][o][d][interval] for o in orders) <= (1 - r[m][d])  # Mesin hanya bekerja jika tidak istirahat

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
        prob += jumlah_mesin_order[o] == pulp.lpSum(x[m][o][d][s] for m in machines for d in days for s in all_intervals)


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

    # Constraint: Mesin tidak boleh mengerjakan lebih dari satu order pada waktu yang bersamaan
    for m in machines:
        for d in days:
            for s in intervals:
                model += pulp.lpSum([x[m][o][d][s] for o in orders]) <= 1, f"SingleOrderPerMachine_{m}_{d}_{s}"


    # Constraint agar mesin terus mengerjakan order yang sama tanpa berganti
    # Untuk tiap mesin, order, hari, dan shift
    start_time_value = {}
    finish_time_value = {}

    for m in machines:
        for o in orders:
            for d in days:
                for s in shift_intervals:  # Iterasi berdasarkan shift pagi, sore, malam
                    for interval in shift_intervals[s]:  # Iterasi berdasarkan interval waktu dalam shift
                        # Ambil jam mulai shift dari interval (misal '07:00-08:00' -> jam mulai 07:00)
                        start_hour = int(interval.split('-')[0].split(':')[0])

                        # Tentukan waktu mulai berdasarkan shift
                        start_time_value[m, o, d, s] = start_hour

                        # Durasi pekerjaan untuk order o
                        durasi_pekerjaan_order = durasi_pekerjaan[o]

                        # Tentukan waktu selesai berdasarkan durasi pekerjaan
                        finish_time_value[m, o, d, s] = start_time_value[m, o, d, s] + durasi_pekerjaan_order



    # SOLVE
    prob.solve()

    # Durasi maksimum per shift (jam)
    durasi_per_shift = 8
    jadwal_produksi = []

    # Loop untuk mengambil hasil dari variabel x dan menyusun jadwal produksi
    for d in days:
        for o in orders:
            for m in machines:
                for shift, interval_list in shift_intervals.items():  # Iterasi menggunakan interval yang sudah didefinisikan
                    for interval in interval_list:
                        # Jika mesin m mengerjakan order o pada hari d dan interval waktu tertentu
                        if pulp.value(x[m][o][d][interval]) == 1:
                            tgl_mulai = order_specs[o]['TglMulai']  # Ambil tanggal mulai dari order_specs

                            # Hitung jam mulai berdasarkan tanggal mulai dan interval shift
                            jam_mulai = datetime.strptime(tgl_mulai, "%m/%d/%Y") + timedelta(days=d, hours=int(interval.split(":")[0]))
                            sisa_waktu = durasi_pekerjaan[o]  # Durasi pekerjaan untuk order ini

                            # Alokasikan waktu kerja per shift
                            while sisa_waktu > 0:
                                durasi = min(durasi_per_shift, sisa_waktu)
                                jam_selesai = jam_mulai + timedelta(hours=durasi)

                                # Simpan ke jadwal produksi dengan format hh:mm
                                jadwal_produksi.append({
                                    'Order': o,
                                    'Mesin': m,
                                    'Hari': d,
                                    'Shift': interval,  # Gunakan interval waktu yang lebih spesifik
                                    'Jam Mulai': jam_mulai.strftime("%H:%M"),
                                    'Jam Selesai': jam_selesai.strftime("%H:%M"),
                                    'Durasi (jam)': durasi,
                                    'Waktu Istirahat': '19:00 - 21:00' if (interval == '15:00-16:00' and pulp.value(r[m][d]) == 1) else None
                                })

                                # Update sisa waktu dan jam mulai berikutnya
                                sisa_waktu -= durasi
                                jam_mulai = jam_selesai



    # Konversi ke DataFrame untuk kemudahan manipulasi dan visualisasi
    df_jadwal = pd.DataFrame(jadwal_produksi)
    # print(df_jadwal)

    # Menampilkan DataFrame dalam format tabel
    return df_jadwal.to_dict(orient='records')

    # # Buat Gantt chart menggunakan matplotlib
    # fig, ax = plt.subplots(figsize=(10, 6))

    # # Plot semua jadwal order
    # for idx, row in df_jadwal.iterrows():
    #     ax.barh(row['Mesin'], (row['Jam Selesai'] - row['Jam Mulai']).seconds / 3600, left=row['Jam Mulai'])

    #     # Menambahkan label dengan nama order
    #     ax.text(row['Jam Mulai'] + (row['Jam Selesai'] - row['Jam Mulai']).seconds / 7200,
    #             idx, row['Order'], va='center', ha='center', color='white')

    # # Format sumbu waktu
    # ax.xaxis.set_major_locator(mdates.HourLocator(interval=2))
    # ax.xaxis.set_major_formatter(mdates.DateFormatter('%H:%M'))

    # # Penambahan label dan judul
    # plt.xlabel('Waktu')
    # plt.ylabel('Mesin')
    # plt.title('Jadwal Produksi')

    # plt.tight_layout()
    # plt.xticks(rotation=45)
    # plt.show()


