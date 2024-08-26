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
use App\Http\Controllers\Inventory\InventoryController;
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
use App\Http\Controllers\Inventory\Master\StokBarangController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\AccHibahController;


use App\Http\Controllers\COA\COA\Master\MasterMaterialController;
use App\Http\Controllers\Inventory\Informasi\KartuStokController;
use App\Http\Controllers\QC\Circular\QCCircularTropodoController;
use App\Http\Controllers\QC\Extruder\QCExtruderTropodoController;
use App\Http\Controllers\Inventory\Master\KodePerkiraanController;
use App\Http\Controllers\QC\Circular\QCCircularMojosariController;
use App\Http\Controllers\Inventory\Master\MaintenanceTypeController;
use App\Http\Controllers\Inventory\Master\MaintenanceObjekController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\PenerimaHibahController;
use App\Http\Controllers\Inventory\Informasi\CariKodeBarangController;
use App\Http\Controllers\Inventory\Informasi\LacakTransaksiController;
use App\Http\Controllers\Inventory\Informasi\TransaksiHarianController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\PermohonanHibahController;
use App\Http\Controllers\Inventory\Informasi\TransaksiBulananController;
use App\Http\Controllers\Inventory\Transaksi\TerimaPurchasingController;
use App\Http\Controllers\Inventory\Informasi\ListDetailTransaksiController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormMhnPemberiController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormMhnPenerimaController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormAccSatuDivisiController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPemberiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormAccMhnPenerimaController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormReturPenjualanController;
use App\Http\Controllers\Inventory\Transaksi\Konversi\FormKonversiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormAccPemberiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPermohonanPenerimaController;
use App\Http\Controllers\Inventory\Transaksi\Konversi\FormAccKonversiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPermohonanSatuDivisiController;
use App\Http\Controllers\Inventory\Transaksi\PemakaianGelondonganController;
use App\Http\Controllers\Inventory\Transaksi\Penyesuaian\FormPenyesuaianBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPermohonanPenerimaBenangController;
use App\Http\Controllers\Inventory\Transaksi\Penghangusan\FormPenghangusanBarangController;
use App\Http\Controllers\Inventory\Transaksi\Penyesuaian\FormAccPenyesuaianBarangController;
use App\Http\Controllers\Inventory\Transaksi\TerimaBenang\FormTerimaBenangGedungDController;
use App\Http\Controllers\Inventory\Transaksi\TerimaBenang\FormTerimaBenangTropodoController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\FormPengembalianPascaPenjualanController;
use App\Http\Controllers\Inventory\Transaksi\Penghangusan\FormAccPenghangusanBarangController;

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
    Route::get('Inventory', 'App\Http\Controllers\HomeController@Inventory');
    Route::resource('KodePerkiraan', KodePerkiraanController::class);
    Route::resource('MaintenanceObjek', MaintenanceObjekController::class);
    Route::resource('MaintenanceType', MaintenanceTypeController::class);
    Route::resource('StokBarang', StokBarangController::class);
    Route::resource('TerimaPurchasing', TerimaPurchasingController::class);
    Route::resource('PermohonanHibah', PermohonanHibahController::class);
    Route::resource('AccPermohonanHibah', AccHibahController::class);
    Route::resource('PenerimaHibah', PenerimaHibahController::class);
    Route::resource('MhnPenerima', FormMhnPenerimaController::class);
    Route::resource('AccMhnPenerima', FormAccMhnPenerimaController::class);
    Route::resource('AccPemberiBarang', FormAccPemberiBarangController::class);
    Route::resource('PemberiBarang', FormPemberiBarangController::class);
    Route::resource('MhnPemberi', FormMhnPemberiController::class);
    Route::resource('PermohonanPenerima', FormPermohonanPenerimaController::class);
    Route::resource('PermohonanPenerimaBenang', FormPermohonanPenerimaBenangController::class);
    Route::resource('PermohonanSatuDivisi', FormPermohonanSatuDivisiController::class);
    Route::resource('AccSatuDivisi', FormAccSatuDivisiController::class);
    Route::resource('ReturPenjualan', FormReturPenjualanController::class);
    Route::resource('PengembalianPascaPenjualan', FormPengembalianPascaPenjualanController::class);
    Route::resource('KonversiBarang', FormKonversiBarangController::class);
    Route::resource('AccKonversiBarang', FormAccKonversiBarangController::class);
    Route::resource('PenghangusanBarang', FormPenghangusanBarangController::class);
    Route::resource('AccPenghangusanBarang', FormAccPenghangusanBarangController::class);
    Route::resource('PenyesuaianBarang', FormPenyesuaianBarangController::class);
    Route::resource('AccPenyesuaianBarang', FormAccPenyesuaianBarangController::class);
    Route::resource('TerimaBenangTropodo', FormTerimaBenangTropodoController::class);
    Route::resource('TerimaBenangGedungD', FormTerimaBenangGedungDController::class);
    Route::resource('PemakaianGelondongan', PemakaianGelondonganController::class);
    Route::resource('KartuStok', KartuStokController::class);
    Route::resource('ListDetailTransaksi', ListDetailTransaksiController::class);
    Route::resource('TransaksiHarian', TransaksiHarianController::class);
    Route::resource('TransaksiBulanan', TransaksiBulananController::class);
    Route::resource('LacakTransaksi', LacakTransaksiController::class);
    Route::resource('CariKodeBarang', CariKodeBarangController::class);
    #endregion
});
