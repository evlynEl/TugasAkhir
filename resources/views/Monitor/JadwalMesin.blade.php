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

                        <div class="row pb-1">
                            <div class="col-md-2">
                                <label for="hasil">Data Order</label>
                            </div>
                            <div class="col-md-8"></div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-light" id="printPdf" style="width: 100%">Print</button>
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-light" id="excelButton" style="width: 100%">Excel</button>
                            </div>
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

                        <div class="col-md-2 pl-0 pt-4 pb-1">
                            <h5 for="hasil">Hasil Jadwal</h5>
                        </div>
                        <div class="row">
                            <div class="col-md-3 pl-3"><label id="makespan"></label></div>
                            <div class="col-md-3"><label id="excTime"></label></div>
                        </div>
                        <div class="col-md-12" id="charts-container"></div>



                        {{-- preview --}}
                        <div class="container preview" id="printArea">
                            <h4 class="mb-3">Data Order {{ \Carbon\Carbon::today()->format('d-m-Y') }}</h4>

                            <table class="table table-bordered table-sm" id="previewTable">
                                <thead class="text-center align-middle">
                                    <tr>
                                        <th>No Order</th>
                                        <th>Lebar</th>
                                        <th>RjtWA</th>
                                        <th>RjtWE</th>
                                        <th>Denier</th>
                                        <th class="col-corak">Corak</th>
                                        <th class="col-bngwa">BngWA</th>
                                        <th class="col-bngwe">BngWE</th>
                                        <th>Jumlah</th>
                                        <th>Tgl Mulai</th>
                                        <th>Mesin</th>
                                        <th>Pnj Potong</th>
                                        <th>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script type="text/javascript" src="{{ asset('js\Monitor\JadwalMesin.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css\SDP\JadwalMesin.css') }}">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    <script src="https://cdn.plot.ly/plotly-2.30.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chroma-js@2.4.2/chroma.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js"></script>

    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>

@endsection
