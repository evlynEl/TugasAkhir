// variable
var tanggal = document.getElementById('tanggal');
var jamInput = document.getElementById('jamInput');
var shiftLetter = document.getElementById('shiftLetter');

// jam saat ini
function jamSkrg() {
    jamInput.disabled = false;
    var currentTime = new Date();
    var hours = currentTime.getHours().toString().padStart(2, '0');
    var minutes = currentTime.getMinutes().toString().padStart(2, '0');
    var currentTimeString = hours + ':' + minutes;
    jamInput.value = currentTimeString;
}

// tanggal hari ini
function tanggalToday() {
    tanggal.disabled = false;
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');
    var todayString = year + '-' + month + '-' + day;
    tanggal.value = todayString;
}

var shiftAwal = document.getElementById('shiftAwal');
var shiftAkhir = document.getElementById('shiftAkhir');

var mesin = document.getElementById('mesin'); //idmesin
var namaMesin = document.getElementById('namaMesin')

var spekBenang = document.getElementById('spekBenang');
var idKonversi = document.getElementById('idKonversi');

var keterangan = document.getElementById('keterangan');
var denier = document.getElementById('denier');

// Bahan Baku
var bahan = document.getElementById('bahan');
var typeBahan = document.getElementById('typeBahan');
var quantityBahanBaku = document.getElementById('quantityBahanBaku');
var prosentaseBahanBaku = document.getElementById('prosentaseBahanBaku');

// Calpet/CACO3
var calpetCaco3 = document.getElementById('calpetCaco3');
var typeCalpetCaco3 = document.getElementById('typeCalpetCaco3');
var quantityCalpetCaco3 = document.getElementById('quantityCalpetCaco3');
var prosentaseCalpetCaco3 = document.getElementById('prosentaseCalpetCaco3');

// MasterBath
var masterBath = document.getElementById('masterBath');
var typeMasterBath = document.getElementById('typeMasterBath');
var quantityMasterBath = document.getElementById('quantityMasterBath');
var prosentaseMasterBath = document.getElementById('prosentaseMasterBath');

// UV
var uv = document.getElementById('uv');
var typeUv = document.getElementById('typeUv');
var quantityUv = document.getElementById('quantityUv');
var prosentaseUv = document.getElementById('prosentaseUv');

// LDPE
var ldpe = document.getElementById('ldpe');
var typeLdpe = document.getElementById('typeLdpe');
var quantityLdpe = document.getElementById('quantityLdpe');
var prosentaseLdpe = document.getElementById('prosentaseLdpe');

// Anti Static
var antiStatic = document.getElementById('antiStatic');
var typeAntiStatic = document.getElementById('typeAntiStatic');
var quantityAntiStatic = document.getElementById('quantityAntiStatic');
var prosentaseAntiStatic = document.getElementById('prosentaseAntiStatic');

// Peletan
var peletan = document.getElementById('peletan');
var typePeletan = document.getElementById('typePeletan');
var quantityPeletan = document.getElementById('quantityPeletan');
var prosentasePeletan = document.getElementById('prosentasePeletan');

// Additif
var additif = document.getElementById('additif');
var typeAdditif = document.getElementById('typeAdditif');
var quantityAdditif = document.getElementById('quantityAdditif');
var prosentaseAdditif = document.getElementById('prosentaseAdditif');

// Nomor Transaksi
var nomorTransaksi = document.getElementById('nomorTransaksi');

// -------------------------------------------------------------------------------------------
// button ...
var buttonNomorTransaksi = document.getElementById('buttonNomorTransaksi');
var buttonIdMesin = document.getElementById('buttonIdMesin');
var buttonSpekBenang = document.getElementById('buttonSpekBenang');
var tambahButton = document.getElementById('tambahButton');
var kurangButton = document.getElementById('kurangButton');

// function button
var hapusButton = document.getElementById('hapusButton');
var prosesButton = document.getElementById('prosesButton');
var isiButton = document.getElementById('isiButton');
var koreksiButton = document.getElementById('koreksiButton');
var batalButton = document.getElementById('batalButton');
var nomorButton;

prosesButton.disabled = true;

