var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var btn_isi = document.getElementById('btn_isi');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');
var btn_batal = document.getElementById('btn_batal');
var btn_proses = document.getElementById('btn_proses');

var tanggal = document.getElementById('tanggal');
var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var objekId = document.getElementById('objekId');
var objekNama = document.getElementById('objekNama');
var kelutId = document.getElementById('kelutId');
var kelutNama = document.getElementById('kelutNama');
var kelompokId = document.getElementById('kelompokId');
var kelompokNama = document.getElementById('kelompokNama');
var subkelId = document.getElementById('subkelId');
var subkelNama = document.getElementById('subkelNama');
var typeId = document.getElementById('typeId');
var typeNama = document.getElementById('typeNama');
var namaPemberi = document.getElementById('namaPemberi');
var primer = document.getElementById('primer');
var satPrimer = document.getElementById('satPrimer');
var sekunder = document.getElementById('sekunder');
var satSekunder = document.getElementById('satSekunder');
var tritier = document.getElementById('tritier');
var satTritier = document.getElementById('satTritier');

var btn_divisi = document.getElementById('btn_divisi');
var btn_objek = document.getElementById('btn_objek');
var btn_kelut = document.getElementById('btn_kelut');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_subkel = document.getElementById('btn_subkel');
var btn_type = document.getElementById('btn_type');

var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;

$('#tanggal').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn_divisi.focus();
    }
});

$('#namaPemberi').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        primer.focus();
    }
});

$('#primer').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sekunder.focus();
    }
});

$('#sekunder').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        tritier.focus();
    }
});

$('#tritier').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn_proses.focus();
    }
});

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear().draw();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.NamaType),
        ]);
    });

    table.draw();
}

var XIdTransaksi;

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var detailArray = table.row(this).data();

    XIdTransaksi = detailArray[0];

    $.ajax({
        type: 'GET',
        url: 'PermohonanHibah/fetchDataDetail',
        data: {
            _token: csrfToken,
            XIdTransaksi: XIdTransaksi,
        },
        success: function (result) {
            if (result[0]) {
                objekId.value = decodeHtmlEntities(result[0].IdObjek.trim());
                objekNama.value = decodeHtmlEntities(result[0].NamaObjek.trim());
                kelutId.value = decodeHtmlEntities(result[0].IdKelompokUtama.trim());
                kelutNama.value = decodeHtmlEntities(result[0].NamaKelompokUtama.trim());
                kelompokId.value = decodeHtmlEntities(result[0].IdKelompok.trim());
                kelompokNama.value = decodeHtmlEntities(result[0].NamaKelompok.trim());
                subkelId.value = decodeHtmlEntities(result[0].IdSubkelompok.trim());
                subkelNama.value = decodeHtmlEntities(result[0].NamaSubKelompok.trim());
                typeId.value = decodeHtmlEntities(result[0].IdType.trim());
                typeNama.value = decodeHtmlEntities(result[0].NamaType.trim());
                namaPemberi.value = decodeHtmlEntities(result[0].UraianDetailTransaksi.trim());
                primer.value = formatNumber(result[0].JumlahPemasukanPrimer);
                sekunder.value = formatNumber(result[0].JumlahPemasukanSekunder)
                tritier.value = formatNumber(result[0].JumlahPemasukanTritier);
                satPrimer.value = decodeHtmlEntities(result[0].Satuan_Primer.trim());
                satSekunder.value = decodeHtmlEntities(result[0].Satuan_Sekunder.trim());
                satTritier.value = decodeHtmlEntities(result[0].Satuan_Tritier.trim());
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'NoTrans' },
            { title: 'Nama Type' },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: 'dt-colresizable-hover',
            hasBoundCheck: true,
            minBoundClass: 'dt-colresizable-bound-min',
            maxBoundClass: 'dt-colresizable-bound-max',
            saveState: true,
            // isResizable: function (column) {
            //     return column.idx !== 2;
            // },
            onResize: function (column) {
                //console.log('...resizing...');
            },
            onResizeEnd: function (column, columns) {
                // console.log('I have been resized!');
            },
            stateSaveCallback: function (settings, data) {
                let stateStorageName = window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName = window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            }
        },
        scrollY: '400px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0], width: '30%', className: 'fixed-width' },
        { targets: [1], width: '70%', className: 'fixed-width'}]
    });
});

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

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
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table.page('next').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
    else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table.page('previous').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
}

// Helper function to scroll selected row into view
function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

function enableButtonBawah() {

    btn_isi.disabled = false;
    btn_hapus.disabled = false;
    btn_koreksi.disabled = false;
}

function enableButton() {
    btn_objek.disabled = false;
    btn_kelompok.disabled = false;
    btn_kelut.disabled = false;
    btn_subkel.disabled = false;
    btn_type.disabled = false;
    namaPemberi.readOnly = false;
    primer.readOnly = false;
    sekunder.readOnly = false;
    tritier.readOnly = false;
}

