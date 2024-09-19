var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var masuk = document.getElementById('masuk');
var keluar = document.getElementById('keluar');
var divisiNama = document.getElementById('divisiNama');
var tanggal = document.getElementById('tanggal');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var user = document.getElementById('user');
var objekNama = document.getElementById('objekNama');
var primer = document.getElementById('primer');
var sekunder = document.getElementById('sekunder');
var tritier = document.getElementById('tritier');
var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var no_primer = document.getElementById('no_primer');
var no_sekunder = document.getElementById('no_sekunder');
var no_tritier = document.getElementById('no_tritier');
var mutasiLabel = document.getElementById('mutasiLabel');

tanggal.value = todayString;
btn_objek.disabled = true;

var table;
let jenisMutasi;

primer.value = 0;
sekunder.value = 0;
tritier.value = 0;

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

// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
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

// format angka
function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

// fungsi dapetin user id unk pemohon
function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'AccMhnMasukKeluar/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            user.value = result.user.trim();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

$(document).ready(function () {
    getUserId();
});

fillUraian();

function fillUraian() {
    document.querySelectorAll('input[name="opsi"]').forEach(function (element) {
        element.addEventListener('change', function () {
            if (masuk.checked) {
                mutasiLabel.style.display = 'inline-block';
                mutasiLabel.textContent = "Mutasi MASUK";
                jenisMutasi = 'Mutasi Masuk';
                btn_divisi.focus();
            } else if (keluar.checked) {
                mutasiLabel.style.display = 'inline-block';
                mutasiLabel.textContent = "Mutasi KELUAR";
                jenisMutasi = 'Mutasi Keluar';
                btn_divisi.focus();
            }
        });
    });
}

var selectedData;

$(document).ready(function () {
    selectedData = {
        idTransaksi: [],
        idType: [],
        primer: [],
        sekunder: [],
        tritier: []
    };

    table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: '', orderable: false, className: 'select-checkbox', data: null, defaultContent: '' }, // Checkbox
            { title: 'Kd. Transaksi' },
            { title: 'Nama Type' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
            { title: 'Kd Type' },
            { title: 'Uraian' },
            { title: 'Tanggal' },
            { title: 'Pemohon' }
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
        columnDefs: [
            {
                targets: 0,
                orderable: false,
                width: '3%',
                className: 'select-checkbox',
                render: function (data, type, row, meta) {
                    return `<input type="checkbox" class="row-checkbox"
                                data-id="${row[1]}"
                                data-type="${row[6]}"
                                data-primer="${row[3]}"
                                data-sekunder="${row[4]}"
                                data-tritier="${row[5]}">`;
                }
            },
            { targets: [1], width: '8%', className: 'fixed-width' },
            { targets: [2], width: '30%', className: 'fixed-width' },
            { targets: [3], width: '8%', className: 'fixed-width' },
            { targets: [4], width: '8%', className: 'fixed-width' },
            { targets: [5], width: '8%', className: 'fixed-width' },
            { targets: [6], width: '20%', className: 'fixed-width' },
            { targets: [7], width: '13%', className: 'fixed-width' },
            { targets: [8], width: '8%', className: 'fixed-width' },
            { targets: [9], width: '8%', className: 'fixed-width' },
        ],
        scrollY: '300px',
        autoWidth: false,
        scrollX: '100%',
        order: [[1, 'asc']]
    });

    $('#tableData').on('change', '.row-checkbox', function () {
        var id = $(this).data('id');
        var type = $(this).data('type');
        var primer = formatNumber($(this).data('primer'));
        var sekunder = formatNumber($(this).data('sekunder'));
        var tritier = formatNumber($(this).data('tritier'));

        if ($(this).is(':checked')) {
            selectedData.idTransaksi.push(id);
            selectedData.idType.push(type);
            selectedData.primer.push(primer);
            selectedData.sekunder.push(sekunder);
            selectedData.tritier.push(tritier);
        } else {
            var index = selectedData.idTransaksi.indexOf(id);
            if (index !== -1) {
                selectedData.idTransaksi.splice(index, 1);
                selectedData.idType.splice(index, 1);
                selectedData.primer.splice(index, 1);
                selectedData.sekunder.splice(index, 1);
                selectedData.tritier.splice(index, 1);
            }
        }
        console.log(selectedData);

    });
});

