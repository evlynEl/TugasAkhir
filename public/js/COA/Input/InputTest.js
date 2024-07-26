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
var Data_1 = document.getElementById('Data_1');
var Data_2 = document.getElementById('Data_2');
var Data_3 = document.getElementById('Data_3');
var Data_4 = document.getElementById('Data_4');
var Data_5 = document.getElementById('Data_5');
var Data_6 = document.getElementById('Data_6');
var Data_7 = document.getElementById('Data_7');
var Data_8 = document.getElementById('Data_8');
var Data_9 = document.getElementById('Data_9');
var Data_10 = document.getElementById('Data_10');
var Data_11 = document.getElementById('Data_11');
var Data_12 = document.getElementById('Data_12');
var Data_13 = document.getElementById('Data_13');
var Data_14 = document.getElementById('Data_14');
var Data_15 = document.getElementById('Data_15');
var Data_16 = document.getElementById('Data_16');
var Data_17 = document.getElementById('Data_17');
var Data_18 = document.getElementById('Data_18');
var Data_19 = document.getElementById('Data_19');
var Data_20 = document.getElementById('Data_20');
var Data_21 = document.getElementById('Data_21');
var Data_22 = document.getElementById('Data_22');
var Data_23 = document.getElementById('Data_23');
var Data_24 = document.getElementById('Data_24');
var Data_25 = document.getElementById('Data_25');
var Data_26 = document.getElementById('Data_26');
var Data_27 = document.getElementById('Data_27');
var Data_28 = document.getElementById('Data_28');
var Data_29 = document.getElementById('Data_29');
var Data_30 = document.getElementById('Data_30');
var Drop_Test = document.getElementById('Drop_Test');

// Test Result Section
var Cyclic_Lift = document.getElementById('Cyclic_Lift');
var damageFoundDescCyInput = document.getElementById('damageFoundDescCy');
var Top_Lift = document.getElementById('Top_Lift');
var othersTextInput = document.getElementById('othersText');
var Drop_Result = document.getElementById('Drop_Result');
var damageFoundDescDropInput = document.getElementById('damageFoundDescDrop');

// Picture of Breakage Section
var jumlah;
var threePictures = document.getElementById('threePictures');
var fourPictures = document.getElementById('fourPictures');
var Pict_1 = document.getElementById('Pict_1');
var picture1 = document.getElementById('picture1');
var Pict_2 = document.getElementById('Pict_2');
var picture2 = document.getElementById('picture2');
var Pict_3 = document.getElementById('Pict_3');
var picture3 = document.getElementById('picture3');
var Pict_4 = document.getElementById('Pict_4');
var picture4 = document.getElementById('picture4');

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

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));
const inputTestMethod = Array.from(document.querySelectorAll('#test_method input[type="text"]'));

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

