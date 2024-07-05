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
                    <div class="card-header">ACC COA</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="customer-id">Customer :</label>
                                <input type="text" id="customer-id" name="customer-id" class="form-control">
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
                                <input type="text" id="type-id" name="type-id" class="form-control">
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
                            <label for="NoCOA">No COA :</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="NoCOA" name="NoCOA" required>
                                <div class="input-group-append">
                                    <button type="button" id="btn_noCOA" class="btn btn-info">...</button>
                                </div>
                            </div>
                        </div>

                        <button type="button" id="btn_acc" class="btn btn-outline-success">ACC</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
