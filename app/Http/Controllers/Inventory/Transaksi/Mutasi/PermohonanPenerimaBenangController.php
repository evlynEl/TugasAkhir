<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PermohonanPenerimaBenangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.PermohonanPenerimaBenang', compact('access'));
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
        $kodeTransaksi = $request->input('kodeTransaksi');
        $objekId = $request->input('objekId');
        $divisiNama = $request->input('divisiNama');


        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        else if ($id === 'getData') {
            // menampilkan data di data table
            $justData = DB::connection('ConnInventory')->select('
            exec SP_1003_INV_LIST_BELUMACC_TMPTRANSAKSI_1 @kode = 1, @XIdTypeTransaksi = 03, @XIdObjek = ?', [$objekId]);
            if (count($justData) > 0) {
                $data_justData = [];
                foreach ($justData as $detail_justData) {
                    $formattedDate = date('m/d/Y', strtotime($detail_justData->SaatAwalTransaksi));

                    $data_justData[] = [
                        'IdTransaksi' => $detail_justData->IdTransaksi,
                        'NamaType' => $detail_justData->NamaType,
                        'UraianDetailTransaksi' => $detail_justData->UraianDetailTransaksi,
                        'NamaKelompokUtama' => $detail_justData->NamaKelompokUtama,
                        'NamaKelompok' => $detail_justData->NamaKelompok,
                        'NamaSubKelompok' => $detail_justData->NamaSubKelompok,
                        'IdPemberi' => $detail_justData->IdPemberi,
                        'JumlahPengeluaranPrimer' => $detail_justData->JumlahPengeluaranPrimer,
                        'JumlahPengeluaranSekunder' => $detail_justData->JumlahPengeluaranSekunder,
                        'JumlahPengeluaranTritier' => $detail_justData->JumlahPengeluaranTritier,
                        'SaatAwalTransaksi' => $formattedDate,
                        'KodeBarang' => $detail_justData->KodeBarang,
                        'TujuanIdSubkelompok' => $detail_justData->TujuanIdSubkelompok
                    ];
                }
                // dd($data_justData, $request->all());
                return response()->json($data_justData);
            } else {
                return response()->json(['warning' => 'Tidak ada Data Yang Diterima Oleh Divisi : ' .trim($divisiNama)], 500);
            }

        }

        else if ($id === 'getSelect') {
            // mendapatkan saldo, satuan, pemasukan unk selected data table
            $selectData = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_selectData = [];
            foreach ($selectData as $detail_selectData) {
                $data_selectData[] = [
                    'NamaDivisi' => $detail_selectData->NamaDivisi,
                    'NamaObjek' => $detail_selectData->NamaObjek,
                    'NamaKelompokUtama' => $detail_selectData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_selectData->NamaKelompok,
                    'NamaSubKelompok' => $detail_selectData->NamaSubKelompok,
                    'Satuan_Primer' => $detail_selectData->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_selectData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_selectData->Satuan_Tritier
                ];
            }

            // dd($request->all(), $data_selectData);
            return response()->json($data_selectData);
        }

        else if ($id === 'getTypeKonv') {
            // mendapatkan saldo, satuan, pemasukan unk selected data table
            $typeKonv = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?', [$kodeTransaksi]);
            $data_typeKonv = [];
            foreach ($typeKonv as $detail_typeKonv) {
                $data_typeKonv[] = [
                    'IdType' => $detail_typeKonv->IdType,
                    'NamaType' => $detail_typeKonv->NamaType
                ];
            }

            // dd($request->all(), $data_selectData);
            return response()->json($typeKonv);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $data = $request->all();
        // dd($data , " Masuk update");
        if ($data['updateProsesAcc'] == "AccManager") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_ACCManager_TmpTransaksi @UserACC = ?, @Kode = ?, @YIdTransaksi = ?', [
                $data['UserACC'],
                3,
                $data['IdTransaksi']
            ]);
        } else if ($data['updateProsesAcc'] == "BatalAcc") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Batal_ACCManager_TmpTransaksi @Kode = ?, @YIdTransaksi = ?', [
                3,
                $data['IdTransaksi']
            ]);
        }
        return redirect()->route('FormAccMhnPenerima.index')->with('alert', 'Data berhasil diupdate!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
