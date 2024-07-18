<?php

namespace App\Http\Controllers\COA\FIBC\Input;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;


class InputTestController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'InputTest';
        return view('COA.Input.InputTest', compact('data', 'access'));
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
        if ($id == 'getRef') {
            $refNo = DB::connection('ConnTestQC')->select('exec [SP_1273_QTC_MAINT_FIBC] @kode = ?', [9]);
            $data_Ref = [];
            foreach ($refNo as $detailRef) {
                $data_Ref[] = [
                    'Reference_No' => $detailRef->Reference_No,
                    'Customer' => $detailRef->Customer
                ];
            }
            return datatables($data_Ref)->make(true);
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
