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
                                <input type="date" class="form-control" id="tanggal" name="tanggal"
                                    onchange="getYearFromInput()">
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
                                    <input type="text" id="refNo" name="refNo" class="form-control">
                                    <div class="input-group-append">
                                        <button type="button" id="btn_RefNo" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {{-- FIBC Detail --}}
                        <label for="FIBC_Detail">FIBC Detail</label>
                        <div class="form-row" style="border: 1px solid #ddd">
                            <div class="col-md-4 mt-3">
                                <div class="form-group">
                                    <label for="customer">Customer :</label>
                                    <input type="text" class="form-control" id="customer" name="customer">
                                </div>
                                <div class="form-group">
                                    <label for="bag-code">Bag Code :</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="bag-code" name="bag-code">
                                        <div class="input-group-append">
                                            <button type="button" id="btn_BagCode" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="bag-type">Bag Type :</label>
                                    <input type="text" class="form-control" id="bag-type" name="bag-type">
                                </div>
                                <div class="form-group">
                                    <label for="po-no">PO No :</label>
                                    <input type="text" class="form-control" id="po-no" name="po-no">
                                </div>
                                <div class="form-group">
                                    <label for="prod-date">Prod. Date :</label>
                                    <input type="date" class="form-control" id="prod-date" name="prod-date">
                                </div>
                                <div class="form-group">
                                    <label for="testing-date">Testing Date :</label>
                                    <input type="date" class="form-control" id="testing-date" name="testing-date">
                                </div>
                            </div>

                            <div class="col-md-4 mt-3">
                                <div class="form-group">
                                    <label for="size">Size :</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="size" name="size">
                                        <span class="ml-1">cm</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="reinforced">Reinforced :</label>
                                    <select class="form-control" id="reinforced" name="reinforced">
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="colour">Colour :</label>
                                    <input type="text" class="form-control" id="colour" name="colour">
                                </div>

                                <div class="form-group">
                                    <label for="swl">SWL :</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="swl" name="swl">
                                        <span class="ml-1">kg</span>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label for="sf">S.F. :</label>
                                    <input type="text" class="form-control" id="sf" name="sf">
                                </div>
                            </div>

                            <div class="col-md-4 mt-3">
                                <div class="form-group text-center">
                                    <div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="radio" name="weight" id="weight1" value="weight1">
                                            <label class="form-check-label" for="weight1">Weight 1</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="radio" name="weight" id="weight2" value="weight2">
                                            <label class="form-check-label" for="weight2">Weight 2</label>
                                        </div>
                                    </div>
                                    <label for="weightLabel" id="weightLabel" class="text-center mt-2">Weight 1</label>
                                </div>

                                <div class="row" id="formWeight1">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="length1">Panjang 1:</label>
                                            <input type="text" class="form-control" id="length1" name="length1">
                                        </div>
                                        <div class="form-group">
                                            <label for="waft1">Waft :</label>
                                            <input type="text" class="form-control" id="waft1" name="waft1">
                                        </div>
                                        <div class="form-group">
                                            <label for="denier-waft1">Denier Waft :</label>
                                            <input type="text" class="form-control" id="denier-waft1" name="denier-waft1">
                                        </div>
                                        <div class="form-group">
                                            <label for="weight1">Weight :</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="weightInput1" name="weight1">
                                                <span class="ml-1">gms</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="width1">Lebar :</label>
                                            <input type="text" class="form-control" id="width1" name="width1">
                                        </div>
                                        <div class="form-group">
                                            <label for="weft1">Weft :</label>
                                            <input type="text" class="form-control" id="weft1" name="weft1">
                                        </div>
                                        <div class="form-group">
                                            <label for="denier-weft1">Denier Weft :</label>
                                            <input type="text" class="form-control" id="denier-weft1" name="denier-weft1">
                                        </div>
                                    </div>
                                </div>

                                <!-- Form untuk Weight 2 (default hidden) -->
                                <div class="row" id="formWeight2" style="display: none;">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="length2">Panjang 2:</label>
                                            <input type="text" class="form-control" id="length2" name="length2">
                                        </div>
                                        <div class="form-group">
                                            <label for="waft2">Waft :</label>
                                            <input type="text" class="form-control" id="waft2" name="waft2">
                                        </div>
                                        <div class="form-group">
                                            <label for="denier-waft2">Denier Waft :</label>
                                            <input type="text" class="form-control" id="denier-waft2" name="denier-waft2">
                                        </div>
                                        <div class="form-group">
                                            <label for="weight2">Weight :</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="weightInput2" name="weight2">
                                                <span class="ml-1">gms</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="width2">Lebar :</label>
                                            <input type="text" class="form-control" id="width2" name="width2">
                                        </div>
                                        <div class="form-group">
                                            <label for="weft2">Weft :</label>
                                            <input type="text" class="form-control" id="weft2" name="weft2">
                                        </div>
                                        <div class="form-group">
                                            <label for="denier-weft2">Denier Weft :</label>
                                            <input type="text" class="form-control" id="denier-weft2" name="denier-weft2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row mt-3 mb-3 text-center" style="border: 1px solid #ddd; padding: 10px 10px;">
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="sample" name="sample">
                                    <label class="form-check-label" for="sample">Sample</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="pre-production"
                                        name="pre-production">
                                    <label class="form-check-label" for="pre-production">Pre-Production</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="production" name="production">
                                    <label class="form-check-label" for="production">Production</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="spec-modification"
                                        name="spec-modification">
                                    <label class="form-check-label" for="spec-modification">Spec. Modification</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="trial" name="trial">
                                    <label class="form-check-label" for="trial">Trial</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="customer-sample"
                                        name="customer-sample">
                                    <label class="form-check-label" for="customer-sample">Sample dari Customer</label>
                                </div>
                            </div>
                        </div>




                        {{-- Bag Detail --}}
                        <label for="Bag_Detail">Bag Detail</label>
                        <div class="form-row mb-3" style="border: 1px solid #ddd">
                            <div class="col-md-12 mt-3">
                                <label for="liftBagType">A. Lifting Bag</label>
                                <div class="form-group">
                                    <label>Type :</label>
                                    <input type="text" class="form-control" id="liftBagType" name="liftBagType">
                                </div>

                                <label>B. Sewing Thread</label>
                                <div class="form-group">
                                    <label for="sewingThreadType">Type :</label>
                                    <input type="text" class="form-control" id="sewingThreadType"
                                        name="sewingThreadType">
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Strength / Elo :</label>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <label>Top</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topS1"
                                                        name="topS1" placeholder="kg">
                                                    <input type="text" class="form-control mb-2" id="topS2"
                                                        name="topS2" placeholder="kg">
                                                    <input type="text" class="form-control mb-2" id="topS3"
                                                        name="topS3" placeholder="kg">
                                                    <input type="text" class="form-control mb-2" id="topS4"
                                                        name="topS4" placeholder="kg">
                                                    <input type="text" class="form-control mb-2" id="topS5"
                                                        name="topS5" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-md-5">
                                                <label>&nbsp;</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topE1"
                                                        name="topE1" placeholder="%">
                                                    <input type="text" class="form-control mb-2" id="topE2"
                                                        name="topE2" placeholder="%">
                                                    <input type="text" class="form-control mb-2" id="topE3"
                                                        name="topE3" placeholder="%">
                                                    <input type="text" class="form-control mb-2" id="topE4"
                                                        name="topE4" placeholder="%">
                                                    <input type="text" class="form-control mb-2" id="topE5"
                                                        name="topE5" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label>&nbsp;</label>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Bottom</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomS1"
                                                        name="bottomS1" placeholder="kg">
                                                    <input type="text" class="form-control mb-2" id="bottomS2"
                                                        name="bottomS2" placeholder="kg">
                                                    <input type="text" class="form-control mb-2" id="bottomS3"
                                                        name="bottomS3" placeholder="kg">
                                                    <input type="text" class="form-control mb-2" id="bottomS4"
                                                        name="bottomS4" placeholder="kg">
                                                    <input type="text" class="form-control mb-2" id="bottomS5"
                                                        name="bottomS5" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label>&nbsp;</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomE1"
                                                        name="bottomE1" placeholder="%">
                                                    <input type="text" class="form-control mb-2" id="bottomE2"
                                                        name="bottomE2" placeholder="%">
                                                    <input type="text" class="form-control mb-2" id="bottomE3"
                                                        name="bottomE3" placeholder="%">
                                                    <input type="text" class="form-control mb-2" id="bottomE4"
                                                        name="bottomE4" placeholder="%">
                                                    <input type="text" class="form-control mb-2" id="bottomE5"
                                                        name="bottomE5" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" id="sewingMethod">
                                    <label>C. Sewing Method</label>
                                    <div class="ml-3">
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Mitsumaki"
                                                id="sewingMitsumaki" value="Mitsumaki">
                                            <label class="form-check-label" for="sewingMitsumaki">Mitsumaki</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="HalfMitsumaki"
                                                id="sewingHalfMitsumaki" value="Half Mitsumaki">
                                            <label class="form-check-label" for="sewingHalfMitsumaki">Half
                                                Mitsumaki</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Ogami"
                                                id="sewingOgami" value="Ogami">
                                            <label class="form-check-label" for="sewingOgami">Ogami</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Other"
                                                id="sewingOther" value="Other">
                                            <label class="form-check-label" for="sewingOther">Other</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" id="stitchApprox">
                                    <label>D. Stitch Approx.</label>
                                    <div class="ml-3">
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Bottom"
                                                id="stitchBottom" value="yes">
                                            <label class="form-check-label" for="stitchBottom">Bottom</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Side"
                                                id="stitchSide" value="no">
                                            <label class="form-check-label" for="stitchSide">Side Body</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Lift"
                                                id="stitchLift" value="yes">
                                            <label class="form-check-label" for="stitchLift">Lifting Belt</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" id="fitDraw">
                                    <label>E. Fit to drawing spec.?</label>
                                    <div class="ml-3">
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Yesfit-to-drawing"
                                                id="fit-to-drawing-yes" value="yes">
                                            <label class="form-check-label" for="fit-to-drawing-yes">Yes</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Nofit-to-drawing"
                                                id="fit-to-drawing-no" value="no">
                                            <label class="form-check-label" for="fit-to-drawing-no">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="button" id="btn_simpan" class="btn btn-outline-secondary">Simpan</button>
                        <button type="button" id="btn_koreksi" class="btn btn-outline-primary">Koreksi</button>
                        <button type="button" id="btn_hapus" class="btn btn-outline-danger">Hapus</button>

                    </div>
                </div>
            </div>
        </div>
    </div>



    <script src="{{ asset('js/COA/InputDetail.js') }}"></script>
@endsection