function disableButton() {
    btn_objek.disabled = true;
    btn_kelompok.disabled = true;
    btn_kelut.disabled = true;
    btn_subkel.disabled = true;
    btn_type.disabled = true;
    namaPemberi.readOnly = true;
    primer.readOnly = true;
    sekunder.readOnly = true;
    tritier.readOnly = true;
}

// button list divisi
btn_divisi.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Divisi',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Divisi</th>
                            <th scope="col">Nama Divisi</th>
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PermohonanHibah/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId.value = decodeHtmlEntities(result.value.IdDivisi.trim());
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());

                if (divisiId.value === '' || !(divisiId.value === 'INV' || divisiId.value === 'MNV' || divisiId.value === 'MWH' || divisiId.value === 'WKC')) {
                    btn_divisi.focus();
                } else {
                    enableButtonBawah();

                    $.ajax({
                        type: 'GET',
                        url: 'PermohonanHibah/listMohon',
                        data: {
                            _token: csrfToken,
                            XIdDivisi: divisiId.value,
                        },
                        success: function (result) {
                            updateDataTable(result)
                        },
                        error: function (xhr, status, error) {
                            console.error('Error:', error);
                        }
                    });

                    btn_isi.focus();
                }
            }

        });
    } catch (error) {
        console.error(error);
    }
});

// button list objek
btn_objek.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Objek',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Objek</th>
                            <th scope="col">Nama Objek</th>
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PermohonanHibah/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisi: divisiId.value
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });
                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                objekId.value = decodeHtmlEntities(result.value.IdObjek.trim());
                objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());
                btn_kelut.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok utama
btn_kelut.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Kelompok Utama',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok Utama</th>
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PermohonanHibah/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                objekId: objekId.value
                            }
                        },
                        columns: [
                            { data: "IdKelompokUtama" },
                            { data: "NamaKelompokUtama" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId.value = decodeHtmlEntities(result.value.IdKelompokUtama.trim());
                kelutNama.value = decodeHtmlEntities(result.value.NamaKelompokUtama.trim());
                btn_kelompok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
btn_kelompok.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Kelompok',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok</th>
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PermohonanHibah/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelutId: kelutId.value
                            }
                        },
                        columns: [
                            { data: "idkelompok" },
                            { data: "namakelompok" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId.value = decodeHtmlEntities(result.value.idkelompok.trim());
                kelompokNama.value = decodeHtmlEntities(result.value.namakelompok.trim());
                btn_subkel.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
btn_subkel.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Sub Kelompok',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Sub Kelompok</th>
                            <th scope="col">Nama Sub Kelompok</th>
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PermohonanHibah/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelompokId: kelompokId.value
                            }
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId.value = decodeHtmlEntities(result.value.IdSubkelompok.trim());
                subkelNama.value = decodeHtmlEntities(result.value.NamaSubKelompok.trim());
                btn_type.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button type
btn_type.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Type',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id Type</th>
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PermohonanHibah/getType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value
                            }
                        },
                        columns: [
                            { data: "IdType" },
                            { data: "NamaType" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                typeId.value = decodeHtmlEntities(result.value.IdType.trim());
                typeNama.value = decodeHtmlEntities(result.value.NamaType.trim());

                if (typeId.value) {
                    $.ajax({
                        type: 'GET',
                        url: 'PermohonanHibah/loadSaldo',
                        data: {
                            _token: csrfToken,
                            IdType: typeId.value,
                        },
                        success: function (result) {

                            if (result.length !== 0) {
                                satPrimer.value = (result[0].SatPrimer) ?? '';
                                satSekunder.value = (result[0].SatSekunder) ?? '';
                                satTritier.value = (result[0].SatTritier) ?? '';
                            }

                        },
                        error: function (xhr, status, error) {
                            console.error('Error:', error);
                        }
                    });
                }
                namaPemberi.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var pil;

function clearInputs() {
    var elements = [
        objekId, objekNama, kelutId, kelutNama,
        kelompokId, kelompokNama, subkelId, subkelNama, typeId, typeNama,
        namaPemberi, primer, satPrimer, sekunder, satSekunder, tritier, satTritier
    ];

    elements.forEach(function (element) {
        element.value = '';
    });

}

function disable3Button() {
    btn_hapus.disabled = true;
    btn_koreksi.disabled = true;
    btn_isi.disabled = true;
}

btn_isi.addEventListener("click", function (e) {

    pil = 1;

    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');

    enableButton();
    clearInputs();

    disable3Button();

    btn_batal.disabled = false;
    btn_proses.disabled = false;

    primer.value = 0;
    sekunder.value = 0;
    tritier.value = 0;

    btn_objek.focus();
});

btn_batal.addEventListener("click", function (e) {
    pil = 0;
    enableButtonBawah();
    clearInputs();

    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');

    btn_proses.disabled = true;
    btn_batal.disabled = true;
});

btn_koreksi.addEventListener("click", function (e) {
    pil = 2;

    var table = $('#tableData').DataTable();

    if (table.$('tr.selected').length > 0) {
        enableButton();
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        disable3Button();

        btn_objek.focus();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Pilih Dulu data Yang akan di koreksi',
            returnFocus: false
        });
        return;
    }
});

