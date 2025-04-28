import pulp

def main(data_list):
    for item in data_list:
        NoOrder = item['NoOrder']
        Lebar = item['Lebar']
        RjtWA = item['RjtWA']
        RjtWE = item['RjtWE']
        Denier = item['Denier']
        Corak = item['Corak']
        BngWA = item['BngWA']
        BngWE = item['BngWE']
        Jumlah = item['Jumlah']
        TglMulai = item['TglMulai']
        Mesin = item['Mesin']
        PnjPotong = item['PnjPotong']
        Keterangan = item['Keterangan']
    return NoOrder, Lebar, RjtWA, RjtWE, Denier, Corak, BngWA, BngWE, Jumlah, TglMulai, Mesin, PnjPotong, Keterangan



# SET
days = range(7)
shifts = ['pagi', 'sore', 'malam']
machines = ['SO{:02d}'.format(i) for i in range(1, 41)] + ['ST{:02d}'.format(i) for i in range(1, 77)]
orders = [...]  # list of order IDs
order_specs = {...}  # dict: order_id -> {'Lebar': ..., 'Denier': ...}

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

# PROBLEM
prob = pulp.LpProblem("Scheduling_Minimize_Max_SDP_Load", pulp.LpMinimize)

# VARIABLES
x = pulp.LpVariable.dicts("assign", (machines, orders, days, shifts), cat="Binary")
r = pulp.LpVariable.dicts("rest", (machines, days), cat="Binary")

jumlah_mesin_rest = pulp.LpVariable.dicts("jumlah_mesin_rest", days, cat="Integer", lowBound=0)
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
        for s in shifts:
            prob += pulp.lpSum(x[m][o][d][s] for o in orders) <= 1

# Mesin khusus ST07, ST08, ST25-32 hanya boleh kerjakan order Lebar > 110 dan Denier > 1000
for m in special_machines:
    for o in orders:
        if order_specs[o]['Lebar'] <= 110 or order_specs[o]['Denier'] <= 1000:
            for d in days:
                for s in shifts:
                    prob += x[m][o][d][s] == 0

# Mesin dari SDP CL1-CL4 bisa istirahat, mematikan shift sore
for m in SDP_rest_allowed:
    for d in days:
        prob += pulp.lpSum(x[m][o][d]['sore'] for o in orders) <= (1 - r[m][d])

# Mesin di SDP CL5, CL6 tidak bisa istirahat
for m in (SDP_CL5 + SDP_CL6):
    for d in days:
        prob += r[m][d] == 0

# Jumlah mesin istirahat per hari
for d in days:
    prob += jumlah_mesin_rest[d] == pulp.lpSum(r[m][d] for m in machines)

# Jumlah mesin yang mengerjakan setiap order
for o in orders:
    prob += jumlah_mesin_order[o] == pulp.lpSum(x[m][o][d][s] for m in machines for d in days for s in shifts)

# Load SDP setiap hari
for sdp in SDP_names:
    for d in days:
        prob += load_SDP_day[sdp][d] == pulp.lpSum(
            x[m][o][d][s] for m in SDP_mapping[sdp] for o in orders for s in shifts
        )

# Set max_load_per_day[d] sebagai load tertinggi di hari d
for d in days:
    for sdp in SDP_names:
        prob += max_load_per_day[d] >= load_SDP_day[sdp][d]

# (Optional) Misal mau memastikan minimal jumlah mesin aktif supaya tidak semua mesin tidur, bisa ditambahkan.

# SOLVE
prob.solve()

