<?php

namespace App\Http\Controllers\COA\FIBC\Input;

use Auth;
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
        $Reference_No = $request->input('fixRefNo');
        $Tanggal = $request->input('tanggal');
        $Customer = $request->input('customer');
        $Bag_Code = $request->input('bagCode');
        $Bag_Type = $request->input('bagType');
        $PO_No = $request->input('poNo');
        $Tanggal_Prod = $request->input('prodDate');
        $Tanggal_Testing = $request->input('testingDate');
        $Size = $request->input('size');
        $Reinforced = $request->input('reinforced');
        $Colour = $request->input('colour');
        $SWL = $request->input('swl');
        $sf = $request->input('sf');
        $Panjang = $request->input('panjang1');
        $Lebar = $request->input('lebar1');
        $Waft = $request->input('waft1');
        $Weft = $request->input('weft1');
        $Denier_Waft = $request->input('denierWaft1');
        $Denier_Weft = $request->input('denierWeft1');
        $Weight = $request->input('weight1');
        $Jenis_FIBC = $request->input('jenis');
        $LiftingBelt_Type = $request->input('liftBeltType');
        $SewingThread_Type = $request->input('sewingThreadType');
        $Sewing_Method = $request->input('sewing');
        $Stitch_Approx = $request->input('stitch');
        $Fit_to_Draw = $request->input('draw');
        $UserInput = Auth::user()->NomorUser;
        $UserInput = trim($UserInput);
        $Panjang2 = $request->input('panjang2');
        $Lebar2 = $request->input('lebar2');
        $Waft2 = $request->input('waft2');
        $Weft2 = $request->input('weft2');
        $Denier_Waft2 = $request->input('denierWaft2');
        $Denier_Weft2 = $request->input('denierWeft2');
        $Weight2 = $request->input('weight2');
        $Top_KG_1 = $request->input('topS1');
        $Top_KG_2 = $request->input('topS2');
        $Top_KG_3 = $request->input('topS3');
        $Top_KG_4 = $request->input('topS4');
        $Top_KG_5 = $request->input('topS5');
        $Top_Persen_1 = $request->input('topE1');
        $Top_Persen_2 = $request->input('topE2');
        $Top_Persen_3 = $request->input('topE3');
        $Top_Persen_4 = $request->input('topE4');
        $Top_Persen_5 = $request->input('topE5');
        $Bottom_KG_1 = $request->input('bottomS1');
        $Bottom_KG_2 = $request->input('bottomS2');
        $Bottom_KG_3 = $request->input('bottomS3');
        $Bottom_KG_4 = $request->input('bottomS4');
        $Bottom_KG_5 = $request->input('bottomS5');
        $Bottom_Persen_1 = $request->input('bottomE1');
        $Bottom_Persen_2 = $request->input('bottomE2');
        $Bottom_Persen_3 = $request->input('bottomE3');
        $Bottom_Persen_4 = $request->input('bottomE4');
        $Bottom_Persen_5 = $request->input('bottomE5');

        try {
            $process = DB::connection('ConnTestQC')->statement(
                'exec SP_1273_QTC_MAINT_FIBC
                    @Kode = 1,
                    @RefNo = ?,
                    @Tanggal = ?,
                    @Cust = ?,
                    @BagCode = ?,
                    @BagType = ?,
                    @PO_No = ?,
                    @TglProd = ?,
                    @TglTest = ?,
                    @Size = ?,
                    @Reinf = ?,
                    @Colour = ?,
                    @Panjang = ?,
                    @Lebar = ?,
                    @Waft = ?,
                    @Weft = ?,
                    @DenierWA = ?,
                    @DenierWE = ?,
                    @Weight = ?,
                    @SWL = ?,
                    @SF = ?,
                    @Jenis = ?,
                    @LiftingType = ?,
                    @SewingType = ?,
                    @SewingMethod = ?,
                    @StitchApprox = ?,
                    @FitDrawing = ?,
                    @UserInput = ?,
                    @Panjang2 = ?,
                    @Lebar2 = ?,
                    @Waft2 = ?,
                    @Weft2 = ?,
                    @DenierWA2 = ?,
                    @DenierWE2 = ?,
                    @Weight2 = ?,
                    @TopKG1 = ?,
                    @TopKG2 = ?,
                    @TopKG3 = ?,
                    @TopKG4 = ?,
                    @TopKG5 = ?,
                    @TopPersen1 = ?,
                    @TopPersen2 = ?,
                    @TopPersen3 = ?,
                    @TopPersen4 = ?,
                    @TopPersen5 = ?,
                    @BottomKG1 = ?,
                    @BottomKG2 = ?,
                    @BottomKG3 = ?,
                    @BottomKG4 = ?,
                    @BottomKG5 = ?,
                    @BottomPersen1 = ?,
                    @BottomPersen2 = ?,
                    @BottomPersen3 = ?,
                    @BottomPersen4 = ?,
                    @BottomPersen5 = ?',
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
                    $Panjang,
                    $Lebar,
                    $Waft,
                    $Weft,
                    $Denier_Waft,
                    $Denier_Weft,
                    $Weight,
                    $SWL,
                    $sf,
                    $Jenis_FIBC,
                    $LiftingBelt_Type,
                    $SewingThread_Type,
                    $Sewing_Method,
                    $Stitch_Approx,
                    $Fit_to_Draw,
                    $UserInput,
                    $Panjang2,
                    $Lebar2,
                    $Waft2,
                    $Weft2,
                    $Denier_Waft2,
                    $Denier_Weft2,
                    $Weight2,
                    $Top_KG_1,
                    $Top_KG_2,
                    $Top_KG_3,
                    $Top_KG_4,
                    $Top_KG_5,
                    $Top_Persen_1,
                    $Top_Persen_2,
                    $Top_Persen_3,
                    $Top_Persen_4,
                    $Top_Persen_5,
                    $Bottom_KG_1,
                    $Bottom_KG_2,
                    $Bottom_KG_3,
                    $Bottom_KG_4,
                    $Bottom_KG_5,
                    $Bottom_Persen_1,
                    $Bottom_Persen_2,
                    $Bottom_Persen_3,
                    $Bottom_Persen_4,
                    $Bottom_Persen_5
                ]
            );

            return response()->json(['success' => 'Data inserted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'GetReff') {
            $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?', [2]);
            $data_ref = [];
            foreach ($refNo as $refno) {
                $data_ref[] = [
                    'Reference_No' => $refno->Reference_No,
                    'Tanggal' => $refno->Tanggal,
                ];
            }
            return datatables($data_ref)->make(true);
        } else if ($id == 'getDataDetailReference') {
            $dataDetailRef = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?, @RefNo = ?', [3, $request->input('no_ref')]);

            $data_detailReff = [];
            // dd($dataDetailRef);

            foreach ($dataDetailRef as $dataDetail) {
                $data_detailReff[] = [
                    'Reference_No' => $dataDetail->Reference_No,
                    'Tanggal' => $dataDetail->Tanggal,
                    'Customer' => $dataDetail->Customer,
                    'Bag_Code' => $dataDetail->Bag_Code,
                    'Bag_Type' => $dataDetail->Bag_Type,
                    'PO_No' => $dataDetail->PO_No,
                    'Tanggal_Prod' => $dataDetail->Tanggal_Prod,
                    'Tanggal_Testing' => $dataDetail->Tanggal_Testing,
                    'Size' => $dataDetail->Size,
                    'Reinforced' => $dataDetail->Reinforced,
                    'Colour' => $dataDetail->Colour,
                    'SWL' => $dataDetail->SWL,
                    'SF' => $dataDetail->SF,

                    'Jenis_FIBC' => $dataDetail->Jenis_FIBC,
                    'Sewing_Method' => $dataDetail->Sewing_Method,
                    'Stitch_Approx' => $dataDetail->Stitch_Approx,
                    'Fit_to_Draw' => $dataDetail->Fit_to_Draw,

                    'LiftingBelt_Type' => $dataDetail->LiftingBelt_Type,
                    'SewingThread_Type' => $dataDetail->SewingThread_Type,
                    'Top_KG_1' => $dataDetail->Top_KG_1,
                    'Top_KG_2' => $dataDetail->Top_KG_2,
                    'Top_KG_3' => $dataDetail->Top_KG_3,
                    'Top_KG_4' => $dataDetail->Top_KG_4,
                    'Top_KG_5' => $dataDetail->Top_KG_5,
                    'Top_Persen_1' => $dataDetail->Top_Persen_1,
                    'Top_Persen_2' => $dataDetail->Top_Persen_2,
                    'Top_Persen_3' => $dataDetail->Top_Persen_3,
                    'Top_Persen_4' => $dataDetail->Top_Persen_4,
                    'Top_Persen_5' => $dataDetail->Top_Persen_5,
                    'Bottom_KG_1' => $dataDetail->Bottom_KG_1,
                    'Bottom_KG_2' => $dataDetail->Bottom_KG_2,
                    'Bottom_KG_3' => $dataDetail->Bottom_KG_3,
                    'Bottom_KG_4' => $dataDetail->Bottom_KG_4,
                    'Bottom_KG_5' => $dataDetail->Bottom_KG_5,
                    'Bottom_Persen_1' => $dataDetail->Bottom_Persen_1,
                    'Bottom_Persen_2' => $dataDetail->Bottom_Persen_2,
                    'Bottom_Persen_3' => $dataDetail->Bottom_Persen_3,
                    'Bottom_Persen_4' => $dataDetail->Bottom_Persen_4,
                    'Bottom_Persen_5' => $dataDetail->Bottom_Persen_5,
                    'Panjang' => $dataDetail->Panjang,
                    'Lebar' => $dataDetail->Lebar,
                    'Waft' => $dataDetail->Waft,
                    'Denier_Waft' => $dataDetail->Denier_Waft,
                    'Weft' => $dataDetail->Weft,
                    'Denier_Weft' => $dataDetail->Denier_Weft,
                    'Weight' => $dataDetail->Weight,
                    'Panjang2' => $dataDetail->Panjang2,
                    'Lebar2' => $dataDetail->Lebar2,
                    'Waft2' => $dataDetail->Waft2,
                    'Denier_Waft2' => $dataDetail->Denier_Waft2,
                    'Weft2' => $dataDetail->Weft2,
                    'Denier_Weft2' => $dataDetail->Denier_Weft2,
                    'Weight2' => $dataDetail->Weight2
                ];
            }

            return response()->json($data_detailReff);
        } else if ($id == 'GetBagCode') {
            $bagCode = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_LIST_FIBC] @Kode = ?', [1]);
            $data_bag = [];
            // dd($bagCode);
            foreach ($bagCode as $bagCode) {
                $data_bag[] = [
                    'Reference_No' => $bagCode->Reference_No,
                    'Bag_Code' => $bagCode->Bag_Code,
                ];
            }
            return datatables($data_bag)->make(true);
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
