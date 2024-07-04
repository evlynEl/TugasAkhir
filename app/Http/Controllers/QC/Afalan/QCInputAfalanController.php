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
        // $data = DB::connection('ConnInventory')->select('exec [SP_1273_INV_Ambil_noRoll]');
        // return view('QC.Afalan.InputAfalanQC', compact('data', 'access'));
        return view('QC.Afalan.InputAfalanQC', compact('access'));
    }

    // public function showData()
    // {
    //     $access = (new HakAksesController)->HakAksesFiturMaster('QC');
    //     $dataInside = DB::connection('ConnInventory')->select('exec [SP_1273_INV_CekDataGelondongan1]');
    //     return view('QC.Afalan.InputAfalanQC', compact('data', 'access'));
    // }

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
            // Fetch the customer data
            $listNoRoll = DB::connection('ConnInventory')
                ->select('exec SP_1273_INV_Ambil_noRoll');
            // Convert the data into an array that DataTables can consume
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
        //
    }

    public function destroy($id)
    {
        //
    }
}
