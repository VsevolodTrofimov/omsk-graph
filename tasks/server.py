from flask import Flask, request
from task1_1 import task1_1
from task1_2 import task1_2
import lib

app = Flask(__name__)

G = lib.load()


@app.route('/1.1', methods=['GET', 'POST'])
def task11():
    params = request.json

    return task1_1(
        G, 
        params['houses'], 
        params['infra'], 
        params['maxTime'] if 'maxTime' in params else 0, 
        params['maxDistance'] if 'maxDistance' in params else 0
    )


@app.route('/1.2')
def task12():
    params = request.json

    return task1_2(
        G, 
        params['houses'], 
        params['infra']
    )
