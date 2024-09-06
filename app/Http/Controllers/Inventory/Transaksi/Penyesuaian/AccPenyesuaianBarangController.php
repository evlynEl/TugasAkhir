<?php

namespace App\Http\Controllers\Inventory\Transaksi\Penyesuaian;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class AccPenyesuaianBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Penyesuaian.AccPenyesuaianBarang', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;
        $kodeTransaksi = $request->input('kodeTransaksi');
        $divisiId = $request->input('divisiId');
        $YIdTrans = $request->input('YIdTrans');


        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        } else if ($id === 'getDivisi') {
            // mendapatkan daftar divisi
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi
                ];
            }
            return datatables($divisi)->make(true);
        }

        else if ($id === 'getSelect') {
            // mendapatkan saldo, satuan, pemasukan unk selected data table
            $selectData = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalSubKelompok_Transaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_selectData = [];
            foreach ($selectData as $detail_selectData) {
                $data_selectData[] = [
                    'SaldoPrimer' => $detail_selectData->SaldoPrimer,
                    'SaldoSekunder' => $detail_selectData->SaldoSekunder,
                    'SaldoTritier' => $detail_selectData->SaldoTritier,
                    'Satuan_Primer' => $detail_selectData->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_selectData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_selectData->Satuan_Tritier,
                    'JumlahPemasukanPrimer' => $detail_selectData->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_selectData->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_selectData->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_selectData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_selectData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_selectData->JumlahPengeluaranTritier,
                    'IdSubkelompok' => $detail_selectData->IdSubkelompok
                ];
            }

            foreach ($data_selectData as $key => $data) {
                // PRIMER
                if ($data['JumlahPemasukanPrimer'] > 0) {
                    $primer2 = $data['JumlahPemasukanPrimer'] + $data['SaldoPrimer'];
                } else {
                    $primer2 = $data['JumlahPemasukanPrimer'] + $data['SaldoPrimer'];
                }

                if ($data['JumlahPengeluaranPrimer'] > 0) {
                    $primer2 -= $data['JumlahPengeluaranPrimer'];
                } else {
                    $primer2 += $data['JumlahPengeluaranPrimer'];
                }

                $data_selectData[$key]['SaldoPrimer2'] = $primer2;

                // SEKUNDER
                if ($data['JumlahPemasukanSekunder'] > 0) {
                    $sekunder2 = $data['JumlahPemasukanSekunder'] + $data['SaldoSekunder'];
                } else {
                    $sekunder2 = $data['JumlahPemasukanSekunder'] + $data['SaldoSekunder'];
                }

                if ($data['JumlahPengeluaranSekunder'] > 0) {
                    $sekunder2 -= $data['JumlahPengeluaranSekunder'];
                } else {
                    $sekunder2 += $data['JumlahPengeluaranSekunder'];
                }

                $data_selectData[$key]['SaldoSekunder2'] = $sekunder2;

                // TRITIER
                if ($data['JumlahPemasukanTritier'] > 0) {
                    $tritier2 = $data['JumlahPemasukanTritier'] + $data['SaldoTritier'];
                } else {
                    $tritier2 = $data['JumlahPemasukanTritier'] + $data['SaldoTritier'];
                }

                if ($data['JumlahPengeluaranTritier'] > 0) {
                    $tritier2 -= $data['JumlahPengeluaranTritier'];
                } else {
                    $tritier2 += $data['JumlahPengeluaranTritier'];
                }

                $data_selectData[$key]['SaldoTritier2'] = round($tritier2, 2);
            }

            // dd($request->all(), $data_selectData);
            return response()->json($data_selectData);
        }

        else if ($id === 'getData') {
            // menampilkan pemohon data di data table
            $justData = DB::connection('ConnInventory')->select('
            exec SP_1003_INV_BelumACC_Sesuai_Transaksi @XIdDivisi = ?, @XIdTypeTransaksi = ?', [$divisiId, '06']);
            $data_justData = [];
            foreach ($justData as $detail_justData) {
                $formattedDate = date('m/d/Y', strtotime($detail_justData->SaatAwalTransaksi));

                $data_justData[] = [
                    'IdTransaksi' => $detail_justData->IdTransaksi,
                    'NamaType' => $detail_justData->NamaType,
                    'UraianDetailTransaksi' => $detail_justData->UraianDetailTransaksi,
                    'NamaUser' => $detail_justData->NamaUser,
                    'SaatAwalTransaksi' => $formattedDate,
                    'NamaDivisi' => $detail_justData->NamaDivisi,
                    'NamaObjek' => $detail_justData->NamaObjek,
                    'NamaKelompokUtama' => $detail_justData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_justData->NamaKelompok,
                    'NamaSubKelompok' => $detail_justData->NamaSubKelompok,
                    'IdPenerima' => $detail_justData->IdPenerima
                ];
            }
            // dd($data_justData, $request->all());
            return response()->json($data_justData);
        }

        else if ($id === 'cekData') {
            // menampilkan pemohon data di data table
            $cekData = DB::connection('ConnInventory')->select('
            exec SP_1003_INV_IdTransaksi_Transaksi @XIdTransaksi = ?', [$YIdTrans]);
            $data_cekData = [];
            foreach ($cekData as $detail_cekData) {
                $formattedDate = date('m/d/Y', strtotime($detail_cekData->SaatAwalTransaksi));

                $data_cekData[] = [
                    'IdType' => $detail_cekData->IdType,
                    'KodeBarang' => $detail_cekData->KodeBarang,
                    'TujuanIdSubkelompok' => $detail_cekData->TujuanIdSubkelompok,
                    'JumlahPemasukanPrimer' => $detail_cekData->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_cekData->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_cekData->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_cekData->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_cekData->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_cekData->JumlahPengeluaranTritier
                ];
            }
            // dd($data_cekData);
            return response()->json($data_cekData);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        if ($id === 'proses') {
            $YIdTrans = $request->input('YIdTrans');
            $setuju = $request->input('setuju');
            $YIdType = $request->input('YIdType');
            $inPrimer = $request->input('inPrimer');
            $inSekunder = $request->input('inSekunder');
            $inTritier = $request->input('inTritier');
            $outPrimer = $request->input('outPrimer');
            $outSekunder = $request->input('outSekunder');
            $outTritier = $request->input('outTritier');

            // dd($request->all());

            try {
                // insert
                DB::connection('ConnInventory')->statement(
                    'exec SP_1003_INV_Proses_ACC_Penyesuaian
                    @IdTransaksi = ?, @UserACC = ?, @IdType = ?,  @MasukPrimer = ?, @MasukSekunder = ?,
                    @MasukTritier = ?, @KeluarPrimer = ?, @KeluarSekunder = ?, @KeluarTritier = ?',
                    [$YIdTrans, $setuju, $YIdType, $inPrimer, $inSekunder,
                    $inTritier, $outPrimer, $outSekunder, $outTritier]
                );


                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Kd.Transaksi: ' .trim($YIdTrans). 'TDK DPT diACC, krn Kd.Type tidak ada pada sub kelompok tersebut!' .$e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
