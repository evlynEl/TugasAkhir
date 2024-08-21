<?php
use function foo\func;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QC\QCController;
use App\Http\Controllers\COA\COA\ACCController;
use App\Http\Controllers\COA\COA\PrintController;
use App\Http\Controllers\Contoh\ContohController;
use App\Http\Controllers\COA\COA\ResultController;
use App\Http\Controllers\COA\FIBC\FIBCPrintController;
use App\Http\Controllers\Laporan\LaporanStokController;
use App\Http\Controllers\Laporan\LaporanSaldoController;
use App\Http\Controllers\COA\FIBC\ACC\ACCQCManController;

use App\Http\Controllers\COA\FIBC\ACC\ACCQCSpvController;
use function PHPUnit\Framework\assertDirectoryIsReadable;
use App\Http\Controllers\QC\Afalan\QCInputAfalanController;
use App\Http\Controllers\QC\Extruder\QCExtruderBController;
use App\Http\Controllers\QC\Extruder\QCExtruderDController;
use App\Http\Controllers\COA\FIBC\Input\InputTestController;
use App\Http\Controllers\COA\COA\Master\MasterPartController;
use App\Http\Controllers\COA\COA\Master\MasterTypeController;
use App\Http\Controllers\QC\Afalan\QCKoreksiAfalanController;
use App\Http\Controllers\COA\FIBC\Input\InputDetailController;
use App\Http\Controllers\COA\COA\Master\MasterMaterialController;


