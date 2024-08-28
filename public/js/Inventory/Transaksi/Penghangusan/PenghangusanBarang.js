var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiNama = document.getElementById('divisiNama');
var tanggal = document.getElementById('tanggal');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var pemohon = document.getElementById('pemohon');
var objekNama = document.getElementById('objekNama');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var kodeTransaksi = document.getElementById('kodeTransaksi');
var kodeBarang = document.getElementById('kodeBarang');
var kodeType = document.getElementById('kodeType');
var namaBarang = document.getElementById('namaBarang');
var primer = document.getElementById('primer');
var no_primer = document.getElementById('no_primer');
var sekunder = document.getElementById('sekunder');
var no_sekunder = document.getElementById('no_sekunder');
var tritier = document.getElementById('tritier');
var no_tritier = document.getElementById('no_tritier');
var alasan = document.getElementById('alasan');
var primer2 = document.getElementById('primer2');
var sekunder2 = document.getElementById('sekunder2');
var tritier2 = document.getElementById('tritier2');
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
var btn_namaBarang = document.getElementById('btn_namaBarang');

var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

var table;
let a; // isi = 1, koreksi = 2, hapus = 3
const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));

tanggal.value = todayString;

btn_divisi.addEventListener('focus', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btn_objek.addEventListener('focus', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// fungsi dapetin user id unk pemohon
function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'PenghangusanBarang/getUserId',
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

// fungsi berhubungan dengan ENTER & oengecekkan yg kosong2
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.value.trim() !== '') {
                if (masuk.id === 'ketType') {
                    btn_triter.focus();
                } else if (masuk.id === 'primerSekunder') {
                    sekunderTritier.select();
                } else if (masuk.id === 'primer2') {
                    sekunder2.select();
                } else if (masuk.id === 'sekunder2') {
                    tritier2.select();
                } else if (masuk.id === 'alasan') {
                    btn_proses.focus();
                } else {
                    inputs[index + 1].focus();
                }
            } else {
                if (masuk.id === 'alasan') {
                    btn_proses.focus();
                } else {
                    inputs[index + 1].focus();
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
                            url: "PenghangusanBarang/getDivisi",
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
                console.log(result);

                divisiId.value = result.value.IdDivisi.trim();
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());

                allData();

                btn_isi.disabled = false;
                btn_koreksi.disabled = false;
                btn_hapus.disabled = false;

                if (a === 1) {
                    btn_objek.focus();
                } else {
                    btn_isi.focus();
                }

            }
        });
    } catch (error) {
        console.error(error);
    }
});

