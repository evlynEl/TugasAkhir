<?php

namespace App\Http\Controllers\Inventory\Transaksi\Penghangusan;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;


class PenghangusanBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Penghangusan.PenghangusanBarang', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $data = $request->all();
        // dd($data , " Masuk store");
        DB::connection('ConnInventory')->statement('exec SP_1273_INV_Insert_02_TmpTransaksi @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XSaatawalTransaksi = ?
        , @XIdType = ?, @XIdPenerima = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XAsalIdSubKelompok = ?, @XTujuanIdSubkelompok = ?, @Harga = ?', [
            $data['IdTypeTransaksi'],
            $data['UraianDetailTransaksi'],
            $data['SaatAwalTransaksi'],
            $data['IdType'],
            $data['IdPenerima'],
            $data['JumlahKeluarPrimer'],
            $data['JumlahKeluarSekunder'],
            $data['JumlahKeluarTritier'],
            $data['AsalIdSubKel'],
            $data['TujuanIdSubKel'],
            $data['Harga']
        ]);

        return redirect()->route('FormMhnPenerima.index')->with('alert', 'Data berhasil ditambahkan!');
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

        $divisiNama = $request->input('divisiNama');
        $tanggal = $request->input('tanggal');
        $pemohon = $request->input('pemohon');
        $objekNama = $request->input('objekNama');
        $kelompokNama = $request->input('kelompokNama');
        $kelutNama = $request->input('kelutNama');
        $subkelNama = $request->input('subkelNama');
        $kodeTransaksi = $request->input('kodeTransaksi');
        $kodeBarang = $request->input('kodeBarang');
        $kodeType = $request->input('kodeType');
        $namaBarang = $request->input('namaBarang');
        $primer = $request->input('primer');
        $no_primer = $request->input('no_primer');
        $sekunder = $request->input('sekunder');
        $no_sekunder = $request->input('no_sekunder');
        $tritier = $request->input('tritier');
        $no_tritier = $request->input('no_tritier');
        $alasan = $request->input('alasan');
        $primer2 = $request->input('primer2');
        $sekunder2 = $request->input('sekunder2');
        $tritier2 = $request->input('tritier2');

        if ($id === 'getDivisi') {
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
        } else if ($id === 'getObjek') {
            // mendapatkan daftar objek
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $divisiId]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek
                ];
            }
            return datatables($objek)->make(true);
        } else if ($id === 'getKelUt') {
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
        } else if ($id === 'getKelompok') {
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
        } else if ($id === 'getSubkel') {
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
        } else if ($id === 'getABM') {
            // mendapatkan daftar type ABM
            $listABM = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdSubKelompok_Type_ABM @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_listABM = [];
            foreach ($listABM as $detail_listABM) {
                $data_listABM[] = [
                    'idtype' => $detail_listABM->idtype,
                    'BARU' => $detail_listABM->BARU
                ];
            }
            return response()->json($listABM);
        } else if ($id === 'getSatuanType') {
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
        } else if ($id === 'getSaldo') {
            // mendapatkan saldo
            $saldo = DB::connection('ConnInventory')->select('exec SP_1003_INV_Saldo_Barang @IdType = ?', [$kodeType]);
            $data_saldo = [];
            foreach ($saldo as $detail_saldo) {
                $data_saldo[] = [
                    'SaldoPrimer' => $detail_saldo->SaldoPrimer,
                    'SaldoSekunder' => $detail_saldo->SaldoSekunder,
                    'SaldoTritier' => $detail_saldo->SaldoTritier
                ];
            }
            return response()->json($saldo);
        } else if ($id === 'getTypeCIR') {
            // mendapatkan nama type & id type
            $typeCIR = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Type_PerUkuran @IdType = ?', [$kodeType]);
            $data_typeCIR = [];
            foreach ($typeCIR as $detail_typeCIR) {
                $data_typeCIR[] = [
                    'Id_Type' => $detail_typeCIR->Id_Type,
                    'Nm_Type' => $detail_typeCIR->Nm_Type
                ];
            }
            return response()->json($data_typeCIR);
        } else if ($id === 'getType') {
            // mendapatkan nama type & id type
            $type = DB::connection('ConnInventory')->select('exec SP_1003_INV_Idsubkelompok_type @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_type = [];
            foreach ($type as $detail_type) {
                $data_type[] = [
                    'IdType' => $detail_type->IdType,
                    'NamaType' => $detail_type->NamaType
                ];
            }
            // dd($data_type);
            return datatables($data_type)->make(true);
        } else if ($id === 'getAllData') {
            // mendapatkan nama type & id type
            $allData = DB::connection('ConnInventory')->select('
            exec SP_1003_INV_List_Mohon_TmpTransaksi @kode = 2, @XIdDivisi = ?, @XIdTypeTransaksi = ?', [$divisiId, '05']);
            $data_allData = [];
            foreach ($allData as $detail_allData) {
                $formattedDate = date('m/d/Y', strtotime($detail_allData->SaatAwalTransaksi));

                $data_allData[] = [
                    'IdTransaksi' => $detail_allData->IdTransaksi,
                    'NamaType' => $detail_allData->NamaType,
                    'UraianDetailTransaksi' => $detail_allData->UraianDetailTransaksi,
                    'IdPenerima' => $detail_allData->IdPenerima,
                    'SaatAwalTransaksi' => $formattedDate,
                    'NamaDivisi' => $detail_allData->NamaDivisi,
                    'NamaObjek' => $detail_allData->NamaObjek,
                    'NamaKelompokUtama' => $detail_allData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_allData->NamaKelompok,
                    'NamaSubKelompok' => $detail_allData->NamaSubKelompok,
                    'IdPenerima1' => $detail_allData->IdPenerima1,
                    'IdType' => $detail_allData->IdType,
                    'KodeBarang' => $detail_allData->KodeBarang,
                    'IdSubkelompok' => $detail_allData->IdSubkelompok
                ];
            }
            return response()->json($data_allData);
        }
        // } else if ($id === 'getKode') {
        //     // mendapatkan daftar kode type
        //     $kodeType = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdSubKelompok_Type_ABM @XIdSubKelompok_Type = ?', [$subkelId]);
        //     $data_kodeType = [];
        //     foreach ($kodeType as $detail_kodeType) {
        //         $data_kodeType[] = [
        //             'IdSubkelompok' => $detail_kodeType->IdSubkelompok,
        //             'NamaSubKelompok' => $detail_kodeType->NamaSubKelompok
        //         ];
        //     }
        //     return datatables($kodeType)->make(true);
        // }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $data = $request->all();
        // dd($data , " Masuk update");
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_TmpTransaksi @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanIdSubkelompok = ?', [
            $data['IdTransaksi'],
            $data['UraianDetailTransaksi'],
            $data['JumlahKeluarPrimer'],
            $data['JumlahKeluarSekunder'],
            $data['JumlahKeluarTritier'],
            $data['TujuanIdSubKel'],
        ]);
        return redirect()->route('FormMhnPenerima.index')->with('alert', 'Data berhasil diupdate!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_Delete_TmpTransaksi  @XIdTransaksi = ?', [
            $data['IdTransaksi']
        ]);

        return redirect()->route('MaxMinStok.index')->with('alert', 'Data berhasil dihapus!');
    }
}
