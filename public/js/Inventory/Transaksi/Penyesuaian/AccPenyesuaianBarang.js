var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiNama = document.getElementById('divisiNama');
var tanggal = document.getElementById('tanggal');
var tanggalTransaksi = document.getElementById('tanggalTransaksi');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var pemohon = document.getElementById('pemohon');
var setuju = document.getElementById('setuju');
var objekNama = document.getElementById('objekNama');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var kodeTransaksi = document.getElementById('kodeTransaksi');
var kodeBarang = document.getElementById('kodeBarang');
var namaBarang = document.getElementById('namaBarang');
var primer = document.getElementById('primer');
var primer2 = document.getElementById('primer2');
var sekunder = document.getElementById('sekunder');
var sekunder2 = document.getElementById('sekunder2');
var tritier = document.getElementById('tritier');
var tritier2 = document.getElementById('tritier2');
var no_primer = document.getElementById('no_primer');
var no_sekunder = document.getElementById('no_sekunder');
var no_tritier = document.getElementById('no_tritier');

var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var kelompokId = document.getElementById('kelompokId');
var kelutId = document.getElementById('kelutId');
var subkelId = document.getElementById('subkelId');

// button
var btn_divisi = document.getElementById('btn_divisi');
var btn_objek = document.getElementById('btn_objek');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_kelut = document.getElementById('btn_kelut');
var btn_subkel = document.getElementById('btn_subkel');
var btn_kodeType = document.getElementById('btn_kodeType');
var btn_namaBarang = document.getElementById('btn_namaBarang');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_all = document.getElementById('btn_all');
var btn_notAll = document.getElementById('btn_notAll');

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));
var allInputs = document.querySelectorAll('input');

var completeDataArray = [];

tanggal.value = todayString;
btn_divisi.focus();
btn_notAll.style.display = 'none';

$(document).ready(function () {
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
            { title: 'Sub Kelompok' }
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
        order: [[1, 'asc']],
        scrollY: '300px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{
            targets: 0,
            orderable: false,
            width: '1%',
            className: 'select-checkbox',
            render: function (data, type, row, meta) {
                return `<input type="checkbox" class="row-checkbox"
                            data-id="${row[1]}"
                            data-type="${row[11]}"
                            data-primer="${row[13]}"
                            data-sekunder="${row[14]}"
                            data-tritier="${row[15]}">`;
            }
        }, { targets: [1], width: '10%', className: 'fixed-width' },
        { targets: [2], width: '35%', className: 'fixed-width' },
        { targets: [3], width: '35%', className: 'fixed-width' },
        { targets: [4], width: '10%', className: 'fixed-width' },
        { targets: [5], width: '10%', className: 'fixed-width' },
        { targets: [6], width: '10%', className: 'fixed-width' },
        { targets: [7], width: '10%', className: 'fixed-width' },
        { targets: [8], width: '10%', className: 'fixed-width' },
        { targets: [9], width: '10%', className: 'fixed-width' },
        { targets: [10], width: '10%', className: 'fixed-width' }]
    });
});

btn_all.addEventListener("click", function () {
    var checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
        $(checkbox).trigger('change');
    });

    // tampil Unselect All, hide Select All
    btn_all.style.display = 'none';
    btn_notAll.style.display = 'inline-block';

    completeDataArray = [];

    var table = $('#tableData').DataTable();
    var rows = table.rows().data();

    rows.each(function (data, index) {
        var kodeTransaksiValue = data[1];

        $.ajax({
            type: 'GET',
            url: 'AccPenyesuaianBarang/getSelect',
            data: {
                _token: csrfToken,
                kodeTransaksi: kodeTransaksiValue
            },
            success: function (result) {
                if (result) {
                    var combinedData = {
                        tableData: data,
                        ajaxResult: result
                    };

                    completeDataArray.push(combinedData);

                    console.log('Complete Data Array:', completeDataArray);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});

btn_notAll.addEventListener("click", function () {
    var checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        $(checkbox).trigger('change');
    });

    // tampil Select All, hide Unselect All
    btn_notAll.style.display = 'none';
    btn_all.style.display = 'inline-block';

    completeDataArray = [];
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
        url: 'AccPenyesuaianBarang/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            setuju.value = result.user.trim();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

$(document).ready(function () {
    getUserId();
});

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
                            url: "AccPenyesuaianBarang/getDivisi",
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
                showTable();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// fungsi unk update isi tabel
function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            '',
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.NamaUser.trim()),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.NamaDivisi.trim()),
            escapeHtml(item.NamaObjek.trim()),
            escapeHtml(item.NamaKelompokUtama.trim()),
            escapeHtml(item.NamaKelompok.trim()),
            escapeHtml(item.NamaSubKelompok.trim()),
            escapeHtml(item.IdPenerima.trim())
        ]);
    });
    table.draw();
}


