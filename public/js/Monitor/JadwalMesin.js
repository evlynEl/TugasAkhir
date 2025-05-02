document.addEventListener("DOMContentLoaded", function() {

    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var fileInput = document.getElementById("fileUpload");
    var fileNameDisplay = document.getElementById("fileName");
    var btn_proses = document.getElementById("btn_proses");
    var btn_fileUpload = document.getElementById("btn_fileUpload");
    var btn_ok = document.getElementById("btn_ok");
    var dataUpload;

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

    // Ketika tombol Proses diklik preproses dijalankan
    btn_proses.addEventListener("click", function() {
        var file = fileInput.files[0];

        if (!file) {
            alert("Pilih file terlebih dahulu!");
            return;
        }

        Swal.fire({
            title: 'Loading...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

        var formData = new FormData();
        formData.append("file", file);

        $.ajax({
            url: "http://127.0.0.1:5000/process",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // console.log("Response from Flask:", response);
                // alert("Proses berhasil!");

                dataUpload = response.data;

                if (response && Array.isArray(dataUpload)) {
                    let completed = 0;

                    dataUpload.forEach(function(item, index) {
                        $.ajax({
                            type: 'GET',
                            url: 'JadwalMesin/getCocok',
                            data: {
                                _token: csrfToken,
                                Lebar: item.Lebar,
                                RjtWA: item.RjtWA,
                                Denier: item.Denier,
                                Corak: item.Corak
                            },
                            success: function(result) {
                                // console.log(result);

                                if (result && result.NoOrder) {
                                    dataUpload[index].NoOrder = result.NoOrder;
                                }
                                completed++;

                                if (completed === dataUpload.length) {
                                    updateDataTable(dataUpload);
                                    fileInput.value = '';
                                    fileNameDisplay.textContent = '';
                                }
                                btn_ok.focus();
                            },
                            error: function(xhr, status, error) {
                                console.error('Error:', error);
                                completed++;

                                if (completed === dataUpload.length) {
                                    updateDataTable(dataUpload);
                                    fileInput.value = '';
                                    fileNameDisplay.textContent = '';
                                }
                            }
                        });
                    });

                } else {
                    alert("Data kosong atau format salah.");
                }

                fileInput.value = '';
                fileNameDisplay.textContent= '';
            },
            error: function(xhr, status, error) {
                Swal.close();
                console.error("Error:", error);
                alert("Gagal memproses file.");
            }
        });
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
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null || currentIndex >= rowCount - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null || currentIndex <= 0) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex--;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        }
        else if (e.key === "ArrowRight") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table.page('next').draw('page').on('draw', function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass("selected");
                    scrollRowIntoView(selectedRow[0]);
                });
            }
        }
        else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table.page('previous').draw('page').on('draw', function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass("selected");
                    scrollRowIntoView(selectedRow[0]);
                });
            }
        }
    }

    // Helper function to scroll selected row into view
    function scrollRowIntoView(rowElement) {
        rowElement.scrollIntoView({ block: 'nearest' });
    }

    // muncul swal fire unk user pilih no order
    $('#tableData tbody').on('dblclick', 'td', function () {
        var table = $('#tableData').DataTable();
        const cellIndex = table.cell(this).index();
        const colIndex = cellIndex.column;
        const rowIndex = cellIndex.row;
        const headerText = table.column(colIndex).header().textContent;

        if (headerText === 'NoOrder') {
            console.log("Double click detected on NoOrder");
            const data = table.row(rowIndex).data();

            try {
                Swal.fire({
                    title: 'No Order',
                    html: `
                        <table id="table_list" class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No Order</th>
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
                    width: '55%',
                    returnFocus: false,
                    showCloseButton: true,
                    showConfirmButton: true,
                    confirmButtonText: 'Select',
                    didOpen: () => {
                        const tablePopup = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: '400px',
                            scrollCollapse: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "JadwalMesin/getNoorder",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken
                                }
                            },
                            columns: [
                                { data: "D_TEK0" },
                                { data: "NAMA_BRG" },
                            ],
                            columnDefs: [
                                { targets: 0, width: '100px' },
                                { targets: 1, className: 'text-start' }
                            ]
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            tablePopup.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });

                        const searchInput = $('#table_list_filter input');
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }
                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Update data di DataTable
                        data[0] = result.value.D_TEK0; // NoOrder assumed di kolom pertama
                        table.row(rowIndex).data(data).draw(false); // update baris
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
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
                { title: 'TglMulai' },
                { title: 'Mesin' },
                { title: 'PnjPotong' },
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
            scrollY: '250px',
            autoWidth: false,
            scrollX: '100%',
            columnDefs: [{ targets: [0], width: '8%', className: 'fixed-width'},
            { targets: [1], width: '5%', className: 'fixed-width' },
            { targets: [2], width: '5%', className: 'fixed-width' },
            { targets: [3], width: '5%', className: 'fixed-width' },
            { targets: [4], width: '5%', className: 'fixed-width' },
            { targets: [5], width: '12%', className: 'fixed-width' },
            { targets: [6], width: '5%', className: 'fixed-width' },
            { targets: [7], width: '5%', className: 'fixed-width' },
            { targets: [8], width: '10%', className: 'fixed-width' },
            { targets: [9], width: '10%', className: 'fixed-width' },
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
                formatNumber(item.Lebar),
                formatNumber(item.RjtWA),
                formatNumber(item.RjtWE),
                escapeHtml(item.Denier),
                escapeHtml(item.Corak),
                escapeHtml(item.BngWA),
                escapeHtml(item.BngWE),
                escapeHtml(item.Jumlah),
                formatDate(item.TglMulai),
                escapeHtml(item.Mesin),
                formatNumber(item.PnjPotong),
                escapeHtml(item.Keterangan),
            ]);
        });

        Swal.close();
        table.draw();
        btn_ok.focus();
    }

    function formatNumber(value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value).toFixed(2);
        }
        return value;
    }


    // button unk menghasilkan jadwal
    btn_ok.addEventListener("click", function() {
        Swal.fire({
            text: 'Apakah Anda ingin memproses data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Loading...',
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    }
                  });

                // Ambil semua data dari DataTable
                var allData = $('#tableData').DataTable().rows().data().toArray();

                // Ambil header dari DataTable
                var header = [];
                $('#tableData thead th').each(function () {
                    header.push($(this).text().trim());
                });

                // Ubah array menjadi array of object
                var formattedData = allData.map(function(row) {
                    var obj = {};
                    for (var i = 0; i < header.length; i++) {
                        obj[header[i]] = row[i];
                    }
                    return obj;
                });

                // console.log(formattedData);

                // Kirim ke Flask
                $.ajax({
                    url: "http://127.0.0.1:5000/model",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({ data: formattedData }),
                    success: function(response) {

                        const result = response.result;

                        // Urutkan berdasarkan Hari, Order, dan Jam Mulai
                        result.sort((a, b) => {
                            if (a["Hari"] !== b["Hari"]) {
                                return a["Hari"] - b["Hari"];
                            }
                            if (a["Order"] !== b["Order"]) {
                                return a["Order"].localeCompare(b["Order"]);
                            }
                            return a["Jam Mulai"].localeCompare(b["Jam Mulai"]);
                        });

                        // console.table(result);

                        Swal.close();
                        Swal.fire('Berhasil!', 'Jadwal sudah jadi', 'success');

                        // Fungsi untuk mengonversi waktu ke menit sejak 07:00
                        function timeToMinutes(timeStr) {
                            const [hours, minutes] = timeStr.split(":").map(Number);
                            return (hours - 7) * 60 + minutes;
                        }

                        // Kelompokkan data berdasarkan Hari
                        const groupedByDay = {};
                        result.forEach(item => {
                            if (!groupedByDay[item.Hari]) groupedByDay[item.Hari] = [];
                            groupedByDay[item.Hari].push(item);
                        });

                        // Menentukan jumlah hari yang unik
                        const days = Object.keys(groupedByDay);

                        // Buat div untuk setiap hari, jika belum ada
                        days.forEach(day => {
                            // Pastikan ada elemen div di HTML untuk setiap hari
                            const chartContainerId = `gantt-chart-hari-${day}`;
                            if (!document.getElementById(chartContainerId)) {
                                const div = document.createElement('div');
                                div.id = chartContainerId;
                                div.style.marginBottom = '20px'; // Jarak antar chart
                                document.getElementById('charts-container').appendChild(div); // Asumsi container utama adalah 'charts-container'
                            }

                            const dayData = groupedByDay[day];
                            const y = [];
                            const x = [];
                            const base = [];
                            const text = [];

                            dayData.forEach(item => {
                                y.push(`${item.Order} (${item.Mesin})`);
                                const start = timeToMinutes(item["Jam Mulai"]);
                                const end = timeToMinutes(item["Jam Selesai"]);
                                x.push(end - start);
                                base.push(start);
                                text.push(`${item["Jam Mulai"]} - ${item["Jam Selesai"]}`);
                            });

                            // Buat trace untuk setiap hari
                            const trace = {
                                type: 'bar',
                                x: x,
                                y: y,
                                base: base,
                                orientation: 'h',
                                name: `Hari ${day}`,
                                text: text,
                                hoverinfo: 'text',
                                marker: {
                                    color: 'rgba(50, 171, 96, 0.6)',
                                    line: {
                                        color: 'rgba(50, 171, 96, 1.0)',
                                        width: 1
                                    }
                                },
                                showlegend: true,
                                legendgroup: `Hari ${day}`,  // Mengelompokkan legend berdasarkan hari
                            };

                            // Layout chart
                            const layout = {
                                title: `Gantt Chart Hari ${day}`,
                                barmode: 'stack',
                                xaxis: {
                                    title: 'Jam',
                                    range: [0, (23 - 7 + 1) * 60], // dari 07:00 hingga 23:59
                                    tickvals: Array.from({ length: 17 }, (_, i) => i * 60),
                                    ticktext: Array.from({ length: 17 }, (_, i) => `${String(i + 7).padStart(2, '0')}:00`)
                                },
                                yaxis: {
                                    automargin: true
                                },
                                height: 400, // Sesuaikan tinggi chart
                                showlegend: true
                            };

                            // Render Gantt chart untuk setiap Hari
                            Plotly.newPlot(`gantt-chart-hari-${day}`, [trace], layout);
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error("Error:", error);
                        Swal.fire('Gagal', 'Ada kesalahan saat mengirim data.', 'error');
                    }
                });

            }
        });

    });

})
