<?php

namespace App\Http\Controllers\Monitor;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Collection;

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
            $jenis = $request->input('jenis');

            $getDataPerJam = function ($data) {
                return collect($data)->groupBy(function ($item) {
                    return \Carbon\Carbon::parse($item->Date_Time)->format('Y-m-d H:00:00');
                })->map(function ($group) {
                    return $group->sum('Real_Power');
                });
            };

            switch ($jenis) {
                case 'CL1':
                    $cl1 = DB::connection('mysql_cl1')->table('set_raw')->select('Date_Time', 'Real_Power')->get();
                    return response()->json($getDataPerJam($cl1));

                case 'CL2':
                    $cl2 = DB::connection('mysql_cl2')->table('set_raw')->select('Date_Time', 'Real_Power')->get();
                    return response()->json($getDataPerJam($cl2));

                case 'CL3':
                    $cl3 = DB::connection('mysql_cl3')->table('set_raw')->select('Date_Time', 'Real_Power')->get();
                    return response()->json($getDataPerJam($cl3));

                // case 'CL4':
                //     $cl4 = DB::connection('mysql_cl4')->table('set_raw')->select('Date_Time', 'Real_Power')->get();
                //     return response()->json($getDataPerJam($cl4));

                case 'total4CL':
                default:
                    $cl1 = DB::connection('mysql_cl1')->table('set_raw')->select('Date_Time', 'Real_Power')->get();
                    $cl2 = DB::connection('mysql_cl2')->table('set_raw')->select('Date_Time', 'Real_Power')->get();
                    $cl3 = DB::connection('mysql_cl3')->table('set_raw')->select('Date_Time', 'Real_Power')->get();
                    // $cl4 = DB::connection('mysql_cl4')->table('set_raw')->select('Date_Time', 'Real_Power')->get();

                    $merged = collect($cl1)->merge($cl2)->merge($cl3);
                    return response()->json($getDataPerJam($merged));
            }
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
