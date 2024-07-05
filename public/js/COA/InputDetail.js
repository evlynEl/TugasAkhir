var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var btn_RefNo = document.getElementById('btn_RefNo');
var btn_BagCode = document.getElementById('btn_BagCode');



// get tahun
function getYearFromInput() {
    var inputTanggal = document.getElementById('tanggal').value;
    if (inputTanggal === '') {
        console.error('Tanggal tidak boleh kosong');
        return;
    }
    var date = new Date(inputTanggal);

    if (isNaN(date)) {
        console.error('Format tanggal tidak valid');
        return;
    }

    var year = date.getFullYear();
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
    document.getElementById("Tanggal").value = Tanggal;
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
                selectBageCode(result.value.Reference_No, result.value.Bag_Code);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectBageCode(Reference_No, Bag_Code) {
    document.getElementById("reffNo").value = Reference_No;
    document.getElementById("Tanggal").value = Bag_Code;
    Swal.close();
}
