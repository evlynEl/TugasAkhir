@extends('layouts.appQC')
@section('content')

    <body class="bodyExB">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-7 RDZMobilePaddingLR0">
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
                        <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="padding-left: 20px">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label style="padding: 0; text-decoration: underline;">Extruder B</label>
                                </div>
                                <div class="col-sm-2 offset-sm-8">
                                    <button type="button" class="btn btn-primary" id="fullScreenButton">Full
                                        Screen</button>
                                </div>
                            </div>

                            <!-- Row 1: Jam Input, Nomor Transaksi, and Button Nomor Transaksi -->
                            <div class="row" style="padding-top: 10px">
                                <div class="col-sm-2">
                                    <label for="jamInput">Jam Input</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="time" class="form-control" id="jamInput">
                                </div>
                                <div class="col-sm-4 d-flex justify-content-end align-items-center">
                                    <label for="nomorTransaksi" class="mb-0">No. Transaksi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="nomorTransaksi" class="form-control" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-primary" id="buttonNomorTransaksi">...</button>
                                </div>
                            </div>

                            <!-- Row 2: Tanggal -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                            </div>

                            <!-- Row 3: Shift Letter, Shift Awal, Shift Akhir -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="shiftLetter">Shift</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="shiftLetter" maxlength="1">
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Jam Shift</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="shiftAwal" readonly>
                                </div>
                                <label>S/D</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="shiftAkhir" readonly>
                                </div>
                            </div>

                            <!-- Row 4: Mesin, Nama Mesin, and Button Cari Mesin -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="mesin">Mesin</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="mesin" readonly>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="namaMesin" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-primary" id="buttonIdMesin">...</button>
                                </div>
                            </div>

                            <!-- Row 5: Spek Benang, Id Konversi Ext, and Button Spek Benang -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="spekBenang">Spek Benang</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="spekBenang" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-primary" id="buttonSpekBenang">...</button>
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end align-items-center">
                                    <label for="idKonversi" class="d-none">Id Konversi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control d-none" id="idKonversi">
                                </div>

                            </div>


                            {{-- ----------------------- --}}
                            {{-- quantity dan prosentase --}}
                            <div class="row" style="margin-bottom: 5px">
                                <div class="col-sm-10 d-flex justify-content-end align-items-center">
                                    Quantity
                                </div>
                                Prosentase
                            </div>

                            <div class="hapusElement">
                                {{-- Bahan Baku --}}
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>Bahan Baku</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input style="width: 120%" type="text" id="bahan" name="bahan" class="form-control mb-1"
                                            readonly>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="typeBahan" name="typeBahan" class="form-control mb-1"
                                            readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary" id="buttonBahanBaku">...</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="quantityBahanBaku" name="quantityBahanBaku"
                                            class="form-control mb-1" readonly>
                                    </div>
                                </div>

                                <!-- CACO3 -->
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>CACO3</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input style="width: 120%" type="text" id="calpetCaco3" name="calpetCaco3"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="typeCalpetCaco3" name="typeCalpetCaco3"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary"
                                            id="buttonCalpetCaco3">...</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="quantityCalpetCaco3" name="quantityCalpetCaco3"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="prosentaseCalpetCaco3" name="prosentaseCalpetCaco3"
                                            class="form-control mb-1" readonly>
                                    </div>
                                </div>

                                <!-- MasterBath -->
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>MasterBath</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input style="width: 120%" type="text" id="masterBath" name="masterBath"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="typeMasterBath" name="typeMasterBath"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary" id="buttonMasterBath">...</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="quantityMasterBath" name="quantityMasterBath"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="prosentaseMasterBath" name="prosentaseMasterBath"
                                            class="form-control mb-1" readonly>
                                    </div>
                                </div>

                                <!-- U V -->
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>U V</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input style="width: 120%" type="text" id="uv" name="uv" class="form-control mb-1"
                                            readonly>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="typeUv" name="typeUv" class="form-control mb-1"
                                            readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary" id="buttonUv">...</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="quantityUv" name="quantityUv"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="prosentaseUv" name="prosentaseUv"
                                            class="form-control mb-1" readonly>
                                    </div>
                                </div>

                                <!-- Anti Static -->
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>Anti Static</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input style="width: 120%" type="text" id="antiStatic" name="antiStatic"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="typeAntiStatic" name="typeAntiStatic"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary" id="buttonAntiStatic">...</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="quantityAntiStatic" name="quantityAntiStatic"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="prosentaseAntiStatic" name="prosentaseAntiStatic"
                                            class="form-control mb-1" readonly>
                                    </div>
                                </div>

                                <!-- Peletan -->
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>Peletan</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input style="width: 120%" type="text" id="peletan" name="peletan" class="form-control mb-1"
                                            readonly>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="typePeletan" name="typePeletan"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary" id="buttonPeletan">...</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="quantityPeletan" name="quantityPeletan"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="prosentasePeletan" name="prosentasePeletan"
                                            class="form-control mb-1" readonly>
                                    </div>
                                </div>

                                <!-- Additif -->
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>Additif</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input style="width: 120%" type="text" id="additif" name="additif" class="form-control mb-1"
                                            readonly>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" id="typeAdditif" name="typeAdditif"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <button type="button" class="btn btn-primary" id="buttonAdditif">...</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="quantityAdditif" name="quantityAdditif"
                                            class="form-control mb-1" readonly>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="prosentaseAdditif" name="prosentaseAdditif"
                                            class="form-control mb-1" readonly>
                                    </div>
                                </div>
                            </div>

                            <!-- Row 6: Keterangan and Denier Rata-Rata -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="keterangan">Keterangan</label>
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="keterangan">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="denier">Denier Rata-Rata</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="denier">
                                </div>
                            </div>

                            <br>
                            <div class="row">
                                <div class="col">
                                    <button class="btn btn-primary btn-block btn-sm btn-custom-width"
                                        id="isiButton">ISI</button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary btn-block btn-sm btn-custom-width"
                                        id="koreksiButton">KOREKSI</button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary btn-block btn-sm btn-custom-width"
                                        id="hapusButton">HAPUS</button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary btn-block btn-sm btn-custom-width"
                                        id="prosesButton">PROSES</button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary btn-block btn-sm btn-custom-width"
                                        id="batalButton">BATAL</button>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>

                {{-- table daftar Komposisi --}}
                <div class="col-md-5 RDZMobilePaddingLR0">

                    <div class="card">
                        <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                            <label>Daftar Komposisi</label>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive fixed-height">
                                        <table class="table table-bordered" id="tableKomposisi">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id Type</th>
                                                    <th scope="col">Nama Type</th>
                                                    <th scope="col">Jenis</th>
                                                    <th scope="col">Qty</th>
                                                    <th scope="col">Prosen</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="card" style="margin-top: 10px">
                        <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                            <div class="row">
                                <div class="col-sm-3">
                                    <label>Lebar Benang</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="lebarBenang" name="lebarBenang"
                                        class="form-control additional mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label>Denier</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="denierAdd" name="denierAdd"
                                        class="form-control additional mb-1">
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <label>Strength</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="strength" name="strength"
                                        class="form-control additional mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <label>Elongation</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="elongation" name="elongation"
                                        class="form-control additional mb-1">
                                </div>
                                %

                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <label>Ket. Strength</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="ketStrength" name="ketStrength"
                                        class="form-control additional mb-1">
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-primary btn-block btn-sm" id="tambahButton"
                                        style="width: 100%">+</button>
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-primary btn-block btn-sm" id="kurangButton"
                                        style="width: 100%">-</button>
                                </div>
                            </div>

                            <br>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive fixed-height" style="height: 180px">
                                        <table class="table table-bordered" id="tabelAdd">
                                            <thead>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </body>

    <script type="text/javascript" src="{{ asset('js/QC/Extruder/ExtruderB.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/QC/Extruder/ExtruderB.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