// TO DO LIST
// notif berturut turut
// disable btn pict 4 klo centang 3 picture

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

        }

        // Auto-fill the related index
        const relatedIndex = indexMapping[currentDataNumber];
        if (relatedIndex && relatedIndex <= cyclic30Detail.length) {
            cyclic30Detail[relatedIndex - 1].value = masuk.value;
        }
    } else if (currentDataNumber === 15) {
        cyclic30Detail[currentIndex].disabled = false;
        cyclic30Detail[currentIndex].focus();
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
                damageFoundDescCyInput.disabled = true;
                othersText.disabled = true;
                damageFoundDescDropInput.disabled = true;
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
        // else {
        //     inputs.forEach(input => {
        //         if (!input.disabled) {
        //             input.disabled = true;
        //             console.log(`Input ${input.id} disabled set to ${input.disabled}`);
        //         }
        //     });
        //     descInput.disabled = true;
        // }
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

                        if (a === 1) { // fill dari no ref isi
                            if (response.refCopy === '') { // tidak ada copy ref no
                                setTimeout(() => {
                                    Height_Approx.disabled = false;
                                    diaCheckbox.disabled = false;
                                    squareCheckbox.disabled = false;
                                    Height_Approx.focus();

                                    // Drop_Test.disabled = false;
                                    // Drop_Test.focus();
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

    section.checkboxes.forEach(function (checkboxName) {
        var checkboxes = document.querySelectorAll(`#${sectionId} input[name="${checkboxName}"]`);
        checkboxes.forEach(function (checkbox) {
            if (checkbox) {
                var dataType = checkbox.getAttribute('data-type');
                switch (sectionId) {
                    case 'pressurebox':
                        diaCheckbox.checked = (data.dia_val > '0.00');
                        squareCheckbox.checked = (data.square_val !== '');
                        break;
                    case 'cyclicCheck':
                        Cyclic_Lift.checked = Boolean(value);
                        checkbox.checked = value === checkboxName;
                        break;
                    case 'topLiftCheck':
                        Top_Lift.checked = Boolean(value);
                        checkbox.checked = value === checkboxName;
                        break;
                    case 'Breakage_Location':
                        Breakage_Location.checked = Boolean(value);
                        checkbox.checked = value === checkboxName;
                        if (checkboxName === 'Others :') {
                            othersTextInput.disabled = false;
                            othersTextInput.value = data.Breakage_Location_Remaining;
                            checkbox.addEventListener('change', function () {
                                if (checkbox.checked) {
                                    othersTextInput.value = data.Breakage_Location_Remaining;
                                    othersTextInput.focus();
                                } else {
                                    // othersTextInput.value = '';
                                    othersTextInput.blur();
                                }
                            });
                        }
                        break;
                    case 'dropResult':
                        if (dataType === 'drop') {
                            Drop_Result.checked = Boolean(value);
                            checkbox.checked = value === checkboxName;
                            if (checkboxName === 'Visible damages found at') {
                                damageFoundDescDropInput.disabled = false;
                                damageFoundDescDropInput.value = data.Drop_Result_Remaining;
                                checkbox.addEventListener('change', function () {
                                    if (checkbox.checked) {
                                        damageFoundDescDropInput.value = data.Drop_Result_Remaining;
                                        damageFoundDescDropInput.focus();
                                    } else {
                                        // damageFoundDescDropInput.value = '';
                                        damageFoundDescDropInput.blur();
                                    }
                                });
                            } else if (checkboxName === 'No visible damages occurred') {
                                damageFoundDescDropInput.disabled = true;
                                damageFoundDescDropInput.value = '';
                                // damageFoundDescDropInput.blur();
                            }
                        }
                        break;
                    case 'cyclicResult':
                        if (dataType === 'cyclic') {
                            var damageFoundDescCyInput = document.querySelector('#cyclicResult input[name="damageFoundDescCy"]');
                            checkbox.checked = value === checkboxName;
                            if (checkboxName === 'Visible damages found at') {
                                damageFoundDescCyInput.disabled = false;
                                damageFoundDescCyInput.value = data.Cyclic_Result_Remaining;
                                checkbox.addEventListener('change', function () {
                                    // damageFoundDescCyInput.disabled = !checkbox.checked;
                                    if (checkbox.checked) {
                                        damageFoundDescCyInput.value = data.Cyclic_Result_Remaining;
                                        damageFoundDescCyInput.focus();
                                    } else {
                                        // damageFoundDescCyInput.value = '';
                                        damageFoundDescCyInput.blur();
                                    }
                                });
                            } else if (checkboxName === 'No visible damages occurred') {
                                damageFoundDescCyInput.disabled = true;
                                damageFoundDescCyInput.value = '';
                                // damageFoundDescCyInput.blur();
                            }
                        }
                        break;
                    default:
                        checkbox.checked = value.includes(checkboxName);
                        break;
                }
            }
        });
    });
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

    // simpan nilai checkbox
    switch (sectionId) {
        case 'cyclicCheck':
            cLift = checkedName ? [checkedName] : [];
            break;
        case 'cyclicResult':
            cResult = checkedName ? [checkedName] : [];
            break;
        case 'topLiftCheck':
            tLift = checkedName ? [checkedName] : [];
            break;
        case 'Breakage_Location':
            breakage = checkedName ? [checkedName] : [];
            break;
        case 'dropResult':
            dResult = checkedName ? [checkedName] : [];
            break;
        default:
            break;
    }
    centangCheck = [cLift.length, cResult.length, tLift.length, breakage.length, dResult.length];

    // console.log(pressure);
    // console.log(cLift);
    // console.log(cResult);
    // console.log(tLift);
    // console.log(breakage);
    // console.log(dResult);
}

// panggil fungsi cek checkbox
setupCheckboxListeners();

// fungsi mengambil gambar
function setupImageUpload(buttonId, imageId, textInputId, nextButtonId) {
    var button = document.getElementById(buttonId);
    var image = document.getElementById(imageId);
    var textInput = document.getElementById(textInputId);

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

                    if (nextButtonId) {
                        var nextButton = document.getElementById(nextButtonId);
                        if (nextButton) {
                            nextButton.focus();
                        }
                    }
                }

                reader.readAsDataURL(file);
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    });
}

// fungsi unk fokus button pict
function updateFocus() {
    var threePicturesChecked = threePictures.checked;
    var fourPicturesChecked = fourPictures.checked;

    if (threePicturesChecked) {
        jumlah = 3;
        btn_pict1.focus();
        setupImageUpload('btn_pict1', 'imagePreview1', 'Pict_1', 'btn_pict2');
        setupImageUpload('btn_pict2', 'imagePreview2', 'Pict_2', 'btn_pict3');
        setupImageUpload('btn_pict3', 'imagePreview3', 'Pict_3', 'btn_simpan');
        btn_pict4.disabled = true;
    } else if (fourPicturesChecked) {
        jumlah = 4;
        setupImageUpload('btn_pict1', 'imagePreview1', 'Pict_1', 'btn_pict2');
        setupImageUpload('btn_pict2', 'imagePreview2', 'Pict_2', 'btn_pict3');
        setupImageUpload('btn_pict3', 'imagePreview3', 'Pict_3', 'btn_pict4');
        setupImageUpload('btn_pict4', 'imagePreview4', 'Pict_4', 'btn_simpan');
    } else {
        btn_pict1.disabled = false;
        btn_pict2.disabled = false;
        btn_pict3.disabled = false;
        btn_pict4.disabled = false;
    }
}

threePictures.addEventListener('change', updateFocus);
fourPictures.addEventListener('change', updateFocus);


// fungsi untuk menampilkan konfirmasi Swal
function showConfirmation(input, text) {
    return Swal.fire({
        icon: 'question',
        text: `Apakah Data ${text} Mau Anda Lengkapi ?`,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(result => {
        if (result.isConfirmed) {
            input.focus();
        }
        return result.isConfirmed;
    });
}

// Fungsi untuk memeriksa apakah input kosong dan menampilkan konfirmasi
function checkEmptyInput(input) {
    if (input.value.trim() === '') {
        switch (input.id) {
            case 'Height_Approx':
                return showConfirmation(input, 'Height Approx');
            case 'dia_val':
                return showConfirmation(input, 'Diameter');
            case 'square_val':
                return showConfirmation(input, 'Square');
            case 'Load_Speed':
                return showConfirmation(input, 'Speed');
            case 'Drop_Test':
                return showConfirmation(input, 'Drop Test');
            default:
                return Promise.resolve(false);
        }
    } else if (input.value.trim() === '' || input.value.trim() === 0 || input.value.trim() === 0.00) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Inputkan Top Lift Test Result Terlebih Dahulu !',
            returnFocus: false
        }).then(result => {
            if (result.isConfirmed) {
                input.focus();
            }
            return result.isConfirmed;
        });
    }
    return Promise.resolve(false);
}

