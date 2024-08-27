<?php

namespace App\Http\Controllers\Inventory\Transaksi\Hibah;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PenerimaHibahController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Transaksi.Hibah.PenerimaHibah', compact('access'));
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
    public function show(Request $request, $id)
    {
        $user = Auth::user()->NomorUser;

        if ($id === 'getDivisi') {
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi,
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
        }

        // get list data
        else if ($id === 'getListTerima') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_Terima_Barang_Hibah
            @IDObjek = ?', [$request->input('IDObjek')]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'SaatAwalTransaksi' => $detail_objek->SaatAwalTransaksi,
                    'IdType' => $detail_objek->IdType,
                    'NamaType' => $detail_objek->NamaType,
                    'JumlahPemasukanPrimer' => $detail_objek->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_objek->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_objek->JumlahPemasukanTritier,
                    'IdTransaksi' => $detail_objek->IdTransaksi,
                    'IdPemberi' => $detail_objek->IdPemberi,
                    'NamaUser' => $detail_objek->NamaUser,
                    'UraianDetailtransaksi' => $detail_objek->UraianDetailtransaksi

                ];
            }
            return response()->json($data_objek);
        }

        // get list data detail
        else if ($id === 'getDetailData') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Detail_Transfer
            @IdTransaksi = ?', [$request->input('IdTransaksi')]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaKelompokUtama' => $detail_objek->NamaKelompokUtama,
                    'NamaKelompok' => $detail_objek->NamaKelompok,
                    'NamaSubKelompok' => $detail_objek->NamaSubKelompok,
                    'Primer' => $detail_objek->Primer,
                    'Sekunder' => $detail_objek->Sekunder,
                    'Tritier' => $detail_objek->Tritier,

                ];
            }
            return response()->json($data_objek);
        }

        // get list data detail
        else if ($id === 'cekPenyesuaian') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian_transaksi
            @idtype = ?, @idtypetransaksi = ?', [$request->input('idtype'), '06']);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'jumlah' => $detail_objek->jumlah,
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
        $user = Auth::user()->NomorUser;

        if ($id === 'terimaHibah') {
            $IdTransaksi = $request->input('IdTransaksi');
            $IdType = $request->input('IdType');
            $MasukPrimer = $request->input('MasukPrimer');
            $MasukSekunder = $request->input('MasukSekunder');
            $MasukTritier = $request->input('MasukTritier');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_PROSES_TERIMA_HIBAH] 
        @IdTransaksi = ?, @IdType = ?, @Penerima = ?, @MasukPrimer = ?, @MasukSekunder = ?, @MasukTritier = ?',
                        [
                            $IdTransaksi,
                            $IdType,
                            $user,
                            $MasukPrimer,
                            $MasukSekunder,
                            $MasukTritier,
                        ]
                    );

                return response()->json(['success' => 'Data berhasil diTerima'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diTerima: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        // 
    }
}
