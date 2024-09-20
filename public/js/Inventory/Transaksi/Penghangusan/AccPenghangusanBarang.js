var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiNama = document.getElementById('divisiNama');
var tanggal = document.getElementById('tanggal');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var pemohon = document.getElementById('pemohon');
var objekNama = document.getElementById('objekNama');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');

var alasan = document.getElementById('alasan');
var primer = document.getElementById('primer');
var no_primer = document.getElementById('no_primer');
var primer2 = document.getElementById('primer2');
var sekunder = document.getElementById('sekunder');
var no_sekunder = document.getElementById('no_sekunder');
var sekunder2 = document.getElementById('sekunder2');
var tritier = document.getElementById('tritier');
var no_tritier = document.getElementById('no_tritier');
var tritier2 = document.getElementById('tritier2');
var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var kelompokId = document.getElementById('kelompokId');
var kelutId = document.getElementById('kelutId');
var subkelId = document.getElementById('subkelId');

var idType;
var keluarPrimer;
var keluarSekunder;
var keluarTritier;

// button
var btn_divisi = document.getElementById('btn_divisi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');

var table;
var idTransaksi;
const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));

tanggal.value = todayString;

btn_divisi.addEventListener('focus', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btn_divisi.focus();
btn_objek.disabled = true;

// fungsi dapetin user id unk pemohon
function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'PenghangusanBarang/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            pemohon.value = result.user.trim();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

$(document).ready(function () {
    getUserId();
});


// Function to handle keydown events for table navigation
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


// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
}

// fungsi unk format .00
function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
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
                            url: "AccPenghangusanBarang/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" }
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
                console.log(result);
                divisiId.value = result.value.IdDivisi.trim();
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());


                if (divisiId.value === 'INV' || divisiId.value === 'MNV' || divisiId.value === 'MWH') {
                    btn_objek.disabled = false;
                    btn_objek.focus();
                } else {
                    allData();
                    btn_proses.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

divisiId.addEventListener('input', function () {
    allData();
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
                            url: "AccPenghangusanBarang/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisiId: divisiId.value
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" }
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
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());
                allData();

            }
        });
    } catch (error) {
        console.error(error);
    }
});

var selectedData;

$(document).ready(function () {
    selectedData = {
        idTransaksi: [],
        idType: [],
        keluarPrimer: [],
        keluarSekunder: [],
        keluarTritier: []
    };

    table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: '', orderable: false, className: 'select-checkbox', data: null, defaultContent: '' }, // Checkbox
            { title: 'Kd. Transaksi' },
            { title: 'Nama Barang' },
            { title: 'Alasan Mutasi' },
            { title: 'Pemohon' },
            { title: 'Tgl. Mohon' },
            { title: 'Divisi' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
            { title: 'Kode Type' },
            { title: 'Kode Barang' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
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
        scrollX: '150%',
        autoWidth: false,
        columnDefs: [
            {
                targets: 0,
                orderable: false,
                width: '3%',
                className: 'select-checkbox',
                render: function (data, type, row, meta) {
                    return `<input type="checkbox" class="row-checkbox"
                                data-id="${row[1]}"
                                data-type="${row[11]}"
                                data-primer="${row[13]}"
                                data-sekunder="${row[14]}"
                                data-tritier="${row[15]}">`;
                }
            },
            { targets: [1], width: '25%', className: 'fixed-width' },
            { targets: [2], width: '25%', className: 'fixed-width' },
            { targets: [3], width: '10%', className: 'fixed-width' },
            { targets: [4], width: '10%', className: 'fixed-width' },
            { targets: [5], width: '10%', className: 'fixed-width' },
            { targets: [6], width: '10%', className: 'fixed-width' },
            { targets: [7], width: '10%', className: 'fixed-width' },
            { targets: [8], width: '10%', className: 'fixed-width' },
            { targets: [9], width: '10%', className: 'fixed-width' },
            { targets: [10], width: '10%', className: 'fixed-width' },
            { targets: [11], width: '10%', className: 'fixed-width' },
            { targets: [12], width: '10%', className: 'fixed-width' },
            { targets: [13], width: '10%', className: 'fixed-width' },
            { targets: [14], width: '10%', className: 'fixed-width' },
            { targets: [15], width: '10%', className: 'fixed-width' },
        ],
        order: [[1, 'asc']]
    });

    // update array unk centang
    $('#tableData').on('change', '.row-checkbox', function () {
        var id = $(this).data('id');
        var type = $(this).data('type');
        var primer = formatNumber($(this).data('primer'));
        var sekunder = formatNumber($(this).data('sekunder'));
        var tritier = formatNumber($(this).data('tritier'));

        if ($(this).is(':checked')) {
            selectedData.idTransaksi.push(id);
            selectedData.idType.push(type);
            selectedData.keluarPrimer.push(primer);
            selectedData.keluarSekunder.push(sekunder);
            selectedData.keluarTritier.push(tritier);
        } else {
            var index = selectedData.idTransaksi.indexOf(id);
            if (index !== -1) {
                selectedData.idTransaksi.splice(index, 1);
                selectedData.idType.splice(index, 1);
                selectedData.keluarPrimer.splice(index, 1);
                selectedData.keluarSekunder.splice(index, 1);
                selectedData.keluarTritier.splice(index, 1);
            }
        }
    });

    // Select All
    $('#centang').on('change', function () {
        var isChecked = $(this).prop('checked');
        $('.row-checkbox').prop('checked', isChecked).trigger('change');
    });
});



