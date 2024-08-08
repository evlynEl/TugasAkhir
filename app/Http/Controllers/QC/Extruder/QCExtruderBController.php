<?php

namespace App\Http\Controllers\QC\Extruder;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class QCExtruderBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        return view('QC.Extruder.ExtruderB', compact('access'));
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

        // ambil data by nomor transaksi
        else if ($id == 'getDisplayDataByNoTr') {
            $noTr = $request->input('noTr');

            $listDataTransaksi = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_DATAMASTERQC @kode = ?, @noTr = ?', [2, $noTr]);
            $dataTransaksiArr = [];
            foreach ($listDataTransaksi as $dataTransaksi) {
                $dataTransaksiArr[] = [
                    'JamInput' => $dataTransaksi->JamInput,
                    'Shift' => $dataTransaksi->Shift,
                    'JamAwalShift' => $dataTransaksi->JamAwalShift,
                    'JamAkhirShift' => $dataTransaksi->JamAkhirShift,
                    'Mesin' => $dataTransaksi->Mesin,
                    'TypeMesin' => $dataTransaksi->TypeMesin,
                    'SpekBenang' => $dataTransaksi->SpekBenang,
                    'IdKonv' => $dataTransaksi->IdKonv,
                    'Keterangan' => $dataTransaksi->Keterangan,
                    'DenierRata' => $dataTransaksi->DenierRata,
                ];
            }
            return response()->json($dataTransaksiArr);
        }

        // ambil id mesin
        else if ($id == 'getIdMesin') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');

            $listIdMesin = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?, @tgl = ?, @Shift = ?, @Divisi = ?', [1, $tgl, $Shift, "MEX"]);
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
                        5,
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
                @type = ?', [6, $tgl, $shift, $nama, $benang, $type]);
            $quantityBahanBakuArr = [];
            foreach ($quantityBahanBakuConn as $listQuantity) {
                $quantityBahanBakuArr[] = [
                    'Quantity' => $listQuantity->JumlahTritier,
                    // 'Prosentase' => $listQuantity->Persentase,
                    // 'StatusType' => $listQuantity->StatusType,
                    // 'NamaKelompok' => $listQuantity->NamaKelompok
                ];
            }
            return response()->json($quantityBahanBakuArr);
        }

        // selain bahan baku, ambil data
        else if (
            $id == 'getCalpetCaco3' || $id == 'getMasterBath' || $id == 'getUv' || $id == 'getAntiStatic' || $id == 'getPeletan' ||
            $id == 'getAdditif'
        ) {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $nama = $request->input('nama');
            $benang = $request->input('benang');

            // kalau buat table
            switch ($id) {
                case 'getCalpetCaco3':
                    $kelompok = 'Calpet';
                    $kelompok1 = 'CACO3';
                    break;

                case 'getMasterBath':
                    $kelompok1 = '';
                    $kelompok = 'Masterbath';
                    break;

                case 'getUv':
                    $kelompok1 = '';
                    $kelompok = 'UV';
                    break;

                case 'getAntiStatic':
                    $kelompok1 = '';
                    $kelompok = 'Anti Static';
                    break;

                case 'getPeletan':
                    $kelompok1 = '';
                    $kelompok = 'Pelletan';
                    break;

                case 'getAdditif':
                    $kelompok1 = '';
                    $kelompok = 'Additif';
                    break;
            }

            $merkConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_BAHAN_KONV
                @kode = ?,
                @tgl = ?,
                @shift = ?,
                @nama = ?,
                @benang = ?,
                @kelompok = ?,
                @kelompok1 = ?',
                    [
                        7,
                        $tgl,
                        $shift,
                        $nama,
                        $benang,
                        $kelompok,
                        $kelompok1
                    ]
                );
            $merkArr = [];
            foreach ($merkConn as $listMerk) {
                $merkArr[] = [
                    'Merk' => $listMerk->Merk,
                    'IdType' => $listMerk->IdType,
                ];
            }
            return datatables($merkArr)->make(true);
        }

        // kalau cari quantity dan prosen
        else if (
            $id == 'getCalpetCaco3Quantity' || $id == 'getMasterBathQuantity' || $id == 'getUvQuantity' || $id == 'getAntiStaticQuantity' ||
            $id == 'getPeletanQuantity' || $id == 'getAdditifQuantity'
        ) {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $nama = $request->input('nama');
            $benang = $request->input('benang');
            $type = $request->input('type');

            switch ($id) {
                case 'getCalpetCaco3Quantity':
                    $kelompok = 'Calpet';
                    $kelompok1 = 'CACO3';
                    break;

                case 'getMasterBathQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Masterbath';
                    break;

                case 'getUvQuantity':
                    $kelompok1 = '';
                    $kelompok = 'UV';
                    break;

                case 'getAntiStaticQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Anti Static';
                    break;

                case 'getPeletanQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Pelletan';
                    break;

                case 'getAdditifQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Additif';
                    break;
            }

            $qtyConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_BAHAN_KONV @kode = ?,
                @tgl = ?,
                @shift = ?,
                @nama = ?,
                @benang = ?,
                @kelompok = ?,
                @kelompok1 = ?,
                @type = ?',
                    [
                        8,
                        $tgl,
                        $shift,
                        $nama,
                        $benang,
                        $kelompok,
                        $kelompok1,
                        $type
                    ]
                );

            $qtyArr = [];
            foreach ($qtyConn as $listQuantity) {
                $qtyArr[] = [
                    'Quantity' => $listQuantity->JumlahTritier,
                    'Prosentase' => $listQuantity->Persentase,
                    // 'StatusType' => $listQuantity->StatusType,
                    // 'NamaKelompok' => $listQuantity->NamaKelompok,
                    'Merk' => $listQuantity->Merk
                ];
            }
            return response()->json($qtyArr);
        }

        // ambil data id transaksi
        else if ($id == 'getIdTransaksi') {

            $idTransaksiConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_INSERT_MASTERQC @kode = ?', [1]);

            $idTransaksiArr = [];
            foreach ($idTransaksiConn as $listIdTransaksi) {
                $idTransaksiArr[] = [
                    'sNomer' => $listIdTransaksi->sNomer,
                ];
            }
            return response()->json($idTransaksiArr);
        }

        // list bahan baku display data
        else if ($id == 'getListBahanBaku') {
            $noTr = $request->input('noTr');
            $idKonv = $request->input('idKonv');

            try {
                $bahanBakuConn = DB::connection('ConnExtruder')
                    ->select('exec SP_5298_QC_BAHAN_BAKU @kd = ?, @noTr = ?, @IdKonv = ?', [1, $noTr, $idKonv]);

                // dd($bahanBakuConn);

                $bahanBakuArr = [];
                foreach ($bahanBakuConn as $listBahanBaku) {
                    $bahanBakuArr[] = [
                        'IdBahan' => trim($listBahanBaku->IdBahan),
                        'NamaType' => trim($listBahanBaku->NamaType),
                        'Jenis' => trim($listBahanBaku->Jenis),
                        'NamaKelompok' => trim($listBahanBaku->NamaKelompok),
                        'Jml' => trim($listBahanBaku->Jml),
                        'Prosen' => trim($listBahanBaku->Prosen),
                    ];
                }
                return response()->json($bahanBakuArr);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }


        // list DetailData additional
        else if ($id == 'getListDetailData') {
            $noTr = $request->input('noTr');

            $detailAdditionalConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_DATADETAILQC @noTr = ?', [$noTr]);

            $detailAdditionalArr = [];
            foreach ($detailAdditionalConn as $listDetailAdditional) {
                $detailAdditionalArr[] = [
                    'LebarBng' => trim($listDetailAdditional->LebarBng),
                    'Denier' => trim($listDetailAdditional->Denier),
                    'Strength' => trim($listDetailAdditional->Strength),
                    'Elongation' => trim($listDetailAdditional->Elongation),
                    'KetStr' => trim($listDetailAdditional->KetStr),
                ];
            }
            return response()->json($detailAdditionalArr);
        }


    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($id == 'insertDataGeneral') {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $mesin = $request->input('mesin');

            $benang = $request->input('benang');
            $denierrata = $request->input('denierrata');
            $user = Auth::user()->NomorUser;
            $user = trim($user);
            $ket = $request->input('ket');
            $idKonv = $request->input('idKonv');

            $tanggal = date('Y-m-d');

            $jam = $request->input('jam');
            $jamDate = $tanggal . ' ' . $jam;

            $awal = $request->input('awal');
            $akhir = $request->input('akhir');

            $awalDatetimeString = $tanggal . ' ' . $awal;
            $akhirDatetimeString = $tanggal . ' ' . $akhir;

            $awalDatetime = new DateTime($awalDatetimeString);
            $akhirDatetime = new DateTime($akhirDatetimeString);

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_INSERT_MASTERQC]
        @Kode = ?,
        @jam = ?,
        @tgl = ?,
        @shift = ?,
        @mesin = ?,
        @awal = ?,
        @akhir = ?,
        @benang = ?,
        @denierrata = ?,
        @user = ?,
        @ket = ?,
        @idKonv = ?',
                        [
                            0,
                            $jamDate,
                            $tgl,
                            $shift,
                            $mesin,
                            $awalDatetime,
                            $akhirDatetime,
                            $benang,
                            $denierrata,
                            $user,
                            $ket,
                            $idKonv,
                        ]
                    );

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // insert data komposisi
        // Insert Komposisi Data
        else if ($id == 'insertDataKomposisi') {
            $noTr = $request->input('noTr');
            $dataArray = $request->input('dataArray');

            try {
                foreach ($dataArray as $data) {
                    $idType = $data[0];
                    $tipeBahan = $data[2];
                    $persentase = $data[4];

                    switch ($tipeBahan) {
                        case 'Bahan Baku':
                            $spString = 'SP_5298_QC_INSERT_BB';
                            DB::connection('ConnExtruder')
                                ->statement(
                                    "exec [$spString]
                                    @noTr = ?,
                                    @idBahan = ?",
                                    [
                                        $noTr,
                                        $idType,
                                    ]
                                );
                            break;
                        case 'CaCo3':
                            $spString = 'SP_5298_QC_INSERT_CALPET';
                            $spId = '@idCalpet';
                            $spName = '@Calpet';
                            break;
                        case 'Masterbath':
                            $spString = 'SP_5298_QC_INSERT_MB';
                            $spId = '@idMB';
                            $spName = '@MB';
                            break;
                        case 'UV':
                            $spString = 'SP_5298_QC_INSERT_UV';
                            $spId = '@idUV';
                            $spName = '@UV';
                            break;
                        case 'Anti Static':
                            $spString = 'SP_5298_QC_INSERT_AS';
                            $spId = '@idAS';
                            $spName = '@AS';
                            break;
                        case 'Peletan':
                            $spString = 'SP_5298_QC_INSERT_PELETAN';
                            $spId = '@idPeletan';
                            $spName = '@Peletan';
                            break;
                        case 'Additif':
                            $spString = 'SP_5298_QC_INSERT_ADDITIF';
                            $spId = '@idAdditif';
                            $spName = '@Additif';
                            break;
                        default:
                            break;
                    }

                    if ($spString !== 'SP_5298_QC_INSERT_BB' && $spId && $spName) {
                        DB::connection('ConnExtruder')
                            ->statement(
                                "exec [$spString]
                                @noTr = ?,
                                $spId = ?,
                                $spName = ?",
                                [
                                    $noTr,
                                    $idType,
                                    $persentase
                                ]
                            );
                    }
                }

                return response()->json(['success' => 'Data berhasil disimpan.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

        // Insert Additional Data
        else if ($id == 'insertAdditionalData') {
            $noTr = $request->input('noTr');
            $dataArray = $request->input('dataArray');

            try {
                foreach ($dataArray as $data) {
                    $lebar = $data[0];
                    $denier = $data[1];
                    $strength = $data[2];
                    $elgn = $data[3];
                    $ketS = $data[4];

                    DB::connection('ConnExtruder')
                        ->statement('exec [SP_5298_QC_INSERT_DETAILQC]
                    @noTr = ?,
                    @lebar = ?,
                    @denier = ?,
                    @strength = ?,
                    @elgn = ?,
                    @ketS = ?',
                            [
                                $noTr,
                                $lebar,
                                $denier,
                                $strength,
                                $elgn,
                                $ketS
                            ]
                        );
                }

                return response()->json(['success' => 'Data berhasil disimpan.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

        // update nomor counter by id trx
        else if ($id == 'updateCounter') {
            $noTr = $request->input('noTr');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_UPDATE_MASTERQC]
                        @kode = ?,
                        @noTr = ?',
                        [
                            2,
                            $noTr,
                        ]
                    );

                return response()->json(['success' => 'Data berhasil disimpan.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Gagal menyimpan data: ' . $e->getMessage()], 500);
            }
        }

        // update data general
        else if ($id == 'updateGeneralData') {
            $noTr = $request->input('noTr');
            $denierRata = $request->input('denierrata');
            $keterangan = $request->input('ket');
            $shift = $request->input('shift');
            $mesin = $request->input('mesin');
            $spekBenang = $request->input('bng');
            $idKonv = $request->input('idKonv');

            $jamInput = $request->input('jam');
            $tanggal = date('Y-m-d');
            $jamInputDatetime = $tanggal . ' ' . $jamInput;

            $shiftAwal = $request->input('awal');
            $shiftAkhir = $request->input('akhir');

            $tanggal = date('Y-m-d');

            $shiftAwalDatetime = $tanggal . ' ' . $shiftAwal;
            $shiftAkhirDatetime = $tanggal . ' ' . $shiftAkhir;

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_UPDATE_MASTERQC]
        @kode = ?,
        @noTr = ?,
        @denierrata = ?,
        @ket = ?,
        @shift = ?,
        @mesin = ?,
        @awal = ?,
        @akhir = ?,
        @bng = ?,
        @jam = ?,
        @idKonv = ?',
                        [
                            1,
                            $noTr,
                            $denierRata,
                            $keterangan,
                            $shift,
                            $mesin,
                            $shiftAwalDatetime,
                            $shiftAkhirDatetime,
                            $spekBenang,
                            $jamInputDatetime,
                            $idKonv,
                        ]
                    );

                return response()->json(['success' => 'Data berhasil diKOREKSI.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Gagal KOREKSI data: ' . $e->getMessage()], 500);
            }
        }


    }

    public function destroy($id, Request $request)
    {
        if ($id == 'deleteDetail') {
            $noTr = $request->input('noTr');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_DELETE_DETAILQC] @noTr = ?', [
                        $noTr,
                    ]);
                return response()->json(['success' => 'Data successfully deleted.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to delete data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'deleteBahan') {
            $noTr = $request->input('noTr');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_DELETE_BAHAN_BAKU] @noTr = ?', [
                        $noTr,
                    ]);
                return response()->json(['success' => 'Data successfully deleted.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to delete data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'deleteMaster') {
            $noTr = $request->input('noTr');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_DELETE_MASTERQC] @noTr = ?', [
                        $noTr,
                    ]);
                return response()->json(['success' => 'Data successfully deleted.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to delete data: ' . $e->getMessage()], 500);
            }
        }


    }
}
