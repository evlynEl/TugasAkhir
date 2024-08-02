<?php

namespace App\Http\Controllers\COA\FIBC;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class FIBCPrintController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'FIBCPrint';
        return view('COA.FIBCPrint', compact('data', 'access'));
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
        if ($id == 'getTahun') {
            $tahunConn = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_PRINT_FIBC] @kode = ?', [3]);
            $tahunArr = [];
            foreach ($tahunConn as $tahunList) {
                $tahunArr[] = [
                    'Tahun' => $tahunList->Tahun,
                ];
            }
            return datatables($tahunArr)->make(true);
        } else if ($id == 'getRef') {
            $tahun = $request->input('tahun');
            $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_PRINT_FIBC] @kode = ?, @Tahun = ?', [1, $tahun]);
            $data_Ref = [];
            foreach ($refNo as $detailRef) {
                $data_Ref[] = [
                    'Reference_No' => $detailRef->Reference_No,
                    'Customer' => $detailRef->Customer
                ];
            }
            return datatables($data_Ref)->make(true);
        }
        else if ($id == 'getDetail') {

            $no = $request->input('no_ref');

            $result = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_PRINT_FIBC] @Kode = ?, @RefNo = ?', [2, $request->input('no_ref')]);
            $data_detail = [];
            foreach ($result as $detailResult) {
                $data_detail[] = [
                    'Test_Result' => $detailResult->Test_Result,
                    'Jumlah' => $detailResult->Jumlah
                ];
            }

            $count = $result[0]->Jumlah;
            $tes = $result[0]->Test_Result;

            $data = DB::connection('ConnTestQC')
                ->table('dbo.VW_QTC_1273_FIBC_RESULT_SUDAH_ACC')
                ->select('*') // Select all fields
                ->where('dbo.VW_QTC_1273_FIBC_RESULT_SUDAH_ACC.Reference_No', $no)
                ->get()
                ->map(function ($item) {
                    foreach (['Pict_1', 'Pict_2', 'Pict_3', 'Pict_4'] as $field) {
                        if (!empty($item->$field)) {
                            $item->$field = base64_encode($item->$field);
                        }
                    }
                    return $item;
                });

            return response()->json([
                'result' => $data,
                'count' => $count,
                'tes' => $tes
            ]);
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
