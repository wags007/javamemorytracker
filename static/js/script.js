document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchMemoryInfo');
    const memoryInfoDiv = document.getElementById('memoryInfo');

    fetchButton.addEventListener('click', async () => {
        try {
            fetchButton.disabled = true;
            fetchButton.textContent = 'Fetching...';
            memoryInfoDiv.textContent = 'Loading...';

            const response = await fetch('/get_memory_info');
            const data = await response.json();

            if (response.ok) {
                memoryInfoDiv.textContent = data.memory_info;
            } else {
                throw new Error(data.error || 'Failed to fetch memory information');
            }
        } catch (error) {
            memoryInfoDiv.textContent = `Error: ${error.message}`;
        } finally {
            fetchButton.disabled = false;
            fetchButton.textContent = 'Fetch Memory Info';
        }
    });
});
