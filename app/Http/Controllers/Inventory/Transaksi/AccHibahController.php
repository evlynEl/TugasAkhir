<?php

namespace App\Http\Controllers\Inventory\Transaksi;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AccHibahController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {

        $data = 'Test';

        // dd($dataDivisi);
        return view('Inventory.Transaksi.Hibah.AccHibah', compact('data'));
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_Insert_13_TmpTransaksi @XIdTypeTransaksi = ?, @XIdType = ?, @XIdPemberi = ?, @XSaatAwalTransaksi = ?
        , @XJumlahMasukPrimer = ?, @XJumlahMasukSekunder = ?, @XJumlahMasukTritier = ?, @XAsalIdSubKelompok = ?, @XUraianDetailTransaksi = ?', [
            $data['IdTypeTransaksi'],
            $data['IdType'],
            $data['IdPemberi'],
            $data['SaatAwalTransaksi'],
            $data['JumlahMasukPrimer'],
            $data['JumlahMasukSekunder'],
            $data['JumlahMasukTritier'],
            $data['IdSubKelompokAsal'],
            $data['UraianTransaksi']
        ]);

        return redirect()->route('MohonHibah.index')->with('alert', 'Data berhasil ditambahkan!');
    }

    //Display the specified resource.
    public function show($cr)
    {
        $crExplode = explode(".", $cr);
        $lastIndex = count($crExplode) - 1;
        //getListPerkiraan
        if ($crExplode[$lastIndex] == "getDivisi") {
            $dataDivisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi_Diminta @XKdUser = ?', [$crExplode[0]]);
            return response()->json($dataDivisi);
        } else if ($crExplode[$lastIndex] == "getBelumAcc") {
            $dataBelumAcc = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_BelumACC_TmpTransaksi @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?', [12, 13, $crExplode[0]]);
            return response()->json($dataBelumAcc);
        } else if ($crExplode[$lastIndex] == "getSudahAcc") {
            $dataSudahAcc = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_SudahACC_TmpTransaksi @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?', [5, 13, $crExplode[0]]);
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
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_PROSES_ACC_HIBAH @Kode = ?, @UserACC = ?, @YIdTransaksi = ?', [
                1,
                $data['UserACC'],
                $data['IdTransaksi']
            ]);
        } else if ($data['updateProsesAcc'] == "BatalAcc") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_PROSES_ACC_HIBAH @Kode = ?, @YIdTransaksi = ?', [
                4,
                $data['IdTransaksi']
            ]);
        }
        return redirect()->route('AccHibah.index')->with('alert', 'Data berhasil diproses!');
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