btn_hapus.addEventListener("click", function (e) {
    pil = 3;

    var table = $('#tableData').DataTable();

    if (table.$('tr.selected').length > 0) {
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        disable3Button();

        btn_proses.focus();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Pilih Dulu data Yang akan di hapus',
            returnFocus: false
        });
        return;
    }
});


btn_proses.addEventListener("click", function (e) {

    var table = $('#tableData').DataTable();

    function reloadTable() {
        $.ajax({
            type: 'GET',
            url: 'PermohonanHibah/listMohon',
            data: {
                _token: csrfToken,
                XIdDivisi: divisiId.value,
            },
            success: function (result) {
                updateDataTable(result)
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    if (tanggal.value > today) {
        Swal.fire({
            icon: 'error',
            title: 'Tanggal lebih besar dari tanggal hari ini',
            returnFocus: false
        });
        tanggal.focus();

        return;
    }

    if (namaPemberi.value == '') {
        Swal.fire({
            icon: 'error',
            title: 'Harap Nama Pemberi Di isi !!!',
            returnFocus: false
        });
        namaPemberi.focus();

        return;

    }

    if (tritier.value == 0 && satTritier.value.trim() !== 'NULL') {
        Swal.fire({
            icon: 'error',
            title: 'Harap Satuan Tritier Di isi !!!',
            returnFocus: false
        });
        tritier.focus();

        return;
    }

    if (sekunder.value == 0 && satSekunder.value.trim() !== 'NULL') {
        Swal.fire({
            icon: 'error',
            title: 'Harap Satuan Sekunder Di isi !!!',
            returnFocus: false
        });
        sekunder.focus();

        return;
    }

    if (primer.value == 0 && satPrimer.value.trim() !== 'NULL') {
        Swal.fire({
            icon: 'error',
            title: 'Harap Satuan Primer Di isi !!!',
            returnFocus: false
        });
        primer.focus();

        return;
    }

    if (pil == 1) {
        $.ajax({
            type: 'PUT',
            url: 'PermohonanHibah/insertData',
            data: {
                _token: csrfToken,
                XIdType: typeId.value,
                XSaatAwalTransaksi: tanggal.value,
                XJumlahMasukPrimer: primer.value,
                XJumlahMasukSekunder: sekunder.value,
                XJumlahMasukTritier: tritier.value,
                XAsalIdSubKelompok: subkelId.value,
                XUraianDetailTransaksi: namaPemberi.value,
            },
            success: function (result) {
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.success,
                        returnFocus: false,
                    }).then(() => {
                        clearInputs();
                        disableButton();
                        enableButtonBawah();

                        reloadTable();

                        btn_proses.disabled = true;
                        btn_batal.disabled = true;

                        btn_isi.focus();
                    });
                }


            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    else if (pil == 2) {
        $.ajax({
            type: 'PUT',
            url: 'PermohonanHibah/updateData',
            data: {
                _token: csrfToken,
                XIdTransaksi: XIdTransaksi,
                XJumlahKeluarPrimer: primer.value,
                XJumlahKeluarSekunder: sekunder.value,
                XJumlahKeluarTritier: tritier.value,
                XTujuanSubkelompok: subkelId.value,
                XUraianDetailTransaksi: namaPemberi.value,
            },
            success: function (result) {
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.success,
                        returnFocus: false,
                    }).then(() => {
                        clearInputs();
                        disableButton();
                        enableButtonBawah();

                        reloadTable();

                        btn_proses.disabled = true;
                        btn_batal.disabled = true;

                        table.$('tr.selected').removeClass('selected');

                        btn_koreksi.focus();
                    });
                }


            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    else if (pil === 3) {
        $.ajax({
            type: 'DELETE',
            url: 'PermohonanHibah/deleteData',
            data: {
                _token: csrfToken,
                XIdTransaksi: XIdTransaksi,
            },
            success: function (result) {
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.success,
                        returnFocus: false,
                    }).then(() => {
                        clearInputs();
                        disableButton();
                        enableButtonBawah();

                        reloadTable();

                        btn_proses.disabled = true;
                        btn_batal.disabled = true;

                        table.$('tr.selected').removeClass('selected');

                        btn_hapus.focus();
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});

