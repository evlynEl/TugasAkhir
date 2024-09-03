var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var btnDivisi = document.getElementById('btn_divisi');
var btn_proses = document.getElementById('btn_proses');

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

var selectedData = {
    XIdTransaksi: [],
    XIdType: [],
    XKeluarPrimer: [],
    XKeluarSekunder: [],
    XKeluarTritier: [],
    XMasukPrimer: [],
    XMasukSekunder: [],
    XMasukTritier: []
};

var selectedKonv = [];

$(document).ready(function () {
    $('#tableKonv').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kode Konversi' },
        ],
        order: [[0, 'asc']]
    });

    var table = $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: '', orderable: false, className: 'select-checkbox', data: null, defaultContent: '' }, // Checkbox
            { title: 'Kd. Konversi' },
            { title: 'Kd. Transaksi' },
            { title: 'Uraian' },
            { title: 'Nama Type' },
            { title: 'JmlKlrPrimer' },
            { title: 'JmlKlrSekunder' },
            { title: 'JmlKlrTritier' },
            { title: 'JmlMskPrimer' },
            { title: 'JmlMskSekunder' },
            { title: 'JmlMskTritier' },
            { title: 'Objek' },
            { title: 'Kel. Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
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
        order: [[1, 'asc']],
        select: {
            style: 'os',
            selector: 'td:first-child'
        }
    });

    var selectedIndices = new Set(); // Track selected row indices
    var selectedData = {
        XIdTransaksi: [],
        XIdType: [],
        XKeluarPrimer: [],
        XKeluarSekunder: [],
        XKeluarTritier: [],
        XMasukPrimer: [],
        XMasukSekunder: [],
        XMasukTritier: []
    };

    function updateSelectedData() {
        // Clear arrays
        selectedData.XIdTransaksi = [];
        selectedData.XIdType = [];
        selectedData.XKeluarPrimer = [];
        selectedData.XKeluarSekunder = [];
        selectedData.XKeluarTritier = [];
        selectedData.XMasukPrimer = [];
        selectedData.XMasukSekunder = [];
        selectedData.XMasukTritier = [];

        // Populate arrays with selected data
        selectedIndices.forEach(index => {
            var rowData = table.row(index).data();
            selectedData.XIdTransaksi.push(rowData[2]);  // Adjust indices as needed
            selectedData.XIdType.push(rowData[16]);
            selectedData.XKeluarPrimer.push(rowData[5]);
            selectedData.XKeluarSekunder.push(rowData[6]);
            selectedData.XKeluarTritier.push(rowData[7]);
            selectedData.XMasukPrimer.push(rowData[8]);
            selectedData.XMasukSekunder.push(rowData[9]);
            selectedData.XMasukTritier.push(rowData[10]);
        });
    }

    function handleCheckboxChange() {
        var row = $(this).closest('tr');
        var rowIndex = table.row(row).index();
        var isChecked = $(this).prop('checked');

        if (isChecked) {
            selectedIndices.add(rowIndex);
        } else {
            selectedIndices.delete(rowIndex);
        }

        updateSelectedData();
    }

    $('#tableData').on('change', 'input.row-checkbox', handleCheckboxChange);

    var table = $('#tableData').DataTable();
    var tableKonv = $('#tableKonv').DataTable();

    $('#semua').on('click', function () {
        var isChecked = $(this).data('checked') || false;
        isChecked = !isChecked;
        $(this).data('checked', isChecked);

        $('.row-checkbox').prop('checked', isChecked).each(function () {
            $(this).trigger('change');
        });

        if (isChecked) {
            $(this).text('Batal Semua');
            tableKonv.$('tr').addClass('selected');
            $('#tableKonv').addClass('table-disabled');

            selectedKonv = [];

            tableKonv.rows('.selected').every(function (rowIdx, tableLoop, rowLoop) {
                let value = this.data()[0];
                selectedKonv.push(value);
            });
        } else {
            $(this).text('Pilih Semua');
            tableKonv.$('tr').removeClass('selected');
            $('#tableKonv').removeClass('table-disabled');

            selectedKonv = [];
        }
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

function updateDataTable(data, angka) {
    var table = $('#tableData').DataTable();
    var tableKonv = $('#tableKonv').DataTable();

    if (angka === 1) {
        table.clear();
        data.forEach(function (item) {
            table.row.add([
                '',
                escapeHtml(item.IdKonversi),
                escapeHtml(item.IdTransaksi),
                escapeHtml(item.UraianDetailTransaksi),
                escapeHtml(item.NamaType),
                formatNumber(item.JumlahPengeluaranPrimer),
                formatNumber(item.JumlahPengeluaranSekunder),
                formatNumber(item.JumlahPengeluaranTritier),
                formatNumber(item.JumlahPemasukanPrimer),
                formatNumber(item.JumlahPemasukanSekunder),
                formatNumber(item.JumlahPemasukanTritier),
                escapeHtml(item.NamaObjek),
                escapeHtml(item.NamaKelompokUtama),
                escapeHtml(item.NamaKelompok),
                escapeHtml(item.NamaSubKelompok),
                escapeHtml(item.IdSubkelompok),
                escapeHtml(item.IdType),
            ]);
        });
        table.draw();
    }
    else if (angka === 2) {
        tableKonv.clear();
        data.forEach(function (item) {
            tableKonv.row.add([
                escapeHtml(item.IdKonversi),
            ]);
        });
        tableKonv.draw();
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

function clearText1() {
    var tableKonv = $('#tableKonv').DataTable();
    var table = $('#tableData').DataTable();

    tableKonv.clear().draw();
    table.clear().draw();
}

function clearText() {
    divisiId.value = '';
    divisiNama.value = '';

    clearText1();
}

// ngisi input kalo select table
$('#tableKonv tbody').on('click', 'tr', function (event) {
    var tableKonv = $('#tableKonv').DataTable();
    var table = $('#tableData').DataTable();

    tableKonv.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = tableKonv.row(this).data();
    let konvSelected = data[0];

    selectedKonv = [];
    selectedKonv.push(konvSelected);

    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var rowData = this.data();
        var checkbox = $(this.node()).find('input[type="checkbox"]');

        if (rowData[1] === konvSelected) {
            checkbox.prop('checked', true); 
        } else {
            checkbox.prop('checked', false);
        }
    });
});

var c, i, j, a, t, al, tl, jum, k, con;
var KdKonversi, sidtype, Asal, Tujuan, Konversi;

function Load_Transaksi_Asal(sDivisi) {
    $.ajax({
        type: 'GET',
        url: 'AccKonversiBarang/getTransaksiAwal',
        data: {
            XKdDivisi: sDivisi,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 1)
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function Load_DataKonversi() {
    $.ajax({
        type: 'GET',
        url: 'AccKonversiBarang/getKodeKonversi',
        data: {
            XIdDivisi: divisiId.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 2)
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btn_proses.addEventListener("click", function (e) {
    var table = $('#tableData').DataTable();
    var tableKonv = $('#tableKonv').DataTable();

    if (tableKonv.$('tr.selected').length > 0) {
        Proses_Acc();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Tidak ada data untuk di  Acc.',
            returnFocus: false
        });
        return;
    }
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
                divisiId.value = decodeHtmlEntities(result.value.IdDivisi.trim());
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());
                clearText1();
                Load_Transaksi_Asal(divisiId.value);
                Load_DataKonversi();

                selectedData = {
                    XIdTransaksi: [],
                    XIdType: [],
                    XKeluarPrimer: [],
                    XKeluarSekunder: [],
                    XKeluarTritier: [],
                    XMasukPrimer: [],
                    XMasukSekunder: [],
                    XMasukTritier: []
                };

                selectedKonv = [];

            }
        });
    } catch (error) {
        console.error(error);
    }
});