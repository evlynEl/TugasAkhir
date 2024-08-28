<?php

namespace App\Http\Controllers\Inventory\Transaksi\Penghangusan;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccPenghangusanBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Penghangusan.AccPenghangusanBarang', compact('access'));
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
        $kodeTransaksi = $request->input('kodeTransaksi');

        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        if ($id === 'getDivisi') {
            // mendapatkan daftar divisi
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi
                ];
            }
            return datatables($divisi)->make(true);
        } else if ($id === 'getAllData') {
            // mendapatkan nama type & id type

            if ($objekId !== null) {
                $allData = DB::connection('ConnInventory')->select('
                exec SP_1003_INV_List_Mohon_TmpTransaksi @kode = 15, @XIdObjek = ?, @XIdDivisi = ?, @XIdTypeTransaksi = ?', [$objekId, $divisiId, '05']);
            } else {
                $allData = DB::connection('ConnInventory')->select('
                exec SP_1003_INV_List_Mohon_TmpTransaksi @kode = 2, @XIdDivisi = ?, @XIdTypeTransaksi = ?', [$divisiId, '05']);
            }

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
                    'IdPenerima1' => $detail_allData->IdPenerima1,
                    'IdType' => $detail_allData->IdType,
                    'KodeBarang' => $detail_allData->KodeBarang,
                    'IdSubkelompok' => $detail_allData->IdSubkelompok,
                    'JumlahPengeluaranPrimer' => $detail_allData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_allData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_allData->JumlahPengeluaranTritier
                ];
            }

            // dd($data_allData);

            return response()->json($data_allData);
        } else if ($id === 'getType') {
            // mendapatkan nama type & id type
            $type = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_type = [];
            foreach ($type as $detail_type) {
                $data_type[] = [
                    'SaldoPrimer' => $detail_type->SaldoPrimer,
                    'SaldoSekunder' => $detail_type->SaldoSekunder,
                    'SaldoTritier' => $detail_type->SaldoTritier,
                    'Satuan_Primer' => $detail_type->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_type->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_type->Satuan_Tritier,
                    'JumlahPengeluaranPrimer' => $detail_type->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_type->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_type->JumlahPengeluaranTritier
                ];
            }

            // dd($data_type);
            return response()->json($data_type);
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
        $user = trim(Auth::user()->NomorUser);
        $idTransaksi = $request->input('idTransaksi');
        $idType = $request->input('idType');
        $keluarPrimer = $request->input('keluarPrimer');
        $keluarSekunder = $request->input('keluarSekunder');
        $keluarTritier = $request->input('keluarTritier');

        if ($id === 'proses') {
            try{
                // proses
                $proses = DB::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian_transaksi
                    @IdTypeTransaksi = ?, @IdType = ?', ['06', $idType]);

                $jumlah = (int)$proses[0]->jumlah;

                if ($jumlah > 0) {
                    return response()->json(['warning' => 'Ada Transaksi Penyesuaian yang Belum Diacc untuk type ' .$idTransaksi], 200);
                } else {
                    DB::connection('ConnInventory')->statement('exec SP_1003_INV_Proses_ACC_Hangus
                    @IdTransaksi = ?, @idpenerima = ?, @JumlahKeluarPrimer = ?, @JumlahKeluarSekunder = ?, @JumlahKeluarTritier=?',
                    [$idTransaksi, $user, $keluarPrimer, $keluarSekunder, $keluarTritier]);
                }

                // dd($request->all(), $user);
                return response()->json(['success' => 'Data Sudah Tersimpan'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data insert failed' . $e->getMessage()], 500);
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

                return response()->json(['success' => 'Data sudah diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
