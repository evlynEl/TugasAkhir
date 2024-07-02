<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransBL;
use App\User;
use DB;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // $AccessProgram=DB::connection('ConnEDP')->table('User_Fitur')->select('NamaProgram')->join('FiturMaster','Id_Fitur','IdFitur')->join('ProgramMaster','Id_Program','IdProgram')->groupBy('NamaProgram')->where('Id_User',Auth::user()->IDUser)->get();
        $AccessProgram = DB::connection('ConnEDP')->table('User_Fitur')
            ->select('NamaProgram', 'RouteProgram')
            ->join('FiturMaster', 'Id_Fitur', 'IdFitur')
            ->join('MenuMaster', 'Id_Menu', 'IdMenu')
            ->join('ProgramMaster', 'Id_Program', 'IdProgram')
            ->groupBy('NamaProgram', 'RouteProgram')
            ->where('Id_User', Auth::user()->IDUser)
            ->OrWhere('Id_User', 218)->get();
        // dd($AccessProgram);
        return view('home', compact('AccessProgram'));
    }
    public function Contoh()
    {
        $result = (new HakAksesController)->HakAksesProgram('Contoh');
        $access = (new HakAksesController)->HakAksesFiturMaster('Contoh');
        if ($result > 0) {
            return view('layouts.appContoh', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Contoh!');
        }
    }

    public function QC()
    {
        $result = (new HakAksesController)->HakAksesProgram('QC');
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        if ($result > 0) {
            return view('layouts.appQC', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Contoh!');
        }
    }

    public function QCInputAfalan()
    {
        $result = (new HakAksesController)->HakAksesProgram('QC');
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        if ($result > 0) {
            return view('layouts.appQC', compact('access'));
        }
    }
    
    public function COA()
    {
        $result = (new HakAksesController)->HakAksesProgram('COA');
        $access = (new HakAksesController)->HakAksesFiturMaster('COA');
        if ($result > 0) {
            return view('layouts.appCOA', compact('access'));
        } else {
            return redirect('home')->with('status', 'Anda Tidak Memiliki Hak Akses Program Contoh!');
        }
    }
}
