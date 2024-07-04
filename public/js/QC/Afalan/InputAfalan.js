btn_noRoll = document.getElementById('btn_noRoll');
no_roll = document.getElementById("no_roll");
nama_type = document.getElementById("nama_type");
no_indeks = document.getElementById("item_number");
kode_barang = document.getElementById("kode_barang");
meter_bruto = document.getElementById("meter_bruto");
qty_sekunder = document.getElementById("meter_netto");
qty = document.getElementById("kg");

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
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRow = result.value;
                no_roll.value = selectedRow.NoRoll.trim();
                $.ajax({
                    url: "InputAfalanQC/getDataDetailNoRoll",
                    type: "GET",
                    data: { noRoll: no_roll.value },
                    success: function (result) {
                        console.log(result);
                        nama_type.value = result[0].NamaType.trim();
                        no_indeks.value = result[0].NoIndeks.trim();
                        kode_barang.value = result[0].Kode_Barang.trim();
                        meter_bruto.value = result[0].MeterBruto.trim();
                        qty_sekunder.value = result[0].Qty_Sekunder.trim();
                        qty.value = result[0].Qty.trim();

                    }
                });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});