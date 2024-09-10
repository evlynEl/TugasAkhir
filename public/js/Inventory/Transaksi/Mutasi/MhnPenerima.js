var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var tanggal = document.getElementById('tanggal');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var user = document.getElementById('user');

var divisiNama = document.getElementById('divisiNama');
var objekNama = document.getElementById('objekNama');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var divisiNama2 = document.getElementById('divisiNama2');
var objekNama2 = document.getElementById('objekNama2');
var kelompokNama2 = document.getElementById('kelompokNama2');
var kelutNama2 = document.getElementById('kelutNama2');
var subkelNama2 = document.getElementById('subkelNama2');

var kodeTransaksi = document.getElementById('kodeTransaksi');
var PIB = document.getElementById('PIB');
var kodeBarang = document.getElementById('kodeBarang');
var kodeType = document.getElementById('kodeType');
var namaBarang = document.getElementById('namaBarang');
var alasan = document.getElementById('alasan');
var primer = document.getElementById('primer');
var sekunder = document.getElementById('sekunder');
var tritier = document.getElementById('tritier');
var no_primer = document.getElementById('no_primer');
var no_sekunder = document.getElementById('no_sekunder');
var no_tritier = document.getElementById('no_tritier');
var primer2 = document.getElementById('primer2');
var sekunder2 = document.getElementById('sekunder2');
var tritier2 = document.getElementById('tritier2');

var primer3 = document.getElementById('primer3');
var sekunder3 = document.getElementById('sekunder3');
var tritier3 = document.getElementById('tritier3');
var no_primer3 = document.getElementById('no_primer3');
var no_sekunder3 = document.getElementById('no_sekunder3');
var no_tritier3 = document.getElementById('no_tritier3');

var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var kelompokId = document.getElementById('kelompokId');
var kelutId = document.getElementById('kelutId');
var subkelId = document.getElementById('subkelId');
var divisiId2 = document.getElementById('divisiId2');
var objekId2 = document.getElementById('objekId2');
var kelompokId2 = document.getElementById('kelompokId2');
var kelutId2 = document.getElementById('kelutId2');
var subkelId2 = document.getElementById('subkelId2');

// button
var btn_divisi = document.getElementById('btn_divisi');
var btn_objek = document.getElementById('btn_objek');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_kelut = document.getElementById('btn_kelut');
var btn_subkel = document.getElementById('btn_subkel');
var btn_divisi2 = document.getElementById('btn_divisi2');
var btn_objek2 = document.getElementById('btn_objek2');
var btn_kelompok2 = document.getElementById('btn_kelompok2');
var btn_kelut2 = document.getElementById('btn_kelut2');
var btn_subkel2 = document.getElementById('btn_subkel2');
var btn_kodeType = document.getElementById('btn_kodeType');

var btn_namaBarang = document.getElementById('btn_namaBarang');
var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

var baris3 = document.querySelectorAll('#baris-3 input');

let a; // isi = 1, koreksi = 2, hapus = 3
let tampil; // all data = 1, not all = 2
let terima;
let konvTerima;
let konvBeri;
let kdBarang;
let asalSubkel;

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));
tanggal.value = todayString;
btn_divisi2.focus();

baris3.forEach(function (input) {
    input.disabled = true;
});


