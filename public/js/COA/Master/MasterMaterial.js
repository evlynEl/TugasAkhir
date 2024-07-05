var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Button Elements
var btn_lihat = document.getElementById('btn_lihat');
var btn_proses = document.getElementById('btn_proses');

btn_lihat.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Master Material Section',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Material Section</th>
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
                            url: "FrmMasterMaterial/GetData",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id" },
                            { data: "Material" }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                selectPart(result.value.Id, result.value.Material);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectPart(Id, Material) {
    document.getElementById("id").value = Id;
    document.getElementById("material").value = Material;
    Swal.close();
}

btn_proses.addEventListener("click", function (e) {
    try {
        var material = document.getElementById("material").value.trim();
        var id = document.getElementById("id").value.trim();

        if (id !== '' && material !== '') {
            var btnProses = document.getElementById("btn_proses");
            btnProses.disabled = true;
            btnProses.classList.add('btn-disabled');
        } else if (material === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Data is not complete',
                text: 'Please fill Material Section or choose Material Section.',
            });
        } else {
            $.ajax({
                type: 'POST',
                url: 'FrmMasterMaterial',
                data: {
                    _token: csrfToken,
                    material: material
                },
                timeout: 30000,
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });

                        document.getElementById("material").value = '';
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});
