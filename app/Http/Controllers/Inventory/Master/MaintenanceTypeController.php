<?php

namespace App\Http\Controllers\Inventory\Master;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceTypeController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Master.MaintenanceType', compact('access'));
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

        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil ditambahkan!');
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
        } else if ($crExplode[$lastIndex] == "getKategoriUtama") {
            $dataKategoriUtama = DB::connection('ConnInventory')->select('exec SP_1003_INV_mohon_beli @MyType = ?', [1]);
            return response()->json($dataKategoriUtama);
        } else if ($crExplode[$lastIndex] == "getKategori") {
            $dataKategori = DB::connection('ConnInventory')->select('exec SP_1003_INV_mohon_beli @MyType = ?, @MyValue = ?', [2, $crExplode[0]]);
            return response()->json($dataKategori);
        } else if ($crExplode[$lastIndex] == "getSubKategori") {
            $dataSubKategori = DB::connection('ConnInventory')->select('exec SP_1003_INV_mohon_beli @MyType = ?, @MyValue = ?', [3, $crExplode[0]]);
            return response()->json($dataSubKategori);
        } else if ($crExplode[$lastIndex] == "getListBarang") {
            $dataBarang = DB::connection('ConnInventory')->select('exec SP_1003_INV_lihat_type @no_jns_1 = ?', [$crExplode[0]]);
            return response()->json($dataBarang);
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_update_type @XIdType = ?, @XNamaType = ?, @XUraianType = ?
        , @XIdSubkelompok_Type = ?, @XKodeBarang = ?, @XUnitPrimer = ?, @XUnitSekunder = ?, @XUnitTritier = ?, @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierKeSekunder = ?,
        @XNo_satuan_umum = ?', [
            $data['IdType'],
            $data['NamaType'],
            $data['UraianType'],
            $data['IdSubKel'],
            $data['KodeBarang'],
            $data['UnitPrimer'],
            $data['UnitSekunder'],
            $data['UnitTritier'],
            $data['AturanKonversi'],
            $data['KonvSekunderPrimer'],
            $data['KonvTritierSekunder'],
            $data['NoSatuanUmum']
        ]);
        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil diupdate!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_delete_type  @XIdType = ?', [
                $data['IdType']
            ]);

        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil dihapus!');
    }
}
