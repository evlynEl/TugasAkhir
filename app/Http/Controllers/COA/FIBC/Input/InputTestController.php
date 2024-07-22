<?php

namespace App\Http\Controllers\COA\FIBC\Input;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class InputTestController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'InputTest';
        return view('COA.Input.InputTest', compact('data', 'access'));
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
            $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?', [9]);
            $data_Ref = [];
            foreach ($refNo as $detailRef) {
                $data_Ref[] = [
                    'Reference_No' => $detailRef->Reference_No,
                    'Customer' => $detailRef->Customer
                ];
            }
            return datatables($data_Ref)->make(true);
        } else if ($id == 'getDetailCyclic') {
            $cyclic = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?, @RefNo = ?', [10, $request->input('no_ref')]);

            if (!empty($cyclic)) {
                $cyclicData = $cyclic[0];
                $swl = $cyclicData->SWL;
                $cyclicTestValue = 2 * $swl;
                $refCopy = $cyclicData->Copy_RefNo;

                $data_additional = [];
                if (!empty($refCopy)) {
                    $additionalData = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_LIST_FIBC] @kode = ?, @RefNo = ?', [3, $refCopy]);

                    foreach ($additionalData as $data_detailAdd) {
                        $data_additional[] = [
                            'cyclicCheckbox' => $data_detailAdd->Cyclic_Lift,
                            'cyclicResult' => $data_detailAdd->Cyclic_Result,
                            'topLiftCheckbox' => $data_detailAdd->Top_Lift,
                            'dropCheckbox' => $data_detailAdd->Drop_Result,
                            'heightApprox' => $data_detailAdd->Height_Approx,
                            'diaVal' => $data_detailAdd->Dia,
                            'squareVal' => $data_detailAdd->Square,
                            'loadSpeed' => $data_detailAdd->Load_Speed,
                            'dropTest' => $data_detailAdd->Drop_Test,
                        ];
                    }

                    return response()->json([
                        'cyclicTestValue' => $cyclicTestValue,
                        'additionalData' => $data_additional,
                        'RefCopy' => $refCopy
                    ]);
                }
            }

            return response()->json([
                'cyclicTestValue' => null,
                'additionalData' => [],
                'RefCopy' => null
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
