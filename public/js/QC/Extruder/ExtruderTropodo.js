var tanggal = document.getElementById('tanggal');
var jamInput = document.getElementById('jamInput');
var shiftLetter = document.getElementById('shiftLetter');
var buttonNomorTransaksi = document.getElementById('buttonNomorTransaksi');
var buttonIdMesin = document.getElementById('buttonIdMesin');
var mesin = document.getElementById('mesin');
var namaMesin = document.getElementById('namaMesin')
var nomorTransaksi = document.getElementById('nomorTransaksi');

var shiftAwal = document.getElementById('shiftAwal');
var shiftAkhir = document.getElementById('shiftAkhir');

var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

document.addEventListener('DOMContentLoaded', function () {

    // ambil nomor transaksi (baru ambil nomor)
    buttonNomorTransaksi.addEventListener('click', async () => {
        try {
            let result = Swal.fire({
                title: "Pilih No Transaksi",
                html: `<table id="table_noTransaksi" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>No Transaksi</th>
                                    <th>Transaksi</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const selectedData = $("#table_noTransaksi")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_noTransaksi").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "ExtruderTropodo/getNomorTransaksi",
                                dataType: "json",
                                data: {
                                    tgl: tanggal.value,
                                    Shift: shiftLetter.value,
                                    Mesin: mesin.value
                                },
                                type: "GET",
                            },
                            columns: [
                                {
                                    data: "NoTrans",
                                },
                                {
                                    data: "Trans"
                                },
                            ],
                        });
                        $("#table_noTransaksi tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    nomorTransaksi.value = selectedRow.NoTrans.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // ambil 
    buttonIdMesin.addEventListener('click', async () => {
        try {
            let result = Swal.fire({
                title: "Pilih Id Mesin",
                html: `<table id="table_IdMesin" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>I Mesin</th>
                                    <th>Type Mesin</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const selectedData = $("#table_IdMesin")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_IdMesin").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "ExtruderTropodo/getIdMesin",
                                dataType: "json",
                                data: {
                                    tgl: tanggal.value,
                                    Shift: shiftLetter.value,
                                },
                                type: "GET",
                            },
                            columns: [
                                {
                                    data: "IdMesin",
                                },
                                {
                                    data: "NamaMesin"
                                },
                            ],
                        });
                        $("#table_IdMesin tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    mesin.value = selectedRow.IdMesin.trim();
                    namaMesin.value = selectedRow.NamaMesin.trim();
                }

                $.ajax({
                    type: 'GET',
                    url: 'ExtruderTropodo/getShiftData',
                    data: {
                        _token: csrfToken,
                        tgl: tanggal.value,
                        Shift: Shift.value,
                        IdMesin: mesin.value
                    },
                    success: function (response) {
                        if (response.success) {
                            shiftAkhir.value;
                            shiftAwal.value;
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });


});