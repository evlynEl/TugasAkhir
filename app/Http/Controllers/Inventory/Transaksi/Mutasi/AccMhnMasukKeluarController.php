<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccMhnMasukKeluarController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.MasukKeluar.AccMhnMasukKeluar', compact('access'));
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
        $mutasi = $request->input('mutasi');
        $uraian = $request->input('uraian');

        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        } else if ($id === 'getDivisi') {
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
            // dd($objek, $request->all());
            return datatables($objek)->make(true);
        } else if ($id === 'getData') {
            // mendapatkan isi tabel
            $justData = DB::connection('ConnInventory')->select('
            SP_1003_INV_List_BelumACC_TmpTransaksi @Kode = 13, @XIdTypeTransaksi = ?, @XUraian = ?, @XIdobjek = ?', ['13', $mutasi, $objekId]);

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

                if ($mutasi === 'Mutasi Masuk') {
                    $data_entry['JumlahPemasukanPrimer'] = $detail_justData->JumlahPemasukanPrimer;
                    $data_entry['JumlahPemasukanSekunder'] = $detail_justData->JumlahPemasukanSekunder;
                    $data_entry['JumlahPemasukanTritier'] = $detail_justData->JumlahPemasukanTritier;
                } else if ($mutasi === 'Mutasi Keluar') {
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
        $penerima = $request->input('penerima');
        $idTransaksi = $request->input('idTransaksi');
        $idType = $request->input('idType');
        $checked = $request->input('checked');
        $primer = $request->input('primer');
        $sekunder = $request->input('sekunder');
        $tritier = $request->input('tritier');
        $responses = [];

        if ($id === 'accMutasi') {
            try {
                foreach ($idTransaksi as $index => $transaksi) {
                    $type = $idType[$index];
                    $primerValue = $primer[$index];
                    $sekunderValue = $sekunder[$index];
                    $tritierValue = $tritier[$index];

                    // Proses
                    $proses = DB::connection('ConnInventory')->select(
                        'exec SP_1003_INV_CHECK_PENYESUAIAN_TRANSAKSI @idtype = ?, @idtypetransaksi = ?',
                        [$type, $transaksi]
                    );

                    $jumlah = (int)$proses[0]->jumlah;

                    if ($jumlah > 0) {
                        return response()->json(['warning' => 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type ' . $transaksi], 200);
                    } else {
                        if ($checked) {
                            DB::connection('ConnInventory')->statement(
                                'exec SP_1003_INV_Proses_Acc_Mutasi_masuk @IdTransaksi = ?, @idPenerima = ?, @JumlahMasukPrimer = ?,@JumlahMasukSekunder = ?, @JumlahMasukTritier = ?',
                                [$transaksi, $penerima, $primerValue, $sekunderValue, $tritierValue]
                            );
                            $responses[] = 'Data ' . $transaksi . ' sudah disimpan';
                        } else if (!$checked) {
                            DB::connection('ConnInventory')->statement(
                                'exec SP_1003_INV_Proses_Acc_Mutasi_Keluar @IdTransaksi = ?, @idPenerima = ?, @JumlahKeluarPrimer = ?,@JumlahKeluarSekunder = ?, @JumlahKeluarTritier = ?',
                                [$transaksi, $penerima, $primerValue, $sekunderValue, $tritierValue]
                            );
                            $responses[] = 'Data ' . $transaksi . ' sudah disimpan';
                        }
                    }
                }

                $responseText = implode('<br>', $responses);
                // dd($responseText);
                return response()->json(['success' => $responseText], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diACC'], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
