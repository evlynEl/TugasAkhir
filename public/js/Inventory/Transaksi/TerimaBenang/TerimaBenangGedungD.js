var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Pemberi Benang Section
var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var tanggal = document.getElementById('tanggal');
var objekId = document.getElementById('objekId');
var objekNama = document.getElementById('objekNama');
var kelompokId = document.getElementById('kelompokId');
var kelompokNama = document.getElementById('kelompokNama');
var kelutId = document.getElementById('kelutId');
var kelutNama = document.getElementById('kelutNama');
var subkelId = document.getElementById('subkelId');
var subkelNama = document.getElementById('subkelNama');
var kodeType = document.getElementById('kodeType');
var pib = document.getElementById('pib');
var namaType = document.getElementById('namaType');
var kodeBarang = document.getElementById('kodeBarang');

// Penerima Benang Section
var sekunder = document.getElementById('sekunder');
var satuanSekunder = document.getElementById('satuanSekunder');
var tritier = document.getElementById('tritier');
var satuanTritier = document.getElementById('satuanTritier');
var alasanTransfer = document.getElementById('alasanTransfer');
var divisiIdPenerima = document.getElementById('divisiIdPenerima');
var divisiNamaPenerima = document.getElementById('divisiNamaPenerima');
var objekIdPenerima = document.getElementById('objekIdPenerima');
var objekNamaPenerima = document.getElementById('objekNamaPenerima');
var kelompokIdPenerima = document.getElementById('kelompokIdPenerima');
var kelompokNamaPenerima = document.getElementById('kelompokNamaPenerima');
var kelutIdPenerima = document.getElementById('kelutIdPenerima');
var kelutNamaPenerima = document.getElementById('kelutNamaPenerima');
var subkelIdPenerima = document.getElementById('subkelIdPenerima');
var subkelNamaPenerima = document.getElementById('subkelNamaPenerima');

// Buttons
var btn_divisi = document.getElementById('btn_divisi');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_kelut = document.getElementById('btn_kelut');
var btn_subkel = document.getElementById('btn_subkel');
var btn_namatype = document.getElementById('btn_namatype');
var btn_subkelPenerima = document.getElementById('btn_subkelPenerima');
var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');

alasanTransfer.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let alasanValue = alasanTransfer.value;

        if (alasanValue !== "") {
            let shift = alasanValue.charAt(0);
            if (shift !== "P" && shift !== "S" && shift !== "M" && shift !== "p" && shift !== "s" && shift !== "m") {
                Swal.fire({
                    icon: 'error',
                    text: "Penulisan Shift Salah, Tolong Dicek",
                    returnFocus: false
                }).then(() => {
                    alasanTransfer.focus();
                });
            } else {
                let tgl = alasanValue.substring(2, 10);

                let tglInput = document.getElementById('tanggal').value;

                let dateObj = new Date(tglInput);

                let day = String(dateObj.getDate()).padStart(2, '0');
                let month = String(dateObj.getMonth() + 1).padStart(2, '0');
                let year = String(dateObj.getFullYear()).slice(-2);

                let tgl1 = `${day}-${month}-${year}`;

                if (tgl === tgl1) {
                    let ktrg = alasanValue.slice(-3);
                    if (ktrg !== "EXP" && ktrg !== "exp") {
                        Swal.fire({
                            icon: 'error',
                            text: "Penulisan 'EXP' masih salah, Tolong Dicek",
                            returnFocus: false
                        }).then(() => {
                            alasanTransfer.focus();
                        });
                    } else {
                        alasanTransfer.value = alasanValue.toUpperCase();
                        btn_subkelPenerima.disabled = false;
                        btn_subkelPenerima.focus();
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: "Penulisan Alasan Transfer Salah!!\nCek Tanggal Mohon & Tanggal Alasan Transfer. Tanggal Harus Sama!!\nCek Juga Penulisan Yang Lainnya. FORMAT : 'Shift,DD-MM-YY,EXP'",
                        returnFocus: false
                    }).then(() => {
                        alasanTransfer.focus();
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                text: "Alasan Transfer Harus DiISI",
                returnFocus: false
            }).then(() => {
                alasanTransfer.focus();
            });
        }
    }
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


