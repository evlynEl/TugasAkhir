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
                    <div class="card-header">ACC Manager - FIBC</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-row">
                            <div class="form-group col-8">
                                <label for="refNo">Reference No:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="refNo" name="refNo" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_info" class="btn btn-info">...</button>
                                    </div>
                                </div>

                                <label for="customer">Customer:</label>
                                <input type="text" class="form-control" id="customer" name="customer" readonly>
                            </div>
                            <div class="form-group col-4 d-flex align-items-center justify-content-center">
                                <div class="text-center">
                                    <button type="button" id="btn-detail" class="btn btn-outline-secondary"
                                        style="width: 150px;">Detail</button>
                                    <button type="button" id="btn-acc" class="btn btn-outline-secondary"
                                        style="width: 150px;">ACC</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/COA/ACC/ACCQCMng.js') }}"></script>
@endsection
