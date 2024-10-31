<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class KeluarBarangUntukPenjualanController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.KeluarMasukKRR.KeluarBarangUntukPenjualan', compact('access'));
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

        if ($id === 'tampilListBarang') {
            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_LIST_JUAL_TMPTRANSAKSI]
           @User = ?', [$UserInput]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdTransaksi' => $detail_divisi->IdTransaksi,
                    'NamaType' => $detail_divisi->NamaType,
                    'Primer' => $detail_divisi->Primer,
                    'Sekunder' => $detail_divisi->Sekunder,
                    'Tritier' => $detail_divisi->Tritier,
                    'IdType' => $detail_divisi->IdType,
                ];
            }

            return response()->json($data_divisi);
        }

        // cek
        else if ($id === 'cekSesuaiPemberi') {
            $idtransaksi = $request->input('idtransaksi');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_check_penyesuaian_transaksi]
           @Kode = ?, @idtransaksi = ?, @idtypetransaksi = ?', [1, $idtransaksi, '06']);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jumlah' => $detail_divisi->jumlah
                ];
            }

            return response()->json($data_divisi);
        }

        // detail
        else if ($id === 'tampilData') {
            $IDTransaksi = $request->input('IDTransaksi');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_LIST_JUAL_TMPTRANSAKSI]
           @IDTransaksi = ?, @User = ?', [$IDTransaksi, $UserInput]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdTransaksi' => $detail_divisi->IdTransaksi, // dbo.Tmp_Transaksi.IdTransaksi
                    'IdType' => $detail_divisi->IdType, // dbo.Tmp_Transaksi.IdType
                    'NamaType' => $detail_divisi->NamaType, // dbo.Type.NamaType
                    'Primer' => $detail_divisi->Primer, // dbo.Tmp_Transaksi.JumlahPengeluaranPrimer
                    'Sekunder' => $detail_divisi->Sekunder, // dbo.Tmp_Transaksi.JumlahPengeluaranSekunder
                    'Tritier' => $detail_divisi->Tritier, // dbo.Tmp_Transaksi.JumlahPengeluaranTritier
                    'satuanPrimer' => $detail_divisi->satuanPrimer, // SatuanPrimer.nama_satuan
                    'satuanSekunder' => $detail_divisi->satuanSekunder, // SatuanSekunder.nama_satuan
                    'SatuanTritier' => $detail_divisi->SatuanTritier, // SatuanTritier.nama_satuan
                    'IdSubkelompok' => $detail_divisi->IdSubkelompok, // dbo.Subkelompok.IdSubkelompok
                    'NamaSubKelompok' => $detail_divisi->NamaSubKelompok, // dbo.Subkelompok.NamaSubKelompok
                    'NamaKelompok' => $detail_divisi->NamaKelompok, // dbo.Kelompok.NamaKelompok
                    'NamaKelompokUtama' => $detail_divisi->NamaKelompokUtama, // dbo.KelompokUtama.NamaKelompokUtama
                    'NamaObjek' => $detail_divisi->NamaObjek, // dbo.Objek.NamaObjek
                    'NamaDivisi' => $detail_divisi->NamaDivisi, // dbo.Divisi.NamaDivisi
                    'IdKelompok' => $detail_divisi->IdKelompok, // dbo.Kelompok.IdKelompok
                    'IdKelompokUtama' => $detail_divisi->IdKelompokUtama, // dbo.KelompokUtama.IdKelompokUtama
                    'IdObjek' => $detail_divisi->IdObjek, // dbo.Objek.IdObjek
                    'IdDivisi' => $detail_divisi->IdDivisi, // dbo.Divisi.IdDivisi
                    'SaldoPrimer' => $detail_divisi->SaldoPrimer, // dbo.Type.SaldoPrimer
                    'SaldoSekunder' => $detail_divisi->SaldoSekunder, // dbo.Type.SaldoSekunder
                    'SaldoTritier' => $detail_divisi->SaldoTritier, // dbo.Type.SaldoTritier
                    'NamaCust' => $detail_divisi->NamaCust, // SALES.dbo.VW_PRG_1486_SLS_DO_INV.NamaCust
                    'NO_PO' => $detail_divisi->NO_PO, // SALES.dbo.VW_PRG_1486_SLS_DO_INV.NO_PO
                    'Tgl_PO' => $detail_divisi->Tgl_PO, // SALES.dbo.VW_PRG_1486_SLS_DO_INV.Tgl_PO
                    'IDSuratPesanan' => $detail_divisi->IDSuratPesanan, // SALES.dbo.VW_PRG_1486_SLS_DO_INV.IDSuratPesanan
                    'MaxKirimDO' => $detail_divisi->MaxKirimDO, // SALES.dbo.VW_PRG_1486_SLS_DO_INV.MaxKirimDO
                    'MinKirimDO' => $detail_divisi->MinKirimDO, // SALES.dbo.VW_PRG_1486_SLS_DO_INV.MinKirimDO
                    'SatuanJual' => $detail_divisi->SatuanJual, // SALES.dbo.VW_PRG_1486_SLS_DO_INV.SatuanJual
                    'KodeUser' => $detail_divisi->KodeUser, // dbo.UserObjek.KodeUser
                    'TglDO' => $detail_divisi->TglDO, // SALES.dbo.VW_PRG_1486_SLS_DO_INV.TglDO
                    'Status' => $detail_divisi->Status, // dbo.Tmp_Transaksi.Status
                    'KodeBarang' => $detail_divisi->KodeBarang, // dbo.Type.KodeBarang
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
            $JumlahKeluarPrimer = $request->input('JumlahKeluarPrimer');
            $JumlahKeluarSekunder = $request->input('JumlahKeluarSekunder');
            $JumlahKeluartritier = $request->input('JumlahKeluartritier');
            $JumlahKonversi = $request->input('JumlahKonversi');
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            try {
                DB::connection('ConnInventory')
                    ->statement('exec [SP_1003_INV_Proses_Acc_Jual]
                @IDtransaksi = ?,
                @IDPemberi = ?,
                @JumlahKeluarPrimer = ?,
                @JumlahKeluarSekunder = ?,
                @JumlahKeluarTritier = ?,
                @JumlahKonversi = ?
                ', [
                        $IDtransaksi,
                        $UserInput,
                        $JumlahKeluarPrimer,
                        $JumlahKeluarSekunder,
                        $JumlahKeluartritier,
                        $JumlahKonversi,
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
