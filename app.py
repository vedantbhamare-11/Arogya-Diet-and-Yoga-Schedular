from flask import Flask, jsonify
import flask
from flask_cors import CORS, cross_origin
import pandas as pd
from sklearn.model_selection import train_test_split
import random
from sklearn.naive_bayes import GaussianNB
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score


# initial flask setup
app = Flask(__name__)
CORS(app, resources={r"/api/": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

#returns diet

def diet(w,h,bmi,age,vegNonveg,gender,activity):
    dataset = pd.read_csv("food.csv")
    #Seprating dataset into input and output values
    X = dataset[['bmi','age','vegNonveg','gender','activity']]
    #print(X)

    Y = dataset.cat
    #print(Y)

    #Splitting dataset into train and test
    X_train,X_test,y_train,y_test = train_test_split(X, Y, test_size=0.25,random_state=0)


    #finding the best max depth value

    accuracy = []
    for i in range(1, 10):
        model = DecisionTreeClassifier(max_depth= i, random_state = 0)
        model.fit(X_train,y_train)
        pred = model.predict(X_test)
        score = accuracy_score(y_test,pred)
        accuracy.append(score)

    plt.figure(figsize=(12,6))
    plt.plot(range(1,10),accuracy, color = 'red', linestyle = 'dashed', marker = 'o', markerfacecolor = 'blue', markersize = 10)
    plt.title('Finding best Max depth')
    plt.xlabel('pred')

    #trainig the model
    model = DecisionTreeClassifier(criterion='entropy', max_depth=3, random_state=0)
    model.fit(X_train,y_train)

    #making prediction on test data
    y_pred = model.predict(X_test)


    #checking accuracy of the model
    # print("Accuracy of the model:{0}%".format(accuracy_score(y_test,y_pred)*100))

    #giving input to the model
    # gender = int(input("Enter gender 0 for female and 1 for male: "))
    # age = int(input("Enter age: "))
    # w = int(input("Enter weight: "))
    # h = int(input("Enter height: "))
    # bmi_index = int(input("Enter BMI index: "))
    # vegNonveg = int(input("enter your veg: 0 or nonveg: 1"))
    # activity = float(input("Enter activity 1.20 for no exc 1.37 for light exc 1.55 for moderate exc: "))

    person = [[w,h,bmi,age,vegNonveg,gender,activity]]
    bmi = model.predict(person)
    print("Your Bmi value: ",bmi[0])

    # calculating bmr and then calorie
    if(gender == 0):
        bmr_women = (10*w) + (6.25*h) - (5*age) - 161
    if (activity == 1.20):
        cal = bmr_women*1.2
    elif (activity == 1.37):
        cal = bmr_women*1.375
    elif (activity == 1.55):
        cal = bmr_women*1.55
    else:
        print("Enter correct details")
    print("BMR: ", bmr_women)

    if(gender == 1):
        bmr_men = (10*w) + (6.25*h) - (5*age) +5
    if (activity == 1.20):
        cal = bmr_men*1.2
    elif (activity == 1.37):
        cal = bmr_men*1.375
    elif (activity == 1.55):
        cal = bmr_men*1.55
    else:
        print("Enter correct details")
    print("BMR: ",bmr_men)

    calorie = 0
    if (bmi == "normal"):
        calorie = int(cal)
        print("calorie: ",calorie)
    if (bmi == "low"):
        calorie = int(cal-500)
        print("calorie: ",calorie)
    if (bmi == "high"):
        calorie = int(cal+500)
        print("calorie: ",calorie)

    # to get the index from value
    index = dataset.calorie_intake[dataset.calorie_intake==calorie].index.tolist()
    print(index)
    # to get the value from index
    i = index[0]
    dataset.food[i]

# flask route for diet
@app.route("/diet", methods=["POST"])
@cross_origin()
def api():
    json_data = flask.request.json
    print(flask.request)
    print(json_data)
    if json_data != None:

        w = int(json_data[0])
        h = int(json_data[1])
        bmi = int(json_data[2])
        age = int(json_data[3])
        vegNonveg = json_data[4]        
        gender = json_data[5]
        if (gender=='female'):
            gender=0
        else:
            gender=1 
        activity = float(json_data[4])
    else:
        return jsonify({"Sarang": "OP"})
    dietOutput = diet(w,h,bmi,age,vegNonveg,gender,activity)
    return {
        "output": dietOutput
    }
    

# returns yoga positions


def yoga_position(bmi, age, weight, height):
    dataset = pd.read_csv("yoga.csv")
    X = dataset[['height', 'weight', 'age', 'bmi']]
    Y = dataset["cat"]
    X_train, X_test, y_train, y_test = train_test_split(
        X, Y, test_size=0.25, random_state=0)

    model = GaussianNB()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    person = [[height, weight, age, bmi]]
    result = model.predict(person)

    bmiQuality = ""
    poses = []

    if (result[0] == "low"):
        yoga_poses_loss = dataset['low']
        bmiQuality = 'low'
        for i in range(3):
            random_poses = random.choice(yoga_poses_loss)
            poses.append(random_poses)

    elif(result[0] == "high"):
        yoga_poses_gain = dataset['high']
        bmiQuality = 'high'
        for i in range(3):
            random_poses = random.choice(yoga_poses_gain)
        poses.append(random_poses)

    else:
        yoga_poses_gain = dataset['normal']
        bmiQuality = 'normal'
        for i in range(3):
            random_poses = random.choice(yoga_poses_gain)
        poses.append(random_poses)
    return bmiQuality, poses


# flask route
@app.route("/yoga", methods=["POST"])
@cross_origin()
def diet_api():
    json_data = flask.request.json
    print(flask.request)
    print(json_data)
    if json_data != None:
        height = int(json_data[0])
        weight = int(json_data[1])
        bmi = int(json_data[2])
        age = int(json_data[3])
    else:
        return jsonify({"Sarang": "OP"})
    positionOutput = yoga_position(bmi, age, weight, height)
    return {
        "output": positionOutput
    }


if __name__ == '__main__':
    app.run(debug=True)