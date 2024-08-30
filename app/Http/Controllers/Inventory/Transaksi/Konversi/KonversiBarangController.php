<?php

namespace App\Http\Controllers\Inventory\Transaksi\Konversi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class KonversiBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Konversi.KonversiBarang', compact('access'));
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

        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        // get divisi
        else if ($id === 'getDivisi') {
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi,
                    'KodeUser' => $detail_divisi->KodeUser
                ];
            }
            return datatables($divisi)->make(true);
        }

        // objek
        else if ($id === 'getObjek') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $request->input('divisi')]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek,
                    'IdDivisi' => $detail_objek->IdDivisi
                ];
            }
            return datatables($objek)->make(true);

            // mendapatkan daftar kelompok utama
        } else if ($id === 'getKelUt') {
            $kelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$request->input('objekId')]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);

            // mendapatkan daftar kelompok
        } else if ($id === 'getKelompok') {
            $kelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$request->input('kelutId')]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);

            // mendapatkan daftar sub kelompok
        } else if ($id === 'getSubkel') {
            $XIdKelompok_SubKelompok = $request->input('kelompokId');

            $XIdKelompok_SubKelompok = $XIdKelompok_SubKelompok ?? '0';

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$XIdKelompok_SubKelompok]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        // ambil kode type
        else if ($id === 'getIdType') {
            $XIdSubKelompok_Type = $request->input('XIdSubKelompok_Type');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type
            @XIdSubKelompok_Type = ?'
                ,
                [$XIdSubKelompok_Type]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                    'IdType' => $detail_subkel->IdType
                ];
            }
            return datatables($subkel)->make(true);
        }

        // saldo
        else if ($id === 'getSaldo') {
            $IdType = $request->input('IdType');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_Saldo_Barang]
           @IdType = ?', [$IdType]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'SaldoPrimer' => $detail_divisi->SaldoPrimer,
                    'SaldoSekunder' => $detail_divisi->SaldoSekunder,
                    'SaldoTritier' => $detail_divisi->SaldoTritier,
                    'SatPrimer' => $detail_divisi->SatPrimer,
                    'SatSekunder' => $detail_divisi->SatSekunder,
                    'SatTritier' => $detail_divisi->SatTritier,
                ];
            }

            return response()->json($data_divisi);
        }

        // saldo
        else if ($id === 'getJumlahAntrian') {
            $IdType = $request->input('IdType');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_List_JmlAntrian_TmpTransaksi]
           @kode = ?, @IdType = ?', [1, $IdType]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'OutPrimer' => $detail_divisi->OutPrimer,
                    'OutSekunder' => $detail_divisi->OutSekunder,
                    'OutTritier' => $detail_divisi->OutTritier,
                ];
            }

            return response()->json($data_divisi);
        }

        // get kode konversi
        else if ($id === 'loadDataKonversi') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_ListIdKonversi_TmpTransaksi
            @XIdDivisi = ?', [$XIdDivisi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'SaatTransaksi' => $detail_divisi->SaatTransaksi,
                ];
            }
            return response()->json($data_divisi);
        }

        // get data asal
        else if ($id === 'loadAllDataAsal') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalKonv_BlmACC_TmpTransaksi
            @XIdDivisi = ?', [$XIdDivisi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'IdType' => $detail_divisi->IdType,
                ];
            }
            return response()->json($data_divisi);
        }

        // get data tujuan
        else if ($id === 'loadAllDataTujuan') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_TujKonv_BlmACC_TmpTransaksi
            @XIdDivisi = ?', [$XIdDivisi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'IdType' => $detail_divisi->IdType,
                ];
            }
            return response()->json($data_divisi);
        }

        // get data asal
        else if ($id === 'loadDataAsal') {
            $XIdDivisi = $request->input('XIdDivisi');
            $IdKonversi = $request->input('IdKonversi');

            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalKonv1_BlmACC_TmpTransaksi
            @XIdDivisi = ?, @IdKonversi = ?', [$XIdDivisi, $IdKonversi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'IdType' => $detail_divisi->IdType,
                ];
            }
            return response()->json($data_divisi);
        }

        // get data tujuan
        else if ($id === 'loadDataTujuan') {
            $XIdDivisi = $request->input('XIdDivisi');
            $IdKonversi = $request->input('IdKonversi');

            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_TujKonv1_BlmACC_TmpTransaksi
            @XIdDivisi = ?, @IdKonversi = ?', [$XIdDivisi, $IdKonversi]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdPenerima' => $detail_divisi->IdPenerima,
                    'IdType' => $detail_divisi->IdType,
                ];
            }
            return response()->json($data_divisi);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        // 
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        // 
    }
}
