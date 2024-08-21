<?php

namespace App\Http\Controllers\Inventory\Transaksi;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PermohonanHibahController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {

        $data = 'Tes';

        // dd($dataDivisi);
        return view('Inventory.Transaksi.Hibah.PermohonanHibah', compact('data'));
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
            $dataDivisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_UserDivisi_Diminta @XKdUser = ?', [$crExplode[0]]);
            return response()->json($dataDivisi);
        } else if ($crExplode[$lastIndex] == "getObjek") {
            $dataObjek = DB::connection('ConnInventory')->select('exec SP_1003_INV_UserObjek_Diminta @XKdUser = ?, @XIdDivisi = ?', [$crExplode[0], $crExplode[1]]);
            return response()->json($dataObjek);
        } else if ($crExplode[$lastIndex] == "getKelompokUtama") {
            $dataKelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$crExplode[0]]);
            return response()->json($dataKelut);
        } else if ($crExplode[$lastIndex] == "getKelompok") {
            $dataKelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$crExplode[0]]);
            return response()->json($dataKelompok);
        } else if ($crExplode[$lastIndex] == "getSubKelompok") {
            $dataSubKelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompok_SubKelompok @XIdKelompok_SubKelompok = ?', [3, $crExplode[0], $crExplode[1]]);
            return response()->json($dataSubKelompok);
        } else if ($crExplode[$lastIndex] == "getType") {
            $dataSubKelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?', [$crExplode[0]]);
            return response()->json($dataSubKelompok);
        }else if ($crExplode[$lastIndex] == "getDataMohon") {
            $dataTransfer = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Mohon_TmpTransaksi @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?', [4, 13, $crExplode[0]]);
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_TmpTransaksi @XIdTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @, @XTujuanSubkelompok = ?, @XUraianDetailTransaksi = ?', [
            $data['IdTransaksi'],
            $data['JumlahKeluarPrimer'],
            $data['JumlahKeluarSekunder'],
            $data['JumlahKeluarTritier'],
            $data['TujuanSubKel'],
            $data['UraianDetailTransaksi']
        ]);
        return redirect()->route('MohonHibah.index')->with('alert', 'Data berhasil diproses!');
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