// fungsi utama memeriksa semua input
async function allInputsFilled() {
    for (const input of inputTestMethod) {
        const inputId = input.id;
        const inputNumber = parseInt(inputId.split('_')[1], 10);

        if (inputId.startsWith('Data_') && (inputNumber >= 1 && inputNumber <= 15)) {
            continue;
        }

        const isInputEmpty = await checkEmptyInput(input);
        if (isInputEmpty) {
            return false;
        }
    }
    return true;
}


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
        let cLiftTxt = cLift.join(', ');
        let cResultTxt = cResult.join(', ');
        let tLiftTxt = tLift.join(', ');
        let breakageTxt = breakage.join(', ');
        let dResultTxt = dResult.join(', ');

        let text = ['Cyclic Test', 'Cyclic Test Result', 'Top Lift Test', 'Breakage Location', 'Drop Test'];
        let tidakTercentang = [];

        if (tidakTercentang.length > 0) {
            let currentIndex = 0;

            async function showSweetAlert() {
                let index = tidakTercentang[currentIndex];
                let questionText = `Apakah Data ${text[index]} Mau Anda Lengkapi?`;

                await Swal.fire({
                    icon: 'question',
                    text: questionText,
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {
                    if (result.isConfirmed) {
                        return;
                    } else {
                        currentIndex++;
                        if (currentIndex < tidakTercentang.length) {
                            disableInputs();
                            showSweetAlert();
                        } else {
                            submitForm(cLiftTxt, cResultTxt, tLiftTxt, breakageTxt, dResultTxt)
                            return;
                        }
                    }
                });
            }
            disableInputs();
            await showSweetAlert();
        } else {
            submitForm(cLiftTxt, cResultTxt, tLiftTxt, breakageTxt, dResultTxt);
        }

        if (!(allInputsFilled())) {
            return;
        }


        console.log("BERHASIL SIMPAN");
    } else if (a === 2) { // KOREKSI
    } else if (a === 3) { //HAPUS
    }
});

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

