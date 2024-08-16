var tanggalAwal = document.getElementById('tanggalAwal');
var tanggalAkhir = document.getElementById('tanggalAkhir');

var divisi = document.getElementById('divisi');
var namaDivisi = document.getElementById('namaDivisi');
var buttonDivisi = document.getElementById('buttonDivisi');
var namaType = document.getElementById('namaType');

var objek = document.getElementById('objek');
var namaObjek = document.getElementById('namaObjek');
var buttonObjek = document.getElementById('buttonObjek');
var idType = document.getElementById('idType');

var kelUtama = document.getElementById('kelUtama');
var namaKelUtama = document.getElementById('namaKelUtama');
var buttonKelUtama = document.getElementById('buttonKelUtama');

var buttonDivisi = document.getElementById('buttonDivisi');
var buttonObjek = document.getElementById('buttonObjek');
var buttonKelUtama = document.getElementById('buttonKelUtama');

var prosesButton = document.getElementById('prosesButton');
var cancelButton = document.getElementById('cancelButton');
var excelButton = document.getElementById('excelButton');

var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let focusAwal = 1;

function tanggalToday() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');
    var todayString = year + '-' + month + '-' + day;

    var firstDayOfMonth = year + '-' + month + '-01';
    tanggalAwal.value = firstDayOfMonth;
    tanggalAkhir.value = todayString;

    if (focusAwal === 1) {
        tanggalAwal.focus();
        focusAwal = 0;
    }
}

tanggalToday();

