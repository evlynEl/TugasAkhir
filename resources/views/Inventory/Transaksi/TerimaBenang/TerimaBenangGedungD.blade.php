@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header" style="">Terima Benang EXTRUDER</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        {{-- ATAS --}}
                        <div class="bordered pl-3">
                            <label class="pl-3">
                                <h6><strong>Pemberi Benang</strong></h6>
                            </label>
                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="divisiId" name="divisiId" class="form-control">
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama">
                                </div>
                                <div class="col-sm-1 offset-sm-3">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" style="height: 80%" id="tanggal" name="tanggal"
                                        class="form-control">
                                </div>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="objekId" name="objekId" class="form-control">
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="objekNama" name="objekNama">
                                </div>
                                <div class="col-sm-2">
                                    <label for="kelompokId">&nbsp;&nbsp;Kelompok</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="kelompokId" name="kelompokId" class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kelompokNama" name="kelompokNama">
                                        <div class="input-group-append">
                                            <button type="button" id="btn_kelompok" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="kelutId" name="kelutId" class="form-control">
                                </div>
                                <div class="col-sm-3">
                                        <input type="text" class="form-control" id="kelutNama" name="kelutNama">
                                </div>
                                <div class="col-sm-2">
                                    <label for="subkelId">&nbsp; Sub Kelompok</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="subkelId" name="subkelId" class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="subkelNama" name="subkelNama">
                                        <div class="input-group-append">
                                            <button type="button" id="btn_subkel" class="btn btn-info" disabled>...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="kodeType">Kode Type</label>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kodeType" name="kodeType"
                                            class="form-control">
                                    </div>
                                </div>
                                <div class="col-sm-1">
                                    <label>PIB</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="pib" name="pib"
                                        class="form-control">
                                </div>

                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kodeBarang" name="kodeBarang"
                                        class="form-control" style="display: none">
                                </div>
                            </div>

                            <div class="row pr-5 pb-1 pt-1">
                                <div class="col-sm-2">
                                    <label for="type-id">Nama Type</label>
                                </div>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="namaType" name="namaType"
                                            class="form-control">
                                        <div class="input-group-append">
                                            <button type="button" id="btn_namatype" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <br>

                        <div class="bordered pl-3">
                            <label class="pl-3">
                                <h6><strong>Penerima Benang</strong></h6>
                            </label>

                            <div class="row pr-5 pb-1">
                                <div class="col-sm-2">
                                    <label>Jumlah Benang: </label>
                                </div>

                                <div class="col-sm-1">
                                    <label>Sekunder</label>
                                </div>

                                <div class="col-sm-2" style="margin-left: 3%">
                                    <div class="input-group">

                                        <input type="text" class="form-control" id="sekunder" name="sekunder"
                                            readonly>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanSekunder"
                                            name="satuanSekunder" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-1">
                                    <label>Tritier</label>
                                </div>

                                <div class="col-sm-2" style="margin-left: 3%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="tritier" name="tritier" readonly value=0>
                                    </div>
                                </div>
                                <div class="col-sm-1" style="margin-left: -2%">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="satuanTritier" readonly
                                            name="satuanTritier">
                                    </div>
                                </div>
                            </div>

                            <div class="row pr-5 pb-1">
                                <div class="col-sm-2">
                                    <label>Alasan Transfer: </label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="alasanTransfer" name="alasanTransfer" readonly
                                        class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <label style="color: blue"><strong>P/S/M.DD-MM-YY.EXP</strong></label>
                                </div>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="divisiIdPenerima">Divisi</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="divisiIdPenerima" name="divisiIdPenerima"
                                        class="form-control">
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="divisiNamaPenerima"
                                        name="divisiNamaPenerima">
                                </div>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="objekIdPenerima">Objek</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="objekIdPenerima" name="objekIdPenerima"
                                        class="form-control">
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="objekNamaPenerima"
                                        name="objekNamaPenerima">
                                </div>
                                <div class="col-sm-2">
                                    <label for="kelompokIdPenerima">&nbsp;&nbsp;Kelompok</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="kelompokIdPenerima" name="kelompokIdPenerima"
                                        class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="kelompokNamaPenerima"
                                        name="kelompokNamaPenerima">
                                </div>
                            </div>

                            <div class="row pt-1 pr-5">
                                <div class="col-sm-2">
                                    <label for="kelutIdPenerima">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="kelutIdPenerima" name="kelutIdPenerima"
                                        class="form-control">
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelutNamaPenerima"
                                        name="kelutNamaPenerima">
                                </div>
                                <div class="col-sm-2">
                                    <label for="subkelIdPenerima">&nbsp; Sub Kelompok</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="subkelIdPenerima" name="subkelIdPenerima"
                                        class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="subkelNamaPenerima"
                                            name="subkelNamaPenerima">
                                        <div class="input-group-append">
                                            <button type="button" id="btn_subkelPenerima" disabled
                                                class="btn btn-info" >...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-2">
                                <button type="button" id="btn_isi" style="width: 75%"
                                    class="btn btn-info">ISI</button>
                            </div>
                            <div class="col-sm-2 offset-sm-6">
                                <button type="button" id="btn_proses" style="width: 75%" disabled
                                    class="btn btn-info">PROSES</button>
                            </div>
                            <div class="col-sm-2">
                                <button type="button" id="btn_batal" style="width: 75%" disabled
                                    class="btn btn-info">BATAL</button>
                            </div>
                        </div>

                        <div class="row divTable" style="margin-top: 0.5%">
                            <div class="col-sm-12">
                                <div class="table-responsive fixed-height" style="height: 300px">
                                    <table class="table table-bordered no-wrap-header" id="tableData">
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
    <link rel="stylesheet" href="{{ asset('css/Inventory/Transaksi/TerimaBenang/TerimaBenangGedungD.css') }}">
    <script src="{{ asset('js/Inventory/Transaksi/TerimaBenang/TerimaBenangGedungD.js') }}"></script>
@endsection
