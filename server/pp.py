import sys
import json
import requests

url = "http://3000/toilets"

r = requests.get(url)

data = r.json()

resp = {
    "Response": 200,
    "Message": "hello from Python File",
    "Data":data
}
print(json.dumps(resp))
# using system module in python to send to node js 
sys.stdout.flush()