<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PermohonanPenerimaBenangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.PermohonanPenerimaBenang', compact('access'));
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
        $Yidtransaksi = $request->input('Yidtransaksi');
        $kodeTransaksi = $request->input('kodeTransaksi');
        $objekId = $request->input('objekId');
        $divisiNama = $request->input('divisiNama');
        $kodeBarang = $request->input('kodeBarang');
        $namaBarang = $request->input('namaBarang');


        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        } else if ($id === 'getData') {
            // menampilkan data di data table
            $justData = DB::connection('ConnInventory')->select('
            exec SP_1003_INV_LIST_BELUMACC_TMPTRANSAKSI_1 @kode = 1, @XIdTypeTransaksi = 03, @XIdObjek = ?', [$objekId]);
            if (count($justData) > 0) {
                $data_justData = [];
                foreach ($justData as $detail_justData) {
                    $formattedDate = date('m/d/Y', strtotime($detail_justData->SaatAwalTransaksi));

                    $data_justData[] = [
                        'IdTransaksi' => $detail_justData->IdTransaksi,
                        'NamaType' => $detail_justData->NamaType,
                        'UraianDetailTransaksi' => $detail_justData->UraianDetailTransaksi,
                        'NamaKelompokUtama' => $detail_justData->NamaKelompokUtama,
                        'NamaKelompok' => $detail_justData->NamaKelompok,
                        'NamaSubKelompok' => $detail_justData->NamaSubKelompok,
                        'IdPemberi' => $detail_justData->IdPemberi,
                        'JumlahPengeluaranPrimer' => $detail_justData->JumlahPengeluaranPrimer,
                        'JumlahPengeluaranSekunder' => $detail_justData->JumlahPengeluaranSekunder,
                        'JumlahPengeluaranTritier' => $detail_justData->JumlahPengeluaranTritier,
                        'SaatAwalTransaksi' => $formattedDate,
                        'KodeBarang' => $detail_justData->KodeBarang,
                        'TujuanIdSubkelompok' => $detail_justData->TujuanIdSubkelompok
                    ];
                }
                // dd($data_justData, $request->all());
                return response()->json($data_justData);
            } else {
                return response()->json(['warning' => 'Tidak ada Data Yang Diterima Oleh Divisi : ' . trim($divisiNama)], 500);
            }
        } else if ($id === 'getSelect') {
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
                    'Satuan_Tritier' => $detail_selectData->Satuan_Tritier
                ];
            }

            // dd($request->all(), $data_selectData);
            return response()->json($data_selectData);
        } else if ($id === 'getpemberi') {
            $typeKonv = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?', [$kodeTransaksi]);
            $data_typeKonv = [];
            foreach ($typeKonv as $detail_typeKonv) {
                $data_typeKonv[] = [
                    'IdType' => $detail_typeKonv->IdType,
                    'NamaType' => $detail_typeKonv->NamaType
                ];
            }

            // dd($request->all(), $data_selectData);
            return response()->json($typeKonv);
        } else if ($id === 'getPemberi') {
            $pemberi = DB::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian_pemberi @idtransaksi = ?, @idtypetransaksi = 06', [$Yidtransaksi]);

            $data_pemberi = [];
            foreach ($pemberi as $detail_pemberi) {
                $data_pemberi[] = [
                    'IdType' => $detail_pemberi->IdType,
                    'jumlah' => $detail_pemberi->jumlah
                ];
            }

            // Return the structured data as JSON
            return response()->json($data_pemberi);
        } else if ($id === 'getPenerima') {
            $penerima = DB::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian_penerima @idtransaksi = ?, @idtypetransaksi = 06, @KodeBarang = ?', [$Yidtransaksi, $kodeBarang]);
            $data_penerima = [];
            foreach ($penerima as $detail_penerima) {
                $data_penerima[] = [
                    'IdType' => $detail_penerima->IdType,
                    'jumlah' => $detail_penerima->jumlah
                ];
            }

            // dd($request->all(), $data_selectData);
            return response()->json($penerima);
        } else if ($id === 'getKonversi') {
            $konv = DB::connection('ConnInventory')->select('exec SP_1003_INV_CEK_BENANG @NamaType = ?', [$namaBarang]);
            $data_konv = [];
            foreach ($konv as $detail_konv) {
                $data_konv[] = [
                    'Result' => $detail_konv->Result,
                ];
            }

            return response()->json($konv);
        } else if ($id === 'getType') {
            $konv = DB::connection('ConnInventory')->select('exec SP_1003_INV_LIST_TYPE_BENANG @Nama = ?, @idSubKel = ?', [$namaBarang, $subkel]);
            $data_konv = [];
            foreach ($konv as $detail_konv) {
                $data_konv[] = [
                    'Result' => $detail_konv->Result,
                ];
            }

            return response()->json($konv);
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
        $YIdTrans = $request->input('YIdTrans');
        $primer = $request->input('primer');
        $sekunder = $request->input('sekunder');
        $tritier = $request->input('tritier');
        $YidType = $request->input('YidType');
        $YidTypePenerima = $request->input('YidTypePenerima');
        $user = Auth::user()->NomorUser;

        if ($id === 'proses') {
            try {
                DB::connection('ConnInventory')->statement(
                    'exec SP_proses_penerima_insert_error
                    @XIdTransaksi = ?, @XIdPenerima = ?,
                    @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?,
                    @XIdtypePemberi = ?,  @XidTypePenerima = ?',
                    [
                        $YIdTrans,
                        $user,
                        $primer,
                        $sekunder,
                        $tritier,
                        $YidType,
                        $YidTypePenerima
                    ]
                );

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);

            } catch (\Exception $e) {
                //     // return response()->json(['error' => 'Kd.Transaksi: ' .trim($YIdTrans). 'TDK DPT diACC, krn Kd.Type tidak ada pada sub kelompok tersebut!' .$e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
