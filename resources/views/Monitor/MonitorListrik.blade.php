@extends('layouts.appMonitor')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Monitor Listrik</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row">
                            <div class="col-md-10">
                                <h5 id="tgl"></h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <h5 style="text-align: center;">SDP CL 1</h5>
                                <canvas class='bordered align-items-center justify-content-center' id="dataChart1"></canvas>
                                <p id="totalPower1" style="text-align: center; margin-top: 5px; font-weight: bold;"></p>
                            </div>
                            <div class="col-md-3">
                                <h5 style="text-align: center;">SDP CL 2</h5>
                                <canvas class='bordered align-items-center justify-content-center' id="dataChart2"></canvas>
                                <p id="totalPower2" style="text-align: center; margin-top: 5px; font-weight: bold;"></p>
                            </div>
                            <div class="col-md-3">
                                <h5 style="text-align: center;">SDP CL 3</h5>
                                <canvas class='bordered align-items-center justify-content-center' id="dataChart3"></canvas>
                                <p id="totalPower3" style="text-align: center; margin-top: 5px; font-weight: bold;"></p>
                            </div>
                            <div class="col-md-3">
                                <h5 style="text-align: center;">SDP CL 4</h5>
                                <canvas class='bordered align-items-center justify-content-center' id="dataChart4"></canvas>
                                <p id="totalPower4" style="text-align: center; margin-top: 5px; font-weight: bold;"></p>
                            </div>


                            <div class="col-md-12 pt-4">
                                <div class="row">
                                    <div class="col-md-11">
                                        <h5 style="text-align: center;">TOTAL POWER CL1-CL4</h5>
                                    </div>
                                    <div class="col-md-1">
                                        <select id="filterDropdown">
                                            <option value="30m">30 Menit</option>
                                            <option value="1h">1 Jam</option>
                                            <option value="day">Hari</option>
                                            <option value="month">Bulan</option>
                                            <option value="year">Tahun</option>
                                        </select>
                                    </div>
                                </div>

                                <canvas class='bordered align-items-center justify-content-center' id="dataChart5"
                                    style="max-height: 400px"></canvas>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script type="text/javascript" src="{{ asset('js\Monitor\MonitorListrik.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="{{ asset('js/chart.js') }}"></script>
@endsection
