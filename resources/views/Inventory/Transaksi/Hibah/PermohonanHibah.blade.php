@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">PerMohon Hibah</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row" style="margin-top: 0%">
                            <label class="col-sm-1 col-form-label">Tanggal</label>
                            <div class="col-sm-2">
                                <input type="date" class="form-control" id="tanggal">
                            </div>
                            <div class="col-sm-1">
                                <label for="divisiId">Divisi</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" id="divisiId" name="divisiId" class="form-control" readonly>
                            </div>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_divisi" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">

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

                            </div>

                            <div class="col-sm-6 bordered pb-2">

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="obje`Id">Objek</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="objekNama" name="objekNama"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_objek" class="btn btn-info" disabled>...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="kelutId">Kel Utama</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="kelutId" name="kelutId" class="form-control" readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="kelutNama" name="kelutNama"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_kelut" class="btn btn-info" disabled>...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="kelompokId">Kelompok</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="kelompokId" name="kelompokId" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_kelompok" class="btn btn-info" disabled>...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="subkelId">Sub Kelompok</label>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" id="subkelId" name="subkelId" class="form-control" readonly>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="subkelNama" name="subkelNama"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_subkel" class="btn btn-info" disabled>...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="typeId">Id Type</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="typeId" name="typeId"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_type" class="btn btn-info" disabled>...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="typeNama">Nama Type</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="typeNama" name="typeNama"
                                            readonly>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-sm-3">
                                        <label for="namaPemberi">Nama Pemberi/Hibah</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="namaPemberi" name="namaPemberi"
                                            readonly>
                                    </div>
                                </div>

                                <div class="row ">
                                    <div class="col-sm-10 offset-sm-1 bordered">
                                        <div class="row pt-1">
                                            <div class="col-sm-9 offset-sm-1">
                                                <label for="namaPemberi">Jml Pemberian</label>
                                            </div>
                                        </div>

                                        <div class="row pt-1">
                                            <div class="col-sm-2 ml-3">
                                                <label for="primer">Primer</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="primer" name="primer" class="form-control"
                                                    readonly>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" id="satPrimer"
                                                    name="satPrimer" readonly>
                                            </div>
                                        </div>

                                        <div class="row pt-1">
                                            <div class="col-sm-2 ml-3">
                                                <label for="sekunder">Sekunder</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="sekunder" name="sekunder"
                                                    class="form-control" readonly>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" id="satSekunder"
                                                    name="satSekunder" readonly>
                                            </div>
                                        </div>

                                        <div class="row pt-1 pb-2">
                                            <div class="col-sm-2 ml-3">
                                                <label for="tritier">Tritier</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="tritier" name="tritier" class="form-control"
                                                    readonly>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" id="satTritier"
                                                    name="satTritier" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row mt-2">
                                    <div class="col-sm-2">
                                        <button type="button" id="btn_isi" class="btn btn-info"
                                            style="width: 125%" disabled>ISI</button>
                                    </div>
                                        <div class="col-sm-2">
                                            <button type="button" id="btn_koreksi" class="btn btn-info"
                                                style="width: 125%" disabled>KOREKSI</button>
                                        </div>
                                        <div class="col-sm-2">
                                            <button type="button" id="btn_hapus" class="btn btn-info"
                                                style="width: 125%" disabled>HAPUS</button>
                                        </div>
                                        <div class="col-sm-2">
                                            <button type="button" id="btn_proses" class="btn btn-info"
                                                style="width: 125%" disabled>PROSES</button>
                                        </div>
                                        <div class="col-sm-2">
                                            <button type="button" id="btn_batal" class="btn btn-info"
                                                style="width: 125%" disabled>BATAL</button>
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

    <link rel="stylesheet" href="{{ asset('css/Inventory/Transaksi/Hibah/PermohonanHibah.css') }}">
    <script src="{{ asset('js/Inventory/Transaksi/Hibah/PermohonanHibah.js') }}"></script>
@endsection
