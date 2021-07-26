import pandas as pd
import requests
import datetime as datetime
import sqlite3
from sqlalchemy import create_engine

def get_data():

    
    
    url = "https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Use_of_Force/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"



    response = requests.get(url)
    response_json = response.json()



    new_dict = {}
    new_dict["Year"] = []
    new_dict["YearMonth"] = []
    new_dict["Hour"] = []
    # new_dict["geometry"] = []
    for field in response_json["features"][0]['attributes'].keys():
        new_dict[field] = []
    for index in range(len(response_json["features"])):
        a = response_json["features"][index]['attributes']
        b = response_json["features"][index]['geometry']
        
        if a['ResponseDate'] != None:
        
            for key in response_json["features"][index]['attributes']:
            
            
            
                if key == 'ResponseDate':
                        d = datetime.datetime.fromtimestamp(a[key]/1000)
                        e = d.strftime('%Y-%m-%d')
                        # e = d.strftime('%Y-%m-%d %H:%M:%S')
                        new_dict[key].append(e)
                        new_dict["Year"].append(d.strftime('%Y'))
                        new_dict["YearMonth"].append(d.strftime('%Y-%m'))
                        new_dict["Hour"].append(d.strftime('%H'))
                else:
                    new_dict[key].append(a[key])
                    # new_dict["geometry"].append(b)
        
        
        else:
            pass


    

    df = pd.DataFrame(new_dict)




    sqlite3.connect('MNPDUseofForce.sqlite')
    
    engine = create_engine('sqlite:///MNPDUseofForce.sqlite')

    df.to_sql('MNPD_tbl', con=engine, if_exists='replace', index=False)

    return print("Database Created")