// ngisi input kalo select table
$('#tableData tbody').on('click', 'tr', function (event) {
    if ($(event.target).is('.row-checkbox')) {
        return;
    }

    table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    console.log(data);

    idTransaksi = data[1];

    alasan.value = decodeHtmlEntities(data[3]);
    var originalDate = data[5];
    var parts = originalDate.split('/');
    var formattedDate = parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
    tanggal.value = formattedDate;
    divisiNama.value = decodeHtmlEntities(data[6]);
    objekNama.value = decodeHtmlEntities(data[7]);
    kelutNama.value = decodeHtmlEntities(data[8]);
    kelompokNama.value = decodeHtmlEntities(data[9]);
    subkelNama.value = decodeHtmlEntities(data[10]);
    idType = data[11];
    keluarPrimer = formatNumber(data[13]);
    keluarSekunder = formatNumber(data[14]);
    keluarTritier = formatNumber(data[15]);
    subkelId.value = data[16];


    $.ajax({
        type: 'GET',
        url: 'AccPenghangusanBarang/getType',
        data: {
            _token: csrfToken,
            idTransaksi: idTransaksi,
        },
        success: function (result) {
            if (result[0]) {
                primer.value = formatNumber(result[0].SaldoPrimer);
                sekunder.value = formatNumber(result[0].SaldoSekunder);
                tritier.value = formatNumber(result[0].SaldoTritier);

                no_primer.value = decodeHtmlEntities(result[0].Satuan_Primer.trim());
                no_sekunder.value = decodeHtmlEntities(result[0].Satuan_Sekunder.trim());
                no_tritier.value = decodeHtmlEntities(result[0].Satuan_Tritier.trim());

                primer2.value = formatNumber(result[0].JumlahPengeluaranPrimer);
                sekunder2.value = formatNumber(result[0].JumlahPengeluaranSekunder);
                tritier2.value = formatNumber(result[0].JumlahPengeluaranTritier);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});


// update table
function allData() {
    table = $('#tableData').DataTable();
    table.clear().draw();

    $.ajax({
        url: "AccPenghangusanBarang/getAllData",
        type: "GET",
        data: {
            _token: csrfToken,
            divisiId: divisiId.value,
            objekId: objekId.value
        },
        timeout: 30000,
        success: function (response) {
            if (response) {
                console.log(response);
                var firstSubkelId = response[0].IdSubkelompok.trim();
                var allSameSubkelId = response.every(item => item.IdSubkelompok.trim() === firstSubkelId);

                var tableData = [];
                response.forEach(function (item) {
                    tableData.push([
                        '', // Add checkbox to each row
                        escapeHtml(item.IdTransaksi),
                        escapeHtml(item.NamaType),
                        escapeHtml(item.UraianDetailTransaksi),
                        escapeHtml(item.IdPenerima),
                        escapeHtml(item.SaatAwalTransaksi),
                        escapeHtml(item.NamaDivisi),
                        escapeHtml(item.NamaObjek),
                        escapeHtml(item.NamaKelompokUtama),
                        escapeHtml(item.NamaKelompok),
                        escapeHtml(item.NamaSubKelompok),
                        escapeHtml(item.IdType),
                        escapeHtml(item.KodeBarang),
                        formatNumber(item.JumlahPengeluaranPrimer),
                        formatNumber(item.JumlahPengeluaranSekunder),
                        formatNumber(item.JumlahPengeluaranTritier),
                        item.IdSubkelompok
                    ]);
                });
                table.rows.add(tableData).draw();

                if (allSameSubkelId) {
                    subkelId.value = firstSubkelId;
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

function Cleartext_Header() {
    objekNama.value = '';
    objekId.value = '';
    kelutNama.value = '';
    kelutId.value = '';
    kelompokNama.value = '';
    kelompokId.value = '';
    subkelId.value = '';
    subkelNama.value = '';
}

function ClearText() {
    primer.value = '';
    sekunder.value = '';
    tritier.value = '';
    no_primer.value = '';
    no_sekunder.value = '';
    no_tritier.value = '';
    alasan.value = '';
    tritier2.value = formatNumber(0);
    sekunder2.value = formatNumber(0);
    primer2.value = formatNumber(0);
}

btn_batal.addEventListener('click', function () {
    Cleartext_Header();
    ClearText();
    table = $('#tableData').DataTable();
    table.clear().draw();
});

// button proses event listener
btn_proses.addEventListener('click', function () {
    // btn_objek.disabled = true;
    console.log(selectedData);

    $.ajax({
        type: 'PUT',
        url: 'AccPenghangusanBarang/proses',
        data: {
            _token: csrfToken,
            idTransaksi: selectedData.idTransaksi,
            idType: selectedData.idType,
            keluarPrimer: selectedData.keluarPrimer,
            keluarSekunder: selectedData.keluarSekunder,
            keluarTritier: selectedData.keluarTritier
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    allData();
                    $('#centang').checked = false;
                    btn_divisi.focus();
                });
            } else if (response.warning) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Tidak Bisa Di Acc !',
                    text: response.warning,
                    returnFocus: false,
                }).then(() => {
                    btn_divisi.focus();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);

            var errorMessage = xhr.responseJSON && xhr.responseJSON.error
                ? xhr.responseJSON.error
                : 'An unknown error occurred.';

            Swal.fire({
                icon: 'error',
                title: 'Tidak Bisa Di Acc !',
                text: errorMessage,
                returnFocus: false,
            }).then(() => {
                btn_divisi.focus();
            });
        }
    });
});

