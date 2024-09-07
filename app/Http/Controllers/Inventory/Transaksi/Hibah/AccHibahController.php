<?php

namespace App\Http\Controllers\Inventory\Transaksi\Hibah;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccHibahController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Transaksi.Hibah.AccHibah', compact('access'));
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

        if ($id === 'getDivisi') {
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_UserDivisi_Diminta @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi,
                    'kodeUser' => $detail_divisi->kodeUser
                ];
            }
            return datatables($divisi)->make(true);
        }

        // data yang belum diacc
        else if ($id === 'belumAcc') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_BelumACC_TmpTransaksi
            @kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?', [12, '13', $XIdDivisi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'UraianDetailTransaksi' => $detail_divisi->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPemberi' => $detail_divisi->IdPemberi,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                ];
            }
            return response()->json($data_divisi);
        }

        // data yang udah diacc
        else if ($id === 'sudahAcc') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_SudahACC_TmpTransaksi
            @kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?', [5, '13', $XIdDivisi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'UraianDetailTransaksi' => $detail_divisi->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPemberi' => $detail_divisi->IdPemberi,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                    'KomfirmasiPemberi' => $detail_divisi->KomfirmasiPemberi,
                ];
            }
            return response()->json($data_divisi);
        }

        // data yang udah diacc
        else if ($id === 'getDetailData') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_TujuanSubKelompok_TmpTransaksi
            @XIdTransaksi = ?', [$XIdTransaksi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Satuan_Primer' => $detail_divisi->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_divisi->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_divisi->Satuan_Tritier,
                ];
            }
            return response()->json($data_divisi);
        }
    }

    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $user = Auth::user()->NomorUser;

        if ($id === 'accHibah') {
            $YIdTransaksi = $request->input('YIdTransaksi');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_PROSES_ACC_HIBAH]
        @kode = ?, @UserACC = ?, @YIdTransaksi = ?',
                        [
                            1, $user, $YIdTransaksi,
                        ]
                    );

                return response()->json(['success' => 'Data berhasil diACC'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diACC: ' . $e->getMessage()], 500);
            }
        }

        if ($id === 'batalAccHibah') {
            $YIdTransaksi = $request->input('YIdTransaksi');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_Batal_AccManager_TmpTransaksi]
        @kode = ?, @YIdTransaksi = ?',
                        [
                            4, $YIdTransaksi,
                        ]
                    );

                return response()->json(['success' => 'Data berhasil dibatalkan'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal dibatalkan: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        // \
    }
}
