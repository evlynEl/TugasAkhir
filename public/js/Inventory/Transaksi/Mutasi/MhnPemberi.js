var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var btnDivisi = document.getElementById('btn_divisi');
var tanggal = document.getElementById('tanggal');
var objekId = document.getElementById('objekId');
var objekNama = document.getElementById('objekNama');
var btnObjek = document.getElementById('btn_objek');
var kelompokId = document.getElementById('kelompokId');
var kelompokNama = document.getElementById('kelompokNama');
var btnKelompok = document.getElementById('btn_kelompok');
var kelutId = document.getElementById('kelutId');
var kelutNama = document.getElementById('kelutNama');
var btnKelut = document.getElementById('btn_kelut');
var subkelId = document.getElementById('subkelId');
var subkelNama = document.getElementById('subkelNama');
var btnSubkel = document.getElementById('btn_subkel');
var idType = document.getElementById('idType');
var kodeBarang = document.getElementById('kodeBarang');
var pib = document.getElementById('pib');
var primer = document.getElementById('primer');
var satuanPrimer = document.getElementById('satuanPrimer');
var type = document.getElementById('type');
var btnType = document.getElementById('btn_type');
var sekunder = document.getElementById('sekunder');
var satuanSekunder = document.getElementById('satuanSekunder');
var jmlKeranjang = document.getElementById('jmlKeranjang');
var tritier = document.getElementById('tritier');
var satuanTritier = document.getElementById('satuanTritier');
var primer3 = document.getElementById('primer3');
var sekunder3 = document.getElementById('sekunder3');
var tritier3 = document.getElementById('tritier3');

var primer2 = document.getElementById('primer2');
var sekunder2 = document.getElementById('sekunder2');
var tritier2 = document.getElementById('tritier2');
var satuanPrimer2 = document.getElementById('satuanPrimer2');
var satuanSekunder2 = document.getElementById('satuanSekunder2');
var satuanTritier2 = document.getElementById('satuanTritier2');


var divisiId2 = document.getElementById('divisiId2');
var divisiNama2 = document.getElementById('divisiNama2');
var btnDivisi2 = document.getElementById('btn_divisi2');
var idTransaksi = document.getElementById('idTransaksi');
var objekId2 = document.getElementById('objekId2');
var objekNama2 = document.getElementById('objekNama2');
var btnObjek2 = document.getElementById('btn_objek2');
var kelompokId2 = document.getElementById('kelompokId2');
var kelompokNama2 = document.getElementById('kelompokNama2');
var btnKelompok2 = document.getElementById('btn_kelompok2');
var kelutId2 = document.getElementById('kelutId2');
var kelutNama2 = document.getElementById('kelutNama2');
var btnKelut2 = document.getElementById('btn_kelut2');
var subkelId2 = document.getElementById('subkelId2');
var subkelNama2 = document.getElementById('subkelNama2');
var btnSubkel2 = document.getElementById('btn_subkel2');

var btnIsi = document.getElementById('btn_isi');
var btnProses = document.getElementById('btn_proses');
var btnBatal = document.getElementById('btn_batal');
var btnKoreksi = document.getElementById('btn_koreksi');
var btnHapus = document.getElementById('btn_hapus');

var today = new Date().toISOString().slice(0, 10);
tanggal.value = (today);

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

var idUser;

function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'MhnPemberi/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            idUser = result.user;
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}


$(document).ready(function () {
    getUserId();
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kode' },
            { title: 'Nama Barang' },
            { title: 'Alasan Mutasi' },
            { title: 'Kelut Pemberi' },
            { title: 'Kel Pemberi' },
            { title: 'SubKel Pemberi' },
            { title: 'Pemohon' },
            { title: 'Tgl Mohon' },
        ]
    });
});

function ClearForm() {
    // Clear text inputs
    kelutId.value = '';
    kelutNama.value = '';
    kelompokId.value = '';
    kelompokNama.value = '';
    subkelId.value = '';
    subkelNama.value = '';
    idType.value = '';
    kodeBarang.value = '';
    type.value = '';
    // pib.value = '';
    primer.value = 0;
    satuanPrimer.value = '';
    sekunder.value = 0;
    satuanSekunder.value = '';
    jmlKeranjang.value = '';
    tritier.value = 0;
    satuanTritier.value = '';
    primer3.value = 0;
    sekunder3.value = 0;
    tritier3.value = 0;

    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;

    // Clear second set of inputs
    divisiId2.value = '';
    divisiNama2.value = '';
    objekId2.value = '';
    objekNama2.value = '';
    kelompokId2.value = '';
    kelompokNama2.value = '';
    kelutId2.value = '';
    kelutNama2.value = '';
    subkelId2.value = '';
    subkelNama2.value = '';
    idTransaksi.value = '';

    satuanPrimer2.value = '';
    satuanSekunder2.value = '';
    satuanTritier2.value = '';

    primer2.disabled = false;
    sekunder2.disabled = false;
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
            item.UraianDetailTransaksi ? escapeHtml(item.UraianDetailTransaksi) : '',
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.IdPemberi),
            formatDateToMMDDYYYY(item.SaatAwalTransaksi),
            escapeHtml(item.NamaDivisi),
            escapeHtml(item.NamaObjek),
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

