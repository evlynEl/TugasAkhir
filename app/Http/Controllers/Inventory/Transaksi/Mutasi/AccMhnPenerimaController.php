<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AccMhnPenerimaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {

        $data = 'Test';

        // dd($dataDivisi);
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.FormAccMhnPenerima', compact('data'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $data = $request->all();
        // dd($data , " Masuk store");
        DB::connection('ConnInventory')->statement('exec SP_1273_INV_Insert_02_TmpTransaksi @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XSaatawalTransaksi = ?
        , @XIdType = ?, @XIdPenerima = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XAsalIdSubKelompok = ?, @XTujuanIdSubkelompok = ?, @Harga = ?', [
            $data['IdTypeTransaksi'],
            $data['UraianDetailTransaksi'],
            $data['SaatAwalTransaksi'],
            $data['IdType'],
            $data['IdPenerima'],
            $data['JumlahKeluarPrimer'],
            $data['JumlahKeluarSekunder'],
            $data['JumlahKeluarTritier'],
            $data['AsalIdSubKel'],
            $data['TujuanIdSubKel'],
            $data['Harga']
        ]);

        return redirect()->route('FormAccMhnPenerima.index')->with('alert', 'Data berhasil ditambahkan!');
    }

    //Display the specified resource.
    public function show($cr)
    {
        $crExplode = explode(".", $cr);
        $lastIndex = count($crExplode) - 1;
        //getListData
        if ($crExplode[$lastIndex] == "getDivisi") {
            $dataDivisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$crExplode[0]]);
            return response()->json($dataDivisi);
        } else if ($crExplode[$lastIndex] == "getObjek") {
            $dataObjek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$crExplode[0], $crExplode[1]]);
            return response()->json($dataObjek);
        } else if ($crExplode[$lastIndex] == "getBelumAcc") {
            $dataBelumAcc = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_BelumACC_TmpTransaksi @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?', [1, '02', $crExplode[0]]);
            return response()->json($dataBelumAcc);
        } else if ($crExplode[$lastIndex] == "getSudahAcc") {
            $dataSudahAcc = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_SudahACC_TmpTransaksi @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?', [2, '02', $crExplode[0]]);
            return response()->json($dataSudahAcc);
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
        $data = $request->all();
        // dd('Masuk Destroy', $data);
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_TmpTransaksi  @XIdTransaksi = ?', [
                $data['IdTransaksi']
            ]);

        return redirect()->route('MaxMinStok.index')->with('alert', 'Data berhasil dihapus!');
    }
}
