from flask import request, jsonify, Blueprint
# from app import app
from app.preprocess import main
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
