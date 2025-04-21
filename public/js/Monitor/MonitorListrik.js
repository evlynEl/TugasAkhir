var tgl = document.getElementById('tgl');
var filterDropdown = document.getElementById('filterDropdown');

let index = 0;
let totalPower = 0;
let filterType = '30m'; // Default filter type
let charts = {};
let aggregatedData = {};


$(document).ready(function () {
    fetchKwhData();
    setInterval(fetchKwhData, 10000);

    // Event listener for filter selection
    filterDropdown.addEventListener('change', function () {
        filterType = $(this).val();
        index = 0;
        totalPower = 0;
        aggregatedData = {}; // Reset aggregated data
        lineChartData.labels = [];
        lineChartData.datasets[0].data = [];
        fetchKwhData();
    });
});

function fetchKwhData() {
    $.ajax({
        url: 'MonitorListrik/getKwh',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.length > 0) {

                response.sort((a, b) => new Date(a.Date) - new Date(b.Date));
                aggregatedData = {}; // Reset aggregated data

                response.forEach(data => {
                    let dataDate = new Date(data.Date);
                    let formattedDate = getAggregationKey(dataDate, filterType);
                    let power = parseFloat(data.Power) || 0;

                    // Update the date text
                    tgl.textContent = `Date & Time: ${formattedDate}`;

                    if (!aggregatedData[formattedDate]) {
                        aggregatedData[formattedDate] = 0;
                    }
                    aggregatedData[formattedDate] += power;
                });

                let latestDate = Object.keys(aggregatedData).pop();
                totalPower = aggregatedData[latestDate] || 0;

                updateChart('dataChart1', totalPower, new Date());
                updateLineChart(aggregatedData);
            } else {
                console.error('Invalid data format');
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

function getAggregationKey(date, filter) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');

    switch (filter) {
        case '30m':
            return formatDate(date);
        case '1h':
            // Shift by 1 hour forward (e.g., 12:00-12:59 is counted for 13:00)
            let nextHour = (date.getHours() + 1).toString().padStart(2, '0');
            return `${year}-${month}-${day} ${nextHour}:00`;
        case 'day':
            return `${year}-${month}-${day}`;
        case 'month':
            return `${year}-${month}`;
        case 'year':
            return `${year}`;
    }
}


function formatDate(date) {
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function updateChart(chartId, dataValue) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let numericValue = parseFloat(dataValue) || 0;
    let maxRemainingValue = 100;
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
                    text: numericValue.toFixed(2) + ' kWatt',
                    font: { size: 20 },
                    color: 'black'
                },
                legend: { display: false }
            }
        }
    });
}

let lineChartData = {
    labels: [],
    datasets: [{
        label: "Total Power (kWatt)",
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderWidth: 2,
        fill: true
    }]
};

function updateLineChart(aggregatedData) {
    if (!charts['dataChart5']) {
        const ctx = document.getElementById('dataChart5').getContext('2d');
        charts['dataChart5'] = new Chart(ctx, {
            type: 'line',
            data: lineChartData,
            options: {
                responsive: true,
                animation: { duration: 0 }, // Completely disable animation
                scales: {
                    x: { title: { display: true, text: "Date" } },
                    y: { title: { display: true, text: "Total kWatt" }, beginAtZero: true }
                }
            }
        });
    }

    let timestamps = Object.keys(aggregatedData);
    let powerValues = Object.values(aggregatedData);

     // Calculate the global average power
     let globalAveragePower = powerValues.reduce((sum, val) => sum + val, 0) / powerValues.length;

     // Create an array with the same length as timestamps, all set to the global average
     let globalAvgLine = new Array(powerValues.length).fill(globalAveragePower);

    // Update dataset with actual power and average power
    lineChartData.labels = timestamps;
    lineChartData.datasets = [
        {
            label: "Total Power (kWatt)",
            data: powerValues,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
            fill: true
        },
        {
            label: "Average Power",
            data: globalAvgLine,
            borderColor: "red",
            borderDash: [5, 5], // Dashed line for average power
            borderWidth: 2,
            fill: false
        }
    ];

    charts['dataChart5'].update();
}

//Function to calculate the moving average for the selected filter.
function calculateMovingAverage(timestamps, powerValues, filter) {
    let avgPower = [];
    let windowSize = 1; // Default: 1 (for minute-based calculations)

    switch (filter) {
        case '30m': windowSize = 2; break; // 30-minute average (every 2 data points)
        case '1h': windowSize = 4; break;  // 1-hour average (every 4 data points)
        case 'day': windowSize = 48; break; // Daily average
        case 'month': windowSize = timestamps.length; break; // Monthly (entire dataset avg)
    }

    for (let i = 0; i < powerValues.length; i++) {
        let start = Math.max(0, i - windowSize + 1);
        let subset = powerValues.slice(start, i + 1);
        let avg = subset.reduce((sum, value) => sum + value, 0) / subset.length;
        avgPower.push(avg);
    }

    return avgPower;
}



