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
var Data_1 = document.getElementById('Data_1');

// Test Result Section
var cyclicbesar = document.getElementById('cyclicbesar');
var Cyclic_Lift = document.getElementById('Cyclic_Lift');
var Cyclic_Result = document.getElementById('cyclicResult');
var damageFoundDescCyInput = document.getElementById('damageFoundDescCy');
var topbesar = document.getElementById('topbesar');
var Top_Lift = document.getElementById('Top_Lift');
var Top_Result = document.getElementById('Top_Result');
var othersTextInput = document.getElementById('othersText');
var dropbesar = document.getElementById('dropbesar');
var Drop_Result = document.getElementById('Drop_Result');
var damageFoundDescDropInput = document.getElementById('damageFoundDescDrop');

// Picture of Breakage Section
var jumlah = 0;
var threePictures = document.getElementById('threePictures');
var fourPictures = document.getElementById('fourPictures');
var imageFiles;
var imagePreview = document.getElementById('imagePreview1');
var imagePreview2 = document.getElementById('imagePreview2');
var imagePreview3 = document.getElementById('imagePreview3');
var imagePreview4 = document.getElementById('imagePreview4');

// specific div
var testmethodDiv = document.getElementById('test_method');
var testmethodDetail = testmethodDiv.querySelectorAll('input');
var cyclic30Detail = document.querySelectorAll('#cyclic30box input');

// button
var btn_info = document.getElementById('btn_info');
var gambar1 = document.getElementById('gambar1');
var gambar2 = document.getElementById('gambar2');
var gambar3 = document.getElementById('gambar3');
var gambar4 = document.getElementById('gambar4');

var btn_isi = document.getElementById('btn_isi');
var btn_simpan = document.getElementById('btn_simpan');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

var labelpict1 = document.getElementById('labelpict1');
var labelpict2 = document.getElementById('labelpict2');
var labelpict3 = document.getElementById('labelpict3');
var labelpict4 = document.getElementById('labelpict4');

let a; // isi = 1, koreksi = 2, hapus = 3
var refCopy;
var hasil;
var TestResult;

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

btn_isi.focus();

// fungsi berhubungan dengan ENTER
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.value.trim() !== '') {
                // console.log(masuk.id);
                if (masuk.id === 'Height_Approx' || masuk.id === 'dia_val') {
                    Load_Speed.disabled = false;
                    Load_Speed.focus();
                    Load_Speed.select();
                } else if (masuk.id === 'Load_Speed') {
                    Data_1.disabled = false;
                    Data_1.focus();
                    Data_1.select();
                } else if (masuk.id.startsWith('Data_')) {
                    handleData(masuk);
                } else if (masuk.id === 'Drop_Test' && !areAllInputsDisabled(testmethodDetail)) {
                    Cyclic_Lift.disabled = false;
                    Top_Lift.disabled = false;
                    Drop_Result.disabled = false;
                    threePictures.disabled = false;
                    fourPictures.disabled = false;
                    pict_break.disabled = false;

                } else if (index + 1 < inputs.length) {
                    inputs[index + 1].focus();
                    inputs[index + 1].select();
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
                        Height_Approx.focus();
                        Height_Approx.select();
                    } else {
                        Height_Approx.value = '';
                        Load_Speed.disabled = false;
                        Load_Speed.focus();
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
                        dia_val.select();
                    } else {
                        dia_val.value = '';
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
                        square_val.select();
                    } else {
                        square_val.value = '';
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
                        Load_Speed.select();
                    } else {
                        Load_Speed.value = '';
                        Data_1.disabled = false;
                        Data_1.focus();
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
                        Drop_Test.focus();
                        Drop_Test.select();
                    } else {
                        Drop_Test.value = '';
                        Cyclic_Lift.disabled = false;
                        Top_Lift.disabled = false;
                        Drop_Result.disabled = false;
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
                    masuk.select();
                });
            }
        }
    });
});

