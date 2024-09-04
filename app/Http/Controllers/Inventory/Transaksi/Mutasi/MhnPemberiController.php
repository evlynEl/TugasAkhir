<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MhnPemberiController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {

        $data = 'HAPPY HAPPY HAPPY';

        // dd($dataDivisi);
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.FormMhnPemberi', compact('data'));
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

        return redirect()->route('FormMhnPenerima.index')->with('alert', 'Data berhasil ditambahkan!');
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
        } else if ($crExplode[$lastIndex] == "getListMohon") {
            $dataMohon = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Mohon_TmpTransaksi @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?', [$crExplode[0],$crExplode[1],$crExplode[2]]);
            return response()->json($dataMohon);
        } else if ($crExplode[$lastIndex] == "getDataPemohon") {
            $dataPemohon = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Mohon_TmpTransaksi @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?, @XUser = ?', [$crExplode[0], $crExplode[1]]);
            return response()->json($dataPemohon);
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_TmpTransaksi @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanIdSubkelompok = ?', [
            $data['IdTransaksi'],
            $data['UraianDetailTransaksi'],
            $data['JumlahKeluarPrimer'],
            $data['JumlahKeluarSekunder'],
            $data['JumlahKeluarTritier'],
            $data['TujuanIdSubKel'],
        ]);
        return redirect()->route('FormMhnPenerima.index')->with('alert', 'Data berhasil diupdate!');
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
