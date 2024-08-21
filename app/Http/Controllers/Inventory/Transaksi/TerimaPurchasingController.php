<?php

namespace App\Http\Controllers\Inventory\Transaksi;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TerimaPurchasingController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {

        $data = 'HAPPY HAPPY HAPPY';
        return view('Inventory.Transaksi.TerimaPurchasing', compact('data'));
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
            $dataKelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @Type = ?, @XIdObjek_KelompokUtama = ?, @KodeBarang = ?', [13,$crExplode[0],$crExplode[1]]);
            return response()->json($dataKelut);
        } else if ($crExplode[$lastIndex] == "getKelompok") {
            $dataKelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @Type = ?, @XIdKelompokUtama_Kelompok = ?, @KodeBarang = ?', [2,$crExplode[0],$crExplode[1]]);
            return response()->json($dataKelompok);
        } else if ($crExplode[$lastIndex] == "getSubKelompok") {
            $dataSubKelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompok_SubKelompok @Type = ?, @XIdKelompok_SubKelompok = ?, @KodeBarang = ?', [3, $crExplode[0], $crExplode[1]]);
            return response()->json($dataSubKelompok);
        } else if ($crExplode[$lastIndex] == "getDataTransfer") {
            $dataTransfer = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Terima_Transfer_PerObjek @IdDivisi = ?, @IdObjek = ?', [$crExplode[0], $crExplode[1]]);
            return response()->json($dataTransfer);
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
        DB::connection('ConnInventory')->statement('exec SP_1273_INV_PROSES_TERIMA_TRANSFER_BELI @IdTransaksi = ?, @IdType = ?, @IdSubKel = ?
        , @Penerima = ?,@MasukPrimer = ?, @MasukSekunder = ?, @MasukTritier = ?
        ', [
            $data['IdTransaksi'],
            $data['IdType'],
            $data['IdSubKel'],
            $data['Penerima'],
            $data['MasukPrimer'],
            $data['MasukSekunder'],
            $data['MasukTritier']
        ]);
        return redirect()->route('TerimaPurchasing.index')->with('alert', 'Data berhasil diproses!');
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
