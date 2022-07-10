import sys
import json
import requests
from flask import Flask, request

@app.route("/toilet", methods=["GET"])
def search():
    args = request.args
    lon = args.get("lon")
    lat = args.get("lat")


url = "http://3000/toilets"

r = requests.get(url, params=location)

data = r.json()

resp = {
    "Response": 200,
    "Message": "hello from Python File",
    "Data":data
}
print(json.dumps(resp))
# using system module in python to send to node js 
sys.stdout.flush()