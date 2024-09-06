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

        return redirect()->route('FormAccMhnPenerima.index')->with('alert', 'Data berhasil ditambahkan!');
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
        $user = Auth::user()->NomorUser;

        if ($id === 'accHibah') {
            $YIdTransaksi = $request->input('YIdTransaksi');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_PROSES_ACC_HIBAH]
                    @kode = ?, @UserACC = ?, @YIdTransaksi = ?',
                        [
                            1, $user, $YIdTransaksi,
                        ]
                    );

                return response()->json(['success' => 'Data berhasil diACC'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diACC: ' . $e->getMessage()], 500);
            }
        }

        if ($id === 'batalAccHibah') {
            $YIdTransaksi = $request->input('YIdTransaksi');

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_Batal_AccManager_TmpTransaksi]
                    @kode = ?, @YIdTransaksi = ?',
                        [
                            4, $YIdTransaksi,
                        ]
                    );

                return response()->json(['success' => 'Data berhasil dibatalkan'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal dibatalkan: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
