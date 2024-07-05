var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

//button
btn_lihat = document.getElementById('btn_lihat');
btn_proses = document.getElementById('btn_proses');


btn_lihat.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Master Part Section',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Part Section</th>
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
                            url: "FrmMasterPart/GetData",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id" },
                            { data: "PartSection" }
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
                selectPart(result.value.Id, result.value.PartSection);
            }
        });
    } catch (error) {
        console.error(error);
    }
});


function selectPart(Id, PartSection) {
    document.getElementById("id").value = Id;
    document.getElementById("part").value = PartSection;
    Swal.close();
}


btn_proses.addEventListener("click", function (e) {
    try {
        var part = document.getElementById("part").value.trim();
        var id = document.getElementById("id").value.trim();

        if (id !== '' && part !== '') {
            var btnProses = document.getElementById("btn_proses");
            btnProses.disabled = true;
            btnProses.classList.add('btn-disabled');
        } else if (part === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Data is not complete',
                text: 'Please fill Part Section or choose Part Section.',
            });
        } else {
            $.ajax({
                type: 'POST',
                url: 'FrmMasterPart',
                data: {
                    _token: csrfToken,
                    part: part
                },
                timeout: 30000,
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });

                        document.getElementById("part").value = '';
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

