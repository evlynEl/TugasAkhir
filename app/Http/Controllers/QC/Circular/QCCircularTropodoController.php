<?php

namespace App\Http\Controllers\QC\Circular;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class QCCircularTropodoController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        return view('QC.Circular.CircularTropodo', compact('access'));
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
        if ($id == 'getDataFromDate') {
            $tgl = $request->input('TglLog');

            $listDataDate = DB::connection('ConnCircular')
                ->select('exec [SP_1273_QC_LIST_QC] @Kode= ?, @TglLog= ?', [1, $tgl]);

            $dataDate = [];
            foreach ($listDataDate as $dateSelected) {
                $dataDate[] = [
                    'Id_Log' => $dateSelected->Id_Log,
                    'Nama_Mesin' => $dateSelected->Nama_mesin,
                    'NAMA_BRG' => $dateSelected->NAMA_BRG,
                    'Shift' => $dateSelected->Shift,
                ];
            }
            return datatables($dataDate)->make(true);
        }

        else if ($id == 'showDetailByLog') {
            $IdLog = $request->input('IdLog');
            $listDetailByLog = DB::connection('ConnCircular')
                ->select('exec [SP_1273_QC_LIST_QC] @Kode= ?, @IdLog= ?', [2, $IdLog]);

            $dataDetailByLog = [];
            foreach ($listDetailByLog as $detail) {
                $dataDetailByLog[] = [
                    // 'idLog' => $detail->Id_Log,
                    'mesin' => $detail->Nama_mesin,
                    'ukuran' => $detail->Ukuran,
                    'waftRajutan' => $detail->R_WA,
                    'weftRajutan' => $detail->R_WE,
                    'waftBenang' => $detail->BngWaft,
                    'weftBenang' => $detail->BngWeft,
                    'waftDenier' => $detail->DenierWA,
                    'weftDenier' => $detail->DenierWE,
                    'ukuranLebar' => $detail->Lebar,
                    // kurang dtek9 sama jenis karung
                ];
            }
            // dd($dataDetailByLog);
            return response()->json($dataDetailByLog);
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
