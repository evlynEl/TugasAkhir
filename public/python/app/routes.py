from flask import request, jsonify, Blueprint
# from app import app
from app.preprocess import main as preprocess_main
from app.model import merge_orders, main as model_main, buat_model
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
        processed_data = preprocess_main(file_stream)

        return jsonify({'status': 'success', 'data': processed_data})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app_routes.route('/model', methods=['POST'])
def model_endpoint():
    data = request.get_json()

    if not data or 'data' not in data:
        return jsonify({'error': 'No data received'}), 400

    # Merge orders terlebih dahulu
    merged_data = merge_orders(data['data'])  # Panggil merge_orders terlebih dahulu

    # Panggil fungsi main() dari model.py dengan data yang sudah digabung
    hasil = model_main(merged_data)
    orders = hasil['orders']
    order_specs = hasil['order_specs']

    # >>> Kirim ke model.py
    result_model = buat_model(orders, order_specs)

    return jsonify({'message': 'Data processed successfully', 'result': result_model}), 200
