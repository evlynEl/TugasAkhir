<?php

namespace App\Http\Controllers\Inventory\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StokBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {

        $data = 'HAPPY HAPPY HAPPY';
        // dd($dataDivisi);
        return view('Inventory.Master.StokBarang', compact('data'));
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_insert_type @XIdType = ?, @XNamaType = ?, @XUraianType = ?
        , @XIdSubkelompok_Type = ?, @XKodeBarang = ?, @XSaatStokAwal = ?, @XStokAwalPrimer = ?, @XTotalPemasukanPrimer = ?, @XSaldoPrimer = ?, @XUnitPrimer = ?, @XStokAwalSekunder = ?, XTotalPemasukanSekunder = ?
        , @XSaldoSekunder = ?, @XUnitSekunder = ?, @XStokAwalTritier = ?, @XTotalPemasukanTritier = ?, @XSaldoTritier = ?, @XUnitTritier = ?, @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierKeSekunder = ?
        , @XNonaktif = ?, @XMinimumStok = ?, @XNo_satuan_umum = ?, @userInput = ?', [
            $data['IdType'],
            $data['NamaType'],
            $data['UraianType'],
            $data['IdSubKel'],
            $data['KodeBarang'],
            $data['SaatStokAwal'],
            $data['StokAwalPrimer'],
            $data['TotalPemasukanPrimer'],
            $data['SaldoPrimer'],
            $data['UnitPrimer'],
            $data['StokAwalSekunder'],
            $data['TotalPemasukanSekunder'],
            $data['SaldoSekunder'],
            $data['UnitSekunder'],
            $data['StokAwalTritier'],
            $data['TotalPemasukanTritier'],
            $data['SaldoTritier'],
            $data['UnitTritier'],
            $data['AturanKonversi'],
            $data['KonvSekunderPrimer'],
            $data['KonvTritierSekunder'],
            $data['NonAktif'],
            $data['MinimumStok'],
            $data['NoSatuanUmum'],
            $data['userInput']
        ]);

        return redirect()->route('MaxMinStok.index')->with('alert', 'Data berhasil ditambahkan!');
    }

    //Display the specified resource.
    public function show($cr)
    {
        $crExplode = explode(".", $cr);
        $lastIndex = count($crExplode) - 1;
        //getListPerkiraan
        if ($crExplode[$lastIndex] == "getDivisi") {
            $dataDivisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$crExplode[0]]);
            return response()->json($dataDivisi);
        } else if ($crExplode[$lastIndex] == "getObjek") {
            $dataObjek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$crExplode[0], $crExplode[1]]);
            return response()->json($dataObjek);
        } else if ($crExplode[$lastIndex] == "getKelompokUtama") {
            $dataKelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$crExplode[0]]);
            return response()->json($dataKelut);
        } else if ($crExplode[$lastIndex] == "getKelompok") {
            $dataKelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$crExplode[0]]);
            return response()->json($dataKelompok);
        } else if ($crExplode[$lastIndex] == "getSubKelompok") {
            $dataSubKelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompok_SubKelompok @XIdKelompok_SubKelompok = ?', [$crExplode[0]]);
            return response()->json($dataSubKelompok);
        } else if ($crExplode[$lastIndex] == "getType") {
            $dataType = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?', [$crExplode[0]]);
            return response()->json($dataType);
        } else if ($crExplode[$lastIndex] == "getType2") {
            $dataKategori = DB::connection('ConnInventory')->select('exec SP_1003_INV_NamaType_Type @IdType = ?, @IdSubKel = ?', [$crExplode[0], $crExplode[1]]);
            return response()->json($dataKategori);
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_update_type @XIdType = ?, @XIdSubKelompok = ?, @XMinStok = ?
        , @XMaxStok = ?', [
            $data['IdType'],
            $data['IdSubKel'],
            $data['MinStok'],
            $data['MaxStok']
        ]);
        return redirect()->route('MaxMinStok.index')->with('alert', 'Data berhasil diupdate!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_delete_type  @XIdType = ?', [
                $data['IdType']
            ]);

        return redirect()->route('MaxMinStok.index')->with('alert', 'Data berhasil dihapus!');
    }
}
