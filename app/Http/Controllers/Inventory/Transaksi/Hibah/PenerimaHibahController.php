<?php

namespace App\Http\Controllers\Inventory\Transaksi\Hibah;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PenerimaHibahController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Transaksi.Hibah.PenerimaHibah', compact('access'));
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
        //getData
        if ($crExplode[$lastIndex] == "getDivisi") {
            $dataDivisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$crExplode[0]]);
            return response()->json($dataDivisi);
        } else if ($crExplode[$lastIndex] == "getUserObjek") {
            $dataObjek = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_BelumACC_TmpTransaksi @XKdUser = ?, @XIdDivisi = ?', [12, 13, $crExplode[0]]);
            return response()->json($dataObjek);
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_PROSES_TERIMA_HIBAH @IdTransaksi = ?, @IdType = ?, @Penerima = ?, @MasukPrimer = ?, @MasukSekunder = ?, @MasukTritier = ? ', [
            $data['IdTransaksi'],
            $data['IdType'],
            $data['Penerima'],
            $data['MasukPrimer'],
            $data['MasukSekunder'],
            $data['MasukTritier']
        ]);
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
