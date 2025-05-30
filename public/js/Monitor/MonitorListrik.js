var tgl = document.getElementById('tgl');
var filterDropdown = document.getElementById('filterDropdown');
var powerDropdown = document.getElementById('powerDropdown');
var tglCL1 = document.getElementById('tglCL1');
var tglCL2 = document.getElementById('tglCL2');
var tglCL3 = document.getElementById('tglCL3');
var tglCL4 = document.getElementById('tglCL4');
var selected = 'total4CL'; // Default CL
var printPdf = document.getElementById('printPdf');
var title = document.getElementById('title');


let index = 0;
let totalPower = 0;
// let currentFilter = '1h'; // Default waktu
let charts = {};
let aggregatedData = {};
let formattedDate;
let lastDateTime = null;
let realPower, dataDate, latestData, newDateTime;

document.addEventListener('DOMContentLoaded', function () {
    if (filterDropdown) {
        filterDropdown.value = '1h';
        title.textContent = 'TOTAL POWER CL1-CL4';
        fetchTotalPowerData(filterDropdown.value, selected); // panggil data awal
    }
});

$(document).ready(function () {
    fetchKwhData1();
    fetchKwhData2();
    fetchKwhData3();
    setInterval(fetchKwhData1, 10000); // cek setiap 10 detik
    setInterval(fetchKwhData2, 10000);
    setInterval(fetchKwhData3, 10000);
});

filterDropdown.addEventListener('change', function () {
    const filterType = $(this).val();
    handleFilterChange(filterType);
    // fetchTotalPowerData(currentFilter, selected);
});

setInterval(() => {
    const currentFilter = filterDropdown.value;
    fetchTotalPowerData(currentFilter, selected);
}, 600000); // cek setiap 10 menit

// dropdown CL
powerDropdown.addEventListener('change', function () {
    selected = $(this).val();
    console.log(selected);

    const currentFilter = filterDropdown.value;
    console.log(currentFilter);


    if (selected == 'total4CL') {
        title.textContent = 'TOTAL POWER CL1-CL4';
    } else if (selected == 'CL1') {
        title.textContent = 'TOTAL POWER CL1';
    } else if (selected == 'CL2') {
        title.textContent = 'TOTAL POWER CL2';
    } else if (selected == 'CL3') {
        title.textContent = 'TOTAL POWER CL3';
    } else if (selected == 'CL4') {
        title.textContent = 'TOTAL POWER CL4';
    }

    fetchTotalPowerData(currentFilter, selected);
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


let clData = [];

// fungsi ambil total daya CL
function fetchTotalPowerData(filter, selected) {
    $.ajax({
        url: 'MonitorListrik/getTotalCL',
        type: 'GET',
        data: { jenis: selected },
        dataType: 'json',
        success: function (response) {
            if (!response || response.length === 0) return;

            clData = response;

            response.sort((a, b) => new Date(b.Date_Time.replace(' ', 'T')) - new Date(a.Date_Time.replace(' ', 'T')));

            let now = new Date(response[0].Date_Time.replace(' ', 'T'));
            let threshold = new Date(now);

            switch (filter) {
                case '1h':
                    threshold.setDate(threshold.getDate() - 3);
                    break;
            }

            // Step 1: Filter data by threshold
            let filteredData = response.filter(item => {
                let date = new Date(item.Date_Time.replace(' ', 'T'));
                return date >= threshold;
            });

            // Step 2: Aggregate if needed
            let aggregated = {};
            let tempGroups = {};

            filteredData.forEach(({ Date_Time, Real_Power }) => {
                let date = new Date(Date_Time);
                let key = getAggregationKey(date, filter);

                if (!tempGroups[key]) tempGroups[key] = [];
                tempGroups[key].push(Real_Power);
            });

            for (let key in tempGroups) {
                let avg = tempGroups[key].reduce((a, b) => a + b, 0) / tempGroups[key].length;
                aggregated[key] = avg;
            }

            // Step 3: Sort ascending
            let sortedAggregated = Object.fromEntries(
                Object.entries(aggregated).sort(([a], [b]) => new Date(a) - new Date(b))
            );

            // Step 4: Update chart
            updateLineChart(sortedAggregated, "Total Power", filter);
        }
    });
}


function pad2(n) {
    return n < 10 ? '0' + n : n;
}

function getAggregationKey(date, filter) {
    const d = new Date(date);
    let year = d.getFullYear();
    let month = pad2(d.getMonth() + 1);
    let day = pad2(d.getDate());
    let hour = pad2(d.getHours());

    switch (filter) {
        case '1h':
            return `${year}-${month}-${day} ${hour}:00`;
        case 'day':
            return `${year}-${month}-${day}`;
        case 'month':
            return `${year}-${month}-01`;
        case 'year':
            return `${year}-01-01`;
        default:
            return `${year}-${month}-${day} ${hour}:${pad2(d.getMinutes())}`;
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
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                animation: { duration: 0 },
                parsing: false,
                scales: {
                    x: { title: { display: true, text: "Date" } },
                    y: { title: { display: true, text: "Total kWh" }, beginAtZero: true }
                }
            }
        });
    }

    let timestamps = Object.keys(aggregatedData);
    let powerValues = Object.values(aggregatedData);
    let avgLine = calculateAverageLine(powerValues);

    charts['dataChart5'].data.labels = timestamps;
    charts['dataChart5'].data.datasets = [
        {
            label: label,
            data: timestamps.map((time, idx) => ({ x: time, y: powerValues[idx] })),
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.1
        },
        {
            label: "Average",
            data: timestamps.map((time, idx) => ({ x: time, y: avgLine[idx] })),
            borderColor: "red",
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            tension: 0.1
        }
    ];

    charts['dataChart5'].update();
}

function handleFilterChange(filterType) {
    const filteredData = filterByTimeRange(clData, filterType);
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
            cutoff.setDate(now.getDate() - 6);
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

    return data
        .filter(item => new Date(item.Date_Time) >= cutoff)
        .sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));
}


//Function to calculate the moving average for the selected filter.
function calculateAverageLine(powerValues) {
    if (powerValues.length === 0) return [];

    let sum = powerValues.reduce((a, b) => a + b, 0);
    let avg = sum / powerValues.length;

    return new Array(powerValues.length).fill(avg);
}

printPdf.addEventListener('click', function () {
    window.print();
});




