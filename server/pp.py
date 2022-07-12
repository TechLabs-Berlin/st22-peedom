import sys
import json
import requests

#API with all toilets 
url = "http://localhost:3000/toilets-all"
#making get request to get all toilets
r = requests.get(url)
#inputing all toilets Information into data variable
data = r.json()

# lat = sys.argv[1]
# lon = sys.argv[2]
print(data)

# print(data)

# resp = {
#     "Response": 200,
#     "Message": "hello from Python File",
#     "Data":data
# }
# print(json.dumps(resp))
# # using system module in python to send to node js 
# sys.stdout.flush()
