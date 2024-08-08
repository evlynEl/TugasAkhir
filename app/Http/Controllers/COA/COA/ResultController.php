<?php

namespace App\Http\Controllers\COA\COA;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class ResultController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'Result';
        return view('COA.COAResult', compact('data', 'access'));
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
        if ($id === 'GetCustomer') {
            $cust = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?', [3]);
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

            $type = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?, @IdCust = ?', [4, $idCust]);
            $data_list = [];
            foreach ($type as $types) {
                $data_list[] = [
                    'KodeBarang' => $types->KodeBarang,
                    'NAMA_BRG' => $types->NAMA_BRG,
                ];
            }
            return datatables($data_list)->make(true);
        }

        // detail type
        else if ($id === 'getTypeDetail') {
            $idCust = $request->input('IdCust');
            $idType = $request->input('IdType');

            $type = DB::connection('ConnTestQC')->select(
                'exec [SP_1273_LIST_COA] @kode = ?, @IdCust = ?, @KodeBarang = ?',
                [5, $idCust, $idType]
            );
            $data_list = [];
            foreach ($type as $types) {
                $data_list[] = [
                    'Capacity' => $types->Capacity,
                    'Dimension' => $types->Dimension,
                    'Commodity' => $types->Commodity,
                    'Id' => $types->Id,
                ];
            }
            return response()->json($data_list);
        }

        //part section
        else if ($id === 'GetPartSection') {
            $idMaster = $request->input('idMaster');

            $type = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?, @IdMaster = ?', [6, $idMaster]);
            $data_list = [];
            foreach ($type as $types) {
                $data_list[] = [
                    'PartSection' => $types->PartSection,
                ];
            }
            return datatables($data_list)->make(true);
        }

        //Material
        else if ($id === 'GetMaterial') {
            $idMaster = $request->input('idMaster');
            $partSection = $request->input('partSection');

            $type = DB::connection('ConnTestQC')->select(
                'exec [SP_1273_LIST_COA] @kode = ?, @IdMaster = ?, @PartSection = ?',
                [7, $idMaster, $partSection]
            );
            $data_list = [];
            foreach ($type as $types) {
                $data_list[] = [
                    'Material' => $types->Material,
                ];
            }
            return datatables($data_list)->make(true);
        }

        // item
        else if ($id === 'GetItem') {
            $idMaster = $request->input('idMaster');
            $partSection = $request->input('partSection');
            $material = $request->input('material');

            $type = DB::connection('ConnTestQC')->select(
                'exec [SP_1273_LIST_COA] @kode = ?, @IdMaster = ?, @PartSection = ?, @Material = ?',
                [8, $idMaster, $partSection, $material]
            );
            $data_list = [];
            foreach ($type as $types) {
                $data_list[] = [
                    'Item' => $types->Item,
                    'Id' => $types->Id
                ];
            }
            return datatables($data_list)->make(true);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($id === 'prosesResult') {

            $IdMaster = $request->input('IdMaster');
            $Tanggal = $request->input('Tanggal');
            $NoCOA = $request->input('NoCOA');
            $NoPO = $request->input('NoPO');
            $NoSP = $request->input('NoSP');

            $arrDetail = $request->input('arrayData');

            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            DB::connection('ConnTestQC')->beginTransaction();

            try {
                DB::connection('ConnTestQC')->statement(
                    'exec [SP_1273_PROSES_RESULT_COA]
                    @kode = ?, @IdMaster = ?, @Tanggal = ?, @NoCOA = ?, @NoPO = ?, @NoSP = ?, @UserInput = ?',
                    [1, $IdMaster, $Tanggal, $NoCOA, $NoPO, $NoSP, $UserInput]
                );

                foreach ($arrDetail as $detail) {
                    $IdDetail = $detail['idItem'] ?? null;
                    $Result = $detail['test_result'] ?? null;
                    DB::connection('ConnTestQC')->statement(
                        'exec [SP_1273_PROSES_RESULT_COA]
                    @kode = ?, @IdDetail = ?, @Result = ?',
                        [2, $IdDetail, $Result]
                    );
                }

                DB::connection('ConnTestQC')->commit();
                return response()->json(['success' => 'Data berhasil disimpan'], 200);
            } catch (\Exception $e) {
                DB::connection('ConnTestQC')->rollBack();
                return response()->json(['error' => 'Data gagal disimpan: ' . $e->getMessage()], 500);
            }
        }
    }

    public function destroy($id)
    {
        //
    }
}
