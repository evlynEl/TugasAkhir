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
            $idKelUtama = $request->input('IdKelUtama');

            try {
                $laporan1Arr = DB::transaction(function () use ($tanggal1, $tanggal2, $idObjek, $idKelUtama) {
                    if (empty($idKelUtama)) {
                        DB::connection('ConnInventory')->statement('EXEC SP_Laporan1 @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?', [$tanggal1, $tanggal2, $idObjek]);
                    } else {
                        DB::connection('ConnInventory')->statement('EXEC SP_1273_INV_LaporanStok @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?, @IdKelUtama = ?', [$tanggal1, $tanggal2, $idObjek, $idKelUtama]);
                    }

                    // Fetch data from VW_Laporan
                    $vwLaporanData = DB::connection('ConnInventory')->select(
                        'SELECT Objek, KelompokUtama, Kelompok, SubKelompok, Type
                        , SaldoAwalPrimer, SaldoAwalSekunder, SaldoAwalTritier
                    , PemasukanPrimer, PemasukanSekunder, PemasukanTritier
                    , PengeluaranPrimer, PengeluaranSekunder, PengeluaranTritier
                    , SaldoAkhirPrimer, SaldoAkhirSekunder, SaldoAkhirTritier
                    , KodeBarang FROM VW_Laporan'
                    );

                    // Process and format the data
                    $laporan1Arr = [];
                    foreach ($vwLaporanData as $listLaporan) {
                        $laporan1Arr[] = [
                            'Objek' => trim($listLaporan->Objek),
                            'KelompokUtama' => trim($listLaporan->KelompokUtama),
                            'Kelompok' => trim($listLaporan->Kelompok),
                            'SubKelompok' => trim($listLaporan->SubKelompok),
                            'Type' => trim($listLaporan->Type),
                            'SaldoAwalPrimer' => trim($listLaporan->SaldoAwalPrimer),
                            'SaldoAwalSekunder' => trim($listLaporan->SaldoAwalSekunder),
                            'SaldoAwalTritier' => trim($listLaporan->SaldoAwalTritier),
                            'PemasukanPrimer' => trim($listLaporan->PemasukanPrimer),
                            'PemasukanSekunder' => trim($listLaporan->PemasukanSekunder),
                            'PemasukanTritier' => trim($listLaporan->PemasukanTritier),
                            'PengeluaranPrimer' => trim($listLaporan->PengeluaranPrimer),
                            'PengeluaranSekunder' => trim($listLaporan->PengeluaranSekunder),
                            'PengeluaranTritier' => trim($listLaporan->PengeluaranTritier),
                            'SaldoAkhirPrimer' => trim($listLaporan->SaldoAkhirPrimer),
                            'SaldoAkhirSekunder' => trim($listLaporan->SaldoAkhirSekunder),
                            'SaldoAkhirTritier' => trim($listLaporan->SaldoAkhirTritier),
                            'KodeBarang' => trim($listLaporan->KodeBarang),
                        ];
                    }

                    return $laporan1Arr;
                });

                return response()->json($laporan1Arr);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

        // detail data
        else if ($id === 'getDetailData') {
            $idObjek = $request->input('idObjek');

            if (empty($idObjek)) {
                return datatables()->of([])->make(true);
            }

            // Execute the query
            $detailData = DB::connection('ConnInventory')
                ->table('VW_Laporan1')
                ->select(
                    'TypeTransaksi'
                    ,
                    'PemasukanPrimer',
                    'PemasukanSekunder',
                    'PemasukanTritier'
                    ,
                    'PengeluaranPrimer',
                    'PengeluaranSekunder',
                    'PengeluaranTritier'
                )
                ->get();

            // Return the data as DataTables response
            return datatables($detailData)->make(true);
        }

        // get type
        else if ($id === 'getType') {
            $namaType = $request->input('namaType');


            if (empty($namaType)) {
                return datatables()->of([])->make(true);
            }

            $idTypeConn = DB::connection('ConnInventory')
                ->table('VW_Laporan')
                ->where('Type', $namaType)
                ->get();

            return response()->json($idTypeConn);
        }

        // transaction lapporan 2
        else if ($id === 'getLaporan2') {
            $tanggal1 = $request->input('tanggal1');
            $tanggal2 = $request->input('tanggal2');
            $IdObjek = $request->input('IdObjek');
            $IdType = $request->input('IdType');

            DB::connection('ConnInventory')->beginTransaction();

            try {
                $result = DB::connection('ConnInventory')->select('EXEC Sp_Laporan2
                    @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?, @IdType = ?', [
                    $tanggal1,
                    $tanggal2,
                    $IdObjek,
                    $IdType
                ]);

                DB::connection('ConnInventory')->commit();

                return response()->json($result);
            } catch (\Exception $e) {
                DB::connection('ConnInventory')->rollBack();

                return response()->json(['error' => $e->getMessage()], 500);
            }
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
