<?php

namespace App\Http\Controllers\Monitor;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MonitorListrikController extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('MonitorListrik'); //tidak perlu menu di navbar
        return view('Monitor.MonitorListrik', compact('access'));
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
        // if ($id == 'getKwh') {
        //     $kwh = DB::connection('ConnCircular')
        //         ->table('dbo.VW_4384_PANEL_SDP_LARAVEL')
        //         ->select('*')
        //         ->whereIn('dbo.VW_4384_PANEL_SDP_LARAVEL.NoProduksi', [14, 2, 4, 7])
        //         ->where('dbo.VW_4384_PANEL_SDP_LARAVEL.Tanggal', '>=', '2022-01-01')
        //         ->get();


        //     $data_kwh = [];
        //     foreach ($kwh as $detailRef) {
        //         $data_kwh[] = [
        //             'Produksi'   => $detailRef->Produksi,
        //             'NoProduksi' => $detailRef->NoProduksi,
        //             'Tanggal'    => $detailRef->Tanggal,
        //             'KWH'        => $detailRef->KWH
        //         ];
        //     }
        //     // dd($data_kwh);
        //     return response()->json($data_kwh);
        // }

        if ($id == 'getKwh') {
            $kwh = DB::connection('ConnCircular')
                ->table('dbo.MikroCL1')
                ->select(DB::raw('[Power (kWatt)] as Power'), 'Date')
                ->get();

            $data_kwh = [];
            foreach ($kwh as $detailRef) {
                $data_kwh[] = [
                    'Date'  => $detailRef->Date,
                    'Power' => $detailRef->Power
                ];
            }
            // dd($data_kwh);
            return response()->json($data_kwh);
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
