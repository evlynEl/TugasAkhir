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
                    <div class="card-header">Master Type Section</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="form-group d-flex align-items-center" id="jenisBarang">
                            <label style="margin-right: 10px; margin-bottom: 0px;">Jenis Barang: </label><br>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="jenis-barang-block" name="jenis-barang"
                                    value="Block Bottom">
                                <label class="form-check-label" for="jenis-barang-block">Block Bottom</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="jenis-barang-woven" name="jenis-barang"
                                    value="Woven Bag">
                                <label class="form-check-label" for="jenis-barang-woven">Woven Bag</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="jenis-barang-jumbo" name="jenis-barang"
                                    value="Jumbo Bag">
                                <label class="form-check-label" for="jenis-barang-jumbo">Jumbo Bag</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="jenis-barang-cloth" name="jenis-barang"
                                    value="Cloth">
                                <label class="form-check-label" for="jenis-barang-cloth">Cloth</label>
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center" id="jenisJual">
                            <label style="margin-right: 30px; margin-bottom: 0px;">Jenis Jual:</label><br>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="jenis-jual-lokal" name="jenis-jual"
                                    value="Lokal">
                                <label class="form-check-label" for="jenis-jual-lokal">Lokal</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="jenis-jual-fasilitas" name="jenis-jual"
                                    value="Export Fasilitas">
                                <label class="form-check-label" for="jenis-jual-fasilitas">Export Fasilitas</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="jenis-jual-non-fasilitas"
                                    name="jenis-jual" value="Export Non Fasilitas">
                                <label class="form-check-label" for="jenis-jual-non-fasilitas">Export Non Fasilitas</label>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="customer-id">Customer :</label>
                                <input type="text" id="customer-id" name="customer-id" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-10" style=" margin-top: 31px;">
                                <div class="input-group">
                                    <input type="text" id="nama-cust" name="nama-cust" class="form-control">
                                    <div class="input-group-append">
                                        <button type="button" id="btn_cust" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="type-id">Type :</label>
                                <input type="text" id="type-id" name="type-id" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-10" style=" margin-top: 31px;">
                                <div class="input-group">
                                    <input type="text" id="nama-type" name="nama-type" class="form-control">
                                    <div class="input-group-append">
                                        <button type="button" id="btn_type" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="capacity">Capacity (kg):</label><br>
                            <input type="number" id="capacity" name="capacity" class="form-control">
                        </div>

                        <div class="form-group d-flex align-items-center">
                            <label for="dimension" class="mr-3 mb-0">Dimension:</label>
                            <input type="text" id="dimension" name="dimension" class="form-control">
                        </div>

                        <div class="form-group d-flex align-items-center">
                            <label for="comodity">Comodity:</label><br>
                            <input type="number" id="sf1" name="sf1" class="form-control mr-1">
                        </div>


                        {{-- Detail COA --}}
                        <label style="margin-top: 20px">Detail COA</label>
                        <div class="detilCOA">
                            <div class="form-group">
                                <label for="part">Part Section: </label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="part" name="part" required>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_lihat" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="material">Material Section: </label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="material" name="material" required>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_lihat" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="item">Item:</label>
                                <input type="text" id="item" name="item" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="standard">Standard:</label>
                                <input type="text" id="standard" name="standard" class="form-control">
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="{{ asset('css/COA/MasterType.css') }}">
    <script src="{{ asset('js/COA/Master/MasterType.js') }}"></script>
@endsection
