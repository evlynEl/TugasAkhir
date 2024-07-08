var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// var currentDate = new Date();
// var inputDate = new Date(tanggal);

var tanggal = document.getElementById('tanggal');
var currentDate = new Date();

// button
var btn_RefNo = document.getElementById('btn_RefNo');
var btn_BagCode = document.getElementById('btn_BagCode');

var btn_simpan = document.getElementById('btn_simpan');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');


//weight form
var weight1 = document.getElementById('weight1');
var weight2 = document.getElementById('weight2');
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

var liftBagType = document.getElementById('liftBagType').value;
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
var length = document.getElementById('length1').value;
var waft1 = document.getElementById('waft1').value;
var denierWaft1 = document.getElementById('denier-waft1').value;
var width1 = document.getElementById('width1').value;
var weft1 = document.getElementById('weft1').value;
var denierWeft1 = document.getElementById('denier-weft1').value;

var modeIsi = false;

// get year
function getYearFromInput() {
    var inputDate = new Date(tanggal.value);

    if (isNaN(inputDate.getTime())) {
        console.error('Format tanggal tidak valid');
        return;
    }
    var year = inputDate.getFullYear();
    document.getElementById('year').value = year;
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
document.querySelectorAll('input[name="weight"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        if (weight2.checked) {
            document.getElementById('formWeight2').style.display = 'block';
            document.getElementById('formWeight1').style.display = 'none';
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

function checkAllGroups() {
    var sewingChecked = checkCheckboxChecked('sewingMethod');
    var stitchChecked = checkCheckboxChecked('stitchApprox');
    var fitChecked = checkCheckboxChecked('fitDraw');

    if (!sewingChecked && !stitchChecked && !fitChecked) {
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
                                console.log('User canceled.');
                            }
                        });
                    }
                });
            }
        });

    } else if (!sewingChecked && !stitchChecked) {
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
                        console.log('User canceled.');
                    }
                });
            }
        });

    } else if (!sewingChecked && !fitChecked) {
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
                        console.log('User canceled.');
                    }
                });
            }
        });



    } else if (!stitchChecked && !fitChecked) {
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
                        console.log('User canceled.');
                    }
                });
            }
        });

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
                console.log('User canceled.');
            }
        });

    } else if (!stitchChecked) {
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
                console.log('User canceled.');
            }
        });
    } else if (!fitChecked) {
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
                console.log('User canceled.');
            }
        });
    }
}



// cek form != null
function noNullDetail() {
    var inputs = [
        { name: 'Customer', element: customer },
        { name: 'Bag Code', element: bagCode },
        { name: 'Bag Type', element: bagType },
        { name: 'PO No', element: poNo },
        { name: 'Prod. Date', element: prodDate },
        { name: 'Testing Date', element: testingDate },
        { name: 'Size', element: size },
        { name: 'Reinforced', element: reinforced },
        { name: 'Colour', element: colour },
        { name: 'SWL', element: swl },
        { name: 'S.F.', element: sf },

    ];

    for (var i = 0; i < inputs.length; i++) {
        // Check for empty inputs
        if (inputs[i].element.value.trim() === '') {
            // Skip PO No for alert and handle it separately
            if (inputs[i].name !== 'PO No') {
                alert('Inputkan ' + inputs[i].name + ' Terlebih Dahulu !');
                return false;
            } else {
                // Handle specific case for PO No
                if (inputs[i].element.value.trim() === '') {
                    inputs[i].element.value = 'UNKNOWN';
                }
            }
        }
    }
    return true;
}


document.addEventListener('DOMContentLoaded', function () {
    const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly])'));

    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });
    });
});


// simpan
btn_simpan.addEventListener("click", function (e) {
    try {
        e.preventDefault();
        console.log(tanggal.valueAsDate, currentDate);

        if (tanggal.value == '') {
            alert("Tanggal tidak boleh kosong");
        } else if (tanggal.valueAsDate > currentDate) {
            alert("Tanggal Lebih Besar Dari Tanggal Sekarang");
        } else if (reffNo.value == '') {
            alert("Inputkan No Reference Terlebih Dahulu !");
        } else if (refNo.value == '') {
            alert("Lengkapi Data No Reference Terlebih Dahulu !");
        } else if (!noNullDetail()) {
            alert("Data Belum Lengkap Terisi");
        } else {
            checkAllGroups();
            // if noNullDetail true jalankan code ini
            $.ajax({
                type: 'POST',
                url: 'FrmInputFIBC',
                data: {
                    _token: csrfToken,
                    tanggal: tanggal,
                    refNo: refNo,
                    reffNo: reffNo

                },
                timeout: 30000,
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });

                        // Reset nilai input part setelah berhasil disimpan
                        document.getElementById("part").value = '';
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