$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();
    var checkbox = $(this).find('input.row-checkbox');

    console.log(data);

    kodeTransaksi.value = data[1];
    namaBarang.value = decodeHtmlEntities(data[2]);
    tanggalTransaksi.value = data[5];
    divisiNama.value = decodeHtmlEntities(data[6]);
    objekNama.value = decodeHtmlEntities(data[7]);
    kelutNama.value = decodeHtmlEntities(data[8]);
    kelompokNama.value = decodeHtmlEntities(data[9]);
    subkelNama.value = decodeHtmlEntities(data[10]);
    pemohon.value = data[11];

    $.ajax({
        type: 'GET',
        url: 'AccPenyesuaianBarang/getSelect',
        data: {
            _token: csrfToken,
            kodeTransaksi: kodeTransaksi.value
        },
        success: function (result) {
            if (result) {
                console.log(result);

                primer.value = formatNumber(result[0].SaldoPrimer) ?? formatNumber(0);
                sekunder.value = formatNumber(result[0].SaldoSekunder) ?? formatNumber(0);
                tritier.value = formatNumber(result[0].SaldoTritier) ?? formatNumber(0);

                no_primer.value = result[0].Satuan_Primer.trim();
                no_sekunder.value = result[0].Satuan_Sekunder.trim();
                no_tritier.value = result[0].Satuan_Tritier.trim();

                primer2.value = formatNumber(result[0].SaldoPrimer2) ?? formatNumber(0);
                sekunder2.value = formatNumber(result[0].SaldoSekunder2) ?? formatNumber(0);
                tritier2.value = formatNumber(result[0].SaldoTritier2) ?? formatNumber(0);

                if (checkbox.is(':checked')) {
                    const index = completeDataArray.findIndex(item => item.tableData[1] === data[1]);
                    if (index === -1) {
                        completeDataArray.push({
                            tableData: data,
                            ajaxResult: result
                        });
                    }
                    console.log('data lengkap: ', completeDataArray);

                } else {
                    const index = completeDataArray.findIndex(item => item.tableData[1] === data[1]);
                    if (index !== -1) {
                        completeDataArray.splice(index, 1);
                    }
                    console.log('data lengkap: ', completeDataArray);
                }
            }

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

// menampilkan semua data
function showTable() {
    $.ajax({
        type: 'GET',
        url: 'AccPenyesuaianBarang/getData',
        data: {
            _token: csrfToken,
            divisiId: divisiId.value
        },
        success: function (result) {
            updateDataTable(result);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btn_proses.addEventListener("click", function (e) {
    if (completeDataArray.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Tidak Ada Data',
            text: 'Tidak ada Data yg diACC, Pilih dulu Datanya!',
        });
        return;
    }
    let processedCount = 0;

    console.log(completeDataArray);


    completeDataArray.forEach(function (item) {
        let YIdTrans = item.tableData[1];

        $.ajax({
            type: 'GET',
            url: 'AccPenyesuaianBarang/cekData',
            data: {
                _token: csrfToken,
                YIdTrans: YIdTrans
            },
            success: function (response) {
                if (response.length > 0) {
                    $.ajax({
                        type: 'PUT',
                        url: 'AccPenyesuaianBarang/proses',
                        data: {
                            _token: csrfToken,
                            YIdTrans: YIdTrans,
                            setuju: setuju.value,
                            YIdType: response[0].IdType.trim(),
                            inPrimer: response[0].JumlahPemasukanPrimer.trim(),
                            inSekunder: response[0].JumlahPemasukanSekunder.trim(),
                            inTritier: response[0].JumlahPemasukanTritier.trim(),
                            outPrimer: response[0].JumlahPengeluaranPrimer.trim(),
                            outSekunder: response[0].JumlahPengeluaranSekunder.trim(),
                            outTritier: response[0].JumlahPengeluaranTritier.trim()
                        },
                        success: function (response) {
                            processedCount++;

                            if (response.success) {
                                if (processedCount === completeDataArray.length) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Success',
                                        text: response.success,
                                        returnFocus: false,
                                    }).then(() => {
                                        clearInputs();
                                        showTable();
                                    });
                                }

                            } else if (response.error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Proses data GAGAL !',
                                    text: response.error,
                                    returnFocus: false,
                                }).then(() => {
                                    btn_divisi.focus();
                                });
                            }
                        },
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
                    title: 'Proses data GAGAL !',
                    text: errorMessage,
                    returnFocus: false,
                }).then(() => {
                    btn_divisi.focus();
                });
            }
        });
    });
});


// kosongin input
function clearInputs() {
    allInputs.forEach(function (input) {
        let divPenting = input.closest('#perlu') !== null;
        let divids = input.closest('#ids') !== null;
        if (!divPenting && !divids) {
            input.value = '';
        }
    });
    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;
}

btn_batal.addEventListener("click", function (e) {
    clearInputs();
});
