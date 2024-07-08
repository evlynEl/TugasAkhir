<?php

namespace App\Http\Controllers\QC\Circular;

use Auth;
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
        // dd(Auth::user()->NomorUser);
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
        } else if ($id == 'showDetailByLog') {
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
                    'Lebar' => $detail->Lebar,
                    'D_Tek9' => $detail->D_TEK9,
                    'JenisKrg' => $detail->JenisKrg
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
        if ($id == 'prosesIsiData') {
            $IdLog = $request->input('IdLog');
            $Tanggal = $request->input('Tanggal');
            $Ukuran = $request->input('Ukuran');
            $UkuranSTD = $request->input('UkuranSTD');
            $Potongan = $request->input('Potongan');
            $BeratSTD = $request->input('BeratSTD');
            $Berat = $request->input('Berat');
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);
            $StWarp = $request->input('StWarp');
            $ElgWarp = $request->input('ElgWarp');
            $StWeft = $request->input('StWeft');
            $ElgWeft = $request->input('ElgWeft');
            $StReinforced = $request->input('StReinforced');
            $ElgReinforced = $request->input('ElgReinforced');
            $BeratReinforced = $request->input('BeratReinforced');
            $StandartWA = $request->input('StandartWA');
            $StandartWE = $request->input('StandartWE');
            $StandartElgWA = $request->input('StandartElgWA');
            $StandartElgWE = $request->input('StandartElgWE');

            try {
                DB::connection('ConnCircular')
                    ->statement('exec [SP_1273_QC_MAINT_QC] 
                @Kode = ?, 
                @IdLog = ?, 
                @Tanggal = ?, 
                @Ukuran = ?, 
                @UkuranSTD = ?,
                @Potongan = ?,
                @BeratSTD = ?, 
                @Berat = ?, 
                @UserInput = ?, 
                @StWarp = ?, 
                @ElgWarp = ?, 
                @StWeft = ?, 
                @ElgWeft = ?, 
                @StReinforced = ?, 
                @ElgReinforced = ?, 
                @BeratReinforced = ?, 
                @StandartWA = ?, 
                @StandartWE = ?, 
                @StandartElgWA = ?, 
                @StandartElgWE = ?', [
                        1,
                        $IdLog,
                        $Tanggal,
                        $Ukuran,
                        $UkuranSTD,
                        $Potongan,
                        $BeratSTD,
                        $Berat,
                        $UserInput,
                        $StWarp,
                        $ElgWarp,
                        $StWeft,
                        $ElgWeft,
                        $StReinforced,
                        $ElgReinforced,
                        $BeratReinforced,
                        $StandartWA,
                        $StandartWE,
                        $StandartElgWA,
                        $StandartElgWE,
                    ]);
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
    }

    public function destroy($id)
    {
        //
    }
}
