var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisi = document.getElementById('divisi');
var objek = document.getElementById('objek');
var kelompok = document.getElementById('kelompok');
var kelut = document.getElementById('kelut');
var subkel = document.getElementById('subkel');
var subkelId = document.getElementById('subkelId');
var kode = document.getElementById('kode');
var type = document.getElementById('type');
var primer = document.getElementById('primer');
var sekunder = document.getElementById('sekunder');
var triter = document.getElementById('triter');
var transaksi = document.getElementById('transaksi');

var btnProses = document.getElementById('btn_proses');
var btnBatal = document.getElementById('btn_batal');
var btnRefresh = document.getElementById('btn_refresh');

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Tanggal' },
            { title: 'IdTransaksi' },
            { title: 'Nama Type' },
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
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0], width: '10%', className: 'fixed-width' },
        { targets: [1], width: '15%', className: 'fixed-width' },
        { targets: [2], width: '40%', className: 'fixed-width' },
        { targets: [3], width: '10%', className: 'fixed-width' },
        { targets: [4], width: '10%', className: 'fixed-width' },
        { targets: [5], width: '10%', className: 'fixed-width' }]
    });
});

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

function updateDataTable(data) {
    var table = $('#tableData').DataTable();

    table.clear();
    data.forEach(function (item) {
        table.row.add([
            formatDateToMMDDYYYY(item.SaatAwalTransaksi),
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.NamaType),
            formatNumber(item.JumlahPemasukanPrimer),
            formatNumber(item.JumlahPemasukanSekunder),
            formatNumber(item.JumlahPemasukanTritier),
            escapeHtml(item.IdType),
        ]);
    });
    table.draw();
}

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    btnProses.disabled = false;

    var data = table.row(this).data();
    let sIdTrans = decodeHtmlEntities(data[1]);

    Tampil_Data(sIdTrans);

    transaksi.value = decodeHtmlEntities(data[1]);
    kode.value = decodeHtmlEntities(data[6]);
    type.value = decodeHtmlEntities(data[2]);
    primer.value = formatNumber(data[3]);
    sekunder.value = formatNumber(data[4]);
    triter.value = formatNumber(data[5]);
});

document.addEventListener('DOMContentLoaded', function () {
    LoadData();
    primer.value = '0';
    sekunder.value = '0';
    triter.value = '0';
});

function ClearForm() {
    divisi.value = '';
    objek.value = '';
    kelut.value = '';
    kelompok.value = '';
    subkel.value = '';
    subkelId.value = '';
    primer.value = '0';
    sekunder.value = '0';
    triter.value = '0';
    kode.value = '';
    type.value = '';
    transaksi.value = '';
}

function LoadData() {
    $.ajax({
        type: 'GET',
        url: 'AccReturPenjualan/loadData',
        data: {
            _token: csrfToken
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
                    text: 'Tidak ada Data yang ditampilkan.',
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Tampil_Data(sIdTrans) {
    $.ajax({
        type: 'GET',
        url: 'AccReturPenjualan/tampilData',
        data: {
            _token: csrfToken,
            IDTransaksi: sIdTrans,
        },
        success: function (result) {
            if (result.length !== 0) {
                divisi.value = decodeHtmlEntities(result[0].NamaDivisi);
                objek.value = decodeHtmlEntities(result[0].NamaObjek);
                kelut.value = decodeHtmlEntities(result[0].NamaKelompokUtama);
                kelompok.value = decodeHtmlEntities(result[0].NamaKelompok);
                subkel.value = decodeHtmlEntities(result[0].NamaSubKelompok);
                subkelId.value = decodeHtmlEntities(result[0].IdSubkelompok);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function proses() {
    $.ajax({
        type: 'PUT',
        url: 'AccReturPenjualan/proses',
        data: {
            _token: csrfToken,
            IDtransaksi: transaksi.value,
            IdType: kode.value,
            MasukPrimer: primer.value,
            MasukSekunder: sekunder.value,
            MasukTritier: triter.value,
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                }).then(() => {
                    LoadData();
                    ClearForm();
                    btnProses.disabled = true;
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Cek_Sesuai_Pemberi(sIdtrans) {
    $.ajax({
        type: 'GET',
        url: 'AccReturPenjualan/cekSesuai',
        data: {
            _token: csrfToken,
            idtransaksi: sIdtrans,
        },
        success: function (result) {
            if (result[0].jumlah >= 1) {
                Swal.fire({
                    icon: 'error',
                    text: 'Tidak ada Data yang Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type '
                        + decodeHtmlEntities(type.value) + ' Pada divisi pemberi',
                });
            }
            else {
                proses();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btnRefresh.addEventListener("click", function (e) {
    ClearForm();
    LoadData();
    btnProses.disabled = true;

});

btnProses.addEventListener("click", function (e) {
    Swal.fire({
        title: 'Yakin Akan Menyimpan Data ini ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            Cek_Sesuai_Pemberi(transaksi.value);
        }
    });
});
