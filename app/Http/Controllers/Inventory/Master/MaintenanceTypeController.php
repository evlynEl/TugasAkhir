<?php

namespace App\Http\Controllers\Inventory\Master;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceTypeController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Master.MaintenanceType', compact('access'));
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
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_insert_type @XIdType = ?, @XNamaType = ?, @XUraianType = ?
        , @XIdSubkelompok_Type = ?, @XKodeBarang = ?, @XSaatStokAwal = ?, @XStokAwalPrimer = ?, @XTotalPemasukanPrimer = ?, @XSaldoPrimer = ?, @XUnitPrimer = ?, @XStokAwalSekunder = ?, XTotalPemasukanSekunder = ?
        , @XSaldoSekunder = ?, @XUnitSekunder = ?, @XStokAwalTritier = ?, @XTotalPemasukanTritier = ?, @XSaldoTritier = ?, @XUnitTritier = ?, @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierKeSekunder = ?
        , @XNonaktif = ?, @XMinimumStok = ?, @XNo_satuan_umum = ?, @userInput = ?', [
            $data['IdType'],
            $data['NamaType'],
            $data['UraianType'],
            $data['IdSubKel'],
            $data['KodeBarang'],
            $data['SaatStokAwal'],
            $data['StokAwalPrimer'],
            $data['TotalPemasukanPrimer'],
            $data['SaldoPrimer'],
            $data['UnitPrimer'],
            $data['StokAwalSekunder'],
            $data['TotalPemasukanSekunder'],
            $data['SaldoSekunder'],
            $data['UnitSekunder'],
            $data['StokAwalTritier'],
            $data['TotalPemasukanTritier'],
            $data['SaldoTritier'],
            $data['UnitTritier'],
            $data['AturanKonversi'],
            $data['KonvSekunderPrimer'],
            $data['KonvTritierSekunder'],
            $data['NonAktif'],
            $data['MinimumStok'],
            $data['NoSatuanUmum'],
            $data['userInput']
        ]);

        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil ditambahkan!');
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;
        $a = (int)$request->input('a');
        $namaType = $request->input('namaType');
        $ketType = $request->input('ketType');
        $uraianType = trim($ketType) === '' ? '' : trim($ketType);
        $ketType = $request->input('ketType');
        $PIB = $request->input('PIB');
        $PEB = $request->input('PEB');
        $kdBarang = $request->input('kdBarang');
        $subkelId = $request->input('subkelId');
        $konversi = $request->input('konversi');
        $divisiId = $request->input('divisiId');
        $divisiNama = $request->input('divisiNama');
        $objekId = $request->input('objekId');
        $objekNama = $request->input('objekNama');
        $kelompokId = $request->input('kelompokId');
        $kelompokNama = $request->input('kelompokNama');
        $kelutId = $request->input('kelutId');
        $kelutNama = $request->input('kelutNama');
        $subkelNama = $request->input('subkelNama');
        $katUtama = $request->input('katUtama');
        $kategori = $request->input('kategori');
        $jenis = $request->input('jenis');
        $namaBarang = $request->input('namaBarang');
        $kodeType = $request->input('kodeType');
        $satuan = $request->input('satuan');
        $satuanUmum = trim($satuan) === '' ? '' : trim($satuan);
        $primerSekunder = $request->input('primerSekunder');
        $sekunderTritier = $request->input('sekunderTritier');

        $no_tritier = $request->input('no_tritier');
        $no_sekunder = $request->input('no_sekunder');
        $no_primer = $request->input('no_primer');

        $no_katUtama = $request->input('no_katUtama');
        $no_kategori = $request->input('no_kategori');
        $no_subkategori = $request->input('no_subkategori');

        $idtype = $request->input('idtype');


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

        } else if ($id === 'getKatut') {
            // mendapatkan daftar kategori utama
            $katUtama = DB::connection('ConnPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 1');
            $data_katUtama = [];
            foreach ($katUtama as $detail_katUtama) {
                $data_katUtama[] = [
                    'no_kat_utama' => $detail_katUtama->no_kat_utama,
                    'nama' => $detail_katUtama->nama
                ];
            }
            return datatables($katUtama)->make(true);

        } else if ($id === 'getKategori') {
            // mendapatkan daftar kategori
            $kategori = DB::connection('ConnPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 2, @MyValue = ?', [$no_katUtama]);
            $data_kategori = [];
            foreach ($kategori as $detail_kategori) {
                $data_kategori[] = [
                    'no_kategori' => $detail_kategori->no_kategori,
                    'nama_kategori' => $detail_kategori->nama_kategori
                ];
            }
            return datatables($kategori)->make(true);

        } else if ($id === 'getSubkategori') {
            // mendapatkan daftar sub kategori
            $subKategori = DB::connection('ConnPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 3, @MyValue = ?', [$no_kategori]);
            $data_subKategori = [];
            foreach ($subKategori as $detail_subKategori) {
                $data_subKategori[] = [
                    'no_sub_kategori' => $detail_subKategori->no_sub_kategori,
                    'nama_sub_kategori' => $detail_subKategori->nama_sub_kategori
                ];
            }
            return datatables($subKategori)->make(true);

        } else if ($id === 'getBarang') {
            // mendapatkan daftar barang
            $barang = DB::connection('ConnPurchase')->select('exec SP_1003_INV_lihat_type @no_jns_1 = ?', [$no_subkategori]);
            // dd($no_subkategori);
            $data_barang = [];
            foreach ($barang as $detail_barang) {
                $data_barang[] = [
                    'KD_BRG' => $detail_barang->KD_BRG,
                    'NAMA_BRG' => $detail_barang->NAMA_BRG
                ];
            }

            // auto fill satuan primer, sekunder, tritier dr kode barang
            $satuanBarang = DB::connection('ConnPurchase')->select('exec SP_1003_INV_KdBrg_Satuan_YBarang @KodeBarang = ?', [$kdBarang]);

            $data_satuanBarang = [];
            foreach ($satuanBarang as $detail_satuanBarang) {
                $data_satuanBarang[] = [
                    'NmSat_Tri' => $detail_satuanBarang->NmSat_Tri,
                    'ST_TRI' => $detail_satuanBarang->ST_TRI,
                    'NmSat_Sek' => $detail_satuanBarang->NmSat_Sek,
                    'ST_SEK' => $detail_satuanBarang->ST_SEK,
                    'NmSat_Prim' => $detail_satuanBarang->NmSat_Prim,
                    'ST_PRIM' => $detail_satuanBarang->ST_PRIM
                ];
            }

            $response_data = [
                'data_barang' => $data_barang,
                'data_satuanBarang' => $data_satuanBarang
            ];

            dd($response_data);

            return datatables($response_data)->make(true);

        } else if ($id === 'getFillSatuan') {
            // auto fill satuan primer, sekunder, tritier dr kode barang
            $namaSatuan = DB::connection('ConnInventory')->select('exec SP_1003_INV_Nama_Satuan @XNama_Satuan = ?', [$trotoer]);

            $data_namaSatuan = [];
            foreach ($namaSatuan as $detail_namaSatuan) {
                $data_namaSatuan[] = [
                    'NmSat_Tri' => $detail_namaSatuan->NmSat_Tri,
                    'ST_TRI' => $detail_namaSatuan->ST_TRI,
                    'NmSat_Sek' => $detail_namaSatuan->NmSat_Sek,
                    'ST_SEK' => $detail_namaSatuan->ST_SEK,
                    'NmSat_Prim' => $detail_namaSatuan->NmSat_Prim,
                    'ST_PRIM' => $detail_namaSatuan->ST_PRIM
                ];
            }

            dd($data_namaSatuan);

            return response()->json($data_namaSatuan);

        } else if ($id === 'getSatuan') {
            // daftar satuan primer, sekunder, tritier
            $satuan = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_satuan');
            $data_satuan = [];
            foreach ($satuan as $detail_satuan) {
                $data_satuan[] = [
                    'no_satuan' => $detail_satuan->no_satuan,
                    'nama_satuan' => $detail_satuan->nama_satuan
                ];
            }
            return datatables($satuan)->make(true);

        } else if ($id === 'getListKoreksi') {
            // daftar kode barang untuk koreksi
            $getKoreksi = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type @kd = 1, @XIdSubKelompok_Type = ?', [$subkelId]);
            $data_getKoreksi = [];
            foreach ($getKoreksi as $detail_getKoreksi) {
                $data_getKoreksi[] = [
                    'IdType' => $detail_getKoreksi->IdType,
                    'NamaType' => $detail_getKoreksi->NamaType
                ];
            }
            // dd($subkelId, $getKoreksi);
            return datatables($getKoreksi)->make(true);

        } else if ($id === 'getSatuanKodeBarang') {
            // get beberapa data untuk koreksi
            $unit = DB::connection('ConnInventory')->select('exec SP_1003_INV_NamaType_Type  @IdType = ?, @IdSubKel = ?', [$idtype, $subkelId]);

            $data_unit = [];
            foreach ($unit as $detail_unit) {
                $data_unit[] = [
                    'NamaType' => $detail_unit->NamaType,
                    'UraianType' => $detail_unit->UraianType,
                    'KodeBarang' => $detail_unit->KodeBarang,
                    'PIB' => $detail_unit->PIB,
                    'PakaiAturanKonversi' => $detail_unit->PakaiAturanKonversi,
                    'KonvSekunderKePrimer' => $detail_unit->KonvSekunderKePrimer,
                    'KonvTritierKeSekunder' => $detail_unit->KonvTritierKeSekunder,
                    'satuan_tritier' => $detail_unit->satuan_tritier,
                    'kdSatTertier' => $detail_unit->kdSatTertier,
                    'satuan_sekunder' => $detail_unit->satuan_sekunder,
                    'kdSatSekunder' => $detail_unit->kdSatSekunder,
                    'satuan_primer' => $detail_unit->satuan_primer,
                    'kdSatPrimer' => $detail_unit->kdSatPrimer
                ];
            }

            $kode = DB::connection('ConnPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 6, @MyValue = ?', [$detail_unit->KodeBarang]);

            $data_kode = [];
            foreach ($kode as $detail_kode) {
                $data_kode[] = [
                    'KD_BRG' => $detail_kode->KD_BRG,
                    'NAMA_BRG' => $detail_kode->NAMA_BRG,
                    'SubKategory' => $detail_kode->SubKategory,
                    'Kategory' => $detail_kode->Kategory,
                    'Kategory_Utama' => $detail_kode->Kategory_Utama
                ];
            }

            $response_data = [
                'data_unit' => $data_unit,
                'data_kode' => $data_kode
            ];

            // dd($response_data);

            return response()->json($response_data);

        } else if ($id === 'getSatuanUmum') {
            // daftar kode barang untuk koreksi
            $cekSatuanType = DB::connection('ConnInventory')->select('exec SP_1003_INV_satumum_type @idtype = ?', [$idtype]);
            $satuan_umum = $cekSatuanType[0]->SatuanUmum;
            // dd($satuan_umum, !empty($satuan_umum));

            if (isset($satuan_umum) && $satuan_umum === "") {
                // dd('masuk');
                $satuanFinal = DB::connection('ConnInventory')->select('exec SP_1003_INV_nama_satumum @no_satumum = ?', [$satuan_umum]);
                $satuan_final = $satuanFinal[0]->nama_satuan;

                return response()->json($satuan_final);
            } else {
                return response()->json([]);
            }

        } else if ($id === 'proses') {
            // proses terjadi
            if ($a === 1) { // ISI
                // cek id kode barang
                $cekKodeBarang = DB::connection('ConnInventory')->select(
                    'exec SP_1003_INV_CheckKodeBarang_Type
                    @kd = 1, @noPIB = ?, @XKodebarang = ?, @XIdSubKelompok = ?',
                    [$PIB, $kdBarang, $subkelId]
                );
                // dd($cekKodeBarang);

                if (!empty($cekKodeBarang)) {
                    return response()->json(['error'], 200);
                } else {
                    // cek counter
                    $cekTabel = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Counter');
                    if (!empty($cekTabel)) {
                        $idtype = $cekTabel[0]->IdType + 1;
                    }
                    $idtype = str_pad($idtype, 20, '0', STR_PAD_LEFT);
                    // dd($idtype);

                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_insert_type
                        @XIdType = ?, @XNamaType = ?, @XUraianType = ?, @XIdSubKelompok_Type = ?, @XKodeBarang = ?,
                        @XSaatStokAwal = ?, @XStokAwalPrimer = ?, @XTotalPemasukanPrimer = ?, @XSaldoPrimer = ?, @XUnitPrimer = ?,
                        @XStokAwalSekunder = ?, @XTotalPemasukanSekunder = ?, @XSaldoSekunder = ?, @XUnitSekunder = ?,
                        @XStokAwalTritier = ?, @XTotalPemasukanTritier = ?, @XSaldoTritier = ?, @XUnitTritier = ?,
                        @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierkeSekunder = ?, @XNonaktif = ?,
                        @XMinimumStok = ?, @Xno_satuan_umum = ?, @userInput = ?, @noPIB = ?, @noPEB = ?',
                    [
                        $idtype, $namaType, $uraianType, $subkelId, $kdBarang,
                        now(), 0,0,0, $no_primer,
                        0,0,0, $no_sekunder,
                        0,0,0, $no_tritier,
                        $konversi, $primerSekunder, $sekunderTritier, "Y",
                        0, $satuanUmum, $user, $PIB, $PEB
                    ]);


                    DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_IdType_Counter @XIdType = ?',[$idtype]);

                    return response()->json(['success' => true, 'data' => [['idtype' => $idtype]]], 200);
                }
            } else if ($a === 2) { // KOREKSI

                DB::connection('ConnInventory')->statement(
                    'exec SP_1003_INV_update_type
                    @XIdType = ?, @XNamaType = ?, @XUraianType = ?, @XIdSubKelompok_Type = ?, @XKodeBarang = ?,
                    @XUnitPrimer = ?, @XUnitSekunder = ?, @XUnitTritier = ?, @XPakaiAturanKonversi = ?,
                    @XKonvSekunderKePrimer = ?, @XKonvTritierkeSekunder = ?, @Xno_satuan_umum = ?,  @noPIB = ?, @noPEB = ?',
                    [$kodeType, $namaType, $uraianType, $subkelId, $kdBarang,
                    $no_primer, $no_sekunder, $no_tritier, $konversi,
                    $primerSekunder, $sekunderTritier, $satuanUmum, $user, $PIB, $PEB]
                );
                dd($request->all());

                return response()->json(['success' => 'Data updated successfully'], 200);
            }
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
        $data = $request->all();
        // dd($data , " Masuk update");
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_update_type @XIdType = ?, @XNamaType = ?, @XUraianType = ?
        , @XIdSubkelompok_Type = ?, @XKodeBarang = ?, @XUnitPrimer = ?, @XUnitSekunder = ?, @XUnitTritier = ?, @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierKeSekunder = ?,
        @XNo_satuan_umum = ?', [
            $data['IdType'],
            $data['NamaType'],
            $data['UraianType'],
            $data['IdSubKel'],
            $data['KodeBarang'],
            $data['UnitPrimer'],
            $data['UnitSekunder'],
            $data['UnitTritier'],
            $data['AturanKonversi'],
            $data['KonvSekunderPrimer'],
            $data['KonvTritierSekunder'],
            $data['NoSatuanUmum']
        ]);
        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil diupdate!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_delete_type  @XIdType = ?', [
            $data['IdType']
        ]);

        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil dihapus!');
    }
}