function Tombol(angka) {
    if (angka === 1) {
        btnIsi.disabled = false;
        btnHapus.disabled = false;
        btnKoreksi.disabled = false;
        btnProses.disabled = true;
        btnIsi.focus();
    }
    else {
        btnIsi.disabled = true;
        btnHapus.disabled = true;
        btnKoreksi.disabled = true;
        if (Pil === 1) {
            btnProses.disabled = true;
        }
        else {
            btnProses.disabled = false;
        }
    }
}

function OrderText(angka) {
    if (angka === 1) {
        btnDivisi.disabled = false;
    }
    else if (angka === 2) {
        btnKelut.disabled = true;
        btnKelompok.disabled = true;
        btnSubkel.disabled = true;
        btnType.disabled = true;
        btnDivisi2.disabled = true;
        btnObjek2.disabled = true;
        btnKelut2.disabled = true;
        btnKelompok2.disabled = true;
        btnSubkel2.disabled = true;
    }
    else if (angka === 3) {
        btnKelut.disabled = true;
        btnKelompok.disabled = true;
        btnSubkel.disabled = true;
        btnType.disabled = true;
        btnDivisi2.disabled = false;
        btnObjek2.disabled = false;
        btnKelut2.disabled = false;
        btnKelompok2.disabled = false;
        btnSubkel2.disabled = false;
    }
}

