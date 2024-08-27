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
var btn_divisiPenerima = document.getElementById('btn_divisiPenerima');
var btn_objekPenerima = document.getElementById('btn_objekPenerima');
var btn_kelompokPenerima = document.getElementById('btn_kelompokPenerima');
var btn_kelutPenerima = document.getElementById('btn_kelutPenerima');
var btn_subkelPenerima = document.getElementById('btn_subkelPenerima');
var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');


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

$(document).ready(function () {
    divisiId.value = 'EXT';
    divisiNama.value = 'EXTRUDER';
    objekId.value = '032';
    objekNama.value = 'Bahan & Hasil Produksi';

    var today = new Date().toISOString().split('T')[0];
    tanggal.value = today;
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
            escapeHtml(item.AwalTrans),
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.IdType),
            escapeHtml(item.TypeTransaksi),
            escapeHtml(item.NamaType),
            formatNumber(item.JumlahPemasukanPrimer),
            formatNumber(item.JumlahPemasukanSekunder),
            formatNumber(item.JumlahPemasukanTritier),
            formatNumber(item.JumlahPengeluaranPrimer),
            formatNumber(item.JumlahPengeluaranSekunder),
            formatNumber(item.JumlahPengeluaranTritier),
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
    let IdType = data[2];

    console.log(IdType);

    $.ajax({
        type: 'GET',
        url: 'TerimaBenangTropodo/getSaldo',
        data: {
            IdType: IdType,
            _token: csrfToken
        },
        success: function (result) {
            if (result) {
                triter.value = formatNumber(result[0].SaldoTritier);
                primer.value = formatNumber(result[0].SaldoPrimer);
                sekunder.value = formatNumber(result[0].SaldoSekunder);
                satuanPrimer.value = result[0].SatPrimer ?? '';
                satuanSekunder.value = result[0].SatSekunder ?? '';
                satuanTritier.value = result[0].SatTritier ?? '';
            }
            else {
                triter.value = '';
                primer.value = '';
                sekunder.value = '';
                satuanPrimer.value = '';
                satuanSekunder.value = '';
                satuanTritier.value = '';
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
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
                            url: "TerimaBenangTropodo/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
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

                kelompokId.value = '';
                kelompokNama.value = '';

                if (kelutId.value == '2481') {
                    kelutIdPenerima.value = '2486';
                    kelutNamaPenerima.value = 'Benang <Fas>';
                    kelompokIdPenerima.value = '009675';
                    kelompokNamaPenerima.value = 'Stok Benang Expedisi';
                }
                else if (kelutId.value == '0121') {
                    kelutIdPenerima.value = '0713';
                    kelutNamaPenerima.value = 'Benang <Lokal, ASEAN, dan Non Fas>';
                    kelompokIdPenerima.value = '002586';
                    kelompokNamaPenerima.value = 'Stok Benang Expedisi';
                }
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
                            url: "TerimaBenangTropodo/getKelompok",
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

                subkelId.value = '';
                subkelNama.value = '';

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
            title: '',
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
                            url: "TerimaBenangTropodo/getSubkel",
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

                namaType.value = '';
                kodeType.value = '';
                
                btn_namatype.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


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
                            url: "TerimaBenangTropodo/getIdType",
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
                kodeType.value = decodeHtmlEntities(result.value.IdType.trim());
                namaType.value = decodeHtmlEntities(result.value.NamaType.trim());
                
                $.ajax({
                    type: 'GET',
                    url: 'TerimaBenangTropodo/getType',
                    data: {
                        IdType: kodeType.value,
                        IdSubKel: subkelId.value,
                        _token: csrfToken
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            namaType.value = decodeHtmlEntities(result[0].NamaType.trim());
                            kodeType.value = decodeHtmlEntities(result[0].IdType.trim());
                            pib.value = result[0].PIB ? decodeHtmlEntities(result[0].PIB.trim()) : '';
                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                text: 'Tidak ada barang: ' + kodeType.value + ' pada sub kelompok ' + subkelId.value +'.',
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
