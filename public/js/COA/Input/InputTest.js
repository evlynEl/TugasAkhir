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
var Top_Lift = document.getElementById('Top_Lift');
var singleTCheckbox = document.getElementById('Single Loops');
var fourTCheckbox = document.getElementById('Four Loops');
var twoTCheckbox = document.getElementById('twoT');
var stevedoreTCheckbox = document.getElementById('stevedoreT');
var auxiliaryTCheckbox = document.getElementById('auxiliaryT');
// Top Lift Test Result Input
var Top_Result = document.getElementById('Top_Result');
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
var Drop_Result = document.getElementById('Drop_Result');
var noDamageDropCheckbox = document.getElementById('No visible damages occurred');
var damageDropCheckbox = document.getElementById('Visible damages found at*');
var damageFoundDescDropInput = document.getElementById('damageFoundDescCy');

// Picture of Breakage Section
var Jumlah = document.getElementById('Jumlah');
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
var pressureboxDiv = document.getElementById('pressurebox');
var pressureboxDetail = pressureboxDiv.querySelectorAll('input');
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
    { id: 'cyclicResult', checkboxes: ['No visible damages occurred', 'Visible damages found at*'] },
    { id: 'topLiftCheck', checkboxes: ['Single Loops', 'Four Loops', 'Two Loops', 'Stevedore', 'Auxiliary'] },
    { id: 'Breakage_Location', checkboxes: ['Body fabric', 'Petal', 'Side body\'s thread', 'Bottom fabric', 'Lifting belt', 'Bottom body\'s thread', 'Starcut of bottom spout', 'Lifting belt\'s thread', 'Others :*'] },
    { id: 'dropResult', checkboxes: ['No visible', 'Visible damages found at*'] }
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
                    Load_Speed.focus();
                }  else if (masuk.id.startsWith('Data_')) {
                    handleData(masuk);
                } else if (index + 1 < inputs.length) {
                    inputs[index + 1].focus();
                }
            }
        }
    });
});

// fungsi untuk autofill & buka 1" inputnya
function handleData(masuk) {
    const currentDataNumber = parseInt(masuk.id.split('_')[1], 10);
    let currentIndex = Array.from(cyclic30Detail).findIndex(input => input.disabled === true);

    if (currentDataNumber < 15) {

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
    } else if (currentDataNumber == 15) {
        cyclic30Detail[currentIndex].disabled = false;
        cyclic30Detail[indexMapping[currentDataNumber] - 1].value = masuk.value;
        Drop_Test.focus();

        const data16Index = Array.from(cyclic30Detail).findIndex(input => input.id === 'Data_16');
        if (data16Index !== -1) {
            cyclic30Detail[data16Index].disabled = true;
        }
    }
}

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
                        console.log(response.refCopy);
                        Cyclic_Test.value = response.cyclicTestValue;

                        if (a === 1) { // fill dari no ref isi
                            if (response.refCopy === '') { // tidak ada copy ref no
                                setTimeout(() => {
                                    Height_Approx.disabled = false;
                                    Height_Approx.focus();
                                }, 70);

                                pressureboxDetail.forEach(function (input) {
                                    input.disabled = false;
                                });
                                Load_Speed.disabled = false;
                                Drop_Test.disabled = false;


                                cyclic30Detail.forEach(function (input) {
                                    Data_1.disabled = false;
                                    input.disabled = true;
                                });

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

                                    // console.log("Arrays populated:", {
                                    //     pressure,
                                    //     cLift,
                                    //     cResult,
                                    //     tLift,
                                    //     breakage,
                                    //     dResult
                                    // });

                                    retrieveCheck('pressurebox', pressure);
                                    retrieveCheck('cyclicCheck', cLift);
                                    retrieveCheck('cyclicResult', cResult);
                                    retrieveCheck('topLiftCheck', tLift);
                                    retrieveCheck('Breakage_Location', breakage);
                                    retrieveCheck('dropResult', dResult);
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
                        top1.focus();
                    }
                });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

// fungsi memunculkan centang sesuai isi database
function retrieveCheck(sectionId, value) {
    // console.log(`Retrieving check for section: ${sectionId} with value:`, value);
    var section = sections.find(s => s.id === sectionId);

    if (!section) {
        console.log(`Section ${sectionId} not found.`);
        return;
    }

    section.checkboxes.forEach(function (checkboxName) {
        var checkbox = document.querySelector(`#${sectionId} input[name="${checkboxName}"]`);
        if (checkbox) {
            switch (sectionId) {
                case 'pressurebox':
                    checkbox.checked = (data.dia_val > '0.00') ||
                        (data.square_val !== '');
                    break;
                case 'cyclicCheck':
                    Cyclic_Lift.checked = Boolean(value);
                    checkbox.checked = value === checkboxName;
                    break;
                case 'topLiftCheck':
                    Top_Lift.checked = Boolean(value);
                    checkbox.checked = value === checkboxName;
                    break;
                case 'dropResult':
                    Drop_Result.checked = Boolean(value);
                    checkbox.checked = value === checkboxName;
                    break;
                default:
                    checkbox.checked = value.includes(checkboxName);
                    break;
            }
            // console.log(`Checkbox ${checkboxName} checked: ${checkbox.checked}`);
        }
    });
    if (sectionId === 'cyclicResult') {
        if (value !== 'Visible damages found at*') {
            damageFoundDescCy.disabled = true;
        } else {
            damageFoundDescCy.disabled = false;
        }
    }

    if (sectionId === 'dropResult') {
        if (value !== 'Visible damages found at*') {
            damageFoundDescDrop.disabled = true;
        } else {
            damageFoundDescDrop.disabled = false;
        }
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

    // simpan nilai checkbox
    switch (sectionId) {
        case 'pressurebox':
            pressure = checkedName ? [checkedName] : [];
            break;
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
    centangCheck = [pressure.length, cLift.length, cResult.length, tLift.length, breakage, length, dResult.length];

    // console.log(jenis);
    // console.log(sewing);
    // console.log(stitch);
    // console.log(draw);
}

// panggil fungsi cek checkbox
setupCheckboxListeners();

// fungsi mengambil gambar
// Define an array of button IDs in the order they should be focused
const buttonIds = ['btn_pict1', 'btn_pict2', 'btn_pict3', 'btn_pict4'];

function setupImageUpload(buttonId, imageId, textInputId, nextButtonId) {
    var button = document.getElementById(buttonId);
    var image = document.getElementById(imageId);
    var textInput = document.getElementById(textInputId);

    button.addEventListener('click', function() {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/png';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', function() {
            var file = fileInput.files[0];
            if (file) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    image.src = e.target.result;
                    image.style.display = 'block'; // Show image
                    textInput.value = file.name; // Update text input with file name

                    // Focus on the next button if it exists
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

// Call the function for each button, passing the ID of the next button to focus on
setupImageUpload('btn_pict1', 'imagePreview1', 'Pict_1', 'btn_pict2');
setupImageUpload('btn_pict2', 'imagePreview2', 'Pict_2', 'btn_pict3');
setupImageUpload('btn_pict3', 'imagePreview3', 'Pict_3', 'btn_pict4');
setupImageUpload('btn_pict4', 'imagePreview4', 'Pict_4', null);


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

btn_simpan.addEventListener('click', async function (e) {
    if (a === 1) { // ISI
    } else if (a === 2) { // KOREKSI
    } else if (a === 3) { //HAPUS
    }
});