var Pil;
document.addEventListener("DOMContentLoaded", function () {
    $('.keranjang').hide();
    $('.kosong').show();
    Pil = 0;
    OrderText(1);
    btnDivisi.focus();
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getDivisi",
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
                divisiId.value = decodeHtmlEntities(result.value.IdDivisi.trim());
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());

                if (divisiId.value === 'EXP') {
                    $('.keranjang').show();
                    $('.kosong').hide();
                }
                btnObjek.disabled = false;
                btnObjek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var Pilih;
var tgl1, tgl2;

// button list objek
btnObjek.addEventListener("click", function (e) {

    kelutId.value = '';
    kelutNama.value = '';
    kelompokId.value = '';
    kelompokNama.value = '';
    subkelId.value = '';
    subkelNama.value = '';
    Pilih = 0;

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
                        order: [0, "asc"],
                        ajax: {
                            url: "MhnPemberi/getObjek",
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
                objekId.value = decodeHtmlEntities(result.value.IdObjek.trim());
                objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());

                Swal.fire({
                    title: 'Menampilkan Semua Data ??..',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak',
                    returnFocus: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Tgl Awal (bln/tgl/thn) :',
                            html: '<input type="date" id="tglAwal" class="swal2-input">',
                            showCancelButton: true,
                            confirmButtonText: 'Ok',
                            cancelButtonText: 'Cancel',
                            returnFocus: false,
                            didOpen: () => {
                                const today = new Date().toISOString().split('T')[0];
                                document.getElementById('tglAwal').value = today;
                            },
                            preConfirm: () => {
                                return document.getElementById('tglAwal').value;
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                tgl1 = formatDateToMMDDYYYY(result.value);
                                Swal.fire({
                                    title: 'Tgl Akhir (bln/tgl/thn) :',
                                    html: '<input type="date" id="tglAkhir" class="swal2-input">',
                                    showCancelButton: true,
                                    confirmButtonText: 'Ok',
                                    cancelButtonText: 'Cancel',
                                    returnFocus: false,
                                    didOpen: () => {
                                        const today = new Date().toISOString().split('T')[0];
                                        document.getElementById('tglAkhir').value = today;
                                    },
                                    preConfirm: () => {
                                        return document.getElementById('tglAkhir').value;
                                    },
                                    didClose: () => {
                                        Tombol(1);
                                    },
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tgl2 = formatDateToMMDDYYYY(result.value);
                                        TampilAllData();
                                    }
                                });
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            title: 'Tgl Awal (bln/tgl/thn) :',
                            html: '<input type="date" id="tglAwal" class="swal2-input">',
                            showCancelButton: true,
                            confirmButtonText: 'Ok',
                            cancelButtonText: 'Cancel',
                            returnFocus: false,
                            didOpen: () => {
                                const today = new Date().toISOString().split('T')[0];
                                document.getElementById('tglAwal').value = today;
                            },
                            preConfirm: () => {
                                return document.getElementById('tglAwal').value;
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                tgl1 = formatDateToMMDDYYYY(result.value);
                                Swal.fire({
                                    title: 'Tgl Akhir (bln/tgl/thn) :',
                                    html: '<input type="date" id="tglAkhir" class="swal2-input">',
                                    showCancelButton: true,
                                    confirmButtonText: 'Ok',
                                    cancelButtonText: 'Cancel',
                                    returnFocus: false,
                                    didOpen: () => {
                                        const today = new Date().toISOString().split('T')[0];
                                        document.getElementById('tglAkhir').value = today;
                                    },
                                    didClose: () => {
                                        Tombol(1);
                                    },
                                    preConfirm: () => {
                                        return document.getElementById('tglAkhir').value;
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tgl2 = formatDateToMMDDYYYY(result.value);
                                        TampilData();
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });
    } catch (error) {
        console.error(error);
    }
});

function TampilAllData() {
    $.ajax({
        type: 'GET',
        url: 'MhnPemberi/tampilAllData',
        data: {
            XIdDivisi: divisiId.value,
            XIdObjek: objekId.value,
            tgl1: tgl1,
            tgl2: tgl2,
            _token: csrfToken
        },
        success: function (result) {
            var table = $('#tableData').DataTable();

            if (result.length !== 0) {
                updateDataTable(result);
            }
            else {
                table.clear().draw();
                Swal.fire({
                    icon: 'info',
                    title: 'Tidak ada Data Yang DiKirim Oleh Divisi : ' + decodeHtmlEntities(divisiNama.value),
                    returnFocus: false,
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function TampilData() {
    $.ajax({
        type: 'GET',
        url: 'MhnPemberi/tampilData',
        data: {
            XIdDivisi: divisiId.value,
            XIdObjek: objekId.value,
            tgl1: tgl1,
            tgl2: tgl2,
            _token: csrfToken
        },
        success: function (result) {
            var table = $('#tableData').DataTable();

            if (result.length !== 0) {
                updateDataTable(result);
            }
            else {
                table.clear().draw();
                Swal.fire({
                    icon: 'info',
                    title: 'Tidak ada Data Yang DiKirim Oleh User : ' + decodeHtmlEntities(idUser),
                    returnFocus: false,
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btnIsi.addEventListener("click", function (e) {
    Pil = 1;
    OrderText(2);
    Tombol(2);
    ClearForm();
    btnKelut.disabled = false;
    btnKelut.focus();
});

// button list kelompok utama
btnKelut.addEventListener("click", function (e) {
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getKelUt",
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
                kelutId.value = decodeHtmlEntities(result.value.IdKelompokUtama.trim());
                kelutNama.value = decodeHtmlEntities(result.value.NamaKelompokUtama.trim());
                btnKelompok.disabled = false;
                btnKelompok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
btnKelompok.addEventListener("click", function (e) {
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getKelompok",
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
                kelompokId.value = decodeHtmlEntities(result.value.idkelompok.trim());
                kelompokNama.value = decodeHtmlEntities(result.value.namakelompok.trim());

                btnSubkel.disabled = false;
                btnSubkel.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
btnSubkel.addEventListener("click", function (e) {
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getSubkel",
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
                subkelId.value = decodeHtmlEntities(result.value.IdSubkelompok.trim());
                subkelNama.value = decodeHtmlEntities(result.value.NamaSubKelompok.trim());

                btnType.disabled = false;
                btnType.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


function Load_Type_ABM() {
    try {
        Swal.fire({
            title: 'Barang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID Type</th>
                        <th scope="col">Type</th>
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getTypeABM",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value.trim(),
                            }
                        },
                        columns: [
                            { data: "idtype" },
                            { data: "BARU" },
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
                idType.value = decodeHtmlEntities(result.value.idtype.trim());
                type.value = decodeHtmlEntities(result.value.BARU.trim());

                btnDivisi2.disabled = false;
                btnDivisi2.focus();

                LoadPIB();

            }
        });
    } catch (error) {
        console.error(error);
    }
}


function Load_Type_CIR() {
    try {
        Swal.fire({
            title: 'Barang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID Type</th>
                        <th scope="col">Type</th>
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getTypeCIR",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            }
                        },
                        columns: [
                            { data: "Id_Type" },
                            { data: "Nm_Type" },
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
                idType.value = result.value.Id_Type ? decodeHtmlEntities(result.value.Id_Type.trim()) : '';
                type.value = result.value.Nm_Type ? decodeHtmlEntities(result.value.Nm_Type.trim()) : '';

                btnDivisi2.disabled = false;
                btnDivisi2.focus();

                LoadPIB();

            }
        });
    } catch (error) {
        console.error(error);
    }
}

function Load_Type() {
    try {
        Swal.fire({
            title: 'Barang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID Type</th>
                        <th scope="col">Type</th>
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPemberi/getType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value.trim(),
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
                idType.value = decodeHtmlEntities(result.value.IdType.trim());
                type.value = decodeHtmlEntities(result.value.NamaType.trim());

                btnDivisi2.disabled = false;
                btnDivisi2.focus();

                LoadPIB();

            }
        });
    } catch (error) {
        console.error(error);
    }
}

function Load_Saldo(sIdtype) {
    $.ajax({
        type: 'GET',
        url: 'MhnPemberi/getSaldo',
        data: {
            IdType: sIdtype,
            _token: csrfToken
        },
        success: function (result) {
            if (result) {
                primer.value = result[0].SaldoPrimer ? formatNumber(result[0].SaldoPrimer) : formatNumber(0);
                sekunder.value = result[0].SaldoSekunder ? formatNumber(result[0].SaldoSekunder) : formatNumber(0);
                tritier.value = result[0].SaldoTritier ? formatNumber(result[0].SaldoTritier) : formatNumber(0);

                satuanPrimer.value = result[0].SatPrimer ? decodeHtmlEntities(result[0].SatPrimer) : 'NULL';
                satuanSekunder.value = result[0].SatSekunder ? decodeHtmlEntities(result[0].SatSekunder) : 'NULL';
                satuanTritier.value = result[0].SatTritier ? decodeHtmlEntities(result[0].SatTritier) : 'NULL';

                kodeBarang.value = decodeHtmlEntities(result[0].KodeBarang);
                pib.value = result[0].PIB ? decodeHtmlEntities(result[0].PIB) : '';

                primer3.value = 0;
                sekunder3.value = 0;
                tritier3.value = 0;

                Load_JumlahAntrian(sIdtype);

            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Load_JumlahAntrian(sIdtype) {
    console.log(sIdtype);
    
    $.ajax({
        type: 'GET',
        url: 'MhnPemberi/getJumlahAntrian',
        data: {
            IdType: sIdtype,
            _token: csrfToken
        },
        success: function (result) {
            console.log(result);
            
            if (result.length !== 0) {
                primer3.value = result[0].OutPrimer ? formatNumber(result[0].OutPrimer) : formatNumber(0);
                sekunder3.value = result[0].OutSekunder ? formatNumber(result[0].OutSekunder) : formatNumber(0);
                tritier3.value = result[0].OutTritier ? formatNumber(result[0].OutTritier) : formatNumber(0);

                if (divisiId.value === 'EXP') {
                    jmlKeranjang.focus();
                }
                else {
                    btnDivisi2.disabled = false;
                    btnDivisi2.focus();
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function LoadPIB() {
    $.ajax({
        type: 'GET',
        url: 'MhnPemberi/loadPib',
        data: {
            IdType: idType.value,
            IdSubKel: subkelId.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result[0].IdType === idType.value.trim()) {
                pib.value = result[0].PIB ? decodeHtmlEntities(result[0].PIB) : '';
            }
            Load_Saldo(idType.value);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btnType.addEventListener("click", function (e) {
    if ((divisiId.value === 'ABM' && objekId.value === '022') || (divisiId.value === 'CIR' && objekId.value === '043')
        || (divisiId.value === 'JBB' && objekId.value === '042')
        || (divisiId.value === 'LMT' && objekId.value === '086' && kelutId.value === '0325')
        || (divisiId.value === 'EXT' && (kelompokId.value === '1259' || kelompokId.value === '1283'))) {
        if (divisiId.value === 'ABM' && objekId.value === '022' && kelompokId.value !== '0292') {
            Load_Type_ABM();
        }
        else {
            $.ajax({
                type: 'PUT',
                url: 'MhnPemberi/insertTempType',
                data: {
                    XIdDivisi: divisiId.value,
                    XIdSubKelompok: subkelId.value,
                    _token: csrfToken
                },
                success: function (response) {
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });

            Load_Type_CIR();

        }
    }
    else {
        Load_Type();
    }

    // LoadPIB();

    // if (idType.value === '') {
    //     Load_Saldo(idType.value);

    //     if (divisiId.value === 'EXP') {
    //         jmlKeranjang.focus();
    //     }
    //     else {
    //         btnDivisi2.disabled = false;
    //         btnDivisi2.focus();
    //     }
    // }
});