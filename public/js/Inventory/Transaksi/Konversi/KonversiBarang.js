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

var btnNamaType = document.getElementById('btn_namatype');

var btnBatal = document.getElementById('btn_batal');

var btn_objek = document.getElementById('btn_objek');
var btn_kelut = document.getElementById('btn_kelut');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_subkel = document.getElementById('btn_subkel');
var btn_prosesAsal = document.getElementById('btn_prosesAsal');
var btn_prosesTujuan = document.getElementById('btn_prosesTujuan');

var asalP = document.getElementById('asalP');
var asalS = document.getElementById('asalS');
var asalT = document.getElementById('asalT');
var tujuanP = document.getElementById('tujuanP');
var tujuanS = document.getElementById('tujuanS');
var tujuanT = document.getElementById('tujuanT');

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

    primerKonversiAsal.value = 0;
    sekunderKonversiAsal.value = 0;
    triterKonversiAsal.value = 0;
    primerKonversiTujuan.value = 0;
    sekunderKonversiTujuan.value = 0;
    triterKonversiTujuan.value = 0;
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
        else if (result.dismiss === Swal.DismissReason.backdrop) {
            return;
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
btnDivisi.addEventListener("click", function (e) {

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
                            url: "KonversiBarang/getObjek",
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
                            url: "KonversiBarang/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                objekId: objekIdAsal.value
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
                kelutIdAsal.value = result.value.IdKelompokUtama.trim();
                kelutNamaAsal.value = result.value.NamaKelompokUtama.trim();
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
                            url: "KonversiBarang/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelutId: kelutIdAsal.value
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
                kelompokIdAsal.value = result.value.idkelompok.trim();
                kelompokNamaAsal.value = result.value.namakelompok.trim();
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
                            url: "KonversiBarang/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelompokId: kelompokIdAsal.value
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
                subkelIdAsal.value = result.value.IdSubkelompok.trim();
                subkelNamaAsal.value = result.value.NamaSubKelompok.trim();
                btnNamaType.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


// button list Kode Type
btnNamaType.addEventListener("click", function (e) {
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
                            url: "KonversiBarang/getIdType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelIdAsal.value
                            }
                        },
                        columns: [
                            { data: "IdType" },
                            { data: "NamaType" },
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
                kodeTypeAsal.value = decodeHtmlEntities(result.value.IdType.trim());
                namaTypeAsal.value = decodeHtmlEntities(result.value.NamaType.trim());

                $.ajax({
                    type: 'GET',
                    url: 'KonversiBarang/getSaldo',
                    data: {
                        IdType: kodeTypeAsal.value,
                        _token: csrfToken
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            primerAkhirAsal.value = formatNumber(result[0].SaldoPrimer) ?? '';
                            sekunderAkhirAsal.value = formatNumber(result[0].SaldoSekunder) ?? '';
                            triterAkhirAsal.value = formatNumber(result[0].SaldoTritier) ?? '';
                            asalP.innerText = decodeHtmlEntities(result[0].SatPrimer.trim()) ?? '';
                            asalS.innerText = decodeHtmlEntities(result[0].SatSekunder.trim()) ?? '';
                            asalT.innerText = decodeHtmlEntities(result[0].SatTritier.trim()) ?? '';
                        }
                        else {
                            primerAkhirAsal.value = '';
                            sekunderAkhirAsal.value = '';
                            triterAkhirAsal.value = '';
                            asalP.innerText = '';
                            asalS.innerText = '';
                            asalT.innerText = '';
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });

                primerKonversiAsal.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var keluar = 0;

$('#primerKonversiAsal').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        if (StKonversi === 1 || StKonversi === 2) {
            $.ajax({
                type: 'GET',
                url: 'KonversiBarang/getJumlahAntrian',
                data: {
                    IdType: kodeTypeAsal.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result[0]) {
                        keluar = (result[0].OutPrimer) ?? 0;
                    }

                    if ((parseFloat(primerAkhirAsal.value) - (keluar + parseFloat(primerKonversiAsal.value))) < 0) {
                        Swal.fire({
                            icon: 'error',
                            text: 'Saldo primer = ' + String(parseInt(primerAkhirAsal.value))
                                + '  Jumlah primer pada transaksi yang belum diacc = '
                                + String(keluar) + '  Jadi Saldo primer tinggal = ' +
                                String(parseInt(primerAkhirAsal.value) - keluar),
                        }).then(() => {
                            primerKonversiAsal.value = 0;
                            primerKonversiAsal.focus();
                        });
                    }
                    else {
                        sekunderKonversiAsal.focus();
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    }
});

$('#sekunderKonversiAsal').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        if (StKonversi === 1 || StKonversi === 2) {
            $.ajax({
                type: 'GET',
                url: 'KonversiBarang/getJumlahAntrian',
                data: {
                    IdType: kodeTypeAsal.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result[0]) {
                        keluar = (result[0].OutSekunder) ?? 0; 
                    }
                    
                    if ((parseFloat(sekunderAkhirAsal.value) - (keluar + parseFloat(sekunderKonversiAsal.value))) < 0) {
                        Swal.fire({
                            icon: 'error',
                            text: 'Saldo sekunder = ' + String(parseInt(sekunderAkhirAsal.value))
                                + '  Jumlah sekunder pada transaksi yang belum diacc = '
                                + String(keluar) + '  Jadi Saldo sekunder tinggal = ' +
                                String(parseInt(sekunderAkhirAsal.value) - keluar),
                        }).then(() => {
                            sekunderKonversiAsal.value = 0;
                            sekunderKonversiAsal.focus();
                        });
                    }
                    else {
                        btn_prosesAsal.disabled = false;
                        triterKonversiAsal.focus();
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    }
});

$('#triterKonversiAsal').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        if (StKonversi === 1 || StKonversi === 2) {
            $.ajax({
                type: 'GET',
                url: 'KonversiBarang/getJumlahAntrian',
                data: {
                    IdType: kodeTypeAsal.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result[0]) {
                        keluar = (result[0].OutTritier) ?? 0;
                    }

                    if ((parseFloat(triterAkhirAsal.value) - (keluar + parseFloat(triterKonversiAsal.value))) < 0) {
                        Swal.fire({
                            icon: 'error',
                            text: 'Saldo tritier = ' + String(parseInt(triterAkhirAsal.value))
                                + '  Jumlah tritier pada transaksi yang belum diacc = '
                                + String(keluar) + '  Jadi Saldo tritier tinggal = ' +
                                String(parseInt(triterAkhirAsal.value) - keluar),
                        }).then(() => {
                            triterKonversiAsal.value = 0;
                            triterKonversiAsal.focus();
                        });
                    }
                    else {
                        if ((divisiIdAsal.value === 'ABM' && objekIdAsal.value === '022'
                            && (subkelIdAsal.value !== '006193' && subkelIdAsal.value !== '006634' && kelompokIdAsal !== '2543'))
                            || (divisiIdAsal.value === 'JBB' && objekIdAsal.value === '042' && kelompokIdAsal.value !== '2432')
                            || (divisiIdAsal.value === 'EXT' && (kelompokIdAsal.value === '1259' && kelutIdAsal.value === '1283'))
                        ) {
                            console.log(triterKonversiAsal.value);
                            
                            Hitung_Hsl_Mtr();
                        }
                        if (divisiIdAsal.value === 'CIR' && objekIdAsal.value === '043') {
                            if (triterKonversiAsal.value > 0) {
                                Hitung_Hsl_Mtr();
                            }
                        }
                        btn_prosesAsal.focus();
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    }
});

function Hitung_Hsl_Mtr() {
    let Lebar = 0, waft = 0, weft = 0, denier = 0, jum = 0;

    for (let i = 0; i < namaTypeAsal.value.trim().length; i++) {
        if (namaTypeAsal.value.charAt(i) === "/") {
            jum += 1;
            switch (jum) {
                case 1:
                    Lebar = parseFloat(namaTypeAsal.value.substr(i + 1, 6));
                    break;
                case 2:
                    waft = parseFloat(namaTypeAsal.value.substr(i + 1, 5));
                    weft = parseFloat(namaTypeAsal.value.substr(i + 9, 5));
                    break;
                case 3:
                    denier = parseFloat(namaTypeAsal.value.substr(i + 1, 5));
                    break;
            }
        }
    }

    let Hitung_Hsl_Mtr;

    if (subkelIdAsal.value === "0629" || subkelNamaAsal.value.startsWith("KAIN") || subkelNamaAsal.value.startsWith("Kain No Lami")) {
        Hitung_Hsl_Mtr = (10 / (Lebar / 2)) / ((waft + weft) / 20) / (denier * 2 / 2000) / 0.0175;
    } else {
        Hitung_Hsl_Mtr = (10 / Lebar) / ((waft + weft) / 20) / (denier * 2 / 2000) / 0.0175;
    }

    Hitung_Hsl_Mtr = Math.round(Hitung_Hsl_Mtr * 10) / 10;

    console.log("Hitung_Hsl_Mtr:", Hitung_Hsl_Mtr);
}

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