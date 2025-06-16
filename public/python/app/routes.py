from flask import request, jsonify, Blueprint
from app.preprocess import main as preprocess_main
from app.milp import main as model_main, buat_model
from io import BytesIO
import json
import subprocess
import pandas as pd


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
        file_stream = BytesIO(file.read())
        processed_data = preprocess_main(file_stream)

        return jsonify({'status': 'success', 'data': processed_data})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app_routes.route('/milp', methods=['POST'])
def model_endpoint():
    data = request.get_json()

    if not data or 'data' not in data:
        return jsonify({'error': 'No data received'}), 400

    mesin_df = pd.DataFrame(data['dataMesin'])

    hasil = model_main(data['data'])
    orders = hasil['orders']
    order_specs = hasil['order_specs']

    # result_model = buat_model(orders, order_specs, mesin_df, resultCL, hitungAvgDaya)                     # REAL
    result_model = buat_model(orders, order_specs, mesin_df)                                                # SIMULASI

    return jsonify({'message': 'Data processed successfully', 'result': result_model}), 200
