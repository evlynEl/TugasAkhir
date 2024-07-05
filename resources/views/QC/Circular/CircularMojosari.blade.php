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

                {{-- Table List dari tanggal --}}
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <strong>Potong Gelondongan Circular Mojosari</strong>
                        <div class="form-group d-flex align-items-center">
                            <label for="tanggal" class="mr-2">Tanggal:</label>
                            <input type="date" id="tanggal" name="tanggal" class="form-control">
                        </div>
                    </div>
                    
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="container">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style="width: 10%;">Mesin</th>
                                                <th scope="col" style="width: 10%;">Shift</th>
                                                <th scope="col" style="width: 10%;">Id Log</th>
                                                <th scope="col" style="width: 70%;">Nama Barang</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Mesin 1</td>
                                                <td>Shift 1</td>
                                                <td>Id Log 1</td>
                                                <td>Barang 1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>

                {{-- Yang diitung dari database --}}
                <div class="card">
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col-sm-3 text-right">
                                    <strong>Rajutan</strong>
                                </div>
                                <div class="col-sm-3 text-right">
                                    <strong>Benang</strong>
                                </div>
                                <div class="col-sm-3 text-right">
                                    <strong>Denier</strong>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label for="mesin">Mesin</label>
                                    <input type="text" id="mesin" name="mesin" class="form-control mb-1" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <label for="ukuran">Ukuran</label>
                                    <input type="text" id="ukuran" name="ukuran" class="form-control mb-1" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <label for="waftRajutan">Waft</label>
                                    <input type="text" id="waftRajutan" name="waftRajutan" class="form-control mb-2"
                                        readonly>
                                </div>
                                <div class="col-sm-1">
                                    <label for="weftRajutan">Weft</label>
                                    <input type="text" id="weftRajutan" name="weftRajutan" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="waftBenang">Waft</label>
                                    <input type="text" id="waftBenang" name="waftBenang" class="form-control mb-2"
                                        readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="weftBenang">Weft</label>
                                    <input type="text" id="weftBenang" name="weftBenang" class="form-control mb-2"
                                        readonly>
                                </div>
                                <div class="col-sm-1">
                                    <label for="waftDenier">Waft</label>
                                    <input type="text" id="waftDenier" name="waftDenier" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-1">
                                    <label for="weftDenier">Weft</label>
                                    <input type="text" id="weftDenier" name="weftDenier" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="beratStandart">Berat Standart</label>
                                    <input type="text" id="beratStandart" name="beratStandart" class="form-control mb-2"
                                        readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- REALITA --}}
                <div class="card">
                    <div class="card-header">Realita</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="idLog">Id Log</label>
                                    <input type="text" id="idLog" name="idLog" class="form-control mb-1" readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="ukuranLembar">Ukuran (Lembar)</label>
                                    <input type="text" id="ukuranLembar" name="ukuranLembar" class="form-control mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label for="panjangPotongan">Panjang Potongan</label>
                                    <input type="text" id="panjangPotongan" name="panjangPotongan"
                                        class="form-control mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label for="beratBarang">Berat Barang</label>
                                    <input type="text" id="beratBarang" name="beratBarang" class="form-control mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label for="beratReinforced">Berat Reinforced</label>
                                    <input type="text" id="beratReinforced" name="beratReinforced"
                                        class="form-control mb-1" readonly>
                                </div>
                                <div class="col-sm-2 d-flex align-items-end">
                                    <button type="button" class="btn btn-primary mb-1">Proses</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- ACTUAL ST --}}
                <div class="card">
                    <div class="card-header">Actual (ST)</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col-sm-4 text-center">
                                    <strong>Warp</strong>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <strong>Weft</strong>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <strong>Reinforced</strong>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-2">
                                    <label for="actualStWarp">St (Kgf)</label>
                                    <input type="text" id="actualStWarp" name="actualStWarp" class="form-control mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label for="actualElgWarp">Elg (%)</label>
                                    <input type="text" id="actualElgWarp" name="actualElgWarp" class="form-control mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label for="actualStWeft">St (Kgf)</label>
                                    <input type="text" id="actualStWeft" name="actualStWeft" class="form-control mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label for="actualElgWeft">Elg (%)</label>
                                    <input type="text" id="actualElgWeft" name="actualElgWeft" class="form-control mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label for="actualStReinf">St (Kgf)</label>
                                    <input type="text" id="actualStReinf" name="actualStReinf" class="form-control mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label for="actualElgReinf">Elg (%)</label>
                                    <input type="text" id="actualElgReinf" name="actualElgReinf" class="form-control mb-1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Standart --}}
                <div class="card">
                    <div class="card-header">Standart</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col-sm-4 text-center">
                                    <strong>Warp</strong>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <strong>Weft</strong>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-2">
                                    <label for="standartStWarp">St (Kgf)</label>
                                    <input type="text" id="standartStWarp" name="standartStWarp" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="standartElgWarp">Elg (%)</label>
                                    <input type="text" id="standartElgWarp" name="standartElgWarp" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="standartStWeft">St (Kgf)</label>
                                    <input type="text" id="standartStWeft" name="standartStWeft" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-2">
                                    <label for="standartElgWeft">Elg (%)</label>
                                    <input type="text" id="standartElgWeft" name="standartElgWeft" class="form-control mb-1"
                                        readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>

                {{-- Table yang Selected --}}
                <div class="card">
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-10">
                                        <div class="table-responsive">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Mesin</th>
                                                        <th scope="col">Shift</th>
                                                        <th scope="col">Id Log</th>
                                                        <th scope="col">Ukuran</th>
                                                        <th scope="col">Potongan</th>
                                                        <th scope="col">Berat</th>
                                                        <th scope="col">Berat STD</th>
                                                        <th scope="col">Keterangan</th>
                                                        <th scope="col">StWarp</th>
                                                        <th scope="col">StWeft</th>
                                                        <th scope="col">ElgWeft</th>
                                                        <th scope="col">StReinf</th>
                                                        <th scope="col">BeratReinf</th>
                                                        <th scope="col">Standart St Warp</th>
                                                        <th scope="col">Standart St Weft</th>
                                                        <th scope="col">Standart Elg Warp</th>
                                                        <th scope="col">Standart Elg Weft</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- Data rows can be added dynamically here -->
                                                    <tr>
                                                        <td>Mesin 1</td>
                                                        <td>Shift 1</td>
                                                        <td>Id Log 1</td>
                                                        <td>Ukuran 1</td>
                                                        <td>Potongan 1</td>
                                                        <td>Berat 1</td>
                                                        <td>Berat STD 1</td>
                                                        <td>Keterangan 1</td>
                                                        <td>StWarp 1</td>
                                                        <td>StWeft 1</td>
                                                        <td>ElgWeft 1</td>
                                                        <td>StReinf 1</td>
                                                        <td>BeratReinf 1</td>
                                                        <td>Standart St Warp 1</td>
                                                        <td>Standart St Weft 1</td>
                                                        <td>Standart Elg Warp 1</td>
                                                        <td>Standart Elg Weft 1</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-sm-1">
                                        <button class="btn btn-primary btn-block btn-sm">REFRESH</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <button class="btn btn-primary btn-block btn-sm">ISI</button>
                                        <button class="btn btn-primary btn-block btn-sm">KOREKSI</button>
                                        <button class="btn btn-primary btn-block btn-sm">HAPUS</button>
                                        <button class="btn btn-primary btn-block btn-sm">BATAL</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>


    <script type="text/javascript" src="{{ asset('js/QC/Circular/CircularTropodo.js') }}"></script>
@endsection
