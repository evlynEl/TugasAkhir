<?php

namespace App\Http\Controllers\Laporan;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class LaporanStokController extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('LaporanStok'); //tidak perlu menu di navbar
        // dd($access);
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
        // set_time_limit(300);
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
                    $hapus = DB::connection('ConnInventory')->statement('EXEC [SP_LAPORANSTOK_EXECUTE] @kode = 1, @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?', [$tanggal1, $tanggal2, $idObjek]);

                    if (empty($idKelUtama)) {
                        // pakai sp sendiri
                        $data = DB::connection('ConnInventory')->select('EXEC [SP_LAPORANSTOK_EXECUTE] @kode = 2, @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?', [$tanggal1, $tanggal2, $idObjek]);
                    } else {
                        $data = DB::connection('ConnInventory')->select('EXEC [SP_LAPORANSTOK_KEL_UTAMA] @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?, @IdKelUtama = ?', [$tanggal1, $tanggal2, $idObjek, $idKelUtama]);
                    }

                    $arrID = [];
                    $arrAll = [];

                    foreach ($data as $row) {

                        // pakai query
                        $NmObjek = $row->NamaObjek;
                        $NmKelut = $row->NamaKelompokUtama;
                        $NmKel = $row->NamaKelompok;
                        $NmSubKel = $row->NamaSubKelompok;
                        $NamaType = $row->NamaType;
                        $Idtype = $row->IdType;
                        $KodeBarang = $row->KodeBarang;

                        array_push($arrID, $Idtype);
                        $arrAll[] = [
                            'NmObjek' => $NmObjek,
                            'NmKelut' => $NmKelut,
                            'NmKel' => $NmKel,
                            'NmSubKel' => $NmSubKel,
                            'NamaType' => $NamaType,
                            'Idtype' => $Idtype,
                            'KodeBarang' => $KodeBarang
                        ];

                    }

                    // dd(count($arrAll));

                    $idChunks = array_chunk($arrAll, 100);
                    foreach ($idChunks as $chunk) {
                        $IdTypeString = implode(',', array_column($chunk, 'Idtype'));

                        $dataUang = DB::connection('ConnInventory')->select('EXEC [SP_LAPORANSTOK_SELECT]
                    @kode = 1, @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?, @IdType = ?',
                            [$tanggal1, $tanggal2, $idObjek, $IdTypeString]
                        );

                        $dataUangMap = [];
                        foreach ($dataUang as $row) {
                            $dataUangMap[$row->idtype] = [
                                'AwalPrimer' => $row->SaldoPrimer,
                                'AwalSekunder' => $row->SaldoSekunder,
                                'AwalTritier' => $row->saldoTritier,
                            ];
                        }

                        // dd($dataUangMap);

                        $allArrayWithSaldo = [];
                        foreach ($chunk as $data) {
                            $IdType = $data['Idtype'];
                            $saldoData = isset($dataUangMap[$IdType]) ? $dataUangMap[$IdType] : [
                                'AwalPrimer' => null,
                                'AwalSekunder' => null,
                                'AwalTritier' => null
                            ];

                            $allArrayWithSaldo[] = array_merge($data, $saldoData);
                        }

                        // dd($allArrayWithSaldo);

                        $arrayFilterAwalTritierNol = [];

                        foreach ($allArrayWithSaldo as $item) {
                            if ($item['AwalTritier'] === null) {
                                $arrayFilterAwalTritierNol[] = $item['Idtype'];
                            }
                        }

                        // dd($arrayFilterAwalTritierNol);
                        $arrayFilterAwalTritierNol = implode(',', $arrayFilterAwalTritierNol);

                        $dataUangAwalTritier = DB::connection('ConnInventory')->select('EXEC [SP_LAPORANSTOK_SELECT]
                    @kode = 2, @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?, @IdType = ?',
                            [$tanggal1, $tanggal2, $idObjek, $arrayFilterAwalTritierNol]
                        );

                        // dd($dataUangAwalTritier);
                        $dataUangAwalTritierMap = [];
                        foreach ($dataUangAwalTritier as $row) {
                            $dataUangAwalTritierMap[$row->idtype] = [
                                'AwalPrimer' => $row->SaldoPrimer,
                                'AwalSekunder' => $row->SaldoSekunder,
                                'AwalTritier' => $row->SaldoTritier
                            ];
                        }

                        // dd($dataUangAwalTritier);

                        $arrayFilterAwalTritierNolArray = explode(',', $arrayFilterAwalTritierNol);
                        $arrayFilterAwalTritierNolArray = array_filter($arrayFilterAwalTritierNolArray);

                        $allArrayWithSaldoUpdated = [];

                        foreach ($allArrayWithSaldo as $item) {
                            if (isset($dataUangAwalTritierMap[$item['Idtype']])) {
                                $item = array_merge($item, $dataUangAwalTritierMap[$item['Idtype']]);
                            }
                            $allArrayWithSaldoUpdated[] = $item;
                        }

                        // dd($allArrayWithSaldoUpdated);

                        // Ensure default values for saldo fields
                        foreach ($allArrayWithSaldoUpdated as $item) {
                            $item['AwalPrimer'] = isset($item['AwalPrimer']) ? $item['AwalPrimer'] : 0;
                            $item['AwalSekunder'] = isset($item['AwalSekunder']) ? $item['AwalSekunder'] : 0;
                            $item['AwalTritier'] = isset($item['AwalTritier']) ? $item['AwalTritier'] : 0;
                 
                        }

                        // dd($allArrayWithSaldoUpdated);

                        // $idTypeFilterSaldo1 = implode(',', $idTypeFilterSaldo1);

                        $dataSaldoKeluarMasuk = DB::connection('ConnInventory')->select('EXEC [SP_LAPORANSTOK_SELECT]
                    @kode = 3, @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?, @IdType = ?',
                            [$tanggal1, $tanggal2, $idObjek, $IdTypeString]
                        );

                        dd($dataSaldoKeluarMasuk);

                        $dataSaldoMap = [];
                        foreach ($dataSaldoKeluarMasuk as $row) {
                            $dataSaldoMap[$row->idtype] = [
                                'MasukPrimer' => $row->jumlahpemasukanPrimer,
                                'MasukSekunder' => $row->jumlahpemasukanSekunder,
                                'MasukTritier' => $row->jumlahpemasukanTritier,
                                'KeluarPrimer' => $row->jumlahpengeluaranPrimer,
                                'KeluarSekunder' => $row->jumlahpengeluaranSekunder,
                                'KeluarTritier' => $row->jumlahpengeluaranTritier
                            ];
                        }

                        // dd($dataSaldoMap);


                        $allArrayFinal = [];
                        foreach ($allArrayWithSaldoUpdated as $data) {
                            $Idtype = $data['Idtype'];

                            // Default saldo values if Idtype is not found in $dataSaldoMap
                            $defaultSaldoData = [
                                'MasukPrimer' => 0,
                                'MasukSekunder' => 0,
                                'MasukTritier' => 0,
                                'KeluarPrimer' => 0,
                                'KeluarSekunder' => 0,
                                'KeluarTritier' => 0
                            ];

                            // Merge the default saldo data with the data from $dataSaldoMap if available
                            $saldoData = isset($dataSaldoMap[$Idtype]) ? $dataSaldoMap[$Idtype] : $defaultSaldoData;

                            $allArrayFinal[] = array_merge($data, $saldoData);
                        }

                        // dd($allArrayFinal);

                        $allArrayFinalWithSaldo = [];
                        foreach ($allArrayFinal as $data) {
                            $Idtype = $data['Idtype'];

                            // Initialize variables for Awal, Masuk, and Keluar values
                            $AwalPrimer = isset($data['AwalPrimer']) ? (float) $data['AwalPrimer'] : 0.00;
                            $AwalSekunder = isset($data['AwalSekunder']) ? (float) $data['AwalSekunder'] : 0.00;
                            $AwalTritier = isset($data['AwalTritier']) ? (float) $data['AwalTritier'] : 0.00;

                            $MasukPrimer = isset($data['MasukPrimer']) ? (float) $data['MasukPrimer'] : 0.00;
                            $MasukSekunder = isset($data['MasukSekunder']) ? (float) $data['MasukSekunder'] : 0.00;
                            $MasukTritier = isset($data['MasukTritier']) ? (float) $data['MasukTritier'] : 0.00;

                            $KeluarPrimer = isset($data['KeluarPrimer']) ? (float) $data['KeluarPrimer'] : 0.00;
                            $KeluarSekunder = isset($data['KeluarSekunder']) ? (float) $data['KeluarSekunder'] : 0.00;
                            $KeluarTritier = isset($data['KeluarTritier']) ? (float) $data['KeluarTritier'] : 0.00;

                            // Calculate Saldo Akhir
                            $SaldoAkhirPrimer = $AwalPrimer + $MasukPrimer - $KeluarPrimer;
                            $SaldoAkhirSekunder = $AwalSekunder + $MasukSekunder - $KeluarSekunder;
                            $SaldoAkhirTritier = $AwalTritier + $MasukTritier - $KeluarTritier;

                            // Add the new SaldoAkhir values to the data array
                            $data['SaldoAkhirPrimer'] = number_format($SaldoAkhirPrimer, 2, '.', '');
                            $data['SaldoAkhirSekunder'] = number_format($SaldoAkhirSekunder, 2, '.', '');
                            $data['SaldoAkhirTritier'] = number_format($SaldoAkhirTritier, 2, '.', '');

                            // Add this data to the final array
                            $allArrayFinalWithSaldo[] = $data;
                        }

                        // dd($allArrayFinalWithSaldo);

                        foreach ($allArrayFinalWithSaldo as $data) {
                            // Check if any of the values are non-zero
                            if (
                                !(
                                    $data['AwalPrimer'] == 0 &&
                                    $data['AwalSekunder'] == 0 &&
                                    $data['AwalTritier'] == 0 &&
                                    $data['MasukPrimer'] == 0 &&
                                    $data['MasukSekunder'] == 0 &&
                                    $data['MasukTritier'] == 0 &&
                                    $data['KeluarPrimer'] == 0 &&
                                    $data['KeluarSekunder'] == 0 &&
                                    $data['KeluarTritier'] == 0
                                )
                            ) {
                                // If the condition is met, insert the data into the database
                                DB::connection('ConnInventory')->table('laporan')->insert([
                                    'Objek' => $data['NmObjek'],
                                    'KelompokUtama' => $data['NmKelut'],
                                    'Kelompok' => $data['NmKel'],
                                    'SubKelompok' => $data['NmSubKel'],
                                    'IdType' => $data['Idtype'],
                                    'Type' => $data['NamaType'],
                                    'SaldoAwalPrimer' => $data['AwalPrimer'],
                                    'SaldoAwalSekunder' => $data['AwalSekunder'],
                                    'SaldoAwalTritier' => $data['AwalTritier'],
                                    'PemasukanPrimer' => $data['MasukPrimer'],
                                    'PemasukanSekunder' => $data['MasukSekunder'],
                                    'PemasukanTritier' => $data['MasukTritier'],
                                    'PengeluaranPrimer' => $data['KeluarPrimer'],
                                    'PengeluaranSekunder' => $data['KeluarSekunder'],
                                    'PengeluaranTritier' => $data['KeluarTritier'],
                                    'SaldoAkhirPrimer' => $data['SaldoAkhirPrimer'],
                                    'SaldoAkhirSekunder' => $data['SaldoAkhirSekunder'],
                                    'SaldoAkhirTritier' => $data['SaldoAkhirTritier'],
                                    'KodeBarang' => $data['KodeBarang']
                                ]);
                            }
                        }
                    }
                    // dd($allArrayFinalWithSaldo);

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

            // DB::connection('ConnInventory')->beginTransaction();
            DB::transaction(function () use ($tanggal1, $tanggal2, $IdObjek, $IdType) {

                DB::connection('ConnInventory')->table('laporan1')->delete();

                // fetch
                $result = DB::connection('ConnInventory')
                    ->table('dbo.VW_PRG_TYPE')
                    ->join('dbo.VW_PRG_SUBKEL', 'dbo.VW_PRG_TYPE.IdSubkelompok_Type', '=', 'dbo.VW_PRG_SUBKEL.IdSubkelompok')
                    ->join('dbo.VW_PRG_Transaksi', 'dbo.VW_PRG_Transaksi.IdType', '=', 'dbo.VW_PRG_TYPE.IdType')
                    ->join('dbo.TypeTransaksi', 'dbo.TypeTransaksi.IdTypeTransaksi', '=', 'dbo.VW_PRG_Transaksi.IdTypeTransaksi')
                    ->select(
                        'dbo.VW_PRG_SUBKEL.NamaObjek',
                        'dbo.VW_PRG_SUBKEL.NamaKelompokUtama',
                        'dbo.VW_PRG_SUBKEL.NamaKelompok',
                        'dbo.VW_PRG_SUBKEL.NamaSubKelompok',
                        'dbo.VW_PRG_TYPE.NamaType',
                        'dbo.VW_PRG_Transaksi.IdType',
                        'dbo.VW_PRG_Transaksi.IdTypeTransaksi',
                        'dbo.TypeTransaksi.TypeTransaksi'
                    )
                    ->where('dbo.VW_PRG_SUBKEL.IdObjek', $IdObjek)
                    ->where('dbo.VW_PRG_TYPE.IdType', $IdType)
                    ->groupBy(
                        'dbo.VW_PRG_SUBKEL.NamaObjek',
                        'dbo.VW_PRG_SUBKEL.NamaKelompokUtama',
                        'dbo.VW_PRG_SUBKEL.NamaKelompok',
                        'dbo.VW_PRG_SUBKEL.NamaSubKelompok',
                        'dbo.VW_PRG_TYPE.NamaType',
                        'dbo.VW_PRG_Transaksi.IdType',
                        'dbo.VW_PRG_Transaksi.IdTypeTransaksi',
                        'dbo.TypeTransaksi.TypeTransaksi'
                    )
                    ->orderBy('dbo.VW_PRG_SUBKEL.NamaKelompokUtama')
                    ->orderBy('dbo.VW_PRG_SUBKEL.NamaKelompok')
                    ->orderBy('dbo.VW_PRG_SUBKEL.NamaSubKelompok')
                    ->orderBy('dbo.VW_PRG_TYPE.NamaType')
                    ->orderBy('dbo.TypeTransaksi.TypeTransaksi')
                    ->get();

                // dd($result);

                foreach ($result as $row) {
                    $NmObjek = $row->NamaObjek;
                    $NmKelut = $row->NamaKelompokUtama;
                    $NmKel = $row->NamaKelompok;
                    $NmSubKel = $row->NamaSubKelompok;
                    $NamaType = $row->NamaType;
                    $Idtype = $row->IdType;
                    $IdTypeTransaksi = $row->IdTypeTransaksi;
                    $TypeTransaksi = $row->TypeTransaksi;

                    $MasukPrimer = $MasukSekunder = $MasukTritier = 0;
                    $KeluarPrimer = $KeluarSekunder = $KeluarTritier = 0;

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
                        ->where('IdTypeTransaksi', $IdTypeTransaksi)
                        ->whereBetween('saatlog', [$tanggal1, $tanggal2])
                        ->first();

                    // Extract the results and handle null values
                    $MasukPrimer = $cariKeluarMasuk->jumlahpemasukanPrimer ?? 0;
                    $MasukSekunder = $cariKeluarMasuk->jumlahpemasukanSekunder ?? 0;
                    $MasukTritier = $cariKeluarMasuk->jumlahpemasukanTritier ?? 0;
                    $KeluarPrimer = $cariKeluarMasuk->jumlahpengeluaranPrimer ?? 0;
                    $KeluarSekunder = $cariKeluarMasuk->jumlahpengeluaranSekunder ?? 0;
                    $KeluarTritier = $cariKeluarMasuk->jumlahpengeluaranTritier ?? 0;

                    if (
                        !($MasukPrimer == 0 && $MasukSekunder == 0 && $MasukTritier == 0 &&
                            $KeluarPrimer == 0 && $KeluarSekunder == 0 && $KeluarTritier == 0)
                    ) {
                        $data = [
                            'Objek' => $NmObjek,
                            'KelompokUtama' => $NmKelut,
                            'Kelompok' => $NmKel,
                            'SubKelompok' => $NmSubKel,
                            'Type' => $NamaType,
                            'TypeTransaksi' => $TypeTransaksi,
                            'PemasukanPrimer' => $MasukPrimer,
                            'PemasukanSekunder' => $MasukSekunder,
                            'PemasukanTritier' => $MasukTritier,
                            'PengeluaranPrimer' => $KeluarPrimer,
                            'PengeluaranSekunder' => $KeluarSekunder,
                            'PengeluaranTritier' => $KeluarTritier,
                        ];

                        DB::connection('ConnInventory')->table('Laporan1')->insert($data);
                    }
                }

            });
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
