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

                        {{-- Test Method Detail --}}
                        <label>Test Method Detail</label>
                        <div class="form-row ml-1 mr-1" id="test_condidion" style="border: 1px solid #ddd;">
                            <div class="col-md-12 mt-3">
                                <label><strong>A. Test Condition </strong></label>
                                <div class="form-group">
                                    <label style="display: flex; align-items: center;">Filling with plastic granule at
                                        height approx.
                                        <div class="input-group"style="flex: 1; margin-left: 3%;">
                                            <input type="text" class="form-control" id="Height_Approx"
                                                name="Height_Approx">
                                            <div class="input-group-append">
                                                <span class="input-group-text">cm</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div class="form-group" id="pressurePlate">
                                    <label style="margin-right: 7.3%;">Pressure plate dimension</label>
                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="Dia" id="Dia"
                                            value="Dia">
                                        <label class="form-check-label" for="Dia">Dia =</label>
                                        <div class="input-group" style="max-width: 70%; margin-left: 2%;">
                                            <input type="text" class="form-control" id="dia_val" name="dia_val">
                                            <div class="input-group-append">
                                                <span class="input-group-text">cm</span>
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
                                                <span class="input-group-text">cm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label style="display: flex; align-items: center;">
                                        <strong>B. Cyclic Test:</strong>
                                        <span style="margin-right: 5%;"></span>
                                        30 X cycles of load application to approx.
                                        <div class="input-group" style="flex: 1; margin-left: 1%;">
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
                                        <div class="input-group" style="flex: 1; margin-left: 1%;">
                                            <input type="text" class="form-control" id="Load_Speed" name="Load_Speed">
                                            <div class="input-group-append">
                                                <span class="input-group-text">cm / mnt (Bag dalam keadaan kosong)</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div class="form-group">
                                    <label><strong>D. Cyclic Top Lift Data</strong></label>
                                    <div style="display: flex; flex-wrap: wrap;">
                                        <!-- Row 1 -->
                                        <div class="form-row mt-1 ">
                                            <label for="Top1" style="margin: 0 2% 0;"> &nbsp; 1.</label><input
                                                type="text" class="form-control" id="Top1" name="Top1"
                                                style="width: 10%;" />
                                            <label for="Top2" style="margin: 0 2% 0;"> &nbsp; 2.</label><input
                                                type="text" class="form-control" id="Top2" name="Top2"
                                                style="width: 10%;" />
                                            <label for="Top3" style="margin: 0 2% 0;"> &nbsp; 3.</label><input
                                                type="text" class="form-control" id="Top3" name="Top3"
                                                style="width: 10%;" />
                                            <label for="Top4" style="margin: 0 2% 0;"> &nbsp; 4.</label><input
                                                type="text" class="form-control" id="Top4" name="Top4"
                                                style="width: 10%;" />
                                            <label for="Top5" style="margin: 0 2% 0;"> &nbsp; 5.</label><input
                                                type="text" class="form-control" id="Top5" name="Top5"
                                                style="width: 10%;" />
                                            <label for="Top6" style="margin: 0 2% 0;"> &nbsp; 6.</label><input
                                                type="text" class="form-control" id="Top6" name="Top6"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 2 -->
                                        <div class="form-row mt-1">
                                            <label for="Top7" style="margin: 0 2% 0;"> &nbsp; 7.</label><input
                                                type="text" class="form-control" id="Top7" name="Top7"
                                                style="width: 10%;" />
                                            <label for="Top8" style="margin: 0 2% 0;"> &nbsp; 8.</label><input
                                                type="text" class="form-control" id="Top8" name="Top8"
                                                style="width: 10%;" />
                                            <label for="Top9" style="margin: 0 2% 0;"> &nbsp; 9.</label><input
                                                type="text" class="form-control" id="Top9" name="Top9"
                                                style="width: 10%;" />
                                            <label for="Top10" style="margin: 0 2% 0;">10.</label><input
                                                type="text" class="form-control" id="Top10" name="Top10"
                                                style="width: 10%;" />
                                            <label for="Top11" style="margin: 0 2% 0;">11.</label><input
                                                type="text" class="form-control" id="Top11" name="Top11"
                                                style="width: 10%;" />
                                            <label for="Top12" style="margin: 0 2% 0;">12.</label><input
                                                type="text" class="form-control" id="Top12" name="Top12"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 3 -->
                                        <div class="form-row mt-1">
                                            <label for="Top13" style="margin: 0 2% 0;">13.</label><input
                                                type="text" class="form-control" id="Top13" name="Top13"
                                                style="width: 10%;" />
                                            <label for="Top14" style="margin: 0 2% 0;">14.</label><input
                                                type="text" class="form-control" id="Top14" name="Top14"
                                                style="width: 10%;" />
                                            <label for="Top15" style="margin: 0 2% 0;">15.</label><input
                                                type="text" class="form-control" id="Top15" name="Top15"
                                                style="width: 10%;" />
                                            <label for="Top16" style="margin: 0 2% 0;">16.</label><input
                                                type="text" class="form-control" id="Top16" name="Top16"
                                                style="width: 10%;" />
                                            <label for="Top17" style="margin: 0 2% 0;">17.</label><input
                                                type="text" class="form-control" id="Top17" name="Top17"
                                                style="width: 10%;" />
                                            <label for="Top18" style="margin: 0 2% 0;">18.</label><input
                                                type="text" class="form-control" id="Top18" name="Top18"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 4 -->
                                        <div class="form-row mt-1">
                                            <label for="Top19" style="margin: 0 2% 0;">19.</label><input
                                                type="text" class="form-control" id="Top19" name="Top19"
                                                style="width: 10%;" />
                                            <label for="Top20" style="margin: 0 2% 0;">20.</label><input
                                                type="text" class="form-control" id="Top20" name="Top20"
                                                style="width: 10%;" />
                                            <label for="Top21" style="margin: 0 2% 0;">21.</label><input
                                                type="text" class="form-control" id="Top21" name="Top21"
                                                style="width: 10%;" />
                                            <label for="Top22" style="margin: 0 2% 0;">22.</label><input
                                                type="text" class="form-control" id="Top22" name="Top22"
                                                style="width: 10%;" />
                                            <label for="Top23" style="margin: 0 2% 0;">23.</label><input
                                                type="text" class="form-control" id="Top23" name="Top23"
                                                style="width: 10%;" />
                                            <label for="Top24" style="margin: 0 2% 0;">24.</label><input
                                                type="text" class="form-control" id="Top24" name="Top24"
                                                style="width: 10%;" />
                                        </div>

                                        <!-- Row 5 -->
                                        <div class="form-row mt-1">
                                            <label for="Top25" style="margin: 0 2% 0;">25.</label><input
                                                type="text" class="form-control" id="Top25" name="Top25"
                                                style="width: 10%;" />
                                            <label for="Top26" style="margin: 0 2% 0;">26.</label><input
                                                type="text" class="form-control" id="Top26" name="Top26"
                                                style="width: 10%;" />
                                            <label for="Top27" style="margin: 0 2% 0;">27.</label><input
                                                type="text" class="form-control" id="Top27" name="Top27"
                                                style="width: 10%;" />
                                            <label for="Top28" style="margin: 0 2% 0;">28.</label><input
                                                type="text" class="form-control" id="Top28" name="Top28"
                                                style="width: 10%;" />
                                            <label for="Top29" style="margin: 0 2% 0;">29.</label><input
                                                type="text" class="form-control" id="Top29" name="Top29"
                                                style="width: 10%;" />
                                            <label for="Top30" style="margin: 0 2% 0;">30.</label><input
                                                type="text" class="form-control" id="Top30" name="Top30"
                                                style="width: 10%;" />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label style="display: flex; align-items: center;">
                                        <strong>E. Drop Test (80 cm)</strong>
                                        <input type="text" class="form-control" id="Drop_Test" name="Drop_Test"
                                            style="flex: 1; margin-left: 3%;">
                                    </label>
                                </div>
                            </div>
                        </div>

                        {{-- Test Result --}}
                        <label>Test Result</label>
                        <div class="form-row" id="test_condidion" style="border: 1px solid #ddd;">
                            <div class="col-md-12 mt-3">
                                {{-- Cyclic Test --}}
                                <div class="form-group">
                                    <div style="display: flex; align-items: center;">

                                        <div class="col-md-2">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="cyclicTest"
                                                    name="cyclicTest">
                                                <label class="form-check-label" for="cyclicTest"><strong>Cyclic
                                                        Test</strong></label>
                                            </div>
                                        </div>

                                        <label>Lift at:</label>

                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="single"
                                                name="single">
                                            <label class="form-check-label" for="single">Single Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="four"
                                                name="four">
                                            <label class="form-check-label" for="four">Four Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="two"
                                                name="two">
                                            <label class="form-check-label" for="two">Two Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="stevedore"
                                                name="stevedore">
                                            <label class="form-check-label" for="stevedore">Stevedore</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="auxiliary"
                                                name="auxiliary">
                                            <label class="form-check-label" for="auxiliary">Auxiliary</label>
                                        </div>
                                    </div>

                                    <div class="form-row" style="display: flex;">
                                        <label style="margin: 0% 7% 0% 3%; vertical-align: top;">Result : </label>
                                        <div class="col-md-10">
                                            <div class="form-check ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="noDamage"
                                                    name="noDamage">
                                                <label class="form-check-label" for="noDamage">No visible damages
                                                    occured</label>
                                            </div>
                                            <div class="form-check ml-4" style="display: flex; align-items: center;">
                                                <input class="form-check-input" type="checkbox" id="Damage"
                                                    name="Damage">
                                                <label class="form-check-label mr-2" for="Damage">Visible damages found
                                                    at</label>
                                                <input type="text" class="form-control" id="damageFoundDesc"
                                                    name="damageFoundDesc" style="width: 80%;">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {{-- Top Lift Test --}}
                                <div class="form-group">
                                    <div style="display: flex; align-items: center;">
                                        <div class="col-md-2">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="topLift"
                                                    name="topLift">
                                                <label class="form-check-label" for="topLift"><strong>Top Lift
                                                        Test</strong></label>
                                            </div>
                                        </div>

                                        <label>Lift at:</label>

                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="single"
                                                name="single">
                                            <label class="form-check-label" for="single">Single Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="four"
                                                name="four">
                                            <label class="form-check-label" for="four">Four Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="two"
                                                name="two">
                                            <label class="form-check-label" for="two">Two Loops</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="stevedore"
                                                name="stevedore">
                                            <label class="form-check-label" for="stevedore">Stevedore</label>
                                        </div>
                                        <div class="form-check mb-1 ml-4 mr-3">
                                            <input class="form-check-input" type="checkbox" id="auxiliary"
                                                name="auxiliary">
                                            <label class="form-check-label" for="auxiliary">Auxiliary</label>
                                        </div>
                                    </div>

                                    <div class="form-row" style="display: flex;">
                                        <label style="margin: 0% 7% 0% 3%; vertical-align: top;">Result : </label>
                                        <div class="col-md-10">
                                            <div class="form-check ">
                                                <div class="input-group" style="flex: 1; margin-left: 1%;">
                                                    <input type="text" class="form-control" id="Top_Lift"
                                                        name="Top_Lift">
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">kg</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row" style="display: flex; align-items: flex-start;">
                                        <label style="margin: 0% 3% 0% 3%; vertical-align: top;">Breakage Location</label>
                                        <div class="col-md-10" style="display: flex;">
                                            <div class="col-md-3">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="bodyFabric"
                                                        name="bodyFabric">
                                                    <label class="form-check-label" for="bodyFabric">Body Fabric</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="petal"
                                                        name="petal">
                                                    <label class="form-check-label" for="petal">Petal</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="sideBodyThread"
                                                        name="sideBodyThread">
                                                    <label class="form-check-label" for="sideBodyThread">Side body's
                                                        thread</label>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="bottomFabric"
                                                        name="bottomFabric">
                                                    <label class="form-check-label" for="bottomFabric">Bottom
                                                        fabric</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="liftingBelt"
                                                        name="liftingBelt">
                                                    <label class="form-check-label" for="liftingBelt">Lifting belt</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="bottomBodyThread"
                                                        name="bottomBodyThread">
                                                    <label class="form-check-label" for="bottomBodyThread">Bottom body's
                                                        thread</label>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox"
                                                        id="starcutBottomSprout" name="starcutBottomSprout">
                                                    <label class="form-check-label" for="starcutBottomSprout">Starcut of
                                                        bottom sprout</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox"
                                                        id="liftingBeltThread" name="liftingBeltThread">
                                                    <label class="form-check-label" for="liftingBeltThread">Lifting belt's
                                                        thread</label>
                                                </div>
                                                <div class="form-check"
                                                    style="flex: 1 1 30%; display: flex; align-items: center;">
                                                    <input class="form-check-input" type="checkbox" id="others"
                                                        name="others">
                                                    <label class="form-check-label" for="others">Others</label>
                                                    <input type="text" class="form-control ml-2" id="othersText"
                                                        name="othersText">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {{-- Drop Test --}}
                                <div class="form-group">
                                    <div class="form-col" style="display: flex;">
                                        <div class="col-md-2">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="dropTest"
                                                    name="dropTest">
                                                <label class="form-check-label" for="dropTest"><strong>Drop Test (80
                                                        cm)</strong></label>
                                            </div>
                                        </div>
                                        <label>Result: </label>
                                        <div class="form-col col-md-9">
                                            <div class="form-check ml-4 mr-3">
                                                <input class="form-check-input" type="checkbox" id="noDamage"
                                                    name="noDamage">
                                                <label class="form-check-label" for="noDamage">No visible damages
                                                    occured</label>
                                            </div>
                                            <div class="form-check ml-4" style="display: flex; align-items: center;">
                                                <input class="form-check-input" type="checkbox" id="Damage"
                                                    name="Damage">
                                                <label class="form-check-label mr-2" for="Damage"
                                                    style="width: 30%">Visible damages found
                                                    at</label>
                                                <input type="text" class="form-control" id="damageFoundDesc"
                                                    name="damageFoundDesc">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {{-- Picture of Breakcage --}}
                            <label><strong>Picture of Breakage</strong></label>
                            <label><strong>Picture of Breakage</strong></label>
                            <div class="form-col" id="test_condition" style="border: 1px solid #ddd;">
                                <div class="row">
                                    <!-- Checkbox Column -->
                                    <div class="form-group">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="threePictures" name="threePictures">
                                            <label class="form-check-label" for="threePictures">3 Pictures</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="fourPictures" name="fourPictures">
                                            <label class="form-check-label" for="fourPictures">4 Pictures</label>
                                        </div>
                                    </div>

                                    <!-- Input Columns -->

                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="row">
                                        <!-- First Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="pictureInput1">1.</label>
                                                <input type="text" class="form-control" id="pictureInput1" name="pictureInput1">
                                                <label for="pictureInput2">Bigger Input</label>
                                                <textarea class="form-control" id="pictureInput2" name="pictureInput2" rows="3"></textarea>
                                            </div>
                                        </div>


                                        <!-- Second Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="pictureLabel2">2.</label>
                                                <input type="text" class="form-control" id="pictureLabel2" name="pictureLabel2">
                                                <label for="pictureInput4">Bigger Input 2</label>
                                                <textarea class="form-control" id="pictureInput4" name="pictureInput4" rows="3"></textarea>
                                            </div>
                                        </div>


                                        <!-- Third Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="pictureLabel3">3.</label>
                                                <input type="text" class="form-control" id="pictureLabel3" name="pictureLabel3">
                                                <label for="pictureInput6">Bigger Input 3</label>
                                                <textarea class="form-control" id="pictureInput6" name="pictureInput6" rows="3"></textarea>
                                            </div>
                                        </div>


                                        <!-- Fourth Set -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="pictureLabel4">4.</label>
                                                <input type="text" class="form-control" id="pictureLabel4" name="pictureLabel4">
                                                <label for="pictureInput8">Bigger Input 4</label>
                                                <textarea class="form-control" id="pictureInput8" name="pictureInput8" rows="3"></textarea>
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
