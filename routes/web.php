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
use App\Http\Controllers\COA\COA\Master\MasterMaterialController;
use App\Http\Controllers\Inventory\Informasi\KartuStokController;
use App\Http\Controllers\QC\Circular\QCCircularTropodoController;
use App\Http\Controllers\QC\Extruder\QCExtruderTropodoController;


use App\Http\Controllers\Inventory\Master\KodePerkiraanController;
use App\Http\Controllers\QC\Circular\QCCircularMojosariController;
use App\Http\Controllers\Inventory\Master\MaintenanceTypeController;
use App\Http\Controllers\Inventory\Master\MaintenanceObjekController;
use App\Http\Controllers\Inventory\Informasi\CariKodeBarangController;
use App\Http\Controllers\Inventory\Informasi\LacakTransaksiController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\AccHibahController;
use App\Http\Controllers\Inventory\Informasi\TransaksiHarianController;
use App\Http\Controllers\Inventory\Informasi\TransaksiBulananController;
use App\Http\Controllers\Inventory\Transaksi\TerimaPurchasingController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\MhnPemberiController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\MhnPenerimaController;
use App\Http\Controllers\Inventory\Informasi\ListDetailTransaksiController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\PenerimaHibahController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\AccSatuDivisiController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PemberiBarangController;
use App\Http\Controllers\Inventory\Transaksi\PemakaianGelondonganController;
use App\Http\Controllers\Inventory\Transaksi\Hibah\PermohonanHibahController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\AccMhnPenerimaController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\MhnMasukKeluarController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\ReturPenjualanController;
use App\Http\Controllers\Inventory\Transaksi\Konversi\KonversiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\AccPemberiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PemberiBarangAssController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\AccMhnMasukKeluarController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PermohonanPenerimaController;
use App\Http\Controllers\Inventory\Transaksi\Konversi\AccKonversiBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PermohonanSatuDivisiController;
use App\Http\Controllers\Inventory\Transaksi\Penyesuaian\PenyesuaianBarangController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PermohonanPenerimaBenangController;
use App\Http\Controllers\Inventory\Transaksi\Penghangusan\PenghangusanBarangController;
use App\Http\Controllers\Inventory\Transaksi\Penyesuaian\AccPenyesuaianBarangController;
use App\Http\Controllers\Inventory\Transaksi\TerimaBenang\TerimaBenangGedungDController;
use App\Http\Controllers\Inventory\Transaksi\TerimaBenang\TerimaBenangTropodoController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\KeluarBarangUntukPenjualanController;
use App\Http\Controllers\Inventory\Transaksi\Mutasi\PengembalianPascaPenjualanController;
use App\Http\Controllers\Inventory\Transaksi\Penghangusan\AccPenghangusanBarangController;

use App\Http\Controllers\Monitor\MonitorListrikController;
use App\Http\Controllers\Monitor\JadwalMesinController;

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

    #region TA
    Route::get('SDP', 'App\Http\Controllers\HomeController@SDP');
    Route::resource('MonitorListrik', MonitorListrikController::class);
    Route::resource('JadwalMesin', JadwalMesinController::class);

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
    Route::resource('MhnPenerima', MhnPenerimaController::class);
    Route::resource('AccMhnPenerima', AccMhnPenerimaController::class);
    Route::resource('AccPemberiBarang', AccPemberiBarangController::class);
    Route::resource('PemberiBarang', PemberiBarangController::class);
    Route::resource('PemberiBarangAss', PemberiBarangAssController::class);
    Route::resource('MhnPemberi', MhnPemberiController::class);
    Route::resource('PermohonanPenerima', PermohonanPenerimaController::class);
    Route::resource('PermohonanPenerimaBenang', PermohonanPenerimaBenangController::class);
    Route::resource('PermohonanSatuDivisi', PermohonanSatuDivisiController::class);
    Route::resource('AccSatuDivisi', AccSatuDivisiController::class);
    Route::resource('AccReturPenjualan', ReturPenjualanController::class);
    Route::resource('AccPascaKirim', PengembalianPascaPenjualanController::class);
    Route::resource('AccKeluarPenjualan', KeluarBarangUntukPenjualanController::class);
    Route::resource('KonversiBarang', KonversiBarangController::class);
    Route::resource('AccKonversiBarang', AccKonversiBarangController::class);
    Route::resource('PenghangusanBarang', PenghangusanBarangController::class);
    Route::resource('AccPenghangusanBarang', AccPenghangusanBarangController::class);
    Route::resource('PenyesuaianBarang', PenyesuaianBarangController::class);
    Route::resource('AccPenyesuaianBarang', AccPenyesuaianBarangController::class);
    Route::resource('TerimaBenangTropodo', TerimaBenangTropodoController::class);
    Route::resource('TerimaBenangGedungD', TerimaBenangGedungDController::class);
    Route::resource('PemakaianGelondongan', PemakaianGelondonganController::class);
    Route::resource('KartuStok', KartuStokController::class);
    Route::resource('ListDetailTransaksi', ListDetailTransaksiController::class);
    Route::resource('TransaksiHarian', TransaksiHarianController::class);
    Route::resource('TransaksiBulanan', TransaksiBulananController::class);
    Route::resource('LacakTransaksi', LacakTransaksiController::class);
    Route::resource('CariKodeBarang', CariKodeBarangController::class);
    Route::resource('MhnMasukKeluar', MhnMasukKeluarController::class);
    Route::resource('AccMhnMasukKeluar', AccMhnMasukKeluarController::class);
    #endregion



});
