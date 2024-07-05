var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// button
var btn_cust = document.getElementById('btn_cust');
var btn_type = document.getElementById('btn_type');
var btn_noCOA = document.getElementById('btn_noCOA');
var btn_acc = document.getElementById('btn_acc');


btn_cust.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Customer',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Customer</th>
                            <th scope="col">Nama Customer</th>
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
                            url: "FrmACCResult/GetCustomer",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdCust" },
                            { data: "NamaCust" }
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
                selectCust(result.value.idcust, result.value.nama);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectCust(idcust, nama) {
    document.getElementById("customer-id").value = IdCust;
    document.getElementById("nama-cust").value = NamaCust;
    Swal.close();
}

btn_type.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Type',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Kode Barang</th>
                            <th scope="col">Nama Barang</th>
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
                            url: "FrmACCResult/GetType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "KodeBarang" },
                            { data: "NAMA_BRG" }
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
                selectType(result.value.kode, result.value.nama);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectType(kode, nama) {
    document.getElementById("type-id").value = KodeBarang;
    document.getElementById("nama-type").value = NAMA_BRG;
    Swal.close();
}

btn_noCOA.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Master Material Section',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Material Section</th>
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
                            url: "FrmACCResult/GetACC",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id" },
                            { data: "Material" }
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
                selectNoAcc(result.value.noCOA);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectNoAcc(noCOA) {
    document.getElementById("type-id").value = NoCOA;
    Swal.close();
}

btn_acc.addEventListener("click", function (e) {
    try {
        var material = document.getElementById("material").value.trim();
        var id = document.getElementById("id").value.trim();

        if (id !== '' && material !== '') {
            var btnProses = document.getElementById("btn_proses");
            btnProses.disabled = true;
            btnProses.classList.add('btn-disabled');
        } else if (material === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Data is not complete',
                text: 'Please fill Material Section or choose Material Section.',
            });
        } else {
            $.ajax({
                type: 'POST',
                url: 'FrmMasterMaterial',
                data: {
                    _token: csrfToken,
                    material: material
                },
                timeout: 30000,
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });

                        document.getElementById("material").value = '';
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});
