var tgl = document.getElementById('tgl');
var filterDropdown = document.getElementById('filterDropdown');
var powerDropdown = document.getElementById('powerDropdown');
var tglCL1 = document.getElementById('tglCL1');
var tglCL2 = document.getElementById('tglCL2');
var tglCL3 = document.getElementById('tglCL3');
var tglCL4 = document.getElementById('tglCL4');
var selected;
var printPdf = document.getElementById('printPdf');
var title = document.getElementById('title');


let index = 0;
let totalPower = 0;
let currentFilter = '1h'; // Default waktu
let selected = 'total4CL'; // Default CL
let charts = {};
let aggregatedData = {};
let formattedDate;
let lastDateTime = null;
let realPower, dataDate, latestData, newDateTime;

document.addEventListener('DOMContentLoaded', function () {
    fetchTotalPowerData(currentFilter, selected);
});

$(document).ready(function () {
    fetchKwhData1();
    fetchKwhData2();
    fetchKwhData3();
    setInterval(fetchKwhData1, 20000); // cek setiap 20 detik
    setInterval(fetchKwhData2, 20000);
    setInterval(fetchKwhData3, 20000);

    filterDropdown.addEventListener('change', function () {
        const filterType = $(this).val();
        handleFilterChange(filterType);
    });

    setInterval(() => {
        const currentFilter = filterDropdown.value;
        fetchTotalPowerData(currentFilter, selected);
    }, 600000); // cek setiap 10 menit
});

