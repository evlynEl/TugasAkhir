<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MhnPenerimaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.MhnPenerima', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;
        $divisiId = $request->input('divisiId');
        $objekId = $request->input('objekId');
        $kelompokId = $request->input('kelompokId');
        $kelutId = $request->input('kelutId');
        $subkelId = $request->input('subkelId');

        $divisiId2 = $request->input('divisiId2');
        $objekId2 = $request->input('objekId2');
        $kelompokId2 = $request->input('kelompokId2');
        $kelutId2 = $request->input('kelutId2');
        $subkelId2 = $request->input('subkelId2');

        $kodeType = $request->input('kodeType');
        $kodeBarang = $request->input('kodeBarang');
        $PIB = $request->input('PIB');
        $kodeTransaksi = $request->input('kodeTransaksi');


        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        else if ($id === 'getDivisi2') {
            // mendapatkan daftar divisi penerima
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi
                ];
            }
            return datatables($divisi)->make(true);
        }

        else if ($id === 'getObjek2') {
            // mendapatkan daftar objek penerima
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $divisiId2]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek
                ];
            }
            // dd($objek, $request->all());
            return datatables($objek)->make(true);
        }

        else if ($id === 'getKelUt2') {
            // mendapatkan daftar kelompok utama penerima
            $kelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$objekId2]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);
        }

        else if ($id === 'getKelompok2') {
            // mendapatkan daftar kelompok penerima
            $kelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$kelutId2]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);
        }

        else if ($id === 'getSubkel2') {
            // mendapatkan daftar sub kelompok penerima
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$kelompokId2]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        else if ($id === 'getDivisi') {
            // mendapatkan daftar divisi pemberi
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_UserDivisi_Diminta @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi
                ];
            }
            return datatables($divisi)->make(true);
        }
        else if ($id === 'getObjek') {
            // mendapatkan daftar objek penerima
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_UserObjek_Diminta @XKdUser = ?, @XIdDivisi = ?', [$user, $divisiId]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek
                ];
            }
            // dd($objek, $request->all());
            return datatables($objek)->make(true);
        }

        else if ($id === 'getKelUt') {
            // mendapatkan daftar kelompok utama penerima
            $kelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$objekId]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);
        }

        else if ($id === 'getKelompok') {
            // mendapatkan daftar kelompok penerima
            $kelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$kelutId]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);
        }

        else if ($id === 'getSubkel') {
            // mendapatkan daftar sub kelompok penerima
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$kelompokId]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        else if ($id === 'getSubkelType') {
            // mendapatkan daftar sub kelompok type
            $subkeltype = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdSubKelompok_Type @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_subkeltype = [];
            foreach ($subkeltype as $detail_subkeltype) {
                $data_subkeltype[] = [
                    'IdType' => $detail_subkeltype->IdType,
                    'NamaType' => $detail_subkeltype->NamaType
                ];
            }
            return datatables($subkeltype)->make(true);
        }

        else if ($id === 'getType') {
            // get type
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_NamaType_Type @IdType = ?, @IdSubKel = ?', [$kodeType, $subkelId]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'PIB' => $detail_subkel->PIB
                ];
            }
            // dd($subkel);
            return response()->json($data_subkel);
        }

        else if ($id === 'cekPIB') {
            // cek PIB
            $cekPIB = DB::connection('ConnInventory')->select('exec SP_1003_INV_KodeBarang_Type @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?', [$kodeBarang, $subkelId2, $PIB]);

            if (count($cekPIB) > 0) {
                return response()->json(['success' => true], 200);
            } else {
                $message = 'Lakukan maintenance type sebelum melanjutkan proses mutasi!<br>'
                         . 'Kode Barang: ' . $kodeBarang . '<br>'
                         . 'Divisi: ' . $divisiId2 . '<br>'
                         . 'Sub Kelompok: ' . $subkelId2;
                return response()->json(['warning' => $message], 200);
            }
        }

        else if ($id === 'cekType') {
            // get saldo, satuan & total pengeluaran
            $type = DB::connection('ConnInventory')->select('exec SP_1273_INV_kodebarang_type1 @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?', [$kodeBarang, $subkelId, $PIB]);

            $data_type = [];
            foreach ($type as $detail_type) {
                $data_type[] = [
                    'IdType' => $detail_type->IdType,
                    'NamaType' => $detail_type->NamaType,
                    'KodeBarang' => $detail_type->KodeBarang,
                    'SaldoPrimer' => $detail_type->SaldoPrimer,
                    'SaldoSekunder' => $detail_type->SaldoSekunder,
                    'SaldoTritier' => $detail_type->SaldoTritier,
                    'Satuan_Primer' => $detail_type->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_type->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_type->Satuan_Tritier,
                    'PakaiAturanKonversi' => $detail_type->PakaiAturanKonversi
                ];
            }

            // get total saldo
            $totalSaldo = DB::connection('ConnInventory')->select('exec SP_1273_INV_CekBelumACC @IdTypeTransaksi = ?, @IdType = ?', ['02', $kodeType]);

            $data_totalSaldo = [];
            foreach ($totalSaldo as $detail_totalSaldo) {
                $data_totalSaldo[] = [
                    'Primer' => $detail_totalSaldo->Primer,
                    'Sekunder' => $detail_totalSaldo->sekunder,
                    'Tritier' => $detail_totalSaldo->tritier
                ];
            }

            $response_data = [
                'typeData' => $data_type,
                'totalSaldoData' => $data_totalSaldo
            ];

            return response()->json($response_data);
        }

        else if ($id === 'kodeBarangTerima') {
            // ambil satuan
            $satuan = DB::connection('ConnInventory')->select('exec SP_1003_INV_KodeBarang_Type @XKodeBarang = ?, @XIdSubKelompok = ?, @XPIB = ?', [$kodeBarang, $subkelId2, $PIB]);

            $data_satuan = [];
            foreach ($satuan as $detail_satuan) {
                $data_satuan[] = [
                    'satuan_primer' => $detail_satuan->satuan_primer,
                    'satuan_sekunder' => $detail_satuan->satuan_sekunder,
                    'satuan_tritier' => $detail_satuan->satuan_tritier,
                    'PakaiAturanKonversi' => $detail_satuan->PakaiAturanKonversi
                ];
            }
            return response()->json($data_satuan);
        }

        else if ($id === 'getSelect') {
            // mendapatkan saldo, satuan, pemasukan unk selected data table
            $selectData = DB::connection('ConnInventory')->select('exec SP_1003_INV_TujuanSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_selectData = [];
            foreach ($selectData as $detail_selectData) {
                $data_selectData[] = [
                    'IdDivisi' => $detail_selectData->IdDivisi,
                    'IdObjek' => $detail_selectData->IdObjek,
                    'IdKelompokUtama' => $detail_selectData->IdKelompokUtama,
                    'IdKelompok' => $detail_selectData->IdKelompok,
                    'IdSubkelompok' => $detail_selectData->IdSubkelompok,
                    'KodeBarang' => $detail_selectData->KodeBarang,
                    'SaldoPrimer' => $detail_selectData->SaldoPrimer,
                    'SaldoSekunder' => $detail_selectData->SaldoSekunder,
                    'SaldoTritier' => $detail_selectData->SaldoTritier,
                    'Satuan_Primer' => $detail_selectData->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_selectData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_selectData->Satuan_Tritier,
                    'JumlahPemasukanPrimer' => $detail_selectData->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_selectData->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_selectData->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_selectData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_selectData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_selectData->JumlahPengeluaranTritier,
                    'IdSubkelompok' => $detail_selectData->IdSubkelompok

                ];
            }

            $totalSaldo = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeType]);

            $data_totalSaldo = [];
            foreach ($totalSaldo as $detail_totalSaldo) {
                $data_totalSaldo[] = [
                    'Primer' => $detail_totalSaldo->Primer,
                    'Sekunder' => $detail_totalSaldo->sekunder,
                    'Tritier' => $detail_totalSaldo->tritier
                ];
            }

            $response_data = [
                'data_selectData' => $data_selectData,
                'totalSaldoData' => $data_totalSaldo
            ];
        }


        else if ($id === 'getAllData') {
            // menampilkan semua data di data table

            if (str_contains($objekId2, 'Sparepart') || $objekId2 === 'Bahan produksi' || $objekId2 === 'Bahan Pembantu') {
                $kode = 11;
            } else {
                $kode = 2;
            }

            $allData = DB::connection('ConnInventory')->select('
            exec SP_1003_INV_List_Mohon_TmpTransaksi @Kode = ?, @XIdDivisi = ?, @XIdTypeTransaksi = ?', [$kode, $divisiId2, '02']);
            $data_allData = [];
            foreach ($allData as $detail_allData) {
                $formattedDate = date('m/d/Y', strtotime($detail_allData->SaatAwalTransaksi));

                $data_allData[] = [
                    'IdTransaksi' => $detail_allData->IdTransaksi,
                    'NamaType' => $detail_allData->NamaType,
                    'UraianDetailTransaksi' => $detail_allData->UraianDetailTransaksi,
                    'IdPenerima' => $detail_allData->IdPenerima,
                    'SaatAwalTransaksi' => $formattedDate,
                    'NamaDivisi' => $detail_allData->NamaDivisi,
                    'NamaObjek' => $detail_allData->NamaObjek,
                    'NamaKelompokUtama' => $detail_allData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_allData->NamaKelompok,
                    'NamaSubKelompok' => $detail_allData->NamaSubKelompok,
                    'KodeBarang' => $detail_allData->KodeBarang,
                    'IdType' => $detail_allData->IdType,
                    'JumlahPengeluaranPrimer' => $detail_allData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_allData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_allData->JumlahPengeluaranTritier,
                    'Satuan_primer' => $detail_allData->Satuan_primer,
                    'Satuan_Sekunder' => $detail_allData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_allData->Satuan_Tritier,
                    'IdPenerima1' => $detail_allData->IdPenerima1
                ];
            }
            // dd($request->all(), $data_allData);
            return response()->json($data_allData);
        }


        else if ($id === 'getData') {
            // menampilkan pemohon data di data table
            if (str_contains($objekId2, 'Sparepart') || $objekId2 === 'Bahan produksi' || $objekId2 === 'Bahan Pembantu') {
                $kode = 12;
            } else {
                $kode = 1;
            }

            $justData = DB::connection('ConnInventory')->select('
            exec SP_1003_INV_List_Mohon_TmpTransaksi @Kode = ?, @XIdDivisi = ?, @XIdTypeTransaksi = ?, @XUser = ?', [$kode, $divisiId2, '02', $user]);
            $data_justData = [];
            foreach ($justData as $detail_justData) {
                $formattedDate = date('m/d/Y', strtotime($detail_justData->SaatAwalTransaksi));

                $data_justData[] = [
                    'IdTransaksi' => $detail_justData->IdTransaksi,
                    'NamaType' => $detail_justData->NamaType,
                    'UraianDetailTransaksi' => $detail_justData->UraianDetailTransaksi,
                    'IdPenerima' => $detail_justData->IdPenerima,
                    'SaatAwalTransaksi' => $formattedDate,
                    'NamaDivisi' => $detail_justData->NamaDivisi,
                    'NamaObjek' => $detail_justData->NamaObjek,
                    'NamaKelompokUtama' => $detail_justData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_justData->NamaKelompok,
                    'NamaSubKelompok' => $detail_justData->NamaSubKelompok,
                    'KodeBarang' => $detail_justData->KodeBarang,
                    'IdType' => $detail_justData->IdType,
                    'JumlahPengeluaranPrimer' => $detail_justData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_justData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_justData->JumlahPengeluaranTritier,
                    'Satuan_primer' => $detail_justData->Satuan_primer,
                    'Satuan_Sekunder' => $detail_justData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_justData->Satuan_Tritier,
                    'IdPenerima1' => $detail_justData->IdPenerima1
                ];
            }
            // dd($data_justData);
            return response()->json($data_justData);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $a = (int)$request->input('a');
        $subkelId = $request->input('subkelId');
        $tanggal = $request->input('tanggal');
        $pemohon = $request->input('pemohon');
        $kodeTransaksi = $request->input('kodeTransaksi');
        $kodeType = $request->input('kodeType');
        $alasan = $request->input('alasan');
        $uraian = trim($alasan) === null ? '' : trim($alasan);
        $primer3 = $request->input('primer3');
        $sekunder3 = $request->input('sekunder3');
        $tritier3 = $request->input('tritier3');
        $subkelId2 = $request->input('subkelId2');


        // dd($request->all());

        if ($id === 'proses') {
            // proses terjadi
            if ($a === 1) { // ISI
                try{
                    // insert
                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_Insert_06_Transaksi
                        @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?,  @XIdPenerima = ?, @XSaatawalTransaksi = ?,
                        @XPrimer = ?, @XSekunder = ?, @XTritier = ?, @XAsalIdSubKelompok = ?, @XTujuanIdSubKelompok = ?',
                        ['06', $uraian, $kodeType, $pemohon, $tanggal,
                         $primer3, $sekunder3, $tritier3, $subkelId, $subkelId]
                    );


                    return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data Gagal ter-SIMPAN' . $e->getMessage()], 500);
                }
            }

            else if ($a === 2) { // KOREKSI
                try {
                    // update
                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_Update_TmpTransaksi
                        @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanSubkelompok = ?',
                        [$kodeTransaksi, $uraian, $primer3, $sekunder3, $tritier3, $subkelId2]
                    );

                    // dd($request->all());

                    return response()->json(['success' => 'Data sudah diKOREKSI!!'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data Gagal ter-KOREKSI' . $e->getMessage()], 500);
                }
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        $kodeTransaksi = $request->input('kodeTransaksi');
        if ($id === 'hapusBarang') {
            try {
                DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_TmpTransaksi  @XIdTransaksi = ?', [$kodeTransaksi]);

                return response()->json(['success' => 'Data sudah diHAPUS!!'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
