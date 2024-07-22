var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var refNo = document.getElementById('refNo');
var customer = document.getElementById('customer');

// Test Method Detail Section
var heightApprox = document.getElementById('Height_Approx');
var diaCheckbox = document.getElementById('Dia');
var diaVal = document.getElementById('dia_val');
var squareCheckbox = document.getElementById('Square');
var squareVal = document.getElementById('square_val');
var cyclicTest = document.getElementById('Cyclic_Test');
var loadSpeed = document.getElementById('Load_Speed');
var top1 = document.getElementById('Top1');
var top2 = document.getElementById('Top2');
var top3 = document.getElementById('Top3');
var top4 = document.getElementById('Top4');
var top5 = document.getElementById('Top5');
var top6 = document.getElementById('Top6');
var top7 = document.getElementById('Top7');
var top8 = document.getElementById('Top8');
var top9 = document.getElementById('Top9');
var top10 = document.getElementById('Top10');
var top11 = document.getElementById('Top11');
var top12 = document.getElementById('Top12');
var top13 = document.getElementById('Top13');
var top14 = document.getElementById('Top14');
var top15 = document.getElementById('Top15');
var top16 = document.getElementById('Top16');
var top17 = document.getElementById('Top17');
var top18 = document.getElementById('Top18');
var top19 = document.getElementById('Top19');
var top20 = document.getElementById('Top20');
var top21 = document.getElementById('Top21');
var top22 = document.getElementById('Top22');
var top23 = document.getElementById('Top23');
var top24 = document.getElementById('Top24');
var top25 = document.getElementById('Top25');
var top26 = document.getElementById('Top26');
var top27 = document.getElementById('Top27');
var top28 = document.getElementById('Top28');
var top29 = document.getElementById('Top29');
var top30 = document.getElementById('Top30');
var dropTest = document.getElementById('Drop_Test');

// Test Result Section
var cyclicTestCheckbox = document.getElementById('cyclicTest');
// Cyclic Test Lift Checkboxes
var singleCCheckbox = document.getElementById('Single Loops');
var fourCCheckbox = document.getElementById('Four Loops');
var twoCCCheckbox = document.getElementById('Two Loops');
var stevedoreCCheckbox = document.getElementById('Stevedore');
var auxiliaryCCheckbox = document.getElementById('Auxalary');
var noDamageCyCheckbox = document.getElementById('No visible damages occured');
var damageCyCheckbox = document.getElementById('Visible damages found at*');
var damageFoundDescCyInput = document.getElementById('damageFoundDescCy');
// Top Lift Test Section
var topLiftCheckbox = document.getElementById('topLift');
var singleTCheckbox = document.getElementById('Single Loops');
var fourTCheckbox = document.getElementById('Four Loops');
var twoTCheckbox = document.getElementById('twoT');
var stevedoreTCheckbox = document.getElementById('stevedoreT');
var auxiliaryTCheckbox = document.getElementById('auxiliaryT');
// Top Lift Test Result Input
var topLiftResultInput = document.getElementById('Top_Lift');
var bodyFabricCheckbox = document.getElementById('Body fabric');
var petalCheckbox = document.getElementById('Petal');
var sideBodyThreadCheckbox = document.getElementById('Side body\'s thread');
var bottomFabricCheckbox = document.getElementById('Bottom fabric');
var liftingBeltCheckbox = document.getElementById('Lifting belt');
var bottomBodyThreadCheckbox = document.getElementById('Bottom body\'s thread');
var starcutBottomSpoutCheckbox = document.getElementById('Starcut of bottom spout');
var liftingBeltThreadCheckbox = document.getElementById('Lifting belt\'s thread');
var othersCheckbox = document.getElementById('Others :*');
var othersTextInput = document.getElementById('othersText');
// Drop Test Section
var dropTestCheckbox = document.getElementById('dropTest');
var noDamageDropCheckbox = document.getElementById('No visible damages occured');
var damageDropCheckbox = document.getElementById('Visible damages found at*');
var damageFoundDescDropInput = document.getElementById('damageFoundDescCy');

// Picture of Breakage Section
var threePictures = document.getElementById('threePictures');
var fourPictures = document.getElementById('fourPictures');
var pictureInput1 = document.getElementById('pictureInput1');
var picture1 = document.getElementById('picture1');
var pictureInput2 = document.getElementById('pictureInput2');
var picture2 = document.getElementById('picture2');
var pictureInput3 = document.getElementById('pictureInput3');
var picture3 = document.getElementById('picture3');
var pictureInput4 = document.getElementById('pictureInput4');
var picture4 = document.getElementById('picture4');

