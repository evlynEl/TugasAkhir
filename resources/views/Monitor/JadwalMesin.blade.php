@extends('layouts.appMonitor')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Jadwal Mesin CL 1-4</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row">
                            <div class="col-md-10">
                                <h5 id="tgl"></h5>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-2">
                                <label for="upload">Upload Data Order</label>
                                <label>(.csv, .xls, .xlsx)</label>
                            </div>
                            <div class="col-md-10">
                                <div id="dropArea" class="border border-secondary rounded-3 p-4 text-center bg-light">
                                    <p class="text-muted">Drag & Drop file di sini atau</p>
                                    <input type="file" id="fileUpload" class="d-none" accept=".csv, .xls, .xlsx">
                                    <button type="button" class="btn btn-secondary" id="btn_fileUpload" onclick="document.getElementById('fileUpload').click()">Pilih File</button>
                                    <p id="fileName" class="mt-2 text-secondary"></p>
                                </div>
                            </div>
                            <div class="col-md-2"></div>
                            <div class="col-md-10 text-center mt-1">
                                <button type="button" class="btn btn-primary" id="btn_proses">Proses</button>
                                <button type="button" class="btn btn-primary" id="btn_ok">OK</button>
                            </div>
                        </div>

                        <div class="col-md-2 pl-0">
                            <label for="hasil">Data Order</label>
                        </div>

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

                        <div class="col-md-2 pl-0 pt-4">
                            <label for="hasil">Hasil Jadwal</label>
                        </div>
                        <div class="col-md-12" id="chart">

                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script type="text/javascript" src="{{ asset('js\Monitor\JadwalMesin.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/Inventory/Informasi/TransaksiBulanan.css') }}">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    {{-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> --}}
    <script src="{{ asset('js/chart.js') }}"></script>

    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>

@endsection
