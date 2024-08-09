<?php

namespace App\Http\Controllers\COA\COA\Master;

use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class MasterTypeController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'MasterType';
        return view('COA.Master.MasterType', compact('data', 'access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());

        $customerId = $request->input('customerId');
        $kodeBarang = $request->input('kodeBarang');
        $capacity = $request->input('capacity');
        $dimension = $request->input('dimension');
        $comodity = $request->input('comodity');
        $UserInput = Auth::user()->NomorUser;
        $tableData = json_decode($request->input('tableData'), true);
        // dd($tableData);

        DB::connection('ConnTestQC')->beginTransaction();

        try {
            // masukkan ke Master_COA
            DB::connection('ConnTestQC')->statement(
                'exec SP_1273_PROSES_COA
                    @Kode = ?,  @IdCust = ?, @KodeBarang = ?,  @Capacity = ?, @Dimension = ?,  @Commodity = ?,  @UserInput = ?',
                [1, $customerId, $kodeBarang, $capacity, $dimension, $comodity, $UserInput]
            );

            // ambil id dari Master_COA unk di pakai ke Detail_COA
            $result = DB::connection('ConnTestQC')->select(
                '
                exec SP_1273_PROSES_COA
                @Kode = ?, @IdCust = ?, @KodeBarang = ?, @Capacity = ?, @Dimension = ?,  @Commodity = ?',
                [3, $customerId, $kodeBarang, $capacity, $dimension, $comodity]
            );
            $id = $result[0]->Id;
            // dd($id);

            // masukkan ke Detail_COA isi tablenya
            foreach ($tableData as $row) {
                $part = $row[0];
                $material = $row[1];
                $item = $row[2];
                $standard = $row[3];

                DB::connection('ConnTestQC')->statement(
                    'exec SP_1273_PROSES_COA
                    @Kode = ?,  @IdMaster = ?,  @PartSection = ?, @Material = ?,  @Item = ?,  @Standart = ?',
                    [
                        2,
                        $id,
                        $part,
                        $material,
                        $item,
                        $standard
                    ]
                );
            }

            DB::connection('ConnTestQC')->commit();
            return response()->json(['success' => 'Data inserted successfully'], 200);
        } catch (\Exception $e) {
            DB::connection('ConnTestQC')->rollBack();
            return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
        }
    }

    public function show($id, Request $request)
    {
        // ambil data customer
        if ($id === 'getCustomer') {
            $cust = DB::connection('ConnSales')->select('exec [SP_1486_SLS_LIST_CUSTOMER] @kode = ?', [4]);
            $data_list = [];
            foreach ($cust as $data_cust) {
                $data_list[] = [
                    'NamaCust' => $data_cust->NamaCust,
                    'IdCust' => $data_cust->IdCust,
                ];
            }
            return datatables($data_list)->make(true);

            // ambil data type
        } else if ($id === 'getType') {
            $type = DB::connection('ConnPurchase')->select('exec [SP_1003_INV_Lihat_Type] @NO_JNS_1 = ?', [$request->input('barang')]);
            $data_list = [];
            foreach ($type as $data_type) {
                $data_list[] = [
                    'NAMA_BRG' => $data_type->NAMA_BRG,
                    'KD_BRG' => $data_type->KD_BRG,
                ];
            }
            return datatables($data_list)->make(true);

            // ambil data yang punya kode 1509
        } else if ($id === 'getJumboLokal') {
            $jumboLokal = DB::connection('ConnJumboBag')->select('exec [SP_1273_COA_LIST_TABEL_HITUNGAN] @Kode = ?, @KodeBarang = ?', [1, $request->input('kode_barang')]);
            $data_list = [];
            foreach ($jumboLokal as $data_jumboLokal) {
                $data_list[] = [
                    'Panjang_BB' => $data_jumboLokal->Panjang_BB,
                    'Lebar_BB' => $data_jumboLokal->Lebar_BB,
                    'Tinggi_BB' => $data_jumboLokal->Tinggi_BB,
                    'SWL' => $data_jumboLokal->SWL,
                    'SF1' => $data_jumboLokal->SF1,
                    'SF2' => $data_jumboLokal->SF2
                ];
            }
            return response()->json($data_list);

            // ambil data part section
        } else if ($id === 'getPart') {
            $part = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?', [1]);
            $data_list = [];
            foreach ($part as $data_part) {
                $data_list[] = [
                    'PartSection' => $data_part->PartSection,
                    'Id' => $data_part->Id,
                ];
            }
            return datatables($data_list)->make(true);

            // ambil data material section
        } else if ($id === 'getMaterial') {
            $material = DB::connection('ConnTestQC')->select('exec [SP_1273_LIST_COA] @kode = ?', [2]);
            $data_list = [];
            foreach ($material as $data_material) {
                $data_list[] = [
                    'Material' => $data_material->Material,
                    'Id' => $data_material->Id,
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
