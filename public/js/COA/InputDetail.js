var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var tanggal = document.getElementById('tanggal');
var currentDate = new Date();
var year = document.getElementById('year');

// button
var btn_RefNo = document.getElementById('btn_RefNo');
var btn_BagCode = document.getElementById('btn_BagCode');

var btn_isi = document.getElementById('btn_isi');
var btn_simpan = document.getElementById('btn_simpan');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

//weight form
var radioWeight1 = document.getElementById('radioWeight1');
var radioWeight1 = document.getElementById('radioWeight2');
var weightLabel = document.getElementById('weightLabel');

// attribut
var No = document.getElementById('No');
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
var jenis = [];
var sewing = [];
var stitch = [];
var draw = [];

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

fixRefNo = No.value + "/KRR-QC/" + refNo.value + "/" + year.value;

// button ref no
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
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRow = result.value;

                let splitRefNo = selectedRow.Reference_No.trim();

                let parts = splitRefNo.split("/");
                let extractedNo = parts[0];
                let extractedRefNo = parts[2];

                No.value = extractedNo;
                refNo.value = extractedRefNo;

                $.ajax({
                    url: "FrmInputFIBC/getDataDetailReference",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        no_ref: splitRefNo
                    },
                    success: function (result) {

                        console.log(splitRefNo);


                        customer.value = result[0].Customer.trim();
                        bagCode.value = result[0].Bag_Code.trim();
                        bagType.value = result[0].Bag_Type.trim();
                        poNo.value = result[0].PO_No.trim();
                        prodDate.value = result[0].Tanggal_Prod.trim();
                        testingDate.value = result[0].Tanggal_Testing.trim();
                        size.value = result[0].Size.trim();
                        reinforced.value = result[0].Reinforced.trim();
                        colour.value = result[0].Colour.trim();
                        swl.value = result[0].SWL.trim();
                        sf.value = result[0].sf.trim();
                        liftBeltType.value = result[0].LiftingBelt_Type.trim();
                        sewingThreadType.value = result[0].SewingThread_Type.trim();
                        topS1.value = result[0].Top_KG_1.trim();
                        topS2.value = result[0].Top_KG_2.trim();
                        topS3.value = result[0].Top_KG_3.trim();
                        topS4.value = result[0].Top_KG_4.trim();
                        topS5.value = result[0].Top_KG_5.trim();
                        topE1.value = result[0].Top_Persen_1.trim();
                        topE2.value = result[0].Top_Persen_2.trim();
                        topE3.value = result[0].Top_Persen_3.trim();
                        topE4.value = result[0].Top_Persen_4.trim();
                        topE5.value = result[0].Top_Persen_5.trim();
                        bottomS1.value = result[0].Bottom_KG_1.trim();
                        bottomS2.value = result[0].Bottom_KG_2.trim();
                        bottomS3.value = result[0].Bottom_KG_3.trim();
                        bottomS4.value = result[0].Bottom_KG_4.trim();
                        bottomS5.value = result[0].Bottom_KG_5.trim();
                        bottomE1.value = result[0].Bottom_Persen_1.trim();
                        bottomE2.value = result[0].Bottom_Persen_2.trim();
                        bottomE3.value = result[0].Bottom_Persen_3.trim();
                        bottomE4.value = result[0].Bottom_Persen_4.trim();
                        bottomE5.value = result[0].Bottom_Persen_5.trim();

                        inputs1[0].value = result[0].Panjang.trim();
                        inputs1[1].value = result[0].Lebar.trim();
                        inputs1[2].value = result[0].Waft.trim();
                        inputs1[3].value = result[0].Denier_Waft.trim();
                        inputs1[4].value = result[0].Weft.trim();
                        inputs1[5].value = result[0].Denier_Weft.trim();
                        weight1.value = result[0].Weight.trim();

                        inputs2[0].value = result[0].Panjang2.trim();
                        inputs2[1].value = result[0].Lebar2.trim();
                        inputs2[2].value = result[0].Waft2.trim();
                        inputs2[3].value = result[0].Denier_Waft2.trim();
                        inputs2[4].value = result[0].Weft2.trim();
                        inputs2[5].value = result[0].Denier_Weft2.trim();
                        weight2.value = result[0].Weight2.trim();
                    }
                });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});



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
var sections = [
    { id: 'jenis', checkboxes: ['sample', 'pre-production', 'production', 'spec-modification', 'trial', 'customer-sample'] },
    { id: 'sewingMethod', checkboxes: ['Mitsumaki', 'HalfMitsumaki', 'Ogami', 'Other'], },
    { id: 'stitchApprox', checkboxes: ['Bottom', 'Side', 'Lift'] },
    { id: 'fitDraw', checkboxes: ['Yesfit', 'Nofit'] }
];

