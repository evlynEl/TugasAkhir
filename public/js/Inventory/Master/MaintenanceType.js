var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var objekId = document.getElementById('objekId');
var objekNama = document.getElementById('objekNama');
var kelompokId = document.getElementById('kelompokId');
var kelompokNama = document.getElementById('kelompokNama');
var kelutId = document.getElementById('kelutId');
var kelutNama = document.getElementById('kelutNama');
var subkelId = document.getElementById('subkelId');
var subkelNama = document.getElementById('subkelNama');
var katUtama = document.getElementById('katUtama');
var kategori = document.getElementById('kategori');
var jenis = document.getElementById('jenis');
var kdBarang = document.getElementById('kdBarang');
var namaBarang = document.getElementById('namaBarang');
var kodeType = document.getElementById('kode_type');
var PIB = document.getElementById('PIB');
var PEB = document.getElementById('PEB');
var namaType = document.getElementById('namaType');
var ketType = document.getElementById('ketType');
var triter = document.getElementById('triter');
var sekunder = document.getElementById('sekunder');
var primer = document.getElementById('primer');
var satuan = document.getElementById('satuan');
var konversi = document.getElementById('konversi');
var primerSekunder = document.getElementById('primerSekunder');
var sekunderTritier = document.getElementById('sekunderTritier');

// button
var btn_divisi = document.getElementById('btn_divisi');
var btn_objek = document.getElementById('btn_objek');
var btn_kelompok = document.getElementById('btn_kelompok');
var btn_kelut = document.getElementById('btn_kelut');
var btn_subkel = document.getElementById('btn_subkel');
var btn_katUtama = document.getElementById('btn_katUtama');
var btn_kategori = document.getElementById('btn_kateogri');
var btn_jenis = document.getElementById('btn_jenis');
var btn_barang = document.getElementById('btn_brang');
var btn_kodeType = document.getElementById('btn_kodetype');
var btn_namaType = document.getElementById('btn_namatype');
var btn_triter = document.getElementById('btn_triter');
var btn_sekunder = document.getElementById('btn_sekunder');
var btn_primer = document.getElementById('btn_primer');
var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

var idtype;
var no_katUtama;
var no_kategori;
var no_subkategori;
var no_tritier;
var no_sekunder;
var no_primer;
let a; // isi = 1, koreksi = 2, hapus = 3
const divKonversiPS = document.getElementById('konvPS');
const divKonversiSK = document.getElementById('konvST');
const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));

btn_isi.focus();

btn_divisi.addEventListener('focus', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btn_isi.addEventListener('focus', function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// fungsi berhubungan dengan ENTER & oengecekkan yg kosong2
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.value.trim() !== '') {
                if (masuk.id === 'ketType') {
                    btn_triter.focus();
                } else {
                    inputs[index + 1].focus();
                }
            } else {
                inputs[index + 1].focus();
            }
        }
    })
});

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
                            url: "MaintenanceType/getDivisi",
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
                btn_objek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list objek
btn_objek.addEventListener("click", function (e) {
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
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceType/getObjek",
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
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok utama
btn_kelut.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Kelompok Utama',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok Utama</th>
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
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceType/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                objekId: objekId.value
                            }
                        },
                        columns: [
                            { data: "IdKelompokUtama" },
                            { data: "NamaKelompokUtama" }
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
                kelutId.value = result.value.IdKelompokUtama.trim();
                kelutNama.value = decodeHtmlEntities(result.value.NamaKelompokUtama.trim());
                btn_kelompok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
btn_kelompok.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Kelompok',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok</th>
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
                            url: "MaintenanceType/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelutId: kelutId.value
                            }
                        },
                        columns: [
                            { data: "idkelompok" },
                            { data: "namakelompok" }
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
                kelompokId.value = result.value.idkelompok.trim();
                kelompokNama.value = decodeHtmlEntities(result.value.namakelompok.trim());
                btn_subkel.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
btn_subkel.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Sub Kelompok',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Sub Kelompok</th>
                            <th scope="col">Nama Sub Kelompok</th>
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
                            url: "MaintenanceType/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelompokId: kelompokId.value
                            }
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" }
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
                subkelId.value = result.value.IdSubkelompok.trim();
                subkelNama.value = result.value.NamaSubKelompok.trim();
                btn_katUtama.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kategori utama
btn_katUtama.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Kategori Utama',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Kat. Utama</th>
                            <th scope="col">Nama</th>
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
                            url: "MaintenanceType/getKatut",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "no_kat_utama" },
                            { data: "nama" }
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
                katUtama.value = decodeHtmlEntities(result.value.nama.trim());
                no_katUtama = result.value.no_kat_utama.trim();
                console.log('kat utama', no_katUtama);

                btn_kategori.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kategori
