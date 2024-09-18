var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var idType = document.getElementById('idType');

var saldoPrimer = document.getElementById('saldoPrimer');
var satPrimer = document.getElementById('satPrimer');

var saldoSekunder = document.getElementById('saldoSekunder');
var satSekunder = document.getElementById('satSekunder');

var saldoTritier = document.getElementById('saldoTritier');
var satTritier = document.getElementById('satTritier');

var tanggalAwal = document.getElementById('tanggalAwal');
var tanggalAkhir = document.getElementById('tanggalAkhir');
var btn_cari = document.getElementById('btn_cari');

var aturanKonversi = document.getElementById('aturanKonversi');
var aturanPrimerSekunder = document.getElementById('aturanPrimerSekunder');
var aturanSekunderTritier = document.getElementById('aturanSekunderTritier');

var today = new Date().toISOString().slice(0, 10);
tanggalAwal.value = today;
tanggalAkhir.value = today;

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        scrollY: '400px',
        autoWidth: false,
        scrollX: '100%',
        columns: [
            { title: 'TglAcc' },
            { title: 'Tgl Mohon' },
            { title: 'Type' },
            { title: 'Penerima' },
            { title: 'Pemberi' },
            { title: 'MskPrimer' },
            { title: 'MskSekunder' },
            { title: 'MskTritier' },
            { title: 'KlrPrimer' },
            { title: 'KlrSekunder' },
            { title: 'KlrTritier' },
            { title: 'Saldo Primer' },
            { title: 'Saldo Sekunder' },
            { title: 'Saldo Tritier' },
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
        columnDefs: [{ targets: [0], width: '6%', className: 'fixed-width' },
        { targets: [1], width: '6%', className: 'fixed-width' },
        { targets: [2], width: '13%', className: 'fixed-width' },
        { targets: [3], width: '6%', className: 'fixed-width' },
        { targets: [4], width: '6%', className: 'fixed-width' },
        { targets: [5], width: '5%', className: 'fixed-width' },
        { targets: [6], width: '5%', className: 'fixed-width' },
        { targets: [7], width: '5%', className: 'fixed-width' },
        { targets: [8], width: '5%', className: 'fixed-width' },
        { targets: [9], width: '5%', className: 'fixed-width' },
        { targets: [10], width: '5%', className: 'fixed-width' },
        { targets: [11], width: '8%', className: 'fixed-width' },
        { targets: [12], width: '8%', className: 'fixed-width' },
        { targets: [13], width: '8%', className: 'fixed-width'}]
    });
});

function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        // Function to format date as mm/dd/yyyy
        function formatDate(dateString) {
            var date = new Date(dateString);
            var month = date.getMonth() + 1; // Months are zero-based
            var day = date.getDate();
            var year = date.getFullYear();

            // Pad single digits with leading zeros
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;

            return month + '/' + day + '/' + year;
        }

        // Format SaatLog and SaatAwalTransaksi
        var formattedSaatLog = formatDate(item.SaatLog);
        var formattedSaatAwalTransaksi = formatDate(item.SaatAwalTransaksi);

        table.row.add([
            escapeHtml(formattedSaatLog),
            escapeHtml(formattedSaatAwalTransaksi),
            escapeHtml(item.TypeTransaksi),
            escapeHtml(item.nama_penerima),
            escapeHtml(item.nama_pemberi),
            formatNumber(item.JumlahPemasukanPrimer),
            formatNumber(item.JumlahPemasukanSekunder),
            formatNumber(item.JumlahPemasukanTritier),
            formatNumber(item.JumlahPengeluaranPrimer),
            formatNumber(item.JumlahPengeluaranSekunder),
            formatNumber(item.JumlahPengeluaranTritier),
            formatNumber(item.SaldoPrimer),
            formatNumber(item.SaldoSekunder),
            formatNumber(item.SaldoTritier),
            escapeHtml(item.IdType)
        ]);
    });

    table.draw();
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

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

