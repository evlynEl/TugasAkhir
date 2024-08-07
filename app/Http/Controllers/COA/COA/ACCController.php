<?php

namespace App\Http\Controllers\COA\COA;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


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

    public function show($id, Request $request)
    {
        // customer
        if ($id === 'GetCustomer') {
            $cust = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?', [9]);
            $data_list = [];
            foreach ($cust as $custmr) {
                $data_list[] = [
                    'IdCust' => $custmr->IdCust,
                    'NamaCust' => $custmr->NamaCust,
                ];
            }
            return datatables($data_list)->make(true);
        }

        // type
        else if ($id === 'GetType') {
            $idCust = $request->input('idCust');

            $type = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?, @IdCust = ?', [10, $idCust]);
            $data_list = [];
            foreach ($type as $types) {
                $data_list[] = [
                    'KodeBarang' => $types->KodeBarang,
                    'NAMA_BRG' => $types->NAMA_BRG,
                ];
            }
            return datatables($data_list)->make(true);
        }

        // no COA
        else if ($id === 'GetACC') {
            $idCust = $request->input('idCust');
            $kodeBarang = $request->input('kodeBarang');

            $noCOA = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA]
                @kode = ?, @IdCust = ?, @KodeBarang = ?', [11, $idCust, $kodeBarang]);
            $data_list = [];
            foreach ($noCOA as $listCoa) {
                $data_list[] = [
                    'Id' => $listCoa->NoCOA,
                    'Material' => $listCoa->IdMaster,
                ];
            }
            return datatables($data_list)->make(true);
        }

        // detail laporan print
        else if ($id == 'getDetail') {

            $no = $request->input('noCoa');

            $data = DB::connection('ConnTestQC')
                ->table('dbo.VW_QC_1273_COA_BelumACC')
                ->select('*')
                ->where('dbo.VW_QC_1273_COA_BelumACC.NoCOA', $no)
                ->get();

            return response()->json($data);
        }

        // acc laporan
        else if ($id === 'accCoa') {
            $noCoa = $request->input('noCoa');
            $user = Auth::user()->NomorUser;
            $user = trim($user);

            try {
                DB::connection('ConnTestQC')
                    ->statement('exec [SP_1273_ACC_RESULT_COA]
                @Kode = ?,
                @NoCOA = ?,
                @UserACC = ?
                ', [
                        1,
                        $noCoa,
                        $user
                    ]);
                return response()->json(['success' => 'Data berhasil diACC'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diACC: ' . $e->getMessage()], 500);
            }
        }
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
