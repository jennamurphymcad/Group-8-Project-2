from sqlalchemy import create_engine
from flask import Flask, render_template, jsonify
import get_data


# Database Setup
engine = create_engine("sqlite:///MNPDUseofForce.sqlite")


# Flask Setup
app = Flask(__name__)

@app.route("/")
def index():
    
    return render_template("index.html")

@app.route("/data")
def data():

    get_data.get_data()
    
    data = engine.execute("SELECT Year, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Year")
    Problem_List = [(int(Year), int(Force_Use)) for Year, Force_Use in list(data)]

    data = engine.execute("SELECT Neighborhood, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Neighborhood")
    Map_Data = [(Neighborhood, int(Force_Use)) for Neighborhood, Force_Use in list(data)]

    data = engine.execute("SELECT Sex, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Sex")
    Sex_Data = [(Sex, int(Force_Use)) for Sex, Force_Use in list(data)]

    data = engine.execute("SELECT Race, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Race")
    Race_Data = [(Race, int(Force_Use)) for Race, Force_Use in list(data)]

    

    Data = {"Problem_List": Problem_List, "Map_Data": Map_Data, "Sex_Data": Sex_Data, "Race_Data": Race_Data}

    return jsonify(Data)

if __name__ == '__main__':
    app.run(debug=True)