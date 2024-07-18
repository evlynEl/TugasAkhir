var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var refNo = document.getElementById('refNo');
var customer = document.getElementById('customer');
var btn_info = document.getElementById('btn_info');

btn_info.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Input Test',
            html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">Reference No</th>
                                <th scope="col">Customer</th>
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
                // Initialize DataTable inside didOpen to ensure DOM is ready
                const table = $("#table_list").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    order: [[0, "asc"]],
                    ajax: {
                        url: "FrmACCFIBC/getRef",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [
                        { data: "Reference_No" },
                        { data: "Customer" }
                    ]
                });

                // Handle row selection
                $("#table_list tbody").on("click", "tr", function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                refNo.value = result.value.Reference_No;
                customer.value = result.value.Customer;

                $.ajax({
                    url: "FrmACCFIBC/getDetail",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        no_ref: splitRefNo
                    },
                    timeout: 30000,
                    success: function (result) {


                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});
