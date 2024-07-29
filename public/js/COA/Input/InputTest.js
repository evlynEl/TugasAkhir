var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var refNo = document.getElementById('refNo');
var customer = document.getElementById('customer');

// Test Method Detail Section
var Height_Approx = document.getElementById('Height_Approx');
var diaCheckbox = document.getElementById('Dia');
var dia_val = document.getElementById('dia_val');
var squareCheckbox = document.getElementById('Square');
var square_val = document.getElementById('square_val');
var Cyclic_Test = document.getElementById('Cyclic_Test');
var Load_Speed = document.getElementById('Load_Speed');
var Drop_Test = document.getElementById('Drop_Test');

// Test Result Section
var Cyclic_Lift = document.getElementById('Cyclic_Lift');
var damageFoundDescCyInput = document.getElementById('damageFoundDescCy');
var Top_Lift = document.getElementById('Top_Lift');
var Top_Result = document.getElementById('Top_Result');
var othersTextInput = document.getElementById('othersText');
var Drop_Result = document.getElementById('Drop_Result');
var damageFoundDescDropInput = document.getElementById('damageFoundDescDrop');

// Picture of Breakage Section
var jumlah;
var threePictures = document.getElementById('threePictures');
var fourPictures = document.getElementById('fourPictures');
// var Pict_1 = document.getElementById('Pict_1');
// var Pict_2 = document.getElementById('Pict_2');
// var Pict_3 = document.getElementById('Pict_3');
// var Pict_4 = document.getElementById('Pict_4');
// var picture1 = document.getElementById('imagePreview1');
// var picture2 = document.getElementById('imagePreview2');
// var picture3 = document.getElementById('imagePreview3');
// var picture4 = document.getElementById('imagePreview4');
var imageFiles;

// specific div
// var pressureboxDiv = document.getElementById('pressurebox');
// var pressureboxDetail = pressureboxDiv.querySelectorAll('input');
var testmethodDiv = document.getElementById('test_method');
var testmethodDetail = testmethodDiv.querySelectorAll('input');
var cyclic30Detail = document.querySelectorAll('#cyclic30box input');
var cyclicResultDiv = document.getElementById('cyclicResult');
var cyclicResultDetail = cyclicResultDiv.querySelectorAll('input');
var topLiftCheckDiv = document.getElementById('topLiftCheck');
var topLiftChecDetail = topLiftCheckDiv.querySelectorAll('input');
var breakageCheckDiv = document.getElementById('Breakage_Location');
var breakageCheckDetail = breakageCheckDiv.querySelectorAll('input');
var dropResultDiv = document.getElementById('dropResult');
var dropResultDetail = dropResultDiv.querySelectorAll('input');

// button
var btn_info = document.getElementById('btn_info');
var btn_pict1 = document.getElementById('btn_pict1');
var btn_pict2 = document.getElementById('btn_pict2');
var btn_pict3 = document.getElementById('btn_pict3');
var btn_pict4 = document.getElementById('btn_pict4');
var btn_isi = document.getElementById('btn_isi');
var btn_simpan = document.getElementById('btn_simpan');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

let a; // isi = 1, koreksi = 2, hapus = 3
var refCopy;
var hasil;

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));
const inputTestMethod = Array.from(document.querySelectorAll('#test_method input[type="text"]')).filter(input => !/^Data_\d{1,2}$/.test(input.id) && input.id !== 'Drop_Test');


var pressure = [];
var cLift = [];
var cResult = [];
var tLift = [];
var breakage = [];
var dResult = [];
var centangCheck = [];

var sections = [
    { id: 'pressurebox', checkboxes: ['Dia', 'Square'] },
    { id: 'cyclicCheck', checkboxes: ['Single Loops', 'Four Loops', 'Two Loops', 'Stevedore', 'Auxiliary'] },
    { id: 'cyclicResult', checkboxes: ['No visible damages occurred', 'Visible damages found at'] },
    { id: 'topLiftCheck', checkboxes: ['Single Loops', 'Four Loops', 'Two Loops', 'Stevedore', 'Auxiliary'] },
    { id: 'Breakage_Location', checkboxes: ['Body fabric', 'Petal', 'Side body\'s thread', 'Bottom fabric', 'Lifting belt', 'Bottom body\'s thread', 'Starcut of bottom spout', 'Lifting belt\'s thread', 'Others :'] },
    { id: 'dropResult', checkboxes: ['No visible damages occurred', 'Visible damages found at'] }
];

