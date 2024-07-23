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
                    namaDivisi.value = selectedRow.NamaDivisi ? selectedRow.NamaDivisi.trim() : '';

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
                    namaObjek.value = selectedRow.NamaObjek ? selectedRow.NamaObjek.trim() : '';

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
                        namaKelUtama.value = selectedRow.NamaKelompokUtama ? selectedRow.NamaKelompokUtama.trim() : '';

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
                                        kelUtama.value = result[0].NamaKelompokUtama ? result[0].NamaKelompokUtama.trim() : '';
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
        $.ajax({
            type: 'GET',
            url: 'LaporanStok/getLaporan1',
            data: {
                _token: csrfToken,
                tanggal1: tanggalAwal.value,
                tanggal2: tanggalAkhir.value,
                IdObjek: objek.value
            },
            success: function (result) {
                updateDataTable(result);
                excelButton.disabled = false;
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
                            <table id="dataDetail" class="table table-striped table-bordered" style="font-size:12px">
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
                            "data": function (d) {
                                d._token = csrfToken;
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
                    document.getElementById("excelButtonDetail").addEventListener("click", function () {
                        var tableDetailExcel = $('#dataDetail').DataTable();
    
                        var workbook = XLSX.utils.book_new();
                        var worksheet_data = [
                            ["Tanggal:", tanggalAwal.value + " s/d " + tanggalAkhir.value],
                            [],
                            ["Type Transaksi"
                                , "Pemasukan Primer", "Pemasukan Sekunder", "Pemasukan Tritier"
                                , "Pengeluaran Primer", "Pengeluaran Sekunder", "Pengeluaran Tritier"]
                        ];
    
                        tableDetailExcel.rows().every(function () {
                            var row = this.data();
                            worksheet_data.push(row);
                        });
    
                        var worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);
                        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Data");
    
                        XLSX.writeFile(workbook, 'Detail_data.xlsx');
                    });
                },
                didClose: () => {
                    namaType.value = detailArray[3];
                    $.ajax({
                        type: 'GET',
                        url: 'LaporanStok/getType',
                        data: {
                            _token: csrfToken,
                            namaType: namaType.value
                        },
                        success: function (result) {
                            console.log('Data refreshed:', result);
                            idType.value = result[0].IdType.trim();

                            $.ajax({
                                type: 'GET',
                                url: 'LaporanStok/getLaporan1',
                                data: {
                                    _token: csrfToken,
                                    tanggal1: tanggalAwal.value,
                                    tanggal2: tanggalAkhir.value,
                                    IdObjek: objek.value,
                                    IdType: idType.value
                                },
                                success: function (data) {
                                    console.log('Stored procedure result:', data);
                                },
                                error: function (xhr, status, error) {
                                    console.error('Error calling stored procedure:', error);
                                }
                            });
                        },
                        error: function (xhr, status, error) {
                            console.error('Error fetching data on modal close:', error);
                        }
                    });
                }
            });
        });
    });
    

    // button excel laporan
    document.getElementById("excelButton").addEventListener("click", function () {
        var tableLaporanExcel = $('#tableLaporan').DataTable();

        var workbook = XLSX.utils.book_new();

        var worksheet_data = [
            ["Tanggal:", tanggalAwal.value + " s/d " + tanggalAkhir.value],
            [],
            ["Objek", "Kel. Utama", "Kelompok", "Sub Kelompok", "Type"
                , "S. Awal Primer", "S. Awal Sekunder", "S. Awal Tritier"
                , "Pemasukan Primer", "Pemasukan Sekunder", "Pemasukan Tritier"
                , "Pengeluaran Primer", "Pengeluaran Sekunder", "Pengeluaran Tritier"
                , "S. Akhir Primer", "S. Akhir Sekunder", "S. Akhir Tritier"
                , "KodeBarang"]
        ];

        tableLaporanExcel.rows().every(function () {
            var row = this.data();
            worksheet_data.push(row);
        });

        var worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Data");

        XLSX.writeFile(workbook, 'Laporan_Data.xlsx');
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
        // blom dipake
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
