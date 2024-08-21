<?php

namespace App\Http\Controllers\Inventory\Master;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceObjekController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {

        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Master.MaintenanceObjek', compact('access'));
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
        if ($data['ket'] == "insertObjek") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Insert_Objek  @XIdObjek = ? , @XNamaObjek = ?, XIdDivisi_Objek = ?', [
                $data['IdObjek'],
                $data['NamaObjek'],
                $data['IdDivisi']
            ]);
        }else if ($data['ket'] == "insertKelut") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Insert_KelompokUtama  @XIdKelompokUtama = ? , @XNamaKelompokUtama = ?, @XIdObjek_KelompokUtama = ?', [
                $data['IdKelut'],
                $data['NamaKelut'],
                $data['IdObjek']
            ]);
        }else if ($data['ket'] == "insertKelompok") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Insert_Kelompok  @XIdKelompok = ? , @XNamaKelompok = ?, @XIdKelompokUtama_Kelompok = ?', [
                $data['IdKelompok'],
                $data['NamaKelompok'],
                $data['IdKelut']
            ]);
        }else if ($data['ket'] == "insertSubKelompok") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Insert_SubKelompok  @XIdSubKelompok = ? , @XNamaSubKelompok = ?, @XIdKelompok_SubKelompok = ?, @XKodePerkiraan = ?', [
                $data['IdKelut'],
                $data['NamaKelut'],
                $data['IdObjek']
            ]);
        }else if ($data['ket'] == "insertKelut") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Insert_KelompokUtama  @XIdKelompokUtama = ? , @XNamaKelompokUtama = ?, @XIdObjek_KelompokUtama = ?', [
                $data['IdKelut'],
                $data['NamaKelut'],
                $data['IdObjek']
            ]);
        }
        return redirect()->route('MaintenanceObjek.index')->with('alert', 'Data berhasil ditambahkan!');
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
        } else if ($crExplode[$lastIndex] == "getKodePerkiraan") {
            $dataKode = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_perkiraan');
            return response()->json($dataKode);
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
        if ($data['ket'] == "updateObjek") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_Objek  @XIdObjek = ? , @XNamaObjek = ?, XIdDivisi_Objek = ?', [
                $data['IdObjek'],
                $data['NamaObjek'],
                $data['IdDivisi']
            ]);
        }else if ($data['ket'] == "updateKelut") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_KelompokUtama  @XIdKelompokUtama = ? , @XNamaKelompokUtama = ?, @XIdObjek_KelompokUtama = ?', [
                $data['IdKelut'],
                $data['NamaKelut'],
                $data['IdObjek']
            ]);
        }else if ($data['ket'] == "updateKelompok") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_Kelompok  @XIdKelompok = ? , @XNamaKelompok = ?, @XIdKelompokUtama_Kelompok = ?', [
                $data['IdKelompok'],
                $data['NamaKelompok'],
                $data['IdKelut']
            ]);
        }else if ($data['ket'] == "updateSubKelompok") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_SubKelompok  @XIdSubKelompok = ? , @XNamaSubKelompok = ?, @XIdKelompok_SubKelompok = ?, @XKodePerkiraan = ?', [
                $data['IdKelut'],
                $data['NamaKelut'],
                $data['IdObjek']
            ]);
        }
        return redirect()->route('MaintenanceObjek.index')->with('alert', 'Data berhasil diupdate!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
        if ($data['ket'] == "hapusObjek") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_Objek  @XIdObjek = ?, XIdDivisi_Objek = ?', [
                $data['IdObjek'],
                $data['IdDivisi']
            ]);
        }else if ($data['ket'] == "hapusKelut") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_KelompokUtama  @XIdKelompokUtama = ? , @XIdObjek_KelompokUtama = ?', [
                $data['IdKelut'],
                $data['IdObjek']
            ]);
        }else if ($data['ket'] == "hapusKelompok") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_Kelompok  @XIdKelompok = ? , @XNamaKelompok = ?, @XIdKelompokUtama_Kelompok = ?', [
                $data['IdKelompok'],
                $data['NamaKelompok'],
                $data['IdKelut']
            ]);
        }else if ($data['ket'] == "hapusSubKelompok") {
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_SubKelompok  @XIdSubKelompok = ? ,  @XIdKelompok_SubKelompok = ?', [
                $data['IdSubKel'],
                $data['IdKelompok']
            ]);
        }
        return redirect()->route('MaintenanceObjek.index')->with('alert', 'Data berhasil dihapus!');
    }
}
