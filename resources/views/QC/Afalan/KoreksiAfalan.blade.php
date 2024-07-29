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
                    <div class="card-header">KOREKSI AFALAN</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="acs-div-container1">
                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <label for="no_roll">No Roll</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="input-group">
                                            <input type="text" id="no_roll" name="no_roll" class="form-control">
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <label for="item_number">Item Number</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="item_number" name="item_number" class="form-control"
                                            readonly>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <label for="kode_barang">Kode Barang</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="kode_barang" name="kode_barang" class="form-control"
                                            readonly>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <label for="nama_type">Nama Type</label>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" id="nama_type" name="nama_type" class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <label for="meter_bruto">Meter Bruto</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" id="meter_bruto" name="meter_bruto" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="col-sm-2">
                                        <label id="lblSekunder" class="col-form-label"></label>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <label for="meter_netto">Meter Netto</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" id="meter_netto" name="meter_netto" class="form-control"
                                            readonly>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <label for="kg">KG</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" id="kg" name="kg" class="form-control" readonly>
                                    </div>
                                    <div class="col-sm-2">
                                        <label id="lblTritier" class="col-form-label"></label>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <label for="afalan">Afalan (Angka)</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" id="afalan" name="afalan" class="form-control"
                                            placeholder="0" min="0" required>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-2">
                                        <button id="btn_submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/QC/Afalan/KoreksiAfalan.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
