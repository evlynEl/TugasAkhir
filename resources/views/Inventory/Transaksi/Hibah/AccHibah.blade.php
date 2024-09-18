@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Permohonan Acc Hibah</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row pb-2">
                            <div class="col-sm-1">
                                <input type="radio" id="acc" name="opsi" value="acc" checked>
                                <label for="acc">ACC</label>

                            </div>
                            <div class="col-sm-2">
                                <input type="radio" id="batalAcc" name="opsi" value="batalAcc">
                                <label for="batalAcc">Batal ACC</label>
                            </div>
                        </div>

                        <div class="row pb-2">
                            <div class="col-sm-2">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="btn_ok" class="btn btn-info">OK</button>
                            </div>
                        </div>
                        {{-- ATAS --}}
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="objekId">Objek</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                            </div>
                            <div class="col-sm-2">
                                <label for="kelompokId">&nbsp;&nbsp;Kelompok</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="kelompokNama" name="kelompokNama" readonly>
                            </div>
                        </div>

                        <div class="row pt-1">
                            <div class="col-sm-2">
                                <label for="kelutId">Kelompok Utama</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                            </div>
                            <div class="col-sm-2">
                                <label for="subkelId">&nbsp; Sub Kelompok</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="subkelNama" name="subkelNama" readonly>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <label>Id Transaksi</label>
                            </div>

                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="transaksiId" name="transaksiId" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <label>Nama Type</label>
                            </div>

                            <div class="col-sm-7">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaType" name="namaType" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-2 mb-2">
                                <label>Jml Barang</label>
                            </div>

                            <div class="col-sm-2 mt-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="primer" name="primer" readonly>
                                </div>
                            </div>
                            <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanPrimer" name="satuanPrimer"
                                        readonly>
                                </div>
                            </div>

                            <div class="col-sm-2 mt-2" style="margin-left: 3%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sekunder" name="sekunder" readonly>
                                </div>
                            </div>
                            <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanSekunder" name="satuanSekunder"
                                        readonly>
                                </div>
                            </div>

                            <div class="col-sm-2 mt-2" style="margin-left: 3%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="triter" name="triter" readonly>
                                </div>
                            </div>
                            <div class="col-sm-1 mt-2" style="margin-left: -2%">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="satuanTritier" name="satuanTritier"
                                        readonly>
                                </div>
                            </div>
                        </div>


                        <div class="row" style="margin-top: 0.5%">
                            <div class="col-sm-12">
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

                        <div class="row">
                            <div class="col-sm-2 offset-sm-8">
                                <button type="button" id="btn_proses" class="btn btn-info" style="width: 100%" disabled>PROSES</button>
                            </div>
                            <div class="col-sm-2">
                                <button type="button" id="btn_batal" class="btn btn-info" style="width: 100%" disabled>BATAL</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Inventory/Transaksi/Hibah/AccHibah.css') }}">
    <script src="{{ asset('js/Inventory/Transaksi/Hibah/AccHibah.js') }}"></script>
@endsection
