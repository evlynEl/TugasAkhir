var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var id = document.getElementById("id");
var material =  document.getElementById("material");

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
            width: '40%',
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

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const materialSection = decodeHtmlEntities(result.value.Material.trim());
                id.value = result.value.Id;
                material.value = materialSection;
                btn_proses.disabled = true;
            }
        });
    } catch (error) {
        console.error(error);
    }
});

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

// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
}

// button proses
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