// specific div
// var cyclicCheckDiv = document.getElementById('cyclicCheck');
// var cyclicCheckDetail = cyclicCheckDiv.querySelectorAll('input');
// var cyclicResultDiv = document.getElementById('jenis');
// var cyclicResultDetail = cyclicResultDiv.querySelectorAll('input');
// var topLiftCheckDiv = document.getElementById('topLiftCheck');
// var topLiftChecDetail = topLiftCheckDiv.querySelectorAll('input');
// var breakageCheckDiv = document.getElementById('breakageCheck');
// var breakageCheckDetail = breakageCheckkDiv.querySelectorAll('input');
// var dropResultDiv = document.getElementById('dropResult');
// var dropResultDetail = dropResultDiv.querySelectorAll('input');

// button
var btn_info = document.getElementById('btn_info');
var btn_pict = document.getElementById('btn_pict');
var btn_isi = document.getElementById('btn_isi');
var btn_simpan = document.getElementById('btn_simpan');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

let a; // isi = 1, koreksi = 2, hapus = 3

// fungsi swal select pake arrow
function handleTableKeydown(e, tableId) {
    const table = $(`#${tableId}`).DataTable();
    const rows = $(`#${tableId} tbody tr`);
    const rowCount = rows.length;

    if (e.key === "Enter") {
        e.preventDefault();
        const selectedRow = table.row(".selected").data();
        if (selectedRow) {
            Swal.getConfirmButton().click();
        } else {
            const firstRow = $(`#${tableId} tbody tr:first-child`);
            if (firstRow.length) {
                firstRow.click();
                Swal.getConfirmButton().click();
            }
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null) {
            currentIndex = 0;
        } else {
            currentIndex = (currentIndex + 1) % rowCount;
        }
        rows.removeClass("selected");
        $(rows[currentIndex]).addClass("selected");
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex = (currentIndex - 1 + rowCount) % rowCount;
        }
        rows.removeClass("selected");
        $(rows[currentIndex]).addClass("selected");
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        currentIndex = null;
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table.page('next').draw('page');
        }
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        currentIndex = null;
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table.page('previous').draw('page');
        }
    }
}

btn_info.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Input Test',
            html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">Reference No</th>
                                <th scope="col">Customer</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                const table = $("#table_list").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    order: [[0, "asc"]],
                    ajax: {
                        url: "FrmInputTest/getRef",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [
                        { data: "Reference_No" },
                        { data: "Customer" }
                    ]
                });

                $("#table_list tbody").on("click", "tr", function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                currentIndex = null;
                Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                const splitRefNo = selectedRow.Reference_No.trim();

                refNo.value = splitRefNo;
                customer.value = selectedRow.Customer.trim();

                $.ajax({
                    url: "FrmInputTest/getDetailCyclic",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        no_ref: splitRefNo
                    },
                    timeout: 30000,
                    success: function (response) {


                        if (response.additionalData.length > 0) {
                            const data = response.additionalData[0]; // Assuming there's only one set of data
                            cyclicTestCheckbox.value = data.cyclicCheckbox || '';
                            cyclicResultDetail.value = data.cyclicResult || '';
                            topLiftCheckbox.value = data.topLiftCheckbox || '';
                            dropResultDetail.value = data.dropCheckbox || '';
                            heightApprox.value = data.heightApprox || '';
                            diaVal.value = data.diaVal || '';
                            squareVal.value = data.squareVal || '';
                            loadSpeed.value = data.loadSpeed || '';
                            dropTest.value = data.dropTest || '';
                        }

                        if (response.cyclicTestValue) {
                            cyclicTest.value = response.cyclicTestValue;
                            // console.log('Cyclic Test Value:', response.cyclicTestValue);

                        }
                        if (!response.RefCopy) {
                            heightApprox.focus();
                        } else {
                            top1.focus();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX request failed:", status, error);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});



btn_isi.addEventListener('click', function () {
    a = 1;
});

btn_koreksi.addEventListener('click', function () {
    a = 2;
});

btn_hapus.addEventListener('click', function () {
    a = 3;
});

btn_simpan.addEventListener('click', async function (e) {
    if (a === 1) { // ISI
    } else if (a === 2) { // KOREKSI
    } else if (a === 3) { //HAPUS
    }
});