// button bahan di bawah
var buttonBahanBaku = document.getElementById('buttonBahanBaku');
var buttonCalpetCaco3 = document.getElementById('buttonCalpetCaco3');
var buttonMasterBath = document.getElementById('buttonMasterBath');
var buttonUv = document.getElementById('buttonUv');
var buttonLdpe = document.getElementById('buttonLdpe');
var buttonAntiStatic = document.getElementById('buttonAntiStatic');
var buttonPeletan = document.getElementById('buttonPeletan');
var buttonAdditif = document.getElementById('buttonAdditif');

var selectedButtonQuantity;

function setUpAwal() {
    document.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });

    document.querySelectorAll('input').forEach(input => {
        input.value = '';
    });

    isiButton.disabled = false;
    koreksiButton.disabled = false;
    hapusButton.disabled = false;

    jamSkrg();
    tanggalToday();

    nomorButton = 0;
}

setUpAwal();

// token
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

document.addEventListener('DOMContentLoaded', function () {

    let sudahAmbilNomor = 0;
    let currentIndex = null;

    // next index untuk keypress arrow di modal
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

    $('#jamInput').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (nomorButton !== 2) {
                tanggal.focus();
            }

            else {
                shiftLetter.focus();
            }
        }
    });

    $('#tanggal').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            const enteredDate = new Date(tanggal.value);
            const hariIni = new Date();

            if (enteredDate > hariIni) {
                Swal.fire({
                    icon: 'error',
                    title: 'Tanggal Melebihi Hari Ini!',
                    text: 'Tanggal tidak bisa melebihi hari ini.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    tanggalToday()
                });
            } else {
                shiftLetter.focus();
            }
        }
    });

    $('#shiftLetter').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            var shiftLetterValue = $(this).val().trim();
            if (shiftLetterValue !== '') {
                buttonIdMesin.focus();
            }
        }
    });

    $('.additional').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            var $inputs = $('.additional');
            var currentIndex = $inputs.index(this);
            var nextIndex = currentIndex + 1;

            if (nextIndex < $inputs.length) {
                $inputs.eq(nextIndex).focus();
            } else {
                tambahButton.focus();
            }
        }
    });

    $('#keterangan').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            denier.focus();
        }
    });

    $('#denier').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (nomorButton === 1 || nomorButton === 2) {
                Swal.fire({
                    icon: 'question',
                    title: 'Ada Detail?',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak',
                    returnFocus: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#lebarBenang').focus();
                    } else {
                        prosesButton.focus();
                    }
                });
            }
        }
    });

    // table komposisi
    const tableKomposisi = $('#tableKomposisi').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Id Type' },
            { title: 'Nama Type' },
            // { title: 'Jenis' },
            { title: 'Kelompok' },
            { title: 'Qty' },
            { title: 'Prosen' }
        ]
    });

    // button ... ambil nomor transaksi (baru ambil nomor)
    buttonNomorTransaksi.addEventListener('click', async () => {
        try {
            let result = await Swal.fire({
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
                returnFocus: false,
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

                    const table = $("#table_noTransaksi").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "ExtruderB/getNomorTransaksi",
                            dataType: "json",
                            data: {
                                tgl: tanggal.value,
                                Shift: shiftLetter.value,
                                Mesin: mesin.value
                            },
                            type: "GET",
                        },
                        columns: [
                            { data: "NoTrans" },
                            { data: "Trans" }
                        ],
                    });

                    $("#table_noTransaksi tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        currentIndex = table.row(this).index();
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_noTransaksi'));
                    
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    nomorTransaksi.value = selectedRow.NoTrans.trim();

                    if (nomorButton === 3) {
                        sudahAmbilNomor = 0;
                        prosesButton.focus();
                    }

                    else if (nomorButton === 2) {
                        tanggal.disabled = true;
                        jamInput.focus();
                    }

                    displayData();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // function display data
    function displayData() {
        dataArrKomposisi = [];
        dataArrayDetail = [];

        $.ajax({
            type: 'GET',
            url: 'ExtruderD/getDisplayDataByNoTr',
            data: {
                _token: csrfToken,
                noTr: nomorTransaksi.value,
            },
            success: function (result) {
                jamInput.value = result[0].JamInput.trim();
                shiftLetter.value = result[0].Shift.trim();
                shiftAkhir.value = result[0].JamAkhirShift.trim();
                shiftAwal.value = result[0].JamAwalShift.trim();
                mesin.value = result[0].Mesin.trim();
                namaMesin.value = result[0].TypeMesin.trim();
                spekBenang.value = result[0].SpekBenang.trim();
                idKonversi.value = result[0].IdKonv.trim();
                if (result[0].Keterangan != null) {
                    keterangan.value = result[0].Keterangan.trim();
                }
                else {
                    keterangan.value = result[0].Keterangan;
                }
                if (result[0].DenierRata != null) {
                    denier.value = result[0].DenierRata.trim();
                }
                else {
                    denier.value = result[0].DenierRata;
                }

                getListBahanBaku();
                getListDetailData();
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });

        // list bahan yang dipakai
        function getListBahanBaku() {
            $.ajax({
                type: 'GET',
                url: 'ExtruderD/getListBahanBaku',
                data: {
                    _token: csrfToken,
                    noTr: nomorTransaksi.value,
                    idKonv: idKonversi.value
                },
                success: function (result) {
                    console.log('AJAX request succeeded:', result); // Debugging log

                    tableKomposisi.clear();

                    result.forEach(function (row) {
                        const rowData = [
                            row['IdBahan'],
                            row['NamaType'],
                            row['NamaKelompok'],
                            row['Jml'],
                            row['Prosen'],
                            row['Jenis'],
                        ];
                        tableKomposisi.row.add(rowData).draw(false);
                        dataArrKomposisi.push(rowData); // Isi array dataArrKomposisi
                    });
                },
                error: function (xhr, status, error) {
                    console.error('AJAX request failed:', error); // Debugging log
                }
            });
        }


        // list detail data additional
        function getListDetailData() {
            $.ajax({
                type: 'GET',
                url: 'ExtruderD/getListDetailData',
                data: {
                    _token: csrfToken,
                    noTr: nomorTransaksi.value,
                },
                success: function (result) {
                    tableAdd.clear();

                    result.forEach(function (row) {
                        const rowData = [
                            row['LebarBng'],
                            row['Denier'],
                            row['Strength'],
                            row['Elongation'],
                            row['KetStr'],
                        ];
                        tableAdd.row.add(rowData).draw(false);
                        // dataArrayDetail.push(rowData);
                    });

                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }
    }


    // button ... ambil id mesin dan shift
    buttonIdMesin.addEventListener('click', async () => {
        try {
            let result = await Swal.fire({
                title: "Pilih Id Mesin",
                html: `<table id="table_IdMesin" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>ID Mesin</th>
                                <th>Type Mesin</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                focusConfirm: false,
                preConfirm: () => {
                    const selectedData = $("#table_IdMesin").DataTable().row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    currentIndex = null;

                    const table = $("#table_IdMesin").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "ExtruderB/getIdMesin",
                            dataType: "json",
                            data: {
                                tgl: tanggal.value,
                                Shift: shiftLetter.value,
                            },
                            type: "GET",
                        },
                        columns: [
                            { data: "IdMesin" },
                            { data: "NamaMesin" },
                        ],
                    });

                    $("#table_IdMesin tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });

                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_IdMesin'));
                },
                didClose: () => {
                    if (nomorButton === 2 || nomorButton === 3) {
                        if (sudahAmbilNomor !== 1) {
                            buttonNomorTransaksi.focus();
                            sudahAmbilNomor = 1;
                        }
                        else {
                            buttonSpekBenang.focus();
                            sudahAmbilNomor = 0;
                        }
                    } else {
                        buttonSpekBenang.focus();
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    mesin.value = selectedRow.IdMesin.trim();
                    namaMesin.value = selectedRow.NamaMesin.trim();

                    $.ajax({
                        type: 'GET',
                        url: 'ExtruderB/getShiftData',
                        data: {
                            _token: csrfToken,
                            tgl: tanggal.value,
                            Shift: shiftLetter.value,
                            IdMesin: mesin.value
                        },
                        success: function (result) {
                            shiftAkhir.value = result[0].AkhirShift.trim();
                            shiftAwal.value = result[0].AwalShift.trim();
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // button ... spek benang
    buttonSpekBenang.addEventListener('click', async () => {
        try {
            let result = Swal.fire({
                title: "Pilih Spek Benang",
                html: `<table id="table_spekBenang" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Type Benang</th>
                                    <th>Id Mesin</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const selectedData = $("#table_spekBenang").DataTable().row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_spekBenang").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "ExtruderB/getSpekBenang",
                                dataType: "json",
                                data: {
                                    tgl: tanggal.value,
                                    Shift: shiftLetter.value,
                                    mesin: mesin.value
                                },
                                type: "GET",
                            },
                            columns: [
                                { data: "TypeBenang" },
                                { data: "IdMesin" },
                            ],
                        });
                        $("#table_spekBenang tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_spekBenang'));

                    });
                },
                didClose: () => {
                    buttonBahanBaku.focus();
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    spekBenang.value = selectedRow.TypeBenang.trim();

                    $.ajax({
                        type: 'GET',
                        url: 'ExtruderB/getIdKonversi',
                        data: {
                            _token: csrfToken,
                            tgl: tanggal.value,
                            shift: shiftLetter.value,
                            mesin: mesin.value,
                            benang: spekBenang.value
                        },
                        success: function (result) {
                            idKonversi.value = result[0].IdKonversi.trim();
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    let dataArrKomposisi = [];

    // button ...  Bahan Baku
    buttonBahanBaku.addEventListener('click', async () => {
        try {
            let result = await Swal.fire({
                title: "Pilih Bahan",
                html: `<table id="table_bahanBaku" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Merk</th>
                                    <th>Id Type</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const selectedData = $("#table_bahanBaku").DataTable().row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_bahanBaku").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "ExtruderB/getBahanBaku",
                                dataType: "json",
                                data: {
                                    tgl: tanggal.value,
                                    shift: shiftLetter.value,
                                    nama: namaMesin.value,
                                    benang: spekBenang.value
                                },
                                type: "GET",
                            },
                            columns: [
                                { data: "Merk" },
                                { data: "IdType" },
                            ],
                        });
                        $("#table_bahanBaku tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_bahanBaku'));
                    });
                },
                didClose: () => {
                    buttonCalpetCaco3.focus();
                }
            });

            if (result.isConfirmed) {
                const selectedRow = result.value;
                bahan.value = selectedRow.IdType.trim();
                typeBahan.value = selectedRow.Merk.trim();

                let dataExists = false;
                $("#tableKomposisi tbody tr").each(function () {
                    const idType = $(this).find("td:eq(0)").text().trim();
                    // const merk = $(this).find("td:eq(0)").text().trim();
                    if (idType === selectedRow.IdType.trim()) {
                        dataExists = true;
                        return false;
                    }
                });

                if (dataExists) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Data: ' + typeBahan.value + ', sudah ada di daftar komposisi.'
                    });
                } else {
                    $.ajax({
                        type: 'GET',
                        url: 'ExtruderB/getQuantityBahanBaku',
                        data: {
                            _token: csrfToken,
                            tgl: tanggal.value,
                            shift: shiftLetter.value,
                            nama: namaMesin.value,
                            benang: spekBenang.value,
                            type: bahan.value
                        },
                        success: function (result) {
                            quantityBahanBaku.value = result[0].Quantity.trim();

                            $('#tableKomposisi').DataTable().row.add([
                                selectedRow.IdType.trim(),
                                selectedRow.Merk.trim(),
                                result[0].NamaKelompok.trim(),
                                result[0].Quantity.trim(),
                                0,
                                result[0].StatusType.trim(),
                            ]).draw(false);

                            let StatusTypeVariable = result[0].StatusType.trim();
                            let NamaKelompokVariable = result[0].NamaKelompok.trim();
                            let QuantityVariable = result[0].Quantity.trim();

                            dataArrKomposisi.push([
                                selectedRow.IdType.trim(),
                                selectedRow.Merk.trim(),
                                NamaKelompokVariable,
                                QuantityVariable,
                                0,
                                StatusTypeVariable,
                            ]);
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // untuk ambil data semua bahan, selain bahan baku
    function openAllModal(selectedButtonQuantity) {
        try {
            let result = Swal.fire({
                title: "Pilih Bahan",
                html: `<table id="table_bahan" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>Merk</th>
                                <th>Id Type</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const selectedData = $("#table_bahan").DataTable().row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_bahan").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "ExtruderD/" + selectedButtonQuantity,
                                dataType: "json",
                                data: {
                                    tgl: tanggal.value,
                                    shift: shiftLetter.value,
                                    nama: namaMesin.value,
                                    benang: spekBenang.value
                                },
                                type: "GET",
                            },
                            columns: [
                                { data: "Merk" },
                                { data: "IdType" },
                            ],
                        });
                        $("#table_bahan tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_bahan'));

                    });
                },
                didClose: () => {
                    if (selectedButtonQuantity == 'getCalpetCaco3') {
                        buttonMasterBath.focus();
                    } else if (selectedButtonQuantity == 'getMasterBath') {
                        buttonUv.focus();
                    } else if (selectedButtonQuantity == 'getUv') {
                        buttonLdpe.focus();
                    } else if (selectedButtonQuantity == 'getLdpe') {
                        buttonAntiStatic.focus();
                    } else if (selectedButtonQuantity == 'getAntiStatic') {
                        buttonPeletan.focus();
                    } else if (selectedButtonQuantity == 'getPeletan') {
                        buttonAdditif.focus();
                    } else {
                        keterangan.focus();
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;

                    var typeSelected;

                    switch (selectedButtonQuantity) {
                        case 'getCalpetCaco3':
                            calpetCaco3.value = selectedRow.IdType.trim();
                            typeCalpetCaco3.value = selectedRow.Merk.trim();
                            typeSelected = calpetCaco3.value.trim();
                            break;

                        case 'getMasterBath':
                            masterBath.value = selectedRow.IdType.trim();
                            typeMasterBath.value = selectedRow.Merk.trim();
                            typeSelected = masterBath.value.trim();
                            break;

                        case 'getUv':
                            uv.value = selectedRow.IdType.trim();
                            typeUv.value = selectedRow.Merk.trim();
                            typeSelected = uv.value.trim();
                            break;

                        case 'getLdpe':
                            ldpe.value = selectedRow.IdType.trim();
                            typeLdpe.value = selectedRow.Merk.trim();
                            typeSelected = ldpe.value.trim();
                            break;

                        case 'getAntiStatic':
                            antiStatic.value = selectedRow.IdType.trim();
                            typeAntiStatic.value = selectedRow.Merk.trim();
                            typeSelected = antiStatic.value.trim();
                            break;

                        case 'getPeletan':
                            peletan.value = selectedRow.IdType.trim();
                            typePeletan.value = selectedRow.Merk.trim();
                            typeSelected = peletan.value.trim();
                            break;

                        case 'getAdditif':
                            additif.value = selectedRow.IdType.trim();
                            typeAdditif.value = selectedRow.Merk.trim();
                            typeSelected = additif.value.trim();
                            break;

                        default:
                            console.log('No matching case found for selectedButtonQuantity:', selectedButtonQuantity);
                            break;
                    }

                    let buttonQuantity = selectedButtonQuantity + 'Quantity';

                    $.ajax({
                        type: 'GET',
                        url: 'ExtruderD/' + buttonQuantity,
                        data: {
                            _token: csrfToken,
                            tgl: tanggal.value,
                            shift: shiftLetter.value,
                            nama: namaMesin.value,
                            benang: spekBenang.value,
                            type: typeSelected
                        },
                        success: function (result) {

                            let StatusTypeVariable = result[0].StatusType.trim();
                            let NamaKelompokVariable = result[0].NamaKelompok.trim();
                            let QuantityVariable = result[0].Quantity.trim();
                            let ProsentaseVariable = result[0].Prosentase.trim();
                            let merkSwal = result[0].Merk.trim();

                            let dataExists = false;
                            $("#tableKomposisi tbody tr").each(function () {
                                const idType = $(this).find("td:eq(0)").text().trim();
                                // const merk = $(this).find("td:eq(0)").text().trim();
                                if (idType === selectedRow.IdType.trim()) {
                                    dataExists = true;
                                    return false;
                                }
                            });

                            if (dataExists) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Data: ' + merkSwal + ', sudah ada di daftar komposisi.'
                                });
                            } else {
                                $('#tableKomposisi').DataTable().row.add([
                                    selectedRow.IdType.trim(),
                                    selectedRow.Merk.trim(),
                                    NamaKelompokVariable,
                                    QuantityVariable,
                                    ProsentaseVariable,
                                    StatusTypeVariable,
                                ]).draw(false);

                                // Push data to dataArrKomposisi array
                                dataArrKomposisi.push([
                                    selectedRow.IdType.trim(),
                                    selectedRow.Merk.trim(),
                                    NamaKelompokVariable,
                                    QuantityVariable,
                                    ProsentaseVariable,
                                    StatusTypeVariable,
                                ]);

                                switch (selectedButtonQuantity) {
                                    case 'getCalpetCaco3':
                                        quantityCalpetCaco3.value = QuantityVariable;
                                        prosentaseCalpetCaco3.value = ProsentaseVariable;
                                        break;

                                    case 'getMasterBath':
                                        quantityMasterBath.value = QuantityVariable;
                                        prosentaseMasterBath.value = ProsentaseVariable;
                                        break;

                                    case 'getUv':
                                        quantityUv.value = QuantityVariable;
                                        prosentaseUv.value = ProsentaseVariable;
                                        break;

                                    case 'getLdpe':
                                        quantityLdpe.value = QuantityVariable;
                                        prosentaseLdpe.value = ProsentaseVariable;
                                        break;

                                    case 'getAntiStatic':
                                        quantityAntiStatic.value = QuantityVariable;
                                        prosentaseAntiStatic.value = ProsentaseVariable;
                                        break;

                                    case 'getPeletan':
                                        quantityPeletan.value = QuantityVariable;
                                        prosentasePeletan.value = ProsentaseVariable;
                                        break;

                                    case 'getAdditif':
                                        quantityAdditif.value = QuantityVariable;
                                        prosentaseAdditif.value = ProsentaseVariable;
                                        break;

                                    default:
                                        console.log('No matching case found for selectedButtonQuantity:', selectedButtonQuantity);
                                        break;
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    // langsung ke function ambil data
    buttonCalpetCaco3.addEventListener('click', function () { openAllModal('getCalpetCaco3'); });
    buttonMasterBath.addEventListener('click', function () { openAllModal('getMasterBath'); });
    buttonUv.addEventListener('click', function () { openAllModal('getUv'); });
    buttonLdpe.addEventListener('click', function () { openAllModal('getLdpe'); });
    buttonAntiStatic.addEventListener('click', function () { openAllModal('getAntiStatic'); });
    buttonPeletan.addEventListener('click', function () { openAllModal('getPeletan'); });
    buttonAdditif.addEventListener('click', function () { openAllModal('getAdditif'); });

    // table untuk additional data
    const tableAdd = $('#tabelAdd').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Lebar Benang' },
            { title: 'Denier' },
            { title: 'Strength' },
            { title: 'Elongation' },
            { title: 'Ket. Strength' }
        ]
    });

    let dataArrayDetail = [];

    // Function to add row to DataTable additional
    $('#tambahButton').on('click', function () {
        const lebarBenang = $('#lebarBenang').val().trim();
        const denier = $('#denierAdd').val().trim();
        const strength = $('#strength').val().trim();
        const elongation = $('#elongation').val().trim();
        const ketStrength = $('#ketStrength').val().trim();

        if (lebarBenang && denier && strength && elongation) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data berhasil ditambahkan. Tambah data lagi?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                returnFocus: false
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        $('#lebarBenang').focus();
                        tableAdd.rows().deselect().draw(false);
                    } else {
                        prosesButton.focus();
                        resetInputDetail();
                        tableAdd.rows().deselect().draw(false);
                    }
                });

            resetInputDetail();

            // Add data to DataTable
            tableAdd.row.add([lebarBenang, denier, strength, elongation, ketStrength]).draw(false);
        } else {
            let errorMessage = 'Mohon isi ';
            if (!lebarBenang) {
                errorMessage += 'Lebar Benang, ';
            }
            if (!denier) {
                errorMessage += 'Denier, ';
            }
            if (!strength) {
                errorMessage += 'Strength, ';
            }
            if (!elongation) {
                errorMessage += 'Elongation, ';
            }
            errorMessage = errorMessage.replace(/,\s*$/, '');
            errorMessage += '.';

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage
            });
        }
    });

    // hapus additional data
    $('#kurangButton').on('click', function () {
        const selectedRow = tableAdd.row('.selected');
        if (selectedRow.any()) {
            selectedRow.remove().draw(false);
            resetInputDetail();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Mohon pilih salah satu baris yang akan dihapus.'
            });
        }
    });

    $('#tabelAdd tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            resetInputDetail();
        } else {
            tableAdd.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            const rowData = tableAdd.row(this).data();
            if (rowData) {
                $('#lebarBenang').val(rowData[0]);
                $('#denierAdd').val(rowData[1]);
                $('#strength').val(rowData[2]);
                $('#elongation').val(rowData[3]);
                $('#ketStrength').val(rowData[4]);
            }
        }
    });

    function resetInputDetail() {
        $('#lebarBenang').val('');
        $('#denierAdd').val('');
        $('#strength').val('');
        $('#elongation').val('');
        $('#ketStrength').val('');
    }


    // PROSES button
    prosesButton.addEventListener('click', async () => {

        // ISI
        if (nomorButton === 1) {
            // kalau mau proses isi,minim ada shift, mesin
            if (mesin.value === '' || shiftLetter.value === '') {
                let errorMessage = 'Isi ';
                if (mesin.value === '') {
                    errorMessage += 'Mesin';
                }
                if (mesin.value === '' && shiftLetter.value === '') {
                    errorMessage += ' dan ';
                }
                if (shiftLetter.value === '') {
                    errorMessage += 'Shift';
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage
                });
                return;
            }

            dataArrayDetail = [];
            tableAdd.rows().every(function () {
                const data = this.data();
                dataArrayDetail.push(data);
            });

            $.ajax({
                type: 'PUT', //update
                url: 'ExtruderD/insertDataGeneral', //update
                data: {
                    _token: csrfToken,
                    jam: jamInput.value,
                    tgl: tanggal.value,
                    shift: shiftLetter.value,
                    mesin: mesin.value,
                    awal: shiftAwal.value,
                    akhir: shiftAkhir.value,
                    benang: spekBenang.value,
                    denierrata: denier.value,
                    ket: keterangan.value,
                    idKonv: idKonversi.value,
                },
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                            didClose: () => {
                                batalButton.click();
                            }
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });

            // ambil nomor transaksi dan save komposisi dan additional data
            $.ajax({
                type: 'GET',
                url: 'ExtruderD/getIdTransaksi',
                data: {
                    _token: csrfToken,
                },
                success: function (response) {
                    nomorTransaksi.value = response[0].sNomer.trim();

                    saveKomposisiData();
                    saveAdditionalData();
                    updateCounter();

                    clearTable();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }

        // KOREKSI
        else if (nomorButton === 2) {
            dataArrayDetail = [];
            tableAdd.rows().every(function () {
                const data = this.data();
                dataArrayDetail.push(data);
            });

            // update data
            $.ajax({
                type: 'PUT',
                url: 'ExtruderD/updateGeneralData',
                data: {
                    _token: csrfToken,
                    noTr: nomorTransaksi.value,
                    denierrata: denier.value,
                    ket: keterangan.value,
                    shift: shiftLetter.value,
                    mesin: mesin.value,
                    awal: shiftAwal.value,
                    akhir: shiftAkhir.value,
                    bng: spekBenang.value,
                    jam: jamInput.value,
                    idKonv: idKonversi.value,
                },
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                            didClose: () => {
                                batalButton.click();
                            }
                        });
                        // delete bahan baku lalu masukan lagi
                        deleteBahan();
                        saveKomposisiData();

                        // delete detail lalu masukan lagi
                        deleteDetail();
                        saveAdditionalData();

                        updateCounter();

                        clearTable();

                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }

        // HAPUS
        else if (nomorButton === 3) {
            try {
                const deleteDetail = $.ajax({
                    type: 'DELETE',
                    url: 'ExtruderD/deleteDetail',
                    data: {
                        _token: csrfToken,
                        noTr: nomorTransaksi.value
                    }
                });

                const deleteBahan = $.ajax({
                    type: 'DELETE',
                    url: 'ExtruderD/deleteBahan',
                    data: {
                        _token: csrfToken,
                        noTr: nomorTransaksi.value
                    }
                });

                const deleteMaster = $.ajax({
                    type: 'DELETE',
                    url: 'ExtruderD/deleteMaster',
                    data: {
                        _token: csrfToken,
                        noTr: nomorTransaksi.value
                    }
                });

                const responses = await Promise.allSettled([deleteDetail, deleteMaster, deleteBahan]);

                let successMessages = [];
                let errorMessages = [];

                responses.forEach((response, index) => {
                    if (response.status === 'fulfilled' && response.value.success) {
                        successMessages.push(response.value.success);
                    } else if (response.status === 'rejected') {
                        switch (index) {
                            case 0:
                                errorMessages.push('Penghapusan data detail gagal');
                                break;
                            case 1:
                                errorMessages.push('Penghapusan data master gagal');
                                break;
                            case 2:
                                errorMessages.push('Penghapusan data bahan gagal');
                                break;
                        }
                    }
                });

                if (errorMessages.length > 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: errorMessages.join(', '),
                    });
                } else if (successMessages.length > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: "Data berhasil diHAPUS",
                        confirmButtonText: 'Ok',
                        didClose: () => {
                            batalButton.click();
                        }
                    });
                }

            } catch (error) {
                console.error('AJAX Error:', error);
            }
        }


    });

    // functionsave komposisi
    function saveKomposisiData() {
        if (dataArrKomposisi.length === 0) {
            return;
        }

        $.ajax({
            type: 'PUT',
            url: 'ExtruderD/insertDataKomposisi',
            data: {
                _token: csrfToken,
                dataArray: dataArrKomposisi,
                noTr: nomorTransaksi.value
            },
            success: function (response) {
                if (response.success) {
                    dataArrKomposisi = [];
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });

    }

    // function save additional data
    function saveAdditionalData() {
        if (dataArrayDetail.length === 0) {
            return;
        }

        $.ajax({
            type: 'PUT',
            url: 'ExtruderD/insertAdditionalData',
            data: {
                _token: csrfToken,
                dataArray: dataArrayDetail,
                noTr: nomorTransaksi.value
            },
            success: function (response) {
                if (response.success) {
                    dataArrayDetail = [];
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    // function update nomor counter dari id transaksi
    function updateCounter() {
        $.ajax({
            type: 'PUT',
            url: 'ExtruderD/updateCounter',
            data: {
                _token: csrfToken,
                noTr: nomorTransaksi.value
            },
            success: function (response) {

            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }


    // HAPUS
    hapusButton.addEventListener('click', async () => {
        nomorButton = 3;

        isiButton.disabled = true;
        koreksiButton.disabled = true;
        hapusButton.disabled = true;
        prosesButton.disabled = false;
        batalButton.disabled = false;

        buttonNomorTransaksi.disabled = false;
        buttonIdMesin.disabled = false;

        tanggal.focus();

    });


    // KOREKSI
    koreksiButton.addEventListener('click', async () => {

        nomorButton = 2;

        document.querySelectorAll('button').forEach(button => {
            button.disabled = false;
        });

        isiButton.disabled = true;
        koreksiButton.disabled = true;
        hapusButton.disabled = true;

        tanggal.focus();

    });

    isiButton.addEventListener('click', async () => {
        nomorButton = 1;

        document.querySelectorAll('button').forEach(button => {
            button.disabled = false;
        });

        isiButton.disabled = true;
        koreksiButton.disabled = true;
        hapusButton.disabled = true;

        jamInput.focus();
    });

    batalButton.addEventListener('click', async () => {
        nomorButton = 0;

        isiButton.disabled = false;
        koreksiButton.disabled = false;
        hapusButton.disabled = false;
        prosesButton.disabled = true;
        batalButton.disabled = false;


        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });

        document.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });

        isiButton.disabled = false;
        koreksiButton.disabled = false;
        hapusButton.disabled = false;

        jamSkrg();
        tanggalToday();
        clearTable();
    });

    function clearTable() {
        tableAdd.clear().draw();
        tableKomposisi.clear().draw();

        dataArrKomposisi = [];
        dataArrayDetail = [];
    }

    function deleteDetail() {
        $.ajax({
            type: 'DELETE',
            url: 'ExtruderD/deleteDetail',
            data: {
                _token: csrfToken,
                noTr: nomorTransaksi.value
            }
        });
    }

    function deleteBahan() {
        $.ajax({
            type: 'DELETE',
            url: 'ExtruderD/deleteBahan',
            data: {
                _token: csrfToken,
                noTr: nomorTransaksi.value
            }
        });
    }

});