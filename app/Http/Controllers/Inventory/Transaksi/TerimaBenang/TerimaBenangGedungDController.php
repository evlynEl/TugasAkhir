<?php

namespace App\Http\Controllers\Inventory\Transaksi\TerimaBenang;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class TerimaBenangGedungDController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Transaksi.TerimaBenang.TerimaBenangGedungD', compact('access'));
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

        if ($id === 'getKelUt') {
            $kelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama
            @Type = ?, @XIdObjek_KelompokUtama = ?', ['14', '032']);
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

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$XIdKelompok_SubKelompok]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);
        }

        // ambil kode type
        else if ($id === 'getIdType') {
            $XIdSubKelompok_Type = $request->input('XIdSubKelompok_Type');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type
            @XIdSubKelompok_Type = ?'
                ,
                [$XIdSubKelompok_Type]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                    'IdType' => $detail_subkel->IdType
                ];
            }
            return datatables($subkel)->make(true);
        }

        // cek kode type
        else if ($id === 'getType') {
            $IdType = $request->input('IdType');
            $IdSubKel = $request->input('IdSubKel');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_NamaType_Type
            @IdType = ?, @IdSubKel = ?'
                ,
                [$IdType, $IdSubKel]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'PIB' => $detail_subkel->PIB,
                ];
            }
            return response()->json($data_subkel);
        }

        // cek kode type
        else if ($id === 'getSatuanPemohon') {
            $XKodeBarang = $request->input('XKodeBarang');
            $XIdSubKelompok = $request->input('XIdSubKelompok');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_kodebarang_type
            @XKodeBarang = ?, @XIdSubKelompok = ?'
                ,
                [$XKodeBarang, $XIdSubKelompok]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'satuan_primer' => $detail_subkel->satuan_primer,
                    'satuan_sekunder' => $detail_subkel->satuan_sekunder,
                    'satuan_tritier' => $detail_subkel->satuan_tritier,
                ];
            }
            return response()->json($data_subkel);

        }

        // cget kode barang
        else if ($id === 'getKodeBarangPenerima') {
            $XKodeBarang = $request->input('XKodeBarang');
            $XIdSubKelompok = $request->input('XIdSubKelompok');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_KodeBarang_Type
            @XKodeBarang = ?, @XIdSubKelompok = ?'
                ,
                [$XKodeBarang, $XIdSubKelompok]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'satuan_primer' => $detail_subkel->satuan_primer,
                    'satuan_sekunder' => $detail_subkel->satuan_sekunder,
                    'satuan_tritier' => $detail_subkel->satuan_tritier,
                ];
            }
            return response()->json($data_subkel);

        }

        // cek kode barang
        else if ($id === 'cekKodeBarangType') {
            $XKodeBarang = $request->input('XKodeBarang');
            $XIdSubKelompok = $request->input('XIdSubKelompok');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_CekKodeBarang_Type
            @XKodeBarang = ?, @XIdSubKelompok = ?'
                ,
                [$XKodeBarang, $XIdSubKelompok]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'Jumlah' => $detail_subkel->Jumlah,
                ];
            }
            return response()->json($data_subkel);

        }

        // cek kode barang
        else if ($id === 'cekPenyesuaianTransaksi') {
            $kodeBarang = $request->input('kodeBarang');
            $idSubKel = $request->input('idSubKel');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_CHECK_PENYESUAIAN_TRANSAKSI
            @kode = ?, @kodeBarang = ?, @idSubKel = ?'
                ,
                [3, $kodeBarang, $idSubKel]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'jumlah' => $detail_subkel->jumlah,
                    'IdType' => $detail_subkel->IdType,
                ];
            }
            return response()->json($data_subkel);

        }

        // cek kode barang
        else if ($id === 'getListHutangExt') {
            $XIdDivisi = $request->input('XIdDivisi');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_hutangEXT
            @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?, @XUser = ?'
                ,
                [2, '19', $XIdDivisi, $user]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdHutExt' => $detail_subkel->IdHutExt,
                    'NamaType' => $detail_subkel->NamaType,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'NamaUser' => $detail_subkel->NamaUser,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'IdTransINV' => $detail_subkel->IdTransINV ?? '',
                ];
            }
            return response()->json($data_subkel);

        }

        // cek kode barang
        else if ($id === 'getAllListHutangExt') {
            $XIdDivisi = $request->input('XIdDivisi');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_hutangEXT
            @Kode = ?, @XIdTypeTransaksi = ?, @XIdDivisi = ?'
                ,
                [1, '19', $XIdDivisi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdHutExt' => $detail_subkel->IdHutExt,
                    'NamaType' => $detail_subkel->NamaType,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'NamaUser' => $detail_subkel->NamaUser,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'IdTransINV' => $detail_subkel->IdTransINV ?? '',
                ];
            }
            return response()->json($data_subkel);

        }

        // cek kode barang
        else if ($id === 'cekHutang') {
            $awal = $request->input('awal');
            $jmlS = $request->input('jmlS');
            $jumlah = $request->input('jumlah');
            $asal = $request->input('asal');
            $tujuan = $request->input('tujuan');
            $Detail = $request->input('Detail');
            $kodeBarang = $request->input('kodeBarang');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_Cek_Hutang
            @awal = ?, @jmlS = ?, @jumlah = ?, @asal = ?, @tujuan = ?, @Detail = ?, @kodeBarang = ?'
                ,
                [$awal, $jmlS, $jumlah, $asal, $tujuan, $Detail, $kodeBarang]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'ada' => $detail_subkel->ada,
                ];
            }
            return response()->json($data_subkel);

        }

        // get detail data
        else if ($id === 'getDetailData1') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_hutangEXT_Tujuan
            @XIdTransaksi = ?'
                ,
                [$XIdTransaksi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'jumlahSekunder' => $detail_subkel->jumlahSekunder,
                    'Satuan_Sekunder' => $detail_subkel->Satuan_Sekunder ?? 'Null',
                    'jumlahTritier' => $detail_subkel->jumlahTritier,
                    'Satuan_Tritier' => $detail_subkel->Satuan_Tritier ?? 'Null',
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi,
                ];
            }
            return response()->json($data_subkel);

        }

        // get detail data
        else if ($id === 'getDetailData2') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_hutangEXT_Asal
            @XIdTransaksi = ?'
                ,
                [$XIdTransaksi]
            );
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdKelompokUtama' => $detail_subkel->IdKelompokUtama,
                    'IdKelompok' => $detail_subkel->IdKelompok,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                ];
            }
            return response()->json($data_subkel);

        }

        // get tgl sevrer
        else if ($id === 'getTglServer') {
            $subkel = DB::connection('ConnInventory')->select('exec sp_tgl_server');
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'tgl_server' => $detail_subkel->tgl_server,
                ];
            }
            return response()->json($data_subkel);

        }

        // get jam sevrer
        else if ($id === 'getJamServer') {
            $subkel = DB::connection('ConnInventory')->select('exec sp_jam_server');
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'jam_server' => $detail_subkel->jam_server,
                ];
            }
            return response()->json($data_subkel);

        }

        // cekllist utang
        else if ($id === 'getListAdaHutang') {
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_ada_hutang');
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'ada' => $detail_subkel->ada,
                ];
            }
            return response()->json($data_subkel);

        }

        // get tgl hutang
        else if ($id === 'getTglHutang') {
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_AMBIL_tgl_hutang');
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'tgl' => $detail_subkel->tgl,
                    'jam' => $detail_subkel->jam,
                ];
            }
            // dd($subkel);
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

        if ($id == 'insertHutangExt') {
            $idType = $request->input('idType');
            $awal = $request->input('awal');
            $jmlS = $request->input('jmlS');
            $jumlah = $request->input('jumlah');
            $asal = $request->input('asal');
            $tujuan = $request->input('tujuan');
            $Detail = $request->input('Detail');
            $kodeBarang = $request->input('kodeBarang');
            $saatawal = $request->input('saatawal');
            $JumlahSekunder = $request->input('JumlahSekunder');
            $JumlahTritier = $request->input('JumlahTritier');
            $AsalSubKel = $request->input('AsalSubKel');
            $TujSubkel = $request->input('TujSubkel');

            DB::connection('ConnInventory')->beginTransaction();

            try {
                DB::connection('ConnInventory')->statement(
                    'exec [SP_1003_INV_insert_hutang_ext]
            @typeTrans = ?, @idType = ?, @pemberi = ?, @awal = ?, @jmlS = ?, @jumlah = ?, @asal = ?, @tujuan = ?',
                    ['19', $idType, $user, $awal, $jmlS, $jumlah, $asal, $tujuan]
                );

                DB::connection('ConnInventory')->statement(
                    'exec [SP_1003_INV_Penerima_Benang]
            @kode = ?, @Detail = ?, @kodeBarang = ?, @IdPemberi  = ?, @IdPenerima = ?, @saatawal = ?, @JumlahSekunder = ?, @JumlahTritier = ?, @AsalSubKel = ?, @TujSubkel = ?',
                    [1, $Detail, $kodeBarang, $user, $user, $saatawal, $JumlahSekunder, $JumlahTritier, $AsalSubKel, $TujSubkel]
                );

                DB::connection('ConnInventory')->commit();
                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);

            } catch (\Exception $e) {
                DB::connection('ConnInventory')->rollBack();

                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        // 
    }
}
