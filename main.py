import subprocess
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_memory_info')
def get_memory_info():
    return execute_java_program()

@app.route('/simulate_memory_leak')
def simulate_memory_leak():
    return execute_java_program(simulate_leak=True)

def execute_java_program(simulate_leak=False):
    try:
        command = ['java', 'MemoryInfo']
        if simulate_leak:
            command.append('--leak')
        
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        
        return jsonify({'memory_info': result.stdout.strip()})
    except subprocess.CalledProcessError as e:
        if 'java: not found' in str(e):
            return jsonify({'error': 'Java is not installed or not properly configured.'}), 500
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
