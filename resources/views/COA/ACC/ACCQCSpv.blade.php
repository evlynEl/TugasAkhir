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
                    <div class="card-header">ACC QC Spv</div>
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

                        {{-- preview --}}
                        <div class="row">
                            <div class="col-sm-6 d-flex align-items-center justify-content-center bordered">
                                <div>
                                    <h3><strong>PT. KERTA RAJASA RAYA</strong></h3>
                                    Woven Bag - Jumbo Bag Industrial
                                    <br>
                                    FM-8.2-04-QC-01-11
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="row">
                                    <div class="col-12 bordered">Reference No.:</div>
                                </div>
                                <div class="row">
                                    <div class="col-12 bordered">Rev No. :</div>
                                </div>
                                <div class="row">
                                    <div class="col-12 bordered">Date:</div>
                                </div>
                                <div class="row">
                                    <div class="col-12 bordered">Page:</div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6 d-flex align-items-center justify-content-center bordered">
                                <h4><strong>FIBC TESTREPORT</strong></h4>
                            </div>
                            <div class="col-sm-6 d-flex align-items-center justify-content-center bordered">
                                <h4><strong>FORMAT</strong></h4>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                style="background-color: lightgoldenrodyellow">
                                <h5><strong>FIBC DETAIL</strong></h5>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6 bordered">
                                <div class="row">
                                    <div class="col-12">Customer</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Bag Code</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Bag Type</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Po. No.</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Prod. Date</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Testing Date</div>
                                </div>
                            </div>
                            <div class="col-sm-6 bordered">
                                <div class="row">
                                    <div class="col-12">Size</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Reinforced</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Colour</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Weight 1</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">Weight 2</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">SWL / S.F.</div>
                                </div>
                            </div>
                        </div>


                        <div class="row mt-1 bordered">
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="sample" disabled>
                                    <label class="form-check-label" for="sample">Sample</label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="production" disabled>
                                    <label class="form-check-label" for="production">Production</label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="trial" disabled>
                                    <label class="form-check-label" for="trial">Trial</label>
                                </div>
                            </div>
                            <!-- Second row of checkboxes -->
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="preProduction" disabled>
                                    <label class="form-check-label" for="preProduction">Pre-production</label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="specModification" disabled>
                                    <label class="form-check-label" for="specModification">Spec. Modification</label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="sampleFromCustomer" disabled>
                                    <label class="form-check-label" for="sampleFromCustomer">Sample dari
                                        Customer</label>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1 bordered">
                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                style="background-color: lightgoldenrodyellow">
                                <h5><strong>TEST RESULT</strong></h5>
                            </div>
                        </div>

                        <div class="row">
                            <!-- First row of checkboxes -->
                            <div class="col-sm-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox1" disabled>
                                    <label class="form-check-label" for="checkbox1"><strong>Cyclic Test</strong></label>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <div class="form-check">
                                    <label class="form-check-label" for="checkbox2">Lift At:</label>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox3" disabled>
                                    <label class="form-check-label" for="checkbox3">Single Loops</label>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox4" disabled>
                                    <label class="form-check-label" for="checkbox4">Four Loops</label>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox5" disabled>
                                    <label class="form-check-label" for="checkbox5">Two Loops</label>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox6" disabled>
                                    <label class="form-check-label" for="checkbox6">Stevedore</label>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox6" disabled>
                                    <label class="form-check-label" for="checkbox6">Auxalary</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- First row of checkboxes -->
                            <div class="col-sm-2">
                                <div class="form-check">
                                    <label class="form-check-label" for="checkbox1">Result</label>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <div class="form-check">
                                    <label class="form-check-label" for="checkbox2">:</label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox3" disabled>
                                    <label class="form-check-label" for="checkbox3">No visible damage occured</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- First row of checkboxes -->
                            <div class="col-sm-3 offset-sm-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox3" disabled>
                                    <label class="form-check-label" for="checkbox3">Visible damages found at</label>
                                </div>
                            </div>
                            <div class="col-sm-6" style="width: 100%">
                                <input type="text" disabled id="visibleDamage">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/COA/ACC/ACCQCSpv.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/COA/ACC/ACCQCSpv.css') }}">
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
