# Java Memory Information Web App

This web application displays Java's perceived memory information using Flask and Vanilla JS. It provides real-time updates of memory usage and includes a feature to simulate memory leaks.

## Features

- Display detailed Java memory statistics
- Real-time updating of memory information
- Graphical representation of memory usage over time
- Memory leak simulation

## Technologies Used

- Backend: Flask (Python)
- Frontend: HTML, CSS, JavaScript
- Java for memory information retrieval

## Setup and Running

1. Ensure you have Python and Java installed on your system.
2. Install the required Python packages:
   ```
   pip install flask
   ```
3. Compile the Java file:
   ```
   javac MemoryInfo.java
   ```
4. Run the Flask application:
   ```
   python main.py
   ```
5. Open a web browser and navigate to `http://localhost:5000` to view the application.

## Usage

- Click the "Start Updating" button to begin real-time memory information updates.
- Click the "Stop Updating" button to pause the updates.
- Use the "Simulate Memory Leak" button to add 100MB of memory each time it's clicked, simulating a memory leak.

## Project Structure

- `main.py`: Flask application
- `MemoryInfo.java`: Java program for retrieving memory information
- `templates/index.html`: HTML template for the web interface
- `static/css/styles.css`: CSS styles for the web interface
- `static/js/script.js`: JavaScript for handling real-time updates and chart rendering

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## GitHub Repository Setup

To set up a GitHub repository for this project and push your code, follow these steps:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Choose a repository name
   - Set it to Public or Private as per your preference
   - Do not initialize with README, .gitignore, or license (we already have these)

2. Link your local repository to the GitHub repository:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

3. Push your code to GitHub:
   ```
   git push -u origin main
   ```

4. Verify that your code is now on GitHub by refreshing your repository page.

Remember to keep your repository up to date by regularly committing and pushing your changes.
