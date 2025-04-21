# pip install openpyxl
# pip install pandas

import pandas as pd
import sys
import numpy as np

def main(file_stream):

    # File path
    # file_excel = r"D:\Kuliah\Semester 8\Data\MARIO EVELYN-20241219T024622Z-001\ORDER WB\2024\L-DESEMBER\5 DES.xlsx"
    # file_excel = pd.read_excel(file_path)
    xls = pd.ExcelFile(file_stream)
    sheet_names = xls.sheet_names

    hasil_semua_sheet = []

    for sheet in sheet_names:
        df = pd.read_excel(file_stream, sheet_name=sheet, skiprows=5)

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

    # Tambahkan kolom 'NoOrder' paling kiri
    df_final.insert(0, 'NoOrder', '')

    # df_final.to_excel("C:/Users/Evelyn/Downloads/12 2024.xlsx", index=False)

    # Replace NaN with None before returning
    df_final = df_final.replace({np.nan: None})
    return df_final.to_dict(orient='records')

if __name__ == "__main__":
    main(sys.argv[1])