const indexMapping = {
    1: 21, 2: 24, 3: 16, 4: 26, 5: 27,
    6: 30, 7: 17, 8: 23, 9: 22, 10: 18,
    11: 28, 12: 19, 13: 25, 14: 20, 15: 29
};

// fungsi berhubungan dengan ENTER
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.value.trim() !== '') {
                console.log(masuk.id);

                if (masuk.id === 'Height_Approx') {
                    Load_Speed.disabled = false;
                    Load_Speed.focus();
                } else if (masuk.id === 'Load_Speed') {
                    Data_1.disabled = false;
                    Data_1.focus();
                } else if (masuk.id.startsWith('Data_')) {
                    handleData(masuk);
                } else if (masuk.id === 'Drop_Test' && !areAllInputsDisabled(testmethodDetail)) {
                    Cyclic_Lift.disabled = false;
                    Top_Lift.disabled = false;
                    Drop_Result.disabled = false;
                } else if (index + 1 < inputs.length) {
                    inputs[index + 1].focus();
                }
            } else if (masuk.id === 'Height_Approx') {
                Swal.fire({
                    icon: 'question',
                    text: `Apakah Data Height Approx Mau Anda Lengkapi?`,
                    returnFocus: false,
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Height_Approx
                            .focus();
                    }
                });
            } else if (masuk.id === 'dia_val') {
                Swal.fire({
                    icon: 'question',
                    text: `Apakah Data Diameter Mau Anda Lengkapi?`,
                    returnFocus: false,
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dia_val.focus();
                    }
                });
            } else if (masuk.id === 'square_val') {
                Swal.fire({
                    icon: 'question',
                    text: `Apakah Data Square Mau Anda Lengkapi?`,
                    returnFocus: false,
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {
                    if (result.isConfirmed) {
                        square_val.focus();
                    }
                });
            } else if (masuk.id === 'Load_Speed') {
                Swal.fire({
                    icon: 'question',
                    text: `Apakah Data Speed Mau Anda Lengkapi?`,
                    returnFocus: false,
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Load_Speed.focus();
                    }
                });
            } else if (masuk.id === 'Drop_Test') {
                Swal.fire({
                    icon: 'question',
                    text: `Apakah Data Drop Test Mau Anda Lengkapi?`,
                    returnFocus: false,
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Load_Speed.focus();
                    }
                });
            } else if (/^Data_[1-9]$|^Data_1[0-5]$/.test(masuk.id)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Inputkan Data Cyclic Top Lift Data Terlebih Dahulu !',
                    returnFocus: false
                }).then(() => {
                    masuk.focus();
                });
            }
        }
    });
});

// fungsi untuk autofill & buka 1" input unk 30 data
function handleData(masuk) {
    const currentDataNumber = parseInt(masuk.id.split('_')[1], 10);
    let currentIndex = Array.from(cyclic30Detail).findIndex(input => input.disabled === true);

    if (currentDataNumber < 15) {
        // Loop to skip over inputs with id >= 16
        while (cyclic30Detail[currentIndex] && parseInt(cyclic30Detail[currentIndex].id.split('_')[1], 10) >= 16) {
            currentIndex++;
        }

        if (currentIndex !== -1 && currentIndex < cyclic30Detail.length) {
            cyclic30Detail[currentIndex].disabled = false;
            cyclic30Detail[currentIndex].focus();

        }

        // Auto-fill the related index
        const relatedIndex = indexMapping[currentDataNumber];
        if (relatedIndex && relatedIndex <= cyclic30Detail.length) {
            cyclic30Detail[relatedIndex - 1].value = masuk.value;
        }
    } else if (currentDataNumber === 15) {
        cyclic30Detail[currentIndex].disabled = false;
        cyclic30Detail[currentIndex]
        cyclic30Detail[indexMapping[currentDataNumber] - 1].value = masuk.value;
        Drop_Test.disabled = false;
        Drop_Test.focus();

        const data16Index = Array.from(cyclic30Detail).findIndex(input => input.id === 'Data_16');
        if (data16Index !== -1) {
            cyclic30Detail[data16Index].disabled = true;
        }
    }
}


