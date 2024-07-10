var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var tanggal = document.getElementById('tanggal');
var currentDate = new Date();
var year = document.getElementById('year');

// button
var btn_RefNo = document.getElementById('btn_RefNo');
var btn_BagCode = document.getElementById('btn_BagCode');

var btn_simpan = document.getElementById('btn_simpan');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

//weight form
var radioWeight1 = document.getElementById('radioWeight1');
var radioWeight1 = document.getElementById('radioWeight2');
var weightLabel = document.getElementById('weightLabel');

// attribut
var reffNo = document.getElementById('reffNo');
var refNo = document.getElementById('refNo');
var customer = document.getElementById('customer');
var bagCode = document.getElementById('bag-code');
var bagType = document.getElementById('bag-type');
var poNo = document.getElementById('po-no');
var prodDate = document.getElementById('prod-date');
var testingDate = document.getElementById('testing-date');
var size = document.getElementById('size');
var reinforced = document.getElementById('reinforced');
var colour = document.getElementById('colour');
var swl = document.getElementById('swl');
var sf = document.getElementById('sf');

var liftBeltType = document.getElementById('liftBeltType');
var sewingThreadType = document.getElementById('sewingThreadType');
var topS1 = document.getElementById('topS1');
var topS2 = document.getElementById('topS2');
var topS3 = document.getElementById('topS3');
var topS4 = document.getElementById('topS4');
var topS5 = document.getElementById('topS5');
var topE1 = document.getElementById('topE1');
var topE2 = document.getElementById('topE2');
var topE3 = document.getElementById('topE3');
var topE4 = document.getElementById('topE4');
var topE5 = document.getElementById('topE5');
var bottomS1 = document.getElementById('bottomS1');
var bottomS2 = document.getElementById('bottomS2');
var bottomS3 = document.getElementById('bottomS3');
var bottomS4 = document.getElementById('bottomS4');
var bottomS5 = document.getElementById('bottomS5');
var bottomE1 = document.getElementById('bottomE1');
var bottomE2 = document.getElementById('bottomE2');
var bottomE3 = document.getElementById('bottomE3');
var bottomE4 = document.getElementById('bottomE4');
var bottomE5 = document.getElementById('bottomE5');

var inputIds1 = ['panjang1', 'lebar1', 'waft1', 'denierWaft1', 'weft1', 'denierWeft1'];
var inputs1 = inputIds1.map(id => document.getElementById(id));
var weight1 = document.getElementById('weight1');

var inputIds2 = ['panjang2', 'lebar2', 'waft2', 'denierWaft2', 'weft2', 'denierWeft2'];
var inputs2 = inputIds2.map(id => document.getElementById(id));
var weight2 = document.getElementById('weight2');


var fixRefNo = '';

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly])'));
const inputAll = Array.from(document.querySelectorAll('.card-body input[type="text"]'));

const notReq = [
    'topS1',
    'topS2',
    'topS3',
    'topS4',
    'topS5',
    'topE1',
    'topE2',
    'topE3',
    'topE4',
    'topE5',
    'bottomS1',
    'bottomS2',
    'bottomS3',
    'bottomS4',
    'bottomS5',
    'bottomE1',
    'bottomE2',
    'bottomE3',
    'bottomE4',
    'bottomE5'
];

inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            console.log(masuk.id);
            if (masuk.value.trim() === '') {
                event.preventDefault();

                if (masuk.id === 'po-no') {
                    masuk.value = 'UNKNOWN';
                } else {
                    if (notReq.includes(masuk.id)) {
                        if (index < inputs.length - 1) {
                            inputs[index + 1].focus();
                        }
                    }
                }

            } else if (masuk.id === 'denierWeft1') {
                liftBeltType.focus();

            } else if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });
});


// get year
function getYearFromInput() {
    var inputDate = new Date(tanggal.value);

    if (isNaN(inputDate.getTime())) {
        console.error('Format tanggal tidak valid');
        return;
    }

    year.value = inputDate.getFullYear();
}

