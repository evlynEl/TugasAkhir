<?php

namespace App\Http\Controllers\COA\FIBC\Input;

use Auth;
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
            if ($request->input('a') == 1) {
                $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?', [9]);
            } else if ($request->input('a') == 2) {
                $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_RESULT_FIBC] @Kode = ?', [3]);
            }

            $data_Ref = [];
            foreach ($refNo as $detailRef) {
                $data_Ref[] = [
                    'Reference_No' => $detailRef->Reference_No,
                    'Customer' => $detailRef->Customer
                ];
            }
            return datatables($data_Ref)->make(true);
        } else if ($id == 'getCyclic') {
            $cyclic = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?, @RefNo = ?', [10, $request->input('no_ref')]);

            if (empty($cyclic)) {
                return response()->json(['error' => 'No cyclic data found'], 500);
            }

            $cyclicData = $cyclic[0];
            $swl = $cyclicData->SWL;
            $cyclicTestValue = 2 * $swl;
            $refCopy = $cyclicData->Copy_RefNo;

            if ($request->input('a') == 1) { // isi
                if (empty($refCopy)) {
                    return response()->json([
                        'cyclicTestValue' => $cyclicTestValue,
                        'refCopy' => ''
                    ]);
                } else {
                    $selectIsi = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_LIST_FIBC] @kode = ?, @RefNo = ?', [3, $refCopy]);
                    // dd($request->input('no_ref'), $refCopy,  $selectIsi);

                    $data_additional = [];
                    foreach ($selectIsi as $data_detailIsi) {
                        $cyclicResultParts = explode('Visible damages found at', $data_detailIsi->Cyclic_Result);
                        $dropResultParts = explode('Visible damages found at', $data_detailIsi->Drop_Result);

                        $cyclicResultRemaining = count($cyclicResultParts) > 1 ? trim($cyclicResultParts[1]) : '';
                        $dropResultRemaining = count($dropResultParts) > 1 ? trim($dropResultParts[1]) : '';

                        $breakageLocationParts = explode('Others :', $data_detailIsi->Breakage_Location);
                        $breakageLocationRemaining = count($breakageLocationParts) > 1 ? trim($breakageLocationParts[1]) : '';

                        $cyclicResult = count($cyclicResultParts) > 1 ? 'Visible damages found at' : $data_detailIsi->Cyclic_Result;
                        $dropResult = count($dropResultParts) > 1 ? 'Visible damages found at' : $data_detailIsi->Drop_Result;
                        $breakageLocation = count($breakageLocationParts) > 1 ? 'Others :' : $data_detailIsi->Breakage_Location;

                        $data_additional[] = [
                            'Height_Approx' => $data_detailIsi->Height_Approx,
                            'dia_val' => $data_detailIsi->Dia,
                            'square_val' => $data_detailIsi->Square,
                            'Cyclic_Test' => $data_detailIsi->Cyclic_Test,
                            'Load_Speed' => $data_detailIsi->Load_Speed,
                            'Drop_Test' => $data_detailIsi->Drop_Test,
                            'Cyclic_Lift' => $data_detailIsi->Cyclic_Lift,
                            'Cyclic_Result' => $cyclicResult,
                            'Cyclic_Result_Remaining' => $cyclicResultRemaining,
                            'Top_Lift' => $data_detailIsi->Top_Lift,
                            'Top_Result' => $data_detailIsi->Top_Result,
                            'Breakage_Location' => $breakageLocation,
                            'Breakage_Location_Remaining' => $breakageLocationRemaining,
                            'Drop_Result' => $dropResult,
                            'Drop_Result_Remaining' => $dropResultRemaining
                        ];
                    }
                    // dd($data_additional);  

                    $data_full = [
                        'cyclicTestValue' => $cyclicTestValue,
                        'refCopy' => $refCopy,
                        'additionalData' => $data_additional
                    ];

                    return response()->json($data_full);
                }
            } else if ($request->input('a') == 2) { // koreksi
                $selectKoreksi = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_RESULT_FIBC] @kode = ?, @RefNo = ?', [4, $request->input('no_ref')]);

                $data_getKoreksi = [];
                foreach ($selectKoreksi as $data_detailKor) {
                    $data_getKoreksi[] = [
                        'Height_Approx' => $data_detailKor->Height_Approx,
                        'dia_val' => $data_detailKor->Dia,
                        'square_val' => $data_detailKor->Square,
                        'Cyclic_Test' => $data_detailKor->Cyclic_Test,
                        'Load_Speed' => $data_detailKor->Load_Speed,
                        'Drop_Test' => $data_detailKor->Drop_Test,
                        'Cyclic_Lift' => $data_detailKor->Cyclic_Lift,
                        'Cyclic_Result' => $data_detailKor->Cyclic_Result,
                        'Top_Lift' => $data_detailKor->Top_Lift,
                        'Top_Result' => $data_detailKor->Top_Result,
                        'Breakage_Location' => $data_detailKor->Breakage_Location,
                        'Drop_Result' => $data_detailKor->Drop_Result,
                        'Data_1' => $data_detailKor->Data_1,
                        'Data_2' => $data_detailKor->Data_2,
                        'Data_3' => $data_detailKor->Data_3,
                        'Data_4' => $data_detailKor->Data_4,
                        'Data_5' => $data_detailKor->Data_5,
                        'Data_6' => $data_detailKor->Data_6,
                        'Data_7' => $data_detailKor->Data_7,
                        'Data_8' => $data_detailKor->Data_8,
                        'Data_9' => $data_detailKor->Data_9,
                        'Data_10' => $data_detailKor->Data_10,
                        'Data_11' => $data_detailKor->Data_11,
                        'Data_12' => $data_detailKor->Data_12,
                        'Data_13' => $data_detailKor->Data_13,
                        'Data_14' => $data_detailKor->Data_14,
                        'Data_15' => $data_detailKor->Data_15,
                        'Data_16' => $data_detailKor->Data_16,
                        'Data_17' => $data_detailKor->Data_17,
                        'Data_18' => $data_detailKor->Data_18,
                        'Data_19' => $data_detailKor->Data_19,
                        'Data_20' => $data_detailKor->Data_20,
                        'Data_21' => $data_detailKor->Data_21,
                        'Data_22' => $data_detailKor->Data_22,
                        'Data_23' => $data_detailKor->Data_23,
                        'Data_24' => $data_detailKor->Data_24,
                        'Data_25' => $data_detailKor->Data_25,
                        'Data_26' => $data_detailKor->Data_26,
                        'Data_27' => $data_detailKor->Data_27,
                        'Data_28' => $data_detailKor->Data_28,
                        'Data_29' => $data_detailKor->Data_29,
                        'Data_30' => $data_detailKor->Data_30,
                        'Jumlah' => $data_detailKor->Jumlah,
                        'Pict_1' => $data_detailKor->Pict_1,
                        'Pict_2' => $data_detailKor->Pict_2,
                        'Pict_3' => $data_detailKor->Pict_3,
                        'Pict_4' => $data_detailKor->Pict_4
                    ];
                }
                $data_full = [
                    'cyclicTestValue' => $cyclicTestValue,
                    'additionalData' => $data_getKoreksi
                ];

                return response()->json($data_full);
            }
            // If @Kode = 4
            // Begin
            // SELECT        Result_FIBC.*, Picture_FIBC.Jumlah, Picture_FIBC.Pict_1, Picture_FIBC.Pict_2, Picture_FIBC.Pict_3, Picture_FIBC.Pict_4, Cyclic_FIBC.Data_1, Cyclic_FIBC.Data_2, Cyclic_FIBC.Data_3, Cyclic_FIBC.Data_4, Cyclic_FIBC.Data_5,
            //                          Cyclic_FIBC.Data_6, Cyclic_FIBC.Data_7, Cyclic_FIBC.Data_8, Cyclic_FIBC.Data_9, Cyclic_FIBC.Data_10, Cyclic_FIBC.Data_11, Cyclic_FIBC.Data_12, Cyclic_FIBC.Data_13, Cyclic_FIBC.Data_14, Cyclic_FIBC.Data_15,
            //                          Cyclic_FIBC.Data_16, Cyclic_FIBC.Data_17, Cyclic_FIBC.Data_18, Cyclic_FIBC.Data_19, Cyclic_FIBC.Data_20, Cyclic_FIBC.Data_21, Cyclic_FIBC.Data_22, Cyclic_FIBC.Data_23, Cyclic_FIBC.Data_24, Cyclic_FIBC.Data_25,
            //                          Cyclic_FIBC.Data_26, Cyclic_FIBC.Data_27, Cyclic_FIBC.Data_28, Cyclic_FIBC.Data_29, Cyclic_FIBC.Data_30
            // FROM            Result_FIBC INNER JOIN
            //                          Cyclic_FIBC ON Result_FIBC.Reference_No = Cyclic_FIBC.Reference_No INNER JOIN
            //                          Picture_FIBC ON Result_FIBC.Reference_No = Picture_FIBC.Reference_No
            // WHERE Result_FIBC.Reference_No = @RefNo
            // End
        } else if ($id === '...') {
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
