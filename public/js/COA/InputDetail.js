var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var currentDate = new Date();
var inputDate = new Date(tanggal);

// button
var btn_RefNo = document.getElementById('btn_RefNo');
var btn_BagCode = document.getElementById('btn_BagCode');

var btn_simpan = document.getElementById('btn_simpan');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');


//weight form
var weight1 = document.getElementById('weight1');
var weight2 = document.getElementById('weight2');

// attribut
var tanggal = document.getElementById('tanggal').value;
var year = document.getElementById('year').value;
var reffNo = document.getElementById('reffNo').value;
var refNo = document.getElementById('refNo').value;
var customer = document.getElementById('customer').value;
var bagCode = document.getElementById('bag-code').value;
var bagType = document.getElementById('bag-type').value;
var poNo = document.getElementById('po-no').value;
var prodDate = document.getElementById('prod-date').value;
var testingDate = document.getElementById('testing-date').value;
var size = document.getElementById('size').value;
var reinforced = document.getElementById('reinforced').value;
var colour = document.getElementById('colour').value;
var swl = document.getElementById('swl').value;
var sf = document.getElementById('sf').value;

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
var length = document.getElementById('length').value;
var waft1 = document.getElementById('waft1').value;
var denierWaft1 = document.getElementById('denier-waft1').value;
var weight1 = document.getElementById('weight1').value;
var width = document.getElementById('width').value;
var weft = document.getElementById('weft').value;
var denierWeft = document.getElementById('denier-weft').value;



function getYearFromInput() {
    var tanggal = document.getElementById('tanggal').value;
    var inputDate = new Date(tanggal);

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
    document.getElementById("reffNo").value = Reference_No;
    document.getElementById("refNo").value = Tanggal;
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

weight1.addEventListener('change', function () {
    if (weight1.checked) {
        document.getElementById('weight-label').textContent = "Weight 1";
    }
});

weight2.addEventListener('change', function () {
    if (weight2.checked) {
        document.getElementById('weight-label').textContent = "Weight 2";
    }
});

// simpan

btn_simpan.addEventListener("click", function (e) {
    try {
        e.preventDefault();

        if (tanggal === '') {
            // console.error('Tanggal tidak boleh kosong');
            // return;
            Swal.fire({
                icon: 'warning',
                title: 'Data is not complete',
                text: 'Tanggal tidak boleh kosong',
            });
        } else if (inputDate > currentDate) {
            console.error('Tanggal Lebih Besar Dari Tanggal Sekarang');
            return;
        } else {
            $.ajax({
                type: 'POST',
                url: 'FrmInputFIBC',
                data: {
                    _token: csrfToken,
                    tanggal: tanggal

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


