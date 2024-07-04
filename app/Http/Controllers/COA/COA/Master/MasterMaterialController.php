<?php

namespace App\Http\Controllers\COA\COA\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;

class MasterMaterialController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'MasterMaterial';

        return view('COA.Master.MasterMaterial', compact('data', 'access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'material' => 'required|string|max:100',
        ]);

        $Material = $request->input('material');

        try {
            $process = DB::connection('ConnTestQC')->statement('exec [SP_1273_INSERT_MASTER_COA] @Kode = 2, @Material = ?', [$Material]);

            return response()->json(['success' => 'Data inserted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $parts = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?', [2]);
        $data_list = [];
        foreach ($parts as $part) {
            $data_list[] = [
                'Id' => $part->Id,
                'Material' => $part->Material,
            ];
        }
        return datatables($data_list)->make(true);
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
