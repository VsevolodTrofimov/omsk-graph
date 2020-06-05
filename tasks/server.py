from flask import Flask, request
from flask_cors import CORS
from solve_11 import solve_11
from solve_12 import solve_12
from solve_13_24 import solve_13_14, solve_21, solve_22_24
import lib

app = Flask(__name__)
CORS(app)

G = lib.load()


@app.route('/1.1', methods=['POST'])
def task_11():
    params = request.json

    return solve_11(
        G, 
        params['houses'], 
        params['infra'], 
        params['maxTime'] if 'maxTime' in params else 0, 
        params['maxDistance'] if 'maxDistance' in params else 0
    )


@app.route('/1.2', methods=['POST'])
def task_12():
    params = request.json

    return solve_12(
        G, 
        params['houses'], 
        params['infra']
    )


@app.route('/1.3-1.4', methods=['POST'])
def task_13_14():
    params = request.json

    return solve_13_14(
        G, 
        params['houses'], 
        params['infra']
    )


@app.route('/2.1', methods=['POST'])
def task_21():
    params = request.json

    return solve_21(
        G, 
        params['houses'], 
        params['infra']
    )


@app.route('/2.2-2.4', methods=['POST'])
def task_22_24():
    params = request.json

    return solve_22_24(
        G, 
        params['houses'], 
        params['infra'][0],
        params['clusterCount']
    )
