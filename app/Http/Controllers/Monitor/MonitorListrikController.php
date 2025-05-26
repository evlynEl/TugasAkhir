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
                return collect($data)
                    ->groupBy(function ($item) {
                        return \Carbon\Carbon::parse($item->Date_Time)->format('Y-m-d H:00:00');
                    })
                    ->map(function ($group) {
                        return $group->sum('Real_Power');
                    });
            };

            switch ($jenis) {
                case 'CL1':
                    $cl1 = DB::connection('mysql_cl1')->table('set_15m')->select('Date_Time', 'Real_Power')->get();
                    $data = $getDataPerJam($cl1)->map(function ($value, $key) {
                        return [
                            'Date_Time' => $key,
                            'Real_Power' => $value
                        ];
                    })->values();
                    return response()->json($data);

                case 'CL2':
                    $cl2 = DB::connection('mysql_cl2')->table('set_15m2')->select('Date_Time', 'Real_Power')->get();
                    $data = $getDataPerJam($cl2)->map(function ($value, $key) {
                        return [
                            'Date_Time' => $key,
                            'Real_Power' => $value
                        ];
                    })->values();
                    return response()->json($data);

                case 'CL3':
                    $cl3 = DB::connection('mysql_cl3')->table('set_15m3')->select('Date_Time', 'Real_Power')->get();
                    $data = $getDataPerJam($cl3)->map(function ($value, $key) {
                        return [
                            'Date_Time' => $key,
                            'Real_Power' => $value
                        ];
                    })->values();
                    return response()->json($data);

                // case 'CL4':
                //     $cl3 = DB::connection('mysql_cl4')->table('set_15m4')->select('Date_Time', 'Real_Power')->get();
                //     $data = $getDataPerJam($cl3)->map(function ($value, $key) {
                //         return [
                //             'Date_Time' => $key,
                //             'Real_Power' => $value
                //         ];
                //     })->values();
                //     return response()->json($data);

                case 'total4CL':
                default:
                    $cl1 = DB::connection('mysql_cl1')->table('set_15m')->select('Date_Time', 'Real_Power')->get();
                    $cl2 = DB::connection('mysql_cl2')->table('set_15m2')->select('Date_Time', 'Real_Power')->get();
                    $cl3 = DB::connection('mysql_cl3')->table('set_15m3')->select('Date_Time', 'Real_Power')->get();
                    // $cl4 = DB::connection('mysql_cl4')->table('set_15m')->select('Date_Time', 'Real_Power')->get();


                    $aggCL1 = $getDataPerJam($cl1);
                    $aggCL2 = $getDataPerJam($cl2);
                    $aggCL3 = $getDataPerJam($cl3);
                    // $aggCL4 = $getDataPerJam($cl4);

                    // Gabungkan per jam
                    $total = $aggCL1->mergeRecursive($aggCL2)->mergeRecursive($aggCL3)
                        ->reduce(function ($carry, $value, $key) use ($aggCL1, $aggCL2, $aggCL3) {
                            $carry[$key] = ($aggCL1[$key] ?? 0) + ($aggCL2[$key] ?? 0) + ($aggCL3[$key] ?? 0);  //+ ($aggCL4[$key] ?? 0);
                            return $carry;
                        }, []);

                    ksort($total);

                    $data = collect($total)->map(function ($value, $key) {
                        return [
                            'Date_Time' => $key,
                            'Real_Power' => $value
                        ];
                    })->values();

                    // dd($data);

                    return response()->json($data);
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
