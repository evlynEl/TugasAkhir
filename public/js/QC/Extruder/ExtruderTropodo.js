// variable
var tanggal = document.getElementById('tanggal');
var jamInput = document.getElementById('jamInput');
var shiftLetter = document.getElementById('shiftLetter');

var shiftAwal = document.getElementById('shiftAwal');
var shiftAkhir = document.getElementById('shiftAkhir');

var mesin = document.getElementById('mesin'); //idmesin
var namaMesin = document.getElementById('namaMesin')

var spekBenang = document.getElementById('spekBenang');
var idKonversi = document.getElementById('idKonversi');

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

// LLDPE
var lldpe = document.getElementById('lldpe');
var typeLldpe = document.getElementById('typeLldpe');
var quantityLldpe = document.getElementById('quantityLldpe');
var prosentaseLldpe = document.getElementById('prosentaseLldpe');

// LDPE Lami
var ldpeLami = document.getElementById('ldpeLami');
var typeLdpeLami = document.getElementById('typeLdpeLami');
var quantityLdpeLami = document.getElementById('quantityLdpeLami');
var prosentaseLdpeLami = document.getElementById('prosentaseLdpeLami');

// LDPE
var ldpe = document.getElementById('ldpe');
var typeLdpe = document.getElementById('typeLdpe');
var quantityLdpe = document.getElementById('quantityLdpe');
var prosentaseLdpe = document.getElementById('prosentaseLdpe');

// Conductive
var conductive = document.getElementById('conductive');
var typeConductive = document.getElementById('typeConductive');
var quantityConductive = document.getElementById('quantityConductive');
var prosentaseConductive = document.getElementById('prosentaseConductive');

// HDPE
var hdpe = document.getElementById('hdpe');
var typeHdpe = document.getElementById('typeHdpe');
var quantityHdpe = document.getElementById('quantityHdpe');
var prosentaseHdpe = document.getElementById('prosentaseHdpe');

// Sweeping
var sweeping = document.getElementById('sweeping');
var typeSweeping = document.getElementById('typeSweeping');
var quantitySweeping = document.getElementById('quantitySweeping');
var prosentaseSweeping = document.getElementById('prosentaseSweeping');

// Injection
var injection = document.getElementById('injection');
var typeInjection = document.getElementById('typeInjection');
var quantityInjection = document.getElementById('quantityInjection');
var prosentaseInjection = document.getElementById('prosentaseInjection');

// Nomor Transaksi
var nomorTransaksi = document.getElementById('nomorTransaksi');

// -------------------------------------------------------------------------------------------
// button ...
var buttonNomorTransaksi = document.getElementById('buttonNomorTransaksi');
var buttonIdMesin = document.getElementById('buttonIdMesin');
var buttonSpekBenang = document.getElementById('buttonSpekBenang');

// button bahan di bawah
var buttonBahanBaku = document.getElementById('buttonBahanBaku');
var buttonCalpetCaco3 = document.getElementById('buttonCalpetCaco3');
var buttonMasterBath = document.getElementById('buttonMasterBath');
var buttonUv = document.getElementById('buttonUv');
var buttonAntiStatic = document.getElementById('buttonAntiStatic');
var buttonPeletan = document.getElementById('buttonPeletan');
var buttonAdditif = document.getElementById('buttonAdditif');
var buttonLldpe = document.getElementById('buttonLldpe');
var buttonLdpeLami = document.getElementById('buttonLdpeLami');
var buttonLdpe = document.getElementById('buttonLdpe');
var buttonConductive = document.getElementById('buttonConductive');
var buttonHdpe = document.getElementById('buttonHdpe');
var buttonSweeping = document.getElementById('buttonSweeping');
var buttonInjection = document.getElementById('buttonInjection');

var selectedButtonQuantity;

// token
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

document.addEventListener('DOMContentLoaded', function () {

    // button ... ambil nomor transaksi (baru ambil nomor)
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

    // button ... ambil id mesin dan shift
    buttonIdMesin.addEventListener('click', async () => {
        try {
            let result = Swal.fire({
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
                preConfirm: () => {
                    const selectedData = $("#table_IdMesin").DataTable().row(".selected").data();
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
                                { data: "IdMesin" },
                                { data: "NamaMesin" },
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

                    $.ajax({
                        type: 'GET',
                        url: 'ExtruderTropodo/getShiftData',
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
                                url: "ExtruderTropodo/getSpekBenang",
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
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    spekBenang.value = selectedRow.TypeBenang.trim();

                    $.ajax({
                        type: 'GET',
                        url: 'ExtruderTropodo/getIdKonversi',
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

    // button ...  Bahan Baku
    buttonBahanBaku.addEventListener('click', async () => {
        try {
            let result = Swal.fire({
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
                                url: "ExtruderTropodo/getBahanBaku",
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
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    bahan.value = selectedRow.IdType.trim();
                    typeBahan.value = selectedRow.Merk.trim();

                    $.ajax({
                        type: 'GET',
                        url: 'ExtruderTropodo/getQuantityBahanBaku',
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

    // dynamic, blom jadi
    function openBahanBakuModal(selectedButtonQuantity) {
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
                                url: "ExtruderTropodo/getBahanBaku",
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
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    bahan.value = selectedRow.IdType.trim();
                    typeBahan.value = selectedRow.Merk.trim();

                    $.ajax({
                        type: 'GET',
                        url: 'ExtruderTropodo/' + selectedButtonQuantity,
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

    buttonCalpetCaco3.addEventListener('click', function () { openBahanBakuModal('getCalpetCaco3'); });
    buttonMasterBath.addEventListener('click', function () { openBahanBakuModal('getMasterBath'); });
    buttonUv.addEventListener('click', function () { openBahanBakuModal('getUv'); });
    buttonAntiStatic.addEventListener('click', function () { openBahanBakuModal('getAntiStatic'); });
    buttonPeletan.addEventListener('click', function () { openBahanBakuModal('getPeletan'); });
    buttonAdditif.addEventListener('click', function () { openBahanBakuModal('getAdditif'); });
    buttonLldpe.addEventListener('click', function () { openBahanBakuModal('getLldpe'); });
    buttonLdpeLami.addEventListener('click', function () { openBahanBakuModal('getLdpeLami'); });
    buttonLdpe.addEventListener('click', function () { openBahanBakuModal('getLdpe'); });
    buttonConductive.addEventListener('click', function () { openBahanBakuModal('getConductive'); });
    buttonHdpe.addEventListener('click', function () { openBahanBakuModal('getHdpe'); });
    buttonSweeping.addEventListener('click', function () { openBahanBakuModal('getSweeping'); });
    buttonInjection.addEventListener('click', function () { openBahanBakuModal('getInjection'); });
});