document.addEventListener('DOMContentLoaded', function () {

    prosesButton.disabled = true;
    excelButton.disabled = true;

    function formatDateToMMDDYYYY(dateStr) {
        var date = new Date(dateStr);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var year = date.getFullYear();
        return month + '/' + day + '/' + year;
    }

    $('#tanggalAwal').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            tanggalAkhir.focus();
        }
    });

    $('#tanggalAkhir').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            buttonDivisi.focus();
        }
    });

    $('#prosesButton').on('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            cancelButton.focus();
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            excelButton.focus();
        }
    });

    $('#cancelButton').on('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prosesButton.focus();
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            excelButton.focus();
        }
    });

    $('#excelButton').on('keydown', function (e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            prosesButton.focus();
        }
    });

    // divisi
    buttonDivisi.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Divisi",
                html: `<table id="table_divisi" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Divisi</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                returnFocus: false,
                preConfirm: () => {
                    const table = $("#table_divisi").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_divisi").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[0, "asc"]],
                            ajax: {
                                url: "LaporanStok/getDivisi",
                                dataType: "json",
                                type: "GET",
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                {
                                    data: "NamaDivisi",
                                    title: "Divisi"
                                }
                            ]
                        });

                        $("#table_divisi tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_divisi'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaDivisi.value = selectedRow.NamaDivisi ? decodeHtmlEntities(selectedRow.NamaDivisi.trim()) : '';

                    $.ajax({
                        type: 'GET',
                        url: 'LaporanStok/getIdDivisi',
                        data: {
                            _token: csrfToken,
                            namaDivisi: namaDivisi.value,
                        },
                        success: function (result) {
                            if (result) {
                                divisi.value = result[0].IdDivisi.trim();
                                cekFields();
                                buttonObjek.focus();
                            } else {
                                console.error("IdDivisi not found in response");
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error fetching IdDivisi:", error);
                        }
                    });

                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // objek
    buttonObjek.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Objek",
                html: `<table id="table_Objek" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Objek</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_Objek").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_Objek").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[0, "asc"]],
                            ajax: {
                                url: "LaporanStok/getObjek",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idDivisi: divisi.value
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                {
                                    data: "NamaObjek",
                                    title: "Objek"
                                }
                            ]
                        });

                        $("#table_Objek tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_Objek'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaObjek.value = selectedRow.NamaObjek ? decodeHtmlEntities(selectedRow.NamaObjek.trim()) : '';

                    $.ajax({
                        type: 'GET',
                        url: 'LaporanStok/getIdObjek',
                        data: {
                            _token: csrfToken,
                            idDivisi: divisi.value,
                            namaObjek: namaObjek.value,
                        },
                        success: function (result) {
                            if (result) {
                                objek.value = result[0].IdObjek.trim();
                                cekFields();
                                buttonKelUtama.focus();
                            } else {
                                console.error("IdObjek not found in response");
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error fetching IdObjek:", error);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    function decodeHtmlEntities(str) {
        let textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    }

    // kel utama

    buttonKelUtama.addEventListener("click", function (e) {
        try {
            if (divisi.value !== '' && objek.value !== '') {
                Swal.fire({
                    title: "Pilih Kelompok Utama",
                    html: `<table id="table_KelUtama" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Kelompok Utama</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                    showCancelButton: true,
                    confirmButtonText: 'Pilih',
                    returnFocus: false,
                    cancelButtonText: 'Close',
                    preConfirm: () => {
                        const table = $("#table_KelUtama").DataTable();
                        const selectedData = table.row(".selected").data();
                        if (!selectedData) {
                            Swal.showValidationMessage("Please select a row");
                            return false;
                        }
                        return selectedData;
                    },
                    didOpen: () => {
                        $(document).ready(function () {
                            const table = $("#table_KelUtama").DataTable({
                                responsive: true,
                                processing: true,
                                serverSide: true,
                                order: [[0, "asc"]],
                                ajax: {
                                    url: "LaporanStok/getKelUtama",
                                    dataType: "json",
                                    type: "GET",
                                    data: {
                                        _token: csrfToken,
                                        idObjek: objek.value
                                    },
                                    error: function (xhr, error, thrown) {
                                        console.error("Error fetching data: ", thrown);
                                    },
                                    dataSrc: function (json) {
                                        json.data.unshift({ NamaKelompokUtama: "ALL" });
                                        return json.data;
                                    }
                                },
                                columns: [
                                    {
                                        data: "NamaKelompokUtama",
                                        title: "Kelompok Utama"
                                    }
                                ]
                            });

                            $("#table_KelUtama tbody").on("click", "tr", function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            });

                            currentIndex = null;
                            Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_KelUtama'));
                        });
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const selectedRow = result.value;
                        namaKelUtama.value = selectedRow.NamaKelompokUtama ? decodeHtmlEntities(selectedRow.NamaKelompokUtama.trim()) : '';

                        if (namaKelUtama.value !== 'ALL') {
                            $.ajax({
                                type: 'GET',
                                url: 'LaporanStok/getIdKelUtama',
                                data: {
                                    _token: csrfToken,
                                    namaKelUtama: namaKelUtama.value,
                                    idObjek: objek.value
                                },
                                success: function (result) {
                                    if (result.length > 0) {
                                        kelUtama.value = result[0].IdKelompokUtama ? result[0].IdKelompokUtama.trim() : '';
                                        cekFields();
                                        prosesButton.focus();
                                    } else {
                                        console.error("NamaKelompokUtama not found in response");
                                    }
                                },
                                error: function (xhr, status, error) {
                                    console.error("Error fetching NamaKelompokUtama:", error);
                                }
                            });
                        }
                        else {
                            namaKelUtama.value = selectedRow.NamaKelompokUtama ? selectedRow.NamaKelompokUtama.trim() : '';
                            kelUtama.value = '';
                            cekFields();
                            prosesButton.focus();
                        }
                    }
                });
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // table
    $(document).ready(function () {
        $('#tableLaporan').DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: false,
            language: {
                emptyTable: "",
                zeroRecords: ""
            },
            columns: [
                { title: 'Objek' },
                { title: 'Kel. Utama' },
                { title: 'Kelompok' },
                { title: 'Sub Kelompok' },
                { title: 'Type' },
                { title: 'S. Awal Primer' },
                { title: 'S. Awal Sekunder' },
                { title: 'S. Awal Tritier' },
                { title: 'Pemasukan Primer' },
                { title: 'Pemasukan Sekunder' },
                { title: 'Pemasukan Tritier' },
                { title: 'Pengeluaran Primer' },
                { title: 'Pengeluaran Sekunder' },
                { title: 'Pengeluaran Tritier' },
                { title: 'S. Akhir Primer' },
                { title: 'S. Akhir Sekunder' },
                { title: 'S. Akhir Tritier' },
                { title: 'KodeBarang' }
            ]
        });
    });

    // proses
    var laporanArray = [];

    prosesButton.addEventListener("click", function (e) {
        var table = $('#tableLaporan').DataTable();
        table.clear().draw();
        $.ajax({
            type: 'GET',
            url: 'LaporanStok/getLaporan1',
            data: {
                _token: csrfToken,
                tanggal1: tanggalAwal.value,
                tanggal2: tanggalAkhir.value,
                IdObjek: objek.value,
                IdKelUtama: kelUtama.value
            },
            success: function (result) {
                updateDataTable(result);
                excelButton.disabled = false;
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data di tabel sudah diupdate.',
                });
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    });

    // Update the table and store the data in the array
    function updateDataTable(data) {
        var table = $('#tableLaporan').DataTable();
        table.clear();

        laporanArray = [];

        data.forEach(function (item) {
            table.row.add([
                item.Objek,
                item.KelompokUtama,
                item.Kelompok,
                item.SubKelompok,
                item.Type,
                item.SaldoAwalPrimer,
                item.SaldoAwalSekunder,
                item.SaldoAwalTritier,
                item.PemasukanPrimer,
                item.PemasukanSekunder,
                item.PemasukanTritier,
                item.PengeluaranPrimer,
                item.PengeluaranSekunder,
                item.PengeluaranTritier,
                item.SaldoAkhirPrimer,
                item.SaldoAkhirSekunder,
                item.SaldoAkhirTritier,
                item.KodeBarang
            ]);

            laporanArray.push({
                Objek: item.Objek,
                KelompokUtama: item.KelompokUtama,
                Kelompok: item.Kelompok,
                SubKelompok: item.SubKelompok,
                Type: item.Type,
                SaldoAwalPrimer: item.SaldoAwalPrimer,
                SaldoAwalSekunder: item.SaldoAwalSekunder,
                SaldoAwalTritier: item.SaldoAwalTritier,
                PemasukanPrimer: item.PemasukanPrimer,
                PemasukanSekunder: item.PemasukanSekunder,
                PemasukanTritier: item.PemasukanTritier,
                PengeluaranPrimer: item.PengeluaranPrimer,
                PengeluaranSekunder: item.PengeluaranSekunder,
                PengeluaranTritier: item.PengeluaranTritier,
                SaldoAkhirPrimer: item.SaldoAkhirPrimer,
                SaldoAkhirSekunder: item.SaldoAkhirSekunder,
                SaldoAkhirTritier: item.SaldoAkhirTritier,
                KodeBarang: item.KodeBarang
            });
        });

        table.draw();
    }


    // selected row
    $('#tableLaporan tbody').on('click', 'tr', function () {
        var table = $('#tableLaporan').DataTable();
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    var detailArray = [];

    // double click, keluar modal untuk info
    $(document).ready(function () {
        $('#tableLaporan tbody').on('dblclick', 'tr', function () {
            var data = $('#tableLaporan').DataTable().row(this).data();
            var detailArray = [
                data[1], // Kel. Utama
                data[2], // Kelompok
                data[3], // Sub Kelompok
                data[4], // Type
                data[5], // Saldo Awal Primer
                data[6], // Saldo Awal Sekunder
                data[7], // Saldo Awal Tritier
                data[8], // Pemasukan Primer
                data[9], // Pemasukan Sekunder
                data[10], // Pemasukan Tritier
                data[11], // Pengeluaran Primer
                data[12], // Pengeluaran Sekunder
                data[13], // Pengeluaran Tritier
                data[14], // Saldo Akhir Primer
                data[15], // Saldo Akhir Sekunder
                data[16]  // Saldo Akhir Tritier
            ];

            namaType.value = detailArray[3];
            $.ajax({
                type: 'GET',
                url: 'LaporanStok/getType',
                data: {
                    _token: csrfToken,
                    namaType: namaType.value
                },
                success: function (result) {
                    idType.value = result[0].IdType.trim();

                    $.ajax({
                        type: 'GET',
                        url: 'LaporanStok/getLaporan2',
                        data: {
                            _token: csrfToken,
                            tanggal1: tanggalAwal.value,
                            tanggal2: tanggalAkhir.value,
                            IdObjek: objek.value,
                            IdType: idType.value,
                        },
                        success: function (result) {
                            Swal.fire({
                                title: 'Detail Laporan',
                                html: content,
                                confirmButtonText: 'OK',
                                width: '70%',
                                customClass: {
                                    container: 'swal2-container'
                                },
                                didOpen: () => {
                                    $('#dataDetail').DataTable({
                                        "processing": true,
                                        "serverSide": true,
                                        "paging": false,
                                        "searching": false,
                                        "info": false,
                                        "ordering": false,
                                        "ajax": {
                                            "url": "LaporanStok/getDetailData",
                                            "type": "GET",
                                            "data": {
                                                _token: csrfToken,
                                                idObjek: objek.value
                                            },
                                        },
                                        "columns": [
                                            { "data": "TypeTransaksi" },
                                            { "data": "PemasukanPrimer" },
                                            { "data": "PemasukanSekunder" },
                                            { "data": "PemasukanTritier" },
                                            { "data": "PengeluaranPrimer" },
                                            { "data": "PengeluaranSekunder" },
                                            { "data": "PengeluaranTritier" }
                                        ],
                                        "language": {
                                            "emptyTable": "No data available in table"
                                        }
                                    });

                                    // Event listener for Excel export
                                    document.getElementById("excelButtonDetail").addEventListener("click", async function () {
                                        var tableDetailExcel = $('#dataDetail').DataTable();

                                        var workbook = new ExcelJS.Workbook();
                                        var worksheet = workbook.addWorksheet("Laporan Data");

                                        // Define border style
                                        var borderStyles = {
                                            top: { style: "thin" },
                                            left: { style: "thin" },
                                            bottom: { style: "thin" },
                                            right: { style: "thin" }
                                        };

                                        var formattedTanggalAwal = formatDateToMMDDYYYY(tanggalAwal.value);
                                        var formattedTanggalAkhir = formatDateToMMDDYYYY(tanggalAkhir.value);

                                        // Adding header rows
                                        worksheet.addRow(["Tanggal: " + formattedTanggalAwal + " s/d " + formattedTanggalAkhir]);
                                        worksheet.addRow([]);
                                        worksheet.addRow(["Kelompok Utama", ": " + detailArray[0]]);
                                        worksheet.addRow(["Kelompok", ": " + detailArray[1]]);
                                        worksheet.addRow(["Sub Kelompok", ": " + detailArray[2]]);
                                        worksheet.addRow(["Type", ": " + detailArray[3]]);
                                        worksheet.addRow(["Saldo Awal Primer", ": " + detailArray[4], "Saldo Awal Sekunder", ": " + detailArray[5], "Saldo Awal Tritier", ": " + detailArray[6]]);
                                        worksheet.addRow(["Pemasukan Primer", ": " + detailArray[7], "Pemasukan Sekunder", ": " + detailArray[8], "Pemasukan Tritier", ": " + detailArray[9]]);
                                        worksheet.addRow(["Pengeluaran Primer", ": " + detailArray[10], "Pengeluaran Sekunder", ": " + detailArray[11], "Pengeluaran Tritier", ": " + detailArray[12]]);
                                        worksheet.addRow(["Saldo Akhir Primer", ": " + detailArray[13], "Saldo Akhir Sekunder", ": " + detailArray[14], "Saldo Akhir Tritier", ": " + detailArray[15]]);
                                        worksheet.addRow([]);
                                        worksheet.addRow(["Type Transaksi"
                                            , "Pemasukan Primer", "Pemasukan Sekunder", "Pemasukan Tritier"
                                            , "Pengeluaran Primer", "Pengeluaran Sekunder", "Pengeluaran Tritier"]);

                                        // Adding table data
                                        tableDetailExcel.rows().every(function () {
                                            var row = this.data();
                                            worksheet.addRow([
                                                row.TypeTransaksi,
                                                row.PemasukanPrimer,
                                                row.PemasukanSekunder,
                                                row.PemasukanTritier,
                                                row.PengeluaranPrimer,
                                                row.PengeluaranSekunder,
                                                row.PengeluaranTritier
                                            ]);
                                        });

                                        var boldStyle = {
                                            font: {
                                                bold: true
                                            }
                                        };

                                        // Apply styles to specific cells
                                        // worksheet.getCell('A1').border = borderStyles;
                                        worksheet.getCell('A1').font = boldStyle.font;

                                        for (let i = 3; i <= 10; i++) {
                                            // worksheet.getCell(`A${i}`).border = borderStyles;
                                            worksheet.getCell(`A${i}`).font = boldStyle.font;
                                        }

                                        for (let i = 12; i <= 12; i++) {
                                            for (let j = 1; j <= 7; j++) {
                                                worksheet.getCell(`${String.fromCharCode(64 + j)}${i}`).border = borderStyles;
                                                worksheet.getCell(`${String.fromCharCode(64 + j)}${i}`).font = boldStyle.font;
                                            }
                                        }

                                        for (let i = 7; i <= 10; i++) {
                                            for (let j = 3; j <= 3; j++) {
                                                // worksheet.getCell(`${String.fromCharCode(64 + j)}${i}`).border = borderStyles;
                                                worksheet.getCell(`${String.fromCharCode(64 + j)}${i}`).font = boldStyle.font;
                                            }
                                        }

                                        for (let i = 7; i <= 10; i++) {
                                            for (let j = 5; j <= 5; j++) {
                                                // worksheet.getCell(`${String.fromCharCode(64 + j)}${i}`).border = borderStyles;
                                                worksheet.getCell(`${String.fromCharCode(64 + j)}${i}`).font = boldStyle.font;
                                            }
                                        }

                                        // Calculate column widths dynamically
                                        function calculateColumnWidths(data) {
                                            var colWidths = [];
                                            data.forEach(row => {
                                                row.forEach((cell, index) => {
                                                    const cellLength = String(cell).length;
                                                    if (!colWidths[index] || cellLength > colWidths[index]) {
                                                        colWidths[index] = cellLength;
                                                    }
                                                });
                                            });
                                            return colWidths.map(length => length + 2); // Add some padding
                                        }

                                        var formattedTanggalAwal = formatDateToMMDDYYYY(tanggalAwal.value);
                                        var formattedTanggalAkhir = formatDateToMMDDYYYY(tanggalAkhir.value);

                                        var columnWidths = calculateColumnWidths([
                                            ["Tanggal: " + formattedTanggalAwal + " s/d " + formattedTanggalAkhir],
                                            [],
                                            ["Kelompok Utama", ": " + detailArray[0]],
                                            ["Kelompok", ": " + detailArray[1]],
                                            ["Sub Kelompok", ": " + detailArray[2]],
                                            ["Type", ": " + detailArray[3]],
                                            ["Saldo Awal Primer", ": " + detailArray[4], "Saldo Awal Sekunder", ": " + detailArray[5], "Saldo Awal Tritier", ": " + detailArray[6]],
                                            ["Pemasukan Primer", ": " + detailArray[7], "Pemasukan Sekunder", ": " + detailArray[8], "Pemasukan Tritier", ": " + detailArray[9]],
                                            ["Pengeluaran Primer", ": " + detailArray[10], "Pengeluaran Sekunder", ": " + detailArray[11], "Pengeluaran Tritier", ": " + detailArray[12]],
                                            ["Saldo Akhir Primer", ": " + detailArray[13], "Saldo Akhir Sekunder", ": " + detailArray[14], "Saldo Akhir Tritier", ": " + detailArray[15]],
                                            [],
                                            ["Type Transaksi"
                                                , "Pemasukan Primer", "Pemasukan Sekunder", "Pemasukan Tritier"
                                                , "Pengeluaran Primer", "Pengeluaran Sekunder", "Pengeluaran Tritier"]
                                        ]);

                                        worksheet.columns = columnWidths.map(width => ({ width }));

                                        // Save the workbook
                                        workbook.xlsx.writeBuffer().then(function (buffer) {
                                            var blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                                            var url = URL.createObjectURL(blob);
                                            var a = document.createElement("a");
                                            a.href = url;
                                            a.download = 'Detail_data.xlsx';
                                            a.click();
                                            URL.revokeObjectURL(url);
                                        });
                                    });

                                }
                            });
                        },
                        error: function (xhr, status, error) {
                            console.error('Error fetching data on modal close:', error);
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching data on modal close:', error);
                }
            });



            var content = `
                <div class="container-fluid">
                    <!-- General Data -->
                    <div class="row" style="margin-top: 0.5%">
                        <div class="col-md-2">
                            <label class="swalDetailLabel"><strong>Kel. Utama:</strong></label>
                        </div>
                        <div class="col-md-5">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[0]}" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2">
                            <label class="swalDetailLabel"><strong>Kelompok:</strong></label>
                        </div>
                        <div class="col-md-5">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[1]}" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2">
                            <label class="swalDetailLabel"><strong>Sub Kelompok:</strong></label>
                        </div>
                        <div class="col-md-5">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[2]}" readonly>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2">
                            <label class="swalDetailLabel"><strong>Type:</strong></label>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[3]}" readonly>
                        </div>
                    </div>
                    <!-- Saldo Awal -->
                    <div class="row" style="margin-top: 1.5%">
                        <div class="col-md-2">
                            <label class="swalDetailLabel"><strong>Saldo Awal:</strong></label>
                        </div>
                        <div class="col-md-1">
                            <label class="swalDetailLabel"><strong>Primer</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[4]}" readonly>
                        </div>
                        <div class="col-md-1" style="padding:0">
                            <label class="swalDetailLabel"><strong>Sekunder</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[5]}" readonly>
                        </div>
                        <div class="col-md-1">
                            <label class="swalDetailLabel"><strong>Tritier</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[6]}" readonly>
                        </div>
                    </div>
                    <!-- Pemasukan -->
                    <div class="row">
                        <div class="col-md-2">
                            <label class="swalDetailLabel"><strong>Pemasukan:</strong></label>
                        </div>
                        <div class="col-md-1">
                            <label class="swalDetailLabel"><strong>Primer</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[7]}" readonly>
                        </div>
                        <div class="col-md-1" style="padding:0">
                            <label class="swalDetailLabel"><strong>Sekunder</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[8]}" readonly>
                        </div>
                        <div class="col-md-1">
                            <label class="swalDetailLabel"><strong>Tritier</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[9]}" readonly>
                        </div>
                    </div>
                    <!-- Pengeluaran -->
                    <div class="row">
                        <div class="col-md-2">
                            <label class="swalDetailLabel"><strong>Pengeluaran:</strong></label>
                        </div>
                        <div class="col-md-1">
                            <label class="swalDetailLabel"><strong>Primer</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[10]}" readonly>
                        </div>
                        <div class="col-md-1" style="padding:0">
                            <label class="swalDetailLabel"><strong>Sekunder</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[11]}" readonly>
                        </div>
                        <div class="col-md-1">
                            <label class="swalDetailLabel"><strong>Tritier</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[12]}" readonly>
                        </div>
                    </div>
                    <!-- Saldo Akhir -->
                    <div class="row">
                        <div class="col-md-2">
                            <label class="swalDetailLabel"><strong>Saldo Akhir:</strong></label>
                        </div>
                        <div class="col-md-1">
                            <label class="swalDetailLabel"><strong>Primer</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[13]}" readonly>
                        </div>
                        <div class="col-md-1" style="padding:0">
                            <label class="swalDetailLabel"><strong>Sekunder</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[14]}" readonly>
                        </div>
                        <div class="col-md-1">
                            <label class="swalDetailLabel"><strong>Tritier</strong></label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control swalInputDetail" value="${detailArray[15]}" readonly>
                        </div>
                    </div>
                    <!-- Table Detail -->
                    <div class="row" style="margin-top: 2%">
                        <div class="col-md-12">
                            <table id="dataDetail" class="table table-bordered" style="font-size:12px">
                                <thead>
                                    <tr>
                                        <th>Type Transaksi</th>
                                        <th>Pemasukan Primer</th>
                                        <th>Pemasukan Sekunder</th>
                                        <th>Pemasukan Tritier</th>
                                        <th>Pengeluaran Primer</th>
                                        <th>Pengeluaran Sekunder</th>
                                        <th>Pengeluaran Tritier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 0.5%">
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary" id="excelButtonDetail" style="width: 100%">Tampil Excel</button>
                        </div>
                    </div>
                </div>
            `;

        });
    });


    // button excel laporan
    document.getElementById("excelButton").addEventListener("click", async function () {
        var tableLaporanExcel = $('#tableLaporan').DataTable();
        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet('Laporan Data');

        var formattedTanggalAwal = formatDateToMMDDYYYY(tanggalAwal.value);
        var formattedTanggalAkhir = formatDateToMMDDYYYY(tanggalAkhir.value);

        // Header data for Excel
        var headerData = [
            ["Tanggal: " + formattedTanggalAwal + " s/d " + formattedTanggalAkhir],
            [],
            ["Objek", "Kel. Utama", "Kelompok", "Sub Kelompok", "Type",
                "S. Awal Primer", "S. Awal Sekunder", "S. Awal Tritier",
                "Pemasukan Primer", "Pemasukan Sekunder", "Pemasukan Tritier",
                "Pengeluaran Primer", "Pengeluaran Sekunder", "Pengeluaran Tritier",
                "S. Akhir Primer", "S. Akhir Sekunder", "S. Akhir Tritier",
                "KodeBarang"]
        ];

        // Add header data to worksheet
        headerData.forEach((row, rowIndex) => {
            worksheet.addRow(row);
        });

        // Add table data to worksheet
        tableLaporanExcel.rows().every(function () {
            var row = this.data();
            worksheet.addRow(row);
        });

        // Define border style
        var borderStyle = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        var boldStyle = {
            font: {
                bold: true
            }
        };

        // Apply borders and bold formatting to specific rows
        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            if (rowNumber === 3 || rowNumber === 1) { // Apply to rows 3 and 1 (1-based index)
                row.eachCell({ includeEmpty: true }, function (cell) {
                    cell.border = borderStyle;
                    cell.font = boldStyle.font; // Apply bold formatting
                });
            }
        });

        // Calculate column widths dynamically
        function calculateColumnWidths(data) {
            var colWidths = [];
            data.forEach(row => {
                row.forEach((cell, index) => {
                    const cellLength = String(cell).length;
                    if (!colWidths[index] || cellLength > colWidths[index]) {
                        colWidths[index] = cellLength;
                    }
                });
            });
            return colWidths.map(length => length + 2); // Add some padding
        }

        // Set column widths
        worksheet.columns = worksheet.columns.map((col, index) => {
            return { ...col, width: calculateColumnWidths(headerData.concat(tableLaporanExcel.rows().data().toArray()))[index] };
        });

        // Save workbook
        workbook.xlsx.writeBuffer().then(function (buffer) {
            var blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Laporan_Data.xlsx';
            link.click();
        });
    });

    // cancel
    cancelButton.addEventListener("click", function (e) {

        var table = $('#tableLaporan').DataTable();
        table.clear().draw();

        objek.value = "";
        namaObjek.value = "";
        namaType.value = "";
        idType.value = "";
        kelUtama.value = "";
        namaKelUtama.value = "";

        tanggalToday();
        prosesButton.disabled = true;
        excelButton.disabled = true;
    });

    // disable proses dan excel kalau kosong
    function cekFields() {
        if (objek.value && namaObjek.value && namaKelUtama.value
            && divisi.value && namaDivisi.value) {
            prosesButton.disabled = false;
        }
        else {
            prosesButton.disabled = true;
        }
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

});
