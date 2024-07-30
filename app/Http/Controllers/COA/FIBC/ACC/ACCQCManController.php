<?php

namespace App\Http\Controllers\COA\FIBC\ACC;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class ACCQCManController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'ACCQCMan';
        return view('COA.ACC.ACCQCMan', compact('data', 'access'));
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
        if ($id == 'getRef') {
            $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_ACC_FIBC] @kode = ?', [3]);
            $data_Ref = [];
            foreach ($refNo as $detailRef) {
                $data_Ref[] = [
                    'Reference_No' => $detailRef->Reference_No,
                    'Customer' => $detailRef->Customer
                ];
            }
            return datatables($data_Ref)->make(true);
        } else if ($id == 'getDetail') {
            $result = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_ACC_FIBC] @Kode = ?, @RefNo = ?', [4, $request->input('no_ref')]);
            $data_detail = [];
            foreach ($result as $detailResult) {
                $data_detail[] = [
                    'Test_Result' => $detailResult->Test_Result,
                    'Jumlah' => $detailResult->Jumlah
                ];
            }

            $tes = $result[0]->Test_Result;
            $count = $result[0]->Jumlah;

            if ($count === 4) {
                if ($tes === 'PASS') {

                } else if ($tes === 'FAIL') {

                }
            }


            return datatables($data_detail)->make(true);
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