function tglServerFunction() {
    $.ajax({
        type: 'GET',
        url: 'TerimaBenangGedungD/getTglServer',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            tgl4 = result[0].tgl_server;

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

var jamNow;

function jamServerFunction() {
    $.ajax({
        type: 'GET',
        url: 'TerimaBenangGedungD/getJamServer',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            jamNow = result[0].jam_server;
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

var tabelApa;
document.addEventListener('DOMContentLoaded', function () {
    // Mengatur nilai default
    divisiId.value = 'DEX';
    divisiNama.value = 'Gedung D Mojosari Extruder';
    objekId.value = '279';
    objekNama.value = 'Bahan & Hasil Produksi';
    kelutId.value = '2250';
    kelutNama.value = 'Hasil Produksi';

    sekunder.value = 0;

    divisiIdPenerima.value = 'EXP';
    divisiNamaPenerima.value = 'EXPEDISI';
    objekIdPenerima.value = '147';
    objekNamaPenerima.value = 'Hasil Produksi Extruder';
    kelutIdPenerima.value = '0713';
    kelutNamaPenerima.value = 'Benang';
    kelompokIdPenerima.value = '8627';
    kelompokNamaPenerima.value = 'Stok Benang Expedisi Mojosari';

    tglServerFunction();

    var today = new Date().toISOString().split('T')[0];
    tanggal.value = today;

    Swal.fire({
        title: 'Tampilkan semua data?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            tabelApa = 1;
            showAllTable();
        }
        else {
            tabelApa = 0;
            showTable();
        }
    });
});


$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: true,
        columns: [
            { title: 'No Transaksi' },
            { title: 'Nama Barang' },
            { title: 'Kelompok Pemberi' },
            { title: 'Sub Klp Pemberi' },
            { title: 'Pemohon' },
            { title: 'Tgl Mohon' },
            { title: 'NoTransINV' },
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
        { targets: [1], width: '35%', className: 'fixed-width' },
        { targets: [2], width: '15%', className: 'fixed-width' },
        { targets: [3], width: '10%', className: 'fixed-width' },
        { targets: [4], width: '10%', className: 'fixed-width' },
        { targets: [5], width: '10%', className: 'fixed-width' },
        { targets: [6], width: '10%', className: 'fixed-width' },]
    });
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
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdHutExt),
            escapeHtml(item.NamaType),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.NamaUser),
            escapeHtml(item.SaatAwalTransaksi),
            escapeHtml(item.IdTransINV),
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


$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();
    let IdHut = data[0];
    let IdTrans = data[6];

    $.ajax({
        type: 'GET',
        url: 'TerimaBenangGedungD/getDetailData1',
        data: {
            XIdTransaksi: IdTrans,
            _token: csrfToken
        },
        success: function (result) {
            if (result) {
                subkelIdPenerima.value = decodeHtmlEntities(result[0].IdSubkelompok);
                subkelNamaPenerima.value = decodeHtmlEntities(result[0].NamaSubKelompok);
                sekunder.value = formatNumber(result[0].jumlahSekunder) ?? formatNumber(0);
                satuanSekunder.value = decodeHtmlEntities(result[0].Satuan_Sekunder);
                tritier.value = formatNumber(result[0].jumlahTritier) ?? formatNumber(0);
                satuanTritier.value = decodeHtmlEntities(result[0].Satuan_Tritier);
                alasanTransfer.value = decodeHtmlEntities(result[0].UraianDetailTransaksi);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });

    $.ajax({
        type: 'GET',
        url: 'TerimaBenangGedungD/getDetailData2',
        data: {
            XIdTransaksi: IdHut,
            _token: csrfToken
        },
        success: function (result) {
            if (result) {
                kelutId.value = decodeHtmlEntities(result[0].IdKelompokUtama);
                kelompokId.value = decodeHtmlEntities(result[0].IdKelompok);
                subkelId.value = decodeHtmlEntities(result[0].IdSubkelompok);
                kelutNama.value = decodeHtmlEntities(result[0].NamaKelompokUtama);
                kelompokNama.value = decodeHtmlEntities(result[0].NamaKelompok);
                subkelNama.value = decodeHtmlEntities(result[0].NamaSubKelompok);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
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
                            url: "TerimaBenangGedungD/getKelompok",
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

                subkelId.value = '';
                subkelNama.value = '';

                btn_subkel.disabled = false;
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
                            url: "TerimaBenangGedungD/getSubkel",
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

                namaType.value = '';
                kodeType.value = '';

                btn_namatype.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$('#tritier').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (tritier.value == 0) {
            Swal.fire({
                icon: 'error',
                text: 'Jumlah Benang Tidak boleh Nol.',
                returnFocus: false
            }).then(() => {
                tritier.focus();
            });
        }
        else {
            alasanTransfer.readOnly = false;
            alasanTransfer.focus();
        }
    }
});

var p;
var s;
var t;
var pl;
var sl;
var tl;

// button list Kode Type
btn_namatype.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Kode Type',
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
            width: '55%',
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
                            url: "TerimaBenangGedungD/getIdType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value
                            }
                        },
                        columns: [
                            { data: "IdType" },
                            { data: "NamaType" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '200px',
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
                kodeType.value = decodeHtmlEntities(result.value.IdType.trim());
                namaType.value = decodeHtmlEntities(result.value.NamaType.trim());

                $.ajax({
                    type: 'GET',
                    url: 'TerimaBenangGedungD/getType',
                    data: {
                        IdType: kodeType.value,
                        IdSubKel: subkelId.value,
                        _token: csrfToken
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            namaType.value = decodeHtmlEntities(result[0].NamaType.trim());
                            kodeBarang.value = decodeHtmlEntities(result[0].KodeBarang.trim());
                            pib.value = result[0].PIB ? decodeHtmlEntities(result[0].PIB.trim()) : '';

                            $.ajax({
                                type: 'GET',
                                url: 'TerimaBenangGedungD/getSatuanPemohon',
                                data: {
                                    XKodeBarang: kodeBarang.value,
                                    XIdSubKelompok: subkelId.value,
                                    _token: csrfToken
                                },
                                success: function (result) {
                                    if (result.length !== 0) {
                                        p = result[0].satuan_primer ?? 'Null';
                                        s = result[0].satuan_sekunder ?? 'Null';
                                        t = result[0].satuan_tritier ?? 'Null';

                                        tritier.readOnly = false;
                                        satuanTritier.readOnly = false;
                                        tritier.focus();

                                        if (p.trim() == 'Null' && s.trim() == 'Null' && t.trim() == 'Null') {
                                            $.ajax({
                                                type: 'GET',
                                                url: 'TerimaBenangGedungD/getKodeBarangPenerima',
                                                data: {
                                                    XKodeBarang: kodeBarang.value,
                                                    XIdSubKelompok: subkelId.value,
                                                    _token: csrfToken
                                                },
                                                success: function (result) {
                                                    if (result.length !== 0) {
                                                        pl = result[0].satuan_primer ?? 'Null';
                                                        sl = result[0].satuan_sekunder ?? 'Null';
                                                        tl = result[0].satuan_tritier ?? 'Null';
                                                        satuanTritier.value = tl;

                                                        if (pl.trim() === p.trim()) {
                                                            if (sl.trim() === s.trim()) {
                                                                if (tl.trim() === t.trim()) {

                                                                    tritier.readOnly = false;
                                                                    satuanTritier.readOnly = false;
                                                                    tritier.focus();
                                                                }
                                                                else {
                                                                    Swal.fire({
                                                                        icon: 'error',
                                                                        text: 'Satuan harus terisi, jika ingin transaksi!!....Koreksi pada Maintenance Type Barang per Divisi, untuk Divisi ' + divisiNama.value,
                                                                    });
                                                                }
                                                            } else {
                                                                Swal.fire({
                                                                    icon: 'error',
                                                                    text: 'Satuan harus terisi, jika ingin transaksi!!....Koreksi pada Maintenance Type Barang per Divisi, untuk Divisi ' + divisiNama.value,
                                                                });
                                                                tritier.readOnly = true;
                                                                satuanTritier.readOnly = true;
                                                            }
                                                        } else {
                                                            Swal.fire({
                                                                icon: 'error',
                                                                text: 'Satuan harus terisi, jika ingin transaksi!!....Koreksi pada Maintenance Type Barang per Divisi, untuk Divisi ' + divisiNama.value,
                                                            });
                                                            tritier.readOnly = true;
                                                            satuanTritier.readOnly = true;
                                                        }
                                                    }
                                                },
                                                error: function (xhr, status, error) {
                                                    console.error('Error:', error);
                                                }
                                            });
                                        }
                                    }
                                },
                                error: function (xhr, status, error) {
                                    console.error('Error:', error);
                                }
                            });
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: 'Tidak ada barang: ' + kodeType.value + ' pada sub kelompok ' + subkelId.value + '.',
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// btn subkel bawah
btn_subkelPenerima.addEventListener("click", function (e) {
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
                            url: "TerimaBenangGedungD/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelompokId: kelompokIdPenerima.value
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
                subkelIdPenerima.value = decodeHtmlEntities(result.value.IdSubkelompok.trim());
                subkelNamaPenerima.value = decodeHtmlEntities(result.value.NamaSubKelompok.trim());

                if (subkelIdPenerima.value) {
                    $.ajax({
                        type: 'GET',
                        url: 'TerimaBenangGedungD/cekKodeBarangType',
                        data: {
                            XKodeBarang: kodeBarang.value.trim(),
                            XIdSubKelompok: subkelIdPenerima.value,
                            _token: csrfToken
                        },
                        success: function (result) {
                            if (result[0].Jumlah == 0) {
                                Swal.fire({
                                    icon: 'error',
                                    text: "Tidak ada barang : " + (decodeHtmlEntities(namaType.value.trim())) + ' pada Divisi/SubKelompok : '
                                        + (decodeHtmlEntities(divisiNamaPenerima.value.trim())) + '/'
                                        + (decodeHtmlEntities(subkelNamaPenerima.value.trim())),
                                    returnFocus: false
                                }).then(() => {
                                    btn_subkelPenerima.focus();
                                });
                            }
                            else {
                                $.ajax({
                                    type: 'GET',
                                    url: 'TerimaBenangGedungD/getKodeBarangPenerima',
                                    data: {
                                        XKodeBarang: kodeBarang.value,
                                        XIdSubKelompok: subkelIdPenerima.value,
                                        _token: csrfToken
                                    },
                                    success: function (result) {
                                        if (result.length !== 0) {
                                            pl = result[0].satuan_primer ?? 'Null';
                                            sl = result[0].satuan_sekunder ?? 'Null';
                                            tl = result[0].satuan_tritier ?? 'Null';
                                            satuanTritier.value = tl;

                                            if (pl.trim() === p.trim()) {
                                                if (sl.trim() === s.trim()) {
                                                    if (tl.trim() === t.trim()) {

                                                        btn_proses.disabled = false;
                                                        btn_proses.focus();
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: 'error',
                                                            text: 'Divisi PENERIMA dan Divisi PEMBERI tidak terdapat aturan konversi!!.., maka Satuan Primer,Satuan Sekunder,Satuan Tritier kedua divisi HARUS SAMA!!.., untuk Divisi PENERIMA koreksi dulu pada menu Maintenance Type Barang per Divisi',
                                                        });
                                                    }
                                                } else {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        text: 'Divisi PENERIMA dan Divisi PEMBERI tidak terdapat aturan konversi!!.., maka Satuan Primer,Satuan Sekunder,Satuan Tritier kedua divisi HARUS SAMA!!.., untuk Divisi PENERIMA koreksi dulu pada menu Maintenance Type Barang per Divisi',
                                                    });
                                                    btn_proses.disabled = true;
                                                }
                                            } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    text: 'Divisi PENERIMA dan Divisi PEMBERI tidak terdapat aturan konversi!!.., maka Satuan Primer,Satuan Sekunder,Satuan Tritier kedua divisi HARUS SAMA!!.., untuk Divisi PENERIMA koreksi dulu pada menu Maintenance Type Barang per Divisi',
                                                });
                                                btn_proses.disabled = true;
                                            }
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.error('Error:', error);
                                    }
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error('Error:', error);
                        }
                    });
                }
                else {
                    btn_subkelPenerima.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var pil;

var j;
var jam, jam1;
var tgl, tgl3, tgl4;

btn_isi.addEventListener("click", function (e) {
    btn_batal.disabled = false;

    tgl3 = tanggal.value;
    tglServerFunction();
    jamServerFunction();

    $.ajax({
        type: 'GET',
        url: 'TerimaBenangGedungD/getListAdaHutang',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            if (result[0].ada == 0) {
                pil = 1;
                btn_isi.disabled = true;
                btn_proses.disabled = true;
                $('.divTable').hide();
                clearText();
                btn_kelompok.disabled = false;
                btn_kelompok.focus();
            }

            else {
                $.ajax({
                    type: 'GET',
                    url: 'TerimaBenangGedungD/getTglHutang',
                    data: {
                        _token: csrfToken
                    },
                    success: function (result) {
                        tgl = result[0].tgl;
                        jam1 = result[0].jam;

                        let tglDate = new Date(tgl);
                        let tglDate3 = new Date(tgl3);
                        let tglDate4 = new Date(tgl4);

                        let year = tglDate.getFullYear();
                        let month = String(tglDate.getMonth() + 1).padStart(2, '0'); // Month (01-12)
                        let day = String(tglDate.getDate()).padStart(2, '0'); // Day (01-31)

                        let formattedDate = `${year}-${month}-${day}`;

                        let year3 = tglDate3.getFullYear();
                        let month3 = String(tglDate3.getMonth() + 1).padStart(2, '0'); // Month (01-12)
                        let day3 = String(tglDate3.getDate()).padStart(2, '0'); // Day (01-31)

                        let monthInt = parseInt(month);
                        let monthInt3 = parseInt(month3);

                        let dayInt = parseInt(day);
                        let dayInt3 = parseInt(day3);

                        let jamDate = new Date(jamNow);

                        let jamHH = String(jamDate.getHours()).padStart(2, '0'); // Hour (00-23)
                        let menitMM = String(jamDate.getMinutes()).padStart(2, '0'); // Minutes (00-59)

                        let timeServer = `${jamHH}:${menitMM}`;

                        if ((monthInt < monthInt3) || (year < year3)) {
                            if (monthInt === 1 || monthInt === 3 || monthInt === 5
                                || monthInt === 7 || monthInt === 8 || monthInt === 10 || monthInt === 12) {
                                if (dayInt3 === 1 && dayInt === 31) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 1 && dayInt === 30 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 1 && dayInt === 30 && timeServer < "15:01" && tglDate3 !== tglDate4) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 2 && dayInt === 31 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 2 && dayInt === 31 && timeServer < "15:01" && tglDate3 !== tglDate4) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if ((dayInt3 === 1 && dayInt === 30 && timeServer >= "15:01" && tglDate3 === tglDate4)
                                    || (dayInt3 === 1 && dayInt === 30 && timeServer >= "15:01" && tglDate3 !== tglDate4)
                                ) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if ((dayInt3 === 2 && dayInt === 31 && timeServer >= "15:01" && tglDate3 === tglDate4)
                                    || (dayInt3 === 2 && dayInt === 31 && timeServer >= "15:01" && tglDate3 !== tglDate4)
                                ) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 1 && dayInt < 30) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 2 && dayInt < 31) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 > 2 && dayInt <= 31) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                            }
                            else if (monthInt === 4 || monthInt === 6 || monthInt === 9 || monthInt === 11) {
                                if (dayInt3 === 1 && dayInt === 30) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 1 && dayInt === 29 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 1 && dayInt === 29 && timeServer < "15:01" && tglDate3 !== tglDate4) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 2 && dayInt === 30 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 2 && dayInt === 30 && timeServer < "15:01" && tglDate3 !== tglDate4) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if ((dayInt3 === 1 && dayInt === 29 && timeServer >= "15:01" && tglDate3 === tglDate4)
                                    || (dayInt3 === 1 && dayInt === 29 && timeServer >= "15:01" && tglDate3 !== tglDate4)
                                ) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if ((dayInt3 === 2 && dayInt === 30 && timeServer >= "15:01" && tglDate3 === tglDate4)
                                    || (dayInt3 === 2 && dayInt === 30 && timeServer >= "15:01" && tglDate3 !== tglDate4)
                                ) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 1 && dayInt < 29) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 === 2 && dayInt < 30) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                                else if (dayInt3 > 2 && dayInt <= 30) {
                                    pil = 1;
                                    btn_isi.disabled = true;
                                    btn_proses.disabled = true;
                                    $('.divTable').hide();
                                    clearText();
                                    btn_kelompok.disabled = false;
                                    btn_kelompok.focus();
                                }
                            }
                            else if (monthInt === 2) {
                                function formatNumber(num) {
                                    let formatted = num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                    return formatted;
                                }
                                let a = new Date(tglDate3).getFullYear() / 4;
                                let a1 = formatNumber(a);
                                a1 = a1.slice(-2);

                                if (a1 === '00') {
                                    if (dayInt3 === 1 && dayInt === 29) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 1 && dayInt === 28 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 1 && dayInt === 28 && timeServer < "15:01" && tglDate3 !== tglDate4) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 2 && dayInt === 29 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 2 && dayInt === 29 && timeServer < "15:01" && tglDate3 !== tglDate4) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if ((dayInt3 === 1 && dayInt === 28 && timeServer >= "15:01" && tglDate3 === tglDate4)
                                        || (dayInt3 === 1 && dayInt === 28 && timeServer >= "15:01" && tglDate3 !== tglDate4)
                                    ) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if ((dayInt3 === 2 && dayInt === 29 && timeServer >= "15:01" && tglDate3 === tglDate4)
                                        || (dayInt3 === 2 && dayInt === 29 && timeServer >= "15:01" && tglDate3 !== tglDate4)
                                    ) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 1 && dayInt < 28) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 2 && dayInt < 29) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 > 2 && dayInt <= 29) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                }
                                else {
                                    if (dayInt3 === 1 && dayInt === 28) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 1 && dayInt === 27 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 1 && dayInt === 27 && timeServer < "15:01" && tglDate3 !== tglDate4) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 2 && dayInt === 28 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 2 && dayInt === 28 && timeServer < "15:01" && tglDate3 !== tglDate4) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if ((dayInt3 === 1 && dayInt === 27 && timeServer >= "15:01" && tglDate3 === tglDate4)
                                        || (dayInt3 === 1 && dayInt === 27 && timeServer >= "15:01" && tglDate3 !== tglDate4)
                                    ) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if ((dayInt3 === 2 && dayInt === 28 && timeServer >= "15:01" && tglDate3 === tglDate4)
                                        || (dayInt3 === 2 && dayInt === 28 && timeServer >= "15:01" && tglDate3 !== tglDate4)
                                    ) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 1 && dayInt < 27) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 === 2 && dayInt < 28) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                    else if (dayInt3 > 2 && dayInt <= 28) {
                                        pil = 1;
                                        btn_isi.disabled = true;
                                        btn_proses.disabled = true;
                                        $('.divTable').hide();
                                        clearText();
                                        btn_kelompok.disabled = false;
                                        btn_kelompok.focus();
                                    }
                                }
                            }
                        }
                        else if (monthInt === monthInt3 && year === year3) {
                            let s = dayInt3 - dayInt;

                            if (formattedDate === tgl3) {
                                pil = 1;
                                btn_isi.disabled = true;
                                btn_proses.disabled = true;
                                $('.divTable').hide();
                                clearText();
                                btn_kelompok.disabled = false;
                                btn_kelompok.focus();
                            }
                            else if (formattedDate < tgl3 && s === 2 && timeServer >= "15:01" && tglDate3 === tglDate4) {
                                pil = 1;
                                btn_isi.disabled = true;
                                btn_proses.disabled = true;
                                $('.divTable').hide();
                                clearText();
                                btn_kelompok.disabled = false;
                                btn_kelompok.focus();
                            }
                            else if (formattedDate < tgl3 && s === 2 && timeServer < "15:01" && tglDate3 === tglDate4) {
                                pil = 1;
                                btn_isi.disabled = true;
                                btn_proses.disabled = true;
                                $('.divTable').hide();
                                clearText();
                                btn_kelompok.disabled = false;
                                btn_kelompok.focus();
                            }
                            else if (formattedDate < tgl3 && s > 2) {
                                pil = 1;
                                btn_isi.disabled = true;
                                btn_proses.disabled = true;
                                $('.divTable').hide();
                                clearText();
                                btn_kelompok.disabled = false;
                                btn_kelompok.focus();
                            }
                            else if (formattedDate < tgl3 && s === 1) {
                                pil = 1;
                                btn_isi.disabled = true;
                                btn_proses.disabled = true;
                                $('.divTable').hide();
                                clearText();
                                btn_kelompok.disabled = false;
                                btn_kelompok.focus();
                            }
                            else if (formattedDate > tgl3) {
                                pil = 1;
                                btn_isi.disabled = true;
                                btn_proses.disabled = true;
                                $('.divTable').hide();
                                clearText();
                                btn_kelompok.disabled = false;
                                btn_kelompok.focus();
                            }
                            else if (formattedDate < tgl3 && s === 2 && tglDate3 !== tglDate4) {
                                pil = 1;
                                btn_isi.disabled = true;
                                btn_proses.disabled = true;
                                $('.divTable').hide();
                                clearText();
                                btn_kelompok.disabled = false;
                                btn_kelompok.focus();
                            }
                        }
                        else if (monthInt > monthInt3 && year === year3) {
                            pil = 1;
                            btn_isi.disabled = true;
                            btn_proses.disabled = true;
                            $('.divTable').hide();
                            clearText();
                            btn_kelompok.disabled = false;
                            btn_kelompok.focus();
                        }

                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });

            }

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });

});