// fungsi unk preview gambar
function handleImagePreview(inputId, imageId, labelId) {
    document.getElementById(inputId).addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imagePreview = document.getElementById(imageId);
                const label = document.querySelector(`label[for='${inputId}']`);

                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';

                label.textContent = file.name;
            };
            reader.readAsDataURL(file);
        }
    });
}

handleImagePreview('gambar1', 'imagePreview1');
handleImagePreview('gambar2', 'imagePreview2');
handleImagePreview('gambar3', 'imagePreview3');
handleImagePreview('gambar4', 'imagePreview4');


// fokus ke input tiap kali dia & square tercentang
diaCheckbox.addEventListener('change', function () {
    if (diaCheckbox.checked) {
        dia_val.focus();
    }
});
squareCheckbox.addEventListener('change', function () {
    if (squareCheckbox.checked) {
        square_val.focus();
    }
});

// fungsi untuk autofill & buka input unk 30 data
function handleData(masuk) {
    const currentDataNumber = parseInt(masuk.id.split('_')[1], 10);

    if (currentDataNumber < 15) {
        let currentIndex = Array.from(cyclic30Detail).findIndex(input => input.disabled === true);

        while (cyclic30Detail[currentIndex] && parseInt(cyclic30Detail[currentIndex].id.split('_')[1], 10) >= 16) {
            currentIndex++;
        }

        if (currentIndex !== -1 && currentIndex < cyclic30Detail.length) {
            cyclic30Detail[currentIndex].disabled = false;
        }

        // auto-fill
        const relatedIndex = indexMapping[currentDataNumber];
        if (relatedIndex && relatedIndex <= cyclic30Detail.length) {
            cyclic30Detail[relatedIndex - 1].value = masuk.value;
        }

        focusNextElement(currentDataNumber);

    } else if (currentDataNumber === 15) {
        // cyclic30Detail[currentIndex].disabled = false;
        // cyclic30Detail[currentIndex]
        cyclic30Detail[indexMapping[currentDataNumber] - 1].value = masuk.value;
        Drop_Test.disabled = false;
        Drop_Test.focus();
        Drop_Test.select();
    }
}

// fungsi fokus ke 30 data selanjutnya
function focusNextElement(startIndex) {
    for (let i = startIndex; i < cyclic30Detail.length; i++) {
        if (cyclic30Detail[i].id.startsWith('Data_')) {
            cyclic30Detail[i].focus();
            cyclic30Detail[i].select();
            break;
        }
    }
}

// fungsi cek apakah input pd div tertentu disabled
function areAllInputsDisabled(inputs) {
    return Array.from(inputs).every(input => input.disabled);
}

// fungsi unk membuka input pd div tertentu jika checkbox tertentu di centang
function toggleInputs(checkboxId, divId) {
    const checkbox = document.getElementById(checkboxId);
    const div = document.getElementById(divId);


    checkbox.addEventListener("change", function () {
        const inputs = div.querySelectorAll('input');

        if (checkbox.checked) {
            inputs.forEach(input => {
                input.disabled = false;
            });

            if (checkboxId === 'Cyclic_Lift') {
                document.querySelector('#cyclicResult input[name="Visible damages found at"]').addEventListener('change', function () {
                    damageFoundDescCyInput.focus();
                });
            } else if (checkboxId === 'Top_Lift') {
                document.querySelector('#Breakage_Location input[name="Others :"]').addEventListener('change', function () {
                    othersTextInput.focus();
                });
            } else if (checkboxId === 'Drop_Result') {
                document.querySelector('#dropResult input[name="Visible damages found at"]').addEventListener('change', function () {
                    damageFoundDescDropInput.focus();
                });
            } else if (checkboxId === 'Dia') {
                dia_val.disabled = false;
                dia_val.focus();
            } else if (checkboxId === 'Square') {
                square_val.disabled = false;
                square_val.focus();
            }
        }
    });
}

// memanggil fungsi membuka div centang
toggleInputs("Dia", "inputDia");
toggleInputs("Square", "inputSq");
toggleInputs("Cyclic_Lift", "cyclicbesar");
toggleInputs("Top_Lift", "topbesar");
toggleInputs("Drop_Result", "dropResult");


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

