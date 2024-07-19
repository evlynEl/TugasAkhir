@extends('layouts.appQC')
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
                    <div class="card-header">Laporan Stok per Periode</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="container mt-5">
                            <form>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Tanggal</label>
                                    <div class="col-sm-2">
                                        <input type="date" class="form-control" id="tanggalAwal">
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="date" class="form-control" id="tanggalAkhir">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Divisi</label>
                                    <div class="col-sm-1">
                                        <input type="text" class="form-control" id="divisi" readonly>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="namaDivisi" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary">...</button>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="namaType" readonly>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Objek</label>
                                    <div class="col-sm-1">
                                        <input type="text" class="form-control" id="objek" readonly>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="namaObjek" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary">...</button>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="idType" readonly>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Kel. Utama</label>
                                    <div class="col-sm-1">
                                        <input type="text" class="form-control" id="kelUtama" readonly>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="namaKelUtama" readonly>
                                    </div>
                                    <div class="col-sm-2">
                                        <button type="button" class="btn btn-primary">...</button>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-1 offset-sm-2">
                                        <button type="submit" class="btn btn-success">Proses</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-danger">Cancel</button>
                                    </div>
                                </div>



                                <div class="form-group row">
                                    <div class="col-sm-1">
                                        <button type="submit" class="btn btn-primary">Tampil Excel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{ asset('js/Laporan/LaporanStok.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
