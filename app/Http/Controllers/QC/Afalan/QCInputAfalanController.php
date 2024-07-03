<?php

namespace App\Http\Controllers\QC\Afalan;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class QCInputAfalanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        $data = 'InputAfalanQC';
        return view('QC.Afalan.InputAfalanQC', compact('data', 'access'));
        
    }

    public function input()
    {
        $dataInputAfalan = DB::connection('ConnInventory')->select('exec [SP_1273_INV_Ambil_NoRoll]');
        return view('WORKSHOP.Workshop.Transaksi.MaintenanceOrderKerja', compact(['divisi', 'satuan']));
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
