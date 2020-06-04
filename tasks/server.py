from flask import Flask
from task1_1 import task1_1
from task1_2 import task1_2
import lib

app = Flask(__name__)

G = lib.load()


@app.route('/1.1')
def task11():
    return task1_1(G, [31629076], [35220658])


@app.route('/1.2')
def task12():
    return task1_2(G, [], [])