// format angka .00 jadi 0.00
const formatInput = (input) => input !== undefined && !isNaN(input) ? parseFloat(input).toFixed(2) : '0.00';

var imageUrl1;
var imageUrl2;
var imageUrl3;
var imageUrl4;

// button unk select referece
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
            width: '40%',
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            returnFocus: false,
            didOpen: () => {
                const table = $("#table_list").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    order: [[1, "asc"]],
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

                clearPreviousData();

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
                        // console.log('TestResult : ', TestResult);


                        if (a === 1) { // fill dari no ref isi
                            if (response.refCopy === '') { // tidak ada copy ref no

                                Height_Approx.disabled = false;
                                diaCheckbox.disabled = false;
                                squareCheckbox.disabled = false;
                                Height_Approx.focus();

                                threePictures.disabled = false;
                                fourPictures.disabled = false;

                            } else { // ada copy ref no
                                Data_1.disabled = false;
                                Data_1.focus();

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

                                    if (dia_val.value > '0.00') {
                                        diaCheckbox.checked = true;
                                    }
                                    if (square_val.value > 0) {
                                        squareCheckbox.checked = true;
                                    }
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
                        } else { // fill dari no ref koreksi & hapus
                            if (response.koreksiData && response.koreksiData.length > 0) {
                                Height_Approx.focus();
                                Height_Approx.select();

                                const data = response.koreksiData[0];
                                // console.log("Data from response:", data);

                                Height_Approx.value = data.Height_Approx;
                                dia_val.value = data.dia_val;
                                square_val.value = data.square_val;

                                if (dia_val.value > 0) {
                                    diaCheckbox.checked = true;
                                }
                                if (square_val.value > 0) {
                                    squareCheckbox.checked = true;
                                }
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

                                console.log(data.Jumlah);


                                // membuka disabled div cyclic
                                if (Cyclic_Lift.checked) {
                                    cyclicbesar.classList.remove('disabled');
                                    cyclicbesar.querySelectorAll('input').forEach(input => {
                                        input.disabled = false;
                                    });
                                } else {
                                    cyclicbesar.classList.add('disabled');
                                    cyclicbesar.querySelectorAll('input').forEach(input => {
                                        input.disabled = true;
                                    });
                                }

                                // membuka disabled div top
                                if (Top_Lift.checked) {
                                    topbesar.classList.remove('disabled');
                                    topbesar.querySelectorAll('input').forEach(input => {
                                        input.disabled = false;
                                    });
                                } else {
                                    topbesar.classList.add('disabled');
                                    topbesar.querySelectorAll('input').forEach(input => {
                                        input.disabled = true;
                                    });
                                }

                                // membuka disabled div drop
                                if (Drop_Result.checked) {
                                    dropbesar.classList.remove('disabled');
                                    dropbesar.querySelectorAll('input').forEach(input => {
                                        input.disabled = false;
                                    });
                                } else {
                                    dropbesar.classList.add('disabled');
                                    dropbesar.querySelectorAll('input').forEach(input => {
                                        input.disabled = true;
                                    });
                                }

                                // membuka disabled input lain
                                Height_Approx.disabled = false;
                                diaCheckbox.disabled = false;
                                if (parseInt(dia_val.value) !== 0.00) {
                                    diaCheckbox.checked = true;
                                    dia_val.disabled = false;
                                }
                                squareCheckbox.disabled = false;
                                if (square_val.value !== '') {
                                    squareCheckbox.checked = true;
                                    square_val.disabled = false;
                                }
                                Load_Speed.disabled = false;
                                Drop_Test.disabled = false;

                                // membuka disabled button pict & centangnya
                                threePictures.disabled = false;
                                fourPictures.disabled = false;

                                if (data.Jumlah === '3') {
                                    threePictures.checked = true;
                                    gambar1.disabled = false;
                                    gambar2.disabled = false;
                                    gambar3.disabled = false;
                                    jumlah = data.Jumlah;
                                } else {
                                    fourPictures.checked = true;
                                    gambar1.disabled = false;
                                    gambar2.disabled = false;
                                    gambar3.disabled = false;
                                    gambar4.disabled = false;
                                    jumlah = data.Jumlah;
                                }

                                // mengisi nilai data_1 sampai data_30 dan membuka disabled pada data_1 - data_15
                                for (let i = 1; i <= 30; i++) {
                                    const dataKey = `Data_${i}`;
                                    const elementId = `Data_${i}`;
                                    const element = document.querySelector(`#${elementId}`);

                                    if (element) {
                                        if (data[dataKey] !== undefined) {
                                            element.value = formatInput(data[dataKey]);
                                        }
                                        if (i <= 15) {
                                            element.disabled = false;
                                        }
                                    }
                                }

                                // menampilkan gambar
                                var imageData1 = response.koreksiData[0].Pict_1;
                                var imageData2 = response.koreksiData[0].Pict_2;
                                var imageData3 = response.koreksiData[0].Pict_3;
                                var imageData4 = response.koreksiData[0].Pict_4;

                                imageUrl1 = 'data:image/jpeg;base64,' + imageData1;
                                imageUrl2 = 'data:image/jpeg;base64,' + imageData2;
                                imageUrl3 = 'data:image/jpeg;base64,' + imageData3;
                                imageUrl4 = 'data:image/jpeg;base64,' + imageData4;

                                imagePreview.src = imageUrl1;
                                imagePreview.style.display = imageData1 ? 'block' : 'none';
                                imagePreview2.src = imageUrl2;
                                imagePreview2.style.display = imageData2 ? 'block' : 'none';
                                imagePreview3.src = imageUrl3;
                                imagePreview3.style.display = imageData3 ? 'block' : 'none';
                                imagePreview4.src = imageUrl4;
                                imagePreview4.style.display = imageData4 ? 'block' : 'none';
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

// fungsi clearkan semua input & checkbox jika tidak memiliki isi di database
function clearPreviousData() {
    // Menghapus data dari elemen input
    Ketik.forEach(function (input) {
        input.value = '';
        input.disabled = true;
    });

    // Menghapus centang pada semua checkbox
    // Clear checked state on all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    // Clear and hide all image previews
    const imagePreviews = document.querySelectorAll('img[id^="imagePreview"]');
    imagePreviews.forEach(function (img) {
        img.src = ''; // Clear the src attribute
        img.style.display = 'none'; // Hide the image
    });


    // Clear arrays
    cLift = [];
    cResult = [];
    tLift = [];
    breakage = [];
    dResult = [];

}

// fungsi memunculkan centang sesuai isi database
function retrieveCheck(sectionId, value, data) {
    var section = sections.find(s => s.id === sectionId);

    let isAnyChecked = false;

    section.checkboxes.forEach(function (checkboxName) {
        var checkboxes = document.querySelectorAll(`#${sectionId} input[name="${checkboxName}"]`);
        checkboxes.forEach(function (checkbox) {
            if (checkbox) {
                var dataType = checkbox.getAttribute('data-type');

                let isChecked = Array.isArray(value) ? value.includes(checkboxName) : value === checkboxName;

                checkbox.checked = isChecked;

                switch (sectionId) {
                    case 'cyclicCheck':
                        if (isChecked) {
                            cLift = [checkboxName];
                            isAnyChecked = true;
                            if (cLift.length > 0) {
                                Cyclic_Lift.checked = true;
                                document.querySelector('#cyclicResult').classList.remove('disabled');
                                document.querySelectorAll('#cyclicResult input').forEach(input => input.disabled = false);
                            }
                        }
                        break;

                    case 'topLiftCheck':
                        if (isChecked) {
                            tLift = [checkboxName];
                            isAnyChecked = true;
                            if (tLift.length > 0) {
                                Top_Lift.checked = true;
                                document.querySelector('#Top_Result').classList.remove('disabled');
                                document.querySelector('#Breakage_Location').classList.remove('disabled');
                                document.querySelectorAll('#Top_Result input, #Breakage_Location input').forEach(input => input.disabled = false);
                            }
                        }
                        break;

                    case 'Breakage_Location':
                        if (isChecked) {
                            breakage = [checkboxName];
                            isAnyChecked = true;
                            if (checkboxName === 'Others :') {
                                othersTextInput.disabled = false;
                                othersTextInput.value = data.Breakage_Location_Remaining;
                            }
                        }
                        break

                    case 'dropResult':
                        if (dataType === 'drop') {
                            if (isChecked) {
                                dResult = [checkboxName];
                                isAnyChecked = true;
                                if (dResult.length > 0) {
                                    Drop_Result.checked = true;
                                    document.querySelector('#dropResult').classList.remove('disabled');
                                    document.querySelectorAll('#dropResult input').forEach(input => input.disabled = false);
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
                            if (isChecked) {
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
            if (!isAnyChecked) {
                cLift = null;
                document.querySelector('#cyclicResult').classList.add('disabled');
                document.querySelectorAll('#cyclicResult input').forEach(input => input.disabled = true);
            }
            break;
        case 'topLiftCheck':
            if (!isAnyChecked) {
                tLift = null;
                document.querySelector('#Top_Result').classList.add('disabled');
                document.querySelector('#Breakage_Location').classList.add('disabled');
                document.querySelectorAll('#Top_Result input, #Breakage_Location input').forEach(input => input.disabled = true);
            }
            break;
        case 'Breakage_Location':
            if (!isAnyChecked) {
                breakage = null;
                if (document.querySelector('#Breakage_Location input[name="Others :"]').checked) {
                    othersTextInput.disabled = true;
                    othersTextInput.value = '';
                    othersTextInput.focus;
                }
            }
            break;
        case 'dropResult':
            if (!isAnyChecked) {
                dResult = null;
                document.querySelector('#dropResult').classList.add('disabled');
                document.querySelectorAll('#dropResult input').forEach(input => input.disabled = true);
            }
            break;
        case 'cyclicResult':
            if (!isAnyChecked) {
                cResult = null;
            }
            break;
        default:
            break;
    }
}

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

    centangCheck = [
        cLift ? cLift.length : 0,
        cResult ? cResult.length : 0,
        tLift ? tLift.length : 0,
        breakage ? breakage.length : 0,
        dResult ? dResult.length : 0
    ];
}

// panggil fungsi cek checkbox
setupCheckboxListeners();

// IMAGEEE
// fungsi memilih gambar & append ke formdata
function setupImageUpload(btnId, inputId, textId, previewId, nextBtnId, formData, imageKey) {
    const btn = document.querySelector(btnId);
    const fileInput = document.querySelector(inputId);
    const textInput = document.querySelector(textId);
    const imagePreview = document.querySelector(previewId);
    const nextBtn = nextBtnId ? document.querySelector(nextBtnId) : null;

    // Function to handle file input changes
    function fileInputChangeHandler() {
        const file = fileInput.files[0];
        if (file) {
            textInput.value = file.name;
            const objectURL = URL.createObjectURL(file);
            imagePreview.src = objectURL;
            imagePreview.style.display = 'block';

            formData.append(imageKey, file);

            if (nextBtn) {
                nextBtn.focus();
            }
        } else {
            textInput.value = '';
            imagePreview.src = '';
            // imagePreview.style.display = 'none';
        }
    }

    // Remove previous event listener to avoid duplicates
    fileInput.removeEventListener('change', fileInputChangeHandler);
    fileInput.addEventListener('change', fileInputChangeHandler);

    // Trigger file input click when button is clicked
    btn.addEventListener('click', function () {
        fileInput.click();
    });
}

// Setup image upload for three pictures
function updateFocus() {
    console.log('masuk update focus');
    gambar1.disabled = false;
    gambar2.disabled = false;
    gambar3.disabled = false;
    gambar4.disabled = false;

    const formData = new FormData();
    const threePicturesChecked = threePictures.checked;
    const fourPicturesChecked = fourPictures.checked;

    if (threePicturesChecked) {
        jumlah = '3';
        console.log(jumlah);

        imageFiles = {
            'picture1': null,
            'picture2': null,
            'picture3': null
        };
    } else if (fourPicturesChecked) {
        console.log(jumlah);

        // btn_pict4.disabled = false;
        jumlah = '4';
        imageFiles = {
            'picture1': null,
            'picture2': null,
            'picture3': null,
            'picture4': null
        };
    }
}

// Initialize event listeners
threePictures.addEventListener('change', updateFocus);
fourPictures.addEventListener('change', updateFocus);

// fungsi utama memeriksa semua input
async function checkAllInputs() {
    for (const input of inputTestMethod) {
        console.log('checkAllInputs');

        if (input.id === 'dia_val' && input.value.trim() === '') {
            const result = await Swal.fire({
                icon: 'question',
                text: `Apakah Data Diameter Mau Anda Lengkapi?`,
                returnFocus: false,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            });

            if (result.isConfirmed) {
                dia_val.disabled = false;
                dia_val.focus();
                return;
            } else {
                dia_val.value = '';
            }
        } if (input.id === 'square_val' && input.value.trim() === '') {
            const result = await Swal.fire({
                icon: 'question',
                text: `Apakah Data Square Mau Anda Lengkapi?`,
                returnFocus: false,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            });

            if (result.isConfirmed) {
                square_val.disabled = false;
                square_val.focus();
                return;
            } else {
                square_val.value = '';
            }
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

    // hide button simpan, tampilkan button isi
    btn_simpan.style.display = 'none';
    btn_isi.style.display = 'inline-block';

    // hide button batal, tampilkan button koreksi
    btn_batal.style.display = 'none';
    btn_koreksi.style.display = 'inline-block';

    btn_hapus.disabled = false;

    imagePreview.src = ''
    imagePreview2.src = ''
    imagePreview3.src = ''
    imagePreview4.src = ''

    labelpict1.textContent = '';
    labelpict2.textContent = '';
    labelpict3.textContent = '';
    labelpict4.textContent = '';
}

// Initially disable Ketik on page load
disableKetik();

// button isi event listener
btn_isi.addEventListener('click', function () {
    a = 1;
    enableKetik();
    btn_info.disabled = false;
    btn_info.focus();
    btn_hapus.disabled = true;
});

// button batal event listener
btn_batal.addEventListener('click', function () {
    btn_hapus.disabled = false;
    disableKetik();
});

// button simpan
btn_simpan.addEventListener('click', async function (e) {
    if (a === 1) { // ISI
        const allInputsValid = await checkAllInputs();
        if (!allInputsValid) {
            return;
        }

        let cLiftTxt = cLift && cLift.length > 0 ? cLift.join(', ') : null;
        let tLiftTxt = tLift && tLift.length > 0 ? tLift.join(', ') : null;
        let cyclicResultTxt = cResult && cResult.length > 0 ? (cResult.includes('Visible damages found at') ? cResult.join(', ') + ' ' + damageFoundDescCyInput.value.trim() : cResult.join(', ')) : null;
        let breakageTxt = breakage && breakage.length > 0 ? (breakage.includes('Others :') ? breakage.join(', ') + ' ' + othersTextInput.value.trim() : breakage.join(', ')) : null;
        let dropResultTxt = dResult && dResult.length > 0 ? (dResult.includes('Visible damages found at') ? dResult.join(', ') + ' ' + damageFoundDescDropInput.value.trim() : dResult.join(', ')) : null;

        console.log('cyclic lift: ', cLift);
        console.log('top lift: ', tLift);
        console.log('cyclic result: ', cResult);
        console.log('breakage loc: ', breakage);
        console.log('drop result: ', dResult);

        let text = ['Cyclic Test', 'Cyclic Test Result', 'Top Lift Test', 'Breakage Location', 'Drop Test'];
        let tidakTercentang = [];

        if (cLiftTxt === null) tidakTercentang.push(0);
        if (cyclicResultTxt === null) tidakTercentang.push(1);
        if (tLiftTxt === null) tidakTercentang.push(2);
        if (breakageTxt === null) tidakTercentang.push(3);
        if (dropResultTxt === null) tidakTercentang.push(4);

        if (tidakTercentang.length > 0) {
            console.log('cek tidakTercentang');
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
        }
        // harus centang cyclic lift
        if (cLift.length === 0) {
            const result = await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Centang Cyclic Lift Terlebih Dahulu!',
                returnFocus: false
            });
            return;
        }
        // harus centang cyclic result
        if (cResult.length === 0) {
            const result = await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Centang Cyclic Result Terlebih Dahulu!',
                returnFocus: false
            });
            return;
        }
        // harus centang top lift
        if (tLift.length === 0) {
            const result = await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Centang Top Lift Terlebih Dahulu!',
                returnFocus: false
            });
            return;
        }
        // harus isi top result
        if (Top_Result.value.trim() === '' || Top_Result.value.trim() === '0' || Top_Result.value.trim() === '0.00') {
            const result = await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Inputkan Top Lift Test Result Terlebih Dahulu!',
                returnFocus: false
            });

            if (result.isConfirmed) {
                Top_Result.focus();
            }
            return;
        }
        // harus centang breakage location
        if (breakage.length === 0) {
            const result = await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Centang Breakage Location Terlebih Dahulu!',
                returnFocus: false
            });
            return;
        }



        submitForm(cLiftTxt, tLiftTxt, cyclicResultTxt, breakageTxt, dropResultTxt);

    } else if (a === 2) { // KOREKSI
        let cLiftTxt = cLift && cLift.length > 0 ? cLift.join(', ') : null;
        let tLiftTxt = tLift && tLift.length > 0 ? tLift.join(', ') : null;
        let cyclicResultTxt = cResult && cResult.length > 0 ? (cResult.includes('Visible damages found at') ? cResult.join(', ') + ' ' + damageFoundDescCyInput.value.trim() : cResult.join(', ')) : null;
        let breakageTxt = breakage && breakage.length > 0 ? (breakage.includes('Others :') ? breakage.join(', ') + ' ' + othersTextInput.value.trim() : breakage.join(', ')) : null;
        let dropResultTxt = dResult && dResult.length > 0 ? (dResult.includes('Visible damages found at') ? dResult.join(', ') + ' ' + damageFoundDescDropInput.value.trim() : dResult.join(', ')) : null;

        koreksiTest(cLiftTxt, tLiftTxt, cyclicResultTxt, breakageTxt, dropResultTxt)

    } else if (a === 3) { //HAPUS
        $.ajax({
            url: "FrmInputTest/hapusTest",
            type: "DELETE",
            data: {
                _token: csrfToken,
                no_ref: refNo.value
            },
            timeout: 30000,
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data Telah Terhapus',
                    }).then(() => {
                        disableKetik();
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error:', error);
                console.log('Response Status:', status);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Data Gagal Terhapus',
                });
            }
        });
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
    btn_isi.style.display = 'none';
    btn_simpan.style.display = 'inline-block';

    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_info.disabled = false;
    btn_hapus.disabled = true;
    btn_info.focus();
});

// let TestResult;

// fungsi untuk simpan dari isi
function submitForm(cLiftTxt, tLiftTxt, cyclicResultTxt, breakageTxt, dropResultTxt) {
    if (Height_Approx.value === '') {
        Height_Approx.value = 0.00;
    }
    if (dia_val.value === '') {
        dia_val.value = 0.00;
    }
    if (Load_Speed.value === '') {
        Load_Speed.value = 0.00;
    }


    hasil = TestResult < Top_Result.value ? 'PASS' : 'FAIL';
    const formData = new FormData();

    // Add form data fields
    formData.append('a', 1);
    formData.append('RefNo', (refNo.value).trim());
    formData.append('Height_Approx', formatInput(Height_Approx.value));
    formData.append('dia_val', formatInput(dia_val.value));
    formData.append('square_val', (square_val.value || '').trim());
    formData.append('Cyclic_Test', formatInput(Cyclic_Test.value));
    formData.append('Load_Speed', formatInput(Load_Speed.value));
    formData.append('Drop_Test', (Drop_Test.value || '').trim());
    formData.append('Cyclic_Lift', (cLiftTxt).trim());
    formData.append('Top_Lift', (tLiftTxt).trim());
    formData.append('Top_Result', (Top_Result.value).trim());
    formData.append('Cyclic_Result', (cyclicResultTxt).trim());
    formData.append('Breakage_Location', (breakageTxt).trim());
    formData.append('Drop_Result', (dropResultTxt || '').trim());
    formData.append('TestResult', hasil);
    formData.append('Jumlah', jumlah);

    // Append additional data fields dynamically
    for (let i = 1; i <= 30; i++) {
        const dataElement = document.getElementById('Data_' + i);
        if (dataElement) {
            formData.append('Data_' + i, formatInput(dataElement.value));
        }
    }

    var gambar1data = document.getElementById("gambar1").files[0];
    var gambar2data = document.getElementById("gambar2").files[0];
    var gambar3data = document.getElementById("gambar3").files[0];
    var gambar4data = document.getElementById("gambar4").files[0];

    formData.append("gambar1data", gambar1data);
    formData.append("gambar2data", gambar2data);
    formData.append("gambar3data", gambar3data);
    formData.append("gambar4data", gambar4data);

    for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }


    // Perform AJAX request
    $.ajax({
        type: 'POST',
        url: 'FrmInputTest',
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


// fungsi untuk simpan dari koreksi
async function koreksiTest(cLiftTxt, tLiftTxt, cyclicResultTxt, breakageTxt, dropResultTxt) {
    hasil = TestResult < Top_Result.value ? 'PASS' : 'FAIL';
    const formData = new FormData();

    formData.append('a', 2);
    formData.append('RefNo', (refNo.value || '').trim());
    formData.append('Height_Approx', formatInput(Height_Approx.value));
    formData.append('dia_val', formatInput(dia_val.value));
    formData.append('square_val', (square_val.value || '').trim());
    formData.append('Cyclic_Test', formatInput(Cyclic_Test.value));
    formData.append('Load_Speed', formatInput(Load_Speed.value));
    formData.append('Drop_Test', (Drop_Test.value || '').trim());
    formData.append('Cyclic_Lift', (cLiftTxt).trim());
    formData.append('Top_Lift', (tLiftTxt).trim());
    formData.append('Top_Result', (Top_Result.value).trim());
    formData.append('Cyclic_Result', (cyclicResultTxt).trim());
    formData.append('Breakage_Location', (breakageTxt).trim());
    formData.append('Drop_Result', (dropResultTxt || '').trim());
    formData.append('TestResult', hasil);
    formData.append('Jumlah', jumlah);
    formData.append('a', a);

    console.log(jumlah);



    for (let i = 1; i <= 30; i++) {
        const dataElement = document.getElementById('Data_' + i);
        if (dataElement) {
            formData.append('Data_' + i, formatInput(dataElement.value));
        }
    }

    var gambar1data = document.getElementById("gambar1").files[0];
    var gambar2data = document.getElementById("gambar2").files[0];
    var gambar3data = document.getElementById("gambar3").files[0];
    var gambar4data = document.getElementById("gambar4").files[0];

    formData.append("gambar1data", gambar1data);
    formData.append("gambar2data", gambar2data);
    formData.append("gambar3data", gambar3data);
    formData.append("gambar4data", gambar4data);

    console.log("CEK DATA bfr pu");
    console.log("FormData contents:");

    $.ajax({
        type: 'POST',
        url: 'FrmInputTest',
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
                    text: 'Data Telah Terkoreksi',
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


