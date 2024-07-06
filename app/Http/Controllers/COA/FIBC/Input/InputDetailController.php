<?php

namespace App\Http\Controllers\COA\FIBC\Input;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class InputDetailController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'InputDetail';
        return view('COA.Input.InputDetail', compact('data', 'access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'material' => 'required|string|max:100',
        // ]);

        $Reference_No = $request->input('reffNo');
        $Tanggal = $request->input('tanggal');
        $Customer = $request->input('customer');
        $Bag_Code = $request->input('bag-code');
        $Bag_Type = $request->input('bag-type');
        $PO_No = $request->input('po-no');
        $Tanggal_Prod = $request->input('prod-date');
        $Tanggal_Testing = $request->input('testing-date');
        $Size = $request->input('size');
        $Reinforced = $request->input('reinforced');
        $Colour = $request->input('colour');
        $SWL = $request->input('swl');
        $sf = $request->input('sf');
        $Panjang = $request->input('');
        $Lebar = $request->input('');
        $Waft = $request->input('');
        $Weft = $request->input('');
        $Denier_Waft = $request->input('');
        $Denier_Weft = $request->input('');
        $Weight = $request->input('');
        $Jenis_FIBC = $request->input('');
        $LiftingBelt_Type = $request->input('');
        $SewingThread_Type = $request->input('');
        $LiftingBelt_Type = $request->input('');
        $Sewing_Method = $request->input('');
        $Stitch_Approx = $request->input('');
        $Fit_to_Draw = $request->input('');
        $UserInput = $request->input('');
        $TimeInput = $request->input('');
        $Panjang2 = $request->input('');
        $Lebar2 = $request->input('');
        $Waft2 = $request->input('');
        $Weft2 = $request->input('');
        $Denier_Waft2 = $request->input('');
        $Denier_Weft2 = $request->input('');
        $Weight2 = $request->input('');
        $Copy_RefNo = $request->input('');

        $Top_KG_1 = $request->input('');
        $Top_KG_2 = $request->input('');
        $Top_KG_3 = $request->input('');
        $Top_KG_4 = $request->input('');
        $Top_KG_5 = $request->input('');
        $Top_Persen_1 = $request->input('');
        $Top_Persen_2 = $request->input('');
        $Top_Persen_3 = $request->input('');
        $Top_Persen_4 = $request->input('');
        $Top_Persen_5 = $request->input('');
        $Bottom_KG_1 = $request->input('');
        $Bottom_KG_2 = $request->input('');
        $Bottom_KG_3 = $request->input('');
        $Bottom_KG_4 = $request->input('');
        $Bottom_KG_5 = $request->input('');
        $Bottom_Persen_1 = $request->input('');
        $Bottom_Persen_2 = $request->input('');
        $Bottom_Persen_3 = $request->input('');
        $Bottom_Persen_4 = $request->input('');
        $Bottom_Persen_5 = $request->input('');



        try {
            $process = DB::connection('ConnTestQC')->statement(
                'exec [SP_1273_QTC_MAINT_FIBC] @Kode = 1,
                @Reference_No = ?,
                @Tanggal = ?,
                @Customer = ?,
                @Bag_Code = ?,
                @Bag_Type = ?,
                @PO_No = ?,
                @Tanggal_Prod = ?,
                @Tanggal_Testing = ?,
                @Size = ?,
                @Reinforced = ?,
                @Colour = ?,
                @SWL = ?,
                @sf = ?',
                [
                    $Reference_No,
                    $Tanggal,
                    $Customer,
                    $Bag_Code,
                    $Bag_Type,
                    $PO_No,
                    $Tanggal_Prod,
                    $Tanggal_Testing,
                    $Size,
                    $Reinforced,
                    $Colour,
                    $SWL,
                    $sf
                ]
            );

            return response()->json(['success' => 'Data inserted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        if ($id == 'GetReff') {
            $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?', [2]);
            $data_list = [];
            foreach ($refNo as $refno) {
                $data_list[] = [
                    'Reference_No' => $refno->Reference_No,
                    'Tanggal' => $refno->Tanggal,
                ];
            }
            return datatables($data_list)->make(true);
        } elseif ($id == 'GetBagCode') {
            $bagCode = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_LIST_FIBC] @Kode = ?', [1]);
            $data_list = [];
            // dd($bagCode);
            foreach ($bagCode as $bagCode) {
                $data_list[] = [
                    'Reference_No' => $bagCode->Reference_No,
                    'Bag_Code' => $bagCode->Bag_Code,
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
        //
    }

    public function destroy($id)
    {
        //
    }
}
