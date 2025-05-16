<?php

namespace App\Http\Controllers\Monitor;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Http;
use Svg\Tag\Rect;

class JadwalMesinController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('JadwalMesin'); //tidak perlu menu di navbar
        // dd($access);
        return view('Monitor.JadwalMesin', compact('access'));
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        $Lebar = $request->input('Lebar');
        $RjtWA = $request->input('RjtWA');
        $Denier = $request->input('Denier');
        $Corak = $request->input('Corak');

        if ($id === 'getCocok') {

            function bersihkanTeks($teks) {
                if (is_null($teks)) return '';
                $teks = (string) $teks;
                $teks = preg_replace('/[.\-\s]/', '', $teks);
                $teks = strtoupper($teks);
                $teks = str_replace(['BLHKK', 'BLHTENGAH'], '', $teks);
                return trim($teks);
            }

            $Corak = bersihkanTeks($Corak);

            $data = DB::connection('ConnCircular')->table('vw_type_barang')
                    ->select('D_TEK0', 'D_TEK1', 'D_TEK2', 'D_TEK4', 'D_TEK5')
                    ->get();

            $cocok = null;

            foreach ($data as $row) {
                if (
                    floatval($row->D_TEK1) == floatval($Lebar) &&
                    floatval($row->D_TEK2) == floatval($RjtWA) &&
                            $row->D_TEK4 == $Denier &&
                    bersihkanTeks($row->D_TEK5) === $Corak
                ) {
                    $cocok = $row->D_TEK0;
                    break;
                }
            }

            // dd($cocok);
            return response()->json(['NoOrder' => $cocok]);
        }

        else if ($id === 'getNoorder') {
            $noOrder = DB::connection('ConnPurchase')->select('exec Sp_Mohon_Beli @MyType = 7');
            $data_noOrder = [];
            foreach ($noOrder as $detail_noOrder) {
                $data_noOrder[] = [
                    // 'KD_BRG' => $detail_noOrder->KD_BRG,
                    'D_TEK0' => $detail_noOrder->D_TEK0,
                    'NAMA_BRG' => $detail_noOrder->NAMA_BRG
                ];
            }
            return datatables($noOrder)->make(true);
        }

        else if ($id == 'getHighestCL') {
            $cl1 = DB::connection('mysql_cl1')->table('set_15m')
                ->select('Date_Time', 'Real_Power')
                ->orderByDesc('Date_Time') // Urutkan berdasarkan waktu
                ->get();

            // dd($cl1);

            return response()->json($cl1->toArray());
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }
}
