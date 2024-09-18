var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var btn_divisi = document.getElementById('btn_divisi');
var tanggal = document.getElementById('tanggal');

var objekId = document.getElementById('objekId');
var objekNama = document.getElementById('objekNama');
var btn_objek = document.getElementById('btn_objek');

var kelutId = document.getElementById('kelutId');
var kelutNama = document.getElementById('kelutNama');
var btn_kelut = document.getElementById('btn_kelut');

var kelompokId = document.getElementById('kelompokId');
var kelompokNama = document.getElementById('kelompokNama');
var btn_kelompok = document.getElementById('btn_kelompok');

var subkelId = document.getElementById('subkelId');
var subkelNama = document.getElementById('subkelNama');
var btn_subkel = document.getElementById('btn_subkel');

var kodeType = document.getElementById('kodeType');
var kodeBarang = document.getElementById('kodeBarang');
var primer = document.getElementById('primer');
var satuanPrimer = document.getElementById('satuanPrimer');

var namaBarang = document.getElementById('namaBarang');
var sekunder = document.getElementById('sekunder');
var satuanSekunder = document.getElementById('satuanSekunder');

var tritier = document.getElementById('tritier');
var satuanTritier = document.getElementById('satuanTritier');

var transaksiId = document.getElementById('transaksiId');

var objekId2 = document.getElementById('objekId2');
var objekNama2 = document.getElementById('objekNama2');
var kelompokId2 = document.getElementById('kelompokId2');
var kelompokNama2 = document.getElementById('kelompokNama2');

var kelutId2 = document.getElementById('kelutId2');
var kelutNama2 = document.getElementById('kelutNama2');
var subkelId2 = document.getElementById('subkelId2');
var subkelNama2 = document.getElementById('subkelNama2');

var btn_objek2 = document.getElementById('btn_objek2');
var btn_kelut2 = document.getElementById('btn_kelut2');
var btn_kelompok2 = document.getElementById('btn_kelompok2');
var btn_subkel2 = document.getElementById('btn_subkel2');

var uraian = document.getElementById('uraian');
var pemberi = document.getElementById('pemberi');

var primer2 = document.getElementById('primer2');
var satuanPrimer2 = document.getElementById('satuanPrimer2');
var sekunder2 = document.getElementById('sekunder2');
var satuanSekunder2 = document.getElementById('satuanSekunder2');
var triter2 = document.getElementById('triter2');
var satuanTritier2 = document.getElementById('satuanTritier2');

var btn_hitung = document.getElementById('btn_hitung');

var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');
var btn_namabarang = document.getElementById('btn_namabarang');

var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;

document.addEventListener('DOMContentLoaded', function () {
    btn_divisi.focus();
});


