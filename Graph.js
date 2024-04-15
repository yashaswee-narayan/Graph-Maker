var myChart;

function generateChart() {
    var chartType = document.getElementById("chartType").value;
    var dataInput = document.getElementById("data").value.trim();
    
    if (myChart) {
        myChart.destroy();
    }

    var ctx = document.getElementById('myChart').getContext('2d');

    if (chartType === 'histogram') {
        var ranges = dataInput.split(",").map(range => range.trim());
        var bins = []; 
        var binLabels = []; 
        var backgroundColors = []; 

        // Calculate histogram bins from input ranges
        ranges.forEach(range => {
            var [start, end, color] = range.split("-").map(item => item.trim());
            var sum = 0;
            for (var i = Number(start); i <= Number(end); i++) {
                sum += i;
            }
            bins.push(sum);
            binLabels.push(`${start}-${end}`);

            // Assign color based on value
            backgroundColors.push(getUniqueColor(bins.length - 1));
        });

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: binLabels,
                datasets: [{
                    label: 'Histogram',
                    data: bins,
                    backgroundColor: backgroundColors,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barPercentage: 1,
                    categoryPercentage: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        var data = dataInput.split(",").map(Number);

        myChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: [...Array(data.length).keys()],
                datasets: [{
                    label: 'Data',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function getUniqueColor(index) {
    var colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
        
    ];

    return colors[index % colors.length];
}

document.getElementById("chartType").addEventListener("change", generateChart);

generateChart();
