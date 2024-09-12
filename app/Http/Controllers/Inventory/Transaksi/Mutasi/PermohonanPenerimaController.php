<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PermohonanPenerimaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.PermohonanPenerima', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {

    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
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
        //
    }
}
