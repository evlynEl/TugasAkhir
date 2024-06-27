<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Auth;
use Validator;
use Illuminate\Support\Carbon;

class LoginController extends Controller
{
    public function index()
    {
        if (Auth::guest()) {
            return view('auth.login');
        } else {
            return redirect('/home');
        }
    }

    public function login(Request $request)
    {
        $rules = [
            'username' => 'required',
            'password' => 'required'
        ];

        $messages = [
            'username.required' => 'Username wajib diisi',
            'password.required' => 'Password wajib diisi',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        $currentTime = Carbon::now();

        $currentTime->setTimezone('Asia/Bangkok');

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput($request->all);
        }
        //     $user = User::where('kd_user', $request->input('username'))->first();
        //     if(!empty($user))
        //     {
        //     	if(Hash::check($request->input('password'), $user->password)==true)
        //     	{
        // return redirect()->route('home');
        //     	}
        //     	else
        //     	{
        //     		return redirect()->route('login')->withInput()->withErrors(['error' => 'Password Salah!']);
        //     	}
        //     }
        //     else
        //     {
        //     	return redirect()->route('login')->withInput()->withErrors(['error' => 'Username tidak ditemukan!']);
        //     }


        $data = [
            'NomorUser' => $request->input('username'),
            'password' => $request->input('password'),
        ];

        Auth::attempt($data);

        if (Auth::check()) {
            DB::connection('ConnEDP')->table('UserMaster')->where('NomorUser', $request->input('username'))->update(['LastLogIn' => $currentTime]);
            return redirect()->route('home');
        } else {
            return redirect()->route('login')->withInput()->withErrors(['error' => 'Username atau Password tidak ditemukan!']);
        }
    }
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/login');
    }
    public function Register(Request $request)
    {
        // dd($request->all());
        $input = $request->input;
        $command = $request->typeCommand;
        if ($command == 'GetNomorKartu') {
            try {
                $result = DB::connection('ConnEDP')->table('UserMaster')
                    ->select('*')
                    ->where('NomorUser', $input)
                    ->get();
                if ($result->isNotEmpty()) {
                    $result = DB::connection('ConnEDP')->table('UserMaster')
                        ->select('*')
                        ->where('NomorUser', $input)
                        ->whereNotNull('password')
                        ->get();
                    if ($result->isNotEmpty()) {
                        return response()->json(['error' => 'User ' . $input . ' sudah memiliki password, Silahkan hubungi EDP untuk reset password'], 403);
                    } else {
                        return 'OK';
                    }
                } else {
                    // If no user data found, return appropriate response
                    return response()->json(['error' => 'User not found'], 404);
                }
            } catch (\Throwable $th) {
                return response()->json(['error' => 'Database query failed'], 500);
            }
        } else if ($command == 'SetPassword') {
            try {
                $user = $request->user;
                $result = DB::connection('ConnEDP')->table('UserMaster')
                    ->where('NomorUser', $user)
                    ->update(['password' => Hash::make($input)]);
                if ($result) {
                    return response()->json('success');
                } else {
                    // If no user data found, return appropriate response
                    return response()->json(['error' => 'Error']);
                }
            } catch (\Throwable $th) {
                return response()->json(['error' => 'Database query failed'], 500);
            }
        } else {
            // If typeCommand is not recognized, return appropriate response
            return response()->json(['error' => 'Invalid typeCommand'], 400);
        }
    }
}
