@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-sm-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Terima Retur Dari Penjualan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row mb-2" style="margin-top: -1%">
                            <div class="col-sm-12">
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
                        {{-- ATAS --}}
                        <div class="baris-1 pl-1" id="baris-1">
                            <div class="row pt-2 pr-5">
                                <div class="col-sm-2">
                                    <label for="divisi">Divisi</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="divisi" name="divisi" readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="transaksi">Id Transaksi</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="transaksi" name="transaksi" readonly>
                                </div>
                            </div>

                            <div class="row pr-5 pt-1">
                                <div class="col-sm-2">
                                    <label for="objek">Objek</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="objek" name="objek" readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="kelompok">Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelompok" name="kelompok" readonly>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5 pt-1">
                                <div class="col-sm-2">
                                    <label for="kelut">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kelut" name="kelut" readonly>

                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="subkel">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="subkel" name="subkel" readonly>
                                    <input type="text" class="form-control" id="subkelId" name="subkelId"
                                        style="display: none" readonly>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5 pt-1">
                                <div class="col-sm-2">
                                    <label for="kode">Kode Type Brg</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="kode" name="kode" readonly>
                                </div>
                            </div>

                            <div class="row pb-1 pr-5 pt-1">
                                <div class="col-sm-2">
                                    <label for="type">Kode Type Brg</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="type" name="type" readonly>
                                </div>
                            </div>

                            <div class="row pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label>Jml Retur</label>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="primer" name="primer"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2 offset-sm-1">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="sekunder" name="sekunder"
                                            class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-2 offset-sm-1">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="triter" name="triter"
                                            class="form-control" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="button" id="btn_proses" class="btn btn-outline-secondary" disabled>Proses</button>
                        {{-- <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button> --}}
                        <button type="button" id="btn_refresh" class="btn btn-outline-secondary">Refresh</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/Inventory/Transaksi/Mutasi/ReturPenjualan.css') }}">
    <script src="{{ asset('js/Inventory/Transaksi/Mutasi/ReturPenjualan.js') }}"></script>
@endsection
