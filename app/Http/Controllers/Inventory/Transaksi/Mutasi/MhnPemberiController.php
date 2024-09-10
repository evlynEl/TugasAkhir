<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MhnPemberiController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.MhnPemberi', compact('access'));
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

        // tampil all data
        else if ($id === 'tampilAllData') {
            $XIdDivisi = $request->input('XIdDivisi');
            $XIdObjek = $request->input('XIdObjek');
            $tgl1 = $request->input('tgl1');
            $tgl2 = $request->input('tgl2');

            $subkel = DB::connection('ConnInventory')->select('
    exec SP_1003_INV_List_Mohon_TmpTransaksi_1
        @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?, @XIdObjek = ?, @tgl1 = ?, @tgl2 = ?',
                [4, '03', $XIdDivisi, $XIdObjek, $tgl1, $tgl2]
            );

            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdTransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_subkel->NamaDivisi,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'IdPemberi' => $detail_subkel->IdPemberi,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'KomfirmasiPenerima' => $detail_subkel->KomfirmasiPenerima,
                    'KomfirmasiPemberi' => $detail_subkel->KomfirmasiPemberi,
                ];
            }
            return response()->json($data_subkel);
        }

        // tampil data
        else if ($id === 'tampilData') {
            $XIdDivisi = $request->input('XIdDivisi');
            $XIdObjek = $request->input('XIdObjek');
            $tgl1 = $request->input('tgl1');
            $tgl2 = $request->input('tgl2');

            $subkel = DB::connection('ConnInventory')->select('EXEC SP_1003_INV_List_Mohon_TmpTransaksi_1 
            @Kode = ?, 
            @XIdTypeTransaksi = ?, 
            @XIdDivisi = ?, 
            @XIdObjek = ?, 
            @tgl1 = ?, 
            @tgl2 = ?, 
            @XUser = ?',
                [
                    5,
                    '03',
                    $XIdDivisi,
                    $XIdObjek,
                    $tgl1,
                    $tgl2,
                    $user
                ]
            );

            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdTransaksi' => $detail_subkel->IdTransaksi,
                    'NamaType' => $detail_subkel->NamaType,
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi,
                    'NamaDivisi' => $detail_subkel->NamaDivisi,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'IdPemberi' => $detail_subkel->IdPemberi,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'KomfirmasiPenerima' => $detail_subkel->KomfirmasiPenerima,
                ];
            }
            return response()->json($data_subkel);
        }

        // kelut
        else if ($id === 'getKelUt') {
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
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$request->input('kelompokId')]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get type abm
        else if ($id === 'getTypeABM') {
            $XIdSubKelompok_Type = $request->input('XIdSubKelompok_Type') ?? '0';

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type_ABM
                    @XIdSubKelompok_Type = ?', [$XIdSubKelompok_Type]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'idtype' => $detail_subkel->idtype,
                    'BARU' => $detail_subkel->BARU,
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get type cir
        else if ($id === 'getTypeCIR') {
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_type_perukuran');
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'Nm_Type' => $detail_subkel->Nm_Type,
                    'Id_Type' => $detail_subkel->Id_Type,
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get type 
        else if ($id === 'getType') {
            $XIdSubKelompok_Type = $request->input('XIdSubKelompok_Type') ?? '0';

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type
            @XIdSubKelompok_Type = ?', [$XIdSubKelompok_Type]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                    'IdType' => $detail_subkel->IdType,
                ];
            }
            return datatables($subkel)->make(true);
        }

        // get type 
        else if ($id === 'loadPib') {
            $IdType = $request->input('IdType');
            $IdSubKel = $request->input('IdSubKel');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_namatype_type
            @IdType = ?, @IdSubKel = ?', [$IdType, $IdSubKel]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'PIB' => $detail_subkel->PIB,
                ];
            }
            return response()->json($data_subkel);
        }

        // get saldo 
        else if ($id === 'getSaldo') {
            $IdType = $request->input('IdType');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_Saldo_Barang
            @IdType = ?', [$IdType]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'SatPrimer' => $detail_subkel->SatPrimer,
                    'SatSekunder' => $detail_subkel->SatSekunder,
                    'SatTritier' => $detail_subkel->SatTritier,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'PIB' => $detail_subkel->PIB,
                ];
            }
            return response()->json($data_subkel);
        }

        // get jumlah antrian 
        else if ($id === 'getJumlahAntrian') {
            $IdType = $request->input('IdType');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_JmlAntrian_TmpTransaksi
            @Kode = ?, @IdType = ?', [1, $IdType]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'OutPrimer' => $detail_subkel->OutPrimer,
                    'OutSekunder' => $detail_subkel->OutSekunder,
                    'OutTritier' => $detail_subkel->OutTritier,
                ];
            }
            dd($subkel, $IdType);
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

        if ($id == 'insertTempType') {
            $XIdDivisi = $request->input('XIdDivisi');
            $XIdSubKelompok = $request->input('XIdSubKelompok');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_idnamasubkelompok_type]
                @XIdDivisi = ?,
                @XIdSubKelompok = ?', [
                        $XIdDivisi,
                        $XIdSubKelompok,
                    ]);
                return response()->json(['success' => 'Data berhasil diPROSES'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        // 
    }
}
