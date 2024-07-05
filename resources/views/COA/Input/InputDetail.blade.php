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
                    <div class="card-header">Input FIBC Detail</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-group">
                            <label for="current-date">Tanggal :</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggal" name="tanggal" onchange="getYearFromInput()">
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Tahun :</label>
                            <input type="text" id="year" name="year" class="form-control" readonly>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label>Ref No :</label>
                                <input type="text" id="reffNo" name="reffNo" class="form-control">
                            </div>
                            <div class="form-group col-md-10" style="margin-top: 31px;">
                                <div class="input-group">
                                    <input type="text" id="Tanggal" name="Tanggal" class="form-control">
                                    <div class="input-group-append">
                                        <button type="button" id="btn_RefNo" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="form-row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="customer">Customer</label>
                                    <input type="text" class="form-control" id="customer" name="customer">
                                </div>
                                <div class="form-group">
                                    <label for="bag-code">Bag Code</label>
                                    <input type="text" class="form-control" id="bag-code" name="bag-code">
                                    <div class="input-group-append">
                                        <button type="button" id="btn_BagCode" class="btn btn-info">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="bag-type">Bag Type</label>
                                    <input type="text" class="form-control" id="bag-type" name="bag-type">
                                </div>
                                <div class="form-group">
                                    <label for="po-no">PO No</label>
                                    <input type="text" class="form-control" id="po-no" name="po-no">
                                </div>
                                <div class="form-group">
                                    <label for="prod-date">Prod. Date</label>
                                    <input type="date" class="form-control" id="prod-date" name="prod-date">
                                </div>
                                <div class="form-group">
                                    <label for="testing-date">Testing Date</label>
                                    <input type="date" class="form-control" id="testing-date" name="testing-date">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="size">Size</label>
                                    <input type="text" class="form-control" id="size" name="size">
                                </div>
                                <div class="form-group">
                                    <label for="reinforced">Reinforced</label>
                                    <input type="text" class="form-control" id="reinforced" name="reinforced">
                                </div>
                                <div class="form-group">
                                    <label for="colour">Colour</label>
                                    <input type="text" class="form-control" id="colour" name="colour">
                                </div>
                                <div class="form-group">
                                    <label for="swl">SWL</label>
                                    <input type="text" class="form-control" id="swl" name="swl">
                                </div>
                                <div class="form-group">
                                    <label for="sf">S.F.</label>
                                    <input type="text" class="form-control" id="sf" name="sf">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Weight</label>
                                    <div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="weight" id="weight1"
                                                value="weight1">
                                            <label class="form-check-label" for="weight1">Weight 1</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="weight" id="weight2"
                                                value="weight2">
                                            <label class="form-check-label" for="weight2">Weight 2</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="length">Panjang</label>
                                            <input type="text" class="form-control" id="length" name="length">
                                        </div>
                                        <div class="form-group">
                                            <label for="waft1">Waft</label>
                                            <input type="text" class="form-control" id="waft1" name="waft1">
                                        </div>
                                        <div class="form-group">
                                            <label for="denier-waft1">Denier Waft</label>
                                            <input type="text" class="form-control" id="denier-waft1"
                                                name="denier-waft1">
                                        </div>
                                        <div class="form-group">
                                            <label for="weight1">Weight</label>
                                            <input type="text" class="form-control" id="weight1" name="weight1">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="width">Lebar</label>
                                            <input type="text" class="form-control" id="width" name="width">
                                        </div>
                                        <div class="form-group">
                                            <label for="waft2">Waft</label>
                                            <input type="text" class="form-control" id="waft2" name="waft2">
                                        </div>
                                        <div class="form-group">
                                            <label for="denier-waft2">Denier Waft</label>
                                            <input type="text" class="form-control" id="denier-waft2"
                                                name="denier-waft2">
                                        </div>
                                        <div class="form-group">
                                            <label for="weight2">Weight</label>
                                            <input type="text" class="form-control" id="weight2" name="weight2">
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



    <script src="{{ asset('js/COA/InputDetail.js') }}"></script>
@endsection
