document.addEventListener("DOMContentLoaded", function() {

    // var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var fileInput = document.getElementById("fileUpload");
    var fileNameDisplay = document.getElementById("fileName");
    var btn_proses = document.getElementById("btn_proses");
    var btn_fileUpload = document.getElementById("btn_fileUpload");

    btn_fileUpload.focus();

    // Tampilkan nama file yang dipilih
    fileInput.addEventListener("change", function() {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
            btn_proses.focus();
        }
    });

    // Cegah file untuk dibuka di browser ketika di-drop
    dropArea.addEventListener("dragover", function(event) {
        event.preventDefault();
        dropArea.classList.add("dragging");  // Menambahkan efek visual (optional)
    });

    dropArea.addEventListener("dragleave", function() {
        dropArea.classList.remove("dragging");
    });

    // Tangani event drop file
    dropArea.addEventListener("drop", function(event) {
        event.preventDefault();
        dropArea.classList.remove("dragging");

        // Ambil file yang di-drop
        var files = event.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            fileNameDisplay.textContent = files[0].name;
        }
    });

    // Ketika tombol Proses diklik
    btn_proses.addEventListener("click", function() {
        var file = fileInput.files[0];

        if (!file) {
            alert("Pilih file terlebih dahulu!");
            return;
        }

        var formData = new FormData();
        formData.append("file", file);

        $.ajax({
            url: "http://127.0.0.1:5000/process",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log("Response from Flask:", response);
                // alert("Proses berhasil!");
                if (response && Array.isArray(response.data)) {
                    updateDataTable(response.data);
                } else {
                    alert("Data kosong atau format salah.");
                }
                updateDataTable(response);

                fileInput.value = '';
                fileNameDisplay.textContent= '';
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
                alert("Gagal memproses file.");
            }
        });
    });

    function formatDate(dateString) {
        if (!dateString) return '';

        const date = new Date(dateString);
        if (isNaN(date)) return '';

        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() hasilnya 0-11
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }



    $(document).ready(function () {
        $('#tableData').DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: false,
            columns: [
                { title: 'NoOrder' },
                { title: 'Lebar' },
                { title: 'RjtWA' },
                { title: 'RjtWE' },
                { title: 'Denier' },
                { title: 'Corak' },
                { title: 'BngWA' },
                { title: 'BngWE' },
                { title: 'Jumlah' },
                { title: 'Tgl Mulai' },
                { title: 'Mesin' },
                { title: 'PnjPot' },
                { title: 'Keterangan' },
            ],
            colResize: {
                isEnabled: true,
                hoverClass: 'dt-colresizable-hover',
                hasBoundCheck: true,
                minBoundClass: 'dt-colresizable-bound-min',
                maxBoundClass: 'dt-colresizable-bound-max',
                saveState: true,
                // isResizable: function (column) {
                //     return column.idx !== 2;
                // },
                onResize: function (column) {
                    //console.log('...resizing...');
                },
                onResizeEnd: function (column, columns) {
                    // console.log('I have been resized!');
                },
                stateSaveCallback: function (settings, data) {
                    let stateStorageName = window.location.pathname + "/colResizeStateData";
                    localStorage.setItem(stateStorageName, JSON.stringify(data));
                },
                stateLoadCallback: function (settings) {
                    let stateStorageName = window.location.pathname + "/colResizeStateData",
                        data = localStorage.getItem(stateStorageName);
                    return data != null ? JSON.parse(data) : null;
                }
            },
            scrollY: '200px',
            autoWidth: false,
            scrollX: '100%',
            columnDefs: [{ targets: [0], width: '5%', className: 'fixed-width'},
            { targets: [1], width: '3%', className: 'fixed-width' },
            { targets: [2], width: '5%', className: 'fixed-width' },
            { targets: [3], width: '5%', className: 'fixed-width' },
            { targets: [4], width: '5%', className: 'fixed-width' },
            { targets: [5], width: '12%', className: 'fixed-width' },
            { targets: [6], width: '5%', className: 'fixed-width' },
            { targets: [7], width: '5%', className: 'fixed-width' },
            { targets: [8], width: '12%', className: 'fixed-width' },
            { targets: [9], width: '12%', className: 'fixed-width' },
            { targets: [10], width: '10%', className: 'fixed-width' },
            { targets: [11], width: '10%', className: 'fixed-width' },
            { targets: [12], width: '10%', className: 'fixed-width' },]
        });
    });

    function decodeHtmlEntities(text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    function escapeHtml(text) {
        if (text === null || text === undefined) return '';
        text = text.toString(); // pastikan string
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    }


    function updateDataTable(data) {
        var table = $('#tableData').DataTable();
        table.clear();

        data.forEach(function (item) {
            table.row.add([
                escapeHtml(item.NoOrder),
                escapeHtml(item.Lebar),
                escapeHtml(item.RjtWA),
                escapeHtml(item.RjtWE),
                escapeHtml(item.Denier),
                formatNumber(item.Corak),
                formatNumber(item.BngWA),
                formatNumber(item.BngWE),
                formatNumber(item.Jumlah),
                formatDate(item.TglMulai),
                formatNumber(item.Mesin),
                formatNumber(item.PnjPotong),
                formatNumber(item.Keterangan),
            ]);
        });

        table.draw();
    }

    function formatNumber(value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value).toFixed(2);
        }
        return value;
    }
})
