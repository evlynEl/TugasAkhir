var tanggalAwal = document.getElementById('tanggalAwal');
var tanggalAkhir = document.getElementById('tanggalAkhir');

var divisi = document.getElementById('divisi');
var namaDivisi = document.getElementById('namaDivisi');
var buttonDivisi = document.getElementById('buttonDivisi');

var objek = document.getElementById('objek');
var namaObjek = document.getElementById('namaObjek');
var buttonObjek = document.getElementById('buttonObjek');

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
        buttonDivisi.focus();
        focusAwal = 0;
    }
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
        prosesButton.focus();
    }
});

tanggalToday();

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

document.addEventListener('DOMContentLoaded', function () {
    buttonDivisi.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Divisi",
                html: `<table id="table_divisi" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>ID Divisi</th>
                                    <th>Nama Divisi</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Tutup',
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
                            order: [[1, "asc"]],
                            ajax: {
                                url: "LaporanSaldo/getDivisi",
                                dataType: "json",
                                type: "GET",
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                { data: "IdDivisi" },
                                { data: "NamaDivisi" }
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
                    divisi.value = selectedRow.IdDivisi ? selectedRow.IdDivisi.trim() : '';
                    buttonObjek.focus();
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
                                    <th>ID Objek</th>
                                    <th>Nama Objek</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Tutup',
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
                            order: [[1, "asc"]],
                            ajax: {
                                url: "LaporanSaldo/getObjek",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    divisi: divisi.value
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                { data: "Objek" },
                                { data: "NamaObjek" }
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
                    objek.value = selectedRow.Objek ? selectedRow.Objek.trim() : '';
                    tanggalAwal.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // proses
    prosesButton.addEventListener("click", function (e) {
        if (divisi.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Pilih Dahulu Divisinya !',
            });
        }
        if (objek.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Pilih Dahulu Objeknya !',
            });
        }

        $.ajax({
            type: 'GET',
            url: 'LaporanSaldo/prosesLaporanACC',
            data: {
                _token: csrfToken,
                tanggal1: tanggalAwal.value,
                tanggal2: tanggalAkhir.value,
                idObjek: objek.value
            },
            success: function (result) {
                updateDataTable(result);
                excelButton.disabled = false;
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Selesai Diproses, Silahkan Refresh di Excel Untuk Melihat Data',
                });
            },
            error: function (xhr, status, error) {
                console.error(error);
            },
            complete: function () {
                setTimeout(() => {
                    canClickProsesButton = true;
                }, 3000);
            }
        });
    });

    function updateDataTable(data) {
        var table = $('#tableLaporan').DataTable();
        table.clear();

        laporanArray = [];

        // sort dari kelompok utama
        data.sort(function(a, b) {
            if (a.KelompokUtama < b.KelompokUtama) {
                return -1;
            }
            if (a.KelompokUtama > b.KelompokUtama) {
                return 1;
            }
            return 0;
        });

        data.forEach(function (item) {
            for (let key in item) {
                if (item.hasOwnProperty(key) && item[key] === ".00") {
                    item[key] = 0.00;
                }
            }

            table.row.add([
                item.Divisi,
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
                Divisi: item.Divisi,
                Objek: item.Objek,
                KelompokUtama: item.KelompokUtama,
                Kelompok: item.Kelompok,
                SubKelompok: item.SubKelompok,
                Type: item.Type,
                KodeBarang: item.KodeBarang,
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
            });
        });

        // Draw the table
        table.draw();
    }


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
                { title: 'Divisi' },
                { title: 'Objek' },
                { title: 'Kel. Utama' },
                { title: 'Kelompok' },
                { title: 'Sub Kelompok' },
                { title: 'Type' },
                { title: 'Kode Barang' },
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
                { title: 'S. Akhir Tritier' }
            ]
        });
    });

    // bikin excel
    excelButton.addEventListener("click", function (e) {
        const headers = [
            "Divisi", "Objek", "KelompokUtama", "Kelompok", "SubKelompok", "Type",
            "SaldoAwalPrimer", "SaldoAwalSekunder", "SaldoAwalTritier",
            "PemasukanPrimer", "PemasukanSekunder", "PemasukanTritier",
            "PengeluaranPrimer", "PengeluaranSekunder", "PengeluaranTritier",
            "SaldoAkhirPrimer", "SaldoAkhirSekunder", "SaldoAkhirTritier",
            "KodeBarang"
        ];

        const excelData = [headers];
        laporanArray.forEach(function(item) {
            excelData.push([
                item.Divisi,
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
        });

        const worksheet = XLSX.utils.aoa_to_sheet(excelData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

        XLSX.writeFile(workbook, "LaporanSaldo.xlsx");
    });
})
