<?php

namespace App\Http\Controllers\COA\COA\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class MasterTypeController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'MasterType';
        return view('COA.Master.MasterType', compact('data', 'access'));
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
        if ($id === 'getCustomer') {
            $cust = DB::connection('ConnSales')->select('exec [SP_1486_SLS_LIST_CUSTOMER] @kode = ?', [4]);
            $data_list = [];
            foreach ($cust as $data_cust) {
                $data_list[] = [
                    'NamaCust' => $data_cust->NamaCust,
                    'IdCust' => $data_cust->IdCust,
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
