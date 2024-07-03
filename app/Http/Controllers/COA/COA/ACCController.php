<?php

namespace App\Http\Controllers\COA\COA;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;

class ACCController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        $data = 'ACC';
        return view('COA.COAACC', compact('data', 'access'));
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
        //
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