$('#tableData tbody').on('click', 'tr', function (event) {
    if ($(event.target).is('.row-checkbox')) {
        return;
    }
    table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    console.log(data);

    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    kodeTransaksi.value = data[1];
    primer.value = formatNumber(data[3]);
    sekunder.value = formatNumber(data[4]);
    tritier.value = formatNumber(data[5]);
    uraian.value = decodeHtmlEntities(data[7]);
    objekId.value = data[10];
    objekNama.value = data[11];

    no_primer.textContent = data[17] || '';
    no_sekunder.textContent = data[18] || '';
    no_tritier.textContent = data[19] || '';

    var originalDate = data[8];
    var parts = originalDate.split('/');
    var formattedDate = parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
    tanggal.value = formattedDate;

    user.value = data[9];
});


// menampilkan semua data
function showTable() {
    $('.divTable').show();

    $.ajax({
        type: 'GET',
        url: 'AccMhnMasukKeluar/getData',
        data: {
            _token: csrfToken,
            objekId: objekId.value,
            mutasi: jenisMutasi
        },
        success: function (result) {
            updateDataTable(result);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// fungsi unk update isi tabel
function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    // console.log(data);

    data.forEach(function (item) {
        var rowData = [
            '',
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim())
        ];

        if (jenisMutasi === 'Mutasi Masuk') {
            rowData.push(
                escapeHtml(formatNumber(item.JumlahPemasukanPrimer.trim())),
                escapeHtml(formatNumber(item.JumlahPemasukanSekunder.trim())),
                escapeHtml(formatNumber(item.JumlahPemasukanTritier.trim()))
            );
        } else if (jenisMutasi === 'Mutasi Keluar') {
            rowData.push(
                escapeHtml(formatNumber(item.JumlahPengeluaranPrimer.trim())),
                escapeHtml(formatNumber(item.JumlahPengeluaranSekunder.trim())),
                escapeHtml(formatNumber(item.JumlahPengeluaranTritier.trim()))
            );
        }

        rowData.push(
            escapeHtml(item.idtype.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.idpemberi.trim()),
            escapeHtml(item.IdObjek.trim()),
            escapeHtml(item.NamaObjek.trim()),
            escapeHtml(item.IdKelompokUtama.trim()),
            escapeHtml(item.NamaKelompokUtama.trim()),
            escapeHtml(item.IdKelompok.trim()),
            escapeHtml(item.NamaKelompok.trim()),
            escapeHtml(item.IdSubkelompok.trim()),
            escapeHtml(item.NamaSubKelompok.trim()),
            escapeHtml(item.Satuan_primer.trim()),
            escapeHtml(item.Satuan_Sekunder.trim()),
            escapeHtml(item.Satuan_Tritier.trim()),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.kodebarang.trim())
        );

        table.row.add(rowData);
    });
    table.draw();
}

// button list divisi
btn_divisi.addEventListener("click", function (e) {
    if (!(masuk.checked || keluar.checked)) {
        Swal.fire({
            icon: 'error',
            title: 'Pilih dulu Jenis Mutasi!',
            returnFocus: false
        });
        return;
    } else {
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
                                url: "AccMhnMasukKeluar/getDivisi",
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
                    divisiId.value = result.value.IdDivisi.trim();
                    divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());

                    btn_objek.disabled = false;
                    btn_objek.focus();
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
});

// button list objek
btn_objek.addEventListener("click", function (e) {
    if (!(masuk.checked || keluar.checked)) {
        Swal.fire({
            icon: 'error',
            title: 'Pilih dulu Jenis Mutasi!',
            returnFocus: false
        });
        return;
    } else {
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
                                url: "AccMhnMasukKeluar/getObjek",
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

                    if (objekNama.value !== '') {
                        showTable();
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
});

// button proses event listener
btn_proses.addEventListener('click', function () {
    if (selectedData.length === 0 || selectedData.idTransaksi.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Pilih dulu datanya !!',
            returnFocus: false,
        });
    }

    // btn_objek.disabled = true;
    console.log(selectedData);

    $.ajax({
        type: 'PUT',
        url: 'AccMhnMasukKeluar/accMutasi',
        data: {
            _token: csrfToken,
            idTransaksi: selectedData.idTransaksi,
            idType: selectedData.idType,
            primer: selectedData.primer,
            sekunder: selectedData.sekunder,
            tritier: selectedData.tritier,
            checked: masuk.checked,
            penerima: user.value
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    html: response.success,
                    returnFocus: false,
                }).then(() => {
                    showTable();
                    selectedData = {
                        idTransaksi: [],
                        idType: [],
                        primer: [],
                        sekunder: [],
                        tritier: []
                    };
                    btn_divisi.focus();
                });
            } else if (response.warning) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Gagal Di Acc !',
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
