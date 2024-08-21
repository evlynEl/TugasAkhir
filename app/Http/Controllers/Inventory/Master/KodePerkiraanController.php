<?php

namespace App\Http\Controllers\Inventory\Master;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class KodePerkiraanController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Master.KodePerkiraan', compact('access'));
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_insert_perkiraan  @XNoKodePerkiraan = ? , @XKeterangan = ?', [
            $data['Kode'],
            $data['Keterangan']
        ]);
        return redirect()->route('KodePerkiraan.index')->with('alert', 'Data berhasil ditambahkan!');
    }

    //Display the specified resource.
    public function show($cr)
    {
        $crExplode = explode(".", $cr);

        //getListPerkiraan
        if ($crExplode[1] == "getListPerkiraan") {
            $dataPerkiraan = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_perkiraan ');
            return response()->json($dataPerkiraan);
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
        // dd($data , " Masuk update bosq");
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_update_perkiraan  @XNoKodePerkiraan = ? , @XKeterangan = ? ', [
            $data['Kode'],
            $data['Keterangan']
        ]);
        return redirect()->route('KodePerkiraan.index')->with('alert', 'Data berhasil diupdate!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
        DB::connection('ConnInventory')->statement('exec SP_5409_PAY_MAINT_KELUARGA @XNoKodePerkiraan = ?', [
            $data['Kode'],
        ]);
        return redirect()->route('KodePerkiraan.index')->with('alert', 'Data berhasil dihapus!');
    }
}
