document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchMemoryInfo');
    const memoryInfoDiv = document.getElementById('memoryInfo');
    let intervalId;

    async function fetchMemoryInfo() {
        try {
            const response = await fetch('/get_memory_info');
            const data = await response.json();

            if (response.ok) {
                const memoryInfo = data.memory_info.split('\n');
                let formattedInfo = '<h2>Memory Information</h2>';
                formattedInfo += '<ul>';
                
                memoryInfo.forEach(line => {
                    if (line.trim()) {
                        if (line.endsWith(':')) {
                            formattedInfo += `</ul><h3>${line}</h3><ul>`;
                        } else {
                            const [key, value] = line.split(':');
                            formattedInfo += `<li><strong>${key}:</strong> ${value}</li>`;
                        }
                    }
                });
                
                formattedInfo += '</ul>';
                memoryInfoDiv.innerHTML = formattedInfo;
            } else {
                throw new Error(data.error || 'Failed to fetch memory information');
            }
        } catch (error) {
            memoryInfoDiv.textContent = `Error: ${error.message}`;
        }
    }

    function startFetching() {
        fetchMemoryInfo(); // Fetch immediately
        intervalId = setInterval(fetchMemoryInfo, 5000); // Then fetch every 5 seconds
        fetchButton.textContent = 'Stop Updating';
    }

    function stopFetching() {
        clearInterval(intervalId);
        fetchButton.textContent = 'Start Updating';
    }

    fetchButton.addEventListener('click', () => {
        if (intervalId) {
            stopFetching();
        } else {
            startFetching();
        }
    });
});
