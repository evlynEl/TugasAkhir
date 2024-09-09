<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccPemberiBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.AccPemberiBarang', compact('access'));
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

        // get user id
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

            // mendapatkan daftar objek
        } else if ($id === 'getObjek') {
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
        }

        // get acc
        else if ($id === 'getAcc') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_BelumACC_TmpTransaksi
            @Kode = ?, @XIdTypeTransaksi = ?, @XIdObjek = ?', [1, '02', $request->input('XIdObjek')]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'IdTransaksi' => $detail_objek->IdTransaksi,
                    'NamaType' => $detail_objek->NamaType,
                    'UraianDetailTransaksi' => $detail_objek->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_objek->NamaDivisi,
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok,
                    'user' => $detail_objek->NamaUser,
                    'JumlahPengeluaranPrimer' => $detail_objek->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_objek->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_objek->JumlahPengeluaranTritier,
                    'KomfirmasiPenerima' => $detail_objek->KomfirmasiPenerima,
                ];
            }
            return response()->json($data_objek);

        }

        // get batakl acc
        else if ($id === 'getBatalAcc') {
            $XIdObjek = $request->input('XIdObjek');
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_SudahACC_TmpTransaksi
            @Kode = ?, @XIdTypeTransaksi = ?, @XIdObjek = ?', [2, '02', $XIdObjek]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'IdTransaksi' => $detail_objek->IdTransaksi,
                    'NamaType' => $detail_objek->NamaType,
                    'UraianDetailTransaksi' => $detail_objek->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_objek->NamaDivisi,
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok,
                    'user' => $detail_objek->IdPenerima,
                    'JumlahPengeluaranPrimer' => $detail_objek->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_objek->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_objek->JumlahPengeluaranTritier,
                    'KomfirmasiPenerima' => $detail_objek->KomfirmasiPenerima,
                ];
            }
            return response()->json($data_objek);

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
        // 
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        // 
    }
}
