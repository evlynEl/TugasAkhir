var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Assign elements to variables by their IDs
var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var btnDivisi = document.getElementById('btn_divisi');
var tanggal = document.getElementById('tanggal');

var kodeKonversi = document.getElementById('kodeKonversi');

var kodeAsal = document.getElementById('kodeAsal');
var btnIsiAsal = document.getElementById('btn_isiAsal');
var btnKoreksiAsal = document.getElementById('btn_koreksiAsal');
var btnHapusAsal = document.getElementById('btn_hapusAsal');

var kodeTujuan = document.getElementById('kodeTujuan');
var btnIsiTujuan = document.getElementById('btn_isiTujuan');
var btnKoreksiTujuan = document.getElementById('btn_koreksiTujuan');
var btnHapusTujuan = document.getElementById('btn_hapusTujuan');

var btnBatal = document.getElementById('btn_batal');

// asal
var tanggalAsal = document.getElementById('tanggalAsal');
var divisiIdAsal = document.getElementById('divisiIdAsal');
var divisiNamaAsal = document.getElementById('divisiNamaAsal');
var objekIdAsal = document.getElementById('objekIdAsal');
var objekNamaAsal = document.getElementById('objekNamaAsal');
var kelutIdAsal = document.getElementById('kelutIdAsal');
var kelutNamaAsal = document.getElementById('kelutNamaAsal');
var kelompokIdAsal = document.getElementById('kelompokIdAsal');
var kelompokNamaAsal = document.getElementById('kelompokNamaAsal');
var subkelIdAsal = document.getElementById('subkelIdAsal');
var subkelNamaAsal = document.getElementById('subkelNamaAsal');
var kodeBarangAsal = document.getElementById('kodeBarangAsal');
var kodeTypeAsal = document.getElementById('kodeTypeAsal');
var namaTypeAsal = document.getElementById('namaTypeAsal');
var uraianAsal = document.getElementById('uraianAsal');
var primerAkhirAsal = document.getElementById('primerAkhirAsal');
var sekunderAkhirAsal = document.getElementById('sekunderAkhirAsal');
var triterAkhirAsal = document.getElementById('triterAkhirAsal');
var primerKonversiAsal = document.getElementById('primerKonversiAsal');
var sekunderKonversiAsal = document.getElementById('sekunderKonversiAsal');
var triterKonversiAsal = document.getElementById('triterKonversiAsal');

// Tujuan
var tanggalTujuan = document.getElementById('tanggalTujuan');
var divisiIdTujuan = document.getElementById('divisiIdTujuan');
var divisiNamaTujuan = document.getElementById('divisiNamaTujuan');
var objekIdTujuan = document.getElementById('objekIdTujuan');
var objekNamaTujuan = document.getElementById('objekNamaTujuan');
var kelutIdTujuan = document.getElementById('kelutIdTujuan');
var kelutNamaTujuan = document.getElementById('kelutNamaTujuan');
var kelompokIdTujuan = document.getElementById('kelompokIdTujuan');
var kelompokNamaTujuan = document.getElementById('kelompokNamaTujuan');
var subkelIdTujuan = document.getElementById('subkelIdTujuan');
var subkelNamaTujuan = document.getElementById('subkelNamaTujuan');
var kodeBarangTujuan = document.getElementById('kodeBarangTujuan');
var kodeTypeTujuan = document.getElementById('kodeTypeTujuan');
var namaTypeTujuan = document.getElementById('namaTypeTujuan');
var uraianTujuan = document.getElementById('uraianTujuan');
var primerAkhirTujuan = document.getElementById('primerAkhirTujuan');
var sekunderAkhirTujuan = document.getElementById('sekunderAkhirTujuan');
var triterAkhirTujuan = document.getElementById('triterAkhirTujuan');
var primerKonversiTujuan = document.getElementById('primerKonversiTujuan');
var sekunderKonversiTujuan = document.getElementById('sekunderKonversiTujuan');
var triterKonversiTujuan = document.getElementById('triterKonversiTujuan');

var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kode Konversi' },
            { title: 'Tgl. Transaksi' },
        ]
    });

    $('#tableAsal').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kd. Konversi' },
            { title: 'Kd. Transaksi' },
            { title: 'Nm. Barang' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
            { title: 'Pemohon' },
        ]
    });

    $('#tableTujuan').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kd. Konversi' },
            { title: 'Kd. Transaksi' },
            { title: 'Nm. Barang' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
            { title: 'Pemohon' },
        ]
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

function updateDataTable(data, angka) {
    var table = $('#tableData').DataTable();
    var tableAsal = $('#tableAsal').DataTable();
    var tableTujuan = $('#tableTujuan').DataTable();

    if (angka === 1) {
        table.clear();
        data.forEach(function (item) {
            table.row.add([
                escapeHtml(item.IdKonversi),
                formatDateToMMDDYYYY(item.SaatTransaksi),
            ]);
        });
        table.draw();
    }
    else if (angka === 2) {
        tableAsal.clear();
        data.forEach(function (item) {
            tableAsal.row.add([
                escapeHtml(item.IdKonversi),
                escapeHtml(item.IdTransaksi),
                escapeHtml(item.NamaType),
                escapeHtml(item.NamaObjek),
                escapeHtml(item.NamaKelompokUtama),
                escapeHtml(item.NamaKelompok),
                escapeHtml(item.NamaSubKelompok),
                escapeHtml(item.IdPenerima),
                escapeHtml(item.IdType),
            ]);
        });
        tableAsal.draw();
    }
    else if (angka === 3) {
        tableTujuan.clear();
        data.forEach(function (item) {
            tableTujuan.row.add([
                escapeHtml(item.IdKonversi),
                escapeHtml(item.IdTransaksi),
                escapeHtml(item.NamaType),
                escapeHtml(item.NamaObjek),
                escapeHtml(item.NamaKelompokUtama),
                escapeHtml(item.NamaKelompok),
                escapeHtml(item.NamaSubKelompok),
                escapeHtml(item.IdPenerima),
                escapeHtml(item.IdType),
            ]);
        });
        tableTujuan.draw();
    }

}

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

