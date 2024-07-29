<?php

namespace App\Http\Controllers\QC\Afalan;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Response;

class QCInputAfalanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        return view('QC.Afalan.InputAfalanQC', compact('access'));
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
        if ($id == 'getDataNoRoll') {
            $listNoRoll = DB::connection('ConnInventory')
                ->select('exec SP_1273_INV_Ambil_noRoll');
            $dataNoRoll = [];
            foreach ($listNoRoll as $NoRoll) {
                $dataNoRoll[] = [
                    'NoRoll' => $NoRoll->NoRoll,
                    'NamaType' => $NoRoll->NamaType,
                ];
            }
            return datatables($dataNoRoll)->make(true);
        } else if ($id == 'getDataDetailNoRoll') {
            $dataInside = DB::connection('ConnInventory')->select('exec SP_1273_INV_CekDataGelondongan1 @NoRoll = ?', [$request->input('noRoll')]);
            $dataDetailNoRoll = [];
            foreach ($dataInside as $NoRoll) {
                $dataDetailNoRoll[] = [
                    'NoRoll' => trim($NoRoll->NoRoll),
                    'NamaType' => trim($NoRoll->NamaType),
                    'NoIndeks' => trim($NoRoll->NoIndeks),
                    'Kode_Barang' => trim($NoRoll->Kode_Barang),
                    'MeterBruto' => trim($NoRoll->MeterBruto),
                    'Qty_Sekunder' => trim($NoRoll->Qty_Sekunder),
                    'Qty' => trim($NoRoll->Qty),
                    'lblSekunder' => trim($NoRoll->SatSekunder),
                    'SatTritier' => trim($NoRoll->SatTritier),
                ];

            }
            return response()->json($dataDetailNoRoll);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($id == 'inputDataAfalan') {
            $kode = $request->input('kode');
            $item_number = $request->input('item_number');
            $no_roll = $request->input('no_roll');
            $meter_netto = $request->input('meter_netto');

            // dd($kode, $item_number, $no_roll, $meter_netto);

            try {
                $coba = DB::connection('ConnInventory')->statement('exec SP_1273_INV_KoreksiAfalan
                @Kode_Barang = ?, @item_number = ?, @NoRoll = ?, @MeterNetto = ?',
                    [$kode, $item_number, $no_roll, $meter_netto]
                );

                return response()->json(['success' => 'Data inserted successfully'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
            }
        }
    }



    public function destroy($id)
    {
        //
    }
}
