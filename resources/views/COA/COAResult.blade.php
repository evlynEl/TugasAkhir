@extends('layouts.appCOA')
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
                    <div class="card-header">Test Result</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="row">
                            <div class="col-sm-1">
                                <label for="customer">Customer:</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="customerId">
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="customerName">
                            </div>
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-outline-secondary" id="buttonCustomer">...</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-1">
                                <label for="customer">Type:</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="typeId">
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="typeName">
                            </div>
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-outline-secondary" id="buttonType">...</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-1">
                                <label for="capacity">Capacity:</label>
                            </div>
                            <div class="col-sm-5">
                                <input type="text" class="form-control" id="capacity" readonly>
                            </div>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="idMaster" readonly>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1">
                                <label for="dimension">Dimension:</label>
                            </div>
                            <div class="col-sm-5">
                                <input type="text" class="form-control" id="dimension" readonly>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1">
                                <label for="commodity">Commodity:</label>
                            </div>
                            <div class="col-sm-5">
                                <input type="text" class="form-control" id="commodity" readonly>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1">
                                <label for="tanggal">Tanggal:</label>
                            </div>
                            <div class="col-sm-2">
                                <input type="date" class="form-control" id="tanggal">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1">
                                <label for="no_coa">No. COA:</label>
                            </div>
                            <div class="col-sm-5">
                                <input type="text" class="form-control" id="no_coa">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1">
                                <label for="no_po">No. PO:</label>
                            </div>
                            <div class="col-sm-5">
                                <input type="text" class="form-control" id="no_po">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1">
                                <label for="no_sp">No. SP:</label>
                            </div>
                            <div class="col-sm-5">
                                <input type="text" class="form-control" id="no_sp">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-2 ml-3">
                                <br>
                                <label>Detail COA</label>
                            </div>
                        </div>

                        <div style="outline: solid 1px #ddd; padding: 10px;">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="part_section">Part Section:</label>
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="part_section">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-outline-secondary" id="buttonPartSection">...</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="material">Material:</label>
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="material">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-outline-secondary" id="buttonMaterial">...</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="item">Item:</label>
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="item">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-outline-secondary" id="buttonItem">...</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="idItem" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="test_result">Test Result:</label>
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="test_result">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-outline-secondary" id="buttonTambah">Tambah</button>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-sm-12">
                                    <div class="table-responsive fixed-height">
                                        <table id="tableDetail">
                                            <thead>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>


                        </div>

                        <div class="row mt-2">
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-outline-secondary" id="buttonProses">Proses</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('/js/COA/COAResult.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('/css/COA/COAResult.css') }}">
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
