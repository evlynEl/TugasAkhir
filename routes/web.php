<?php
use function foo\func;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QC\QCController;
use App\Http\Controllers\Contoh\ContohController;
use App\Http\Controllers\QC\QCExtruderBController;
use App\Http\Controllers\QC\QCExtruderDController;
use App\Http\Controllers\QC\QCInputAfalanController;
use App\Http\Controllers\QC\QCKoreksiAfalanController;
use App\Http\Controllers\QC\QCCircularTropodoController;
use App\Http\Controllers\QC\QCExtruderTropodoController;
use App\Http\Controllers\QC\QCCircularMojosariController;

use App\Http\Controllers\COA\COA\Master\MasterPartController;
use App\Http\Controllers\COA\COA\Master\MasterMaterialController;
use App\Http\Controllers\COA\COA\Master\MasterTypeController;
use App\Http\Controllers\COA\COA\ResultController;
use App\Http\Controllers\COA\FIBC\Input\InputDetailController;
use App\Http\Controllers\COA\FIBC\Input\InputTestController;
use App\Http\Controllers\COA\FIBC\ACC\ACCQCManController;
use App\Http\Controllers\COA\FIBC\ACC\ACCQCSpvController;


use function PHPUnit\Framework\assertDirectoryIsReadable;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    if (Auth::guest())
        return view('auth/login');
    else
        return redirect('/home');
});

//Auth::routes();

Route::get('/login', 'App\Http\Controllers\LoginController@index')->name('login');
Route::post('Register', 'App\Http\Controllers\LoginController@Register')->name('register');
Route::post('login', 'App\Http\Controllers\LoginController@login');
Route::post('/logout', 'App\Http\Controllers\LoginController@logout')->name('logout');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', 'App\Http\Controllers\HomeController@index')->name('home');

    Route::get('Contoh', 'App\Http\Controllers\HomeController@Contoh');
    Route::resource('ContohFitur', ContohController::class);

    // QC
    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('QCFitur', QCController::class);

    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('InputAfalanQC', QCInputAfalanController::class);

    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('KoreksiAfalanQC', QCKoreksiAfalanController::class);

    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('CircularTropodo', QCCircularTropodoController::class);

    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('CircularMojosari', QCCircularMojosariController::class);

    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('ExtruderTropodo', QCExtruderTropodoController::class);

    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('ExtruderB', QCExtruderBController::class);

    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('ExtruderD', QCExtruderDController::class);


    // COA
    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmMasterPart', MasterPartController::class);

    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmMasterMaterial', MasterMaterialController::class);
    
    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmMasterType', MasterTypeController::class);

    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmInputFIBC', InputDetailController::class);

    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmInputTest', InputTestController::class);

    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmACCMng_FIBC', ACCQCManController::class);

    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmACCFIBC', ACCQCSpvController::class);

    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmResult', ResultController::class);
});
