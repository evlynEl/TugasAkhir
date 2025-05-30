import pandas as pd
import sys
import numpy as np
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
        df.columns = df.columns.map(lambda x: str(x).strip())

        # Cek apakah kolom Unnamed: 38 ada
        if 'Unnamed: 38' in df.columns:
            last_col = df.columns.get_loc('Unnamed: 38')
            mesin_col = 'Unnamed: 22'
            potong_col = 'Unnamed: 37'
            keterangan_col = 'Unnamed: 38'
        elif 'Unnamed: 37' in df.columns:
            last_col = df.columns.get_loc('Unnamed: 37')
            mesin_col = 'Unnamed: 21'
            potong_col = 'Unnamed: 36'
            keterangan_col = 'Unnamed: 37'

        if last_col is not None:
            # Potong dataframe hanya sampai idx jika ditemukan
            df = df.iloc[:, :last_col + 1]

        # Pastikan kolom Potong dan Keterangan tetap ada
        for col in [potong_col, keterangan_col]:
            if col not in df.columns:
                df[col] = pd.NA

        # Hapus kolom A jika semua nilainya kosong
        if df.iloc[:, 0].isna().all():
            df = df.drop(columns=df.columns[0])

        df = df.reset_index(drop=True)

        # Hapus kolom kosong antar kolom yang memiliki data
        df = df.dropna(axis=1, how='all')

        def is_kosong(val):
            return pd.isna(val) or str(val).strip() == ""

        # Pastikan index baris aman
        for i in range(len(df) - 1):
            if str(df.iat[i, 0]).strip().upper() == "AWAL":
                if i + 1 < len(df):
                    # Ambil nilai jika kolom tersedia, jika tidak isi None
                    tanggal = df.at[i, 'MULAI'] if 'MULAI' in df.columns else None
                    mesin   = df.at[i, mesin_col] if mesin_col in df.columns else None
                    potong  = df.at[i, potong_col] if potong_col in df.columns else None
                    ket     = df.at[i, keterangan_col] if keterangan_col in df.columns else None

                    # Isi ke baris bawahnya
                    if is_kosong(df.at[i+1, 'MULAI']):
                        df.at[i+1, 'MULAI'] = tanggal
                    if is_kosong(df.at[i+1, mesin_col]):
                        df.at[i+1, mesin_col] = mesin
                    if potong_col in df.columns:
                        if is_kosong(df.at[i+1, potong_col]):
                            df.at[i+1, potong_col] = potong
                    if keterangan_col in df.columns:
                        if is_kosong(df.at[i+1, keterangan_col]):
                            df.at[i+1, keterangan_col] = ket

                    # Kosongkan isi baris 'AWAL
                    df.at[i, 'MULAI'] = np.nan
                    df.at[i, mesin_col] = np.nan
                    df.at[i, potong_col] = np.nan
                    df.at[i, keterangan_col] = np.nan

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

    # Tambahkan kolom 'NoOrder' paling kiri
    df_final.insert(0, 'NoOrder', '')

    for kol in ['Corak']:
        df_final[kol] = df_final[kol].astype(str).str.upper()

    # Fungsi untuk membersihkan teks pada kolom 'Jumlah'
    def bersihkan_jumlah(jumlah):
        # Pastikan jumlah dalam format string
        if pd.isnull(jumlah): return ''  # Jika NaN, kembalikan string kosong
        jumlah = str(jumlah).strip()
        jumlah = re.sub(r'[\s]', '', jumlah)  # Hapus semua spasi
        jumlah = re.sub(r'(?<=\+|\-)\s*', '', jumlah)  # Hapus spasi setelah tanda + atau -
        jumlah = re.sub(r'\b(mesin|mesim|msn|mesn)\b', lambda m: 'MESIN', jumlah, flags=re.IGNORECASE)  # Ganti mesin, mesim, msn jadi uppercase

        # Coba cari angka di awal string, dan format dengan koma
        match = re.match(r'^([+-]?)([\d.,]+)(\s*(MESIN|MSN|MESIM|MESN))?$', jumlah, re.IGNORECASE)

        if match:
            tanda = match.group(1)
            angka_str = match.group(2)
            label = match.group(3)

            original = angka_str

            # Case: Angka hanya pakai titik
            if '.' in angka_str and ',' not in angka_str:
                parts = angka_str.split('.')
                if all(len(part) == 3 for part in parts[1:]):  # contoh: 1.000 atau 1.000.000
                    angka_str = angka_str.replace('.', '')  # titik = ribuan


            # Case: Angka hanya pakai koma
            elif ',' in angka_str and '.' not in angka_str:
                parts = angka_str.split(',')
                if all(len(part) == 3 for part in parts[1:]):  # contoh: 1,000 atau 1,000,000
                    angka_str = angka_str.replace(',', '')  # koma = ribuan

            try:
                angka_float = float(angka_str)
                if angka_float.is_integer():
                    formatted = f"{int(angka_float):,}"
                else:
                    formatted = f"{angka_float:,.2f}"
                if tanda:
                    formatted = tanda + formatted
                if label:
                    formatted += ' MESIN'
                return formatted
            except:
                return original

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
