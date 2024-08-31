<?php

namespace App\Http\Controllers\COA\FIBC\ACC;

use Illuminate\Http\Request;
use Spatie\Html\Elements\Select;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;


class ACCQCSpvController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'ACCQCSpv';
        return view('COA.ACC.ACCQCSpv', compact('data', 'access'));
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
            $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_ACC_FIBC] @kode = ?', [1]);
            $data_Ref = [];
            foreach ($refNo as $detailRef) {
                $data_Ref[] = [
                    'Reference_No' => $detailRef->Reference_No,
                    'Customer' => $detailRef->Customer
                ];
            }
            return datatables($data_Ref)->make(true);
        } else if ($id == 'getDetail') {

            $no = $request->input('no_ref');

            $result = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_ACC_FIBC] @Kode = ?, @RefNo = ?', [2, $request->input('no_ref')]);
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
                ->table('dbo.VW_QTC_1273_FIBC_RESULT_BELUM_ACC')
                ->select('*') // Select all fields
                ->where('dbo.VW_QTC_1273_FIBC_RESULT_BELUM_ACC.Reference_No', $no)
                ->get()
                ->map(function ($item) {
                    foreach (['Pict_1', 'Pict_2', 'Pict_3', 'Pict_4'] as $field) {
                        if (!empty($item->$field)) {
                            $item->$field = base64_encode($item->$field);
                        }
                    }
                    return $item;
                });

            // dd($detailResult, $data);


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
        if ($id == 'accSpv') {
            $RefNo = $request->input('RefNo');
            $user = Auth::user()->NomorUser;
            $user = trim($user);

            try {
                DB::connection('ConnTestQC')
                    ->statement('exec [SP_1273_QTC_ACC_SPV_FIBC]
                @Kode = ?,
                @RefNo = ?,
                @UserACC = ?
                ', [
                        1,
                        $RefNo,
                        $user
                    ]);
                return response()->json(['success' => 'Data berhasil diACC'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diACC: ' . $e->getMessage()], 500);
            }
        }
    }

    public function destroy($id)
    {
        //
    }
}
