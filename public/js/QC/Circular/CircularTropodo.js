// Button
var dateForm = document.getElementById('dateForm');

// realita dan atasnya
var mesin = document.getElementById('mesin');
var ukuran = document.getElementById('ukuran');
var waftRajutan = document.getElementById('waftRajutan');
var weftRajutan = document.getElementById('weftRajutan');
var waftBenang = document.getElementById('waftBenang');
var weftBenang = document.getElementById('weftBenang');
var waftDenier = document.getElementById('waftDenier');
var weftDenier = document.getElementById('weftDenier');
var idLog = document.getElementById('idLog');
var ukuranLebar = document.getElementById('ukuranLebar');
var panjangPotongan = document.getElementById('panjangPotongan');
var beratBarang = document.getElementById('beratBarang');
var beratReinforced = document.getElementById('beratReinforced');

// Actual (ST)
var actualStWarp = document.getElementById('actualStWarp');
var actualElgWarp = document.getElementById('actualElgWarp');
var actualStWeft = document.getElementById('actualStWeft');
var actualElgWeft = document.getElementById('actualElgWeft');
var actualStReinf = document.getElementById('actualStReinf');
var actualElgReinf = document.getElementById('actualElgReinf');

// standart
var standartStWarp = document.getElementById('standartStWarp');
var standartElgWarp = document.getElementById('standartElgWarp');
var standartStWeft = document.getElementById('standartElgWarp');
var standartElgWeft = document.getElementById('standartElgWeft');

standartElgWarp.value = '25-30';
standartElgWeft.value = '25-30';

// Today's date
document.addEventListener('DOMContentLoaded', function () {
    var dateNow = document.getElementById('tanggal');
    var today = new Date().toISOString().slice(0, 10);
    dateNow.value = today;
});


// submit untuk tanggal
$(document).ready(function() {
    var table = $('#tableDataByDate').DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: 'CircularTropodo/getDataFromDate',
            data: function(d) {
                d.TglLog = $('#tanggal').val();
            },
            dataType: 'json',
            type: 'GET'
        },
        columns: [
            { data: 'Nama_Mesin' },
            { data: 'Shift' },
            { data: 'Id_Log' },
            { data: 'NAMA_BRG' },
        ],
        order: [[0, 'asc']]
    });

    $('#dateForm').on('submit', function(event) {
        event.preventDefault();
        table.ajax.reload();
    });

    $("#tableDataByDate tbody").on("click", "tr", async function () {
        panjangPotongan.value = 100;
        var lebar = 0;
        var dtek9 = 0;

        var selectedRow = table.row(this).data();
        var IdLog = selectedRow.Id_Log;
        console.log("Selected Id_Log:", IdLog);

        idLog.value = IdLog;

        try {
            const response = await $.ajax({
                url: "CircularTropodo/showDetailByLog",
                type: "GET",
                data: { IdLog: IdLog },
            });

            if (response.length > 0) {
                // idlog.value = response[0].idLog.trim();
                mesin.value = response[0].mesin.trim(); // item number
                ukuran.value = response[0].ukuran.trim(); // ukuran
                waftRajutan.value = response[0].waftRajutan.trim(); // waftRajutan
                weftRajutan.value = response[0].weftRajutan.trim(); // weftRajutan
                waftBenang.value = response[0].waftBenang.trim(); // waftBenang
                weftBenang.value = response[0].weftBenang.trim(); // weftBenang
                waftDenier.value = response[0].waftDenier.trim(); // waftDenier
                weftDenier.value = response[0].weftDenier.trim(); // weftDenier
                // ukuranLebar.value = response[0].ukuranLebar.trim(); // ukuranLebar
            } else {
                console.error("No data found for the specified IdLog:", IdLog);
            }
        } catch (error) {
            console.error("Error fetching data detail:", error);
        }

        table.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");
    });
});
