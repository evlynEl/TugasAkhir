@extends('layouts.appLaporanSaldo')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <label><strong>Laporan Stok per Periode</strong></label>
                        <div class="row">
                            <label class="col-sm-2 col-form-label">Divisi</label>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="divisi" readonly>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="namaDivisi" readonly>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-primary" id="buttonDivisi">...</button>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control d-none" id="namaType" readonly>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 col-form-label">Objek</label>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="objek" readonly>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="namaObjek" readonly>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-primary" id="buttonObjek">...</button>
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control d-none" id="idType" readonly>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 0%">
                            <label class="col-sm-2">Tanggal</label>
                            <div class="col-sm-2">
                                <input type="date" class="form-control" id="tanggalAwal">
                            </div>
                            <div class="col-sm-2">
                                <input type="date" class="form-control" id="tanggalAkhir">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1 offset-sm-2">
                                <button type="button" class="btn btn-success" id="prosesButton"
                                    style="width: 100%">Proses</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-danger" id="cancelButton"
                                    style="width: 100%">Cancel</button>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 0.5%">
                            <div class="col-sm-12">
                                <div class="table-responsive fixed-height" style="height: 300px">
                                    <table class="table table-bordered no-wrap-header" id="tableLaporan">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 0.5%">
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-primary" id="excelButton" style="width: 100%">Tampil
                                    Excel</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{ asset('js/Laporan/LaporanSaldo.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/exceljs@4.3.0/dist/exceljs.min.js"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/Laporan/LaporanSaldo.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
