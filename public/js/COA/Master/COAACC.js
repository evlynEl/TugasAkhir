var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// button
var btn_cust = document.getElementById('btn_cust');
var btn_type = document.getElementById('btn_type');
var btn_noCOA = document.getElementById('btn_noCOA');
var btn_acc = document.getElementById('btn_acc');

var customer_id = document.getElementById('customer-id');
var kodeBarang = document.getElementById('type-id');
var NoCOA = document.getElementById('NoCOA');

var nomorCoaHead = document.getElementById('nomorCoaHead');

var dateData = document.getElementById('dateData');
var customerData = document.getElementById('customerData');
var poNoData = document.getElementById('poNoData');
var spNoData = document.getElementById('spNoData');
var commodityData = document.getElementById('commodityData');
var typeData = document.getElementById('typeData');
var capacityData = document.getElementById('capacityData');
var dimensionData = document.getElementById('dimensionData');


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
                selectCust(result.value.IdCust, result.value.NamaCust);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectCust(idcust, nama) {
    document.getElementById("customer-id").value = idcust;
    document.getElementById("nama-cust").value = nama;
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
                                _token: csrfToken,
                                idCust: customer_id.value,
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
                selectType(result.value.KodeBarang, result.value.NAMA_BRG);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectType(kode, nama) {
    document.getElementById("type-id").value = kode;
    document.getElementById("nama-type").value = nama;
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
                                _token: csrfToken,
                                idCust: customer_id.value,
                                kodeBarang: kodeBarang.value,
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
                selectNoAcc(result.value.Id);
                nomorCoaHead.innerHTML = '<strong>No: ' + result.value.Id + '</strong>';

                $.ajax({
                    url: "FrmACCResult/getDetail",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        noCoa: NoCOA.value
                    },
                    timeout: 30000,
                    success: function (result) {
                        console.log(result);

                        dateData.textContent = result[0].Tanggal;
                        customerData.textContent = result[0].NamaCust;
                        poNoData.textContent = result[0].NoPO;
                        spNoData.textContent = result[0].NoSP;
                        commodityData.textContent = result[0].Commodity;
                        typeData.textContent = result[0].NAMA_BRG;
                        capacityData.textContent = result[0].Capacity;
                        dimensionData.textContent = result[0].Dimension;

                        function generateTable() {
                            const tableContainer = document.getElementById('tableContainer');

                            if (tableContainer.querySelector('table')) {
                                console.log('Table has already been generated.');
                                return; 
                            }

                            const data = result;
                            const table = document.createElement('table');
                            table.className = 'table table-bordered';

                            const thead = document.createElement('thead');
                            const headerRow = document.createElement('tr');
                            const headers = ['Part Section', 'Material', 'Item', 'Standard', 'Result'];

                            headers.forEach(headerText => {
                                const th = document.createElement('th');
                                th.textContent = headerText;
                                headerRow.appendChild(th);
                            });

                            thead.appendChild(headerRow);
                            table.appendChild(thead);

                            const tbody = document.createElement('tbody');

                            const uniquePartSections = [...new Set(data.map(item => item.PartSection))];

                            uniquePartSections.forEach(partSection => {
                                const row = document.createElement('tr');

                                const partSectionCell = document.createElement('td');
                                partSectionCell.textContent = partSection;
                                row.appendChild(partSectionCell);

                                for (let i = 0; i < 4; i++) {
                                    const emptyCell = document.createElement('td');
                                    row.appendChild(emptyCell);
                                }

                                tbody.appendChild(row);
                            });

                            table.appendChild(tbody);
                            tableContainer.appendChild(table);
                        }

                        generateTable();

                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectNoAcc(noCOA) {
    document.getElementById("NoCOA").value = noCOA;
    Swal.close();
}