use App\Http\Controllers\QC\Circular\QCCircularTropodoController;
use App\Http\Controllers\QC\Extruder\QCExtruderTropodoController;
use App\Http\Controllers\QC\Circular\QCCircularMojosariController;

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

    #region Laporan Stok
    Route::resource('LaporanStok', LaporanStokController::class);

    #region Laporan Saldo
    Route::resource('LaporanSaldo', LaporanSaldoController::class);

    #region QC
    Route::get('QC', 'App\Http\Controllers\HomeController@QC');
    Route::resource('QCFitur', QCController::class);

    Route::resource('InputAfalanQC', QCInputAfalanController::class);
    Route::resource('KoreksiAfalan', QCKoreksiAfalanController::class);
    Route::resource('CircularTropodo', QCCircularTropodoController::class);
    Route::resource('CircularMojosari', QCCircularMojosariController::class);
    Route::resource('ExtruderTropodo', QCExtruderTropodoController::class);
    Route::resource('ExtruderB', QCExtruderBController::class);
    Route::resource('ExtruderD', QCExtruderDController::class);


    #region COA
    Route::get('COA', 'App\Http\Controllers\HomeController@COA');
    Route::resource('FrmInputFIBC', InputDetailController::class);
    Route::resource('FrmInputTest', InputTestController::class);
    Route::resource('FrmACCMng_FIBC', ACCQCManController::class);
    Route::resource('FrmACCFIBC', ACCQCSpvController::class);
    Route::resource('FrmPrintFIBC', FIBCPrintController::class);
    //tidak dipake
    Route::resource('FrmMasterPart', MasterPartController::class);
    Route::resource('FrmMasterMaterial', MasterMaterialController::class);
    Route::resource('FrmMasterType', MasterTypeController::class);
    Route::resource('FrmResult', ResultController::class);
    Route::resource('FrmPrintResult', PrintController::class);
    Route::resource('FrmACCResult', ACCController::class);


    #region Inventory
    Route::get('Inventory', 'App\Http\Controllers\Payroll\HomeController@index');
    Route::resource('Inventory/KodePerkiraan', App\Http\Controllers\Inventory\Master\KodePerkiraanController::class);
    Route::resource('Inventory/MaintenanceObjek', App\Http\Controllers\Inventory\Master\MaintenanceObjekController::class);
    Route::resource('Inventory/MaintenanceType', App\Http\Controllers\Inventory\Master\MaintenanceTypeController::class);
    Route::resource('Inventory/StokBarang', App\Http\Controllers\Inventory\Master\StokBarangController::class);
    Route::resource('Inventory/TerimaPurchasing', App\Http\Controllers\Inventory\Transaksi\TerimaPurchasingController::class);
    Route::resource('Inventory/PermohonanHibah', App\Http\Controllers\Inventory\Transaksi\PermohonanHibahController::class);
    Route::resource('Inventory/AccPermohonanHibah', App\Http\Controllers\Inventory\Transaksi\AccHibahController::class);
    Route::resource('Inventory/PenerimaHibah', App\Http\Controllers\Inventory\Transaksi\PenerimaHibahController::class);
    Route::resource('Inventory/FormMhnPenerima', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormMhnPenerimaController::class);
    Route::resource('Inventory/FormAccMhnPenerima', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormAccMhnPenerimaController::class);
    Route::resource('Inventory/FormAccPemberiBarang', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormAccPemberiBarangController::class);
    Route::resource('Inventory/FormPemberiBarang', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPemberiBarangController::class);
    Route::resource('Inventory/FormMhnPemberi', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormMhnPemberiController::class);
    Route::resource('Inventory/FormPermohonanPenerima', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPermohonanPenerimaController::class);
    Route::resource('Inventory/FormPermohonanPenerimaBenang', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPermohonanPenerimaBenangController::class);
    Route::resource('Inventory/FormPermohonanSatuDivisi', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPermohonanSatuDivisiController::class);
    Route::resource('Inventory/FormAccSatuDivisi', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormAccSatuDivisiController::class);
    Route::resource('Inventory/FormReturPenjualan', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormReturPenjualanController::class);
    Route::resource('Inventory/FormPengembalianPascaPenjualan', App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPengembalianPascaPenjualanController::class);
    Route::resource('Inventory/FormKonversiBarang', App\Http\Controllers\Inventory\Transaksi\Konversi\FormKonversiBarangController::class);
    Route::resource('Inventory/FormAccKonversiBarang', App\Http\Controllers\Inventory\Transaksi\Konversi\FormAccKonversiBarangController::class);
    Route::resource('Inventory/FormPenghangusanBarang', App\Http\Controllers\Inventory\Transaksi\Penghangusan\FormPenghangusanBarangController::class);
    Route::resource('Inventory/FormAccPenghangusanBarang', App\Http\Controllers\Inventory\Transaksi\Penghangusan\FormAccPenghangusanBarangController::class);
    Route::resource('Inventory/FormPenyesuaianBarang', App\Http\Controllers\Inventory\Transaksi\Penyesuaian\FormPenyesuaianBarangController::class);
    Route::resource('Inventory/FormAccPenyesuaianBarang', App\Http\Controllers\Inventory\Transaksi\Penyesuaian\FormAccPenyesuaianBarangController::class);
    Route::resource('Inventory/FormTerimaBenangTropodo', App\Http\Controllers\Inventory\Transaksi\TerimaBenang\FormTerimaBenangTropodoController::class);
    Route::resource('Inventory/FormTerimaBenangGedungD', App\Http\Controllers\Inventory\Transaksi\TerimaBenang\FormTerimaBenangGedungDController::class);
    Route::resource('Inventory/FormPemakaianGelondongan', App\Http\Controllers\Inventory\Transaksi\Gelondongan\FormPemakaianGelondonganController::class);
    Route::resource('Inventory/KartuStok', App\Http\Controllers\Inventory\Informasi\KartuStokController::class);
    Route::resource('Inventory/TransaksiHarian', App\Http\Controllers\Inventory\Informasi\TransaksiHarianController::class);
    Route::resource('Inventory/TransaksiBulanan', App\Http\Controllers\Inventory\Informasi\TransaksiBulananController::class);
    Route::resource('Inventory/LacakTransaksi', App\Http\Controllers\Inventory\Informasi\LacakTransaksiController::class);
    Route::resource('Inventory/CariKodeBarang', App\Http\Controllers\Inventory\Informasi\CariKodeBarangController::class);
    #endregion
});
