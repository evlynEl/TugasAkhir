<?php
use function foo\func;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QC\QCController;
use App\Http\Controllers\Contoh\ContohController;
use App\Http\Controllers\QC\Extruder\QCExtruderBController;
use App\Http\Controllers\QC\Extruder\QCExtruderDController;
use App\Http\Controllers\QC\Afalan\QCInputAfalanController;
use App\Http\Controllers\QC\Afalan\QCKoreksiAfalanController;
use App\Http\Controllers\QC\Circular\QCCircularTropodoController;
use App\Http\Controllers\QC\Extruder\QCExtruderTropodoController;
use App\Http\Controllers\QC\Circular\QCCircularMojosariController;

use App\Http\Controllers\COA\COA\Master\MasterPartController;
use App\Http\Controllers\COA\COA\Master\MasterMaterialController;
use App\Http\Controllers\COA\COA\Master\MasterTypeController;
use App\Http\Controllers\COA\COA\ResultController;
use App\Http\Controllers\COA\COA\PrintController;
use App\Http\Controllers\COA\COA\ACCController;
use App\Http\Controllers\COA\FIBC\Input\InputDetailController;
use App\Http\Controllers\COA\FIBC\Input\InputTestController;
use App\Http\Controllers\COA\FIBC\ACC\ACCQCManController;
use App\Http\Controllers\COA\FIBC\ACC\ACCQCSpvController;
use App\Http\Controllers\COA\FIBC\FIBCPrintController;


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

    // QC
    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('QCFitur', QCController::class);

    // Route::get('InputAfalanQC', 'App\Http\Controllers\QC\Afalan\QCInputAfalanController@index');
    Route::resource('InputAfalanQC', QCInputAfalanController::class);

    Route::get('KoreksiAfalan', 'App\Http\Controllers\QC\Afalan\QCKoreksiAfalanController@index');
    // Route::resource('KoreksiAfalan', QCKoreksiAfalanController::class);

    // Route::get('CircularTropodo', 'App\Http\Controllers\QC\Circular\QCCircularTropodoController@index');
    Route::resource('CircularTropodo', QCCircularTropodoController::class);

    // Route::get('CircularMojosari', 'App\Http\Controllers\QC\Circular\QCCircularMojosariController@index');
    Route::resource('CircularMojosari', QCCircularMojosariController::class);

    // Route::get('ExtruderTropodo', 'App\Http\Controllers\QC\Extruder\QCExtruderTropodoController@index');
    Route::resource('ExtruderTropodo', QCExtruderTropodoController::class);

    // Route::get('ExtruderB', 'App\Http\Controllers\QC\Extruder\QCExtruderBController@index');
    Route::resource('ExtruderB', QCExtruderBController::class);

    // Route::get('ExtruderD', 'App\Http\Controllers\QC\Extruder\QCExtruderDController@index');
    Route::resource('ExtruderD', QCExtruderDController::class);


    // COA
    // Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmInputFIBC', InputDetailController::class);

    // Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmInputTest', InputTestController::class);

    // Route::get('FrmACCMng_FIBC', 'App\Http\Controllers\COA\FIBC\ACC\ACCQCManController@index');
    Route::resource('FrmACCMng_FIBC', ACCQCManController::class);

    // Route::get('FrmACCFIBC', 'App\Http\Controllers\COA\FIBC\ACC\ACCQCSpvController@index');
    Route::resource('FrmACCFIBC', ACCQCSpvController::class);

    Route::get('FrmPrintFIBC', 'App\Http\Controllers\COA\FIBC\FIBCPrintController@index');
    // Route::resource('FrmPrintFIBC', FIBCPrintController::class);



    //tidak dipake
    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmMasterPart', MasterPartController::class);

    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmMasterMaterial', MasterMaterialController::class);

    Route::get('FrmMasterType', 'App\Http\Controllers\COA\COA\Master\MasterTypeController@index');
    // Route::resource('FrmMasterType', MasterTypeController::class);

    Route::get('FrmResult', 'App\Http\Controllers\COA\COA\ResultController@index');
    // Route::resource('FrmResult', ResultController::class);

    Route::get('FrmPrintResult', 'App\Http\Controllers\COA\COA\PrintController@index');
    // Route::resource('FrmPrintResult', PrintController::class);

    Route::get('FrmACCResult', 'App\Http\Controllers\COA\COA\ACCController@index');
    Route::resource('FrmACCResult', ACCController::class);


});
