$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'NoTrans' },
            { title: 'Nama Type' },
        ]
    });
});