// fungsi berhubungan dengan ENTER & pengecekkan yg kosong2
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.id === 'primer3') {
                if (primer3.value > primer.value) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning',
                        html: `Saldo Primernya Tinggal: ${primer.value}`,
                        returnFocus: false
                    });
                } else {
                    sekunder3.select();
                }
            } else if (masuk.id === 'sekunder3') {
                if (sekunder3.value > sekunder.value) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning',
                        html: `Saldo Sekundernya Tinggal: ${sekunder.value}`,
                        returnFocus: false
                    });
                } else {
                    tritier3.select();
                }
            } else if (masuk.id === 'tritier3') {
                if (konvBeri !== 'Y') {
                    if (tritier3.value > tritier.value && objekId.value !== '099') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Warning',
                            html: `Saldo Tritiernya Tinggal: ${tritier.value}`,
                            returnFocus: false
                        }).then(() => {
                            tritier3.value = 0;
                            tritier3.select();
                        });
                    } else if (tritier3.value === '0' && sekunder3.value === '0' && primer3.value === '0' && objekId.value !== '099') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Warning',
                            html: `Barang Yang Dimutasikan Harus Lebih besar 0`,
                            returnFocus: false
                        });
                    } else {
                        alasan.focus();
                    }

                } else {
                    if (tritier3.value > 0) {
                        if (no_primer.value === no_primer3.value) {
                            alasan.focus();
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Warning',
                                html: `Satuan Tritier harus sama !!...,yaitu= ${no_tritier.value}`,
                                returnFocus: false
                            });
                        }
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Warning',
                            html: `Tritier tidak boleh 0(nol)!!`,
                            returnFocus: false
                        });
                    }
                }
            } else if (masuk.id === 'alasan') {
                if (tritier3.value === '0' && sekunder3.value === '0' && primer3.value === '0') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning',
                        html: `Jumlah yg Di BON tdk boleh = 0`,
                        returnFocus: false
                    });
                }
                if (a === 1) {
                    btn_isi.focus();
                } else if (a === 2) {
                    btn_koreksi.focus();
                } else {
                    btn_hapus.focus();
                }
            }
        }
    })
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
        url: 'MhnPenerima/getUserId',
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

btn_objek.disabled = true;
btn_kelut.disabled = true;
btn_kelompok.disabled = true;
btn_subkel.disabled = true;
btn_namaBarang.disabled = true;

