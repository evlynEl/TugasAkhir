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
        if ($id == 'getCL1') {
            $data_cl = DB::connection('mysql_cl1')->table('set_raw')
            ->select('Date_Time', 'Device_ID', 'Current_Avg', 'Voltage_LN_Avg', 'Active_Power_Total', 'Real_Power')
            ->get();

            // dd($data_cl);
            return response()->json($data_cl);
        }

        else if ($id == 'getCL2') {
            $data_cl = DB::connection('mysql_cl2')->table('set_raw2')
            ->select('Date_Time', 'Device_ID', 'Current_Avg', 'Voltage_LN_Avg', 'Active_Power_Total', 'Real_Power')
            ->get();

            // dd($data_cl);
            return response()->json($data_cl);
        }

        else if ($id == 'getCL3') {
            $data_cl = DB::connection('mysql_cl3')->table('set_raw3')
            ->select('Date_Time', 'Device_ID', 'Current_Avg', 'Voltage_LN_Avg', 'Active_Power_Total', 'Real_Power')
            ->get();

            // dd($data_cl);
            return response()->json($data_cl);
        }

        else if ($id == 'getTotalCL') {
            $cl1 = DB::connection('mysql_cl1')->table('set_15m')
                ->select('Date_Time', 'Real_Power')
                ->orderByDesc('Date_Time') // Urutkan berdasarkan waktu
                ->get();

            // dd($cl1);

            return response()->json($cl1);
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