btn_kategori.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Kategori ',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Kategori</th>
                            <th scope="col">Nama</th>
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
                            url: "MaintenanceType/getKategori",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                no_katUtama: no_katUtama
                            }
                        },
                        columns: [
                            { data: "no_kategori" },
                            { data: "nama_kategori" }
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
                kategori.value = decodeHtmlEntities(result.value.nama_kategori.trim());
                no_kategori = result.value.no_kategori.trim();
                console.log('kategori ', no_kategori);

                btn_jenis.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kategori
btn_jenis.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Sub. Kategori',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Sub. Kategori</th>
                            <th scope="col">Nama</th>
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
                            url: "MaintenanceType/getSubkategori",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                no_kategori: no_kategori
                            }
                        },
                        columns: [
                            { data: "no_sub_kategori" },
                            { data: "nama_sub_kategori" }
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
                jenis.value = decodeHtmlEntities(result.value.nama_sub_kategori.trim());
                no_subkategori = result.value.no_sub_kategori.trim();
                btn_barang.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list barang
btn_barang.addEventListener("click", function (e) {
    if (no_kategori.value === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Tentukan kategori terlebih dahulu',
            returnFocus: false
        }).then(() => {
            btn_kategori.focus();
        });
        return;
    }

    try {
        Swal.fire({
            title: 'Barang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Kode Barang</th>
                            <th scope="col">Nama Barang</th>
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
                            url: "MaintenanceType/getBarang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                no_subkategori: no_subkategori
                            }
                        },
                        columns: [
                            { data: "KD_BRG" },
                            { data: "NAMA_BRG" }
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

                kdBarang.value = result.value.KD_BRG.trim();
                namaBarang.value = decodeHtmlEntities(result.value.NAMA_BRG.trim());
                namaType.value = decodeHtmlEntities(result.value.NAMA_BRG.trim());

                fetchUnitData(kdBarang.value);

            }
        });
    } catch (error) {
        console.error(error);
    }
});


kdBarang.addEventListener("change", function () {
    fetchUnitData(kdBarang.value);
});

