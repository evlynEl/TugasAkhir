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
                        // DB::connection('ConnInventory')->statement('EXEC SP_Laporan1 @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?', [$tanggal1, $tanggal2, $idObjek]);

                        // hapus laporan
                        DB::connection('ConnInventory')->table('laporan')->delete();

                        // fetch
                        $data = DB::connection('ConnInventory')->table('VW_PRG_TYPE')
                            ->join('VW_PRG_SUBKEL', 'VW_PRG_TYPE.IdSubkelompok_Type', '=', 'VW_PRG_SUBKEL.IdSubkelompok')
                            ->select(
                                'VW_PRG_SUBKEL.NamaObjek',
                                'VW_PRG_SUBKEL.NamaKelompokUtama',
                                'VW_PRG_SUBKEL.NamaKelompok',
                                'VW_PRG_SUBKEL.NamaSubKelompok',
                                'VW_PRG_TYPE.NamaType',
                                'VW_PRG_TYPE.IdType',
                                'VW_PRG_TYPE.KodeBarang'
                            )
                            ->where('VW_PRG_SUBKEL.IdObjek', $idObjek)
                            ->groupBy(
                                'VW_PRG_SUBKEL.NamaObjek',
                                'VW_PRG_SUBKEL.NamaKelompokUtama',
                                'VW_PRG_SUBKEL.NamaKelompok',
                                'VW_PRG_SUBKEL.NamaSubKelompok',
                                'VW_PRG_TYPE.NamaType',
                                'VW_PRG_TYPE.IdType',
                                'VW_PRG_TYPE.KodeBarang'
                            )
                            ->orderBy('VW_PRG_SUBKEL.NamaKelompokUtama')
                            ->orderBy('VW_PRG_SUBKEL.NamaKelompok')
                            ->orderBy('VW_PRG_SUBKEL.NamaSubKelompok')
                            ->orderBy('VW_PRG_TYPE.NamaType')
                            ->get();
                    } else {
                        // DB::connection('ConnInventory')->statement('EXEC SP_1273_INV_LaporanStok @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?, @IdKelUtama = ?', [$tanggal1, $tanggal2, $idObjek, $idKelUtama]);

                        // hapus laporan
                        DB::connection('ConnInventory')->table('laporan')->delete();

                        // fetch
                        $data = DB::connection('ConnInventory')->table('VW_PRG_TYPE')
                            ->join('VW_PRG_SUBKEL', 'VW_PRG_TYPE.IdSubkelompok_Type', '=', 'VW_PRG_SUBKEL.IdSubkelompok')
                            ->select(
                                'VW_PRG_SUBKEL.NamaObjek',
                                'VW_PRG_SUBKEL.NamaKelompokUtama',
                                'VW_PRG_SUBKEL.NamaKelompok',
                                'VW_PRG_SUBKEL.NamaSubKelompok',
                                'VW_PRG_TYPE.NamaType',
                                'VW_PRG_TYPE.IdType',
                                'VW_PRG_TYPE.KodeBarang'
                            )
                            ->where('VW_PRG_SUBKEL.IdObjek', $idObjek)
                            ->where('VW_PRG_SUBKEL.IdKelompokUtama', $idKelUtama)
                            ->groupBy(
                                'VW_PRG_SUBKEL.NamaObjek',
                                'VW_PRG_SUBKEL.NamaKelompokUtama',
                                'VW_PRG_SUBKEL.NamaKelompok',
                                'VW_PRG_SUBKEL.NamaSubKelompok',
                                'VW_PRG_TYPE.NamaType',
                                'VW_PRG_TYPE.IdType',
                                'VW_PRG_TYPE.KodeBarang'
                            )
                            ->orderBy('VW_PRG_SUBKEL.NamaKelompokUtama')
                            ->orderBy('VW_PRG_SUBKEL.NamaKelompok')
                            ->orderBy('VW_PRG_SUBKEL.NamaSubKelompok')
                            ->orderBy('VW_PRG_TYPE.NamaType')
                            ->get();
                    }

                    foreach ($data as $row) {
                        $NmObjek = $row->NamaObjek;
                        $NmKelut = $row->NamaKelompokUtama;
                        $NmKel = $row->NamaKelompok;
                        $NmSubKel = $row->NamaSubKelompok;
                        $NamaType = $row->NamaType;
                        $Idtype = $row->IdType;
                        $KodeBarang = $row->KodeBarang;

                        // Inisialisasi variabel
                        $AwalPrimer = $AwalSekunder = $AwalTritier = 0;
                        $MasukPrimer = $MasukSekunder = $MasukTritier = 0;
                        $KeluarPrimer = $KeluarSekunder = $KeluarTritier = 0;
                        $AkhirPrimer = $AkhirSekunder = $AkhirTritier = 0;

                        $maxIdTrans = DB::connection('ConnInventory')
                            ->table('VW_PRG_TRANSAKSI as a')
                            ->select(DB::raw('MAX(IdTransaksi) as MaxIdTrans'))
                            ->whereExists(function ($query) use ($tanggal1, $Idtype) {
                                $query->select('IdType')
                                    ->from('VW_PRG_TRANSAKSI')
                                    ->whereColumn('a.Saatlog', '<=', DB::raw("DATEADD(day, -1, '{$tanggal1}')"))
                                    ->where('a.IdType', $Idtype);
                            })
                            ->groupBy('a.IdType')
                            ->first();

                        // cari saldo awal
                        if ($maxIdTrans) {
                            $maxIdTransValue = $maxIdTrans->MaxIdTrans;

                            $awalSaldo = DB::connection('ConnInventory')
                                ->table('VW_PRG_TRANSAKSI')
                                ->select('SaldoPrimer', 'SaldoSekunder', 'SaldoTritier')
                                ->where('IdTransaksi', $maxIdTransValue)
                                ->first();

                            $AwalPrimer = $awalSaldo->SaldoPrimer;
                            $AwalSekunder = $awalSaldo->SaldoSekunder;
                            $AwalTritier = $awalSaldo->SaldoTritier;
                        }

                        // kalau saldo awal tritier == 0
                        if ($AwalTritier == 0) {
                            $cariStok = DB::connection('ConnInventory')
                                ->table('dbo.T_Saldo_Awal_Gudang')
                                ->select('SaldoPrimer', 'SaldoSekunder', 'saldoTritier')
                                ->where('IDType', $Idtype)
                                ->first();

                            // kalau ada yg null, jadikan 0
                            $AwalPrimer = $cariStok->SaldoPrimer ?? 0;
                            $AwalSekunder = $cariStok->SaldoSekunder ?? 0;
                            $AwalTritier = $cariStok->SaldoTritier ?? 0;
                        }

                        // cari masuk keluar
                        $cariKeluarMasuk = DB::connection('ConnInventory')
                            ->table('VW_PRG_TRANSAKSI')
                            ->select(
                                DB::raw('SUM(jumlahpemasukanPrimer) as jumlahpemasukanPrimer'),
                                DB::raw('SUM(jumlahpemasukanSekunder) as jumlahpemasukanSekunder'),
                                DB::raw('SUM(jumlahpemasukanTritier) as jumlahpemasukanTritier'),
                                DB::raw('SUM(jumlahpengeluaranPrimer) as jumlahpengeluaranPrimer'),
                                DB::raw('SUM(jumlahpengeluaranSekunder) as jumlahpengeluaranSekunder'),
                                DB::raw('SUM(jumlahpengeluaranTritier) as jumlahpengeluaranTritier')
                            )
                            ->where('idtype', $Idtype)
                            ->whereBetween('saatlog', [$tanggal1, $tanggal2])
                            ->first();

                        // Extract the results and handle null values
                        $MasukPrimer = $cariKeluarMasuk->jumlahpemasukanPrimer ?? 0;
                        $MasukSekunder = $cariKeluarMasuk->jumlahpemasukanSekunder ?? 0;
                        $MasukTritier = $cariKeluarMasuk->jumlahpemasukanTritier ?? 0;
                        $KeluarPrimer = $cariKeluarMasuk->jumlahpengeluaranPrimer ?? 0;
                        $KeluarSekunder = $cariKeluarMasuk->jumlahpengeluaranSekunder ?? 0;
                        $KeluarTritier = $cariKeluarMasuk->jumlahpengeluaranTritier ?? 0;

                        $AkhirPrimer = $AwalPrimer + $MasukPrimer - $KeluarPrimer;
                        $AkhirSekunder = $AwalSekunder + $MasukSekunder - $KeluarSekunder;
                        $AkhirTritier = $AwalTritier + $MasukTritier - $KeluarTritier;

                        if (
                            !($AwalPrimer == 0 && $AwalSekunder == 0 && $AwalTritier == 0 &&
                                $MasukPrimer == 0 && $MasukSekunder == 0 && $MasukTritier == 0 &&
                                $KeluarPrimer == 0 && $KeluarSekunder == 0 && $KeluarTritier == 0)
                        ) {
                            // Insert the record into the 'laporan' table
                            DB::connection('ConnInventory')->table('laporan')->insert([
                                'Objek' => $NmObjek,
                                'KelompokUtama' => $NmKelut,
                                'Kelompok' => $NmKel,
                                'SubKelompok' => $NmSubKel,
                                'IdType' => $Idtype,
                                'Type' => $NamaType,
                                'SaldoAwalPrimer' => $AwalPrimer,
                                'SaldoAwalSekunder' => $AwalSekunder,
                                'SaldoAwalTritier' => $AwalTritier,
                                'PemasukanPrimer' => $MasukPrimer,
                                'PemasukanSekunder' => $MasukSekunder,
                                'PemasukanTritier' => $MasukTritier,
                                'PengeluaranPrimer' => $KeluarPrimer,
                                'PengeluaranSekunder' => $KeluarSekunder,
                                'PengeluaranTritier' => $KeluarTritier,
                                'SaldoAkhirPrimer' => $AkhirPrimer,
                                'SaldoAkhirSekunder' => $AkhirSekunder,
                                'SaldoAkhirTritier' => $AkhirTritier,
                                'KodeBarang' => $KodeBarang
                            ]);
                        }
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
