from flask import Flask,request
import requests
import json
import pandas as pd
import sys
from model import geoloc

app = Flask(__name__)
@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/toilets",methods=["GET"])
def toilet():
    args = request.args
    lat1 = args.get('lat')
    lng1 = args.get('lng')
    timing = args.get('open24')
    cost = args.get('paid')
    result = geoloc(lat1,lng1)
    return result
        

if __name__ == "__main__":
    app.run(debug=True)