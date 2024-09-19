var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Assigning all input elements to variables
var divisiNama = document.getElementById('divisiNama');
var objekNama = document.getElementById('objekNama');
var pemberi = document.getElementById('pemberi');
var tanggal = document.getElementById('tanggal');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var kelompokNama = document.getElementById('kelompokNama');
var kodeTransaksi = document.getElementById('kodeTransaksi');
var kodeBarang = document.getElementById('kodeBarang');
var alasan = document.getElementById('alasan');
var pemohon = document.getElementById('pemohon');
var namaBarang = document.getElementById('namaBarang');
var primer = document.getElementById('primer');
var satuanPrimer = document.getElementById('satuanPrimer');
var sekunder = document.getElementById('sekunder');
var satuanSekunder = document.getElementById('satuanSekunder');
var tritier = document.getElementById('tritier');
var satuanTritier = document.getElementById('satuanTritier');

// Hidden fields
var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var kelompokId = document.getElementById('kelompokId');
var kelutId = document.getElementById('kelutId');
var subkelId = document.getElementById('subkelId');

// Penerima barang section
var divisiNama2 = document.getElementById('divisiNama2');
var objekNama2 = document.getElementById('objekNama2');
var kelompokNama2 = document.getElementById('kelompokNama2');
var kelutNama2 = document.getElementById('kelutNama2');
var subkelNama2 = document.getElementById('subkelNama2');

// Buttons
var btn_refresh = document.getElementById('btn_refresh');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');

var today = new Date().toISOString().slice(0, 10);
tanggal.value = formatDateToMMDDYYYY(today);

function formatDateToMMDDYYYY(date) {
    let dateObj = new Date(date);
    if (isNaN(dateObj)) {
        return '';
    }

    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObj.getDate().toString().padStart(2, '0');
    let year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'PemberiBarangAss/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            pemberi.value = result.user;
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

var XIdObjek;
$(document).ready(function () {
    var params = new URLSearchParams(window.location.search);
    XIdObjek = params.get('XIdObjek');

    getUserId();
    AllData();


    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kd. Trans' },
            { title: 'Nama Barang' },
            { title: 'Kode Barang' },
            { title: 'Alasan Mutasi' },
            { title: 'Jml Primer' },
            { title: 'Jml Sekunder' },
            { title: 'Jml Tritier' },
            { title: 'Pemohon' },
            { title: 'Tgl. Transaksi' },
            { title: 'Div. Pemberi' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub. Kel' },
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
        columnDefs: [{ targets: [0], width: '10%', className: 'fixed-width' },
        { targets: [1], width: '25%', className: 'fixed-width' },
        { targets: [2], width: '12%', className: 'fixed-width' },
        { targets: [3], width: '25%', className: 'fixed-width' },
        { targets: [4], width: '10%', className: 'fixed-width' },
        { targets: [5], width: '10%', className: 'fixed-width' },
        { targets: [6], width: '10%', className: 'fixed-width' },
        { targets: [7], width: '12%', className: 'fixed-width' },
        { targets: [8], width: '12%', className: 'fixed-width' },
        { targets: [9], width: '12%', className: 'fixed-width' },
        { targets: [10], width: '12%', className: 'fixed-width' },
        { targets: [11], width: '12%', className: 'fixed-width' },
        { targets: [12], width: '12%', className: 'fixed-width' },
        { targets: [13], width: '12%', className: 'fixed-width' }
        ]
    });
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
            escapeHtml(item.KodeBarang),
            escapeHtml(item.UraianDetailTransaksi),
            formatNumber(item.JumlahPengeluaranPrimer),
            formatNumber(item.JumlahPengeluaranSekunder),
            formatNumber(item.JumlahPengeluaranTritier),
            escapeHtml(item.NamaUser),
            formatDateToMMDDYYYY(item.SaatAwalTransaksi),
            escapeHtml(item.NamaDivisi),
            escapeHtml(item.NamaObjek),
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.SatPrimer),
            escapeHtml(item.SatSekunder),
            escapeHtml(item.SatTritier),
        ]);
    });

    table.draw();
}

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

btn_refresh.addEventListener("click", function (e) {
    AllData();
});

function cek_sesuai_pemberi() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'PemberiBarangAss/cekPemberi',
            data: {
                _token: csrfToken,
                IdTransaksi: kodeTransaksi.value,
            },
            success: function (result) {
                if (result[0].jumlah >= 1) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum DiACC untuk type '
                            + decodeHtmlEntities(result[0].IdType) + ' Pada Divisi Pemberi',
                        returnFocus: false,
                    });
                    resolve(false); // Resolve as invalid
                } else {
                    resolve(true); // Resolve as valid
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error); // Reject in case of error
            }
        });
    });
}

function cek_sesuai_penerima() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'PemberiBarangAss/cekPenerima',
            data: {
                _token: csrfToken,
                IdTransaksi: kodeTransaksi.value,
                KodeBarang: kodeBarang.value,
            },
            success: function (result) {
                if (result[0].jumlah >= 1) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum DiACC untuk type '
                            + decodeHtmlEntities(result[0].IdType) + ' Pada Divisi Pemberi',
                        returnFocus: false,
                    });
                    resolve(false); // Resolve as invalid
                } else {
                    resolve(true); // Resolve as valid
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error); // Reject in case of error
            }
        });
    });
}

