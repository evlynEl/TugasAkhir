<?php

namespace App\Http\Controllers\QC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;

class QCController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        $data = 'Goyang dulu';
        return view('QC.Afalan.KoreksiAfalan', compact('data', 'access'));
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
