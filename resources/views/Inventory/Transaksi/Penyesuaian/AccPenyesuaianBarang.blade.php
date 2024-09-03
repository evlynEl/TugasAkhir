@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">ACC Penyesuaian Barang</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="baris-1 pl-3" id="baris-1">
                            <div class="row pt-2" id="perlu">
                                <div class="col-2">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-3 pl-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-1">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal" readonly>
                                </div>
                                <div class="col-sm-2" style="text-align: right">
                                    <label for="setuju">Yang Menyetujui</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="setuju" name="setuju" readonly>
                                </div>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="kelompokId">&nbsp;Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                        readonly>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5 pb-2">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="subkelId">&nbsp;Sub Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="ids" {{-- style="display:none;" --}}>
                            <div class="col-md-5 d-flex">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                                <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                                <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                                <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="baris-2 pl-3">
                            <div class="row pt-2 pr-5">
                                <div class="col-sm-2">
                                    <label for="kodeTransaksi">Kode Transaksi</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kodeTransaksi" name="kodeTransaksi" readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="tanggalTransaksi">Tanggal Transaksi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="tanggalTransaksi" name="tanggalTransaksi" readonly>
                                </div>
                                <div class="col-sm-1" style="text-align: right">
                                    <label for="pemohon">Pemohon</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="pemohon" name="pemohon" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="kodeNamaBarang">Kode / Nama Barang</label>
                                </div>
                                <div class="col-sm-2 p-0 pl-2">
                                    <input type="text" class="form-control" id="kodeBarang" name="kodeBarang"readonly>
                                </div>
                                <div class="col-sm-7 pl-1">
                                    <input type="text" class="form-control" id="namaBarang" name="namaBarang"readonly>
                                </div>
                            </div>
                            <div class="row pr-4" id="before">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-3 pl-5">Primer</div>
                                <div class="col-sm-3 pl-5">Sekunder</div>
                                <div class="col-sm-3 pl-5">Tritier</div>

                                <div class="col-sm-3">
                                    <label>Jumlah Barang Sebelum Disesuaikan</label>
                                </div>
                                <div class="col-sm-2 pr-1 pl-4">
                                    <input type="text" class="form-control" id="primer" name="primer" readonly>
                                </div>
                                <div class="col-sm-1 p-0">
                                    <input type="text" class="form-control" id="no_primer" name="no_primer" readonly>
                                </div>
                                <div class="col-sm-2 pr-1">
                                    <input type="text" class="form-control" id="sekunder" name="sekunder" readonly>
                                </div>
                                <div class="col-sm-1 p-0">
                                    <input type="text" class="form-control" id="no_sekunder" name="no_sekunder" readonly>
                                </div>
                                <div class="col-sm-2 pr-1">
                                    <input type="text" class="form-control" id="tritier" name="tritier" readonly>
                                </div>
                                <div class="col-sm-1 p-0">
                                    <input type="text" class="form-control" id="no_tritier" name="no_tritier"
                                        readonly>
                                </div>
                            </div>
                            <div class="row pb-2" id="after">
                                <div class="col-sm-3">
                                    <label>Jumlah Barang Sesudah Disesuaikan</label>
                                </div>
                                <div class="col-sm-2 pr-0">
                                    <input type="text" class="form-control" id="primer2" name="primer2" readonly>
                                </div>
                                <div class="col-sm-1"></div>
                                <div class="col-sm-2 pr-0 pl-1">
                                    <input type="text" class="form-control" id="sekunder2" name="sekunder2" readonly>
                                </div>
                                <div class="col-sm-1"></div>
                                <div class="col-sm-2 pr-0 pl-0">
                                    <input type="text" class="form-control" id="tritier2" name="tritier2" readonly>
                                </div>
                                <div class="col-sm-1"></div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="col-sm-12 mb-2">
                                <div class="table-responsive fixed-height" style="height: 300px">
                                    <table class="table table-bordered no-wrap-header" id="tableData">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row button-container">
                            <button type="button" id="btn_all" class="btn btn-outline-secondary">Pilih Semua</button>
                            <button type="button" id="btn_notAll" class="btn btn-outline-secondary">Batal Semua</button>
                            <button type="button" id="btn_proses" class="btn btn-outline-secondary">Proses</button>
                            <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Inventory/Transaksi/Penyesuaian/AccPenyesuaianBarang.css') }}">
    <script src="{{ asset('js/Inventory/Transaksi/Penyesuaian/AccPenyesuaianBarang.js') }}"></script>
@endsection
