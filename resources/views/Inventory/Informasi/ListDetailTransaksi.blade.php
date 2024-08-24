@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <label class="ml-3"><strong>List Detail Transaksi</strong></label>
        <!-- General Data -->
        <div class="row" style="margin-top: 0.5%">
            <div class="col-sm-1">
                <label>Id Type</label>
            </div>
            <div class="col-sm-3">
                <input type="text" class="form-control" readonly>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-1 mt-2 mb-2">
                <label>Saldo Akhir</label>
            </div>

            <div class="col-sm-2 mt-2">
                <div class="input-group">
                    <input type="text" class="form-control" 
                        readonly>
                </div>
            </div>

            <div class="col-sm-1 mt-2">
                <div class="input-group">
                    <input type="text" class="form-control" readonly>
                </div>
            </div>

            <div class="col-sm-2 mt-2">
                <div class="input-group">
                    <input type="text" class="form-control" 
                        readonly>
                </div>
            </div>

            <div class="col-sm-1 mt-2">
                <div class="input-group">
                    <input type="text" class="form-control" readonly>
                </div>
            </div>

            <div class="col-sm-2 mt-2">
                <div class="input-group">
                    <input type="text" class="form-control"
                        readonly>
                </div>
            </div>

            <div class="col-sm-1 mt-2">
                <div class="input-group">
                    <input type="text" class="form-control" readonly>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top: 0%">
            <label class="col-sm-1 col-form-label">Tanggal</label>
            <div class="col-sm-2">
                <input type="date" class="form-control" id="tanggalAwal">
            </div>
            s/d
            <div class="col-sm-2">
                <input type="date" class="form-control" id="tanggalAkhir">
            </div>
        </div>

        <div class="row">
            
        </div>

        <div class="row" style="margin-top: 0.5%">
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

    </div>
    <link rel="stylesheet" href="{{ asset('css/Inventory/Informasi/KartuStok.css') }}">
    <script src="{{ asset('js/Inventory/Informasi/KartuStok.js') }}"></script>
@endsection
