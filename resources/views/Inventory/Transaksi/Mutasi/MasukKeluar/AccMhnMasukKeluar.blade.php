@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Acc Mutasi Masuk-Keluar</div>
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

                        <div class="baris-1" id="baris-1">
                            <div class="row pt-2 pb-2" id="perlu">
                                <div class="col-sm-2" style="text-align: center;">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-sm-2 pl-2">
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                                <div class="col-sm-1" style="text-align: right;">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="divisiNama" name="divisiNama"
                                            readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="text-align: right;">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                        <div class="input-group-append">
                                            <button type="button" id="btn_objek" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
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

                        <div class="row" id="ids" style="display:none;">
                            <div class="col-md-5 d-flex">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                                <input type="text" id="kelompokId" name="kelompokId" class="form-control" readonly>
                                <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                                <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                            </div>
                        </div>

                        <label for="mutasiLabel" id="mutasiLabel" style="display: none;"></label>
                        <div class="col-sm-12" id="baris-2">
                            <div class="row pt-2">
                                <div class="col-sm-2"  style="text-align: center;">
                                    <label for="kodeTransaksi">Kode Transaksi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kodeTransaksi" name="kodeTransaksi">
                                </div>
                                <div class="col-sm-1">
                                    <label for="uraian">Uraian</label>
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="uraian" name="uraian">
                                </div>
                            </div>


                            <label for="mutasiLabel" id="mutasiLabel" style="display: none;"></label>
                            <div class="row pb-2" id="satuan">
                                <div style="width: 10%"></div>
                                <label>Primer</label>
                                <div style="width: 3%"></div>
                                <div class="col-sm-1 p-0">
                                    <input type="text" class="form-control" id="primer" name="primer">
                                </div>
                                <label for="no_primer" id="no_primer"></label>

                                <label>Sekunder</label>
                                <div style="width: 1.5%"></div>
                                <div class="col-sm-1 p-0">
                                    <input type="text" class="form-control" id="sekunder" name="sekunder">
                                </div>
                                <label for="no_sekunder" id="no_sekunder"></label>

                                <label>Tritier</label>
                                <div style="width: 2%"></div>
                                <div class="col-sm-1 p-0">
                                    <input type="text" class="form-control" id="tritier" name="tritier">
                                </div>
                                <label for="no_tritier" id="no_tritier"></label>
                            </div>

                        </div>

                        <div style="text-align: right">
                            <button type="button" id="btn_proses" class="btn btn-outline-secondary">Proses</button>
                            <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Inventory/Transaksi/Mutasi/AccMhnMasukKeluar.css') }}">
    <script src="{{ asset('/js/Inventory/Transaksi/Mutasi/AccMhnMasukKeluar.js') }}"></script>
@endsection
