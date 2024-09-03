<?php

namespace App\Http\Controllers\Inventory\Transaksi\Konversi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccKonversiBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Konversi.AccKonversiBarang', compact('access'));
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

        // transaksi awal
        else if ($id === 'getTransaksiAwal') {
            $XKdDivisi = $request->input('XKdDivisi');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_List_Konversi_TmpTransaksi]
           @XKdDivisi = ?', [$XKdDivisi]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Tanggal' => $detail_divisi->Tanggal,
                    'UraianDetailTransaksi' => $detail_divisi->UraianDetailTransaksi,
                    'JumlahPengeluaranPrimer' => $detail_divisi->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_divisi->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_divisi->JumlahPengeluaranTritier,
                    'IdObjek' => $detail_divisi->IdObjek,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'IdKelompokUtama' => $detail_divisi->IdKelompokUtama,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'IdKelompok' => $detail_divisi->IdKelompok,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'IdSubkelompok' => $detail_divisi->IdSubkelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdType' => $detail_divisi->IdType,
                    'NamaType' => $detail_divisi->NamaType,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'IdKonversi' => $detail_divisi->IdKonversi,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,

                ];
            }
            return response()->json($data_divisi);
        }

        // get data list konversi
        else if ($id === 'getKodeKonversi') {
            $XIdDivisi = $request->input('XIdDivisi');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_ListIdKonversi_TmpTransaksi]
           @XIdDivisi = ?', [$XIdDivisi]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdKonversi' => $detail_divisi->IdKonversi,
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
