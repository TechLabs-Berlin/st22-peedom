import sys
import json
import requests

# #API with all toilets 
url = "http://localhost:3000/toilets-all"
#making get request to get all toilets
r = requests.get(url)
#inputing all toilets Information into data variable
data = r.json()
#parameters as a string are passed to params variable
#looks like this "lat":"51.7661","lng":"-0.2415","open24":"true","paid":"true"
params = sys.argv[1]

resp = {
    "Response": 200,
    "Message": params,
    "Data":data
}
print(json.dumps(resp))
# print(json.dumps(resp))
# # using system module in python to send to node js 
sys.stdout.flush()
