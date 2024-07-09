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

var liftBeltType = document.getElementById('liftBeltType').value;
var sewingThreadType = document.getElementById('sewingThreadType').value;
var topS1 = document.getElementById('topS1').value;
var topS2 = document.getElementById('topS2').value;
var topS3 = document.getElementById('topS3').value;
var topS4 = document.getElementById('topS4').value;
var topS5 = document.getElementById('topS5').value;
var topE1 = document.getElementById('topE1').value;
var topE2 = document.getElementById('topE2').value;
var topE3 = document.getElementById('topE3').value;
var topE4 = document.getElementById('topE4').value;
var topE5 = document.getElementById('topE5').value;
var bottomS1 = document.getElementById('bottomS1').value;
var bottomS2 = document.getElementById('bottomS2').value;
var bottomS3 = document.getElementById('bottomS3').value;
var bottomS4 = document.getElementById('bottomS4').value;
var bottomS5 = document.getElementById('bottomS5').value;
var bottomE1 = document.getElementById('bottomE1').value;
var bottomE2 = document.getElementById('bottomE2').value;
var bottomE3 = document.getElementById('bottomE3').value;
var bottomE4 = document.getElementById('bottomE4').value;
var bottomE5 = document.getElementById('bottomE5').value;

var inputIds1 = ['panjang1', 'lebar1', 'waft1', 'danierWaft1', 'weft1', 'danierWeft1'];
var inputs1 = inputIds1.map(id => document.getElementById(id));

// var panjang1 = document.getElementById('panjang1');
// var waft1 = document.getElementById('waft1');
// var denierWaft1 = document.getElementById('denier-waft1');
// var lebar1 = document.getElementById('lebar1');
// var weft1 = document.getElementById('weft1');
// var denierWeft1 = document.getElementById('denier-weft1');
var weight1 = document.getElementById('weight1');

var inputIds2 = ['panjang2', 'lebar2', 'waft2', 'danierWaft2', 'weft2', 'danierWeft2'];
var inputs2 = inputIds2.map(id => document.getElementById(id));

// var panjang2 = document.getElementById('panjang2');
// var waft2 = document.getElementById('waft2');
// var denierWaft2 = document.getElementById('denier-waft2');
// var lebar2 = document.getElementById('lebar2');
// var weft2 = document.getElementById('weft2');
// var denierWeft2 = document.getElementById('denier-weft2');
var weight2 = document.getElementById('weight2');


var fixRefNo = '';

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly])'));
const inputAll = Array.from(document.querySelectorAll('.card-body input[type="text"]'));

inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            // console.log(masuk.id)
            if (masuk.value.trim() === '') {
                event.preventDefault();
                if (masuk.id == 'po-no') {
                    masuk.value = 'UNKNOWN';
                }
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

// label weight for radio button
document.querySelectorAll('input[name="weight"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (radioWeight2.checked) {
            document.getElementById('formWeight1').style.display = 'none';
            document.getElementById('formWeight2').style.display = 'block';
            weightLabel.textContent = "Weight 2";
        } else {
            document.getElementById('formWeight1').style.display = 'block';
            document.getElementById('formWeight2').style.display = 'none';
            weightLabel.textContent = "Weight 1";
        }
    });
});

// cek checkbox
function checkCheckboxChecked(elementId) {
    var element = document.getElementById(elementId);

    if (!element) {
        console.error('Element with ID ' + elementId + ' not found.');
        return false;
    }

    var checkboxes = element.querySelectorAll('input[type="checkbox"]');

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }
    return false;
}

// function showDataCompletionPrompt(stringJenis) {
//     var checkboxesToCheck = [];

//     if (!checkCheckboxChecked('sewingMethod')) {
//         checkboxesToCheck.push('sewingMethod');
//     } else if (!checkCheckboxChecked('stitchApprox')) {
//         checkboxesToCheck.push('stitchApprox');
//     } else if (!checkCheckboxChecked('fitDraw')) {
//         checkboxesToCheck.push('fitDraw');
//     }

