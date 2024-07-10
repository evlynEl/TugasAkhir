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
                    <div class="card-header">Extruder Tropodo</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="acs-div-container1">
                                <div class="container mt-5">
                                    <form>
                                        {{-- <div class="form-group row">
                                            <label for="jamInput" class="col-sm-2 col-form-label">Jam Input</label>
                                            <div class="col-sm-10">
                                                <input type="time" class="form-control" id="jamInput">
                                            </div>
                                        </div> --}}
                                        <button type="button" class="btn btn-primary" id="buttonIdMesin">Cari
                                            Mesin</button>
                                        <div class="form-group row">
                                            <label for="tanggal" class="col-sm-2 col-form-label">Tanggal</label>
                                            <div class="col-sm-10">
                                                <input type="date" class="form-control" id="tanggal">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Shift</label>
                                            <div class="col-sm-10 shift-inputs">
                                                <input type="text" class="form-control" id="shiftLetter" maxlength="1">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Mesin</label>
                                            <div class="col-sm-10 machine-inputs">
                                                <input type="text" class="form-control" id="mesin">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Awal shift</label>
                                            <div class="col-sm-10 machine-inputs">
                                                <input type="text" class="form-control" id="shiftAwal">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Akhir Shift</label>
                                            <div class="col-sm-10 machine-inputs">
                                                <input type="text" class="form-control" id="shiftAkhir">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="namaMesin" class="col-sm-2 col-form-label">Nama Mesin</label>
                                            <div class="col-sm-10 shift-inputs">
                                                <input type="text" class="form-control" id="namaMesin" maxlength="1">
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-primary" id="buttonNomorTransaksi">No.
                                            Transaksi</button>

                                        <label for="nomorTransaksi" class="col-sm-2 col-form-label">Nomor Transaksi</label>
                                        <div class="col-sm-10">
                                            <input type="text" id="nomorTransaksi">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <script type="text/javascript" src="{{ asset('js/QC/Extruder/ExtruderTropodo.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