btn_proses.addEventListener("click", function (e) {
    $.ajax({
        type: 'GET',
        url: 'TerimaBenangGedungD/cekPenyesuaianTransaksi',
        data: {
            kodeBarang: kodeBarang.value,
            idSubKel: subkelIdPenerima.value,
            PIB: pib.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result[0].jumlah >= 1) {
                Swal.fire({
                    icon: 'error',
                    text: 'Tidak Bisa Input!!! Karena Ada Transaksi Penyesuaian yang Belum diACC untuk type : '
                        + (decodeHtmlEntities(result[0].IdType.trim())) + ', Nama Type: ' + (decodeHtmlEntities(namaType.value.trim()))
                        + ' Pada divisi ' + (decodeHtmlEntities(divisiNamaPenerima.value.trim())),
                }).then(() => {
                    showAllTable();
                    return;
                });
            }
            else {
                $.ajax({
                    type: 'GET',
                    url: 'TerimaBenangGedungD/cekHutang',
                    data: {
                        awal: tanggal.value,
                        jmlS: sekunder.value,
                        jumlah: tritier.value,
                        asal: subkelId.value.trim(),
                        tujuan: subkelIdPenerima.value.trim(),
                        Detail: alasanTransfer.value.trim(),
                        kodeBarang: kodeBarang.value.trim(),
                        PIB: pib.value.trim(),
                        _token: csrfToken
                    },
                    success: function (result) {
                        if (result[0].ada > 0) {
                            Swal.fire({
                                title: 'PESAN!!!!',
                                html: "Data Terima Benang Utk Tgl " + tanggal.value + ", Spek Benang: " + (decodeHtmlEntities(namaType.value)) + "<br>" +
                                    "Asal: " + (decodeHtmlEntities(kelompokNama.value)) + ", " + (decodeHtmlEntities(subkelNama.value)) +
                                    ". Tujuan: " + (decodeHtmlEntities(kelompokNamaPenerima.value)) + ", " + (decodeHtmlEntities(subkelNamaPenerima.value)) + "<br><br>" +
                                    "Sudah Ada. Tolong DiCEK Dulu!!!<br><br>" +
                                    "Apa Anda Yakin Mau di Input Lagi????",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Ya',
                                cancelButtonText: 'Tidak'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    insertHutang();
                                }
                                else {
                                    //
                                }
                            });
                        }
                        else {
                            insertHutang();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

function insertHutang() {
    $.ajax({
        type: 'PUT',
        url: 'TerimaBenangGedungD/insertHutangExt',
        data: {
            idType: kodeType.value,
            awal: tanggal.value,
            jmlS: sekunder.value,
            jumlah: tritier.value,
            asal: subkelId.value,
            tujuan: subkelIdPenerima.value,
            Detail: alasanTransfer.value,
            kodeBarang: kodeBarang.value,
            saatawal: tanggal.value,
            JumlahSekunder: sekunder.value,
            JumlahTritier: tritier.value,
            AsalSubKel: subkelId.value,
            TujSubkel: subkelIdPenerima.value,
            _token: csrfToken
        },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.success,
            }).then(() => {
                if (tabelApa === 1) {
                    showAllTable();
                    clearText();
                    btn_isi.disabled = false;
                    btn_proses.disabled = true;
                    btn_batal.disabled = true;
                    tanggal.focus();
                } else if (tabelApa === 0) {
                    showTable();
                    clearText();
                    btn_isi.disabled = false;
                    btn_proses.disabled = true;
                    btn_batal.disabled = true;
                    tanggal.focus();
                }
            });

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function clearText() {
    kelompokId.value = '';
    subkelId.value = '';
    // kelutNama.value = '';
    subkelNama.value = '';
    subkelIdPenerima.value = '';
    subkelNamaPenerima.value = '';
    kodeType.value = '';
    kodeBarang.value = '';
    namaType.value = '';
    tritier.value = 0;
    sekunder.value = 0;
    alasanTransfer.value = '';
    alasanTransfer.readOnly = true;
    satuanTritier.value = '';
    satuanSekunder.value = '';

    btn_kelompok.disabled = true;
    btn_kelompok.disabled = true;
    btn_subkel.disabled = true;
    btn_subkelPenerima.disabled = true;
}

btn_batal.addEventListener("click", function (e) {
    clearText();
    btn_proses.disabled = true;
    btn_isi.disabled = false;
    btn_batal.disabled = true;
    if (tabelApa === 1) {
        showAllTable();
    }
    else if (tabelApa === 0) {
        showTable();
    }
});

function showAllTable() {
    $.ajax({
        type: 'GET',
        url: 'TerimaBenangGedungD/getAllListHutangExt',
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken
        },
        success: function (result) {
            updateDataTable(result);
            $('.divTable').show();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function showTable() {
    $.ajax({
        type: 'GET',
        url: 'TerimaBenangGedungD/getListHutangExt',
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken
        },
        success: function (result) {
            updateDataTable(result);
            $('.divTable').show();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}
