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
                    <div class="card-header">Input Test</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="refNo">Reference No:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="refNo" name="refNo" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_info" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-6">
                                <label for="customer">Customer:</label>
                                <input type="text" class="form-control" id="customer" name="customer" readonly>
                            </div>
                        </div>

                        <label>Test Method Detail</label>
                        <div class="form-row" id="test_condidion" style="border: 1px solid #ddd">
                            <div class="col-md-12 mt-3">
                                <label for="customer">A. Test Condition</label>
                                <div class="form-group">
                                    <label for="customer">Filling wiht plastic granule at height approx. </label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="Height_Approx" name="Height_Approx">
                                        <div class="input-group-append">
                                            <span class="input-group-text">cm</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" id="fitDraw">
                                    <label>Pressure plate dimension</label>
                                    <div class="ml-3">
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Dia" id="Dia"
                                                value="Dia">
                                            <label class="form-check-label" for="Dia">Dia</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="dia_val" name="dia_val">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">cm</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Square" id="Square"
                                                value="Square">
                                            <label class="form-check-label" for="Square">Square</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="square_val"
                                                    name="square_val">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">cm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>B. Cyclic Test: </label>
                                    <label>30 X cycles of load application to approx.</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="cyclic" name="cyclic">
                                        <div class="input-group-append">
                                            <span class="input-group-text">kg (2 x SWL)</span>
                                        </div>
                                    </div>
                                </div>

                                <label>C. Top Lift Test: </label>
                                <div class="form-group">
                                    <label>Load speed :</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="cyclic" name="cyclic">
                                        <div class="input-group-append">
                                            <span class="input-group-text">cm / mnt (bag dalam keadaan kosong)</span>
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
    <script src="{{ asset('js/COA/Input/InputTest.js') }}"></script>
@endsection
