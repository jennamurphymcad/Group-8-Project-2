from sqlalchemy import create_engine
from flask import Flask, render_template, jsonify
import get_data


# Database Setup
engine = create_engine("sqlite:///MNPDUseofForce.sqlite")
get_data.get_data()

# Flask Setup
app = Flask(__name__)

@app.route("/")
def index():
    
    return render_template("index.html")

@app.route("/data")
def data():

    
    
    # data = engine.execute("SELECT Year, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Year")
    # Problem_List = [(int(Year), int(Force_Use)) for Year, Force_Use in list(data)]
    data = engine.execute("SELECT Neighborhood, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Neighborhood")
    Map_Data = [(Neighborhood, int(Force_Use)) for Neighborhood, Force_Use in list(data)]
    Map_Data.append(("Minneapolis", ""))
    Map_Data.reverse()
    # data = engine.execute("SELECT Sex, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Sex")
    # Sex_Data = [(Sex, int(Force_Use)) for Sex, Force_Use in list(data)]
    # data = engine.execute("SELECT Race, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Race")
    # Race_Data = [(Race, int(Force_Use)) for Race, Force_Use in list(data)]
    # Data = {"Problem_List": Problem_List, "Map_Data": Map_Data, "Sex_Data": Sex_Data, "Race_Data": Race_Data}

    data = engine.execute("SELECT Neighborhood, Year, Count(PoliceUseOfForceID) FROM MNPD_tbl WHERE Year !=2007 GROUP BY Neighborhood, Year")
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
    data = engine.execute("SELECT Year, Count(PoliceUseOfForceID) FROM MNPD_tbl WHERE Year !=2007 GROUP BY Year")
    Dict_Minn = {"Minneapolis":[[],[]]}
    for Year, Count in list(data):
        Dict_Minn['Minneapolis'][0].append(Year)
        Dict_Minn['Minneapolis'][1].append(Count)
    Dict_Minn
    Dict_All_Year = {**Dict_Minn, **Dict}

    data = engine.execute("SELECT Neighborhood, Problem, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Neighborhood, Problem")
    Dict = {}
    for Neighborhood, Problem, Count in list(data):
        if Neighborhood == None or Problem == None or Problem == "":
            pass
        else:
            if Neighborhood not in Dict:
                Dict[Neighborhood] = {}
                Dict[Neighborhood][Problem] = Count
            else:
                Dict[Neighborhood][Problem] = Count
    data = engine.execute("SELECT Problem, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Problem")
    Dict_Minn = {}
    Dict_Minn["Minneapolis"] = {}
    for Problem, Count in list(data):
        if Problem == None or Problem == "":
            pass
        else:
            Dict_Minn['Minneapolis'][Problem] = Count
            Dict_Minn
            Dict_All_Problem = {**Dict_Minn, **Dict}
    for Neighborhood in Dict_All_Problem:
        temp_list = []
        x = Dict_All_Problem[Neighborhood]
        y = [k for k, v in sorted(x.items(), key=lambda item: item[1], reverse = True)]
        z = [v for k, v in sorted(x.items(), key=lambda item: item[1], reverse = True)]
        temp_list = [y[:10], z[:10]]
        Dict_All_Problem[Neighborhood] = temp_list

    data = engine.execute("SELECT Neighborhood, ForceType, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY Neighborhood, ForceType")
    Dict = {}
    for Neighborhood, ForceType, Count in list(data):
        if Neighborhood == None or ForceType == None or Problem == "":
            pass
        else:
            if Neighborhood not in Dict:
                Dict[Neighborhood] = {}
                Dict[Neighborhood][ForceType] = Count
            else:
                Dict[Neighborhood][ForceType] = Count
    data = engine.execute("SELECT ForceType, Count(PoliceUseOfForceID) FROM MNPD_tbl GROUP BY ForceType")
    Dict_Minn = {}
    Dict_Minn["Minneapolis"] = {}
    for ForceType, Count in list(data):
        if ForceType == None or ForceType == "":
            pass
        else:
            Dict_Minn['Minneapolis'][ForceType] = Count
            Dict_Minn
            Dict_All_ForceType = {**Dict_Minn, **Dict}
    for Neighborhood in Dict_All_ForceType:
        temp_list = []
        x = Dict_All_ForceType[Neighborhood]
        y = [k for k, v in sorted(x.items(), key=lambda item: item[1], reverse = True)]
        z = [v for k, v in sorted(x.items(), key=lambda item: item[1], reverse = True)]
        temp_list = [y[:10], z[:10]]
        Dict_All_ForceType[Neighborhood] = temp_list
    
    All_Data = {"Map_Data": Map_Data, "N_CountbyYear": Dict_All_Year, "N_CountbyProblem": Dict_All_Problem, "N_CountbyForceType": Dict_All_ForceType}

    return jsonify(All_Data)

if __name__ == '__main__':
    app.run(debug=True)