// fungsi cek apakah input pd div tertentu disabled
function areAllInputsDisabled(inputs) {
    return Array.from(inputs).every(input => input.disabled);
}

// fungsi unk membuka input pd div tertentu jika checkbox tertentu di centang
function toggleInputs(checkboxId, divId, descId) {
    const checkbox = document.getElementById(checkboxId);
    const div = document.getElementById(divId);
    const descInput = document.getElementById(descId);

    checkbox.addEventListener("change", function () {
        console.log(`Checkbox ${checkboxId} changed to ${checkbox.checked}`);
        const inputs = div.querySelectorAll('input');

        if (checkbox.checked) {
            inputs.forEach(input => {
                input.disabled = false;
                // damageFoundDescCyInput.disabled = true;
                // othersText.disabled = true;
                // damageFoundDescDropInput.disabled = true;
            });

            if (checkboxId === 'Cyclic_Lift') {
                document.querySelector('#cyclicResult input[name="Visible damages found at"]').addEventListener('change', function () {
                    descInput.disabled = false;
                    damageFoundDescCyInput.focus();
                });
            } else if (checkboxId === 'Top_Lift') {
                document.querySelector('#Breakage_Location input[name="Others"]').addEventListener('change', function () {
                    descInput.disabled = false;
                    othersTextInput.focus();
                });
            } else if (checkboxId === 'Drop_Result') {
                document.querySelector('#dropResult input[name="Visible damages found at"]').addEventListener('change', function () {
                    descInput.disabled = false;
                    damageFoundDescDropInput.focus();
                });
            }
        }
    });
}

