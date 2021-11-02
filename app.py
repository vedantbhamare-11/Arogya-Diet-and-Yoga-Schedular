from flask import Flask, jsonify
import flask
from flask_cors import CORS, cross_origin
import pandas as pd
from sklearn.model_selection import train_test_split
import random
from sklearn.naive_bayes import GaussianNB

# initial flask setup
app = Flask(__name__)
CORS(app, resources={r"/api/": {"origins": ""}})
app.config['CORS_HEADERS'] = 'Content-Type'

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
def api():
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