divisiId.addEventListener('input', function () {
    allData();
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
                        order: [1, "asc"],
                        ajax: {
                            url: "PenghangusanBarang/getObjek",
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
                        order: [1, "asc"],
                        ajax: {
                            url: "PenghangusanBarang/getKelUt",
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
                            url: "PenghangusanBarang/getKelompok",
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
                            url: "PenghangusanBarang/getSubkel",
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
                btn_kodeType.focus();
                subkelId.value = result.value.IdSubkelompok.trim();
                subkelNama.value = result.value.NamaSubKelompok.trim();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// fungsi unk yg ABM
function loadABM() {
    $.ajax({
        url: "PenghangusanBarang/getABM",
        type: "GET",
        data: {
            _token: csrfToken,
            subkelId: subkelId.value
        },
        timeout: 30000,
        success: function (response) {
            if (response && response.length > 0) {
                kodeType.value = response.value.idtype.trim();
                namaBarang.value = response.value.BARU.trim();
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

const formatNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '0.00' : number.toFixed(2);
};

// fungsi unk dapatkan saldo primer, sekunder, tritier
function getSaldo(kodeType) {
    $.ajax({
        url: "PenghangusanBarang/getSaldo",
        type: "GET",
        data: {
            _token: csrfToken,
            kodeType: kodeType
        },
        timeout: 30000,
        success: function (response) {
            if (response && response.length > 0) {
                primer.value = formatNumber(response[0].SaldoPrimer.trim());
                sekunder.value = formatNumber(response[0].SaldoSekunder.trim());
                tritier.value = formatNumber(response[0].SaldoTritier.trim());
            }
            alasan.focus();
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });

}

// fungsi unk dapatkan type dari kodetype
function getType(kodeType) {
    $.ajax({
        url: "PenghangusanBarang/getSatuanType",
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
                no_primer.value = response[0].Satuan_Primer.trim();
                no_sekunder.value = response[0].Satuan_Sekunder.trim();
                no_tritier.value = response[0].Satuan_Tritier.trim();
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
    primerValue = no_primer.value.trim();
    sekunderValue = no_sekunder.value.trim();
    tritierValue = no_tritier.value.trim();

    if (primerValue === 'NULL' && sekunderValue === 'NULL') {
        primer2.disabled = true;
        sekunder2.disabled = true;
    } else if (primerValue === 'NULL' && sekunderValue !== 'NULL') {
        primer2.disabled = true;
        sekunder2.disabled = false;
    }
}

// button kode type & nama type sama
btn_kodeType.addEventListener("click", handleTypeSelection);
btn_namaBarang.addEventListener("click", handleTypeSelection);

function handleTypeSelection() {
    if ((divisiNama.value === 'ABM' && objekId === '022') || (divisiNama.value === 'CIR' && objekId === '043') ||
        (divisiNama.value === 'JBB' && objekId === '042') || (divisiNama.value === 'EXT' && ((objekId === '1259' || objekId === '1283')))) {
        if (divisiNama.value === 'ABM' && objekId === '022') {
            if (subkelId !== '') {
                loadABM();
                if (kodeType.value !== '') {
                    if (getType(kodeType.value)) {
                        getSaldo(kodeType.value);
                    }
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Data Belum Lengkap Terisi',
                        text: 'Pilih dulu Type Barangnya !',
                        returnFocus: false
                    }).then(() => {
                        kdBarang.focus();
                    });
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
                getSaldo(kodeType.value);
                getTypeCIR();
                if (kodeType.value !== '') {
                    if (getType(kodeType.value)) {
                        // getSaldo(kodeType.value);
                        alasan.focus();
                    }
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Data Belum Lengkap Terisi',
                    text: 'Pilih dulu Type Barangnya !',
                    returnFocus: false
                }).then(() => {
                    kdBarang.focus();
                });
            }
        }
    } else {
        if (subkelId !== '') {
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
                                    url: "PenghangusanBarang/getType",
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
                        namaBarang.value = decodeHtmlEntities(result.value.NamaType.trim());

                        getType(kodeType.value);

                        if (namaBarang.value !== '') {
                            getSaldo(kodeType.value);
                            alasan.focus();
                        }
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}

// fungsi unk dpt nama type & kode type
function getTypeCIR() {
    $.ajax({
        url: "PenghangusanBarang/getTypeCIR",
        type: "GET",
        data: {
            _token: csrfToken
        },
        timeout: 30000,
        success: function (response) {
            if (response && response.length > 0) {
                kodeType.value = response.value.Id_Type.trim();
                namaBarang.value = response.value.Nm_Type.trim();
            }
            alasan.focus();
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
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
            { title: 'Divisi' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
            { title: 'Kode Type' },
            { title: 'Kode Barang' }
        ]
    });
});

// update table
function allData() {
    table = $('#tableData').DataTable();
    table.clear().draw();

    $.ajax({
        url: "PenghangusanBarang/getAllData",
        type: "GET",
        data: {
            _token: csrfToken,
            divisiId: divisiId.value
        },
        timeout: 30000,
        success: function (response) {
            if (response) {
                var tableData = [];
                response.data_allData.forEach(function (item) {
                    tableData.push([
                        item.IdTransaksi,
                        item.NamaType,
                        item.UraianDetailTransaksi,
                        item.IdPenerima,
                        item.SaatAwalTransaksi,
                        item.NamaDivisi,
                        item.NamaObjek,
                        item.NamaKelompokUtama,
                        item.NamaKelompok,
                        item.NamaSubKelompok,
                        item.IdType,
                        item.KodeBarang
                    ]);
                });

                table.rows.add(tableData).draw();

                subkelId.value = response.data_allData[0].IdSubkelompok.trim();

                if (response.data_pemasukan.length > 0) {
                    primer2.value = formatNumber(response.data_pemasukan[0].JumlahPemasukanPrimer.trim());
                    sekunder2.value = formatNumber(response.data_pemasukan[0].JumlahPemasukanSekunder.trim());
                    tritier2.value = formatNumber(response.data_pemasukan[0].JumlahPemasukanTritier.trim());
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

// ngisi input kalo select table
$('#tableData tbody').on('click', 'tr', function () {
    table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();

    console.log(data);

    kodeTransaksi.value = data[0];
    namaBarang.value = decodeHtmlEntities(data[1]);
    alasan.value = decodeHtmlEntities(data[2]);
    var originalDate = data[4];
    var parts = originalDate.split('/');
    var formattedDate = parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
    tanggal.value = formattedDate;
    divisiNama.value = decodeHtmlEntities(data[5]);
    objekNama.value = decodeHtmlEntities(data[6]);
    kelutNama.value = decodeHtmlEntities(data[7]);
    kelompokNama.value = decodeHtmlEntities(data[8]);
    subkelNama.value = decodeHtmlEntities(data[9]);
    kodeType.value = data[10];
    kodeBarang.value = data[11];
    kodeTransaksi.value = data[0];

    getType(kodeType.value);
    getSaldo(kodeType.value);

});

// kosongin input bawah tabel
function clearInputs() {
    allInputs.forEach(function (input) {
        let divBaris1 = input.closest('#baris-1') !== null;
        let divSatuan2 = input.closest('#satuan2') !== null;
        let inputTanggal = input.closest('#tanggal') !== null;
        let divids = input.closest('#ids') !== null;
        if (!divBaris1 && !divSatuan2 && !divids && !inputTanggal) {
            input.value = '';
            input.disabled = false;
        }
    });
}

function handleAJAXError(xhr, status, error) {
    console.error('AJAX Error:', error);
}

function showAlert(icon, title, callback) {
    Swal.fire({
        icon: icon,
        title: title,
        returnFocus: false
    }).then(callback);
}

// button proses
btn_proses.addEventListener("click", function (e) {
    if (a === 1) {
        if (tanggal.valueAsDate > today) {
            showAlert('warning', 'Tanggal Lebih Besar Dari Tanggal Sekarang', () => tanggal.focus());
            return;
        }

        if (tritier.value < tritier2.value) {
            showAlert('warning', 'Perhatikan Tritier', () => tritier2.focus());
            return;
        }
    }

    if (a === 3) {
        $.ajax({
            url: "PenghangusanBarang/hapusBarang",
            type: "DELETE",
            data: {
                _token: csrfToken,
                kodeTransaksi: kodeTransaksi.value
            },
            timeout: 30000,
            success: function (response) {
                if (response.success) {
                    showAlert('success', 'Data terHAPUS', () => {
                        disableKetik();
                        clearInputs();
                        allData();
                        btn_isi.focus();
                    });
                } else if (response.error) {
                    showAlert('warning', 'Data Tidak ter-HAPUS.');
                }
            },
            error: handleAJAXError
        });
    }

    $.ajax({
        type: 'GET',
        url: 'PenghangusanBarang/proses',
        data: {
            _token: csrfToken,
            a: a,
            kodeType: kodeType.value,
            pemohon: pemohon.value,
            tanggal: tanggal.value,
            primer2: primer2.value,
            sekunder2: sekunder2.value,
            tritier2: tritier2.value,
            subkelId: subkelId.value,
            alasan: alasan.value,
            kodeTransaksi: kodeTransaksi.value,

        },
        timeout: 30000,
        success: function (response) {
            if (a === 1 && response.success) {
                showAlert('success', 'Data terSIMPAN', () => {
                    allData();
                    btn_kodeType.focus();
                    clearInputs();
                });
            } else if (a === 2 && response.success) {
                showAlert('success', 'Data terKOREKSI', () => {
                    allData();
                    clearInputs();
                    btn_isi.focus();
                });
            } else if (response.error) {
                showAlert('warning', 'Data Gagal ter-SIMPAN.');
            }
        },
        error: handleAJAXError
    });
});


var allInputs = document.querySelectorAll('input');
const buttons = document.querySelectorAll('.btn-info');

disableKetik();
btn_divisi.disabled = false;
btn_divisi.focus();

btn_isi.disabled = true;
btn_koreksi.disabled = true;
btn_hapus.disabled = true;

// fungsi bisa ketik
function enableKetik() {
    clearInputs();

    // disable semua button
    buttons.forEach(button => {
        button.disabled = false;
    });

    // hide button isi, tampilkan button proses
    btn_isi.style.display = 'none';
    btn_proses.style.display = 'inline-block';
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_kodeType.disabled = false;
    btn_namaBarang.disabled = false;

    primer2.disabled = false;
    sekunder2.disabled = false;
    tritier2.disabled = false;
}

// fungsi gak bisa ketik
function disableKetik() {
    allInputs.forEach(function (input) {
        input.disabled = true;
    });

    // disable semua button
    buttons.forEach(button => {
        button.disabled = true;
    });

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
    enableKetik();
    btn_objek.focus();
    btn_hapus.disabled = true;
});

// button batal event listener
btn_batal.addEventListener('click', function () {
    btn_hapus.disabled = false;
    disableKetik();
});

// button koreksi event listener
btn_koreksi.addEventListener('click', function () {
    a = 2;

    if (kodeTransaksi.value === '') {
        showAlert('warning', 'Pilih dulu data yg akan diKOREKSI !', () => btn_kodeType.focus());
        return;
    } else {
        kodeBarang.disabled = false;
        alasan.disabled = false;

        // hide button isi, tampilkan button proses
        btn_isi.style.display = 'none';
        btn_proses.style.display = 'inline-block';
        // hide button koreksi, tampilkan button batal
        btn_koreksi.style.display = 'none';
        btn_batal.style.display = 'inline-block';

        btn_kodeType.disabled = false;
        btn_namaBarang.disabled = false;

        primer2.disabled = false;
        sekunder2.disabled = false;
        tritier2.disabled = false;

        btn_hapus.disabled = true;
        alasan.select();
    }
});

// button hapus event listener
btn_hapus.addEventListener('click', function () {
    a = 3;
    if (kodeTransaksi.value === '') {
        showAlert('warning', 'Pilih dulu data yg akan diHAPUS', () => btn_kodeType.focus());
        return;
    } else {
        kodeBarang.disabled = false;
        alasan.disabled = false;

        // hide button isi, tampilkan button proses
        btn_isi.style.display = 'none';
        btn_proses.style.display = 'inline-block';
        // hide button koreksi, tampilkan button batal
        btn_koreksi.style.display = 'none';
        btn_batal.style.display = 'inline-block';

        btn_kodeType.disabled = false;
        btn_namaBarang.disabled = false;

        primer2.disabled = false;
        sekunder2.disabled = false;
        tritier2.disabled = false;

        btn_hapus.disabled = true;
    }
});
