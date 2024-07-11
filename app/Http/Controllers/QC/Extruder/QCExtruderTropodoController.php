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
        else if ($id == 'getShiftData') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');
            $mesin = $request->input('IdMesin');

            $listShift = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?, @tgl = ?, @Shift = ?, @mesin = ?', [3, $tgl, $Shift, $mesin]);
            $dataShiftarr = [];
            foreach ($listShift as $dataShift) {
                $dataShiftarr[] = [
                    'AwalShift' => $dataShift->AwalShift,
                    'AkhirShift' => $dataShift->AkhirShift,
                ];
            }
            return response()->json($dataShiftarr);
        }

        // ambil spek benang
        else if ($id == 'getSpekBenang') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');
            $mesin = $request->input('mesin');

            $listSpekBenang = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?, @tgl = ?, @shift = ?, @mesin = ?', [2, $tgl, $Shift, $mesin]);
            $dataSpekBenangArr = [];
            foreach ($listSpekBenang as $listSpek) {
                $dataSpekBenangArr[] = [
                    'TypeBenang' => $listSpek->TypeBenang,
                    'IdMesin' => $listSpek->IdMesin,
                ];
            }
            return datatables($dataSpekBenangArr)->make(true);
        }

        // ambil id konversi
        else if ($id == 'getIdKonversi') {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $mesin = $request->input('mesin');
            $benang = $request->input('benang');

            $idKonversiConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?,
                @tgl = ?,
                @shift = ?,
                @mesin = ?,
                @benang = ?', [4, $tgl, $shift, $mesin, $benang]);
            $idKonversiArr = [];
            foreach ($idKonversiConn as $listKonv) {
                $idKonversiArr[] = [
                    'IdKonversi' => $listKonv->IdKonversi,
                ];
            }
            return response()->json($idKonversiArr);
        }

        // PROSEN DAN QUANTITY
        // ambil data list Bahan Baku
        else if ($id == 'getBahanBaku') {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $nama = $request->input('nama');
            $benang = $request->input('benang');

            $idKonversiConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_BAHAN_KONV
                @kode = ?,
                @tgl = ?,
                @shift = ?,
                @nama = ?,
                @benang = ?',
                    [
                        1,
                        $tgl,
                        $shift,
                        $nama,
                        $benang
                    ]
                );
            $idKonversiArr = [];
            foreach ($idKonversiConn as $listKonv) {
                $idKonversiArr[] = [
                    'Merk' => $listKonv->Merk,
                    'IdType' => $listKonv->IdType,
                ];
            }
            return datatables($idKonversiArr)->make(true);
        }

        // ambil quantity bahan baku
        else if ($id == 'getQuantityBahanBaku') {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $nama = $request->input('nama');
            $benang = $request->input('benang');
            $type = $request->input('type');

            $quantityBahanBakuConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_BAHAN_KONV @kode = ?,
                @tgl = ?,
                @shift = ?,
                @nama = ?,
                @benang = ?,
                @type = ?', [4, $tgl, $shift, $nama, $benang, $type]);
            $quantityBahanBakuArr = [];
            foreach ($quantityBahanBakuConn as $listQuantity) {
                $quantityBahanBakuArr[] = [
                    'Quantity' => $listQuantity->JumlahTritier,
                ];
            }
            return response()->json($quantityBahanBakuArr);
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
