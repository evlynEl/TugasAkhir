<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class LaporanStokController extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('LaporanStok');
        return view('Laporan.LaporanStok', compact('access'));
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
        // divisi
        if ($id === 'getDivisi') {
            $divisiConn = DB::connection('ConnInventory')
                ->table('VW_PRG_SUBKEL')
                ->select('NamaDivisi')
                ->groupBy('NamaDivisi')
                ->orderBy('NamaDivisi')
                ->get();

            return datatables($divisiConn)->make(true);
        } else if ($id === 'getIdDivisi') {
            $namaDivisi = $request->input('namaDivisi');

            $idDivisiConn = DB::connection('ConnInventory')
                ->table('VW_PRG_SUBKEL')
                ->select('*')
                ->where('NamaDivisi', $namaDivisi)
                ->orderBy('NamaDivisi')
                ->get();

            return response()->json($idDivisiConn);
        }

        // objek
        else if ($id === 'getObjek') {
            $idDivisi = $request->input('idDivisi');

            if (empty($idDivisi)) {
                return datatables()->of([])->make(true);
            }
            $objekConn = DB::connection('ConnInventory')
                ->table('VW_PRG_SUBKEL')
                ->select('NamaObjek')
                ->where('IdDivisi', 'like', '%' . $idDivisi . '%')
                ->groupBy('NamaObjek')
                ->get();

            return datatables($objekConn)->make(true);
        } else if ($id === 'getIdObjek') {
            $idDivisi = $request->input('idDivisi');
            $namaObjek = $request->input('namaObjek');

            $idObjekConn = DB::connection('ConnInventory')
                ->table('VW_PRG_SUBKEL')
                ->select('*')
                ->where('NamaObjek', $namaObjek)
                ->where('IdDivisi', $idDivisi)
                ->get();

            return response()->json($idObjekConn);
        }

        // kel utama
        else if ($id === 'getKelUtama') {
            $idObjek = $request->input('idObjek');

            if (empty($idObjek)) {
                return datatables()->of([])->make(true);
            }

            $kelompokConn = DB::connection('ConnInventory')
                ->table('VW_PRG_SUBKEL')
                ->select('NamaKelompokUtama')
                ->where('IdObjek', 'like', '%' . $idObjek . '%')
                ->groupBy('NamaKelompokUtama')
                ->get();

            return datatables($kelompokConn)->make(true);
        } else if ($id === 'getIdKelUtama') {
            $namaKelUtama = $request->input('namaKelUtama');
            $idObjek = $request->input('idObjek');

            if (empty($namaKelUtama) || empty($idObjek)) {
                return datatables()->of([])->make(true);
            }

            $idKelompokConn = DB::connection('ConnInventory')
                ->table('VW_PRG_SUBKEL')
                ->select('*')
                ->where('NamaKelompokUtama', $namaKelUtama)
                ->where('IdObjek', $idObjek)
                ->get();

            return response()->json($idKelompokConn);
        }

        // getLaporan1
        else if ($id == 'getLaporan1') {
            $tanggal1 = $request->input('tanggal1');
            $tanggal2 = $request->input('tanggal2');
            $idObjek = $request->input('IdObjek');

            $laporan1Conn = DB::connection('ConnInventory')->select('exec SP_Laporan1
            @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?', [$tanggal1, $tanggal2, $idObjek]);

            $laporan1Arr = [];
            foreach ($laporan1Conn as $listLaporan1) {
                $laporan1Arr[] = [
                    'Objek' => trim($listLaporan1->Objek),
                    'KelompokUtama' => trim($listLaporan1->KelompokUtama),
                    'Kelompok' => trim($listLaporan1->Kelompok),
                    'SubKelompok' => trim($listLaporan1->SubKelompok),
                    'Type' => trim($listLaporan1->Type),
                    'SaldoAwalPrimer' => trim($listLaporan1->SaldoAwalPrimer),
                    'SaldoAwalSekunder' => trim($listLaporan1->SaldoAwalSekunder),
                    'SaldoAwalTritier' => trim($listLaporan1->SaldoAwalTritier),
                    'PemasukanPrimer' => trim($listLaporan1->PemasukanPrimer),
                    'PemasukanSekunder' => trim($listLaporan1->PemasukanSekunder),
                    'PemasukanTritier' => trim($listLaporan1->PemasukanTritier),
                    'PengeluaranPrimer' => trim($listLaporan1->PengeluaranPrimer),
                    'PengeluaranSekunder' => trim($listLaporan1->PengeluaranSekunder),
                    'PengeluaranTritier' => trim($listLaporan1->PengeluaranTritier),
                    'SaldoAkhirPrimer' => trim($listLaporan1->SaldoAkhirPrimer),
                    'SaldoAkhirSekunder' => trim($listLaporan1->SaldoAkhirSekunder),
                    'SaldoAkhirTritier' => trim($listLaporan1->SaldoAkhirTritier),
                    'KodeBarang' => trim($listLaporan1->KodeBarang),
                ];
            }

            dd($laporan1Conn);
            return response()->json($laporan1Arr);
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
