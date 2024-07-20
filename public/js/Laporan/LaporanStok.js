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

function tanggalToday() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');
    var todayString = year + '-' + month + '-' + day;

    var firstDayOfMonth = year + '-' + month + '-01';
    tanggalAwal.value = firstDayOfMonth;
    tanggalAkhir.value = todayString;
}

tanggalToday();

document.addEventListener('DOMContentLoaded', function () {

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
                                        // Add "ALL" option
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
                        }
                    }
                });
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });


    // proses
    prosesButton.addEventListener("click", function (e) {
        console.log(tanggalAkhir.value, tanggalAwal.value, objek.value);
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
                console.log('mwmw');
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });


});
