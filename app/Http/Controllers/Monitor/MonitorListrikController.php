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
        //         ->table('dbo.KWH')
        //         ->select('*')
        //         ->get();


        //     $data_kwh = [];
        //     foreach ($kwh as $detailRef) {
        //         $data_kwh[] = [
        //             'Tanggal'   => $detailRef->Tanggal,
        //             'CL1_Jml'   => $detailRef->CL1_Jml,
        //             'CL2_Jml'   => $detailRef->CL2_Jml,
        //             'CL3_Jml'   => $detailRef->CL3_Jml,
        //             'CL4_Jml'   => $detailRef->CL4_Jml
        //         ];
        //     }
        //     dd($data_kwh);
        //     return response()->json($data_kwh);
        // }

        // else
        if ($id == 'getKwh2') {
            $kwh = DB::connection('ConnCircular')
                ->table('dbo.MikroCL1')
                ->select(DB::raw('[Power (kWatt)] as Power'), 'Date')
                ->get();

            $data_kwh = [];
            foreach ($kwh as $detailRef) {
                $data_kwh[] = [
                    'Date'  => $detailRef->Date,
                    'Power' => $detailRef->Power,
                    'Power2' => $detailRef->Power2,
                    'Power3' => $detailRef->Power3,
                    'Power4' => $detailRef->Power4
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
