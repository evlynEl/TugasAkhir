<?php

namespace App\Http\Controllers\COA\COA;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class ACCController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'ACC';
        return view('COA.COAACC', compact('data', 'access'));
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
        // customer
        $cust = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?', [9]);
        $data_list = [];
        foreach ($cust as $custmr) {
            $data_list[] = [
                'Id Customer' => $custmr->IdCust,
                'Nama Customer' => $custmr->NamaCust,
            ];
        }
        return datatables($data_list)->make(true);

        // type
        $type = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?', [10]);
        $data_list = [];
        foreach ($type as $types) {
            $data_list[] = [
                'Kode Barang' => $types->KodeBarang,
                'Nama Barang' => $types->NAMA_BRG,
            ];
        }
        return datatables($data_list)->make(true);

        // no COA
        $noCOA = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?', [11]);
        $data_list = [];
        foreach ($noCOA as $noCOA) {
            $data_list[] = [
                'No COA' => $noCOA->NoCOA,
                'ID Master' => $noCOA->IdMaster,
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
        $request->validate([
            'material' => 'required|string|max:100',
        ]);

        $Material = $request->input('material');

        try {
            $process = DB::connection('ConnTestQC')->statement('exec [SP_1273_ACC_RESULT_COA] @Kode = 2, @Material = ?', [$Material]);

            return response()->json(['success' => 'Data inserted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        //
    }
}