//     if (checkboxesToCheck.length > 0) {
//         Swal.fire({
//             icon: 'question',
//             text: 'Apakah Data ' + stringJenis + ' Mau Anda Lengkapi?',
//             showCancelButton: true,
//             confirmButtonText: 'Ya',
//             cancelButtonText: 'Tidak'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 return;
//             } else {
//                 var nextCheckboxId = checkboxesToCheck.shift();
//                 if (nextCheckboxId) {
//                     document.getElementById(nextCheckboxId).scrollIntoView({
//                         behavior: 'smooth',
//                         block: 'start'
//                     });
//                 }
//                 console.log('Next checkbox.');
//             }
//         });
//     } else {
//         console.log('All checkboxes are already checked.');
//     }
//     return true;
// }

// var stringJenis = '';

// function checkAllGroups() {
//     var jenis = checkCheckboxChecked('jenis');
//     var sewingChecked = checkCheckboxChecked('sewingMethod');
//     var stitchChecked = checkCheckboxChecked('stitchApprox');
//     var fitChecked = checkCheckboxChecked('fitDraw');

//     if (!jenis) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: `Pilih Jenis FIBC Terlebih Dahulu !`
//         });
//     }

//     if (!sewingChecked) {
//         stringJenis += 'Sewing Method ';
//     }
//     if (!stitchChecked) {
//         stringJenis += 'Stitch Approx ';
//     }
//     if (!fitChecked) {
//         stringJenis += 'Fit to Drawing Spec.';
//     }
//     return stringJenis;
// }



// cek form yang kosong
function allInputsFilled() {
    for (const input of inputAll) {
        if (input.value.trim() === '') {
            console.log(input);
            const label = input.previousElementSibling.innerText.trim();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Inputkan ${label} Terlebih Dahulu!`
            }).then(() => {
                input.focus();
            });
            return false;
        }
    }
    return true;
}

// hitung weight
function calculateWeight() {
    var input1Values = inputs1.map(input1 => parseFloat(input1.value));
    var input2Values = inputs2.map(input2 => parseFloat(input2.value));

    if (weightLabel.textContent === 'Weight 1') {
        if (input1Values.every(value => !isNaN(value))) {
            var weight = input1Values[0] * input1Values[1] * ((input1Values[2] * input1Values[3]) + (input1Values[4] * input1Values[5])) / 1143000 / 2;
            weight = Math.round(weight * 10) / 10;

            weight1.value = weight;
        } else {
            weight1.value = '';
        }
    } else {
        if (input2Values.every(value => !isNaN(value))) {
            var weight = input2Values[0] * input2Values[1] * ((input2Values[2] * input2Values[3]) + (input2Values[4] * input2Values[5])) / 1143000 / 2;
            weight = Math.round(weight * 10) / 10;

            weight2.value = weight;
        } else {
            weight2.value = '';
        }
    }
}



inputs1.forEach(input => input.addEventListener('input', calculateWeight));
inputs2.forEach(input => input.addEventListener('input', calculateWeight));


function showDataCompletionPrompt(arrayJenis) {
    // Create a chain of promises for each SweetAlert prompt
    let chain = Promise.resolve();

    arrayJenis.forEach((jenis) => {
        // Append each Swal.fire call to the chain
        chain = chain.then(() => {
            return Swal.fire({
                title: `Data ${jenis}`,
                icon: 'info',
                confirmButtonText: 'OK'
            });
        });
    });

    // Return the final promise chain
    return chain;
}


// simpan
btn_simpan.addEventListener("click", function (e) {
    try {
        e.preventDefault();
        console.log(tanggal.valueAsDate, currentDate);
        let jenis = checkCheckboxChecked('jenis');

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
            //         text: `Tanggal Lebih Besar Dari Tanggal Sekarang`
            //     });
            // } else if (reffNo.value == '') {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: `Inputkan No Reference Terlebih Dahulu !`
            //     });
            // } else if (refNo.value == '') {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: `Lengkapi Data No Reference Terlebih Dahulu !`
            //     });
            // } else if (!allInputsFilled()) {
            //     return;
        } else if (!jenis) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Pilih Jenis FIBC Terlebih Dahulu !`,
                returnFocus: false
            }).then(() => {
                document.getElementById("sample").focus()
            });

            return;
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
                            text: response.success,
                        });

                        inputAll.forEach(input => { input.value = ''; });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('AJAX Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to save data. Please try again.',
                    });
                }
            });
        }
    } catch (error) {
        console.error('Exception:', error);
    }
});


fixRefNo = refNo.value + "/KRR-QC/" + reffNo.value + "/" + year.value
