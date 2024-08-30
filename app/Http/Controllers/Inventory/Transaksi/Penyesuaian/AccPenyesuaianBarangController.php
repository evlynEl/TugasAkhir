<?php

namespace App\Http\Controllers\Inventory\Transaksi\Penyesuaian;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class AccPenyesuaianBarangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Penyesuaian.AccPenyesuaianBarang', compact('access'));
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
