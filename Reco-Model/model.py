import pandas as pd
import re
import requests
import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from math import sin, cos, sqrt, atan2, radians

def geoloc(lat,lng,open24,free,is_accessible):
    lat_rad = radians(float(lat))
    lng_rad = radians(float(lng))
    url = "http://localhost:3000/toilets-all"
    r = requests.get(url)
    data1 = r.json()
    data2 = pd.read_json(r.text)
    if free == "true":
        data = data2.loc[data2['Price']=='0,00']
    else:
        data = data2

    data['Latitude']=data['Latitude'].astype(np.float64)
    data['Longitude']=data['Longitude'].astype(np.float64)
    # if open24 == "true":
    #     data = data2.loc[data2['opening_hours']=='0:00-24:00']
    # else:
    #     data = data2
    # if is_accessible == "true":
    #     data == data2[data2['']]
    # approximate radius of earth in km
    R = 6373.0
    print(type(R))
    data['lat2'] = np.radians(data['Latitude'])
    data['lon2'] = np.radians(data['Longitude'])
    data['dlon'] = data['lon2'] - lng_rad
    data['dlat'] = data['lat2'] - lat_rad
    data['a'] = np.sin(data['dlat'] / 2)**2 + cos(lat_rad) * np.cos(data['lat2']) * np.sin(data['dlon'] / 2)**2
    data['c'] = 2 * np.arctan2(np.sqrt(data['a'] ), np.sqrt(1 - data['a'] ))
    data['geo_distance'] = R * data['c']
    # Recomending best toilets in cluster 
    coords = data[['Latitude','Longitude']]  
    kmeans = KMeans(n_clusters=98, init='k-means++')
    kmeans.fit(coords)
    y = kmeans.labels_
    #print("k = 5", " silhouette_score ", silhouette_score(coords, y, metric='euclidean'))
    data['cluster'] = kmeans.predict(data[['Latitude','Longitude']])
    cluster = kmeans.predict(np.array([lat,lng]).reshape(1,-1))[0]

    reco = data[data['cluster']==cluster].iloc[0:4]
    reco5 = reco.iloc[0:5]
    near_toilets = data.sort_values(by=['geo_distance'], ascending=True)
    # On the basis of nearest toilets
    geo = near_toilets.iloc[0:5]
    # result1 = pd.concat([geo,reco5]).drop_duplicates().reset_index(drop=True)
    result1 = pd.concat([geo,reco5]).reset_index(drop=True)
    result2 = result1.drop_duplicates(subset=['_id'])
    result = result2.to_json(orient="records")
    return result


