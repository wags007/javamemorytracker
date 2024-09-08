import subprocess
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_memory_info')
def get_memory_info():
    try:
        # Check if Java is installed
        subprocess.run(['java', '-version'], capture_output=True, check=True)
        
        # Compile the Java program
        subprocess.run(['javac', 'MemoryInfo.java'], check=True)
        
        # Run the Java program and capture its output
        result = subprocess.run(['java', 'MemoryInfo'], capture_output=True, text=True, check=True)
        
        # Return the output as JSON
        return jsonify({'memory_info': result.stdout.strip()})
    except subprocess.CalledProcessError as e:
        if 'java: not found' in str(e) or 'javac: not found' in str(e):
            return jsonify({'error': 'Java is not installed or not properly configured.'}), 500
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