// memanggil fungsi membuka div centang
toggleInputs("Dia", "inputDia", null);
toggleInputs("Square", "inputSq", null);
toggleInputs("Cyclic_Lift", "cyclicbesar", "damageFoundDescCy");
toggleInputs("Top_Lift", "topbesar", "othersText");
toggleInputs("Drop_Result", "dropResult", "damageFoundDescDrop");


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
                            _token: csrfToken,
                            a: a
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
                    url: "FrmInputTest/getCyclic",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        no_ref: splitRefNo,
                        a: a
                    },
                    timeout: 30000,
                    success: function (response) {
                        // console.log(response.refCopy);
                        Cyclic_Test.value = response.cyclicTestValue;
                        TestResult = response.TestResult;

                        if (a === 1) { // fill dari no ref isi
                            if (response.refCopy === '') { // tidak ada copy ref no
                                setTimeout(() => {
                                    Height_Approx.disabled = false;
                                    diaCheckbox.disabled = false;
                                    squareCheckbox.disabled = false;
                                    Height_Approx.focus();
                                }, 70);

                            } else { // ada copy ref no
                                setTimeout(() => {
                                    Data_1.disabled = false;
                                    Data_1.focus();
                                }, 100);

                                Ketik.forEach(function (input) {
                                    input.disabled = false;
                                });
                                cyclic30Detail.forEach(function (input) {
                                    input.disabled = true;
                                });

                                if (response.additionalData && response.additionalData.length > 0) {
                                    const data = response.additionalData[0];
                                    // console.log("Data from response:", data);

                                    Height_Approx.value = data.Height_Approx;
                                    dia_val.value = data.dia_val;
                                    square_val.value = data.square_val;
                                    Cyclic_Test.value = data.Cyclic_Test;
                                    Load_Speed.value = data.Load_Speed;
                                    Top_Result.value = data.Top_Result;
                                    Drop_Test.value = data.Drop_Test;

                                    pressure = data.pressure;
                                    cLift = data.Cyclic_Lift;
                                    cResult = data.Cyclic_Result;
                                    tLift = data.Top_Lift;
                                    breakage = data.Breakage_Location;
                                    dResult = data.Drop_Result;

                                    retrieveCheck('pressurebox', pressure, data);
                                    retrieveCheck('cyclicCheck', cLift, data);
                                    retrieveCheck('cyclicResult', cResult, data);
                                    retrieveCheck('topLiftCheck', tLift, data);
                                    retrieveCheck('Breakage_Location', breakage, data);
                                    retrieveCheck('dropResult', dResult, data);
                                }
                            }
                        } else { // fill dari no ref koreksi
                            if (response.additionalData && response.additionalData.length > 0) {
                                const data = response.additionalData[0];
                                Height_Approx.value = data.Height_Approx;
                                dia_val.value = data.dia_val;
                                square_val.value = data.square_val;
                                Cyclic_Test.value = data.Cyclic_Test;
                                Load_Speed.value = data.Load_Speed;
                                Drop_Test.value = data.Drop_Test;
                                Cyclic_Lift.value = data.Cyclic_Lift;
                                Cyclic_Result.value = data.Cyclic_Result;
                                Top_Lift.value = data.Top_Lift;
                                Top_Result.value = data.Top_Result;
                                Breakage_Location.value = data.Breakage_Location;
                                Drop_Result.value = data.Drop_Result;
                                Data_1.value = data.Data_1 || '';
                                Data_2.value = data.Data_2 || '';
                                Data_3.value = data.Data_3 || '';
                                Data_4.value = data.Data_4 || '';
                                Data_5.value = data.Data_5 || '';
                                Data_6.value = data.Data_6 || '';
                                Data_7.value = data.Data_7 || '';
                                Data_8.value = data.Data_8 || '';
                                Data_9.value = data.Data_9 || '';
                                Data_10.value = data.Data_10 || '';
                                Data_11.value = data.Data_11 || '';
                                Data_12.value = data.Data_12 || '';
                                Data_13.value = data.Data_13 || '';
                                Data_14.value = data.Data_14 || '';
                                Data_15.value = data.Data_15 || '';
                                Data_16.value = data.Data_16 || '';
                                Data_17.value = data.Data_17 || '';
                                Data_18.value = data.Data_18 || '';
                                Data_19.value = data.Data_19 || '';
                                Data_20.value = data.Data_20 || '';
                                Data_21.value = data.Data_21 || '';
                                Data_22.value = data.Data_22 || '';
                                Data_23.value = data.Data_23 || '';
                                Data_24.value = data.Data_24 || '';
                                Data_25.value = data.Data_25 || '';
                                Data_26.value = data.Data_26 || '';
                                Data_27.value = data.Data_27 || '';
                                Data_28.value = data.Data_28 || '';
                                Data_29.value = data.Data_29 || '';
                                Data_30.value = data.Data_30 || '';
                                Jumlah.value = data.Jumlah || '';
                                Pict_1.src = data.Pict_1 || '';
                                Pict_2.src = data.Pict_2 || '';
                                Pict_3.src = data.Pict_3 || '';
                                Pict_4.src = data.Pict_4 || '';
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX request failed:", status, error);
                        Swal.fire('Error', 'AJAX request failed: ' + status + ' ' + error, 'error');
                    }
                });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

