<?php

namespace App\Http\Controllers\COA\FIBC\Input;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class InputDetailController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'InputDetail';
        return view('COA.Input.InputDetail', compact('data', 'access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        if ($id == 'GetReff') {
            $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @Kode = ?', [2]);
            $data_list = [];
            foreach ($refNo as $refno) {
                $data_list[] = [
                    'Reference No' => $refno->Reference_No,
                    'Tanggal' => $refno->Tanggal,
                ];
            }
            return datatables($data_list)->make(true);
        }
        elseif ($id == 'GetBagCode') {
            $bagCode = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_LIST_FIBC] @Kode = ?', [1]);
            $data_list = [];
            // dd($bagCode);
            foreach ($bagCode as $bagCode) {
                $data_list[] = [
                    'Reference No' => $bagCode->Reference_No,
                    'Bag Code' => $bagCode->Bag_Code,
                ];
            }
            return datatables($data_list)->make(true);
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
