<?php

namespace App\Http\Controllers\QC\Extruder;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class QCExtruderTropodoController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        return view('QC.Extruder.ExtruderTropodo', compact('access'));
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

        // ambil nomor transaksi
        if ($id == 'getNomorTransaksi') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');
            $Mesin = $request->input('Mesin');            

            $listTransaksi = DB::connection('ConnExtruder')
                ->select('exec SP_1273_QC_LIST_KOREKSIMASTERQC @tgl = ?, @Shift = ?, @Mesin = ?', [$tgl, $Shift, $Mesin]);
            $dataNoTransaksi = [];
            foreach ($listTransaksi as $NoTransaksi) {
                $dataNoTransaksi[] = [
                    'NoTrans' => $NoTransaksi->NoTrans,
                    'Trans' => $NoTransaksi->Trans,
                ];
            }
            return datatables($dataNoTransaksi)->make(true);
        }

        // ambil id mesin
        else if ($id == 'getIdMesin') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');

            $listIdMesin = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?, @tgl = ?, @Shift = ?, @Divisi = ?', [1, $tgl, $Shift, "EXT"]);
            $dataIdMesin = [];
            foreach ($listIdMesin as $listMesin) {
                $dataIdMesin[] = [
                    'IdMesin' => $listMesin->IdMesin,
                    'NamaMesin' => $listMesin->TypeMesin,
                ];
            }
            return datatables($dataIdMesin)->make(true);
        }

        // ambil shift awal akhir
        else if ($id == 'getIdMesin') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');
            $mesin = $request->input('IdMesin');

            $listShift = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?, @tgl = ?, @Shift = ?, @mesin = ?', [3, $tgl, $Shift, $mesin]);
            $dataShift = [];
            foreach ($listShift as $dataShift) {
                $dataShift[] = [
                    'AwalShift' => $dataShift->AwalShift,
                    'AkhirShift' => $dataShift->AkhirShift,
                ];
            }
            return datatables($dataShift)->make(true);
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
