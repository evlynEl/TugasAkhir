// button
let btn_noRoll = document.getElementById('btn_noRoll');
let btn_submit = document.getElementById('btn_submit');

// variable
let no_roll = document.getElementById("no_roll");
let nama_type = document.getElementById("nama_type");
let no_indeks = document.getElementById("item_number");
let kode_barang = document.getElementById("kode_barang");
let meter_bruto = document.getElementById("meter_bruto");
let qty_sekunder = document.getElementById("meter_netto");
let qty = document.getElementById("kg");
let afalanInput = document.getElementById('afalan');
let lblSekunder = document.getElementById('lblSekunder');
let lblTritier = document.getElementById('lblTritier');

let prosesButton = document.getElementById('btn_submit')

//token csrf
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

document.addEventListener("DOMContentLoaded", function() {
    btn_noRoll.focus();
});

$('#afalan').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        prosesButton.focus();
    }
});

// button nomor roll (show, etc)
btn_noRoll.addEventListener("click", function (e) {
    try {
        let result = Swal.fire({
            title: "Pilih No Roll",
            html: `<table id="table_noRoll" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>No Roll</th>
                                <th>Nama Type</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`,
                    width: '40%',
            showCancelButton: true,
            confirmButtonText: 'Pilih',
            cancelButtonText: 'Close',
            preConfirm: () => {
                const selectedData = $("#table_noRoll")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            didClose: () => {
                afalanInput.focus();
            },
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_noRoll").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "InputAfalanQC/getDataNoRoll",
                            dataType: "json",
                            type: "GET",
                        },
                        columns: [
                            {
                                data: "NoRoll",
                            },
                            {
                                data: "NamaType"
                            },
                        ],
                    });
                    $("#table_noRoll tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_noRoll'));

                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRow = result.value;
                no_roll.value = selectedRow.NoRoll.trim();//no roll
                nama_type.value = selectedRow.NamaType.trim();//nama type
                $.ajax({
                    url: "InputAfalanQC/getDataDetailNoRoll",
                    type: "GET",
                    data: { noRoll: no_roll.value },
                    success: function (result) {
                        // console.log(result);
                        no_indeks.value = result[0].NoIndeks.trim();//item number
                        kode_barang.value = result[0].Kode_Barang.trim();//kode barang
                        meter_bruto.value = result[0].MeterBruto.trim();//bruto
                        qty_sekunder.value = result[0].Qty_Sekunder.trim();//netto
                        qty.value = result[0].Qty.trim();//kg

                        lblSekunder.innerText = result[0].lblSekunder.trim();
                        lblTritier.innerText = result[0].SatTritier.trim();
                    }
                });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});


btn_submit.addEventListener("click", function (e) {
    e.preventDefault();
    try {
        let meter_netto;
        var afalan = parseFloat(document.getElementById("afalan").value.trim());
        console.log(afalan);

        if (afalan > 0) {
            var meter_bruto_value = parseFloat(meter_bruto.value);
            meter_netto = meter_bruto_value - afalan;
        }

        $.ajax({
            type: 'PUT',
            url: 'InputAfalanQC/inputDataAfalan',
            data: {
                _token: csrfToken,
                kode: kode_barang.value,
                item_number: no_indeks.value,
                no_roll: no_roll.value,
                meter_netto: meter_netto
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.success,
                        didClose: () => {
                            btn_noRoll.focus();
                        },
                    });

                    no_roll.value = "";
                    no_indeks.value = "";
                    kode_barang.value = "";
                    meter_bruto.value = "";
                    qty.value = "";
                    qty_sekunder.value = "";
                    nama_type.value = "";
                    afalanInput.value = 0;

                    lblSekunder.innerText = "";
                    lblTritier.innerText = "";
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });

    } catch (error) {
        console.error(error);
    }
});

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