// function fetchKwhData() {
//     $.ajax({
//         url: 'MonitorListrik/getKwh',  // Endpoint to get the power data from controller
//         type: 'GET',
//         dataType: 'json',
//         success: function (response) {
//             console.log(response);

//             if (response.length > 0) {
//                 // Sort the data by Date to ensure it's in chronological order
//                 response.sort((a, b) => new Date(a.Date) - new Date(b.Date));
//                 let aggregatedData = aggregateData(response, filterType);

//                 // Get current data for this 30-minute interval
//                 let currentData = response[index];
//                 let currentDate = new Date(currentData.Date);
//                 let formattedDate = formatDate(currentDate);

//                 // Update the date text
//                 tgl.textContent = `Date & Time: ${formattedDate}`;

//                 // Get the power value for this interval (in kWh)
//                 let power = parseFloat(currentData.Power) || 0;

//                 // Update the doughnut chart with the current power value
//                 updateChart('dataChart1', power, currentDate);

//                 // Accumulate total power
//                 totalPower += power;

//                 // Update the line chart with the total accumulated power
//                 updateLineChart(formattedDate, totalPower);

//                 // Move to the next entry
//                 index++;
//                 if (index >= response.length) {
//                     index = 0;  // Loop back to the first entry if we reach the end
//                 }
//             } else {
//                 console.error('Invalid data format');
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('AJAX Error:', error);
//         }
//     });
// }

// function fetchKwhData() {
//     $.ajax({
//         url: 'MonitorListrik/getKwh',
//         type: 'GET',
//         dataType: 'json',
//         success: function (response) {
//             console.log(response);

//             if (response.length > 0) {
//                 response.sort((a, b) => new Date(a.Tanggal) - new Date(b.Tanggal));

//                 let groupedData = {};
//                 response.forEach(item => {
//                     if (!groupedData[item.Tanggal]) {
//                         groupedData[item.Tanggal] = {};
//                     }
//                     groupedData[item.Tanggal][item.NoProduksi] = parseFloat(item.KWH) || 0;
//                 });

//                 let dates = Object.keys(groupedData);

//                 if (index >= dates.length) {
//                     index = 0;
//                 }

//                 let currentTanggal = dates[index].split(' ')[0];
//                 let sortedData = groupedData[dates[index]];
//                 tgl.textContent = `Date: ${currentTanggal}`;

//                 let kwh1 = sortedData[14] || 0;
//                 let kwh2 = sortedData[2] || 0;
//                 let kwh3 = sortedData[4] || 0;
//                 let kwh4 = sortedData[7] || 0;
//                 updateChart('dataChart1', kwh1);
//                 updateChart('dataChart2', kwh2);
//                 updateChart('dataChart3', kwh3);
//                 updateChart('dataChart4', kwh4);

//                 updateLineChart(currentTanggal, kwh1 + kwh2 + kwh3 + kwh4);

//                 index++;
//             } else {
//                 console.error('Invalid data format');
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('AJAX Error:', error);
//         }
//     });
// }


// // let charts = {};

// function updateChart(chartId, dataValue) {
//     const canvas = document.getElementById(chartId);
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');

//     let numericValue = parseFloat(dataValue) || 0;

//     if (charts[chartId]) {
//         charts[chartId].destroy();
//     }

//     charts[chartId] = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: ['Used', 'Remaining'],
//             datasets: [{
//                 data: [numericValue, 10000 - numericValue],
//                 backgroundColor: ['lime', 'rgba(200, 200, 200, 0.5)'],
//                 borderWidth: 0
//             }]
//         },
//         options: {
//             aspectRatio: 2,
//             circumference: 180,
//             rotation: -90,
//             cutout: '70%',
//             plugins: {
//                 title: {
//                     display: true,
//                     text: numericValue.toFixed(2) + ' kWh',
//                     font: { size: 20 },
//                     color: 'black'
//                 },
//                 legend: { display: false }
//             }
//         }
//     });
// }

// let lineChartData = {
//     labels: [], // Stores date labels
//     datasets: [{
//         label: "Total KWH",
//         data: [],
//         borderColor: "blue",
//         backgroundColor: "rgba(0, 0, 255, 0.2)",
//         borderWidth: 2,
//         fill: true
//     }]
// };

// function updateLineChart(date, totalKWH) {
//     if (!charts['dataChart5']) {
//         const ctx = document.getElementById('dataChart5').getContext('2d');
//         charts['dataChart5'] = new Chart(ctx, {
//             type: 'line',
//             data: lineChartData,
//             options: {
//                 responsive: true,
//                 scales: {
//                     x: { title: { display: true, text: "Date" } },
//                     y: { title: { display: true, text: "Total KWH" }, beginAtZero: true }
//                 }
//             }
//         });
//     }

//     // Update line chart data
//     lineChartData.labels.push(date);
//     lineChartData.datasets[0].data.push(totalKWH);

//     charts['dataChart5'].update();
// }
