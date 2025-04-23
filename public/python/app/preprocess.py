import pandas as pd
import sys
import numpy as np
import unicodedata
import re


def main(file_stream):

    # File path
    # file_excel = r"D:\Kuliah\Semester 8\Data\MARIO EVELYN-20241219T024622Z-001\ORDER WB\2024\L-DESEMBER\5 DES.xlsx"
    # file_excel = pd.read_excel(file_path)
    xls = pd.ExcelFile(file_stream)
    sheet_names = xls.sheet_names

    hasil_semua_sheet = []

    for sheet in sheet_names:
        df = pd.read_excel(file_stream, sheet_name=sheet, skiprows=5)

        # Batasi kolom hanya sampai 'Unnamed: 37' (jika kolom ini ada)
        if 'Unnamed: 37' in df.columns:
            idx = df.columns.get_loc('Unnamed: 37')
            df = df.iloc[:, :idx+1]


        # Hapus kolom A jika semua nilainya kosong
        if df.iloc[:, 0].isna().all():
            df = df.drop(columns=df.columns[0])

        df = df.reset_index(drop=True)

        # Hapus kolom kosong antar kolom yang memiliki data
        df = df.dropna(axis=1, how='all')

        # Pastikan kolom 'Unnamed: 36' (Potong) dan 'Unnamed: 37' (Keterangan) ada
        for col in ['Unnamed: 36', 'Unnamed: 37']:
            if col not in df.columns:
                df[col] = pd.NA  # atau "" jika kamu lebih suka string kosong

        def is_kosong(val):
            return pd.isna(val) or str(val).strip() == ""

        # Pastikan index baris aman
        for i in range(len(df) - 1):
            if str(df.iat[i, 0]).strip().upper() == "AWAL":
                if i + 1 < len(df):
                    # Ambil nilai jika kolom tersedia, jika tidak isi None
                    tanggal = df.at[i, 'MULAI'] if 'MULAI' in df.columns else None
                    mesin   = df.at[i, 'Unnamed: 21'] if 'Unnamed: 21' in df.columns else None
                    potong  = df.at[i, 'Unnamed: 36'] if 'Unnamed: 36' in df.columns else None
                    ket     = df.at[i, 'Unnamed: 37'] if 'Unnamed: 37' in df.columns else None

                    # Isi ke baris bawahnya
                    if is_kosong(df.at[i+1, 'MULAI']):
                        df.at[i+1, 'MULAI'] = tanggal
                    if is_kosong(df.at[i+1, 'Unnamed: 21']):
                        df.at[i+1, 'Unnamed: 21'] = mesin
                    if is_kosong(df.at[i+1, 'Unnamed: 36']):
                        df.at[i+1, 'Unnamed: 36'] = potong
                    if is_kosong(df.at[i+1, 'Unnamed: 37']):
                        df.at[i+1, 'Unnamed: 37'] = ket

                    # Kosongkan isi baris 'AWAL
                    df.at[i, 'MULAI'] = ""
                    df.at[i, 'Unnamed: 21'] = ""
                    df.at[i, 'Unnamed: 36'] = ""
                    df.at[i, 'Unnamed: 37'] = ""

        # Hapus kolom dengan header 'x'
        if 'x' in df.columns:
            df = df.drop(columns=['x'])

        # Hapus baris yang seluruhnya kosong (NaN di semua kolom)
        df = df.dropna(how='all')

        df = df[df.iloc[:, 0] != 'AWAL']

        hasil_semua_sheet.append(df)

    # Gabungkan semua sheet
    df_final = pd.concat(hasil_semua_sheet, ignore_index=True)

    # Hapus kolom pertama
    df_final.drop(df_final.columns[0], axis=1, inplace=True)

    # Hapus baris yang seluruhnya kosong
    df_final.dropna(how='all', inplace=True)

    # Set header kolom
    df_final.columns = ['Lebar', 'RjtWA', 'RjtWE', 'Denier', 'Corak', 'BngWA', 'BngWE', 'Jumlah', 'TglMulai', 'Mesin', 'PnjPotong', 'Keterangan']

    # # Set data type numerik
    # numerik_kolom = ['Lebar', 'RjtWA', 'RjtWE']
    # for kolom in numerik_kolom:
    #     df_final[kolom] = df_final[kolom].astype(float).round(2).map(lambda x: f"{x:.2f}")

    # Tambahkan kolom 'NoOrder' paling kiri
    df_final.insert(0, 'NoOrder', '')

    for kol in ['Corak']:
        df_final[kol] = df_final[kol].astype(str).str.upper()

    # Fungsi untuk membersihkan teks pada kolom 'Jumlah'
    def bersihkan_jumlah(jumlah):
        if pd.isnull(jumlah): return ''  # Jika NaN, kembalikan string kosong
        jumlah = re.sub(r'[\s]', '', str(jumlah))  # Hapus semua spasi
        jumlah = re.sub(r'(?<=\+|\-)\s*', '', jumlah)  # Hapus spasi setelah tanda + atau -
        jumlah = re.sub(r'\b(mesin|mesim|msn|mesn)\b', lambda m: 'MESIN', jumlah, flags=re.IGNORECASE)  # Ganti mesin, mesim, msn jadi uppercase

        # Coba cari angka di awal string, dan format dengan koma
        match = re.match(r'([+-]?\d+)(MESIN)?', jumlah)
        if match:
            angka = int(match.group(1))
            formatted = f"{angka:,}"
            if match.group(2):  # Kalau ada 'MESIN' setelah angka
                formatted += match.group(2)
            return formatted

        return jumlah

    def bersihkan_mesin(mesin):
        if pd.isnull(mesin): return ''
        mesin = str(mesin)

        # Gabungkan dan perbaiki pola: + mesn -> +MESIN, -msn -> -MESIN
        mesin = re.sub(r'(?<=[\+\-])\s*(mesin|mesim|msn|mesn)\b', 'MESIN', mesin, flags=re.IGNORECASE)

        # Ganti berdiri sendiri (tanpa + atau -) menjadi MESIN
        mesin = re.sub(r'\b(mesin|mesim|msn|mesn)\b', 'MESIN', mesin, flags=re.IGNORECASE)

        # Ganti variasi 'order' ke ORDER
        mesin = re.sub(r'\b(0rder|orde|ord|order)\b', 'ORDER', mesin, flags=re.IGNORECASE)

        return mesin.strip()


    df_final['Jumlah'] = df_final['Jumlah'].apply(bersihkan_jumlah)
    df_final['Mesin'] = df_final['Mesin'].apply(bersihkan_mesin)

    # Replace NaN with None before returning
    df_final = df_final.replace({np.nan: None})
    return df_final.to_dict(orient='records')


if __name__ == "__main__":
    main(sys.argv[1])
