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
var primer = document.getElementById('primer');
var sekunder = document.getElementById('sekunder');
var tritier = document.getElementById('tritier');
var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var no_primer = document.getElementById('no_primer');
var no_sekunder = document.getElementById('no_sekunder');
var no_tritier = document.getElementById('no_tritier');

tanggal.value = todayString;
btn_objek.disabled = true;

primer.value = 0;
sekunder.value = 0;
tritier.value = 0;

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
        url: 'AccMhnMasukKeluar/getUserId',
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

$('#tableData tbody').on('click', 'tr', function () {
    if (a === 1) {
        Swal.fire({
            icon: 'warning',
            title: 'Tidak Bisa Pilih!',
            text: 'Proses Isi TIdak boleh pilih data di tabel ini!!',
            returnFocus: false,
        }).then(() => {
            return;
        });
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
    kodeBarang.value = data[7];

    kelompokNama.value = decodeHtmlEntities(data[10]);
    kelutNama.value = decodeHtmlEntities(data[12]);
    subkelNama.value = decodeHtmlEntities(data[14]);
    divisiId.value = data[8];
    objekId.value = data[9];
    kelompokId.value = data[11];
    kelutId.value = data[13];
    subkelId.value = data[15];

    no_primer.textContent = data[17] || '';
    no_sekunder.textContent = data[18] || '';
    no_tritier.textContent = data[19] || '';
    uraian.value = decodeHtmlEntities(data[20]);
    var originalDate = data[21];
    var parts = originalDate.split('/');
    var formattedDate = parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
    tanggal.value = formattedDate;
    user.value = data[22];
    kodeBarang.value = data[23];

    if (a === 1 || a === 2) {
        primer2.select();
    } else {
        btn_proses.focus();
    }
});

$(document).ready(function () {
    table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: '', orderable: false, className: 'select-checkbox', data: null, defaultContent: '' }, // Checkbox
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
        columnDefs: [
            {
                targets: 0,
                orderable: false,
                className: 'select-checkbox',
                render: function (data, type, row, meta) {
                    return `<input type="checkbox" class="row-checkbox"
                                data-id="${row[1]}"
                                data-type="${row[11]}"
                                data-primer="${row[13]}"
                                data-sekunder="${row[14]}"
                                data-tritier="${row[15]}">`;
                }
            }
        ],
        order: [[1, 'asc']]
    });

    // update array unk centang
    $('#tableData').on('change', '.row-checkbox', function () {
        var id = $(this).data('id');
        var type = $(this).data('type');
        var primer = formatNumber($(this).data('primer'));
        var sekunder = formatNumber($(this).data('sekunder'));
        var tritier = formatNumber($(this).data('tritier'));

        if ($(this).is(':checked')) {
            selectedData.idTransaksi.push(id);
            selectedData.idType.push(type);
            selectedData.keluarPrimer.push(primer);
            selectedData.keluarSekunder.push(sekunder);
            selectedData.keluarTritier.push(tritier);
        } else {
            var index = selectedData.idTransaksi.indexOf(id);
            if (index !== -1) {
                selectedData.idTransaksi.splice(index, 1);
                selectedData.idType.splice(index, 1);
                selectedData.keluarPrimer.splice(index, 1);
                selectedData.keluarSekunder.splice(index, 1);
                selectedData.keluarTritier.splice(index, 1);
            }
        }
    });

});

// menampilkan semua data
function showTable() {
    $('.divTable').show();

    $.ajax({
        type: 'GET',
        url: 'AccMhnMasukKeluar/getData',
        data: {
            _token: csrfToken,
            objekId: objekId.value,
            uraian: uraian.value
        },
        success: function (result) {
            updateDataTable(result);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
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
                            order: [1, "asc"],
                            ajax: {
                                url: "AccMhnMasukKeluar/getDivisi",
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

                    btn_isi.focus();
                    uraian.disabled = false;

                    if (a === 1 || a === 3) {
                        btn_objek.focus();
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
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "AccMhnMasukKeluar/getObjek",
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
