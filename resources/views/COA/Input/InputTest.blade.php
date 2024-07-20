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
                            <div class="form-group col-md-5">
                                <label for="refNo">Reference No:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="refNo" name="refNo" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_info" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2"></div> <!-- Whitespace -->
                            <div class="form-group col-md-5">
                                <label for="customer">Customer:</label>
                                <input type="text" class="form-control" id="customer" name="customer" readonly>
                            </div>
                        </div>


                        {{-- Test Method Detail --}}
                        <label>Test Method Detail</label>
                        <div class="form-row" id="test_method">
                            <div class="col-md-12 mt-3">
                                <label><strong>A. Test Condition </strong></label>
                                <div class="form-group">
                                    <label style="display: flex; align-items: center;">Filling with plastic granule at
                                        height approx.
                                        <div class="input-group" id="inputHeight">
                                            <input type="text" class="form-control" id="Height_Approx"
                                                name="Height_Approx">
                                            <div class="input-group-append">
                                                <span class="input-group-text short">cm</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div class="form-group" id="pressurebox">
                                    <label style="margin-right: 7.3%;">Pressure plate dimension</label>
                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="Dia" id="Dia"
                                            value="Dia">
                                        <label class="form-check-label" for="Dia">Dia =</label>
                                        <div class="input-group" style="max-width: 70%; margin-left: 2%;">
                                            <input type="text" class="form-control" id="dia_val" name="dia_val">
                                            <div class="input-group-append">
                                                <span class="input-group-text short">cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="Square" id="Square"
                                            value="Square">
                                        <label class="form-check-label" for="Square">Square =</label>
                                        <div class="input-group" style="max-width: 70%; margin-left: 2%;">
                                            <input type="text" class="form-control" id="square_val" name="square_val">
                                            <div class="input-group-append">
                                                <span class="input-group-text short">cm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label style="display: flex; align-items: center;">
                                        <strong>B. Cyclic Test:</strong>
                                        <span style="margin-right: 5%;"></span>
                                        30 X cycles of load application to approx.
                                        <div class="input-group" id="cyclicbox" style="flex: 1; margin-left: 1%;">
                                            <input type="text" class="form-control" id="Cyclic_Test" name="Cyclic_Test">
                                            <div class="input-group-append">
                                                <span class="input-group-text">kg (2 x SWL)</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div class="form-group">
                                    <label style="display: flex; align-items: center;">
                                        <strong>C. Top Lift Test:</strong>
                                        <span style="margin-right: 4.2%"></span>
                                        Load speed:
                                        <div class="input-group" id="topliftbox" style="flex: 1; margin-left: 1%;">
                                            <input type="text" class="form-control" id="Load_Speed" name="Load_Speed">
                                            <div class="input-group-append">
                                                <span class="input-group-text">cm / mnt (Bag dalam keadaan kosong)</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div class="form-group">
                                    <label><strong>D. Cyclic Top Lift Data</strong></label>
                                    <div class="cyclic30box">
                                        <!-- Row 1 -->
                                        <div class="form-row mt-1 ">
                                            <label for="Top1" class="top-label"> &nbsp; 1.</label><input
                                                type="text" class="form-control" id="Top1" name="Top1"
                                                style="width: 10%;" />
                                            <label for="Top2" class="top-label"> &nbsp; 2.</label><input
                                                type="text" class="form-control" id="Top2" name="Top2"
                                                style="width: 10%;" />
                                            <label for="Top3" class="top-label"> &nbsp; 3.</label><input
                                                type="text" class="form-control" id="Top3" name="Top3"
                                                style="width: 10%;" />
                                            <label for="Top4" class="top-label"> &nbsp; 4.</label><input
                                                type="text" class="form-control" id="Top4" name="Top4"
                                                style="width: 10%;" />
                                            <label for="Top5" class="top-label"> &nbsp; 5.</label><input
                                                type="text" class="form-control" id="Top5" name="Top5"
                                                style="width: 10%;" />
                                            <label for="Top6" class="top-label"> &nbsp; 6.</label><input
                                                type="text" class="form-control" id="Top6" name="Top6"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 2 -->
                                        <div class="form-row mt-1">
                                            <label for="Top7" class="top-label"> &nbsp; 7.</label><input
                                                type="text" class="form-control" id="Top7" name="Top7"
                                                style="width: 10%;" />
                                            <label for="Top8" class="top-label"> &nbsp; 8.</label><input
                                                type="text" class="form-control" id="Top8" name="Top8"
                                                style="width: 10%;" />
                                            <label for="Top9" class="top-label"> &nbsp; 9.</label><input
                                                type="text" class="form-control" id="Top9" name="Top9"
                                                style="width: 10%;" />
                                            <label for="Top10" class="top-label">10.</label><input type="text"
                                                class="form-control" id="Top10" name="Top10"
                                                style="width: 10%;" />
                                            <label for="Top11" class="top-label">11.</label><input type="text"
                                                class="form-control" id="Top11" name="Top11"
                                                style="width: 10%;" />
                                            <label for="Top12" class="top-label">12.</label><input type="text"
                                                class="form-control" id="Top12" name="Top12"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 3 -->
                                        <div class="form-row mt-1">
                                            <label for="Top13" class="top-label">13.</label><input type="text"
                                                class="form-control" id="Top13" name="Top13"
                                                style="width: 10%;" />
                                            <label for="Top14" class="top-label">14.</label><input type="text"
                                                class="form-control" id="Top14" name="Top14"
                                                style="width: 10%;" />
                                            <label for="Top15" class="top-label">15.</label><input type="text"
                                                class="form-control" id="Top15" name="Top15"
                                                style="width: 10%;" />
                                            <label for="Top16" class="top-label">16.</label><input type="text"
                                                class="form-control" id="Top16" name="Top16"
                                                style="width: 10%;" />
                                            <label for="Top17" class="top-label">17.</label><input type="text"
                                                class="form-control" id="Top17" name="Top17"
                                                style="width: 10%;" />
                                            <label for="Top18" class="top-label">18.</label><input type="text"
                                                class="form-control" id="Top18" name="Top18"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 4 -->
                                        <div class="form-row mt-1">
                                            <label for="Top19" class="top-label">19.</label><input type="text"
                                                class="form-control" id="Top19" name="Top19"
                                                style="width: 10%;" />
                                            <label for="Top20" class="top-label">20.</label><input type="text"
                                                class="form-control" id="Top20" name="Top20"
                                                style="width: 10%;" />
                                            <label for="Top21" class="top-label">21.</label><input type="text"
                                                class="form-control" id="Top21" name="Top21"
                                                style="width: 10%;" />
                                            <label for="Top22" class="top-label">22.</label><input type="text"
                                                class="form-control" id="Top22" name="Top22"
                                                style="width: 10%;" />
                                            <label for="Top23" class="top-label">23.</label><input type="text"
                                                class="form-control" id="Top23" name="Top23"
                                                style="width: 10%;" />
                                            <label for="Top24" class="top-label">24.</label><input type="text"
                                                class="form-control" id="Top24" name="Top24"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 5 -->
                                        <div class="form-row mt-1">
                                            <label for="Top25" class="top-label">25.</label><input type="text"
                                                class="form-control" id="Top25" name="Top25"
                                                style="width: 10%;" />
                                            <label for="Top26" class="top-label">26.</label><input type="text"
                                                class="form-control" id="Top26" name="Top26"
                                                style="width: 10%;" />
                                            <label for="Top27" class="top-label">27.</label><input type="text"
                                                class="form-control" id="Top27" name="Top27"
                                                style="width: 10%;" />
                                            <label for="Top28" class="top-label">28.</label><input type="text"
                                                class="form-control" id="Top28" name="Top28"
                                                style="width: 10%;" />
                                            <label for="Top29" class="top-label">29.</label><input type="text"
                                                class="form-control" id="Top29" name="Top29"
                                                style="width: 10%;" />
                                            <label for="Top30" class="top-label">30.</label><input type="text"
                                                class="form-control" id="Top30" name="Top30"
                                                style="width: 10%;" />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label style="display: flex; align-items: center;"><strong>E. Drop Test (80
                                            cm)</strong>
                                        <div class="input-group" style="flex: 1; margin-left: 1%;">
                                            <input type="text" class="form-control" id="Drop_Test" name="Drop_Test">
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {{-- Test Result --}}
                        <label>Test Result</label>
                        <div class="form-row" id="test_result">
                            <div class="col-md-12 mt-3">
                                {{-- Cyclic Test --}}
                                <div class="form-group">
                                    <div style="display: flex;">
                                        <div class="col-md-2">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="cyclicTest"
                                                    name="cyclicTest">
                                                <label class="form-check-label" for="cyclicTest"><strong>Cyclic
                                                        Test</strong></label>
                                            </div>
                                        </div>

                                        <label class="ml-3">Lift at:</label>

                                        <div class="form-check mb-1 ml-2">
                                            <input class="form-check-input" type="checkbox" id="singleC"
                                                name="singleC">
                                            <label class="form-check-label" for="singleC">Single Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="fourC"
                                                name="fourC">
                                            <label class="form-check-label" for="fourC">Four Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="twoCC"
                                                name="twoCC">
                                            <label class="form-check-label" for="twoCC">Two Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="stevedoreC"
                                                name="stevedoreC">
                                            <label class="form-check-label" for="stevedoreC">Stevedore</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="auxiliaryC"
                                                name="auxiliaryC">
                                            <label class="form-check-label" for="auxiliaryC">Auxiliary</label>
                                        </div>
                                    </div>

                                    <div class="form-row ml-4" style="display: flex;">
                                        <label class="col-md-2">Result :</label>
                                        <div class="col-md-10">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="noDamageCy"
                                                    name="noDamageCy">
                                                <label class="form-check-label" for="noDamageCy">No visible damages
                                                    occurred</label>
                                            </div>
                                            <div class="form-check" style="display: flex; align-items: center;">
                                                <input class="form-check-input" type="checkbox" id="DamageCy"
                                                    name="DamageCy">
                                                <label class="form-check-label" for="DamageCy">Visible damages found
                                                    at</label>
                                                <div class="input-group" style="flex: 1; margin-left: 1%;">
                                                    <input type="text" class="form-control" id="damageFoundDescCy"
                                                        name="damageFoundDescCy">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {{-- Top Lift Test --}}
                                <div class="form-group">
                                    <!-- Row 1 -->
                                    <div style="display: flex; align-items: center;">
                                        <div class="col-md-2">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="topLift" name="topLift">
                                                <label class="form-check-label" for="topLift"><strong>Top Lift Test</strong></label>
                                            </div>
                                        </div>

                                        <label class="ml-3">Lift at:</label>

                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="singleT" name="singleT">
                                            <label class="form-check-label" for="singleT">Single Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="fourT" name="fourT">
                                            <label class="form-check-label" for="fourT">Four Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="twoT" name="twoT">
                                            <label class="form-check-label" for="twoT">Two Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="stevedoreT" name="stevedoreT">
                                            <label class="form-check-label" for="stevedoreT">Stevedore</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="auxiliaryT" name="auxiliaryT">
                                            <label class="form-check-label" for="auxiliaryT">Auxiliary</label>
                                        </div>
                                    </div>

                                    <!-- Row 2 -->
                                    <div class="form-row" style="display: flex; align-items: center;">
                                        <label style="margin: 0% 7% 0% 3%; vertical-align: top;">Result :</label>
                                        <div class="col-md-10">
                                            <div class="form-check">
                                                <div class="input-group" style="flex: 1; margin-left: 3%; width:30%;">
                                                    <input type="text" class="form-control" id="Top_Lift" name="Top_Lift">
                                                    <div class="input-group-append">
                                                        <span class="input-group-text short">kg</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Row 3 -->
                                    <div class="form-row">
                                        <label class="col-md-2 col-form-label" style="margin-left: 2.5%; padding-right:0;">Breakage Location</label>
                                        <div class="col-md-9">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="bodyFabric" name="bodyFabric">
                                                        <label class="form-check-label" for="bodyFabric">Body Fabric</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="petal" name="petal">
                                                        <label class="form-check-label" for="petal">Petal</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="sideBodyThread" name="sideBodyThread">
                                                        <label class="form-check-label" for="sideBodyThread">Side body's thread</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="bottomFabric" name="bottomFabric">
                                                        <label class="form-check-label" for="bottomFabric">Bottom fabric</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="liftingBelt" name="liftingBelt">
                                                        <label class="form-check-label" for="liftingBelt">Lifting belt</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="bottomBodyThread" name="bottomBodyThread">
                                                        <label class="form-check-label" for="bottomBodyThread">Bottom body's thread</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="starcutBottomSprout" name="starcutBottomSprout">
                                                        <label class="form-check-label" for="starcutBottomSprout">Starcut of bottom sprout</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="liftingBeltThread" name="liftingBeltThread">
                                                        <label class="form-check-label" for="liftingBeltThread">Lifting belt's thread</label>
                                                    </div>
                                                    <div class="form-check" style="display: flex; align-items: center;">
                                                        <input class="form-check-input mr-2" type="checkbox" id="others" name="others">
                                                        <label class="form-check-label mr-2" for="others">Others:</label>
                                                        <input type="text" class="form-control" id="othersText" name="othersText">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {{-- Drop Test --}}
                                <div class="form-group">
                                    <div class="form-row" style="display: flex;">
                                        <div class="col-md-2">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="dropTest" name="dropTest">
                                                <label class="form-check-label" for="dropTest"><strong>Drop Test (80 cm)</strong></label>
                                            </div>
                                        </div>
                                        <label class="ml-3">Result :</label>
                                        <div class="col-md-9">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="noDamageDrop" name="noDamageDrop">
                                                <label class="form-check-label" for="noDamageDrop">No visible damages occurred</label>
                                            </div>
                                            <div class="form-check" style="display: flex; align-items: center;">
                                                <input class="form-check-input" type="checkbox" id="DamageCy" name="DamageCy">
                                                <label class="form-check-label" for="DamageCy">Visible damages found at</label>
                                                <div class="input-group" style="flex: 1; margin-left: 1%;">
                                                    <input type="text" class="form-control" id="damageFoundDescCy" name="damageFoundDescCy">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        {{-- Picture of Breakcage --}}
                        <label>Picture of Breakage</label>
                        <div class="form-col" id="pict_break">
                            <div class="row">
                                <!-- Checkbox Section -->
                                <div class="checkPict">
                                    <div class="form-group">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="threePictures"
                                                name="threePictures">
                                            <label class="form-check-label" for="threePictures">3 Picture</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="fourPictures"
                                                name="fourPictures">
                                            <label class="form-check-label" for="fourPictures">4 Picture</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Input Section -->
                                <div class="col-md-9 mt-3">
                                    <div class="row">
                                        <!-- First Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label for="pictureInput1" class="mr-2">1.</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="pictureInput1"
                                                            name="pictureInput1" readonly>
                                                        <div class="input-group-append">
                                                            <button type="button" id="btn_pict"
                                                                class="btn btn-info">...</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3">
                                                    <input type="text" class="form-control" id="picture1"
                                                        name="picture1" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Second Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label for="pictureInput2" class="mr-2">2.</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="pictureInput2"
                                                            name="pictureInput2" readonly>
                                                        <div class="input-group-append">
                                                            <button type="button" id="btn_pict"
                                                                class="btn btn-info">...</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3">
                                                    <input type="text" class="form-control" id="picture2"
                                                        name="picture2" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Third Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label for="pictureInput3" class="mr-2">3.</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="pictureInput3"
                                                            name="pictureInput3" readonly>
                                                        <div class="input-group-append">
                                                            <button type="button" id="btn_pict"
                                                                class="btn btn-info">...</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3">
                                                    <input type="text" class="form-control" id="picture3"
                                                        name="picture3" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Fourth Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label for="pictureInput4" class="mr-2">4.</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="pictureInput4"
                                                            name="pictureInput4" readonly>
                                                        <div class="input-group-append">
                                                            <button type="button" id="btn_pict"
                                                                class="btn btn-info">...</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3">
                                                    <input type="text" class="form-control" id="picture4"
                                                        name="picture4" readonly>
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
            <link rel="stylesheet" href="{{ asset('css/COA/Input/InputTest.css') }}">
        @endsection
