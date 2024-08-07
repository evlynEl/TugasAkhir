var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var customerId = document.getElementById('customerId');
var customerName = document.getElementById('customerName');
var buttonCustomer = document.getElementById('buttonCustomer');

var typeId = document.getElementById('typeId');
var typeName = document.getElementById('typeName');
var buttonType = document.getElementById('buttonType');

var capacity = document.getElementById('capacity');
var idMaster = document.getElementById('idMaster');
var dimension = document.getElementById('dimension');
var commodity = document.getElementById('commodity');
var tanggal = document.getElementById('tanggal');
var no_coa = document.getElementById('no_coa');
var no_po = document.getElementById('no_po');
var no_sp = document.getElementById('no_sp');

var today = new Date().toISOString().split('T')[0];
tanggal.value = today;

var partSection = document.getElementById('part_section');
var buttonPartSection = document.getElementById('buttonPartSection');

var material = document.getElementById('material');
var buttonMaterial = document.getElementById('buttonMaterial');

var item = document.getElementById('item');
var buttonItem = document.getElementById('buttonItem');

var testResult = document.getElementById('test_result');
var buttonTambah = document.getElementById('buttonTambah');

function decodeHtmlEntities(str) {
    let textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
}

document.addEventListener('DOMContentLoaded', function () {
    if (buttonCustomer) {
        buttonCustomer.focus();
    }
});

$('#tanggal').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        no_coa.focus();
    }
});

$('#no_coa').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        no_po.focus();
    }
});

$('#no_po').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        no_sp.focus();
    }
});

$('#no_sp').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        buttonPartSection.focus();
    }
});

$('#test_result').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        buttonTambah.focus();
    }
});

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

buttonCustomer.addEventListener("click", function (e) {
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
            returnFocus: false,
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "FrmResult/GetCustomer",
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
                customerId.value = decodeHtmlEntities(result.value.IdCust);
                customerName.value = decodeHtmlEntities(result.value.NamaCust);
            }
            buttonType.focus();
        });
    } catch (error) {
        console.error(error);
    }
});

buttonType.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Type',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Type</th>
                            <th scope="col">Nama Type</th>
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
            returnFocus: false,
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "FrmResult/GetType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idCust: customerId.value
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
                typeId.value = result.value.KodeBarang;
                typeName.value = result.value.NAMA_BRG;

                $.ajax({
                    url: "FrmResult/getTypeDetail",
                    type: "GET",
                    data: {
                        IdCust: customerId.value,
                        IdType: typeId.value
                    },
                    success: function (result) {
                        capacity.value = decodeHtmlEntities(result[0].Capacity.trim());
                        commodity.value = decodeHtmlEntities(result[0].Commodity.trim());
                        dimension.value = decodeHtmlEntities(result[0].Dimension.trim());
                        idMaster.value = decodeHtmlEntities(result[0].Id.trim());
                        tanggal.focus();
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

buttonPartSection.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Part Section',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Part Section</th>
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
            returnFocus: false,
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "FrmResult/GetPartSection",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idMaster: idMaster.value
                            }
                        },
                        columns: [
                            { data: "PartSection" },
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
                partSection.value = decodeHtmlEntities(result.value.PartSection);
            }
            buttonMaterial.focus();
        });
    } catch (error) {
        console.error(error);
    }
});


buttonMaterial.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Material',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Material</th>
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
            returnFocus: false,
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "FrmResult/GetMaterial",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idMaster: idMaster.value,
                                partSection: partSection.value
                            }
                        },
                        columns: [
                            { data: "Material" },
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
                material.value = decodeHtmlEntities(result.value.Material);
            }
            buttonItem.focus();
        });
    } catch (error) {
        console.error(error);
    }
});


buttonItem.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Item',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Id</th>
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
            returnFocus: false,
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "FrmResult/GetItem",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idMaster: idMaster.value,
                                partSection: partSection.value,
                                material: material.value
                            }
                        },
                        columns: [
                            { data: "Item" },
                            { data: "Id" },
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
                item.value = decodeHtmlEntities(result.value.Item);
            }
            testResult.focus();
        });
    } catch (error) {
        console.error(error);
    }
});