async function submitForm(cLiftTxt, cResultTxt, tLiftTxt, breakageTxt, dResultTxt) {
    function formatInput(input) {
        return input !== undefined && !isNaN(input) ? parseFloat(input).toFixed(2) : '0.00';
    }

    const dataToSend = {
        _token: csrfToken,
        Height_Approx: formatInput(Height_Approx.value),
        dia_val: formatInput(dia_val.value),
        square_val: square_val.value.trim(),
        Cyclic_Test: formatInput(Cyclic_Test.value),
        Load_Speed: formatInput(Load_Speed.value),

        Cyclic_Lift: cLiftTxt.value.trim(),
        Cyclic_Result: cResultTxt.value.trim(),
        damageFoundDescCy: damageFoundDescCyInput.value,
        Top_Lift: tLiftTxt.value.trim(),
        Breakage_Location: breakageTxt.value.trim(),
        othersText: othersTextInput.value,
        Drop_Result: dResultTxt.value.trim(),
        damageFoundDescDrop: damageFoundDescDropInput.value,

        Data_1: formatInput(Data_1.value),
        Data_2: formatInput(Data_2.value),
        Data_3: formatInput(Data_3.value),
        Data_4: formatInput(Data_4.value),
        Data_5: formatInput(Data_5.value),
        Data_6: formatInput(Data_6.value),
        Data_7: formatInput(Data_7.value),
        Data_8: formatInput(Data_8.value),
        Data_9: formatInput(Data_9.value),
        Data_10: formatInput(Data_10.value),
        Data_11: formatInput(Data_11.value),
        Data_12: formatInput(Data_12.value),
        Data_13: formatInput(Data_13.value),
        Data_14: formatInput(Data_14.value),
        Data_15: formatInput(Data_15.value),
        Data_16: formatInput(Data_16.value),
        Data_17: formatInput(Data_17.value),
        Data_18: formatInput(Data_18.value),
        Data_19: formatInput(Data_19.value),
        Data_20: formatInput(Data_20.value),
        Data_21: formatInput(Data_21.value),
        Data_22: formatInput(Data_22.value),
        Data_23: formatInput(Data_23.value),
        Data_24: formatInput(Data_24.value),
        Data_25: formatInput(Data_25.value),
        Data_26: formatInput(Data_26.value),
        Data_27: formatInput(Data_27.value),
        Data_28: formatInput(Data_28.value),
        Data_29: formatInput(Data_29.value),
        Data_30: formatInput(Data_30.value),
        Drop_Test: Drop_Test.value.trim(),

        picture1: picture1.value,
        picture2: picture2.value,
        picture3: picture3.value,
        picture4: picture4.value,
        Jumlah: jumlah.value,
    };

    console.log('Data to be sent:', dataToSend); // Debugging

    $.ajax({
        type: 'POST',
        url: 'FrmInputTest',
        data: dataToSend,
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
            console.error('Response Text:', xhr.responseText); // Debugging
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