// fungsi unk dapet satuan dr kdBarang
function fetchUnitData(kdBarangValue) {
    $.ajax({
        url: "MaintenanceType/getFillSatuan",
        type: "GET",
        data: {
            _token: csrfToken,
            kdBarang: kdBarangValue
        },
        timeout: 30000,
        success: function (response) {
            if (response && response.length > 0) {
                triter.value = (response[0].NmSat_Tri && response[0].NmSat_Tri.trim()) || 'NULL';
                no_tritier = response[0].ST_TRI.trim();
                sekunder.value = (response[0].NmSat_Sek && response[0].NmSat_Sek.trim()) || 'NULL';
                no_sekunder = response[0].ST_SEK.trim();
                primer.value = (response[0].NmSat_Prim && response[0].NmSat_Prim.trim()) || 'NULL';
                no_primer = response[0].ST_PRIM.trim();
                console.log(no_tritier, no_sekunder, no_primer);

                var optioncoba = [
                    { value: '', text: 'Pilih Satuan Umum', disabled: true },
                    { value: no_tritier, text: triter.value },
                    { value: no_sekunder, text: sekunder.value },
                    { value: no_primer, text: primer.value }
                ];

                satuan.innerHTML = optioncoba.map(function (option) {
                    return '<option value="' + option.value + '"' + (option.disabled ? ' disabled selected' : '') + '>' + option.text + '</option>';
                }).join('');

                console.log(satuan.value);

            }
            namaType.focus();
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

// button list tritier
btn_triter.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Tritier',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Satuan</th>
                            <th scope="col">Nama Satuan</th>
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
                            url: "MaintenanceType/getSatuan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "no_satuan" },
                            { data: "nama_satuan" }
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
                triter.value = result.value.nama_satuan.trim();
                no_tritier = result.value.no_satuan.trim();
                btn_sekunder.focus();
            } else {
                if (!no_tritier) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Jika satuan tidak ada, pilih Null !!',
                        returnFocus: false
                    }).then(() => {
                        btn_triter.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sekunder
btn_sekunder.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Sekunder',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Satuan</th>
                            <th scope="col">Nama Satuan</th>
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
                            url: "MaintenanceType/getSatuan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "no_satuan" },
                            { data: "nama_satuan" }
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
                sekunder.value = result.value.nama_satuan.trim();
                no_sekunder = result.value.no_satuan.trim();
                btn_primer.focus();
            } else {
                if (!no_tritier) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Jika satuan tidak ada, pilih Null !!',
                        returnFocus: false
                    }).then(() => {
                        btn_sekunder.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list primer
btn_primer.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Primer',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Satuan</th>
                            <th scope="col">Nama Satuan</th>
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
                            url: "MaintenanceType/getSatuan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "no_satuan" },
                            { data: "nama_satuan" }
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
                primer.value = result.value.nama_satuan.trim();
                no_primer = result.value.no_satuan.trim();
                btn_proses.focus();
            } else {
                if (!no_tritier) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Jika satuan tidak ada, pilih Null !!',
                        returnFocus: false
                    }).then(() => {
                        btn_primer.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
}

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

function handleChange(event) {
    var selectedValue = event.target.value;
    satuan.value = selectedValue;
}

satuan.addEventListener('change', handleChange);

// fungsi unk display & hide konversi primer sekunter tritier
function toggleKonversiInputs() {
    if (konversi.checked) {
        divKonversiPS.style.display = 'flex';
        divKonversiSK.style.display = 'flex';
        primerSekunder.value = 0;
        sekunderTritier.value = 0;
        primerSekunder.select();
    } else {
        divKonversiPS.style.display = 'none';
        divKonversiSK.style.display = 'none';
    }
}

konversi.addEventListener('change', toggleKonversiInputs);

toggleKonversiInputs();

// button list kode type
btn_kodeType.addEventListener("click", function (e) {
    if (subkelNama.value === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Data Belum Lengkap Terisi',
            text: 'Tentukan Sub Kelompok terlebih dahulu !',
            returnFocus: false
        }).then(() => {
            btn_subkel.focus();
        });
    }

    if ((a === 2 && divisiId.value === 'INV') || (a === 3 && divisiId.value === 'INV')) {
        satuan.disabled = true;
    } else if ((a === 2 && divisiId.value !== 'INV') || (a === 3 && divisiId.value !== 'INV')) {
        satuan.disabled = false;
    }

    try {
        Swal.fire({
            title: 'Kode Type',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Type</th>
                            <th scope="col">Nama Type</th>
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
                            url: "MaintenanceType/getListKoreksi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                subkelId: subkelId.value
                            }
                        },
                        columns: [
                            { data: "IdType" },
                            { data: "NamaType" }
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
                kodeType.value = result.value.NamaType.trim();

                $.ajax({
                    url: "MaintenanceType/getSatuanKodeBarang",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idtype: idtype,
                        subkelId: subkelId.value,
                        kdBarang: kdBarang.value
                    },
                    timeout: 30000,
                    success: function (response) {
                        if (response && response.length > 0) {
                            namaType.value = (response[0].namaType && response[0].namaType.trim()) || '-';
                            ketType.value = (response[0].UraianType && response[0].UraianType.trim()) || '-';
                            PIB.value = (response[0].PIB && response[0].PIB.trim()) || '';

                            if (response[0].PakaiAturanKonversi.trim() === 'Y') {
                                konversi.checked = true;
                                primerSekunder.value = response[0].KonvSekunderKePrimer.trim();
                                sekunderTritier.value = response[0].KonvTritierKeSekunder.trim();
                            } else {
                                konversi.checked = false;
                                // primerSekunder.value = '';
                                // sekunderTritier.value = '';
                            }

                            triter.value = (response[0].satuan_tritier && response[0].satuan_tritier.trim()) || 'NULL';
                            no_tritier = response[0].ST_TRI.trim();
                            sekunder.value = (response[0].satuan_sekunder && response[0].satuan_sekunder.trim()) || 'NULL';
                            no_sekunder = response[0].ST_SEK.trim();
                            primer.value = (response[0].satuan_primer && response[0].satuan_primer.trim()) || 'NULL';
                            no_primer = response[0].ST_PRIM.trim();

                            kdBarang.value = response[0].KD_BRG.trim();
                            namaBarang.value = response[0].NAMA_BRG.trim();
                            jenis.value = response[0].SubKategory.trim();
                            kategori.value = response[0].Kategory.trim();
                            katUtama.value = response[0].Kategory_Utama.trim();
                        }
                        namaType.focus();
                    },
                    error: function (xhr, status, error) {
                        console.error('AJAX Error:', error);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list tritier
btn_namaType.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Type',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Satuan</th>
                            <th scope="col">Nama Type</th>
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
                            url: "MaintenanceType/getFinalSatuan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "no_satuan" },
                            { data: "nama_satuan" }
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
                triter.value = result.value.nama_satuan.trim();
                no_tritier = result.value.no_satuan.trim();
                btn_sekunder.focus();
            } else {
                if (!no_tritier) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Jika satuan tidak ada, pilih Null !!',
                        returnFocus: false
                    }).then(() => {
                        btn_triter.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button proses
btn_proses.addEventListener("click", function (e) {
    // console.log(no_tritier, no_sekunder, no_primer);

    if (konversi.checked) {
        konversi.value = "Y";
    } else {
        konversi.value = "T";
    }

    try {
        if (kdBarang.value === '' || namaType.value === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Data Belum Lengkap Terisi',
                text: 'Kode Barang Tidak Boleh Kosong !',
                returnFocus: false
            }).then(() => {
                kdBarang.focus();
            });
        } else {
            $.ajax({
                type: 'GET',
                url: 'MaintenanceType/proses',
                data: {
                    _token: csrfToken,
                    a: a,
                    namaType: namaType.value,
                    ketType: ketType.value,
                    PIB: PIB.value,
                    PEB: PEB.value,
                    kdBarang: kdBarang.value,
                    subkelId: subkelId.value,
                    konversi: konversi.value,
                    divisiId: divisiId.value,
                    divisiNama: divisiNama.value,
                    objekId: objekId.value,
                    objekNama: objekNama.value,
                    kelompokId: kelompokId.value,
                    kelompokNama: kelompokNama.value,
                    kelutId: kelutId.value,
                    kelutNama: kelutNama.value,
                    subkelNama: subkelNama.value,
                    katUtama: katUtama.value,
                    kategori: kategori.value,
                    jenis: jenis.value,
                    namaBarang: namaBarang.value,
                    kodeType: kodeType.value,
                    no_tritier: no_tritier,
                    no_sekunder: no_sekunder,
                    no_primer: no_primer,
                    satuan: satuan.value,
                    primerSekunder: primerSekunder.value,
                    sekunderTritier: sekunderTritier.value
                },
                timeout: 30000,
                success: function (response) {
                    if (a === 1) {
                        if (response.success) {
                            idtype = response.data && response.data[0] ? response.data[0].idtype : '';
                            Swal.fire({
                                icon: 'success',
                                title: 'Data terSIMPAN',
                                text: `Kode type: ${idtype}`,
                            }).then(() => {
                                btn_isi.focus();
                                kodeType.value = idtype;

                                Ketik.forEach(function (input) {
                                    input.disabled = true;
                                });
                            });
                        } else if (response.error) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Data Tidak ter-SIMPAN.',
                                text: `Kode Barang: ${response.data[0].KodeBarang.trim()} yang terletak pada Sub Kelompok: ${response.data[0].IdSubkelompok_Type.trim()} Sudah ADA.`,
                            });
                        }
                    } else if (a === 2) {

                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }

            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

var Ketik = document.querySelectorAll('input');
const buttons = document.querySelectorAll('.btn-info');

disableKetik();


// fungsi bisa ketik
function enableKetik() {
    Ketik.forEach(function (input) {
        input.value = '';
        input.disabled = false;
    });

    // disable semua button
    buttons.forEach(button => {
        button.disabled = false;
    });

    satuan.disabled = false;
    konversi.disabled = false;

    // hide button isi, tampilkan button proses
    btn_isi.style.display = 'none';
    btn_proses.style.display = 'inline-block';
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';
}

// fungsi gak bisa ketik
function disableKetik() {
    Ketik.forEach(function (input) {
        input.value = '';
        input.disabled = true;
    });
    // satuan.value = ''

    // disable semua button
    buttons.forEach(button => {
        button.disabled = true;
    });

    satuan.disabled = true;
    konversi.disabled = true;

    // hide button proses, tampilkan button isi
    btn_proses.style.display = 'none';
    btn_isi.style.display = 'inline-block';

    // hide button batal, tampilkan button koreksi
    btn_batal.style.display = 'none';
    btn_koreksi.style.display = 'inline-block';

    btn_hapus.disabled = false;
}

// button isi event listener
btn_isi.addEventListener('click', function () {
    a = 1;
    enableKetik();
    btn_divisi.focus();
    btn_hapus.disabled = true;
    btn_kodeType.disabled = true;
    btn_namaType.disabled = true;
});

// button batal event listener
btn_batal.addEventListener('click', function () {
    btn_hapus.disabled = false;
    disableKetik();
});

// button koreksi event listener
btn_koreksi.addEventListener('click', function () {
    a = 2;
    enableKetik();
    btn_hapus.disabled = true;
    kdBarang.readOnly = true;
    btn_katUtama.disabled = true;
    btn_kategori.disabled = true;
    btn_jenis.disabled = true;
    btn_barang.disabled = true;

    btn_divisi.focus();
});

// button hapus event listener
btn_hapus.addEventListener('click', function () {
    a = 3;
    btn_isi.style.display = 'none';
    btn_proses.style.display = 'inline-block';

    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    // btn_lihat.disabled = false;
    btn_hapus.disabled = true;
    // btn_lihat.focus();
});
