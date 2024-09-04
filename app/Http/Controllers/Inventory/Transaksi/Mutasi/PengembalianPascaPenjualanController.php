<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PengembalianPascaPenjualanController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.KeluarMasukKRR.PengembalianPascaPenjualan', compact('access'));
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
    public function show(Request $request, $id)
    {
        $UserInput = Auth::user()->NomorUser;
        $UserInput = trim($UserInput);

        if ($id === 'loadData') {
            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_List_Mohon_TmpTransaksi]
           @Kode = ?, @XIdTypeTransaksi = ?, @Xuser = ?', [9, '16', $UserInput]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'SaatAwalTransaksi' => $detail_divisi->SaatAwalTransaksi,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'JumlahPemasukanPrimer' => $detail_divisi->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_divisi->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_divisi->JumlahPemasukanTritier,
                    'IdType' => $detail_divisi->IdType,
                ];
            }

            return response()->json($data_divisi);
        } else if ($id === 'tampilData') {
            $IDTransaksi = $request->input('IDTransaksi');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_List_TmpTransaksi]
           @IDTransaksi = ?, @type = ?', [$IDTransaksi, 5]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'NamaObjek' => $detail_divisi->NamaObjek,
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama,
                    'NamaKelompok' => $detail_divisi->NamaKelompok,
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok,
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'IdSubkelompok' => $detail_divisi->IdSubkelompok,
                ];
            }

            return response()->json($data_divisi);
        } else if ($id === 'cekSesuai') {
            $idtransaksi = $request->input('idtransaksi');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_check_penyesuaian_transaksi]
           @Kode = ?, @idtransaksi = ?, @idtypetransaksi = ?', [1, $idtransaksi, '06']);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jumlah' => $detail_divisi->jumlah,
                ];
            }

            return response()->json($data_divisi);
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
        if ($id == 'proses') {
            // dd($request->all());
            $IDtransaksi = $request->input('IDtransaksi');
            $IdType = $request->input('IdType');
            $MasukPrimer = $request->input('MasukPrimer');
            $MasukSekunder = $request->input('MasukSekunder');
            $MasukTritier = $request->input('MasukTritier');
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_Proses_Acc_Retur_Pasca]
                @IDtransaksi = ?,
                @IdType = ?,
                @IDPenerima = ?,
                @MasukPrimer = ?,
                @MasukSekunder = ?,
                @MasukTritier = ?
                ', [
                        $IDtransaksi,
                        $IdType,
                        $UserInput,
                        $MasukPrimer,
                        $MasukSekunder,
                        $MasukTritier,
                    ]);
                return response()->json(['success' => 'Data sudah terSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal terSIMPAN: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        // 
    }
}