// button list divisi penerima
btn_divisi2.addEventListener("click", function (e) {
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
                            url: "MhnPenerima/getDivisi2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" }
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
                divisiId2.value = result.value.IdDivisi.trim();
                divisiNama2.value = decodeHtmlEntities(result.value.NamaDivisi.trim());

                if (divisiNama2.value !== '') {
                    btn_objek2.disabled = false;
                    btn_objek2.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list divisi pemberi
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPenerima/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" }
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
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());

                btn_objek.disabled = false;
                btn_objek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list objek penerima
btn_objek2.addEventListener("click", function (e) {
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPenerima/getObjek2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisiId2: divisiId2.value
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" }
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
                objekId2.value = result.value.IdObjek.trim();
                objekNama2.value = decodeHtmlEntities(result.value.NamaObjek.trim());
                if (objekNama2.value !== '') {
                    Swal.fire({
                        icon: 'question',
                        title: 'Menampilkan Semua Data?',
                        showCancelButton: true,
                        confirmButtonText: 'Ya',
                        cancelButtonText: 'Tidak',
                        returnFocus: false,
                    }).then((confirmResult) => {
                        if (confirmResult.isConfirmed) {
                            tampil = 1;
                            showAllTable();
                            // btn_isi.focus();
                        } else {
                            tampil = 2;
                            showTable();
                            // btn_isi.focus();
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPenerima/getObjek",
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
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());
                btn_kelut.focus();

                if (objekNama.value !== '') {
                    btn_kelut.disabled = false;
                    btn_kelut.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok utama penerima
btn_kelut2.addEventListener("click", function (e) {
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
                            url: "MhnPenerima/getKelUt2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                objekId2: objekId2.value
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
                kelutId2.value = result.value.IdKelompokUtama.trim();
                kelutNama2.value = decodeHtmlEntities(result.value.NamaKelompokUtama.trim());

                if (kelutNama2.value !== '') {
                    btn_kelompok2.disabled = false;
                    btn_kelompok2.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

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
                            url: "MhnPenerima/getKelUt",
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
                kelutNama.value = decodeHtmlEntities(result.value.NamaKelompokUtama.trim());

                if (kelutNama.value !== '') {
                    btn_kelompok.disabled = false;
                    btn_kelompok.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok penerima
btn_kelompok2.addEventListener("click", function (e) {
    subkelId2.value = '';
    subkelNama2.value = '';

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
                            url: "MhnPenerima/getKelompok2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelutId2: kelutId2.value
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
                kelompokId2.value = result.value.idkelompok.trim();
                kelompokNama2.value = decodeHtmlEntities(result.value.namakelompok.trim());

                if (kelutNama2.value !== '') {
                    btn_subkel2.disabled = false;
                    btn_subkel2.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPenerima/getKelompok",
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
                kelompokNama.value = decodeHtmlEntities(result.value.namakelompok.trim());

                if (kelutNama.value !== '') {
                    btn_subkel.disabled = false;
                    btn_subkel.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok penerima
btn_subkel2.addEventListener("click", function (e) {
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
                            url: "MhnPenerima/getSubkel2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelompokId2: kelompokId2.value
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
                subkelId2.value = result.value.IdSubkelompok.trim();
                subkelNama2.value = result.value.NamaSubKelompok.trim();

                btn_divisi.disabled = false;
                btn_divisi.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPenerima/getSubkel",
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

                btn_namaBarang.disabled = false;
                btn_namaBarang.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_namaBarang.addEventListener("click", function (e) {
    if (subkelNama2.value === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Sub Kelompok Kosong!',
            text: `Pilih dulu Sub Kelompoknya!!`,
            returnFocus: false
        }).then(() => {
            btn_divisi2.focus();
        });
    }

    try {
        Swal.fire({
            title: 'Kode Barang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Kode Barang</th>
                            <th scope="col">Nama Barang</th>
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
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPenerima/getSubkelType",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                subkelId: subkelId.value
                            }
                        },
                        columns: [
                            { data: "IdType" },
                            { data: "NamaType" }
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
                kodeType.value = result.value.IdType.trim();
                namaBarang.value = result.value.NamaType.trim();

                loadKdBarang(kodeType.value);

                if (PIB.value !== '') {
                    cekPIB();
                }

                loadType();
                terimaKodeBarang();

                if (konvBeri !== undefined && konvTerima !== undefined) {
                    baris3.forEach(function (input) {
                        input.disabled = false;
                    });
                    primerValue = no_primer3.value.trim();
                    sekunderValue = no_sekunder3.value.trim();
                    tritierValue = no_tritier3.value.trim();

                    if (primerValue === 'NULL' && sekunderValue === 'NULL') {
                        primer3.disabled = true;
                        sekunder3.disabled = true;
                        tritier3.select();
                    } else if (primerValue === 'NULL' && sekunderValue !== 'NULL') {
                        primer3.disabled = true;
                        sekunder3.select();
                    } else {
                        primer3.select();
                    }

                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning',
                        html: `Satuan Pemberi dan Penerima Tidak sama <br> Atau Tidak ada Type tersebut Pada Divisi Penerima`,
                        returnFocus: false
                    }).then(() => {
                        return;
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// fungsi unk dptin kode barang & pib
function loadKdBarang(kodeType) {
    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/getType',
        data: {
            _token: csrfToken,
            kodeType: kodeType,
            subkelId: subkelId.value
        },
        success: function (result) {
            if (kodeType === result[0].IdType.trim()) {
                kodeBarang.value = result[0].KodeBarang.trim();
                PIB.value = result[0].PIB?.trim() || '';
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// fungsi unk cek PIB
function cekPIB() {
    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/cekPIB',
        data: {
            _token: csrfToken,
            kodeBarang: kodeBarang.value,
            subkelId2: subkelId2.value,
            PIB: PIB.value,
            divisiNama2: divisiNama2.value,
            subkelNama2: subkelNama2.value
        },
        success: function (response) {
            if (response.warning) {
                Swal.fire({
                    icon: 'warning',
                    html: response.warning,
                    returnFocus: false
                }).then(() => {
                    btn_namaBarang.focus();
                });
            } else if (response.success) {
                console.log('Operation successful');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function loadType() {
    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/cekType',
        data: {
            _token: csrfToken,
            kodeBarang: kodeBarang.value,
            subkelId: subkelId.value,
            PIB: PIB.value,
            kodeType: kodeType.value
        },
        success: function (response) {
            if (response.typeData && response.typeData.length > 0) {
                const data = response.typeData[0];

                kodeType.value = data.IdType ? decodeHtmlEntities(data.IdType.trim()) : "-";
                namaBarang.value = data.NamaType ? decodeHtmlEntities(data.NamaType.trim()) : "-";
                kodeBarang.value = data.KodeBarang ? decodeHtmlEntities(data.KodeBarang.trim()) : "-";
                primer.value = data.SaldoPrimer ? formatNumber(data.SaldoPrimer) : "0";
                sekunder.value = data.SaldoSekunder ? formatNumber(data.SaldoSekunder) : "0";
                tritier.value = data.SaldoTritier ? formatNumber(data.SaldoTritier) : "0";
                no_primer.value = data.satuan_primer ? decodeHtmlEntities(data.satuan_primer.trim()) : "";
                no_sekunder.value = data.satuan_sekunder ? decodeHtmlEntities(data.satuan_sekunder.trim()) : "";
                no_tritier.value = data.satuan_tritier ? decodeHtmlEntities(data.satuan_tritier.trim()) : "";
                konvBeri = data.PakaiAturanKonversi ? data.PakaiAturanKonversi.trim() : "";

                primer2.value = response.totalSaldoData[0]?.Primer ? formatNumber(response.totalSaldoData[0].Primer) : "0";
                sekunder2.value = response.totalSaldoData[0]?.Sekunder ? formatNumber(response.totalSaldoData[0].Sekunder) : "0";
                tritier2.value = response.totalSaldoData[0]?.Tritier ? formatNumber(response.totalSaldoData[0].Tritier) : "0";
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function terimaKodeBarang() {
    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/kodeBarangTerima',
        data: {
            _token: csrfToken,
            kodeBarang: kodeBarang.value,
            subkelId2: subkelId2.value,
            PIB: PIB.value
        },
        success: function (response) {
            no_primer3.value = response[0].satuan_primer !== null ? decodeHtmlEntities(response[0].satuan_primer.trim()) : "";
            no_sekunder3.value = response[0].satuan_sekunder !== null ? decodeHtmlEntities(response[0].satuan_sekunder.trim()) : "";
            no_tritier3.value = response[0].satuan_tritier !== null ? decodeHtmlEntities(response[0].satuan_tritier.trim()) : "";
            konvTerima = response[0].PakaiAturanKonversi !== null ? response[0].PakaiAturanKonversi.trim() : "";

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });

    console.log(konvBeri, konvTerima);


    if (konvBeri !== 'Y' && konvTerima !== 'Y') {
        if (no_primer.value === no_primer3.value) {
            if (no_sekunder.value === no_sekunder3.value) {
                if (no_tritier.value === no_tritier3.value) {
                    terima = true;
                } else {
                    terima = false;
                }
            } else {
                terima = false;
            }
        } else {
            terima = false;

        }
    } else if (konvBeri === 'Y' && konvTerima !== 'Y') {
        if (no_primer.value === no_primer3.value) {
            terima = true;
        }
        if (no_sekunder.value === no_sekunder3.value) {
            terima = true;
        }
        if (no_tritier.value === no_tritier3.value) {
            terima = true;
        }
    }
}

// menampilkan data dari semua pemohon
function showAllTable() {
    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/getAllData',
        data: {
            _token: csrfToken,
            divisiId2: divisiId2.value,
            objekNama2: objekNama2.value
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

// menampilkan data berdasarkan pemohon
function showTable() {
    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/getData',
        data: {
            _token: csrfToken,
            divisiId2: divisiId2.value,
            pemohon: pemohon.value
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

// fungsi unk update isi tabel
function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.IdPenerima.trim()),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.NamaDivisi.trim()),
            escapeHtml(item.NamaObjek.trim()),
            escapeHtml(item.NamaKelompokUtama.trim()),
            escapeHtml(item.NamaKelompok.trim()),
            escapeHtml(item.NamaSubKelompok.trim()),
            escapeHtml(formatNumber(item.JumlahPengeluaranPrimer.trim())),
            escapeHtml(formatNumber(item.JumlahPengeluaranSekunder.trim())),
            escapeHtml(formatNumber(item.JumlahPengeluaranTritier.trim())),
            escapeHtml(item.KodeBarang.trim()),
            escapeHtml(item.IdType.trim()),
            escapeHtml(item.SatPrimer.trim()),
            escapeHtml(item.SatSekunder.trim()),
            escapeHtml(item.SatTritier.trim()),
            escapeHtml(item.IdPenerima1.trim())
        ])
    });

    table.draw();
}

$(document).ready(function () {
    table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kd. Transaksi' },
            { title: 'Nama Barang' },
            { title: 'Alasan Mutasi' },
            { title: 'Pemohon' },
            { title: 'Tgl. Mohon' },
            { title: 'Div Penerima' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
        ]
    });
});

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();
    // console.log(data);

    kodeTransaksi.value = data[0];
    namaBarang.value = decodeHtmlEntities(data[1]);
    alasan.value = decodeHtmlEntities(data[2]);
    divisiNama2.value = decodeHtmlEntities(data[5]);
    objekNama2.value = decodeHtmlEntities(data[6]);
    kelutNama2.value = decodeHtmlEntities(data[7]);
    kelompokNama2.value = decodeHtmlEntities(data[8]);
    subkelNama2.value = decodeHtmlEntities(data[9]);
    primer3.value = formatNumber(data[10]);
    sekunder3.value = formatNumber(data[11]);
    tritier3.value = formatNumber(data[12]);
    kodeBarang.value = decodeHtmlEntities(data[13]);
    kodeType.value = decodeHtmlEntities(data[14]);
    no_primer3.value = decodeHtmlEntities(data[15]);
    no_sekunder3.value = decodeHtmlEntities(data[16]);
    no_tritier3.value = decodeHtmlEntities(data[17]);
    pemohon.value = data[18];

    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/getSelect',
        data: {
            _token: csrfToken,
            kodeTransaksi: kodeTransaksi.value
        },
        success: function (response) {
            if (response) {
                // console.log(response);

                divisiId2.value = response.data_selectData[0].IdDivisi.trim();
                objekId2.value = response.data_selectData[0].IdObjek.trim();
                kelutId2.value = response.data_selectData[0].IdKelompokUtama.trim();
                kelompokId2.value = response.data_selectData[0].IdKelompok.trim();
                subkelId2.value = response.data_selectData[0].IdSubkelompok.trim();

                divisiId.value = response.identityData[0].IdDivisi.trim();
                divisiNama.value = response.identityData[0].NamaDivisi.trim();
                objekId.value = response.identityData[0].IdObjek.trim();
                objekNama.value = response.identityData[0].NamaObjek.trim();
                kelutId.value = response.identityData[0].IdKelompokUtama.trim();
                kelutNama.value = response.identityData[0].NamaKelompokUtama.trim();
                kelompokId.value = response.identityData[0].IdKelompok.trim();
                kelompokNama.value = response.identityData[0].NamaKelompok.trim();
                subkelId.value = response.identityData[0].IdSubkelompok.trim();
                subkelNama.value = response.identityData[0].NamaSubKelompok.trim();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

function cekKodeBarang() {
    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/getDetailId',
        data: {
            _token: csrfToken,
            kodeType: kodeType.value,
            subkelId2: subkelId2.value
        },
        success: function (result) {
            console.log(result);

            kdBarang = result[0].KodeBarang.trim();
            asalSubkel = result[0].IdSubkelompok_Type.trim();
            acc = result[0].isValid.trim();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

let cekPr;
let cekSek
let cekTr;
let acc;
let hargaAkhir;
let sisaSaldo;

$(document).ready(function () {
    table = $('#tableHarga').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'No. Terima' },
            { title: 'Qty' },
            { title: 'Harga' },
            { title: 'Kurs' },
            { title: 'Harga Satuan' }
        ]
    });
});

// fungsi unk update isi tabel
function updateDataTableKecil(data) {
    var table = $('#tableHarga').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.IdPenerima.trim()),
            escapeHtml(item.SaatAwalTransaksi.trim())
        ])
    });

    table.draw();
}

function simpan_isi() {
    cekKodeBarang();

    cekPr = primer3.value + primer2.value;
    cekSek = sekunder3.value + sekunder2.value;
    cekTr = tritier3.value + tritier2.value;

    if (konvBeri !== 'Y' && konvTerima !== 'Y' && objekId2 !== '099') {
        if (primer.value < cekPr || sekunder.value < cekSek ||tritier.value < cekTr) {
            Swal.fire({
                icon: 'warning',
                title: 'Saldo Tidak Cukup!',
                text: `Saldo Tidak Mencukupi, Cek Kembali Jumlah Yang Akan diMutasi !`,
                returnFocus: false
            }).then(() => {
                return;
            });
        }
    }

    if (acc) {
        $.ajax({
            type: 'GET',
            url: 'MhnPenerima/getListType',
            data: {
                _token: csrfToken,
                kodeType: kodeType.value,
                divisiNama: divisiNama.value,
                objekNama: objekNama.value
            },
            success: function (response) {
                console.log(response);

                if (response.data && response.data.length > 0) {
                    updateDataTableKecil(response.data[0]);
                }

                hargaAkhir = response.totalHarga1;
                sisaSaldo = response.remainingSaldo;
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            text: `Kode Transaksi ${kodeTransaksi} Tidak Dapat Di ACC,
                    Sebab Type Barang Belum Ada Pada Sub Kelompok ${subkelNama2}. Isi Dulu Di Menu Maintenance Type Barang!!`,
            returnFocus: false
        });

    }
}

btn_proses.addEventListener("click", function (e) {
    if (namaBarang.value === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Barang Belum Terpilih!',
            text: `Pilih dulu Nama Barang!!`,
            returnFocus: false
        }).then(() => {
            btn_namaBarang.focus();
        });
    }

    if (a === 1) {
        if (divisiNama2.value === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Divisi Kosong!',
                text: `Pilih dulu Divisinya!`,
                returnFocus: false
            }).then(() => {
                btn_divisi2.focus();
            });
        } else if (objekNama2.value === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Objek Kosong!',
                text: `Pilih dulu Objeknya!`,
                returnFocus: false
            }).then(() => {
                btn_divisi2.focus();
            });
        }
    }

    else {
        if (tanggal.valueAsDate > today) {
            Swal.fire({
                icon: 'warning',
                title: 'Tanggal Tidak Boleh Lebih Besar Dari Tanggal Sekarang',
                returnFocus: false
            }).then(() => {
                tanggal.focus();
            });
            return;
        }
        if (subkelId2.value === subkelId.value) {
            Swal.fire({
                icon: 'warning',
                title: 'ASAL SubKelompok dan TUJUAN SubKelompok SAMA, TIDAK DAPAT DIPROSES !!',
                returnFocus: false
            });
            return;
        }
    }


    if (a === 3) {
        $.ajax({
            url: "MhnPenerima/hapusBarang",
            type: "DELETE",
            data: {
                _token: csrfToken,
                kodeTransaksi: kodeTransaksi.value
            },
            timeout: 30000,
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.success,
                        returnFocus: false
                    }).then(() => {
                        // clearInputs();
                        if (tampil === 1) {
                            showAllTable();
                        } else {
                            showTable();
                        }
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: 'error',
                        title: response.error,
                        returnFocus: false
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error:', error);
            }
        });
    }

    $.ajax({
        type: 'PUT',
        url: 'MhnPenerima/proses',
        data: {
            _token: csrfToken,
            a: a,
            divisiNama: divisiNama.value,
            objekNama: objekNama.value,
            alasan: alasan.value,
            tanggal: tanggal.value,
            kodeType: kodeType.value,
            pemohon: pemohon.value,
            primer3: primer3.value,
            sekunder3: sekunder3.value,
            tritier3: tritier3.value,
            subkelId: subkelId.value,
            subkelId2: subkelId2.value,
            harga: hargaAkhir,
            PIB: PIB.value,
        },
        timeout: 30000,
        success: function (response) {
            if (a === 1 && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    primer3.value = 0;
                    sekunder3.value = 0;
                    tritier3.value = 0;

                    allInputs.forEach(function (input) {
                        let divPenting = input.closest('#baris-1') !== null;
                        let divids = input.closest('#ids') !== null;
                        if (!divPenting && !divids) {
                            input.value = '';
                        }
                    });

                });
            } else if (a === 2 && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    if (tampil === 1) {
                        showAllTable();
                        clearInputs();
                    } else {
                        showTable();
                        clearInputs();
                    }

                    // btn_divisi.focus();
                });
            } else if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.error,
                    returnFocus: false,
                }).then(() => {
                    btn_divisi.focus();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
});

disableKetik()
var allInputs = document.querySelectorAll('input');


// kosongin input
function clearInputs() {
    allInputs.forEach(function (input) {
        input.value = '';
    });

    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;
}

// fungsi bisa ketik
function enableKetik() {
    // clearInputs();

    // hide button isi, tampilkan button proses
    btn_isi.style.display = 'none';
    btn_proses.style.display = 'inline-block';
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_hapus.disabled = true;
}

// fungsi gak bisa ketik
function disableKetik() {
    // hide button proses, tampilkan button isi
    btn_proses.style.display = 'none';
    btn_isi.style.display = 'inline-block';

    // hide button batal, tampilkan button koreksi
    btn_batal.style.display = 'none';
    btn_koreksi.style.display = 'inline-block';

    btn_hapus.disabled = false;
}

// button isi event listener
btn_isi.addEventListener('click', function () {
    a = 1;
    // $('#tableData').hide();

    enableKetik();
    btn_kelut2.disabled = false;
    btn_kelut2.focus();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    primer3.value = 0;
    sekunder3.value = 0;
    tritier3.value = 0;
    btn_hapus.disabled = true;
});

// button batal event listener
btn_batal.addEventListener('click', function () {
    // tampilin isi tabel
    if (tampil === 1) {
        showAllTable();
    } else if (tampil === 2) {
        showTable();
    }

    $('#tableData').show();

    disableKetik();
    clearInputs();
});

// button koreksi event listener
btn_koreksi.addEventListener('click', function () {
    a = 2;
    // tampilin isi tabel
    $('#tableData').show();

    btn_hapus.disabled = true;

    if (kodeTransaksi.value === '') {
        showAlert('warning', 'Pilih dulu data yg akan diKOREKSI !');
        return;
    } else {
        primer2.disabled = false;
        sekunder2.disabled = false;
        tritier2.disabled = false;

        primer2.select();

        // hide button isi, tampilkan button proses
        btn_isi.style.display = 'none';
        btn_proses.style.display = 'inline-block';
        // hide button koreksi, tampilkan button batal
        btn_koreksi.style.display = 'none';
        btn_batal.style.display = 'inline-block';

    }
});

// button hapus event listener
btn_hapus.addEventListener('click', function () {
    a = 3;
    // tampilin isi tabel
    $('#tableData').show();

    // btn_hapus.disabled = true;

    if (kodeTransaksi.value === '') {
        showAlert('warning', 'Pilih dulu data yg akan diHAPUS !');
        return;
    } else {
        // hide button isi, tampilkan button proses
        btn_isi.style.display = 'none';
        btn_proses.style.display = 'inline-block';
        // hide button koreksi, tampilkan button batal
        btn_koreksi.style.display = 'none';
        btn_batal.style.display = 'inline-block';

        btn_hapus.disabled = true;
        btn_proses.focus();
    }
});
