var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var btn_divisi = document.getElementById('btn_divisi');
var btn_ok = document.getElementById('btn_ok');
var objekNama = document.getElementById('objekNama');
var objekId = document.getElementById('objekId');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var transaksiId = document.getElementById('transaksiId');
var typeId = document.getElementById('typeId');
var namaType = document.getElementById('namaType');
var primer = document.getElementById('primer');
var satuanPrimer = document.getElementById('satuanPrimer');
var sekunder = document.getElementById('sekunder');
var satuanSekunder = document.getElementById('satuanSekunder');
var triter = document.getElementById('triter');
var satuanTritier = document.getElementById('satuanTritier');
var tableData = document.getElementById('tableData');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_objek = document.getElementById('btn_objek');


$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Tanggal' },
            { title: 'Type' },
            { title: 'Supplier' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
            { title: 'Id Transaksi' },
            { title: 'Pemohon' },
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
        scrollY: '300px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0], width: '8%', className: 'fixed-width' },
        { targets: [1], width: '25%', className: 'fixed-width' },
        { targets: [2], width: '10%', className: 'fixed-width' },
        { targets: [3], width: '10%', className: 'fixed-width' },
        { targets: [4], width: '10%', className: 'fixed-width' },
        { targets: [5], width: '10%', className: 'fixed-width' },
        { targets: [6], width: '10%', className: 'fixed-width' },
        { targets: [7], width: '10%', className: 'fixed-width'}]
    });
});

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}


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

var idtype;

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();

    idtype = decodeHtmlEntities(data[8].trim());

    transaksiId.value = decodeHtmlEntities(data[6]);
    namaType.value = decodeHtmlEntities(data[1]);
    primer.value = formatNumber(data[3]);
    sekunder.value = formatNumber(data[4]);
    triter.value = formatNumber(data[5]);

    $.ajax({
        type: 'GET',
        url: 'PenerimaHibah/getDetailData',
        data: {
            IdTransaksi: transaksiId.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result) {
                satuanPrimer.value = result[0].Primer ?? '';
                satuanSekunder.value = result[0].Sekunder ?? '';
                satuanTritier.value = result[0].Tritier ?? '';
                kelutNama.value = decodeHtmlEntities(result[0].NamaKelompokUtama);
                kelompokNama.value = decodeHtmlEntities(result[0].NamaKelompok);
                subkelNama.value = decodeHtmlEntities(result[0].NamaSubKelompok);
            }
            else {
                triter.value = '';
                primer.value = '';
                sekunder.value = '';
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear().draw();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.SaatAwalTransaksi),
            escapeHtml(item.NamaType),
            escapeHtml(item.UraianDetailtransaksi),
            formatNumber(item.JumlahPemasukanPrimer),
            formatNumber(item.JumlahPemasukanSekunder),
            formatNumber(item.JumlahPemasukanTritier),
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.NamaUser),
            escapeHtml(item.IdType),
        ]);
    });

    table.draw();
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
                            url: "PenerimaHibah/getDivisi",
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
                btn_objek.focus();
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
                        order: [0, "asc"],
                        ajax: {
                            url: "TransaksiHarian/getObjek",
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
                btn_ok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function clearInputs() {
    kelutNama.value = '';
    kelompokNama.value = '';
    subkelNama.value = '';
    transaksiId.value = '';
    namaType.value = '';
    typeId.value = '';
    primer.value = '';
    sekunder.value = '';
    triter.value = '';
    satuanPrimer.value = '';
    satuanSekunder.value = '';
    satuanTritier.value = '';
}

btn_batal.addEventListener("click", function (e) {
    clearInputs();

    var table = $('#tableData').DataTable();
    table.clear().draw();

    btn_divisi.disabled = false;
    btn_objek.disabled = false;

    btn_proses.disabled = true;
    btn_batal.disabled = true;
});

btn_proses.addEventListener("click", function (e) {

    var table = $('#tableData').DataTable();

    $.ajax({
        type: 'GET',
        url: 'PenerimaHibah/cekPenyesuaian',
        data: {
            _token: csrfToken,
            idtype: idtype,
        },
        success: function (result) {
            if (parseInt(result[0].jumlah >= 1)) {
                Swal.fire({
                    icon: 'error',
                    text: 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type: '
                        + decodeHtmlEntities(namaType.value),
                });
            }
            else {
                terimaHibah();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });

    function terimaHibah() {

        $.ajax({
            type: 'PUT',
            url: 'PenerimaHibah/terimaHibah',
            data: {
                _token: csrfToken,
                IdTransaksi: transaksiId.value,
                IdType: typeId.value,
                MasukPrimer: primer.value,
                MasukSekunder: sekunder.value,
                MasukTritier: triter.value,
            },
            success: function (result) {
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.success,
                    }).then(() => {
                        clearInputs();

                        $.ajax({
                            type: 'GET',
                            url: 'PenerimaHibah/getListTerima',
                            data: {
                                _token: csrfToken,
                                IDObjek: objekId.value,
                            },
                            success: function (result) {
                                if (result.length !== 0) {
                                    updateDataTable(result);
                                } else {
                                    table.clear().draw();
                                }
                            },
                            error: function (xhr, status, error) {
                                console.error('Error:', error);
                            }
                        });
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});

btn_ok.addEventListener("click", function (e) {

    var table = $('#tableData').DataTable();

    if (objekId.value == '') {
        Swal.fire({
            icon: 'error',
            title: 'Isi Objek terlebih dahulu!',
            returnFocus: false,
        });
        return;
    }

    if (divisiId.value == '') {
        Swal.fire({
            icon: 'error',
            title: 'Isi Divisi terlebih dahulu!',
            returnFocus: false,
        });
        return;
    }

    else {
        btn_divisi.disabled = true;
        btn_objek.disabled = true;

        btn_proses.disabled = false;
        btn_batal.disabled = false;

        $.ajax({
            type: 'GET',
            url: 'PenerimaHibah/getListTerima',
            data: {
                _token: csrfToken,
                IDObjek: objekId.value,
            },
            success: function (result) {
                if (result.length !== 0) {
                    updateDataTable(result);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data di tabel sudah diupdate.',
                    });
                }
                else {
                    table.clear().draw();

                    Swal.fire({
                        icon: 'info',
                        title: 'Tidak ada Data!',
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});