// ref no
btn_RefNo.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Reference',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Ref No</th>
                            <th scope="col">Tanggal</th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "FrmInputFIBC/GetReff",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Reference_No" },
                            { data: "Tanggal" }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                selectRefNo(result.value.Reference_No, result.value.Tanggal);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectRefNo(Reference_No, Tanggal) {
    reffNo.value = Reference_No;
    refNo.value = Tanggal;
    Swal.close();
}

// bag code
btn_BagCode.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bag Code',
            html: `
                <table id="table_bagCode" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Ref No</th>
                            <th scope="col">Bag Code</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_bagCode")
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
                $(document).ready(function () {
                    const table = $("#table_bagCode").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "FrmInputFIBC/GetBagCode",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Reference_No" },
                            { data: "Bag_Code" }
                        ]
                    });

                    $("#table_bagCode tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                selectBageCode(result.value.Bag_Code);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectBageCode(Bag_Code) {
    document.getElementById("bag-code").value = Bag_Code;
    Swal.close();
}

let isWeight1Selected = true; // Default is Weight 1 selected

// weight radio button
function setupWeightRadio() {
    document.querySelectorAll('input[name="weight"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            if (radio.checked) {
                if (radio.value === 'radioWeight2') {
                    document.getElementById('formWeight1').style.display = 'none';
                    document.getElementById('formWeight2').style.display = 'block';
                    weightLabel.textContent = "Weight 2";
                    isWeight1Selected = false;
                } else {
                    document.getElementById('formWeight1').style.display = 'block';
                    document.getElementById('formWeight2').style.display = 'none';
                    weightLabel.textContent = "Weight 1";
                    isWeight1Selected = true;
                }
            }
            // console.log(isWeight1Selected);
        });
    });

    weightLabel.textContent = "Weight 1";
    return isWeight1Selected;
}

isWeight1Selected = setupWeightRadio();


// cek checkbox
// function checkCheckboxChecked(elementId) {
//     var element = document.getElementById(elementId);

//     if (!element) {
//         console.error('Element with ID ' + elementId + ' not found.');
//         return false;
//     }

//     var checkboxes = element.querySelectorAll('input[type="checkbox"]');

//     for (var i = 0; i < checkboxes.length; i++) {
//         if (checkboxes[i].checked) {
//             return true;
//         }
//     }
//     return false;
// }
// let jenis = checkCheckboxChecked('jenis');
// let sewingChecked = checkCheckboxChecked('sewingMethod');
// let stitchChecked = checkCheckboxChecked('stitchApprox');
// let fitChecked = checkCheckboxChecked('fitDraw');


function setupWeightCheckbox() {
    var checkedNames = [];

    document.querySelectorAll('input[name="weight"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function(event) {
            var checkboxName = event.target.name;
            var isChecked = event.target.checked;

            if (isChecked) {
                checkedNames.push(checkboxName);
            } else {
                var index = checkedNames.indexOf(checkboxName);
                if (index !== -1) {
                    checkedNames.splice(index, 1);
                }
            }

            console.log('Checked checkboxes:', checkedNames);
        });
    });
}

// Call setupWeightCheckbox to initialize event listeners
setupWeightCheckbox();


// Contoh penggunaan:
let checkedJenis = checkCheckboxChecked('jenis');
console.log('Info checkbox jenis:', checkedJenis);
let sewingChecked = checkCheckboxChecked('sewingMethod');
console.log('Info checkbox sewing:', sewingChecked);
let stitchChecked = checkCheckboxChecked('stitchApprox');
console.log('Info checkbox stitch:', stitchChecked);
let fitChecked = checkCheckboxChecked('fitDraw');
console.log('Info checkbox fit:', fitChecked);




// cek form yang kosong
function allInputsFilled() {
    for (const input of inputAll) {
        if (input.value.trim() === '') {
            // membiarkan input weight tidak terpilih exclude dari inputAll
            if (isWeight1Selected) {
                selectWeight = !inputIds2.includes(input.id);
            } else {
                selectWeight = !inputIds1.includes(input.id);
            }
            // skip input pada div id
            if (input.closest('#jenis, #sewingMethod, #stitchApprox, #fitDraw')) {
                continue
            } else {
                if (!notReq.includes(input.id) && input.id !== 'refNo' && selectWeight) {
                    const label = input.previousElementSibling.innerText.trim();
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Inputkan ${label} Terlebih Dahulu!`,
                        returnFocus: false
                    }).then(() => {
                        input.focus();
                    });
                    return false;
                } else if (input.id == 'refNo') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Lengkapi Data No Reference Terlebih Dahulu!`,
                        returnFocus: false
                    }).then(() => {
                        input.focus();
                    });
                    return false;
                }
            }
        }
    }
    return true;
}

// hitung weight
function calculateWeight() {
    var input1Values = inputs1.map(input1 => parseFloat(input1.value));
    var input2Values = inputs2.map(input2 => parseFloat(input2.value));

    if (isWeight1Selected) {
        if (input1Values.every(value => !isNaN(value))) {
            var weight = input1Values[0] * input1Values[1] * ((input1Values[2] * input1Values[3]) + (input1Values[4] * input1Values[5])) / 1143000 / 2;
            weight = Math.round(weight * 10) / 10;

            weight1.value = weight;
            input2Values.every(value => value == '')
        } else {
            weight1.value = '';
        }
    } else {

        if (input2Values.every(value => !isNaN(value))) {
            var weight = input2Values[0] * input2Values[1] * ((input2Values[2] * input2Values[3]) + (input2Values[4] * input2Values[5])) / 1143000 / 2;
            weight = Math.round(weight * 10) / 10;

            weight2.value = weight;
            input1Values.every(value => value == '')
        } else {
            weight2.value = '';
        }
    }
}



// panggil function hitung weight
inputs1.forEach(input => input.addEventListener('input', calculateWeight));
inputs2.forEach(input => input.addEventListener('input', calculateWeight));



// button simpan
btn_simpan.addEventListener("click", function (e) {
    try {
        e.preventDefault();

        console.log(tanggal.valueAsDate, currentDate);
        let jenis = checkCheckboxChecked('jenis');
        let sewingChecked = checkCheckboxChecked('sewingMethod');
        let stitchChecked = checkCheckboxChecked('stitchApprox');
        let fitChecked = checkCheckboxChecked('fitDraw');

        fixRefNo = refNo.value + "/KRR-QC/" + reffNo.value + "/" + year.value;



        if (tanggal.value == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Tanggal tidak boleh kosong`,
                returnFocus: false
            }).then(() => {
                tanggal.focus()
            });
            // } else if (tanggal.valueAsDate > currentDate) {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: `Tanggal Lebih Besar Dari Tanggal Sekarang`,
            //         returnFocus: false
            //     }).then(() => {
            //         tanggal.focus()
            //     });
        } else if (!allInputsFilled()) {
            return;
            // } else if (!jenis) {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: `Pilih Jenis FIBC Terlebih Dahulu !`,
            //         returnFocus: false
            //     }).then(() => {
            //         document.getElementById("sample").focus()
            //     });

            //     return;
        } else if (!sewingChecked) {
            Swal.fire({
                icon: 'question',
                text: 'Apakah Data Sewing Method Mau Anda Lengkapi?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            }).then((result) => {
                if (result.isConfirmed) {
                    return;
                } else {
                    if (!stitchChecked) {
                        Swal.fire({
                            icon: 'question',
                            text: 'Apakah Data Stitch Approx Mau Anda Lengkapi?',
                            showCancelButton: true,
                            confirmButtonText: 'Ya',
                            cancelButtonText: 'Tidak'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                return;
                            } else {
                                if (!fitChecked) {
                                    Swal.fire({
                                        icon: 'question',
                                        text: 'Apakah Data Fit to Drawing Spec. Mau Anda Lengkapi?',
                                        showCancelButton: true,
                                        confirmButtonText: 'Ya',
                                        cancelButtonText: 'Tidak'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            return;
                                        } else {
                                            $.ajax({
                                                type: 'POST',
                                                url: 'FrmInputFIBC',
                                                data: {
                                                    _token: csrfToken,
                                                    // controller: isi

                                                    tanggal: tanggal,
                                                    fixRefNo: fixRefNo,
                                                    customer: customer.value,
                                                    bagCode: bagCode.value,
                                                    bagType: bagType.value,
                                                    poNo: poNo.value,
                                                    prodDate: prodDate.value,
                                                    testingDate: testingDate.value,
                                                    size: size.value,
                                                    reinforced: reinforced.value,
                                                    colour: colour.value,
                                                    panjang1: inputs1[0].value,
                                                    lebar1: inputs1[1].value,
                                                    waft1: inputs1[2].value,
                                                    denierWaft1: inputs1[3].value,
                                                    weft1: inputs1[4].value,
                                                    denierWeft1: inputs1[5].value,
                                                    weight1: weight1.value,
                                                    swl: swl.value,
                                                    sf: sf.value,
                                                    jenis: jenis.value, // jenisnya apa? blm di passing
                                                    liftBeltType: liftBeltType.value,
                                                    sewingThreadType: sewingThreadType.value,
                                                    // sewing method, stitch spprox, fit to draw apa? blm di passing
                                                    //user input
                                                    currentDate: currentDate,
                                                    panjang2: inputs2[0].value,
                                                    lebar2: inputs2[1].value,
                                                    waft2: inputs2[2].value,
                                                    denierWaft2: inputs2[3].value,
                                                    weft2: inputs2[4].value,
                                                    denierWeft2: inputs2[5].value,
                                                    weight2: weight2,
                                                    //copyref no

                                                    topS1: topS1.value,
                                                    topS2: topS2.value,
                                                    topS3: topS3.value,
                                                    topS4: topS4.value,
                                                    topS5: topS5.value,
                                                    topE1: topE1.value,
                                                    topE2: topE2.value,
                                                    topE3: topE3.value,
                                                    topE4: topE4.value,
                                                    topE5: topE5.value,
                                                    bottomS1: bottomS1.value,
                                                    bottomS2: bottomS2.value,
                                                    bottomS3: bottomS3.value,
                                                    bottomS4: bottomS4.value,
                                                    bottomS5: bottomS5.value,
                                                    bottomE1: bottomE1.value,
                                                    bottomE2: bottomE2.value,
                                                    bottomE3: bottomE3.value,
                                                    bottomE4: bottomE4.value,
                                                    bottomE5: bottomE5.value
                                                },
                                                timeout: 30000,
                                                success: function (response) {
                                                    if (response.success) {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Success',
                                                            text: 'Data Telah Tersimpan',
                                                        });

                                                        inputAll.forEach(input => { input.value = ''; });
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
                                    })
                                }
                            }
                        })
                    }
                }
            })
        } else {
            // checkAllGroups();

            let sewingChecked = checkCheckboxChecked('sewingMethod');
            let stitchChecked = checkCheckboxChecked('stitchApprox');
            let fitChecked = checkCheckboxChecked('fitDraw');
            let stringJenis = []

            if (!sewingChecked) {
                let result = Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Pilih Jenis FIBC Terlebih Dahulu !`,
                    returnFocus: false
                }).then(() => {
                    document.getElementById("sample").focus()
                });
                if (!stitchChecked) {
                    if (!fitChecked) {

                    }
                }
            }

            showDataCompletionPrompt(stringJenis);
            $.ajax({
                type: 'POST',
                url: 'FrmInputFIBC',
                data: {
                    _token: csrfToken,
                    tanggal: tanggal,
                    refNo: refNo,
                    reffNo: reffNo,


                },
                timeout: 30000,
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data Telah Tersimpan',
                        });

                        inputAll.forEach(input => { input.value = ''; });
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
    } catch (error) {
        console.error('Exception:', error);
    }
});