$(document).ready(function () {
    var params = new URLSearchParams(window.location.search);

    var idTypeFromArray = params.get('IdType');
    var namaKelompokUtamaFromArray = params.get('NamaKelompokUtama');
    var namaKelompokFromArray = params.get('NamaKelompok');
    var namaSubKelompokFromArray = params.get('NamaSubKelompok');
    var kodeBarangFromArray = params.get('KodeBarang');
    var namaTypeFromArray = params.get('NamaType');
    var saldoPrimerFromArray = params.get('SaldoPrimer');
    var satPrimerFromArray = params.get('sat_primer');
    var saldoSekunderFromArray = params.get('SaldoSekunder');
    var satSekunderFromArray = params.get('sat_sekunder');
    var saldoTritierFromArray = params.get('SaldoTritier');
    var satTritierFromArray = params.get('sat_tritier');
    var idSubkelompokFromArray = params.get('IdSubkelompok');

    idType.value = idTypeFromArray;

    // saldoPrimer.value = saldoPrimerFromArray;
    // saldoSekunder.value = saldoSekunderFromArray;
    // saldoTritier.value = saldoTritierFromArray;

    // satPrimer.value = satPrimerFromArray;
    // satSekunder.value = satSekunderFromArray;
    // satTritier.value = satTritierFromArray;

    var table = $('#tableData').DataTable();

    $.ajax({
        type: 'GET',
        url: 'ListDetailTransaksi/getListDetail',
        data: {
            idtype: idType.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);
            }
            else {
                table.clear().draw();

                Swal.fire({
                    icon: 'info',
                    text: 'Tidak ada Transaksi untuk id type ' + idType.value,
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });

    $.ajax({
        type: 'GET',
        url: 'ListDetailTransaksi/getSaldoBarang',
        data: {
            IdType: idType.value,
            _token: csrfToken
        },
        success: function (result) {

            if (result.length !== 0) {
                saldoPrimer.value = formatNumber(result[0].SaldoPrimer);
                saldoSekunder.value = formatNumber(result[0].SaldoSekunder);
                saldoTritier.value = formatNumber(result[0].SaldoTritier);

                satPrimer.value = result[0].SatPrimer ?? 'NULL';
                satSekunder.value = result[0].SatSekunder ?? 'NULL';
                satTritier.value = result[0].SatTritier ?? 'NULL';


                if (result[0].PakaiAturanKonversi !== 'Y') {
                    aturanKonversi.textContent = 'Aturan Konversi: -';
                    aturanPrimerSekunder = 'Primer Ke Sekunder:';
                    aturanSekunderTritier = 'Sekunder Ke Tritier:';
                }
                else {
                    aturanKonversi.textContent = result[0].PakaiAturanKonversi;
                    aturanPrimerSekunder = result[0].KonvSekunderKePrimer;
                    aturanSekunderTritier = result[0].KonvTritierKeSekunder;
                }
            }

            else {
                table.clear().draw();

                saldoPrimer.value = '';
                saldoSekunder.value = '';
                saldoTritier.value = '';

                satPrimer.value = '';
                satSekunder.value = '';
                satTritier.value = '';
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });


    // button cari
    btn_cari.addEventListener("click", function (e) {

        var table = $('#tableData').DataTable();

        $.ajax({
            type: 'GET',
            url: 'ListDetailTransaksi/getListDataByDate',
            data: {
                id_brg: kodeBarangFromArray ? kodeBarangFromArray.trim() : '',
                id_subkel: idSubkelompokFromArray ? idSubkelompokFromArray.trim() : '',
                tgl_awal: tanggalAwal.value,
                tgl_akhir: tanggalAkhir.value,
                _token: csrfToken
            },
            success: function (result) {
                if (result.length !== 0) {
                    updateDataTable(result);
                } else {
                    table.clear().draw();

                    Swal.fire({
                        icon: 'info',
                        text: 'Tidak ada transaksi untuk kode barang ' + (kodeBarangFromArray ? kodeBarangFromArray.trim() : '')
                            + ' di tanggal ' + tanggalAwal.value
                            + ' hingga ' + tanggalAkhir.value,
                    });

                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });

    });
});