// fungsi track aktifitas checkbox
function setupCheckboxListeners() {
    sections.forEach(function (section) {
        section.checkboxes.forEach(function (checkboxName) {
            var checkbox = document.querySelector(`#${section.id} input[name="${checkboxName}"]`);
            if (checkbox) {
                checkbox.addEventListener('change', function (event) {
                    handleCheckboxChange(section.id);
                });
            } else {
                console.error(`Checkbox ${checkboxName} not found in section ${section.id}`);
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
        case 'jenis':
            jenis = checkedName ? [checkedName] : [];
            break;
        case 'sewingMethod':
            sewing = checkedName ? [checkedName] : [];
            break;
        case 'stitchApprox':
            stitch = checkedName ? [checkedName] : [];
            break;
        case 'fitDraw':
            draw = checkedName ? [checkedName] : [];
            break;
        default:
            break;
    }
}

// panggil fungsi cek checkbox
setupCheckboxListeners();


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


document.addEventListener('DOMContentLoaded', function () {
    // Disable btn_RefNo and btn_BagCode by default
    btn_RefNo.disabled = true;
    btn_BagCode.disabled = true;

    btn_simpan.style.display = 'none';
    btn_batal.style.display = 'none';

    var Ketik = document.querySelectorAll('input');

    // Function to enable Ketik
    function enableKetik() {
        Ketik.forEach(function (input) {
            input.disabled = false;
        });

        btn_isi.style.display = 'none';
        btn_simpan.style.display = 'inline-block';

        btn_koreksi.style.display = 'none';
        btn_batal.style.display = 'inline-block';

        btn_RefNo.disabled = false;
        btn_BagCode.disabled = false;
    }

    // Function to disable Ketik
    function disableKetik() {
        Ketik.forEach(function (input) {
            input.value = ''; // Clear input values
            input.disabled = true;
        });

        btn_simpan.style.display = 'none';
        btn_isi.style.display = 'inline-block';

        btn_batal.style.display = 'none';
        btn_koreksi.style.display = 'inline-block';

        btn_RefNo.disabled = true;
        btn_BagCode.disabled = true;
    }

    // Button isi event listener
    btn_isi.addEventListener('click', function () {
        enableKetik();
        btn_RefNo.disabled = true;
        btn_BagCode.disabled = true;
    });

    // Button batal event listener
    btn_batal.addEventListener('click', function () {
        disableKetik();
    });

    // Initially disable Ketik on page load
    disableKetik();
});


// button simpan
btn_simpan.addEventListener('click', function () {
    try {
        e.preventDefault();

        console.log(tanggal.valueAsDate, currentDate);

        if (tanggal.value == '') {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: `Tanggal tidak boleh kosong`,
            //     returnFocus: false
            // }).then(() => {
            //     tanggal.focus()
            // });
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
        } else if (sewing.length == 0) {
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
                    if (stitch.length == 0) {
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
                                if (draw.length == 0) {
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
                                                    jenis: jenis.value,
                                                    liftBeltType: liftBeltType.value,
                                                    sewingThreadType: sewingThreadType.value,
                                                    sewing: sewing.values,
                                                    stitch: stitch.values,
                                                    draw: draw.values,
                                                    currentDate: currentDate,
                                                    panjang2: inputs2[0].value,
                                                    lebar2: inputs2[1].value,
                                                    waft2: inputs2[2].value,
                                                    denierWaft2: inputs2[3].value,
                                                    weft2: inputs2[4].value,
                                                    denierWeft2: inputs2[5].value,
                                                    weight2: weight2,
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
        }
    } catch (error) {
        console.error('Exception:', error);
    }
});


// button simpan
btn_koreksi.addEventListener("click", function (e) {

});


