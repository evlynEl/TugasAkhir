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

var alasan = document.getElementById('alasan');
var primer2 = document.getElementById('primer2');
var sekunder2 = document.getElementById('sekunder2');
var tritier2 = document.getElementById('tritier2');
var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var kelompokId = document.getElementById('kelompokId');
var kelutId = document.getElementById('kelutId');
var subkelId = document.getElementById('subkelId');

var idType;
var keluarPrimer;
var keluarSekunder;
var keluarTritier;

// button
var btn_divisi = document.getElementById('btn_divisi');
var btn_proses = document.getElementById('btn_proses');

var table;
var idTransaksi;
const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));

tanggal.value = todayString;

btn_divisi.addEventListener('focus', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btn_divisi.focus();

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

// fungsi unk format .00
function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
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
                            url: "AccPenghangusanBarang/getDivisi",
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

                if (divisiId.value === 'INV' || divisiId.value === 'MNV' || divisiId.value === 'MWH') {
                    btn_objek.disabled = false;
                    btn_objek.focus();
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

$(document).ready(function () {
    table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: '', orderable: false, className: 'select-checkbox', defaultContent: '' }, // Checkbox column
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
            { title: 'Kode Barang' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
        ],
        columnDefs: [
            {
                targets: 0,
                data: null,
                defaultContent: '<input type="checkbox" class="row-checkbox">',
            }
        ],
        order: [[1, 'asc']]
    });

    // Handle "Centang All" checkbox
    $('#centang').on('change', function () {
        var checked = this.checked;
        $('#tableData tbody .row-checkbox').prop('checked', checked);

        if (checked) {
            $('#tableData tbody tr').addClass('selected');
        } else {
            $('#tableData tbody tr').removeClass('selected');
        }
    });

    $('#tableData tbody').on('change', '.row-checkbox', function () {
        if (!this.checked) {
            $('#centang').prop('checked', false);
        } else {
            if ($('#tableData tbody .row-checkbox:checked').length === $('#tableData tbody .row-checkbox').length) {
                $('#centang').prop('checked', true);
            }
        }
    });
});



// ngisi input kalo select table
$('#tableData tbody').on('click', 'tr', function (event) {
    // Prevent triggering the row selection if the checkbox is clicked
    if ($(event.target).is('.row-checkbox')) {
        return;
    }

    table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    console.log(data);

    idTransaksi = data[1];

    alasan.value = decodeHtmlEntities(data[3]);
    var originalDate = data[5];
    var parts = originalDate.split('/');
    var formattedDate = parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
    tanggal.value = formattedDate;
    divisiNama.value = decodeHtmlEntities(data[6]);
    objekNama.value = decodeHtmlEntities(data[7]);
    kelutNama.value = decodeHtmlEntities(data[8]);
    kelompokNama.value = decodeHtmlEntities(data[9]);
    subkelNama.value = decodeHtmlEntities(data[10]);

    idType = formatNumber(data[11]);
    keluarPrimer = formatNumber(data[12]);
    keluarSekunder = formatNumber(data[13]);
    keluarTritier = formatNumber(data[14]);

    $.ajax({
        type: 'GET',
        url: 'AccPenghangusanBarang/getType',
        data: {
            _token: csrfToken,
            idTransaksi: idTransaksi,
        },
        success: function (result) {
            if (result[0]) {
                primer.value = formatNumber(result[0].SaldoPrimer);
                sekunder.value = formatNumber(result[0].SaldoSekunder);
                tritier.value = formatNumber(result[0].SaldoTritier);

                no_primer.value = decodeHtmlEntities(result[0].Satuan_Primer.trim());
                no_sekunder.value = decodeHtmlEntities(result[0].Satuan_Sekunder.trim());
                no_tritier.value = decodeHtmlEntities(result[0].Satuan_Tritier.trim());

                primer2.value = formatNumber(result[0].JumlahPengeluaranPrimer);
                sekunder2.value = formatNumber(result[0].JumlahPengeluaranSekunder);
                tritier2.value = formatNumber(result[0].JumlahPengeluaranTritier);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});


// update table
function allData() {
    table = $('#tableData').DataTable();
    table.clear().draw();

    $.ajax({
        url: "AccPenghangusanBarang/getAllData",
        type: "GET",
        data: {
            _token: csrfToken,
            divisiId: divisiId.value,
            objekId: objekId.value
        },
        timeout: 30000,
        success: function (response) {
            if (response) {
                console.log(response);
                var tableData = [];
                response.forEach(function (item) {
                    tableData.push([
                        '<input type="checkbox" class="row-checkbox">',
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
                        item.KodeBarang,
                        item.JumlahPengeluaranPrimer,
                        item.JumlahPengeluaranSekunder,
                        item.JumlahPengeluaranTritier
                    ]);
                });
                table.rows.add(tableData).draw();
                subkelId.value = response[0].IdSubkelompok.trim();
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}


var allInputs = document.querySelectorAll('input');
const buttons = document.querySelectorAll('.btn-info');

// button proses event listener
btn_proses.addEventListener('click', function () {
    btn_objek.disabled = true;

    $.ajax({
        type: 'PUT',
        url: 'AccPenghangusanBarang/proses',
        data: {
            _token: csrfToken,
            idTransaksi: idTransaksi,
            idType: idType,
            keluarPrimer: keluarPrimer,
            keluarSekunder: keluarSekunder,
            keluarTritier: keluarTritier
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                    returnFocus: false,
                }).then(() => {
                    allData();
                    btn_divisi.focus();
                });
            } else if (response.warning) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Tidak Bisa Di Acc !',
                    text: response.warning,
                    returnFocus: false,
                }).then(() => {
                    btn_divisi.focus();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