$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: true,
        columns: [
            { title: 'NoTrans' },
            { title: 'Nama Type' },
            { title: 'Alasan' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kel' },
            { title: 'Pemohon' },
            { title: 'Tgl Mohon' },
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

function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.NamaType),
            escapeHtml(item.UraianDetailTransaksi),
            escapeHtml(item.NamaObjek),
            escapeHtml(item.NamaKelompokUtama),
            escapeHtml(item.NamaKelompok),
            escapeHtml(item.NamaSubKelompok),
            escapeHtml(item.IdPemberi),
            escapeHtml(item.SaatAwalTransaksi),
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
                            url: "PemakaianGelondongan/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" },
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId.value = decodeHtmlEntities(result.value.IdDivisi.trim());
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());

                if (divisiId.value === 'ABM') {
                    btn_objek.disabled = false;
                    btn_objek.focus();
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Khusus Gelondongan ABM',
                        returnFocus: false,
                    }).then(() => {
                        btn_divisi.focus();
                    });
                }
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
                            url: "PemakaianGelondongan/getObjek",
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = result.value.NamaObjek.trim();

                Swal.fire({
                    title: 'Menampilkan Semua Data ??..',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {
                    if (result.isConfirmed) {
                        tabelApa = 1;
                        tampilAllData();
                    }
                    else {
                        tabelApa = 0;
                        tampilData();
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});


btn_objek2.addEventListener("click", function (e) {
    kelutId2.value = '';
    kelutNama2.value = '';
    kelompokId2.value = '';
    kelompokNama2.value = '';
    subkelId2.value = '';
    subkelNama2.value = '';

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
                            url: "PemakaianGelondongan/getObjek2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdDivisi: divisiId.value
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" },
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                objekId2.value = result.value.IdObjek.trim();
                objekNama2.value = result.value.NamaObjek.trim();

                btn_kelut2.disabled = false;
                btn_kelut2.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


// but`to`n list kelompok utama
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "PemakaianGelondongan/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdObjek_KelompokUtama: objekId.value.trim(),
                            }
                        },
                        columns: [
                            { data: "IdKelompokUtama" },
                            { data: "NamaKelompokUtama" }
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId.value = result.value.IdKelompokUtama.trim();
                kelutNama.value = result.value.NamaKelompokUtama.trim();

                kelompokId.value = '';
                kelompokNama.value = '';
                subkelId.value = '';
                subkelNama.value = '';
                kodeType.value = '';

                btn_kelompok.disabled = false;
                btn_kelompok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


// but`to`n list kelompok utama
btn_kelut2.addEventListener("click", function (e) {

    kelompokId2.value = '';
    kelompokNama2.value = '';
    subkelId2.value = '';
    subkelNama2.value = '';

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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "PemakaianGelondongan/getKelUt2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdObjek_KelompokUtama: objekId2.value.trim(),
                            }
                        },
                        columns: [
                            { data: "IdKelompokUtama" },
                            { data: "NamaKelompokUtama" }
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId2.value = result.value.IdKelompokUtama.trim();
                kelutNama2.value = result.value.NamaKelompokUtama.trim();

                btn_kelompok2.disabled = false;
                btn_kelompok2.focus();
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
                            url: "PemakaianGelondongan/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompokUtama_Kelompok: kelutId.value.trim(),
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId.value = result.value.idkelompok.trim();
                kelompokNama.value = result.value.namakelompok.trim();

                subkelId.value = '';
                subkelNama.value = '';
                kodeType.value = '';

                btn_subkel.disabled = false;
                btn_subkel.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PemakaianGelondongan/getKelompok2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompokUtama_Kelompok: kelutId2.value.trim(),
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId2.value = result.value.idkelompok.trim();
                kelompokNama2.value = result.value.namakelompok.trim();

                btn_subkel2.disabled = false;
                btn_subkel2.focus();
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
                            url: "PemakaianGelondongan/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompok_SubKelompok: kelompokId.value.trim(),
                            }
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" },
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId.value = result.value.IdSubkelompok.trim();
                subkelNama.value = result.value.NamaSubKelompok.trim();

                btn_namabarang.disabled = false;
                btn_namabarang.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PemakaianGelondongan/getSubkel2",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompok_SubKelompok: kelompokId2.value.trim(),
                            }
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" },
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId2.value = result.value.IdSubkelompok.trim();
                subkelNama2.value = result.value.NamaSubKelompok.trim();

                LoadPenerima();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$('#uraian').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn_hitung.focus();
    }
});

btn_namabarang.addEventListener("click", function (e) {

});

