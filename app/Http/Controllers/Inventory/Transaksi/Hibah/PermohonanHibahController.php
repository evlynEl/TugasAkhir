<?php

namespace App\Http\Controllers\Inventory\Transaksi\Hibah;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PermohonanHibahController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Hibah.PermohonanHibah', compact('access'));
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

            // mendapatkan daftar objek
        } else if ($id === 'getObjek') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_UserObjek_Diminta @XKdUser = ?, @XIdDivisi = ?', [$user, $request->input('divisi')]);
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

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompok_SubKelompok @XIdKelompok_SubKelompok = ?', [$XIdKelompok_SubKelompok]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get id type
        else if ($id === 'getType') {
            $XIdSubKelompok_Type = $request->input('XIdSubKelompok_Type');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?', [$XIdSubKelompok_Type]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                    'IdType' => $detail_subkel->IdType
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get saldo
        else if ($id === 'loadSaldo') {
            $IdType = $request->input('IdType');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_Saldo_Barang @IdType = ?', [$IdType]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'SatPrimer' => $detail_subkel->SatPrimer,
                    'SatSekunder' => $detail_subkel->SatSekunder,
                    'SatTritier' => $detail_subkel->SatTritier
                ];
            }
            return response()->json($data_subkel);

        }

        // get list mohon
        else if ($id === 'listMohon') {
            $XIdDivisi = $request->input('XIdDivisi');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Mohon_TmpTransaksi
             @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?'
                ,
                [4, '13', $XIdDivisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdTransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'IdType' => $detail_subkel->IdType
                ];
            }
            return response()->json($data_subkel);
        }

        // get detail data
        else if ($id === 'fetchDataDetail') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi
                     @XIdTransaksi = ?'
                ,
                [$XIdTransaksi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdDivisi' => $detail_subkel->IdDivisi,
                    'NamaDivisi' => $detail_subkel->NamaDivisi,
                    'IdObjek' => $detail_subkel->IdObjek,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'IdKelompokUtama' => $detail_subkel->IdKelompokUtama,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'IdKelompok' => $detail_subkel->IdKelompok,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'JumlahPemasukanPrimer' => $detail_subkel->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_subkel->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_subkel->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_subkel->JumlahPengeluaranTritier,
                    'IdType' => $detail_subkel->IdType,
                    'NamaType' => $detail_subkel->NamaType,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'Satuan_Primer' => $detail_subkel->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_subkel->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_subkel->Satuan_Tritier
                ];
            }
            return response()->json($data_subkel);
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

        // insert
        if ($id === 'insertData') {
            $XIdTypeTransaksi = 13;
            $XIdType = $request->input('XIdType');
            $XIdPemberi = $user;
            $XSaatAwalTransaksi = $request->input('XSaatAwalTransaksi');
            $XJumlahMasukPrimer = $request->input('XJumlahMasukPrimer');
            $XJumlahMasukSekunder = $request->input('XJumlahMasukSekunder');
            $XJumlahMasukTritier = $request->input('XJumlahMasukTritier');
            $XAsalIdSubKelompok = $request->input('XAsalIdSubKelompok');
            $XUraianDetailTransaksi = $request->input('XUraianDetailTransaksi');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_INSERT_13_TMPTRANSAKSI]
        @XIdTypeTransaksi = ?,
        @XIdType = ?,
        @XIdPemberi = ?,
        @XSaatAwalTransaksi = ?,
        @XJumlahMasukPrimer = ?,
        @XJumlahMasukSekunder = ?,
        @XJumlahMasukTritier = ?,
        @XAsalIdSubKelompok = ?,
        @XUraianDetailTransaksi = ?',
                        [
                            $XIdTypeTransaksi,
                            $XIdType,
                            $XIdPemberi,
                            $XSaatAwalTransaksi,
                            $XJumlahMasukPrimer,
                            $XJumlahMasukSekunder,
                            $XJumlahMasukTritier,
                            $XAsalIdSubKelompok,
                            $XUraianDetailTransaksi
                        ]
                    );

                return response()->json(['success' => 'Data berhasil diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // update
        else if ($id === 'updateData') {
            $XIdTransaksi = $request->input('XIdTransaksi');
            $XJumlahKeluarPrimer = $request->input('XJumlahKeluarPrimer');
            $XJumlahKeluarSekunder = $request->input('XJumlahKeluarSekunder');
            $XJumlahKeluarTritier = $request->input('XJumlahKeluarTritier');
            $XTujuanSubkelompok = $request->input('XTujuanSubkelompok');
            $XUraianDetailTransaksi = $request->input('XUraianDetailTransaksi');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_Update_TmpTransaksi]
        @XIdTransaksi = ?,
        @XJumlahKeluarPrimer = ?,
        @XJumlahKeluarSekunder = ?,
        @XJumlahKeluarTritier = ?,
        @XTujuanSubkelompok = ?,
        @XUraianDetailTransaksi = ?',
                        [
                            $XIdTransaksi,
                            $XJumlahKeluarPrimer,
                            $XJumlahKeluarSekunder,
                            $XJumlahKeluarTritier,
                            $XTujuanSubkelompok,
                            $XUraianDetailTransaksi
                        ]
                    );

                return response()->json(['success' => 'Data berhasil diKOREKSI'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diKOREKSI: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        if ($id == 'deleteData') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_Delete_TmpTransaksi]
                        @XIdTransaksi = ?',
                        [
                            $XIdTransaksi,
                        ]
                    );
                return response()->json(['success' => 'Data sudah diHAPUS'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
