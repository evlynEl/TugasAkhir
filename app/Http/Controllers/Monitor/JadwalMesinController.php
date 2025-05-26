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
                ->orderByDesc('Date_Time')
                ->get();

            $cl2 = DB::connection('mysql_cl2')->table('set_15m2')
                ->select('Date_Time', 'Real_Power')
                ->orderByDesc('Date_Time')
                ->get();

            $cl3 = DB::connection('mysql_cl3')->table('set_15m3')
                ->select('Date_Time', 'Real_Power')
                ->orderByDesc('Date_Time')
                ->get();

            // $cl4 = DB::connection('mysql_cl4')->table('set_15m4')
            //     ->select('Date_Time', 'Real_Power')
            //     ->orderByDesc('Date_Time')
            //     ->get();

            return response()->json([
                'CL1' => $cl1->toArray(),
                'CL2' => $cl2->toArray(),
                'CL3' => $cl3->toArray(),
                // 'CL4' => $cl3->toArray(),
            ]);
        }

        
        else if ($id == 'dayaHemat') {
            $maxCL = $request->input('maxCL');

            if (!$maxCL) {
                return response()->json(['error' => 'maxCL is required'], 400);
            }

            $connectionMap = [
                'CL1' => ['db' => 'mysql_cl1', 'interval' => 60, 'table' => 'set_15m'],
                'CL2' => ['db' => 'mysql_cl2', 'interval' => 30, 'table' => 'set_15m2'],
                'CL3' => ['db' => 'mysql_cl3', 'interval' => 30, 'table' => 'set_15m3'],
            ];

            if (!isset($connectionMap[$maxCL])) {
                return response()->json(['error' => 'Unknown CL name'], 400);
            }

            $connInfo = $connectionMap[$maxCL];
            $intervalMinutes = $connInfo['interval'];
            $intervalHours = $intervalMinutes / 60;

            $data = DB::connection($connInfo['db'])
                ->table($connInfo['table'])
                ->select('Date_Time', 'Real_Power')
                ->orderByDesc('Date_Time')
                ->get();

            $groupedByDate = [];

            foreach ($data as $row) {
                $dateOnly = substr($row->Date_Time, 0, 10);
                if (!isset($groupedByDate[$dateOnly])) {
                    $groupedByDate[$dateOnly] = [];
                }
                $groupedByDate[$dateOnly][] = floatval($row->Real_Power);
            }

            $dayPowerPerHour = [];

            foreach ($groupedByDate as $date => $powers) {
                $totalPower = array_sum($powers);
                $numRecords = count($powers);
                $totalHours = $numRecords * $intervalHours;

                if ($totalHours > 0) {
                    $powerPerHour = $totalPower / $totalHours;
                    $dayPowerPerHour[] = $powerPerHour;
                }
            }

            $averagePerHour = count($dayPowerPerHour) > 0 ? array_sum($dayPowerPerHour) / count($dayPowerPerHour) : 0;

            $result = [
                'cl' => $maxCL,
                'average_power_per_hour' => round($averagePerHour, 3),
                'average_power_per_minute' => round($averagePerHour / 60, 4)
            ];

            return response()->json($result);
        }



        // else if ($id == 'dayaHemat') {
        //     $maxCL = $request->input('maxCL');

        //     if (!$maxCL) {
        //         return response()->json(['error' => 'maxCL is required'], 400);
        //     }

        //     $connectionMap = [
        //         'CL1' => ['db' => 'mysql_cl1', 'interval' => 60, 'table' => 'set_15m'],
        //         'CL2' => ['db' => 'mysql_cl2', 'interval' => 30, 'table' => 'set_15m2'],
        //         'CL3' => ['db' => 'mysql_cl3', 'interval' => 30, 'table' => 'set_15m3'],
        //         // 'CL4' => ['db' => 'mysql_cl4', 'interval' => 30, 'table' => 'set_15m4'],
        //     ];


        //     if (!isset($connectionMap[$maxCL])) {
        //         return response()->json(['error' => 'Unknown CL name'], 400);
        //     }

        //     $connInfo = $connectionMap[$maxCL];
        //     $intervalMinutes = $connInfo['interval'];
        //     $intervalHours = $intervalMinutes / 60;

        //     $data = DB::connection($connInfo['db'])
        //         ->table($connInfo['table'])
        //         ->select('Date_Time', 'Real_Power')
        //         ->orderByDesc('Date_Time')
        //         ->get();


        //     $totalEnergy = 0;
        //     foreach ($data as $row) {
        //         $totalEnergy += floatval($row->Real_Power); // sudah dalam kWh
        //     }

        //     $count = count($data);
        //     $totalHours = $count * $intervalHours;

        //     $averagePerHour = $totalHours > 0 ? $totalEnergy / $totalHours : 0;

        //     $result = [
        //         'cl' => $maxCL,
        //         'average_power_per_hour' => round($averagePerHour, 3),
        //         'average_power_per_minute' => round($averagePerHour / 60, 4)
        //     ];

        //     return response()->json($result);
        // }

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