// fungsi memunculkan centang sesuai isi database
function retrieveCheck(sectionId, value, data) {
    var section = sections.find(s => s.id === sectionId);

    if (!section) {
        console.error(`Section with id ${sectionId} not found.`);
        return;
    }

    let isAnyChecked = false;

    section.checkboxes.forEach(function (checkboxName) {
        var checkboxes = document.querySelectorAll(`#${sectionId} input[name="${checkboxName}"]`);
        checkboxes.forEach(function (checkbox) {
            if (checkbox) {
                var dataType = checkbox.getAttribute('data-type');

                switch (sectionId) {
                    case 'cyclicCheck':
                        checkbox.checked = value === checkboxName;
                        if (checkbox.checked) {
                            cLift = [checkboxName];
                            isAnyChecked = true;
                            if (cLift.length > 0) {
                                Cyclic_Lift.checked = true;
                            }
                        }
                        break;

                    case 'topLiftCheck':
                        checkbox.checked = value === checkboxName;
                        if (checkbox.checked) {
                            tLift = [checkboxName];
                            isAnyChecked = true;
                            if (tLift.length > 0) {
                                Top_Lift.checked = true;
                            }
                        }
                        break;

                    case 'Breakage_Location':
                        checkbox.checked = value === checkboxName;
                        if (checkbox.checked) {
                            breakage = [checkboxName];
                            isAnyChecked = true;
                            if (checkboxName === 'Others :') {
                                othersTextInput.disabled = false;
                                othersTextInput.value = data.Breakage_Location_Remaining;
                            }
                        }
                        break;

                    case 'dropResult':
                        if (dataType === 'drop') {
                            checkbox.checked = value === checkboxName;
                            if (checkbox.checked) {
                                dResult = [checkboxName];
                                isAnyChecked = true;
                                if (dResult.length > 0) {
                                    Drop_Result.checked = true;
                                }
                                if (checkboxName === 'Visible damages found at') {
                                    damageFoundDescDropInput.disabled = false;
                                    damageFoundDescDropInput.value = data.Drop_Result_Remaining;
                                }
                            }
                        }
                        break;

                    case 'cyclicResult':
                        if (dataType === 'cyclic') {
                            checkbox.checked = value === checkboxName;
                            if (checkbox.checked) {
                                cResult = [checkboxName];
                                isAnyChecked = true;
                                var damageFoundDescCyInput = document.querySelector('#cyclicResult input[name="damageFoundDescCy"]');
                                if (checkboxName === 'Visible damages found at') {
                                    damageFoundDescCyInput.disabled = false;
                                    damageFoundDescCyInput.value = data.Cyclic_Result_Remaining;
                                }
                            }
                        }
                        break;

                    default:
                        break;
                }
            }
        });
    });

    switch (sectionId) {
        case 'cyclicCheck':
            if (!isAnyChecked) cLift = null;
            break;
        case 'topLiftCheck':
            if (!isAnyChecked) tLift = null;
            break;
        case 'Breakage_Location':
            if (!isAnyChecked) breakage = null;
            break;
        case 'dropResult':
            if (!isAnyChecked) dResult = null;
            break;
        case 'cyclicResult':
            if (!isAnyChecked) cResult = null;
            break;
        default:
            break;
    }
}



// cek checkbox
// fungsi track aktifitas checkbox
function setupCheckboxListeners() {
    sections.forEach(function (section) {
        section.checkboxes.forEach(function (checkboxName) {
            var checkbox = document.querySelector(`#${section.id} input[name="${checkboxName}"]`);
            if (checkbox) {
                checkbox.addEventListener('change', function (event) {
                    handleCheckboxChange(section.id);
                });
            }
        });
    });
}

// fungsi dapetin nilai checkbox
function handleCheckboxChange(sectionId) {
    var section = document.getElementById(sectionId);
    var checkedName = null;

    // Find the first checked checkbox value for the section
    sections.find(s => s.id === sectionId).checkboxes.some(function (checkboxName) {
        var checkbox = section.querySelector(`input[name="${checkboxName}"]`);
        if (checkbox && checkbox.checked) {
            checkedName = checkboxName;
            return true;
        }
    });

    // Save checkbox value
    switch (sectionId) {
        case 'cyclicCheck':
            cLift = checkedName ? [checkedName] : null;
            break;
        case 'cyclicResult':
            cResult = checkedName ? [checkedName] : null;
            break;
        case 'topLiftCheck':
            tLift = checkedName ? [checkedName] : null;
            break;
        case 'Breakage_Location':
            breakage = checkedName ? [checkedName] : null;
            break;
        case 'dropResult':
            dResult = checkedName ? [checkedName] : null;
            break;
        default:
            break;
    }
    centangCheck = [cLift ? cLift.length : 0, cResult ? cResult.length : 0, tLift ? tLift.length : 0, breakage ? breakage.length : 0, dResult ? dResult.length : 0];

    // console.log(cLift);
    // console.log(cResult);
    // console.log(tLift);
    // console.log(breakage);
    // console.log(dResult);
}