var Tgl;

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    kodeKonversi.value = decodeHtmlEntities(data[0]);
    Load_DataAsal();
    Load_DataTujuan();

    Tgl = formatDateToMMDDYYYY(data[1]);

    kodeAsal.value = '';
    kodeTujuan.value = '';
});

$('#tableAsal tbody').on('click', 'tr', function () {
    var table = $('#tableAsal').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    kodeAsal.value = decodeHtmlEntities(data[1]);
});

$('#tableTujuan tbody').on('click', 'tr', function () {
    var table = $('#tableTujuan').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    kodeTujuan.value = decodeHtmlEntities(data[1]);
});

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

var StKonversi;
var IsiAsal;
var KodeKonversiAsal;
var KodeKonversiTujuan;

btnIsiAsal.addEventListener("click", function (e) {

    StKonversi = 1;

    Swal.fire({
        title: 'Membentuk Kode Konversi Baru ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            IsiAsal = 1;
            divisiIdAsal.value = divisiId.value;
            divisiNamaAsal.value = divisiNama.value;
            uraianAsal.value = 'Asal Konversi';
            tanggalAsal.value = tanggal.value;
            $('#modalAsalKonversi').modal('show');
        }
        else {
            if (kodeKonversi.value === '') {
                Swal.fire({
                    icon: 'error',
                    text: 'Pilih dulu Kd.Konversinya!!!..',
                });
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: 'Isi Data Asal Konversi, dng Kd.Konversi:  ' + kodeKonversi.value,
                }).then(() => {
                    var tgl = new Date(Tgl);

                    var year = tgl.getFullYear();
                    var month = (tgl.getMonth() + 1).toString().padStart(2, '0');
                    var day = tgl.getDate().toString().padStart(2, '0');

                    var formattedDate = `${year}-${month}-${day}`;

                    tanggalAsal.value = formattedDate;
                    IsiAsal = 2;
                    divisiIdAsal.value = divisiId.value;
                    divisiNamaAsal.value = divisiNama.value;
                    uraianAsal.value = 'Asal Konversi';
                    KodeKonversiAsal = kodeKonversi.value;
                    $('#modalAsalKonversi').modal('show');
                });
            }
        }
    });

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
                            url: "KonversiBarang/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" },
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
                divisiId.value = result.value.IdDivisi.trim();
                divisiNama.value = result.value.NamaDivisi.trim();
                clearText();
                Load_DataKonversi();
                Load_Data_All_Asal();
                Load_Data_All_Tujuan();
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
                        order: [0, "asc"],
                        ajax: {
                            url: "KartuStok/getObjek",
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
                objekIdAsal.value = result.value.IdObjek.trim();
                objekNamaAsal.value = result.value.NamaObjek.trim();
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
                        order: [0, "asc"],
                        ajax: {
                            url: "KartuStok/getKelUt",
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
                kelutId.value = result.value.IdKelompokUtama.trim();
                kelutNama.value = result.value.NamaKelompokUtama.trim();
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
                            url: "KartuStok/getKelompok",
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
                kelompokId.value = result.value.idkelompok.trim();
                kelompokNama.value = result.value.namakelompok.trim();
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
                            url: "KartuStok/getSubkel",
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
                subkelId.value = result.value.IdSubkelompok.trim();
                subkelNama.value = result.value.NamaSubKelompok.trim();
                btn_ok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


function clearText() {
    kodeKonversi.value = '';
    kodeAsal.value = '';
    kodeTujuan.value = '';

    var table = $('#tableData').DataTable();
    var tableAsal = $('#tableAsal').DataTable();
    var tableTujuan = $('#tableTujuan').DataTable();
    table.clear().draw();
    tableAsal.clear().draw();
    tableTujuan.clear().draw();
}

function Load_DataKonversi() {
    $.ajax({
        type: 'GET',
        url: 'KonversiBarang/loadDataKonversi',
        data: {
            _token: csrfToken,
            XIdDivisi: divisiId.value,
        },
        success: function (result) {
            updateDataTable(result, 1);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Load_Data_All_Asal() {
    $.ajax({
        type: 'GET',
        url: 'KonversiBarang/loadAllDataAsal',
        data: {
            _token: csrfToken,
            XIdDivisi: divisiId.value,
        },
        success: function (result) {
            updateDataTable(result, 2);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Load_Data_All_Tujuan() {
    $.ajax({
        type: 'GET',
        url: 'KonversiBarang/loadAllDataTujuan',
        data: {
            _token: csrfToken,
            XIdDivisi: divisiId.value,
        },
        success: function (result) {
            updateDataTable(result, 3);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Load_DataAsal() {
    $.ajax({
        type: 'GET',
        url: 'KonversiBarang/loadDataAsal',
        data: {
            _token: csrfToken,
            XIdDivisi: divisiId.value,
            IdKonversi: kodeKonversi.value,
        },
        success: function (result) {
            updateDataTable(result, 2);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Load_DataTujuan() {
    $.ajax({
        type: 'GET',
        url: 'KonversiBarang/loadDataTujuan',
        data: {
            _token: csrfToken,
            XIdDivisi: divisiId.value,
            IdKonversi: kodeKonversi.value,
        },
        success: function (result) {
            updateDataTable(result, 3);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}