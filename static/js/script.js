document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchMemoryInfo');
    const memoryInfoDiv = document.getElementById('memoryInfo');
    const ctx = document.getElementById('memoryChart').getContext('2d');
    let intervalId = null;
    let chart;

    const chartData = {
        datasets: [
            {
                label: 'Used Memory',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Total Memory',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    };

    const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Memory (MB)'
                    }
                }
            }
        }
    };

    chart = new Chart(ctx, chartConfig);

    async function fetchMemoryInfo() {
        try {
            const response = await fetch('/get_memory_info');
            const data = await response.json();

            if (response.ok) {
                const memoryInfo = data.memory_info.split('\n');
                let formattedInfo = '<h2>Memory Information</h2>';
                formattedInfo += '<ul>';
                
                let usedMemory, totalMemory;

                memoryInfo.forEach(line => {
                    if (line.trim()) {
                        if (line.endsWith(':')) {
                            formattedInfo += `</ul><h3>${line}</h3><ul>`;
                        } else {
                            const [key, value] = line.split(':');
                            formattedInfo += `<li><strong>${key}:</strong> ${value}</li>`;

                            if (key.trim() === 'Used Memory') {
                                usedMemory = parseFloat(value.trim().split(' ')[0]);
                            } else if (key.trim() === 'Total Memory') {
                                totalMemory = parseFloat(value.trim().split(' ')[0]);
                            }
                        }
                    }
                });
                
                formattedInfo += '</ul>';
                memoryInfoDiv.innerHTML = formattedInfo;

                // Update chart data
                const now = new Date();
                chart.data.datasets[0].data.push({x: now, y: usedMemory});
                chart.data.datasets[1].data.push({x: now, y: totalMemory});

                // Keep only the last 20 data points
                if (chart.data.datasets[0].data.length > 20) {
                    chart.data.datasets.forEach(dataset => dataset.data.shift());
                }

                chart.update();
            } else {
                throw new Error(data.error || 'Failed to fetch memory information');
            }
        } catch (error) {
            memoryInfoDiv.textContent = `Error: ${error.message}`;
        }
    }

    function startFetching() {
        if (intervalId === null) {
            fetchMemoryInfo(); // Fetch immediately
            intervalId = setInterval(fetchMemoryInfo, 5000); // Then fetch every 5 seconds
            fetchButton.textContent = 'Stop Updating';
        }
    }

    function stopFetching() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
            fetchButton.textContent = 'Start Updating';
        }
    }

    fetchButton.addEventListener('click', () => {
        if (intervalId === null) {
            startFetching();
        } else {
            stopFetching();
        }
    });
});