// panggil fungsi cek checkbox
setupCheckboxListeners();

// fungsi mengambil gambar
var imageFiles = {}; // variabel unk simpan file references
function setupImageUpload(buttonId, imageId, textInputId, nextButtonId) {
    var button = document.getElementById(buttonId);
    var image = document.getElementById(imageId);
    var textInput = document.getElementById(textInputId);

    if (!image) {
        console.error('Image element not found:', imageId);
        return;
    }

    button.addEventListener('click', function () {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/png';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', function () {
            var file = fileInput.files[0];
            if (file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    image.src = e.target.result;
                    image.style.display = 'block';
                    textInput.value = file.name;

                    imageFiles[textInputId] = file;

                    if (nextButtonId) {
                        var nextButton = document.getElementById(nextButtonId);
                        if (nextButton) {
                            nextButton.focus();
                        }
                    }
                };

                reader.readAsDataURL(file);
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    });
}

// fungsi unk fokus button pict & setup gambar sesuai jumlah yg tercentang
function updateFocus() {
    var threePicturesChecked = threePictures.checked;
    var fourPicturesChecked = fourPictures.checked;

    if (threePicturesChecked) {
        jumlah = 3;
        imageFiles = {
            'picture1': null,
            'picture2': null,
            'picture3': null
        };
        btn_pict1.focus();
        setupImageUpload('btn_pict1', 'imagePreview1', 'Pict_1', 'btn_pict2');
        setupImageUpload('btn_pict2', 'imagePreview2', 'Pict_2', 'btn_pict3');
        setupImageUpload('btn_pict3', 'imagePreview3', 'Pict_3', 'btn_simpan');
        btn_pict4.disabled = true;
    } else if (fourPicturesChecked) {
        jumlah = 4;
        imageFiles = {
            'picture1': null,
            'picture2': null,
            'picture3': null,
            'picture4': null
        };
        setupImageUpload('btn_pict1', 'imagePreview1', 'Pict_1', 'btn_pict2');
        setupImageUpload('btn_pict2', 'imagePreview2', 'Pict_2', 'btn_pict3');
        setupImageUpload('btn_pict3', 'imagePreview3', 'Pict_3', 'btn_pict4');
        setupImageUpload('btn_pict4', 'imagePreview4', 'Pict_4', 'btn_simpan');
    }
}

threePictures.addEventListener('change', updateFocus);
fourPictures.addEventListener('change', updateFocus);


// fungsi utama memeriksa semua input
async function checkAllInputs() {
    for (const input of inputTestMethod) {
        const textForInput = getTextForInput(input.id);

        // Special case for Top Lift Test Result
        if (input.id === 'Top_Result' && (input.value.trim() === '' || input.value.trim() === '0' || input.value.trim() === '0.00')) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Inputkan Top Lift Test Result Terlebih Dahulu!',
                returnFocus: false
            });

            input.focus();
            return false;
        }

        // General case for empty inputs
        if (input.value.trim() === '') {
            const result = await Swal.fire({
                icon: 'question',
                text: `Apakah Data ${textForInput} Mau Anda Lengkapi?`,
                returnFocus: false,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            });

            if (result.isConfirmed) {
                input.focus();
            }
            return false;
        }
    }
    return true;
}


function getTextForInput(inputId) {
    switch (inputId) {
        case 'dia_val':
            return 'Diameter';
        case 'square_val':
            return 'Square';
        case 'Top_Result':
            return 'Top Lift Test Result';
        default:
            return '';
    }
}


// function getTextForInput(inputId) {
//     switch (inputId) {
//         case 'Height_Approx':
//             return 'Height Approx';
//         case 'dia_val':
//             return 'Diameter';
//         case 'square_val':
//             return 'Square';
//         case 'Load_Speed':
//             return 'Speed';
//         case 'Drop_Test':
//             return 'Drop Test';
//         default:
//             return '';
//     }
// }


