<?php

namespace App\Http\Controllers\Inventory\Transaksi\Penyesuaian;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class PenyesuaianBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Penyesuaian.PenyesuaianBarang', compact('access'));
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
        $divisiId = $request->input('divisiId');
        $objekId = $request->input('objekId');
        $kelompokId = $request->input('kelompokId');
        $kelutId = $request->input('kelutId');
        $subkelId = $request->input('subkelId');

        $tanggal = $request->input('tanggal');
        $pemohon = $request->input('pemohon');
        $kodeTransaksi = $request->input('kodeTransaksi');
        $kodeType = $request->input('kodeType');
        $alasan = $request->input('alasan');
        $uraian = trim($alasan) === null ? '' : trim($alasan);

        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        else if ($id === 'getDivisi') {
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

        else if ($id === 'getObjek') {
            // mendapatkan daftar objek
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $divisiId]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek
                ];
            }
            // dd($objek, $request->all());
            return datatables($objek)->make(true);
        }

        else if ($id === 'getKelUt') {
            // mendapatkan daftar kelompok utama
            $kelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$objekId]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);
        }

        else if ($id === 'getKelompok') {
            // mendapatkan daftar kelompok
            $kelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$kelutId]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);
        }

        else if ($id === 'getSubkel') {
            // mendapatkan daftar sub kelompok
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$kelompokId]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
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
        $a = (int)$request->input('a');

        if ($id === 'proses') {
            // proses terjadi
            if ($a === 1) { // ISI
                try{
                    // insert ke tmp transaksi unk di tampilkan di table
                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_Insert_05_TmpTransaksi
                        @XIdTypeTransaksi = ?, @XIdType = ?,  @XIdPenerima = ?, @XIdPemberi = ?, @XSaatawalTransaksi = ?,
                        @XJumlahPengeluaranPrimer = ?, @XJumlahPengeluaranSekunder = ?, @XJumlahPengeluaranTritier = ?,
                        @XAsalIdSubKelompok = ?, @XTujuanIdSubKelompok = ?, @XUraianDetailTransaksi = ?, @kd = 1',
                        []
                    );
                    // dd($request->all());
                    return response()->json(['success' => 'Data inserted successfully'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data insert failed' . $e->getMessage()], 500);
                }
            } else if ($a === 2) { // KOREKSI
                try {
                    // update
                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_update_TmpTransaksi
                        @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?,
                        @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanSubKelompok = ?',
                        []
                    );
                    // dd($request->all());
                    return response()->json(['success' => 'Data updated successfully'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data update failed' . $e->getMessage()], 500);
                }
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_TmpTransaksi  @XIdTransaksi = ?', [
                $data['IdTransaksi']
            ]);

        return redirect()->route('MaxMinStok.index')->with('alert', 'Data berhasil dihapus!');

        $kodeTransaksi = $request->input('kodeTransaksi');
        if ($id === 'hapusBarang') {
            try {
                DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_TmpTransaksi  @XIdTransaksi = ?', [$kodeTransaksi]);

                return response()->json(['success' => 'Data sudah diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
