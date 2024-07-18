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
                    <div class="card-header">Extruder D</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="container">

                            <!-- Row 1: Jam Input, Nomor Transaksi, and Button Nomor Transaksi -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="jamInput" class="col-form-label">Jam Input</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="time" class="form-control" id="jamInput">
                                </div>
                                <div class="col-sm-3">
                                </div>
                                <div class="col-sm-2">
                                    <label for="nomorTransaksi" class="col-form-label">No. Transaksi</label>
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
                                    <label for="tanggal" class="col-form-label">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                            </div>

                            <!-- Row 3: Shift Letter, Shift Awal, Shift Akhir -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="shiftLetter" class="col-form-label">Shift</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="shiftLetter" maxlength="1">
                                </div>
                                <div class="col-sm-2">
                                    <input type="time" class="form-control" id="shiftAwal" readonly>
                                </div>
                                <label class="col-form-label">S/D</label>
                                <div class="col-sm-2">
                                    <input type="time" class="form-control" id="shiftAkhir" readonly>
                                </div>
                            </div>

                            <!-- Row 4: Mesin, Nama Mesin, and Button Cari Mesin -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="mesin" class="col-form-label">Mesin</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="mesin" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="namaMesin" readonly>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary" id="buttonIdMesin">...</button>
                                </div>
                            </div>

                            <!-- Row 5: Spek Benang, Id Konversi Ext, and Button Spek Benang -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="spekBenang" class="col-form-label">Spek Benang</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="spekBenang" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-primary" id="buttonSpekBenang">...</button>
                                </div>
                                <div class="col-sm-2">
                                    <label for="idKonversi" class="col-form-label">Id Konversi Ext:</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="idKonversi">
                                </div>

                            </div>

                            {{-- <!-- Row 6: Keterangan and Denier Rata-Rata -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="keterangan" class="col-form-label">Keterangan</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="keterangan">
                                </div>
                                <div class="col-sm-2">
                                    <label for="denier" class="col-form-label">Denier Rata-Rata</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="denier">
                                </div>
                            </div> --}}

                        </div>


                        {{-- ----------------------- --}}
                        {{-- quantity dan prosentase --}}
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col-sm-9">
                                </div>
                                <div class="col-sm-1">
                                    Quantity
                                </div>
                                <div class="col-sm-1">
                                    Prosen
                                </div>
                            </div>

                            {{-- Bahan Baku --}}
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Bahan Baku</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="bahan" name="bahan" class="form-control mb-1"
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
                                    <input type="text" id="calpetCaco3" name="calpetCaco3" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeCalpetCaco3" name="typeCalpetCaco3"
                                        class="form-control mb-1" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-primary" id="buttonCalpetCaco3">...</button>
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
                                    <input type="text" id="masterBath" name="masterBath" class="form-control mb-1"
                                        readonly>
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
                                    <input type="text" id="uv" name="uv" class="form-control mb-1"
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
                                    <input type="text" id="quantityUv" name="quantityUv" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseUv" name="prosentaseUv"
                                        class="form-control mb-1" readonly>
                                </div>
                            </div>

                            <!-- LDPE -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>LDPE</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="ldpe" name="ldpe" class="form-control mb-1"
                                    readonly>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeLdpe" name="typeLdpe" class="form-control mb-1"
                                    readonly>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-primary" id="buttonLdpe">...</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityLdpe" name="quantityLdpe"
                                        class="form-control mb-1" readonly>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseLdpe" name="prosentaseLdpe"
                                        class="form-control mb-1" readonly>
                                </div>
                            </div>

                            <!-- Anti Static -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Anti Static</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="antiStatic" name="antiStatic" class="form-control mb-1"
                                        readonly>
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
                                    <input type="text" id="peletan" name="peletan" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typePeletan" name="typePeletan" class="form-control mb-1"
                                        readonly>
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
                                    <input type="text" id="additif" name="additif" class="form-control mb-1"
                                        readonly>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeAdditif" name="typeAdditif" class="form-control mb-1"
                                        readonly>
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

                            <!-- Row 6: Keterangan and Denier Rata-Rata -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="keterangan" class="col-form-label">Keterangan</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="keterangan">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="denier" class="col-form-label">Denier Rata-Rata</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="denier">
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {{-- table daftar Komposisi --}}
                <div class="card">
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="container">
                                <h5>Daftar Komposisi</h5>
                                <div class="row">
                                    <div class="col-sm-10">
                                        <div class="table-responsive">
                                            <table class="table table-bordered" id="tableKomposisi">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Id Type</th>
                                                        <th scope="col">Nama Type</th>
                                                        <th scope="col">Jenis</th>
                                                        {{-- <th scope="col">Kelompok</th> --}}
                                                        <th scope="col">Qty</th>
                                                        <th scope="col">Prosen</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <button class="btn btn-primary btn-block btn-sm" id="isiButton">ISI</button>
                                        <button class="btn btn-primary btn-block btn-sm"
                                            id="koreksiButton">KOREKSI</button>
                                        <button class="btn btn-primary btn-block btn-sm" id="hapusButton">HAPUS</button>
                                        <button class="btn btn-primary btn-block btn-sm" id="prosesButton">PROSES</button>
                                        <button class="btn btn-primary btn-block btn-sm" id="batalButton">BATAL</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>Lebar Benang</label>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="lebarBenang" name="lebarBenang"
                                            class="form-control additional mb-1">
                                    </div>
                                    <div class="col-sm-2">
                                        <label>Denier</label>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="denierAdd" name="denierAdd"
                                            class="form-control additional mb-1">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-2">
                                        <label>Strength</label>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="strength" name="strength"
                                            class="form-control additional mb-1">
                                    </div>
                                    <div class="col-sm-2">
                                        <label>Elongation</label>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="elongation" name="elongation"
                                            class="form-control additional mb-1">
                                    </div>
                                    %
                                    <div class="col-sm-2">
                                        <label>Ket. Strength</label>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="text" id="ketStrength" name="ketStrength"
                                            class="form-control additional mb-1">
                                    </div>
                                    <div class="col-sm-1">
                                        <button class="btn btn-primary btn-block btn-sm" id="tambahButton">+</button>
                                    </div>
                                    <div class="col-sm-1">
                                        <button class="btn btn-primary btn-block btn-sm" id="kurangButton">-</button>
                                    </div>
                                </div>

                                <br>
                                <div class="row">
                                    <div class="col-sm-10">
                                        <div class="table-responsive">
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
        </div>
    </div>

    <script type="text/javascript" src="{{ asset('js/QC/Extruder/ExtruderD.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