btn_proses.addEventListener("click", async function (e) {
    if (primer.value === 0 && satuanPrimer.value.trim() === 'KGM') {
        Swal.fire({
            icon: 'error',
            title: 'Satuan Primer tidak boleh 0',
            returnFocus: false,
        });
        return;
    }
    else if (sekunder.value === 0 && satuanSekunder.value.trim() === 'KGM') {
        Swal.fire({
            icon: 'error',
            title: 'Satuan Sekunder tidak boleh 0',
            returnFocus: false,
        });
        return;
    }
    else if (tritier.value === 0 && tritier.value.trim() === 'KGM') {
        Swal.fire({
            icon: 'error',
            title: 'Satuan Tritier tidak boleh 0',
            returnFocus: false,
        });
        return;
    }

    const cekPemberiResult = await cek_sesuai_pemberi();
    const cekPenerimaResult = await cek_sesuai_penerima();

    if (cekPemberiResult && cekPenerimaResult) {
        $.ajax({
            type: 'PUT',
            url: 'PemberiBarangAss/proses',
            data: {
                _token: csrfToken,
                XIdTransaksi: kodeTransaksi.value,
                XUraianDetailTransaksi: alasan.value,
                XJumlahKeluarPrimer: primer.value,
                XJumlahKeluarSekunder: sekunder.value,
                XJumlahKeluarTritier: tritier.value,
                XTujuanSubKelompok: subkelId2,
                IdTransaksi: kodeTransaksi.value,
                JumlahKeluarPrimer: primer.value,
                JumlahKeluarSekunder: sekunder.value,
                JumlahKeluarTritier: tritier.value,
            },
            success: function (response) {
                if (response.NmError1) {
                    Swal.fire({
                        icon: 'error',
                        text: 'IdTransaksi: ' + kodeTransaksi.value + ', ' + response.NmError1,
                        returnFocus: false,
                    }).then(() => {
                        if (response.NmError2) {
                            Swal.fire({
                                icon: 'error',
                                text: 'IdTransaksi: ' + kodeTransaksi.value + ', ' + response.NmError2,
                                returnFocus: false,
                            });
                        }
                    });
                } else if (response.NmError2) {
                    Swal.fire({
                        icon: 'error',
                        text: response.NmError2,
                        returnFocus: false,
                    });
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        text: 'Data Sudah diPROSES!!..',
                        returnFocus: false,
                    }).then(() => {
                        btn_refresh.click();
                        ClearText();
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});

function ClearText() {
    kelutNama.value = '';
    kelompokNama.value = '';
    subkelNama.value = '';
    kelutId.value = '';
    kelompokId.value = '';
    subkelId.value = '';
    kodeTransaksi.value = '';
    kodeBarang.value = '';
    pemohon.value = '';
    namaBarang.value = '';
    primer.value = '0';
    satuanPrimer.value = '';
    sekunder.value = '0';
    satuanSekunder.value = '';
    tritier.value = '0';
    satuanTritier.value = '';
    divisiNama2.value = '';
    objekNama2.value = '';
    kelutNama2.value = '';
    kelompokNama2.value = '';
    subkelNama2.value = '';
    alasan.value = '';
}

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    kodeTransaksi.value = decodeHtmlEntities(data[0]);

    kelutNama.value = decodeHtmlEntities(data[11]);
    kelompokNama.value = decodeHtmlEntities(data[12]);
    subkelNama.value = decodeHtmlEntities(data[13]);
    kodeBarang.value = decodeHtmlEntities(data[2]);
    namaBarang.value = decodeHtmlEntities(data[1]);
    primer.value = formatNumber(data[4]);
    sekunder.value = formatNumber(data[5]);
    tritier.value = formatNumber(data[6]);
    satuanPrimer.value = decodeHtmlEntities(data[14]);
    satuanSekunder.value = decodeHtmlEntities(data[15]);
    satuanTritier.value = decodeHtmlEntities(data[16]);
    pemohon.value = decodeHtmlEntities(data[7]);
    alasan.value = decodeHtmlEntities(data[3]);

    SelectData();

    if (tritier.value === 0) {
        tritier.disabled = false;
        tritier.focus();
    }
    else {
        Swal.fire({
            title: 'Ubah Jml Tritiernya ? ',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            returnFocus: false,
        }).then((result) => {
            if (result.isConfirmed) {
                tritier.disabled = false;
                tritier.focus();
            }
            else {
                btn_proses.focus();
            }
        });
    }
});

$('#tritier').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn_proses.focus();
    }
});

var SaldoPrimer, SaldoSekunder, SaldoTritier, subkelId2;
function SelectData() {
    $.ajax({
        type: 'GET',
        url: 'PemberiBarangAss/selectData',
        data: {
            _token: csrfToken,
            XIdTransaksi: kodeTransaksi.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                divisiNama2.value = decodeHtmlEntities(result[0].NamaDivisi);
                objekNama2.value = decodeHtmlEntities(result[0].NamaObjek);
                kelutNama2.value = decodeHtmlEntities(result[0].NamaKelompokUtama);
                kelompokNama2.value = decodeHtmlEntities(result[0].NamaKelompok);
                subkelNama2.value = decodeHtmlEntities(result[0].NamaSubKelompok);
                subkelId2 = decodeHtmlEntities(result[0].IdSubkelompok);
                SaldoPrimer = formatNumber(result[0].SaldoPrimer);
                SaldoSekunder = formatNumber(result[0].SaldoSekunder);
                SaldoTritier = formatNumber(result[0].SaldoTritier);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function AllData() {
    $.ajax({
        type: 'GET',
        url: 'PemberiBarangAss/getAllData',
        data: {
            _token: csrfToken,
            XIdDivisi: divisiId.value,
            XIdObjek: XIdObjek,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);
            }
            else {
                var table = $('#tableData').DataTable();
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