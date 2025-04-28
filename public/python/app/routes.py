from flask import request, jsonify, Blueprint
# from app import app
from app.preprocess import main
from app.model import main
from io import BytesIO
import json
import subprocess

app_routes = Blueprint('app_routes', __name__)

@app_routes.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Hello from Flask!"})

@app_routes.route('/process', methods=['POST'])
def process_excel_route():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    try:
        # Convert FileStorage to file stream
        file_stream = BytesIO(file.read())

        # Panggil fungsi process_excel dari preprocess.py
        processed_data = main(file_stream)

        return jsonify({'status': 'success', 'data': processed_data})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app_routes.route('/model', methods=['POST'])
def model_endpoint():
    data = request.get_json()

    if not data or 'data' not in data:
        return jsonify({'error': 'No data received'}), 400

    # Panggil fungsi main() dari model.py
    hasil = main(data['data'])

    return jsonify({'message': 'Data processed successfully', 'result': hasil}), 200
