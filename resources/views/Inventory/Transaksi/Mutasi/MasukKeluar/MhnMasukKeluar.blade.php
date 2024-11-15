@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Mutasi Masuk-Keluar</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row pb-2" id="top">
                            <div class="col-2">
                                <label><strong>Jenis Mutasi</strong></label>
                            </div>
                            <div class="col-sm-1">
                                <input type="radio" id="masuk" name="opsi" value="masuk">
                                <label for="masuk"><strong>MASUK</strong></label>

                            </div>
                            <div class="col-sm-2">
                                <input type="radio" id="keluar" name="opsi" value="keluar">
                                <label for="keluar"><strong>KELUAR</strong></label>
                            </div>
                            <div class="col-sm-5"></div>
                            <div class="col-1">
                                <label for="user">Pemohon</label>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="user" name="user" readonly>
                            </div>
                        </div>

                        <div class="baris-1 pl-3" id="baris-1">
                            <div class="row pt-2" id="perlu">
                                <div class="col-sm-2">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-sm-3 pl-2">
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                                <div class="col-sm-1">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="kelompokId">&nbsp;Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelompok" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5 pb-2">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelut" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="subkelId">&nbsp;Sub Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_subkel" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="display:none;">
                            <div class="col-md-2 d-flex" id="ids">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                            </div>
                            <div class="col-md-2 d-flex">
                                <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                                <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                                <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                            </div>
                        </div>

                        <div id="baris-2">
                            <div class="col-sm-8">
                                <div class="row pt-2">
                                    <div class="col-2">
                                        <label for="kodeBarang">Kode Barang</label>
                                    </div>
                                    <div class="col-sm-3 mr-3">
                                        <input type="text" class="form-control" id="kodeBarang" name="kodeBarang">
                                    </div>
                                    <div class="col-sm-2">
                                        <label for="kodeTransaksi">Kode Transaksi</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="kodeTransaksi"
                                            name="kodeTransaksi" readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label for="kodeType">Kode Type</label>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="kodeType" name="kodeType"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_kodeType" class="btn btn-info">...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label for="namaBarang">Nama Barang</label>
                                    </div>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="namaBarang" name="namaBarang"
                                            readonly>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="row">
                                    <label><strong>Stok Akhir</strong></label>
                                    <div class="col-sm-1 mr-3"></div>
                                    <label>Primer</label>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="primer" name="primer" readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"></div>
                                    <label>Sekunder</label>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder" readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3 mr-4"></div>
                                    <label>Tritier</label>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="tritier" name="tritier" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label for="mutasiLabel" id="mutasiLabel" style="display: none;"></label>
                        <div class="baris-3 pl-3">
                            <div class="row pt-2">
                                <div style="width: 5%"></div>
                                <label for="uraian">Uraian Mutasi</label>
                                <div class="col-sm-6 pl-4">
                                    <input type="text" class="form-control" id="uraian" name="uraian">
                                </div>
                                <label style="color: blue">* contoh Mutasi Masuk, SJ 005</label>
                            </div>
                            <div class="row pb-2" id="satuan">
                                <div style="width: 10%"></div>
                                <label>Primer</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="primer2" name="primer2">
                                </div>
                                <label for="no_primer" id="no_primer"></label>

                                <label>Sekunder</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="sekunder2" name="sekunder2">
                                </div>
                                <label for="no_sekunder" id="no_sekunder"></label>

                                <label>Tritier</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="tritier2" name="tritier2">
                                </div>
                                <label for="no_tritier" id="no_tritier"></label>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="col-sm-12 mb-2">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableData">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div style="text-align: right">
                            <button type="button" id="btn_isi" class="btn btn-outline-secondary">Isi</button>
                            <button type="button" id="btn_proses" class="btn btn-outline-secondary">Proses</button>
                            <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button>
                            <button type="button" id="btn_koreksi" class="btn btn-outline-secondary">Koreksi</button>
                            <button type="button" id="btn_hapus" class="btn btn-outline-secondary">Hapus</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Inventory/Transaksi/Mutasi/MhnMasukKeluar.css') }}">
    <script src="{{ asset('js/Inventory/Transaksi/Mutasi/MhnMasukKeluar.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