var Ketik = document.querySelectorAll('input');

// fungsi bisa ketik
function enableKetik() {
    // hide button isi, tampilkan button simpan
    btn_isi.style.display = 'none';
    btn_simpan.style.display = 'inline-block';
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_info.disabled = false;
    btn_pict1.disabled = false;
    btn_pict2.disabled = false;
    btn_pict3.disabled = false;
    btn_pict4.disabled = false;
}

// fungsi gak bisa ketik
function disableKetik() {
    Ketik.forEach(function (input) {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
            input.disabled = true;
        } else {
            input.value = '';
            input.disabled = true;
        }
    });
    btn_info.disabled = true;

    btn_simpan.style.display = 'none';
    btn_isi.style.display = 'inline-block';

    btn_batal.style.display = 'none';
    btn_koreksi.style.display = 'inline-block';

    btn_hapus.disabled = false;
    btn_pict1.disabled = true;
    btn_pict2.disabled = true;
    btn_pict3.disabled = true;
    btn_pict4.disabled = true;
}

// Initially disable Ketik on page load
disableKetik();

btn_isi.addEventListener('click', function () {
    a = 1;
    enableKetik();
    btn_info.disabled = false;
    btn_info.focus();
});

// Button batal event listener
btn_batal.addEventListener('click', function () {
    btn_hapus.disabled = false;
    disableKetik();
});

btn_simpan.addEventListener('click', async function (e) {
    if (a === 1) { // ISI
        if (await checkAllInputs()) {
            let cLiftTxt = cLift && cLift.length > 0 ? cLift.join(', ') : null;
            let tLiftTxt = tLift && tLift.length > 0 ? tLift.join(', ') : null;
            let cyclicResultTxt = cResult && cResult.length > 0 ?
                (cResult.includes('Visible damages found at') ? cResult.join(', ') + ' ' + damageFoundDescCyInput.value.trim() : cResult.join(', '))
                : null;
            let breakageTxt = breakage && breakage.length > 0 ?
                (breakage.includes('Others :') ? breakage.join(', ') + ' ' + othersTextInput.value.trim() : breakage.join(', '))
                : null;
            let dropResultTxt = dResult && dResult.length > 0 ?
                (dResult.includes('Visible damages found at') ? dResult.join(', ') + ' ' + damageFoundDescDropInput.value.trim() : dResult.join(', '))
                : null;

            // Define the sections and corresponding text
            let text = ['Cyclic Test', 'Cyclic Test Result', 'Top Lift Test', 'Breakage Location', 'Drop Test'];
            let tidakTercentang = [];

            // Logic to populate tidakTercentang with missing sections
            if (cLiftTxt === null) tidakTercentang.push(0);
            if (cyclicResultTxt === null) tidakTercentang.push(1);
            if (tLiftTxt === null) tidakTercentang.push(2);
            if (breakageTxt === null) tidakTercentang.push(3);
            if (dropResultTxt === null) tidakTercentang.push(4);

            console.log('cyclic lift: ', cLiftTxt);
            console.log('top lift: ', tLiftTxt);
            console.log('cyclic result: ', cyclicResultTxt);
            console.log('breakage loc: ', breakageTxt);
            console.log('drop result: ', dropResultTxt);
            console.log(tidakTercentang.length);

            // Show SweetAlerts for any missing sections
            for (let i = 0; i < tidakTercentang.length; i++) {
                let index = tidakTercentang[i];
                let questionText = `Apakah Data ${text[index]} Mau Anda Lengkapi?`;

                const result = await Swal.fire({
                    icon: 'question',
                    text: questionText,
                    returnFocus: false,
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                });

                if (result.isConfirmed) {
                    return;
                }
            }

            // If all inputs are filled, submit the form
            submitForm(cLiftTxt, tLiftTxt, cyclicResultTxt, breakageTxt, dropResultTxt);
            console.log("BERHASIL SIMPAN");
        }
        // else {
        //     await Swal.fire({
        //         icon: 'warning',
        //         title: 'Incomplete Data',
        //         text: 'Data Belum Lengkap Terisi'
        //     });
        // }
        console.log("BERHASIL SIMPAN");
    } else if (a === 2) { // KOREKSI
    } else if (a === 3) { //HAPUS
    }
});

