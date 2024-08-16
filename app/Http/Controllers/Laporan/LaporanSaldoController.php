<?php

namespace App\Http\Controllers\Laporan;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;
use Log;

class LaporanSaldoController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('LaporanSaldo'); //tidak perlu menu di navbar
        return view('Laporan.LaporanSaldo', compact('access'));
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
        set_time_limit(300);
        // divisi
        if ($id === 'getDivisi') {
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            $divisiConn = DB::connection('ConnInventory')
                ->select('exec SP_1003_INV_UserDivisi @XKdUser = ?', [$UserInput]);
            $divisiArr = [];
            foreach ($divisiConn as $divisiList) {
                $divisiArr[] = [
                    'NamaDivisi' => $divisiList->NamaDivisi,
                    'IdDivisi' => $divisiList->IdDivisi,
                ];
            }
            return datatables($divisiArr)->make(true);
        }

        // objek
        else if ($id === 'getObjek') {
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);
            $divisi = $request->input('divisi');

            $objekConn = DB::connection('ConnInventory')
                ->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$UserInput, $divisi]);
            $objekArr = [];
            foreach ($objekConn as $objekList) {
                $objekArr[] = [
                    'NamaObjek' => $objekList->NamaObjek,
                    'Objek' => $objekList->IdObjek,
                ];
            }
            return datatables($objekArr)->make(true);

            // proses
        } else if ($id === 'prosesLaporanACC') {
            $idObjek = $request->input('idObjek');
            $tanggal1 = $request->input('tanggal1');
            $tanggal2 = $request->input('tanggal2');
            $sw = 0;

            try {
                $ArrLaporan = DB::transaction(function () use ($tanggal1, $tanggal2, $idObjek, $sw) {
                    // delete table
                    DB::connection('ConnInventory')->statement(
                        'exec [SP_LAPORAN_SALDO_COBA] @kode = 1, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?',
                        [$idObjek, $tanggal1, $tanggal2]
                    );

                    // insert ke Lap_Acc
                    if ($sw === 0) {
                        DB::connection('ConnInventory')->statement(
                            'exec [SP_LAPORAN_SALDO_COBA] @kode = 2, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?',
                            [$idObjek, $tanggal1, $tanggal2]
                        );
                    }

                    // select data tergantung IdObjek
                    $data = DB::connection('ConnInventory')->select(
                        'exec [SP_LAPORAN_SALDO_COBA] @kode = 3, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?',
                        [$idObjek, $tanggal1, $tanggal2]
                    );

                    // dd($data);

                    // dd($data);
                    $arrAll = [];
                    $arrID = [];

                    foreach ($data as $row) {
                        $Divisi = $row->NamaDivisi;
                        $Objek = $row->NamaObjek;
                        $KelompokUtama = $row->NamaKelompokUtama;
                        $Kelompok = $row->NamaKelompok;
                        $SubKelompok = $row->NamaSubKelompok;
                        $type = $row->Namatype;
                        $KodeBarang = $row->KodeBarang;
                        $Idtype = $row->Idtype;

                        array_push($arrID, $Idtype);
                        $arrAll[] = [
                            'Divisi' => $Divisi,
                            'Objek' => $Objek,
                            'KelompokUtama' => $KelompokUtama,
                            'Kelompok' => $Kelompok,
                            'SubKelompok' => $SubKelompok,
                            'Type' => $type,
                            'KodeBarang' => $KodeBarang,
                            'Idtype' => $Idtype,
                        ];
                        // dd($data);
                    }

                    // dd(count($arrAll));

                    $idChunks = array_chunk($arrAll, 100);
                    // dd($idChunks);


                    foreach ($idChunks as $chunk) {
                        $ids = implode(',', array_column($chunk, 'Idtype'));
                        // dd($ids);

                        $prosesSaldo = DB::connection('ConnInventory')->select(
                            'exec [SP_LAP_SALDO_EXECUTE]
                            @kode = 1, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?, @IdType = ?',
                            [$idObjek, $tanggal1, $tanggal2, '00000000000001119469']
                        );

                        // dd($prosesSaldo);

                        // get awal dari $prosesSaldo
                        $dataUangMap = [];
                        $dataid = [];
                        foreach ($prosesSaldo as $row) {
                            $dataUangMap[$row->IdType] = [
                                'AwalPrimer' => $row->SaldoPrimer,
                                'AwalSekunder' => $row->SaldoSekunder,
                                'AwalTritier' => $row->saldoTritier,
                            ];
                            $dataid[] = $row->IdType;
                        }
                        // dd($dataUangMap);

                        // set nilai kalau null pd awalan
                        $allArrayWithSaldo = [];
                        foreach ($chunk as $data) {
                            $IdType = $data['Idtype'];
                            $saldoData = isset($dataUangMap[$IdType]) ? $dataUangMap[$IdType] : [
                                'AwalPrimer' => 0,
                                'AwalSekunder' => 0,
                                'AwalTritier' => 0
                            ];

                            $allArrayWithSaldo[] = array_merge($data, $saldoData);
                        }
                        // dd($allArrayWithSaldo);

                        $ids2 = implode(',', $dataid);

                        // dd(count($arrAll));

                        $saldoKeluarMasuk = DB::connection('ConnInventory')->select(
                            'exec [SP_LAP_SALDO_EXECUTE]
                            @kode = 2, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?, @IdType = ?',
                            [$idObjek, $tanggal1, $tanggal2, $ids]
                        );

                        // foreach ($allArrayWithSaldo as $item) {
                        //     if (isset($item['Idtype']) && $item['Idtype'] === '00000000000001119469') {
                        //         dd($item);
                        //     }
                        // }

                        // dd($saldoKeluarMasuk);

                        // $targetId = '00000000000001119469';
                        // $found = false;

                        // foreach ($saldoKeluarMasuk as $row) {
                        //     if ($row->IdType === $targetId) {
                        //         dd($row);
                        //     }
                        // }

                        $dataSaldoMap = [];
                        foreach ($saldoKeluarMasuk as $row) {
                            $dataSaldoMap[$row->IdType] = [
                                'MasukPrimer' => $row->MasukPrimer,
                                'MasukSekunder' => $row->MasukSekunder,
                                'MasukTritier' => $row->MasukTritier,
                                'KeluarPrimer' => $row->KeluarPrimer,
                                'KeluarSekunder' => $row->KeluarSekunder,
                                'KeluarTritier' => $row->KeluarTritier
                            ];
                        }
                        // dd($dataSaldoMap);

                        $allArrayFinal = [];
                        foreach ($allArrayWithSaldo as $data) {
                            $Idtype = $data['Idtype'];
// --------------------------------------------------------------------------------------------------------------
                            // Merge the default saldo data with the data from $dataSaldoMap if available
                            $saldoData = isset($dataSaldoMap[$Idtype]) ? $dataSaldoMap[$Idtype] : [
                                'MasukPrimer' => 0.00,
                                'MasukSekunder' => 0.00,
                                'MasukTritier' => 0.00,
                                'KeluarPrimer' => 0.00,
                                'KeluarSekunder' => 0.00,
                                'KeluarTritier' => 0.00
                            ];

                            // $allArrayFinal[] = array_merge($data, $saldoData);
                        }

                        dd($saldoKeluarMasuk, $allArrayWithSaldo);

                        $targetId = '00000000000001119469';
                        foreach ($allArrayFinal as $row) {
                            if ($row->Idtype === $targetId) {
                                dd($row);
                            }
                        }
                        // dd($allArrayFinal);

                        $allArrayFinalWithSaldo = [];
                        foreach ($allArrayFinal as $data) {
                            $IdType = $data['Idtype'];

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



                        dd($allArrayFinalWithSaldo);

                        foreach ($allArrayFinalWithSaldo as $data) {
                            if (
                                !(
                                    $data['AwalPrimer'] == 0.00 &&
                                    $data['AwalSekunder'] == 0.00 &&
                                    $data['AwalTritier'] == 0.00 &&
                                    $data['MasukPrimer'] == 0.00 &&
                                    $data['MasukSekunder'] == 0.00 &&
                                    $data['MasukTritier'] == 0.00 &&
                                    $data['KeluarPrimer'] == 0.00 &&
                                    $data['KeluarSekunder'] == 0.00 &&
                                    $data['KeluarTritier'] == 0.00
                                )
                            ) {
                                DB::connection('ConnInventory')->table('Lap_Acc')->insert([
                                    'Divisi' => $data['Divisi'],
                                    'Objek' => $data['Objek'],
                                    'KelompokUtama' => $data['KelompokUtama'],
                                    'Kelompok' => $data['Kelompok'],
                                    'SubKelompok' => $data['SubKelompok'],
                                    'Type' => $data['Type'],
                                    'KodeBarang' => $data['KodeBarang'],
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
                                ]);
                            }
                        }
                    }


                    // Fetch data from Lap_ACC
                    $Lap_Acc = DB::connection('ConnInventory')->select(
                        'SELECT Divisi, Objek, KelompokUtama, Kelompok, SubKelompok, Type,
                        KodeBarang, SaldoAwalPrimer, SaldoAwalSekunder, SaldoAwalTritier,
                        PemasukanPrimer, PemasukanSekunder, PemasukanTritier,
                        PengeluaranPrimer, PengeluaranSekunder, PengeluaranTritier,
                        SaldoAkhirPrimer, SaldoAkhirSekunder, SaldoAkhirTritier
                    FROM Lap_ACC'
                    );

                    // Process and format the data
                    $ArrLaporan = [];
                    foreach ($Lap_Acc as $listLaporan) {
                        $ArrLaporan[] = [
                            'Divisi' => trim($listLaporan->Divisi),
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

                    return $ArrLaporan;
                });

                return response()->json($ArrLaporan);
            } catch (\Exception $e) {
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
