// Button
var dateForm = document.getElementById('dateForm');
var prosesButton = document.getElementById('prosesButton');

// realita dan atasnya
var tanggal = document.getElementById('tanggal');
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
var beratStandart = document.getElementById('beratStandart')

// Actual (ST)
var actualStWarp = document.getElementById('actualStWarp');
var actualElgWarp = document.getElementById('actualElgWarp');
var actualStWeft = document.getElementById('actualStWeft');
var actualElgWeft = document.getElementById('actualElgWeft');
var actualStReinf = document.getElementById('actualStReinf');
var actualElgReinf = document.getElementById('actualElgReinf');

// standart
var standartStWarp = document.getElementById('standartStWarp');
var standartStWeft = document.getElementById('standartStWeft');
var standartElgWarp = document.getElementById('standartElgWarp');
var standartElgWeft = document.getElementById('standartElgWeft');

// new variable
var Lebar;
var D_Tek9;
var JenisKrg;

// token
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

standartElgWarp.value = '25-30';
standartElgWeft.value = '25-30';

// All function
document.addEventListener('DOMContentLoaded', function () {
    const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly])'));
    const inputAll = Array.from(document.querySelectorAll('.card-body input[type="text"]'));
    const prosesButton = document.getElementById('prosesButton');

    // Today's date
    var dateNow = document.getElementById('tanggal');
    var today = new Date().toISOString().slice(0, 10);
    dateNow.value = today;

    // table by date datas
    const tableByDate = $('#tableDataByDate').DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: 'CircularTropodo/getDataFromDate',
            data: function (d) {
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

    // submit date
    $('#dateForm').on('submit', function (event) {
        event.preventDefault();
        tableByDate.ajax.reload();
    });

    // isi tabel data by date
    $("#tableDataByDate tbody").on("click", "tr", async function () {
        panjangPotongan.value = 100;

        ukuranLebar.value = "";
        beratBarang.value = "";
        actualStWarp.value = "";
        actualStWeft.value = "";
        actualStReinf.value = "";
        actualElgWarp.value = "";
        actualElgWeft.value = "";
        actualElgReinf.value = "";
        beratReinforced.value = 0;
        beratStandart.value = 0;
        standartStWarp.value = 0;
        standartStWeft.value = 0;

        var selectedRow = tableByDate.row(this).data();
        var IdLog = selectedRow.Id_Log;

        idLog.value = IdLog;

        try {
            const response = await $.ajax({
                url: "CircularTropodo/showDetailByLog",
                type: "GET",
                data: { IdLog: IdLog },
            });

            if (response.length > 0) {
                mesin.value = response[0].mesin.trim(); // item number
                ukuran.value = response[0].ukuran.trim(); // ukuran
                waftRajutan.value = response[0].waftRajutan.trim(); // txtwaft
                weftRajutan.value = response[0].weftRajutan.trim(); // txtweft
                waftBenang.value = response[0].waftBenang.trim(); // waftBenang
                weftBenang.value = response[0].weftBenang.trim(); // weftBenang
                waftDenier.value = response[0].waftDenier.trim(); // waftDenier
                weftDenier.value = response[0].weftDenier.trim(); // weftDenier
                standartStWarp.value = FormatNumber(4.5 * (waftRajutan.value * 2) * waftDenier.value / 1000, 2);
                standartStWeft.value = FormatNumber(4.5 * (weftRajutan.value * 2) * weftDenier.value / 1000, 2)
                Lebar = response[0].Lebar.trim();
                D_Tek9 = response[0].D_Tek9.trim();
                JenisKrg = response[0].JenisKrg.trim();
            } else {
                console.error("No data found for the specified IdLog:", IdLog);
            }
        } catch (error) {
            console.error("Error fetching data detail:", error);
        }

        tableByDate.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");
    });

    // buat keypress enter tiap input
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (input.id === 'ukuranLebar' || input.id === 'panjangPotongan' || input.id === 'beratBarang') {
                    if (input.value.trim() === '' || parseFloat(input.value.trim()) <= 0) {
                        Swal.fire({
                            title: 'Isi Data!',
                            text: `Isi ${input.previousElementSibling.innerText} dengan angka lebih dari 0 sebelum lanjut ke yang lain!`,
                            icon: 'warning',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            input.focus();
                        });
                        event.preventDefault();
                        return;
                    }
                } else if (input.value.trim() === '') {
                    input.value = '0.00';
                }

                // update berat reinforced
                if (input.id === 'panjangPotongan') {
                    updateBeratReinforced();
                }

                updateBeratStandart();

                const nextIndex = index + 1;
                if (nextIndex < inputs.length) {
                    event.preventDefault();
                    setTimeout(() => inputs[nextIndex].focus(), 0);
                } else {
                    setTimeout(() => prosesButton.focus(), 0);
                }
            }
        });
    });

    // format angka 2 desimal
    function FormatNumber(num, decimalPlaces) {
        return num.toFixed(decimalPlaces);
    }

    // update berat reinforced
    function updateBeratReinforced() {
        let totalReinforced = FormatNumber((panjangPotongan.value * Lebar * (waftRajutan.value * waftDenier.value) / (1143000 * D_Tek9)) / 2, 2);
        beratReinforced.value = totalReinforced;
    }

    // update berat reinforced tiap ganti panjang
    panjangPotongan.addEventListener('input', function () {
        updateBeratReinforced();
    });

    // update berat standart (kalau belom ada) BLOM SELESAI
    function updateBeratStandart() {
        let totalStandart = 1;
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                totalStandart *= parseFloat(input.value) || 1;
            }
        });
        beratStandart.value = totalStandart.toFixed(2);
    }

    // cek apakah semua udah terisi buat tombol proses
    function allInputsFilled() {
        for (const input of inputAll) {
            if (input.value.trim() === '') {
                Swal.fire({
                    title: 'Isi Data!',
                    text: `Isi ${input.previousElementSibling.innerText} sebelum lanjut ke yang lain!`,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                }).then(() => {
                    input.focus();
                });
                return false;
            }
        }
        return true;
    }

    // button proses ISI
    prosesButton.addEventListener('click', async () => {
        if (!allInputsFilled()) {
            return;
        }

        $.ajax({
            type: 'PUT', //update
            url: 'CircularTropodo/prosesIsiData', //update
            data: {
                _token: csrfToken,
                IdLog: idLog.value,
                Tanggal: tanggal.value,
                Ukuran: ukuranLebar.value,
                UkuranSTD: ukuran.value,
                Potongan: panjangPotongan.value,
                BeratSTD: beratStandart.value,
                Berat: beratBarang.value,
                StWarp: actualStWarp.value,
                ElgWarp: actualElgWarp.value,
                StWeft: actualStWeft.value,
                ElgWeft: actualElgWeft.value,
                StReinforced: actualStReinf.value,
                ElgReinforced: actualElgReinf.value,
                BeratReinforced: beratReinforced.value,
                StandartWA: standartStWarp.value,
                StandartWE: standartStWeft.value,
                StandartElgWA: standartElgWarp.value,
                StandartElgWE: standartElgWeft.value,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.success,
                    });

                    inputAll.forEach(input => {
                        if (input.id !== 'standartElgWarp' && input.id !== 'standartElgWeft') {
                            input.value = '';
                        }
                    });

                    tableByDate.ajax.reload(); // Refresh table data
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });

});
