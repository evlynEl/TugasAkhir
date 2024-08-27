<?php

namespace App\Http\Controllers\Inventory\Transaksi\TerimaBenang;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class TerimaBenangTropodoController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Transaksi.TerimaBenang.TerimaBenangTropodo', compact('access'));
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
            , [$XIdSubKelompok_Type]);
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
            , [$IdType, $IdSubKel]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'NamaType' => $detail_subkel->NamaType,
                    'IdType' => $detail_subkel->IdType,
                    'PIB' => $detail_subkel->PIB,
                ];
            }
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
        // 
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        // 
    }
}
