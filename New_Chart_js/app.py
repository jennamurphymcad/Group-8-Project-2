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
    
    # data = engine.execute("SELECT Year, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Year")
    # Problem_List = [(int(Year), int(Force_Use)) for Year, Force_Use in list(data)]
    data = engine.execute("SELECT Neighborhood, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Neighborhood")
    Map_Data = [(Neighborhood, int(Force_Use)) for Neighborhood, Force_Use in list(data)]
    Map_Data.append(("Minneapolis", ""))
    # data = engine.execute("SELECT Sex, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Sex")
    # Sex_Data = [(Sex, int(Force_Use)) for Sex, Force_Use in list(data)]
    # data = engine.execute("SELECT Race, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Race")
    # Race_Data = [(Race, int(Force_Use)) for Race, Force_Use in list(data)]
    # Data = {"Problem_List": Problem_List, "Map_Data": Map_Data, "Sex_Data": Sex_Data, "Race_Data": Race_Data}

    data = engine.execute("SELECT Neighborhood, Year, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Neighborhood, Year")
    Dict = {}
    for Neighborhood, Year, Count in list(data):
        if Neighborhood == None:
            pass
        else:
            if Neighborhood not in Dict:
                Dict[Neighborhood] = [[],[]]
                Dict[Neighborhood][0].append(Year)
                Dict[Neighborhood][1].append(Count)
            else:
                Dict[Neighborhood][0].append(Year)
                Dict[Neighborhood][1].append(Count)
    data = engine.execute("SELECT Year, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Year")
    Dict_Minn = {"Minneapolis":[[],[]]}
    for Year, Count in list(data):
        Dict_Minn['Minneapolis'][0].append(Year)
        Dict_Minn['Minneapolis'][1].append(Count)
    Dict_Minn
    Dict_All_Year = {**Dict_Minn, **Dict}

    data = engine.execute("SELECT Neighborhood, Problem, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Neighborhood, Problem")
    Dict = {}
    for Neighborhood, Problem, Count in list(data):
        if Neighborhood == None:
            pass
        else:
            if Neighborhood not in Dict:
                Dict[Neighborhood] = [[],[]]
                Dict[Neighborhood][0].append(Problem)
                Dict[Neighborhood][1].append(Count)
            else:
                Dict[Neighborhood][0].append(Problem)
                Dict[Neighborhood][1].append(Count)
    data = engine.execute("SELECT Problem, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Problem")
    Dict_Minn = {"Minneapolis":[[],[]]}
    for Problem, Count in list(data):
        Dict_Minn['Minneapolis'][0].append(Problem)
        Dict_Minn['Minneapolis'][1].append(Count)
    Dict_Minn
    Dict_All_Problem = {**Dict_Minn, **Dict}
    
    All_Data = {"Map_Data": Map_Data, "N_CountbyYear": Dict_All_Year, "N_CountbyProblem": Dict_All_Problem}

    return jsonify(All_Data)

if __name__ == '__main__':
    app.run(debug=True)