var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


var customerId = document.getElementById('customer-id');
var customerName = document.getElementById('nama-cust');
var typeId = document.getElementById('type-id');
var typeName = document.getElementById('nama-type');
var capacity = document.getElementById('capacity');
var dimension = document.getElementById('dimension');
var comodity = document.getElementById('comodity');
var part = document.getElementById('part');
var material = document.getElementById('material');
var item = document.getElementById('item');
var standard = document.getElementById('standard');

// button
var btn_cust = document.getElementById('btn_cust');
var btn_type = document.getElementById('btn_type');
var btn_part = document.getElementById('btn_part');
var btn_material = document.getElementById('btn_material');
var btn_tambah = document.getElementById('btn_tambah');
var btn_hapus = document.getElementById('btn_hapus');
var btn_proses = document.getElementById('btn_proses');

let jenisBarangValue = '';
let jenisJualValue = '';
var barang;
let panjang;
let lebar;
let tinggi;
let berat;
let sf1;
let sf2;
let kode_barang;
let selectedRow = null;

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));

// fungsi berhubungan dengan ENTER & oengecekkan yg kosong2
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.value.trim() === '') {
                if (masuk.id === 'capacity') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Isi Capacity Terlebih Dahulu!`,
                        returnFocus: false
                    }).then(() => {
                        capacity.focus();
                    });
                } else if (masuk.id === 'dimension') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Isi Dimensi Terlebih Dahulu!`,
                        returnFocus: false
                    }).then(() => {
                        dimension.focus();
                    });
                } else if (masuk.id === 'comodity') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Isi Commodity Terlebih Dahulu!`,
                        returnFocus: false
                    }).then(() => {
                        comodity.focus();
                    });
                } else if (masuk.id === 'item') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Isi Item Terlebih Dahulu!`,
                        returnFocus: false
                    }).then(() => {
                        item.focus();
                    });
                }
            } else if (masuk.id === 'comodity') {
                btn_part.focus();
            } else if (masuk.id === 'standard') {
                btn_tambah.focus();
            } else {
                inputs[index + 1].focus();
                inputs[index + 1].select();
            }

        }
    });
});

btn_cust.focus();
// button customer
btn_cust.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Customer',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nama Customer</th>
                            <th scope="col">ID Customer</th>
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
            returnFocus: false,
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
                            url: "FrmMasterType/getCustomer",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NamaCust" },
                            { data: "IdCust" }
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
                customerId.value = result.value.IdCust.trim();
                customerName.value = result.value.NamaCust.trim();

                btn_type.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// fungsi unk pilih modal pake key arrow
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

// mencatat perubahan typename
typeName.addEventListener('change', function () {
    processTypeBrg(typeName.value);
});

// button type
btn_type.addEventListener('click', function () {
    let jenisBarang = document.querySelector('input[name="jenis-barang"]:checked');
    let jenisJual = document.querySelector('input[name="jenis-jual"]:checked');

    jenisBarangValue = jenisBarang ? jenisBarang.value : '';
    jenisJualValue = jenisJual ? jenisJual.value : '';

    // jenis barang
    if (jenisBarangValue === 'Block Bottom') {
        barang = jenisJualValue === 'Lokal' ? 2472 : jenisJualValue === 'Export Fasilitas' ? 3225 : jenisJualValue === 'Export Non Fasilitas' ? 3226 : '';
    } else if (jenisBarangValue === 'Jumbo Bag') {
        barang = jenisJualValue === 'Lokal' ? 1509 : jenisJualValue === 'Export Fasilitas' ? 3227 : jenisJualValue === 'Export Non Fasilitas' ? 3228 : '';
    } else if (jenisBarangValue === 'Woven Bag') {
        barang = jenisJualValue === 'Lokal' ? 1508 : jenisJualValue === 'Export Fasilitas' ? 3229 : jenisJualValue === 'Export Non Fasilitas' ? 3230 : '';
    } else if (jenisBarangValue === 'Cloth') {
        barang = jenisJualValue === 'Lokal' ? 1097 : jenisJualValue === 'Export Fasilitas' ? 3231 : jenisJualValue === 'Export Non Fasilitas' ? 3232 : '';
    }

    if (jenisBarangValue === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Pilih Jenis Barang Terlebih Dahulu!',
            returnFocus: false
        }).then(() => {
            document.getElementById('jenis-barang-block').focus();
        });
    } else if (jenisJualValue === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Pilih Jenis Jual Terlebih Dahulu!',
            returnFocus: false
        }).then(() => {
            document.getElementById('jenis-jual-lokal').focus();
        });
    } else {
        Swal.fire({
            title: 'Type',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nama Barang</th>
                            <th scope="col">Kode Barang</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
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
                            url: "FrmMasterType/getType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                barang: barang
                            }
                        },
                        columns: [
                            { data: "NAMA_BRG" },
                            { data: "KD_BRG" }
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
                typeId.value = result.value.KD_BRG.trim();
                typeName.value = result.value.NAMA_BRG.trim();

                processTypeBrg(typeName.value);

                if (barang === 1509) {
                    $.ajax({
                        url: "FrmMasterType/getJumboLokal",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kode_barang: kode_barang
                        },
                        timeout: 30000,
                        success: function (result) {
                            if (result.length > 0) {
                                let item = result[0];
                                let berat = item.SWL ? parseInt(item.SWL.trim(), 10) : 'N/A';
                                let panjang = item.Panjang_BB ? parseInt(item.Panjang_BB.trim(), 10) : 'N/A';
                                let lebar = item.Lebar_BB ? parseInt(item.Lebar_BB.trim(), 10) : 'N/A';
                                let tinggi = item.Tinggi_BB ? parseInt(item.Tinggi_BB.trim(), 10) : 'N/A';
                                let sf1 = item.SF1 ? parseInt(item.SF1.trim(), 10) : 'N/A';
                                let sf2 = item.SF2 ? parseInt(item.SF2.trim(), 10) : 'N/A';

                                capacity.value = berat + ' Kg';
                                comodity.value = 'Big Bag Safety Factor ' + sf1 + ' to ' + sf2;
                                dimension.value = panjang + ' x ' + lebar + ' x ' + tinggi + ' cm';

                                btn_part.focus();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error('AJAX Error:', status, error);
                        }
                    });
                } else {
                    capacity.focus();
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }
});

