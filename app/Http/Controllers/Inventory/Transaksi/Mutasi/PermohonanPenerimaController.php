<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PermohonanPenerimaController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.PermohonanPenerima', compact('access'));
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
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $request->input('divisiId')]);
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
        }
        else if ($id === 'getSelect') {
            // mendapatkan saldo, satuan, pemasukan unk selected data table
            $kodeTransaksi = $request->input('kodeTransaksi');

            $selectData = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_selectData = [];
            foreach ($selectData as $detail_selectData) {
                $data_selectData[] = [
                    'NamaDivisi' => $detail_selectData->NamaDivisi,
                    'NamaObjek' => $detail_selectData->NamaObjek,
                    'NamaKelompokUtama' => $detail_selectData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_selectData->NamaKelompok,
                    'NamaSubKelompok' => $detail_selectData->NamaSubKelompok,
                    'Satuan_Primer' => $detail_selectData->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_selectData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_selectData->Satuan_Tritier,
                    'SaldoPrimer' => $detail_selectData->SaldoPrimer,
                    'SaldoSekunder' => $detail_selectData->SaldoSekunder,
                    'SaldoTritier' => $detail_selectData->SaldoTritier,
                ];
            }

            // dd($request->all(), $data_selectData);
            return response()->json($data_selectData);
        }

        // pemberi
        else if ($id === 'cekSesuaiPemberi') {
            $idtransaksi = $request->input('idtransaksi');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_check_penyesuaian_pemberi]
           @idtransaksi = ?, @idtypetransaksi = ?', [$idtransaksi, '06']);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jumlah' => $detail_divisi->jumlah,
                    'IdType' => $detail_divisi->IdType,
                ];
            }

            return response()->json($data_divisi);
        }

        // cek Penerima
        else if ($id === 'cekSesuaiPenerima') {
            $idtransaksi = $request->input('idtransaksi');
            $KodeBarang = $request->input('KodeBarang');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_check_penyesuaian_penerima]
           @idtransaksi = ?, @idtypetransaksi = ?, @KodeBarang = ?', [$idtransaksi, '06', $KodeBarang]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jumlah' => $detail_divisi->jumlah,
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
    public function update(Request $request, $id)
    {
        //    
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        //
    }
}
