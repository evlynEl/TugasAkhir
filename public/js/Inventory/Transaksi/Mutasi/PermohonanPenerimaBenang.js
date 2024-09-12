var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var tanggal = document.getElementById('tanggal');
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
var primer = document.getElementById('primer');
var sekunder = document.getElementById('sekunder');
var tritier = document.getElementById('tritier');
var no_primer = document.getElementById('no_primer');
var no_sekunder = document.getElementById('no_sekunder');
var no_tritier = document.getElementById('no_tritier');

var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var typeKonv = document.getElementById('typeKonv');
var idKonv = document.getElementById('idKonv');

// button
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_refresh = document.getElementById('btn_refresh');
var btn_ok = document.getElementById('btn_ok');
var btn_konversi = document.getElementById('btn_konversi');
var btn_typeKonv = document.getElementById('btn_typeKonv');

var today = new Date().toISOString().slice(0, 10);
tanggal.value = (today);

let simpan, ada, Yidtransaksi, YKdBrg, jumlah, YidType, YidTypePenerima;

btn_ok.focus();

divisiNama.value = 'Circular loom';
objekId.value = '095';
objekNama.value = 'Bahan Baku';

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

$(document).ready(function () {
    table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'ID Trans' },
            { title: 'Barang' },
            { title: 'Alasan Mutasi' },
            { title: 'Kelut Penerima' },
            { title: 'Kel Penerima' },
            { title: 'SubKel' },
            { title: 'Pemohon' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
            { title: 'Tgl Mohon' },
            { title: 'KdBrg' },
            { title: 'IdSubkel' }
        ],
        order: [[1, 'asc']]
    });
});

// fungsi unk update isi tabel
function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.NamaKelompokUtama.trim()),
            escapeHtml(item.NamaKelompok.trim()),
            escapeHtml(item.NamaSubKelompok.trim()),
            escapeHtml(item.IdPemberi.trim()),
            escapeHtml(formatNumber(item.JumlahPengeluaranPrimer.trim())),
            escapeHtml(formatNumber(item.JumlahPengeluaranSekunder.trim())),
            escapeHtml(formatNumber(item.JumlahPengeluaranTritier.trim())),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.KodeBarang.trim()),
            escapeHtml(item.TujuanIdSubkelompok.trim())
        ]);
    });
    table.draw();
}


$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();
    var checkbox = $(this).find('input.row-checkbox');

    // console.log(data);

    kodeTransaksi.value = data[0];
    namaBarang.value = decodeHtmlEntities(data[1]);
    kelutNama.value = decodeHtmlEntities(data[3]);
    kelompokNama.value = decodeHtmlEntities(data[4]);
    subkelNama.value = decodeHtmlEntities(data[5]);
    primer.value = formatNumber(data[7]);
    sekunder.value = formatNumber(data[8]);
    tritier.value = formatNumber(data[9]);

    $.ajax({
        type: 'GET',
        url: 'PermohonanPenerimaBenang/getSelect',
        data: {
            _token: csrfToken,
            kodeTransaksi: kodeTransaksi.value
        },
        success: function (result) {
            if (result) {
                divisiNama2.value = result[0].NamaDivisi.trim();
                objekNama2.value = result[0].NamaObjek.trim();
                kelutNama2.value = result[0].NamaKelompokUtama.trim();
                kelompokNama2.value = result[0].NamaKelompok.trim();
                subkelNama2.value = result[0].NamaSubKelompok.trim();

                no_primer.value = result[0].Satuan_Primer?.trim() || '';
                no_sekunder.value = result[0].Satuan_Sekunder?.trim() || '';
                no_tritier.value = result[0].Satuan_Tritier?.trim() || '';
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

// menampilkan semua data
function showTable() {
    $.ajax({
        type: 'GET',
        url: 'PermohonanPenerimaBenang/getData',
        data: {
            _token: csrfToken,
            objekId: objekId.value,
            divisiNama: divisiNama.value
        },
        success: function (response) {
            if (response.warning) {
                Swal.fire({
                    icon: 'warning',
                    html: response.warning,
                    returnFocus: false
                });
            } else {
                updateDataTable(response);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btn_ok.addEventListener('click', function () {
    showTable();
    btn_ok.disabled = true;
});

btn_refresh.addEventListener('click', function () {
    showTable();
});

btn_typeKonv.addEventListener('click', function () {
    try {
        Swal.fire({
            title: 'Konversi',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id Konversi</th>
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
                            url: "MhnPenerima/getTypeKonv",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
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
                typeKonv.value = result.value.NamaType.trim();
                idKonv.value = result.value.IdType.trim();

                btn_objek.disabled = false;
                btn_objek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function cekPemberi(Yidtransaksi) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'PermohonanPenerimaBenang/getPemberi',
            data: {
                _token: csrfToken,
                Yidtransaksi: Yidtransaksi
            },
            success: function (response) {
                jumlah = parseFloat(response[0].jumlah.trim());
                YidType = response[0].IdType.trim();

                if (jumlah >= 1) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning!',
                        text: `Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type ${YidType} Pada divisi pemberi`,
                        returnFocus: false
                    }).then(() => {
                        reject('Jumlah >= 1');
                    });
                } else {
                    resolve(true);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
}


function cekPenerima(Yidtransaksi, kodeBarang) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'PermohonanPenerimaBenang/getPenerima',
            data: {
                _token: csrfToken,
                Yidtransaksi: Yidtransaksi,
                kodeBarang: kodeBarang
            },
            success: function (response) {
                jumlah = parseFloat(response[0].jumlah.trim());
                YidTypePenerima = response[0].IdType.trim();

                if (jumlah >= 1) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning!',
                        text: `Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type ${YidType} Pada divisi penerima`,
                        returnFocus: false
                    }).then(() => {
                        reject('Jumlah >= 1');
                    });
                } else {
                    resolve(true);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
}

function cekKonversi(namaBarang) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'PermohonanPenerimaBenang/getKonversi',
            data: {
                _token: csrfToken,
                namaBarang: namaBarang
            },
            success: function (response) {
                if (response[0] && response[0].Result) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
}


function cariType(namaBarang) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'PermohonanPenerimaBenang/getType',
            data: {
                _token: csrfToken,
                namaBarang: namaBarang,
                subke
            },
            success: function (response) {
                if (response[0] && response[0].Result) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
}



btn_proses.addEventListener('click', function () {
    cekPemberi(Yidtransaksi)
        .then(() => {
            return cekPenerima(Yidtransaksi, kodeBarang);
        })
        .then(YidTypePenerima => {
            return $.ajax({
                type: 'PUT',
                url: 'PermohonanPenerimaBenang/proses',
                data: {
                    _token: csrfToken,
                    YIdTrans: YIdTrans,
                    primer: formatNumber(data[7]),
                    sekunder: formatNumber(data[8]),
                    tritier: formatNumber(data[9]),
                    YidType: YidType,
                    YidTypePenerima: YidTypePenerima
                }
            });
        })
        .then(result => {
            // Handle successful AJAX response
            console.log('Success:', result);
        })
        .catch(error => {
            // Handle any errors or rejections
            console.error('Error:', error);
        });
});