// fungsi unk buat kode_barang
function processTypeBrg(typeBrg) {
    const searchChar = "/";
    const myPos = typeBrg.indexOf(searchChar);
    let lebarString = typeBrg.substring(0, myPos).trim();
    kode_barang = "O-" + lebarString;
}

// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
}

// button part section
btn_part.addEventListener('click', function (e) {
    try {
        Swal.fire({
            title: 'Part',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Part Section</th>
                            <th scope="col">ID</th>
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
            returnFocus: false,
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
                            url: "FrmMasterType/getPart",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kode_barang: kode_barang
                            }
                        },
                        columns: [
                            { data: "PartSection" },
                            { data: "Id" }
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
                var partSection = decodeHtmlEntities(result.value.PartSection.trim());
                part.value = partSection;

                btn_material.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button material
btn_material.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Material',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Material Section</th>
                            <th scope="col">ID</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                `
            ,
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
            returnFocus: false,
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
                            url: "FrmMasterType/getMaterial",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Material" },
                            { data: "Id" }
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
                var materialSection = decodeHtmlEntities(result.value.Material.trim());
                material.value = materialSection;

                item.focus();
                item.select();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// ambil row
var tbody = document.querySelector('#tableData tbody');
let tableData = [];

// button tambah
btn_tambah.addEventListener("click", function (e) {
    console.log('tambah');

    var partInput = part.value.trim();
    var materialInput = material.value.trim();
    var itemInput = item.value.trim();
    var standardInput = standard.value.trim();

    var newRow = `
            <tr>
            <td class="partInput">${partInput}</td>
            <td class="materialInput">${materialInput}</td>
            <td class="itemInput">${itemInput}</td>
            <td class="standardInput">${standardInput}</td>
        </tr>
        `;

    tbody.insertAdjacentHTML('beforeend', newRow);

    // masukkan data table ke array
    tableData.push({
        0: partInput,
        1: materialInput,
        2: itemInput,
        3: standardInput
    });

    // click event listener to the new row for selection
    var addedRow = tbody.lastElementChild;
    addedRow.addEventListener("click", function () {
        if (selectedRow) {
            selectedRow.classList.remove('selected');
        }
        selectedRow = addedRow;
        selectedRow.classList.add('selected');
    });
    console.log(tableData);
});

// button hapus
btn_hapus.addEventListener("click", function (e) {
    console.log('hapus');

    if (selectedRow) {
        // hapus selected row dari tableData array
        const rowIndex = Array.from(tbody.children).indexOf(selectedRow);
        selectedRow.remove();

        if (rowIndex > -1) {
            tableData.splice(rowIndex, 1);
        }

        selectedRow = null;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tidak ada baris yang terpilih!',
            returnFocus: false
        });
    }
});

// button proses
btn_proses.addEventListener("click", function (e) {
    console.log('proses');

    // pengecekkan kalo gk ada data di table
    if (tableData.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Mohon Isi Detail COA Terlebih Dahulu!',
            returnFocus: false
        });
        return;
    }


    $.ajax({
        type: 'POST',
        url: 'FrmMasterType',
        data: {
            _token: csrfToken,
            customerId: customerId.value,
            kodeBarang: typeId.value,
            capacity: capacity.value,
            dimension: dimension.value,
            comodity: comodity.value,
            tableData: JSON.stringify(tableData)
        },
        timeout: 30000,
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Tersimpan',
                }).then(() => {
                    // Clear the tbody
                    tbody.innerHTML = '';
                    // Clear the tableData array
                    tableData = [];
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Data Gagal Tersimpan',
                });
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
});
