<?php

namespace App\Http\Controllers\COA\FIBC\Input;

use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        $a = (int)$request->input('a');

        $referenceNo = $request->input('RefNo');
        $heightApprox = $request->input('Height_Approx');
        $diaVal = $request->input('dia_val');
        $squareVal = $request->input('square_val');
        $cyclicTest = $request->input('Cyclic_Test');
        $loadSpeed = $request->input('Load_Speed');
        $cyclicLift = $request->input('Cyclic_Lift');
        $cyclicResult = $request->input('Cyclic_Result');
        $topLift = $request->input('Top_Lift');
        $topResult = $request->input('Top_Result');
        $breakageLocation = $request->input('Breakage_Location');
        $testResult = $request->input('TestResult');
        $dropResult = $request->input('Drop_Result');
        $dropTest = $request->input('Drop_Test');
        $jumlah = (int)$request->input('Jumlah');
        $UserInput = Auth::user()->NomorUser;

        // dd($testResult);

        // gambar 1
        $image = $request->file('gambar1data');
        $imageBinary = null;
        if ($image) {
            $binaryReader = fopen($image, 'rb');
            $imageBinary = fread($binaryReader, $image->getSize());
            fclose($binaryReader);
        }
        // gambar 2
        $image2 = $request->file('gambar2data');
        $imageBinary2 = null;
        if ($image2) {
            $binaryReader2 = fopen($image2, 'rb');
            $imageBinary2 = fread($binaryReader2, $image2->getSize());
            fclose($binaryReader2);
        }
        // gambar 3
        $image3 = $request->file('gambar3data');
        $imageBinary3 = null;
        if ($image3) {
            $binaryReader3 = fopen($image3, 'rb');
            $imageBinary3 = fread($binaryReader3, $image3->getSize());
            fclose($binaryReader3);
        }
        // gambar 4
        $image4 = $request->file('gambar4data');
        $imageBinary4 = null;
        if ($image4) {
            $binaryReader4 = fopen($image4, 'rb');
            $imageBinary4 = fread($binaryReader4, $image4->getSize());
            fclose($binaryReader4);
        }

        $dataValues = [];
        for ($i = 1; $i <= 30; $i++) {
            $value = $request->input("Data_$i");
            $dataValues["Data_$i"] = number_format((float)$value, 2, '.', '');
        }

        // dd($request->all());

        try {
            if ($a === 1) { // ISI
                if ($jumlah === 3) {
                    DB::connection('ConnTestQC')->table('Result_FIBC')->insert([
                        'Reference_No' => $referenceNo,
                        'Height_Approx' => $heightApprox,
                        'Dia' => $diaVal,
                        'Square' => $squareVal,
                        'Cyclic_Test' => $cyclicTest,
                        'Load_Speed' => $loadSpeed,
                        'Cyclic_Lift' => $cyclicLift,
                        'Cyclic_Result' => $cyclicResult,
                        'Top_Lift' => $topLift,
                        'Top_Result' => $topResult,
                        'Breakage_Location' => $breakageLocation, // breakage location bisa di centang > 1, data type varchar nya kurang besar
                        'Drop_Result' => $dropResult,
                        'Test_Result' => $testResult,
                        'UserInput' => $request->input('UserInput'),
                        'TimeInput' => now(), // or use getdate() equivalent in Laravel
                        'Drop_Test' => $dropTest,
                    ]);

                    DB::connection('ConnTestQC')->table('Cyclic_FIBC')->insert(array_merge([
                        'Reference_No' => $referenceNo
                    ], $dataValues));

                    // Insert into the database
                    DB::connection('ConnTestQC')->table('Picture_FIBC')->insert([
                        'Reference_No' => $referenceNo,
                        'Jumlah' => $jumlah,
                        'Pict_1' => $imageBinary ? DB::raw('0x' . bin2hex($imageBinary)) : null,
                        'Pict_2' => $imageBinary2 ? DB::raw('0x' . bin2hex($imageBinary2)) : null,
                        'Pict_3' => $imageBinary3 ? DB::raw('0x' . bin2hex($imageBinary3)) : null
                    ]);

                    // Insert data into Cyclic_Data_FIBC for all CyclicData fields
                    for ($i = 1; $i <= 30; $i++) {
                        $cyclicDataValue = $dataValues["Data_$i"];
                        DB::connection('ConnTestQC')->statement(
                            'INSERT INTO Cyclic_Data_FIBC (Reference_No, No, Data)
                                VALUES (?, ?, ?)',
                            [$referenceNo, $i, $cyclicDataValue]
                        );
                    }

                    // Insert TopResult into Cyclic_Data_FIBC
                    DB::connection('ConnTestQC')->statement(
                        'INSERT INTO Cyclic_Data_FIBC (Reference_No, No, Data)
                            VALUES (?, ?, ?)',
                        [$referenceNo, 31, $topResult]
                    );

                    // kalau 4
                } else if ($jumlah === 4) {
                    DB::connection('ConnTestQC')->table('Result_FIBC')->insert([
                        'Reference_No' => $referenceNo,
                        'Height_Approx' => $heightApprox,
                        'Dia' => $diaVal,
                        'Square' => $squareVal,
                        'Cyclic_Test' => $cyclicTest,
                        'Load_Speed' => $loadSpeed,
                        'Cyclic_Lift' => $cyclicLift,
                        'Cyclic_Result' => $cyclicResult,
                        'Top_Lift' => $topLift,
                        'Top_Result' => $topResult,
                        'Breakage_Location' => $breakageLocation, // breakage location bisa di centang > 1, data type varchar nya kurang besar
                        'Drop_Result' => $dropResult,
                        'Test_Result' => $testResult,
                        'UserInput' => $request->input('UserInput'),
                        'TimeInput' => now(),
                        'Drop_Test' => $dropTest,
                    ]);

                    DB::connection('ConnTestQC')->table('Cyclic_FIBC')->insert(array_merge([
                        'Reference_No' => $referenceNo
                    ], $dataValues));

                    // Insert into the database
                    DB::connection('ConnTestQC')->table('Picture_FIBC')->insert([
                        'Reference_No' => $referenceNo,
                        'Jumlah' => $jumlah,
                        'Pict_1' => $imageBinary ? DB::raw('0x' . bin2hex($imageBinary)) : null,
                        'Pict_2' => $imageBinary2 ? DB::raw('0x' . bin2hex($imageBinary2)) : null,
                        'Pict_3' => $imageBinary3 ? DB::raw('0x' . bin2hex($imageBinary3)) : null,
                        'Pict_4' => $imageBinary4 ? DB::raw('0x' . bin2hex($imageBinary4)) : null
                    ]);

                    // Insert data into Cyclic_Data_FIBC for all CyclicData fields
                    for ($i = 1; $i <= 30; $i++) {
                        $cyclicDataValue = $dataValues["Data_$i"];
                        DB::connection('ConnTestQC')->statement(
                            'INSERT INTO Cyclic_Data_FIBC (Reference_No, No, Data)
                                VALUES (?, ?, ?)',
                            [$referenceNo, $i, $cyclicDataValue]
                        );
                    }

                    // Insert TopResult into Cyclic_Data_FIBC
                    DB::connection('ConnTestQC')->statement(
                        'INSERT INTO Cyclic_Data_FIBC (Reference_No, No, Data)
                            VALUES (?, ?, ?)',
                        [$referenceNo, 31, $topResult]
                    );
                }

                // KOREKSI
            } else if ($a === 2) { // KOREKSI
                // breakage location bisa di centang > 1, data type varchar nya kurang besar
                DB::connection('ConnTestQC')->statement(
                    'UPDATE Result_FIBC
                     SET Height_Approx = ?, Dia = ?, Square = ?, Cyclic_Test = ?, Load_Speed = ?, Drop_Test = ?,
                         Cyclic_Lift = ?, Cyclic_Result = ?, Top_Lift = ?, Top_Result = ?, Breakage_Location = ?,
                         Drop_Result = ?, Test_Result = ?, UserKoreksi = ?, TimeKoreksi = getdate()
                     WHERE Reference_No = ?',
                    [
                        $heightApprox, $diaVal, $squareVal, $cyclicTest, $loadSpeed, $dropTest,
                        $cyclicLift, $cyclicResult, $topLift, $topResult, $breakageLocation,
                        $dropResult, $testResult, $UserInput, $referenceNo
                    ]
                );

                DB::connection('ConnTestQC')->table('Cyclic_FIBC')
                    ->where('Reference_No', $referenceNo)
                    ->update($dataValues);

                // Define the updateData array
                $updateData = [
                    'Jumlah' => $jumlah
                ];

                // Prepare the binary image data for each picture
                if ($imageBinary) {
                    $updateData['Pict_1'] = DB::raw('0x' . bin2hex($imageBinary));
                }
                if ($imageBinary2) {
                    $updateData['Pict_2'] = DB::raw('0x' . bin2hex($imageBinary2));
                }
                if ($imageBinary3) {
                    $updateData['Pict_3'] = DB::raw('0x' . bin2hex($imageBinary3));
                }
                if ($imageBinary4) {
                    $updateData['Pict_4'] = DB::raw('0x' . bin2hex($imageBinary4));
                }

                // Update the Picture_FIBC table
                DB::connection('ConnTestQC')->table('Picture_FIBC')
                    ->where('Reference_No', $referenceNo)
                    ->update($updateData);

                // If fewer than 4 images are provided, clear the remaining picture fields
                if ($jumlah < 4) {
                    $clearFields = [
                        'Pict_4' => ($jumlah < 4) ? null : DB::raw('0x' . bin2hex($imageBinary4))
                    ];

                    DB::connection('ConnTestQC')->table('Picture_FIBC')
                        ->where('Reference_No', $referenceNo)
                        ->update($clearFields);
                }


                // Update Cyclic_Data_FIBC for all CyclicData fields
                for ($i = 1; $i <= 30; $i++) {
                    $cyclicDataValue = $dataValues["Data_$i"];
                    DB::connection('ConnTestQC')->statement(
                        'UPDATE Cyclic_Data_FIBC
                            SET Data = ?
                            WHERE Reference_No = ? AND No = ?',
                        [$cyclicDataValue, $referenceNo, $i]
                    );
                }

                // Update Cyclic_Data_FIBC for TopResult
                DB::connection('ConnTestQC')->statement(
                    'UPDATE Cyclic_Data_FIBC
                        SET Data = ?
                        WHERE Reference_No = ? AND No = ?',
                    [$topResult, $referenceNo, '31']
                );
            }
            return response()->json(['success' => 'Data inserted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getRef') {
            if ($request->input('a') == 1) {
                $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?', [9]);
            } else if ($request->input('a') == 2 || $request->input('a') == 3) {
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

            $cyclicData = $cyclic[0];
            $swl = $cyclicData->SWL;
            $cyclicTestValue = 2 * $swl;
            $sf = $cyclicData->SF;
            $TestResult = $swl * $sf;
            $refCopy = $cyclicData->Copy_RefNo;

            if ($request->input('a') == 1) { // isi
                if (empty($refCopy)) {
                    return response()->json([
                        'cyclicTestValue' => $cyclicTestValue,
                        'TestResult' => $TestResult,
                        'refCopy' => ''
                    ]);
                } else {
                    $selectIsi = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_LIST_FIBC] @kode = ?, @RefNo = ?', [3, $refCopy]);

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
                            'Height_Approx' => number_format($data_detailIsi->Height_Approx, 2, '.', ''),
                            'dia_val' => number_format($data_detailIsi->Dia, 2, '.', ''),
                            'square_val' => $data_detailIsi->Square,
                            'Cyclic_Test' => number_format($data_detailIsi->Cyclic_Test, 2, '.', ''),
                            'Load_Speed' => number_format($data_detailIsi->Load_Speed, 2, '.', ''),
                            'Drop_Test' => $data_detailIsi->Drop_Test,
                            'Cyclic_Lift' => $data_detailIsi->Cyclic_Lift,
                            'Cyclic_Result' => $cyclicResult,
                            'Cyclic_Result_Remaining' => $cyclicResultRemaining,
                            'Top_Lift' => $data_detailIsi->Top_Lift,
                            'Top_Result' => number_format($data_detailIsi->Top_Result, 2, '.', ''),
                            'Breakage_Location' => $breakageLocation,
                            'Breakage_Location_Remaining' => $breakageLocationRemaining,
                            'Drop_Result' => $dropResult,
                            'Drop_Result_Remaining' => $dropResultRemaining,
                            'data_attribute' => 'cyclic',
                            'data_attribute' => 'drop'
                        ];
                    }

                    $data_full = [
                        'cyclicTestValue' => $cyclicTestValue,
                        'TestResult' => $TestResult,
                        'refCopy' => $refCopy,
                        'additionalData' => $data_additional
                    ];

                    return response()->json($data_full);
                }
            } else if ($request->input('a') == 2 || $request->input('a') == 3) { // koreksi atau hapus
                $selectKoreksi = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_RESULT_FIBC] @kode = ?, @RefNo = ?', [4, $request->input('no_ref')]);

                $data_getKoreksi = [];
                foreach ($selectKoreksi as $data_detailKor) {
                    $cyclicResultParts = explode('Visible damages found at', $data_detailKor->Cyclic_Result);
                    $dropResultParts = explode('Visible damages found at', $data_detailKor->Drop_Result);

                    $cyclicResultRemaining = count($cyclicResultParts) > 1 ? trim($cyclicResultParts[1]) : '';
                    $dropResultRemaining = count($dropResultParts) > 1 ? trim($dropResultParts[1]) : '';

                    $breakageLocationParts = explode('Others :', $data_detailKor->Breakage_Location);
                    $breakageLocationRemaining = count($breakageLocationParts) > 1 ? trim($breakageLocationParts[1]) : '';

                    $cyclicResult = count($cyclicResultParts) > 1 ? 'Visible damages found at' : $data_detailKor->Cyclic_Result;
                    $dropResult = count($dropResultParts) > 1 ? 'Visible damages found at' : $data_detailKor->Drop_Result;
                    $breakageLocation = count($breakageLocationParts) > 1 ? 'Others :' : $data_detailKor->Breakage_Location;

                    $data_getKoreksi[] = [
                        'Height_Approx' => number_format($data_detailKor->Height_Approx, 2, '.', ''),
                        'dia_val' => number_format($data_detailKor->Dia, 2, '.', ''),
                        'square_val' => $data_detailKor->Square,
                        'Cyclic_Test' => number_format($data_detailKor->Cyclic_Test, 2, '.', ''),
                        'Load_Speed' => number_format($data_detailKor->Load_Speed, 2, '.', ''),
                        'Drop_Test' => $data_detailKor->Drop_Test,
                        'Cyclic_Lift' => $data_detailKor->Cyclic_Lift,
                        'Cyclic_Result' => $cyclicResult,
                        'Cyclic_Result_Remaining' => $cyclicResultRemaining,
                        'Top_Lift' => $data_detailKor->Top_Lift,
                        'Top_Result' => number_format($data_detailKor->Top_Result, 2, '.', ''),
                        'Breakage_Location' => $breakageLocation,
                        'Breakage_Location_Remaining' => $breakageLocationRemaining,
                        'Drop_Result' => $dropResult,
                        'Drop_Result_Remaining' => $dropResultRemaining,
                        'Test_Result' => $TestResult,
                        'data_attribute' => 'cyclic',
                        'data_attribute' => 'drop',
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
                $data_getKoreksi = array_map(function ($item) {
                    foreach (['Pict_1', 'Pict_2', 'Pict_3', 'Pict_4'] as $field) {
                        if (!empty($item[$field])) {
                            $item[$field] = base64_encode($item[$field]);
                        }
                    }
                    return $item;
                }, $data_getKoreksi);

                // dd('Test_Result: ', $TestResult);


                $data_full = [
                    'cyclicTestValue' => $cyclicTestValue,
                    'TestResult' => $TestResult,
                    'koreksiData' => $data_getKoreksi
                ];


                return response()->json($data_full);
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


    public function destroy(Request $request, $id)
    {
        if ($id == 'hapusTest') {
            $Reference_No = $request->input('no_ref');
            try {
                DB::connection('ConnTestQC')->statement('exec [SP_1273_QTC_MAINT_RESULT_FIBC] @Kode = ?, @RefNo = ?', [6, $Reference_No]);

                return response()->json(['success' => 'Data deteled successfully'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to delete data: ' . $e->getMessage()], 500);
            }
        }
    }
}