function formatDate(date) {
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

// fungsi ambil data CL1,2,3
function fetchKwhData1() {
    $.ajax({
        url: 'MonitorListrik/getCL1',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.length > 0) {
                latestData = response[0];
                newDateTime = latestData.Date_Time;

                if (lastDateTime !== newDateTime) {
                    lastDateTime = newDateTime;

                    realPower = parseFloat(latestData.Real_Power) || 0;
                    updateChart('dataChart1', realPower);

                    tglCL1.textContent = `Tanggal: ${newDateTime}`;
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}
function fetchKwhData2() {
    $.ajax({
        url: 'MonitorListrik/getCL2',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.length > 0) {
                latestData = response[0];
                newDateTime = latestData.Date_Time;

                if (lastDateTime !== newDateTime) {
                    lastDateTime = newDateTime;

                    realPower = parseFloat(latestData.Real_Power) || 0;
                    updateChart('dataChart2', realPower);

                    tglCL2.textContent = `Tanggal: ${newDateTime}`;
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}
function fetchKwhData3() {
    $.ajax({
        url: 'MonitorListrik/getCL3',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.length > 0) {
                latestData = response[0];
                newDateTime = latestData.Date_Time;

                if (lastDateTime !== newDateTime) {
                    lastDateTime = newDateTime;

                    realPower = parseFloat(latestData.Real_Power) || 0;
                    updateChart('dataChart3', realPower);

                    tglCL3.textContent = `Tanggal: ${newDateTime}`;
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

// fungsi update chart daya CL
function updateChart(chartId, dataValue) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let numericValue = parseFloat(dataValue) || 0;
    let maxRemainingValue = 150;
    let remainingValue = Math.max(maxRemainingValue - numericValue, 0);

    if (charts[chartId]) charts[chartId].destroy();

    charts[chartId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Remaining'],
            datasets: [{
                data: [numericValue, remainingValue],
                backgroundColor: ['lime', 'rgba(200, 200, 200, 0.5)'],
                borderWidth: 0
            }]
        },
        options: {
            aspectRatio: 2,
            circumference: 180,
            rotation: -90,
            cutout: '70%',
            animation: { duration: 0 },
            plugins: {
                title: {
                    display: true,
                    text: numericValue.toFixed(2) + ' kWh',
                    font: { size: 20 },
                    color: 'black'
                },
                legend: { display: false }
            }
        }
    });
}

// dropdown CL
powerDropdown.addEventListener('change', function () {
    selected = $(this).val();
    console.log(selected);

    if (selected == 'total4CL') {
        title.value = 'TOTAL POWER CL1-CL4';
    } else if (selected == 'CL1') {
        title.value = 'TOTAL POWER CL1';
    } else if (selected == 'CL2') {
        title.value = 'TOTAL POWER CL2';
    } else if (selected == 'CL3') {
        title.value = 'TOTAL POWER CL3';
    } else if (selected == 'CL4') {
        title.value = 'TOTAL POWER CL4';
    }

    fetchTotalPowerData(currentFilter, selected);
});

// fungsi ambil total daya CL
function fetchTotalPowerData(filter = '1h', selected) {
    $.ajax({
        url: 'MonitorListrik/getTotalCL',
        type: 'GET',
        data: { jenis: selected },
        dataType: 'json',
        success: function (response) {
            console.log(response);

            handleFilterChange(filter);

            let filteredData = [];

            // Konversi dan filter data sesuai rentang waktu
            let now = new Date(response[0].Date_Time);
            let threshold = new Date(now);

            switch (filter) {
                case '1h':
                    threshold.setDate(threshold.getDate() - 3);
                    break;
                case 'day':
                    threshold.setDate(threshold.getDate() - 7);
                    break;
                case 'month':
                    threshold.setMonth(threshold.getMonth() - 3);
                    break;
                case 'year':
                    threshold.setFullYear(threshold.getFullYear() - 2);
                    break;
            }

            for (let item of response) {
                let date = new Date(item.Date_Time);
                if (date >= threshold) {
                    filteredData.push({
                        date: date,
                        value: item.Real_Power
                    });
                } else {
                    break; // karena sudah urut desc, setelah lewat threshold bisa berhenti
                }
            }

            // Agregasi data berdasarkan filter
            let aggregated = {};
            let tempGroups = {};

            filteredData.forEach(({ date, value }) => {
                let key = getAggregationKey(date, filter);
                if (!tempGroups[key]) tempGroups[key] = [];
                tempGroups[key].push(value);
            });

            for (let key in tempGroups) {
                let avg = tempGroups[key].reduce((a, b) => a + b, 0) / tempGroups[key].length;
                aggregated[key] = avg;
            }

            // Urutkan berdasarkan key timestamp ASC
            let sortedAggregated = Object.fromEntries(
                Object.entries(aggregated).sort(([a], [b]) => new Date(a) - new Date(b))
            );

            updateLineChart(sortedAggregated, "Total Power", filter);
        }
    });
}

function getAggregationKey(date, filter) {
    switch (filter) {
        case '1h':
            return date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, '0') +
                   '-' + date.getDate().toString().padStart(2, '0') + ' ' +
                   date.getHours().toString().padStart(2, '0') + ":00";
        case 'day':
            return date.toISOString().slice(0, 10); // YYYY-MM-DD
        case 'month':
            return date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, '0');
        case 'year':
            return date.getFullYear().toString();
        default:
            return date.toISOString();
    }
}


let lineChartData = {
    labels: [],
    datasets: [{
        label: "Total Power (kWh)",
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderWidth: 2,
        fill: true
    }]
};

function updateLineChart(aggregatedData, label = "Total Power (kWh)", filter = '1h') {
    if (!charts['dataChart5']) {
        const ctx = document.getElementById('dataChart5').getContext('2d');
        charts['dataChart5'] = new Chart(ctx, {
            type: 'line',
            data: lineChartData,
            options: {
                responsive: true,
                animation: { duration: 0 },
                scales: {
                    x: { title: { display: true, text: "Date" } },
                    y: { title: { display: true, text: "Total kWh" }, beginAtZero: true }
                }
            }
        });
    }

    let timestamps = Object.keys(aggregatedData);
    let powerValues = Object.values(aggregatedData);
    let avgLine = calculateAverageLine(powerValues); // <-- pakai average biasa

    lineChartData.labels = timestamps;
    lineChartData.datasets = [
        {
            label: label,
            data: powerValues,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
            fill: true
        },
        {
            label: "Average",
            data: avgLine,
            borderColor: "red",
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false
        }
    ];

    charts['dataChart5'].update();
}

function handleFilterChange(filterType) {
    const filteredData = filterByTimeRange(cl1Data, filterType);
    const aggregatedData = {};

    filteredData.forEach(item => {
        const key = getAggregationKey(new Date(item.Date_Time), filterType);
        if (!aggregatedData[key]) aggregatedData[key] = [];
        aggregatedData[key].push(item.Real_Power);
    });

    // Ambil rata-rata per grup waktu
    for (const key in aggregatedData) {
        const arr = aggregatedData[key];
        aggregatedData[key] = arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    updateLineChart(aggregatedData, `Total Power (${filterType})`, filterType);
}

// set max time unk filter
function filterByTimeRange(data, filter) {
    const now = new Date();
    let cutoff;

    switch (filter) {
        case '1h':
            cutoff = new Date(now);
            cutoff.setDate(now.getDate() - 3);
            break;
        case 'day':
            cutoff = new Date(now);
            cutoff.setDate(now.getDate() - 7);
            break;
        case 'month':
            cutoff = new Date(now);
            cutoff.setMonth(now.getMonth() - 3);
            break;
        case 'year':
            cutoff = new Date(now);
            cutoff.setFullYear(now.getFullYear() - 2);
            break;
        default:
            return data;
    }

    return data.filter(item => new Date(item.Date_Time) >= cutoff).sort((a, b) =>
        new Date(a.Date_Time) - new Date(b.Date_Time) // sort ascending
    );
}


//Function to calculate the moving average for the selected filter.
function calculateAverageLine(powerValues) {
    if (powerValues.length === 0) return [];

    let sum = powerValues.reduce((a, b) => a + b, 0);
    let avg = sum / powerValues.length;

    return new Array(powerValues.length).fill(avg);
}

printPdf.addEventListener('click', function () {
    let canvas = document.getElementById('dataChart5');

    let win = window.open('', '_blank');
    win.document.write('<html><head><title>Print Chart</title></head><body>');
    win.document.write('<h3 style="text-align:center;">Power Chart</h3>');
    win.document.write('<img src="' + canvas.toDataURL() + '" style="width:100%;"/>');
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
});
