var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// button
var btn_cust = document.getElementById('btn_cust');
var btn_type = document.getElementById('btn_type');
var btn_noCOA = document.getElementById('btn_noCOA');
var btn_acc = document.getElementById('btn_acc');

var customer_id = document.getElementById('customer-id');
var kodeBarang = document.getElementById('type-id');
var namaType = document.getElementById('nama-type');
var namaCust = document.getElementById('nama-cust');
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

document.addEventListener('DOMContentLoaded', function () {
    if (btn_cust) {
        btn_cust.focus();
    }
});


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
            width: '40%',
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            returnFocus: false,
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

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                selectCust(result.value.IdCust, result.value.NamaCust);
            }

            btn_type.focus();
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
            width: '40%',
            showCloseButton: true,
            showConfirmButton: true,
            returnFocus: false,
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

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                selectType(result.value.KodeBarang, result.value.NAMA_BRG);

                btn_noCOA.focus();
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
            width: '40%',
            showCloseButton: true,
            showConfirmButton: true,
            returnFocus: false,
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

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
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
                                if (headerText === 'Item') {
                                    th.classList.add('item-column'); // Apply CSS class for width
                                }
                                headerRow.appendChild(th);
                            });

                            thead.appendChild(headerRow);
                            table.appendChild(thead);

                            const tbody = document.createElement('tbody');

                            // Map to hold unique entries based on PartSection and Material
                            const uniqueEntries = new Map();

                            data.forEach(item => {
                                const key = `${item.PartSection}-${item.Material}`;

                                if (!uniqueEntries.has(key)) {
                                    uniqueEntries.set(key, {
                                        PartSection: item.PartSection,
                                        Material: item.Material,
                                        Items: [],
                                        Standards: [],
                                        Results: []
                                    });
                                }

                                const entry = uniqueEntries.get(key);
                                entry.Items.push(item.Item);
                                entry.Standards.push(item.Standard);
                                entry.Results.push(item.Result);
                            });

                            uniqueEntries.forEach(entry => {
                                const row = document.createElement('tr');

                                const partSectionCell = document.createElement('td');
                                partSectionCell.textContent = entry.PartSection;
                                row.appendChild(partSectionCell);

                                const materialCell = document.createElement('td');
                                materialCell.textContent = entry.Material;
                                row.appendChild(materialCell);

                                // Print all items with line breaks
                                const itemCell = document.createElement('td');
                                itemCell.innerHTML = entry.Items.join('<br>'); // Use <br> for line breaks
                                itemCell.classList.add('item-column'); // Apply CSS class for width
                                row.appendChild(itemCell);

                                // Print all standards with line breaks
                                const standardCell = document.createElement('td');
                                standardCell.innerHTML = entry.Standards.join('<br>'); // Use <br> for line breaks
                                row.appendChild(standardCell);

                                // Print all results with line breaks
                                const resultCell = document.createElement('td');
                                resultCell.innerHTML = entry.Results.join('<br>'); // Use <br> for line breaks
                                row.appendChild(resultCell);

                                tbody.appendChild(row);
                            });

                            table.appendChild(tbody);
                            tableContainer.appendChild(table);
                        }

                        generateTable();

                        $('.preview').show();

                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});


btn_acc.addEventListener("click", function (e) {
    Swal.fire({
        title: 'Konfirmasi',
        text: "Apakah Anda Yakin Untuk ACC Laporan COA Ini ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "FrmACCResult/accCoa",
                type: "GET",
                data: {
                    _token: csrfToken,
                    noCoa: NoCOA.value
                },
                timeout: 30000,
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });
                    }
                    $('.preview').hide();
                    NoCOA.value = '';
                    customer_id.value = '';
                    kodeBarang.value = '';
                    namaType.value = '';
                    namaCust.value = '';
                }
            });
        }
    });
});

btn_acc.addEventListener("click", function (e) {
    Swal.fire({
        title: 'Konfirmasi',
        text: "Apakah Anda Yakin Untuk ACC Laporan COA Ini ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "FrmACCResult/accCoa",
                type: "GET",
                data: {
                    _token: csrfToken,
                    noCoa: NoCOA.value
                },
                timeout: 30000,
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });
                    }
                    $('.preview').hide();
                    NoCOA.value = '';
                    customer_id.value = '';
                    kodeBarang.value = '';
                    namaType.value = '';
                    namaCust.value = '';
                }
            });
        }
    });
});

function selectNoAcc(noCOA) {
    document.getElementById("NoCOA").value = noCOA;
    Swal.close();
}

