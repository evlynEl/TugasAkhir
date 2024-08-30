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
