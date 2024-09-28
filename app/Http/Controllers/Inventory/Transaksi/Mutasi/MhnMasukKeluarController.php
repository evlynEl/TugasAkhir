<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MhnMasukKeluarController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.MasukKeluar.MhnMasukKeluar', compact('access'));
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

        $kodeType = $request->input('kodeType');
        $uraian = $request->input('uraian');

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
            // dd($request->all());
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

        else if ($id === 'getABM') {
            // mendapatkan daftar type ABM
            $listABM = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdSubKelompok_Type_ABM @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_listABM = [];
            foreach ($listABM as $detail_listABM) {
                $data_listABM[] = [
                    'idtype' => $detail_listABM->idtype,
                    'BARU' => $detail_listABM->BARU
                ];
            }
            // dd($detail_listABM);
            return datatables($detail_listABM)->make(true);
        }

        else if ($id === 'getSatuanType') {
            // mendapatkan satuan type
            $type = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalSubKelompok_Type @XIdType = ?', [$kodeType]);
            $data_type = [];
            if (count($type) > 0) {
                foreach ($type as $detail_type) {
                    $data_type[] = [
                        'KodeBarang' => $detail_type->KodeBarang,
                        'NamaType' => $detail_type->NamaType,
                        'Satuan_Primer' => $detail_type->Satuan_Primer,
                        'Satuan_Sekunder' => $detail_type->Satuan_Sekunder,
                        'Satuan_Tritier' => $detail_type->Satuan_Tritier
                    ];
                }
                // dd($data_type);
                return response()->json($data_type);
            }
            return response()->json([]);
        }

        else if ($id === 'getSaldo') {
            // mendapatkan saldo
            $saldo = DB::connection('ConnInventory')->select('exec SP_1003_INV_Saldo_Barang @IdType = ?', [$kodeType]);
            $data_saldo = [];
            foreach ($saldo as $detail_saldo) {
                $data_saldo[] = [
                    'SaldoPrimer' => $detail_saldo->SaldoPrimer,
                    'SaldoSekunder' => $detail_saldo->SaldoSekunder,
                    'SaldoTritier' => $detail_saldo->SaldoTritier,

                ];
            }
            // dd($data_saldo);
            return response()->json($data_saldo);
        }

        else if ($id === 'getTypeCIR') {
            // mendapatkan nama type & id type
            DB::connection('ConnInventory')->statement('exec SP_1003_INV_idnamasubkelompok_type @XIdDivisi = ?, @XIdSubKelompok = ?', [$divisiId, $subkelId]);

            $typeCIR = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Type_PerUkuran');
            $data_typeCIR = [];
            foreach ($typeCIR as $detail_typeCIR) {
                $data_typeCIR[] = [
                    'Id_Type' => $detail_typeCIR->Id_Type,
                    'Nm_Type' => $detail_typeCIR->Nm_Type
                ];
            }

            // dd($data_typeCIR);
            return datatables($data_typeCIR)->make(true);
        }

        else if ($id === 'getType') {
            // mendapatkan nama type & id type
            $type = DB::connection('ConnInventory')->select('exec SP_1003_INV_Idsubkelompok_type @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_type = [];
            foreach ($type as $detail_type) {
                $data_type[] = [
                    'IdType' => $detail_type->IdType,
                    'NamaType' => $detail_type->NamaType
                ];
            }
            // dd($subkelId, $data_type);
            // dd($request->all());
            return datatables($data_type)->make(true);
        }

        else if ($id === 'getKodeBarang') {
            // mendapatkan kode barang
            $code = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_Type @Kode = 1, @idtype = ?', [$kodeType]);
            $data_code = array_map(fn($detail_code) => ['KodeBarang' => $detail_code->KodeBarang], $code);

            return datatables($data_code)->make(true);
        }

        else if ($id === 'getData') {
            // mendapatkan isi tabel
            $justData = DB::connection('ConnInventory')->select('
            SP_1003_INV_List_BelumACC_TmpTransaksi @Kode = 13, @XIdTypeTransaksi = ?, @XUraian = ?, @XIdobjek = ?', ['13', $uraian, $objekId]);

            $data_justData = [];
            foreach ($justData as $detail_justData) {
                $formattedDate = date('m/d/Y', strtotime($detail_justData->SaatAwalTransaksi));

                $data_entry = [
                    'IdTransaksi' => $detail_justData->IdTransaksi,
                    'NamaType' => $detail_justData->NamaType,
                    'IdObjek' => $detail_justData->IdObjek,
                    'NamaObjek' => $detail_justData->NamaObjek,
                    'IdKelompokUtama' => $detail_justData->IdKelompokUtama,
                    'NamaKelompokUtama' => $detail_justData->NamaKelompokUtama,
                    'IdKelompok' => $detail_justData->IdKelompok,
                    'NamaKelompok' => $detail_justData->NamaKelompok,
                    'IdSubkelompok' => $detail_justData->IdSubkelompok,
                    'NamaSubKelompok' => $detail_justData->NamaSubKelompok,
                    'IdDivisi' => $detail_justData->IdDivisi,
                    'IdTypeTransaksi' => '08',
                    'NamaDivisi' => $detail_justData->NamaDivisi,
                    'Satuan_primer' => $detail_justData->Satuan_primer,
                    'Satuan_Sekunder' => $detail_justData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_justData->Satuan_Tritier,
                    'idtype' => $detail_justData->idtype,
                    'UraianDetailTransaksi' => $detail_justData->UraianDetailTransaksi,
                    'SaatAwalTransaksi' => $formattedDate,
                    'idpemberi' => $detail_justData->idpemberi,
                    'kodebarang' => $detail_justData->kodebarang
                ];

                if ($uraian === 'Mutasi Masuk') {
                    $data_entry['JumlahPemasukanPrimer'] = $detail_justData->JumlahPemasukanPrimer;
                    $data_entry['JumlahPemasukanSekunder'] = $detail_justData->JumlahPemasukanSekunder;
                    $data_entry['JumlahPemasukanTritier'] = $detail_justData->JumlahPemasukanTritier;
                } else if ($uraian === 'Mutasi Keluar') {
                    $data_entry['JumlahPengeluaranPrimer'] = $detail_justData->JumlahPengeluaranPrimer;
                    $data_entry['JumlahPengeluaranSekunder'] = $detail_justData->JumlahPengeluaranSekunder;
                    $data_entry['JumlahPengeluaranTritier'] = $detail_justData->JumlahPengeluaranTritier;
                }

                $data_justData[] = $data_entry;
            }
            // dd($request->all(), $data_justData);
            return response()->json($data_justData);
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
        $kode = $request->input('kode');
        $uraian = $request->input('uraian');
        $user = $request->input('user');
        $kodeType = $request->input('kodeType');
        $tanggal = $request->input('tanggal');
        $primer2 = $request->input('primer2');
        $sekunder2 = $request->input('sekunder2');
        $tritier2 = $request->input('tritier2');
        $subkelId = $request->input('subkelId');
        $kodeTransaksi = $request->input('kodeTransaksi');

        // dd($request->all());

        if ($id === 'proses') {
            // proses terjadi
            if ($a === 1) { // ISI
                try{
                    // insert
                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_Insert_08_TmpTransaksi
                        @Kode = ?, @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?,  @XIdPemberi = ?, @XSaatawalTransaksi = ?,
                        @XJumlahMasukPrimer = ?, @XJumlahMasukSekunder = ?, @XJumlahMasukTritier = ?, @XAsalIdSubKelompok = ?, @XTujuanIdSubKelompok = ?',
                        [$kode, '08', $uraian, $kodeType, $user, $tanggal,
                         $primer2, $sekunder2, $tritier2, $subkelId, $subkelId]
                    );

                    return response()->json(['success' => 'Data sudah tersimpan!!'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data Gagal ter-SIMPAN' . $e->getMessage()], 500);
                }
            }

            else if ($a === 2) { // KOREKSI
                try {
                    // update
                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_Update_TMPTRANSAKSI
                        @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanSubKelompok = ?',
                        [$kodeTransaksi, $uraian, $primer2, $sekunder2, $tritier2, $subkelId]
                    );

                    // dd($request->all());

                    return response()->json(['success' => 'Data sudah diKOREKSI!'], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Data Gagal ter-KOREKSI' . $e->getMessage()], 500);
                }
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        $kodeTransaksi = $request->input('kodeTransaksi');
        if ($id === 'hapusMutasi') {
            try {
                DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_TmpTransaksi  @XIdTransaksi = ?', [$kodeTransaksi]);

                // dd($request->all());
                return response()->json(['success' => 'Data sudah diHAPUS!!'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diHAPUS: ' . $e->getMessage()], 500);
            }
        }
    }
}
