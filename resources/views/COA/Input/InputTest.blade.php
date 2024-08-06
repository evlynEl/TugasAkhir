@extends('layouts.appCOA')
@section('content')
    <style>
        .image-container {
            position: relative;
            width: 100%;
            height: auto;
        }

        .image-container img {
            width: 100%;
            height: auto;
            display: block;
        }
    </style>
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
                                        <label class="form-check-label" for="Dia">Dia</label>
                                        <div class="input-group" id="inputDia" style="max-width: 70%; margin-left: 2%;">
                                            <input type="text" class="form-control" id="dia_val" name="dia_val">
                                            <div class="input-group-append">
                                                <span class="input-group-text short">cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="Square" id="Square"
                                            value="Square">
                                        <label for="Square" class="form-check-label" for="Square">Square</label>
                                        <div class="input-group" id="inputSq" style="max-width: 70%; margin-left: 2%;">
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
                                            <input type="text" class="form-control" id="Cyclic_Test" name="Cyclic_Test"
                                                readonly>
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
                                    <div id="cyclic30box">
                                        <!-- Row 1 -->
                                        <div class="form-row mt-1 ">
                                            <label for="Data_1" class="data-label"> &nbsp; 1.</label><input
                                                type="text" class="form-control" id="Data_1" name="Data_1"
                                                style="width: 10%;" />
                                            <label for="Data_2" class="data-label"> &nbsp; 2.</label><input
                                                type="text" class="form-control" id="Data_2" name="Data_2"
                                                style="width: 10%;" />
                                            <label for="Data_3" class="data-label"> &nbsp; 3.</label><input
                                                type="text" class="form-control" id="Data_3" name="Data_3"
                                                style="width: 10%;" />
                                            <label for="Data_4" class="data-label"> &nbsp; 4.</label><input
                                                type="text" class="form-control" id="Data_4" name="Data_4"
                                                style="width: 10%;" />
                                            <label for="Data_5" class="data-label"> &nbsp; 5.</label><input
                                                type="text" class="form-control" id="Data_5" name="Data_5"
                                                style="width: 10%;" />
                                            <label for="Data_6" class="data-label"> &nbsp; 6.</label><input
                                                type="text" class="form-control" id="Data_6" name="Data_6"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 2 -->
                                        <div class="form-row mt-1">
                                            <label for="Data_7" class="data-label"> &nbsp; 7.</label><input
                                                type="text" class="form-control" id="Data_7" name="Data_7"
                                                style="width: 10%;" />
                                            <label for="Data_8" class="data-label"> &nbsp; 8.</label><input
                                                type="text" class="form-control" id="Data_8" name="Data_8"
                                                style="width: 10%;" />
                                            <label for="Data_9" class="data-label"> &nbsp; 9.</label><input
                                                type="text" class="form-control" id="Data_9" name="Data_9"
                                                style="width: 10%;" />
                                            <label for="Data_10" class="data-label">10.</label><input type="text"
                                                class="form-control" id="Data_10" name="Data_10"
                                                style="width: 10%;" />
                                            <label for="Data_11" class="data-label">11.</label><input type="text"
                                                class="form-control" id="Data_11" name="Data_11"
                                                style="width: 10%;" />
                                            <label for="Data_12" class="data-label">12.</label><input type="text"
                                                class="form-control" id="Data_12" name="Data_12"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 3 -->
                                        <div class="form-row mt-1">
                                            <label for="Data_13" class="data-label">13.</label><input type="text"
                                                class="form-control" id="Data_13" name="Data_13"
                                                style="width: 10%;" />
                                            <label for="Data_14" class="data-label">14.</label><input type="text"
                                                class="form-control" id="Data_14" name="Data_14"
                                                style="width: 10%;" />
                                            <label for="Data_15" class="data-label">15.</label><input type="text"
                                                class="form-control" id="Data_15" name="Data_15"
                                                style="width: 10%;" />
                                            <label for="Data_16" class="data-label">16.</label><input type="text"
                                                class="form-control" id="Data_16" name="Data_16"
                                                style="width: 10%;" />
                                            <label for="Data_17" class="data-label">17.</label><input type="text"
                                                class="form-control" id="Data_17" name="Data_17"
                                                style="width: 10%;" />
                                            <label for="Data_18" class="data-label">18.</label><input type="text"
                                                class="form-control" id="Data_18" name="Data_18"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 4 -->
                                        <div class="form-row mt-1">
                                            <label for="Data_19" class="data-label">19.</label><input type="text"
                                                class="form-control" id="Data_19" name="Data_19"
                                                style="width: 10%;" />
                                            <label for="Data_20" class="data-label">20.</label><input type="text"
                                                class="form-control" id="Data_20" name="Data_20"
                                                style="width: 10%;" />
                                            <label for="Data_21" class="data-label">21.</label><input type="text"
                                                class="form-control" id="Data_21" name="Data_21"
                                                style="width: 10%;" />
                                            <label for="Data_22" class="data-label">22.</label><input type="text"
                                                class="form-control" id="Data_22" name="Data_22"
                                                style="width: 10%;" />
                                            <label for="Data_23" class="data-label">23.</label><input type="text"
                                                class="form-control" id="Data_23" name="Data_23"
                                                style="width: 10%;" />
                                            <label for="Data_24" class="data-label">24.</label><input type="text"
                                                class="form-control" id="Data_24" name="Data_24"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 5 -->
                                        <div class="form-row mt-1">
                                            <label for="Data_25" class="data-label">25.</label><input type="text"
                                                class="form-control" id="Data_25" name="Data_25"
                                                style="width: 10%;" />
                                            <label for="Data_26" class="data-label">26.</label><input type="text"
                                                class="form-control" id="Data_26" name="Data_26"
                                                style="width: 10%;" />
                                            <label for="Data_27" class="data-label">27.</label><input type="text"
                                                class="form-control" id="Data_27" name="Data_27"
                                                style="width: 10%;" />
                                            <label for="Data_28" class="data-label">28.</label><input type="text"
                                                class="form-control" id="Data_28" name="Data_28"
                                                style="width: 10%;" />
                                            <label for="Data_29" class="data-label">29.</label><input type="text"
                                                class="form-control" id="Data_29" name="Data_29"
                                                style="width: 10%;" />
                                            <label for="Data_30" class="data-label">30.</label><input type="text"
                                                class="form-control" id="Data_30" name="Data_30"
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
                                <div class="form-group" id="cyclicbesar">
                                    <div style="display: flex;">
                                        <div class="col-md-2">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="Cyclic_Lift"
                                                    name="Cyclic_Lift">
                                                <label class="form-check-label" for="Cyclic_Lift"><strong>Cyclic
                                                        Test</strong></label>
                                            </div>
                                        </div>

                                        <label class="ml-3">Lift at:</label>

                                        <div id="cyclicCheck" style="display: flex; align-items: center;">
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="cyclic-Single-Loops"
                                                    name="Single Loops" data-type="cyclic">
                                                <label class="form-check-label" for="cyclic-Single-Loops">Single
                                                    Loops</label>
                                            </div>
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="cyclic-Four-Loops"
                                                    name="Four Loops" data-type="cyclic">
                                                <label class="form-check-label" for="cyclic-Four-Loops">Four Loops</label>
                                            </div>
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="cyclic-Two-Loops"
                                                    name="Two Loops" data-type="cyclic">
                                                <label class="form-check-label" for="cyclic-Two-Loops">Two Loops</label>
                                            </div>
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="cyclic-Stevedore"
                                                    name="Stevedore" data-type="cyclic">
                                                <label class="form-check-label" for="cyclic-Stevedore">Stevedore</label>
                                            </div>
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="cyclic-Auxiliary"
                                                    name="Auxiliary" data-type="cyclic">
                                                <label class="form-check-label" for="cyclic-Auxiliary">Auxiliary</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-row ml-4" id="cyclicResult" data-type="cyclic"
                                        style="display: flex;">
                                        <label class="col-md-2">Result :</label>
                                        <div class="col-md-10">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="No_visible_damages_occurred_cyclic"
                                                    name="No visible damages occurred" data-type="cyclic">
                                                <label class="form-check-label" for="No_visible_damages_occurred_cyclic"
                                                    data-type="cyclic">No visible damages occurred</label>
                                            </div>
                                            <div class="form-check" style="display: flex; align-items: center;">
                                                <input class="form-check-input" type="checkbox"
                                                    id="Visible_damages_found_at_cyclic" name="Visible damages found at"
                                                    data-type="cyclic">
                                                <label class="form-check-label" for="Visible_damages_found_at_cyclic"
                                                    data-type="cyclic">Visible damages found at</label>
                                                <div class="input-group" style="flex: 1; margin-left: 1%;">
                                                    <input type="text" class="form-control" id="damageFoundDescCy"
                                                        name="damageFoundDescCy" data-type="cyclic">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {{-- Top Lift Test --}}
                                <div class="form-group" id="topbesar">
                                    <!-- Row 1 -->
                                    <div style="display: flex; align-items: center;">
                                        <div class="col-md-2">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="Top_Lift"
                                                    name="Top_Lift">
                                                <label class="form-check-label" for="Top_Lift"><strong>Top Lift
                                                        Test</strong></label>
                                            </div>
                                        </div>

                                        <label class="ml-3">Lift at:</label>

                                        <div id="topLiftCheck" style="display: flex; align-items: center;">
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="top-Single-Loops"
                                                    name="Single Loops" data-type="top">
                                                <label class="form-check-label" for="top-Single-Loops">Single
                                                    Loops</label>
                                            </div>
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="top-Four-Loops"
                                                    name="Four Loops" data-type="top">
                                                <label class="form-check-label" for="top-Four-Loops">Four Loops</label>
                                            </div>
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="top-Two-Loops"
                                                    name="Two Loops" data-type="top">
                                                <label class="form-check-label" for="top-Two-Loops">Two Loops</label>
                                            </div>
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="top-Stevedore"
                                                    name="Stevedore" data-type="top">
                                                <label class="form-check-label" for="top-Stevedore">Stevedore</label>
                                            </div>
                                            <div class="form-check mb-1 ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="top-Auxiliary"
                                                    name="Auxiliary" data-type="top">
                                                <label class="form-check-label" for="top-Auxiliary">Auxiliary</label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Row 2 -->
                                    <div class="form-row" style="display: flex; align-items: center;">
                                        <label style="margin: 0% 7% 0% 3%; vertical-align: top;">Result :</label>
                                        <div class="col-md-10">
                                            <div class="form-check">
                                                <div class="input-group" style="flex: 1; margin-left: 3%; width:30%;">
                                                    <input type="text" class="form-control" id="Top_Result"
                                                        name="Top_Result">
                                                    <div class="input-group-append">
                                                        <span class="input-group-text short">kg</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Row 3 -->
                                    <div class="form-row">
                                        <label class="col-md-2 col-form-label"
                                            style="margin-left: 2.5%; padding-right:0;">Breakage Location</label>
                                        <div class="col-md-9">
                                            <div class="row" id="Breakage_Location">
                                                <div class="col-md-3">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="Body fabric"
                                                            name="Body fabric">
                                                        <label class="form-check-label" for="Body fabric">Body
                                                            Fabric</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="Petal"
                                                            name="Petal">
                                                        <label class="form-check-label" for="Petal">Petal</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            id="Side body's thread" name="Side body's thread">
                                                        <label class="form-check-label" for="Side body's thread">Side
                                                            body's thread</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            id="Bottom fabric" name="Bottom fabric">
                                                        <label class="form-check-label" for="Bottom fabric">Bottom
                                                            fabric</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="Lifting belt"
                                                            name="Lifting belt">
                                                        <label class="form-check-label" for="Lifting belt">Lifting
                                                            belt</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            id="Bottom body's thread" name="Bottom body's thread">
                                                        <label class="form-check-label" for="Bottom body's thread">Bottom
                                                            body's thread</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            id="Starcut of bottom spout" name="Starcut of bottom spout">
                                                        <label class="form-check-label"
                                                            for="Starcut of bottom spout">Starcut of bottom sprout</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            id="Lifting belt's thread" name="Lifting belt's thread">
                                                        <label class="form-check-label"
                                                            for="Lifting belt's thread">Lifting belt's thread</label>
                                                    </div>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input mr-2" type="checkbox"
                                                            id="Others :" name="Others :">
                                                        <label class="form-check-label mr-2"
                                                            for="Others :">Others&nbsp;:</label>
                                                        <input type="text" class="form-control" id="othersText"
                                                            name="othersText">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {{-- Drop Test --}}
                                <div class="form-group">
                                    <div class="form-row" id="dropbesar" style="display: flex;">
                                        <div class="col-md-2 ml-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="Drop_Result"
                                                    name="Drop_Result">
                                                <label class="form-check-label" for="Drop_Result"><strong>Drop Test (80
                                                        cm)</strong></label>
                                            </div>
                                        </div>
                                        <label class="ml-1">Result :</label>
                                        <div class="col-md-9" id="dropResult" data-type="drop">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    id="No_visible_damages_occurred_drop"
                                                    name="No visible damages occurred" data-type="drop">
                                                <label class="form-check-label" for="No_visible_damages_occurred_drop"
                                                    data-type="drop">No visible damages occurred</label>
                                            </div>
                                            <div class="form-check" style="display: flex; align-items: center;">
                                                <input class="form-check-input" type="checkbox"
                                                    id="Visible_damages_found_at_drop" name="Visible damages found at"
                                                    data-type="drop">
                                                <label class="form-check-label" for="Visible_damages_found_at_drop"
                                                    data-type="drop">Visible damages found at</label>
                                                <div class="input-group" style="flex: 1; margin-left: 1%;">
                                                    <input type="text" class="form-control" id="damageFoundDescDrop"
                                                        name="damageFoundDescDrop" data-type="drop">
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
                                    <div class="form-group" id="Jumlah">
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
                                    <div class="row" id="gambarbox">
                                        <!-- First Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label class="mr-2">1.</label>
                                                    <div class="custom-file">
                                                        <input type="file" accept="image/*" class="custom-file-input"
                                                            id="gambar1">

                                                        <label class="custom-file-label" id="labelpict1" for="gambar1"></label>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3 image-container">
                                                    <img id="imagePreview1" src=""
                                                        style="display:none; max-width: 100%; max-height: auto;">
                                                </div>

                                            </div>
                                        </div>

                                        <!-- Second Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label class="mr-2">2.</label>
                                                    <div class="custom-file">
                                                        <input type="file" accept="image/*" class="custom-file-input"
                                                            id="gambar2">
                                                        <label class="custom-file-label" id="labelpict2" for="gambar2"></label>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3 image-container">
                                                    <img id="imagePreview2" src=""
                                                        style="display: none; max-width: 100%; max-height: auto";>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Third Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label class="mr-2">3.</label>
                                                    <div class="custom-file">
                                                        <input type="file" accept="image/*" class="custom-file-input"
                                                            id="gambar3">
                                                        <label class="custom-file-label" id="labelpict3" for="gambar3"></label>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3 image-container">
                                                    <img id="imagePreview3" src=""
                                                        style="display: none; max-width: 100%; max-height: auto";>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Fourth Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label class="mr-2">4.</label>
                                                    <div class="custom-file">
                                                        <input type="file" accept="image/*" class="custom-file-input"
                                                            id="gambar4">
                                                        <label class="custom-file-label" id="labelpict4" for="gambar4"></label>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3 image-container">
                                                    <img id="imagePreview4" src=""
                                                        style="display: none; max-width: 100%; max-height: auto";>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {{-- <div class="col-md-9 mt-3">
                                    <div class="row" id="gambarbox">
                                        <!-- First Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label for="gambar1" class="mr-2">1.</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="gambar1" name="gambar1" readonly>
                                                        <input type="file" id="picture1" style="display: none" accept="image/*">
                                                        <button type="button" onclick="triggerFileInput('picture1')">Upload Image 1</button>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3 image-container">
                                                    <img id="imagePreview1" src=""  style="display: none;">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Second Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label for="Pict_2" class="mr-2">2.</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="Pict_2" name="Pict_2" readonly>
                                                        <input type="file" id="picture2" style="display: none" accept="image/*">
                                                        <button type="button" onclick="triggerFileInput('picture2')">Upload Image 2</button>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3 image-container">
                                                    <img id="imagePreview2" src=""  style="display: none;">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Third Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label for="Pict_3" class="mr-2">3.</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="Pict_3" name="Pict_3" readonly>
                                                        <input type="file" id="picture3" style="display: none" accept="image/*">
                                                        <button type="button" onclick="triggerFileInput('picture3')">Upload Image 3</button>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3 image-container">
                                                    <img id="imagePreview3" src=""  style="display: none;">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Fourth Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <div class="d-flex align-items-center">
                                                    <label for="Pict_4" class="mr-2">4.</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="Pict_4" name="Pict_4" readonly>
                                                        <input type="file" id="picture4" style="display: none" accept="image/*">
                                                        <button type="button" onclick="triggerFileInput('picture4')">Upload Image 4</button>
                                                    </div>
                                                </div>
                                                <div class="mt-2 ml-3 image-container">
                                                    <img id="imagePreview4" src=""  style="display: none;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> --}}
                            </div>
                        </div>

                        <button type="button" id="btn_isi" class="btn btn-outline-secondary">Isi</button>
                        <button type="button" id="btn_simpan" class="btn btn-outline-secondary">Simpan</button>
                        <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button>
                        <button type="button" id="btn_koreksi" class="btn btn-outline-secondary">Koreksi</button>
                        <button type="button" id="btn_hapus" class="btn btn-outline-secondary">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/COA/Input/InputTest.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/COA/Input/InputTest.css') }}">
@endsection