// console.log('before trim');
// console.log('cyclic lift: ', cLift);
// console.log('top lift: ', tLift);
// console.log('cyclic result: ', cResult);
// console.log('breakage loc: ', breakage);
// console.log('drop result: ', dResult);
// console.log('after trim');
// console.log('cyclic lift: ', cLiftTxt);
// console.log('top lift: ', tLiftTxt);
// console.log('cyclic result: ', cyclicResultTxt);
// console.log('breakage loc: ', breakageTxt);
// console.log('drop result: ', dropResultTxt);

btn_koreksi.addEventListener('click', function () {
    a = 2;
    enableKetik();
    btn_info.disabled = false;
    btn_info.focus();
    btn_hapus.disabled = true;
});

btn_hapus.addEventListener('click', function () {
    a = 3;
});


function submitForm(cLiftTxt, tLiftTxt, cyclicResultTxt, breakageTxt, dropResultTxt) {
    const hasil = TestResult < Top_Result.value ? 'PASS' : 'FAIL';

    const formatInput = (input) => input !== undefined && !isNaN(input) ? parseFloat(input).toFixed(2) : '0.00';

    const formData = new FormData();
    formData.append('RefNo', (refNo.value || '').trim());
    formData.append('Height_Approx', formatInput(Height_Approx.value));
    formData.append('dia_val', formatInput(dia_val.value));
    formData.append('square_val', (square_val.value || '').trim());
    formData.append('Cyclic_Test', formatInput(Cyclic_Test.value));
    formData.append('Load_Speed', formatInput(Load_Speed.value));
    formData.append('Drop_Test', (Drop_Test.value || '').trim());

    formData.append('Cyclic_Lift', (cLiftTxt || '').trim());
    formData.append('Top_Lift', (tLiftTxt || '').trim());
    formData.append('Top_Result', (Top_Result.value || '').trim());
    formData.append('Cyclic_Result', (cyclicResultTxt || '').trim());
    formData.append('Breakage_Location', (breakageTxt || '').trim());
    formData.append('Drop_Result', (dropResultTxt || '').trim());
    formData.append('TestResult', hasil);
    formData.append('Jumlah', String(jumlah));

    for (let i = 1; i <= 30; i++) {
        const dataElement = document.getElementById('Data_' + i);
        if (dataElement) {
            formData.append('Data_' + i, formatInput(dataElement.value));
        }
    }

    Object.keys(imageFiles).forEach(key => {
        if (imageFiles[key]) {
            formData.append(key, imageFiles[key]);
        }
    });

    const url = jumlah == '3' ? 'FrmInputTest/store3pict' : 'FrmInputTest/store4pict';

    // console.log("CEK DATA bfr post");
    // for (const pair of formData.entries()) {
    //     console.log(`${pair[0]}: ${pair[1]}`);
    // }

    // Send AJAX request
    $.ajax({
        type: 'PUT',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            'X-CSRF-TOKEN': csrfToken
        },
        timeout: 30000,
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Telah Tersimpan',
                }).then(() => {
                    disableKetik();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Data Belum Lengkap Terisi',
            });
        }
    });
}





async function koreksiTest(cLiftTxt, cResultTxt, tLiftTxt, breakageTxt, dResultTxt) {
    function formatInput(input) {
        return input !== undefined && !isNaN(input) ? parseFloat(input).toFixed(2) : '0.00';
    }

    $.ajax({
        type: 'PUT',
        url: 'FrmInputTest/koreksiTestFIBC',
        data: {
            _token: csrfToken,
        },
        timeout: 30000,
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Telah Tersimpan',
                }).then(() => {
                    disableKetik();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Data Belum Lengkap Terisi',
            });
        }
    });
}
