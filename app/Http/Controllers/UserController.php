<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        if (Auth::user()->IsAdmin != 1) {
            abort(404);
        } else {
            $data = User::select()->where("NomorUser", "!=", "")->get();
            return view('User.List', compact('data', 'access'));
        }

    }

    public function store(Request $request)
    {

    }
    public function show($id)
    {

    }

    public function update(Request $request, $id)
    {
        if (Auth::user()->IsAdmin != 1) {
            abort(404);
        } else {
            User::where('NomorUser', $id)->update(['password' => Hash::make($request->get('editPassword'))]);
            return back();
        }
    }

    public function EditAdmin(Request $request, $id)
    {
        if (Auth::user()->IsAdmin != 1) {
            abort(404);
        } else {
            $cek = User::select('IsAdmin')->where('NomorUser', $id)->first();
            if ($cek->is_Admin == 1) {
                User::where('NomorUser', $id)->update(['IsAdmin' => '0']);
            } else {
                User::where('NomorUser', $id)->update(['IsAdmin' => '1']);
            }
            return back();
        }
    }

    public function destroy($id)
    {

    }
}