var PIdType;
// button list nama barang
btn_namabarang.addEventListener("click", function (e) {
    PIdType = '';

    if ((divisiId.value === 'ABM' && objekId.value === '022') || (divisiId.value === 'CIR' && objekId.value === '043')
        || (divisiId.value === 'JBB' && objekId.value === '042')
        || (divisiId.value === 'EXT' && (kelompokId.value === '1259' || kelompokId.value === '1283'))) {
        if (divisiId.value === 'ABM' && objekId.value === '022' && kelompokId.value !== '0292') {
            Load_Type_ABM();
        }
        else {
            $.ajax({
                type: 'PUT',
                url: 'PemakaianGelondongan/insertTempType',
                data: {
                    XIdDivisi: divisiId.value,
                    XIdSubKelompok: subkelId.value,
                    _token: csrfToken
                },
                success: function (response) {
                    if (response.success) {
                        Load_Type_CIR();
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    }
    else {
        Load_Type();
    }
});

var pilih;

btn_isi.addEventListener("click", function (e) {
    pilih = 1;
    tombol(3);
    $('#tableHideShow').hide();
    clearForm();
    btn_kelut.disabled = false;
    btn_kelut.focus();
});

var PKdBrg;

function Load_Saldo(IdType) {
    $.ajax({
        type: 'GET',
        url: 'PemakaianGelondongan/getSaldo',
        data: {
            IdType: IdType,
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
                PKdBrg = kodeBarang.value;
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PemakaianGelondongan/getType",
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kodeType.value = result.value.IdType.trim();
                namaBarang.value = result.value.NamaType.trim();

                PIdType = kodeType.value;
                Load_Saldo(kodeType.value)
                btn_objek2.disabled = false;
                btn_objek2.focus();
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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PemakaianGelondongan/getTypeCIR",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdSubKelompok_Type: subkelId.value.trim(),
                            }
                        },
                        columns: [
                            { data: "Id_Type" },
                            { data: "Nm_Type" },
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kodeType.value = result.value.idtype.trim();
                namaBarang.value = result.value.BARU.trim();

                PIdType = kodeType.value;
                Load_Saldo(kodeType.value)
                btn_objek2.disabled = false;
                btn_objek2.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
}

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
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "PemakaianGelondongan/getTypeABM",
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
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                kodeType.value = result.value.idtype.trim();
                namaBarang.value = result.value.BARU.trim();

                PIdType = kodeType.value;
                Load_Saldo(kodeType.value)
                btn_objek2.disabled = false;
                btn_objek2.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
}

var loadPenerima;

function LoadPenerima() {
    $.ajax({
        type: 'GET',
        url: 'PemakaianGelondongan/loadPenerima',
        data: {
            XKodeBarang: kodeBarang.value,
            XIdSubKelompok: subkelId2.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                satuanPrimer2 = result[0].satuan_primer ? decodeHtmlEntities(result[0].satuan_primer.trim()) : 'Null';
                satuanSekunder2 = result[0].satuan_sekunder ? decodeHtmlEntities(result[0].satuan_sekunder.trim()) : 'Null';
                satuanTritier2 = result[0].satuan_tritier ? decodeHtmlEntities(result[0].satuan_primer.trim()) : 'Null';

                if (satuanPrimer.value === satuanPrimer2) {
                    if (satuanSekunder.value === satuanSekunder2) {
                        if (satuanTritier === satuanTritier2) {
                            loadPenerima = true;
                        }
                        else {
                            if (satuanPrimer.value.trim() === 'Null') {
                                loadPenerima = true;
                            }
                            else {
                                loadPenerima = false;
                            }
                        }
                    }
                    else {
                        if (satuanSekunder.value === 'Null') {
                            loadPenerima = true;
                        }
                        else {
                            loadPenerima = false;
                        }
                    }
                }
                else {
                    loadPenerima = true;
                }

                console.log(loadPenerima);


                if (loadPenerima === false) {
                    Swal.fire({
                        icon: 'info',
                        text: 'Satuan Tritier,Sekunder,Primer pada Divisi ' + (decodeHtmlEntities(divisiNama.value)) +
                            ' ADA yang TIDAK SAMA dengan Divisi Penerima Barang !!!....Koreksi di Maitenance Type Barang per Divisi',
                    });
                }
                else {
                    btn_hitung.disabled = false;
                    uraian.disabled = false;
                    uraian.focus();
                }
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: 'Tidak Ada Type Barang ' + (decodeHtmlEntities(namaBarang.value)) + ' Pada Divisi Penerima',
                });
                return;
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function clearForm() {
    kelutId.value = "";
    kelompokId.value = "";
    subkelId.value = "";
    kelutNama.value = "";
    kelompokNama.value = "";
    subkelNama.value = "";
    objekId2.value = "";
    kelutId2.value = "";
    kelompokId2.value = "";
    subkelId2.value = "";
    objekNama2.value = "";
    kelutNama2.value = "";
    kelompokNama2.value = "";
    subkelNama2.value = "";
    uraian.value = "";
    primer.value = 0;
    sekunder.value = 0;
    tritier.value = 0;
    satuanPrimer.value = "";
    satuanSekunder.value = "";
    satuanTritier.value = "";
    satuanPrimer2.value = "";
    satuanSekunder2.value = "";
    satuanTritier2.value = "";
    primer2.value = 0;
    sekunder2.value = 0;
    triter2.value = 0;
    kodeType.value = "";
    transaksiId.value = "";
    kodeBarang.value = "";
    btn_kelut.disabled = true;
    btn_kelompok.disabled = true;
    btn_subkel.disabled = true;
    btn_objek2.disabled = true;
    btn_kelut2.disabled = true;
    btn_kelompok2.disabled = true;
    btn_subkel2.disabled = true;
    btn_hitung.disabled = true;
    btn_namabarang.disabled = true;
}


function tampilAllData() {
    $.ajax({
        type: 'GET',
        url: 'PemakaianGelondongan/tampilAllData',
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data di tabel sudah diupdate.',
                });
            }
            else {
                var table = $('#tableData').DataTable();
                table.clear().draw();

                Swal.fire({
                    icon: 'info',
                    text: 'Tidak Ada Data.',
                });
            }
            tombol(1);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function tombol(angka) {
    if (angka === 1) {
        btn_isi.disabled = false;
        btn_hapus.disabled = false;
        btn_koreksi.disabled = false;
        btn_batal.disabled = false;
        btn_proses.disabled = true;
    }
    else if (angka === 2) {
        btn_isi.disabled = true;
        btn_hapus.disabled = true;
        btn_koreksi.disabled = true;
        // btn_batal.disabled = true;
        btn_proses.disabled = true;
    }
    else if (angka === 3) {
        btn_isi.disabled = true;
        btn_hapus.disabled = true;
        btn_koreksi.disabled = true;
        // btn_batal.disabled = true;
        btn_proses.disabled = true;
    }
}

function tampilData() {
    $.ajax({
        type: 'GET',
        url: 'PemakaianGelondongan/tampilData',
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data di tabel sudah diupdate.',
                });
            }
            else {
                var table = $('#tableData').DataTable();
                table.clear().draw();

                Swal.fire({
                    icon: 'info',
                    text: 'Tidak Ada Data.',
                });
            }

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}
