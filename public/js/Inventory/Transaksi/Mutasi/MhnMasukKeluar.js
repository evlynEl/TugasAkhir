var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var masuk = document.getElementById('masuk');
var keluar = document.getElementById('keluar');
var divisiNama = document.getElementById('divisiNama');
var tanggal = document.getElementById('tanggal');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var user = document.getElementById('user');
var objekNama = document.getElementById('objekNama');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var kodeTransaksi = document.getElementById('kodeTransaksi');
var kodeBarang = document.getElementById('kodeBarang');
var kodeType = document.getElementById('kodeType');
var namaBarang = document.getElementById('namaBarang');
var uraian = document.getElementById('uraian');
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
var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

var mutasiLabel = document.getElementById('mutasiLabel');
const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));

let a; // isi = 1, koreksi = 2, hapus = 3
tanggal.value = todayString;

// fungsi berhubungan dengan ENTER & oengecekkan yg kosong2
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.id === 'primer2') {
                sekunder2.select();
            } else if (masuk.id === 'sekunder2') {
                tritier2.select();
            } else if (masuk.id === 'tritier2') {
                btn_proses.focus();
            } else if (masuk.id === 'uraian') {
                primer2.select();
            }
        }
    })
});

$(document).ready(function () {
    table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kd. Transaksi' },
            { title: 'Nama Type' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
            { title: 'Kd Type' },
            { title: 'Uraian' },
            { title: 'Tanggal' },
            { title: 'Pemohon' }
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
        columnDefs: [{ targets: [0], width: '8%', className: 'fixed-width' },
        { targets: [1], width: '30%', className: 'fixed-width' },
        { targets: [2], width: '8%', className: 'fixed-width' },
        { targets: [3], width: '8%', className: 'fixed-width' },
        { targets: [4], width: '8%', className: 'fixed-width' },
        { targets: [5], width: '20%', className: 'fixed-width' },
        { targets: [6], width: '13%', className: 'fixed-width' },
        { targets: [7], width: '8%', className: 'fixed-width' },
        { targets: [8], width: '8%', className: 'fixed-width' },
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
        url: 'MhnMasukKeluar/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            user.value = result.user.trim();
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
btn_kodeType.disabled = true;
tanggal.disabled = true;
uraian.disabled = true;

// mutasiLabel.value = "Mutasi Masuk";
fillUraian();
function fillUraian() {
    document.querySelectorAll('input[name="opsi"]').forEach(function (element) {
        element.addEventListener('change', function () {
            if (masuk.checked) {
                mutasiLabel.style.display = 'inline-block';
                mutasiLabel.textContent = "Mutasi MASUK";
                uraian.value = 'Mutasi Masuk';
                btn_divisi.focus();
            } else if (keluar.checked) {
                mutasiLabel.style.display = 'inline-block';
                mutasiLabel.textContent = "Mutasi KELUAR";
                uraian.value = 'Mutasi Keluar';
                btn_divisi.focus();
            }
        });
    });
}


// button list divisi
btn_divisi.addEventListener("click", function (e) {
    if (!(masuk.checked || keluar.checked)) {
        Swal.fire({
            icon: 'error',
            title: 'Pilih dulu Jenis Mutasi!',
            returnFocus: false
        });
        return;
    } else {
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
                                url: "MhnMasukKeluar/getDivisi",
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

                    if (a !== undefined) {
                        btn_objek.disabled = false;
                        btn_objek.focus();
                    } else {
                        btn_isi.focus();
                        uraian.disabled = false;
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
});

// button list objek
btn_objek.addEventListener("click", function (e) {
    if (!(masuk.checked || keluar.checked)) {
        Swal.fire({
            icon: 'error',
            title: 'Pilih dulu Jenis Mutasi!',
            returnFocus: false
        });
        return;
    } else {
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
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnMasukKeluar/getObjek",
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
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    // Row selection logic
                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    // Focus on search input if it exists
                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    objekId.value = result.value.IdObjek.trim();
                    objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());
                    btn_kelut.focus();

                    if (objekNama.value !== '') {
                        $('#tableData').show();

                        showTable();

                        btn_kelut.disabled = false;
                        btn_kelut.focus();
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
});



// button list kelompok utama
btn_kelut.addEventListener("click", function (e) {
    if (!(masuk.checked || keluar.checked)) {
        Swal.fire({
            icon: 'error',
            title: 'Pilih dulu Jenis Mutasi!',
            returnFocus: false
        });
        return;
    } else {
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
                            order: [1, "asc"],
                            ajax: {
                                url: "MhnMasukKeluar/getKelUt",
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

    }
});

// button list kelompok
btn_kelompok.addEventListener("click", function (e) {
    if (!(masuk.checked || keluar.checked)) {
        Swal.fire({
            icon: 'error',
            title: 'Pilih dulu Jenis Mutasi!',
            returnFocus: false
        });
        return;
    } else {
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
                                url: "MhnMasukKeluar/getKelompok",
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
    }
});

// button list sub kelompok
btn_subkel.addEventListener("click", function (e) {
    if (!(masuk.checked || keluar.checked)) {
        Swal.fire({
            icon: 'error',
            title: 'Pilih dulu Jenis Mutasi!',
            returnFocus: false
        });
        return;
    } else {
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
                                url: "MhnMasukKeluar/getSubkel",
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
                    btn_kodeType.focus();
                    subkelId.value = result.value.IdSubkelompok.trim();
                    subkelNama.value = result.value.NamaSubKelompok.trim();

                    if (subkelNama.value !== '') {
                        btn_kodeType.disabled = false;
                        btn_kodeType.focus();
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
});

btn_kodeType.addEventListener("click", handleTypeSelection);

function handleTypeSelection() {
    primer.value = 0;
    sekunder.value = 0;
    tritier.value = 0;

    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;

    if ((divisiId.value === 'ABM' && objekId.value === '022') || (divisiId.value === 'CIR' && objekId.value === '043') ||
        (divisiId.value === 'JBB' && objekId.value === '042') || (divisiId.value === 'EXT' && ((objekId.value === '1259' || objekId.value === '1283')))) {
        if (divisiId.value === 'ABM' && objekId.value === '022' && kelompokId.value !== '0292') {

            if (divisiId.value !== '') {
                try {
                    Swal.fire({
                        title: 'Kode Type',
                        html: `
                            <table id="table_list" class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID Type</th>
                                        <th scope="col">Nama</th>
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
                                        url: "MhnMasukKeluar/getABM",
                                        dataType: "json",
                                        type: "GET",
                                        data: {
                                            _token: csrfToken,
                                            subkelId: subkelId.value
                                        }
                                    },
                                    columns: [
                                        { data: "idtype" },
                                        { data: "BARU" }
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
                            kodeType.value = result.value.idtype.trim();
                            namaBarang.value = decodeHtmlEntities(result.value.BARU.trim());

                            if (kodeType.value !== '') {
                                getType(kodeType.value)
                                getSaldo(kodeType.value);

                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Data Belum Lengkap Terisi',
                                    text: 'Pilih dulu Type Barangnya !',
                                    returnFocus: false
                                }).then(() => {
                                    btn_kodeType.focus();
                                });
                            }
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Data Belum Lengkap Terisi',
                    text: 'Pilih dulu Sub Kelompoknya !',
                    returnFocus: false
                }).then(() => {
                    btn_subkel.focus();
                });
            }
        } else {
            if (subkelId.value !== '') {
                try {
                    Swal.fire({
                        title: 'Kode Type',
                        html: `
                            <table id="table_list" class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID Type</th>
                                        <th scope="col">Nama</th>
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
                                        url: "MhnMasukKeluar/getTypeCIR",
                                        dataType: "json",
                                        type: "GET",
                                        data: {
                                            _token: csrfToken,
                                            divisiId: divisiId.value,
                                            subkelId: subkelId.value
                                        }
                                    },
                                    columns: [
                                        { data: "Id_Type" },
                                        { data: "Nm_Type" }
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
                            kodeType.value = result.value.Id_Type.trim();
                            namaBarang.value = result.value.Nm_Type.trim();

                            if (kodeType.value !== '') {
                                getType(kodeType.value)
                                getSaldo(kodeType.value);
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Data Belum Lengkap Terisi',
                                    text: 'Pilih dulu Type Barangnya !',
                                    returnFocus: false
                                }).then(() => {
                                    kodeBarang.focus();
                                });
                            }
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    } else {
        if (subkelId.value !== '') {
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
                                    url: "MhnMasukKeluar/getType",
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
                        kodeType.value = result.value.IdType.trim();
                        namaBarang.value = decodeHtmlEntities(result.value.NamaType.trim());

                        getType(kodeType.value);
                        getSaldo(kodeType.value);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    if (kodeType.value !== '') {
        $.ajax({
            url: "MhnMasukKeluar/getKodeBarang",
            type: "GET",
            data: {
                _token: csrfToken,
                kodeType: kodeType
            },
            timeout: 30000,
            success: function (response) {
                kodeBarang.value = decodeHtmlEntities(response[0].KodeBarang.trim());
                uraian.focus();
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error:', error);
            }
        });
    }
}

primer2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (numeral(primer2.value).value() > numeral(primer.value).value() && keluar.checked) {
            Swal.fire({
                icon: 'error',
                text: 'Saldo Primer Tinggal: ' + numeral(numeral(primer.value).value()).format("0,0.00"),
                returnFocus: false
            }).then(() => {
                primer2.focus();
            });
        } else {
            sekunder2.focus();
        }
    }
});

sekunder2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (numeral(sekunder2.value).value() > numeral(sekunder.value).value() && keluar.checked) {
            Swal.fire({
                icon: 'error',
                text: 'Saldo Sekunder Tinggal: ' + numeral(numeral(sekunder.value).value()).format("0,0.00"),
                returnFocus: false
            }).then(() => {
                sekunder2.focus();
            });
        } else {
            tritier2.focus();
        }
    }
});

tritier2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if ((divisiId.value === 'ABM' && objekId.value === '022') || (divisiId.value === 'CIR' && objekId.value === '043') ||
        (divisiId.value === 'JBB' && objekId.value === '042') || (divisiId.value === 'EXT' && ((objekId.value === '1259' || objekId.value === '1283')))) {
            if (numeral(tritier2.value).value() > numeral(tritier.value).value() && keluar.checked) {
                Swal.fire({
                    icon: 'error',
                    text: 'Saldo Tritier Tinggal : ' + numeral(numeral(tritier.value).value()).format("0,0.00"),
                    returnFocus: false
                }).then(() => {
                    tritier2.focus();
                });

            } else {
                if (a === 1) {
                    sekunder2.value = Hitung_Hsl_Mtr() * parseFloat(tritier3.value);
                    btn_proses.focus();
                } else if (a === 2) {
                    sekunder2.value = Hitung_Hsl_Mtr_koreksi() * parseFloat(tritier3.value);
                    btn_proses.focus();
                }
            }
        }

        else {
            if (numeral(tritier2.value).value() > numeral(tritier.value).value() && keluar.checked) {
                Swal.fire({
                    icon: 'error',
                    text: 'Saldo Tritier Tinggal : ' + numeral(numeral(tritier.value).value()).format("0,0.00"),
                    returnFocus: false
                }).then(() => {
                    tritier2.focus();
                });

            } else {
                if (a === 1) {
                    btn_proses.focus();
                } else if (a === 2) {
                    btn_proses.focus();
                }
            }
        }
    }
});

function Hitung_Hsl_Mtr() {
    let jum = 0;
    let lebar = 0, waft = 0, weft = 0, denier = 0;

    for (let i = 0; i < namaBarang.value.trim().length; i++) {
        if (namaBarang.value.charAt(i) === '/') {
            jum++;
            switch (jum) {
                case 1:
                    lebar = parseFloat(namaBarang.value.substr(i + 1, 6));
                    break;
                case 2:
                    waft = parseFloat(namaBarang.value.substr(i + 1, 5));
                    weft = parseFloat(namaBarang.value.substr(i + 9, 5));
                    break;
                case 3:
                    denier = parseFloat(namaBarang.value.substr(i + 1, 5));
                    break;
            }
        }
    }

    let hitungHslMtr;

    if (subkelId.value === "0629" || subkelId.value === "0633" || subkelNama.value.startsWith("KAIN") || subkelNama.value.startsWith("KAIN NO LAMI")) {
        hitungHslMtr = (10 / (lebar / 2)) / ((waft + weft) / 20) / (denier * 2 / 2000) / 0.0175;
    } else {
        hitungHslMtr = (10 / lebar) / ((waft + weft) / 20) / (denier * 2 / 2000) / 0.0175;
    }

    return hitungHslMtr;
}

function Hitung_Hsl_Mtr_koreksi() {
    let jum = 0;
    let lebar = 0, waft = 0, weft = 0, denier = 0;

    for (let i = 0; i < data[1].trim().length; i++) {
        if (data[1].value.charAt(i) === '/') {
            jum++;
            switch (jum) {
                case 1:
                    lebar = parseFloat(data[1].substr(i + 1, 6));
                    break;
                case 2:
                    waft = parseFloat(data[1].substr(i + 1, 5));
                    weft = parseFloat(data[1].substr(i + 9, 5));
                    break;
                case 3:
                    denier = parseFloat(data[1].substr(i + 1, 5));
                    break;
            }
        }
    }

    let hitungHslMtrKoreksi;

    if (subkelId.value === "0629" || subkelId.value === "0633" || subkelNama.value.startsWith("KAIN") || subkelNama.value.startsWith("KAIN NO LAMI")) {
        hitungHslMtrKoreksi = (10 / (lebar / 2)) / ((waft + weft) / 20) / (denier * 2 / 2000) / 0.0175;
    } else {
        hitungHslMtrKoreksi = (10 / lebar) / ((waft + weft) / 20) / (denier * 2 / 2000) / 0.0175;
    }

    return hitungHslMtrKoreksi;
}


// fungsi unk dapatkan saldo primer, sekunder, tritier
function getSaldo(kodeType) {
    $.ajax({
        url: "MhnMasukKeluar/getSaldo",
        type: "GET",
        data: {
            _token: csrfToken,
            kodeType: kodeType
        },
        timeout: 30000,
        success: function (response) {
            if (response && response.length > 0) {
                primer.value = formatNumber(response[0].SaldoPrimer);
                sekunder.value = formatNumber(response[0].SaldoSekunder);
                tritier.value = formatNumber(response[0].SaldoTritier);

                uraian.select();
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

// fungsi unk dapatkan type dari kodetype
function getType(kodeType) {
    $.ajax({
        url: "MhnMasukKeluar/getSatuanType",
        type: "GET",
        data: {
            _token: csrfToken,
            kodeType: kodeType
        },
        timeout: 30000,
        success: function (response) {
            console.log(response);
            if (response && response.length > 0) {
                kodeBarang.value = response[0].KodeBarang.trim();
                no_primer.textContent = response[0].Satuan_Primer.trim();
                no_sekunder.textContent = response[0].Satuan_Sekunder.trim();
                no_tritier.textContent = response[0].Satuan_Tritier.trim();
                handleChange();
                no_primer.addEventListener('change', handleChange);
                no_sekunder.addEventListener('change', handleChange);
                no_tritier.addEventListener('change', handleChange);
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

function handleChange() {
    primerValue = no_primer.textContent.trim();
    sekunderValue = no_sekunder.textContent.trim();
    tritierValue = no_tritier.textContent.trim();
}

// fungsi unk update isi tabel
function updateDataTable(data) {
    console.log(data);

    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        var rowData = [
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim())
        ];

        // Handle Mutasi Masuk
        if (uraian.value === 'Mutasi Masuk') {
            rowData.push(
                escapeHtml(formatNumber(item.JumlahPemasukanPrimer)),
                escapeHtml(formatNumber(item.JumlahPemasukanSekunder)),
                escapeHtml(formatNumber(item.JumlahPemasukanTritier))
            );
        }
        // Handle Mutasi Keluar
        else if (uraian.value === 'Mutasi Keluar') {
            rowData.push(
                escapeHtml(formatNumber(item.JumlahPengeluaranPrimer)),
                escapeHtml(formatNumber(item.JumlahPengeluaranSekunder)),
                escapeHtml(formatNumber(item.JumlahPengeluaranTritier))
            );
        }

        rowData.push(
            escapeHtml(item.idtype.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.idpemberi.trim()),
            escapeHtml(item.IdDivisi.trim()),
            escapeHtml(item.IdObjek.trim()),
            escapeHtml(item.NamaObjek.trim()),
            escapeHtml(item.IdKelompokUtama.trim()),
            escapeHtml(item.NamaKelompokUtama.trim()),
            escapeHtml(item.IdKelompok.trim()),
            escapeHtml(item.NamaKelompok.trim()),
            escapeHtml(item.IdSubkelompok.trim()),
            escapeHtml(item.NamaSubKelompok.trim()),
            escapeHtml(item.Satuan_primer.trim()),
            escapeHtml(item.Satuan_Sekunder.trim()),
            escapeHtml(item.Satuan_Tritier.trim()),
            escapeHtml(item.kodebarang.trim())
        );

        table.row.add(rowData);

        // console.log(rowData);

    });

    table.draw();
}


$('#tableData tbody').on('click', 'tr', function () {
    if (a === 1) {
        Swal.fire({
            icon: 'warning',
            title: 'Tidak Bisa Pilih!',
            text: 'Proses Isi TIdak boleh pilih data di tabel ini!!',
            returnFocus: false,
        });
        return;
    }

    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();
    console.log(data);

    kodeTransaksi.value = data[0];
    namaBarang.value = decodeHtmlEntities(data[1]);
    primer2.value = formatNumber(data[2]);
    sekunder2.value = formatNumber(data[3]);
    tritier2.value = formatNumber(data[4]);
    kodeType.value = data[5];
    uraian.value = decodeHtmlEntities(data[6]);
    var originalDate = data[7];
    var parts = originalDate.split('/');
    var formattedDate = parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
    tanggal.value = formattedDate;

    kelompokNama.value = decodeHtmlEntities(data[10]);
    kelutNama.value = decodeHtmlEntities(data[12]);
    subkelNama.value = decodeHtmlEntities(data[14]);
    divisiId.value = data[9];
    objekId.value = data[10];
    kelompokId.value = data[12];
    kelutId.value = data[14];
    subkelId.value = data[16];

    no_primer.textContent = data[18] || '';
    no_sekunder.textContent = data[19] || '';
    no_tritier.textContent = data[20] || '';
    kodeBarang.value = data[21];

    if (a === 1 || a === 2) {
        primer2.select();
    } else {
        btn_proses.focus();
    }
});

// menampilkan semua data
function showTable() {
    $.ajax({
        type: 'GET',
        url: 'MhnMasukKeluar/getData',
        data: {
            _token: csrfToken,
            objekId: objekId.value,
            uraian: uraian.value
        },
        success: function (result) {
            console.log('tampil tabel', result);

            updateDataTable(result);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

let kode;

// button proses
btn_proses.addEventListener("click", function (e) {
    if (a === 1 || a === 2) {
        if (tanggal.valueAsDate > today) {
            Swal.fire({
                icon: 'warning',
                title: 'Perhatikan Tanggal!',
                text: 'Tanggal Mohon lebih besar dari tanggal hari ini',
                returnFocus: false,
            }).then(() => {
                tanggal.focus();
            });
        }
    }

    if (masuk.checked) {
        kode = 'M';
    } else {
        kode = 'K';
    }


    if (a === 3) {
        $.ajax({
            url: "MhnMasukKeluar/hapusMutasi",
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
                        title: 'Success',
                        text: response.success,
                        returnFocus: false,
                    }).then(() => {
                        clearInputs();
                        $('#tableData').show();
                        showTable();
                    });

                } else if (response.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.error,
                        returnFocus: false,
                    }).then(() => {
                        btn_proses.focus();
                    });

                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error:', error);
            }
        });
    } else {
        $.ajax({
            type: 'PUT',
            url: 'MhnMasukKeluar/proses',
            data: {
                _token: csrfToken,
                a: a,
                kode: kode,
                uraian: uraian.value,
                kodeType: kodeType.value,
                kodeTransaksi: kodeTransaksi.value,
                user: user.value,
                tanggal: tanggal.value,
                subkelId: subkelId.value,
                primer2: primer2.value,
                sekunder2: sekunder2.value,
                tritier2: tritier2.value,
                subkelId: subkelId.value
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
                        primer2.value = 0;
                        sekunder2.value = 0;
                        tritier2.value = 0;

                        $('#tableData').show();
                        showTable();

                        allInputs.forEach(function (input) {
                            let divAtas = input.closest('#top') !== null;
                            let divPenting = input.closest('#baris-1') !== null;
                            let divids = input.closest('#ids') !== null;
                            let uraianDetil = input.closest('#uraian') !== null;

                            if (!divAtas && !divPenting && !divids && !uraianDetil) {
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
                        $('#tableData').show();
                        showTable();
                        clearInputs();
                    });
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
            error: function (xhr, status, error) {
                console.error('AJAX Error:', error);
            }
        });
    }
});

disableKetik();
var allInputs = document.querySelectorAll('input');

// kosongin input
function clearInputs() {
    allInputs.forEach(function (input) {
        let divAtas = input.closest('#top') !== null;
        let divPenting = input.closest('#perlu') !== null;
        let divids = input.closest('#ids') !== null;
        let uraianDetil = input.closest('#uraian') !== null;
        let objekNama = input.closest('#objekNama') !== null;
        let objekId = input.closest('#objekId') !== null;

        if (!divAtas && !divPenting && !divids && !uraianDetil && !objekNama && !objekId) {
            input.value = '';
        }
    });

    primer.value = 0;
    sekunder.value = 0;
    tritier.value = 0;

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

    btn_objek.disabled = false;
    btn_objek.focus();
    enableKetik();

    primer.value = 0;
    sekunder.value = 0;
    tritier.value = 0;

    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;
    btn_hapus.disabled = true;
    tanggal.disabled = false;
});

// button batal event listener
btn_batal.addEventListener('click', function () {
    if (masuk.checked) {
        masuk.checked = false;
    } else {
        keluar.checked = false;
    }

    disableKetik();
    clearInputs();

    btn_objek.disabled = true;
    btn_kelut.disabled = true;
    btn_kelompok.disabled = true;
    btn_subkel.disabled = true;
    btn_kodeType.disabled = true;
    btn_hapus.disabled = false;

    $('#tableData').hide();
});

// button koreksi event listener
btn_koreksi.addEventListener('click', function () {
    a = 2;
    enableKetik();

    primer.value = 0;
    sekunder.value = 0;
    tritier.value = 0;

    primer2.value = 0;
    sekunder2.value = 0;
    tritier2.value = 0;

    btn_objek.disabled = false;
    btn_objek.focus();
    btn_hapus.disabled = true;
});

// button hapus event listener
btn_hapus.addEventListener('click', function () {
    a = 3;

    primer.value = 0;
    sekunder.value = 0;
    tritier.value = 0;

    if (divisiId.value === '') {
        btn_divisi.focus();
    } else {
        btn_objek.disabled = false;
        btn_objek.focus();
    }

    enableKetik();
    btn_hapus.disabled = true;

});
