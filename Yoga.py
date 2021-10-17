import pandas as pd
import numpy as np
import random
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score
import js2py


dataset = pd.read_csv("yoga.csv")
print(dataset.shape)
print(dataset.head(5))

X= dataset[['height','weight','age','bmi']]

Y = dataset["cat"]

X_train,X_test,y_train,y_test = train_test_split(X, Y, test_size=0.25,random_state=0)

model = GaussianNB()
model.fit(X_train,y_train)

y_pred = model.predict(X_test)

height = int(input("Enter your height:"))
weight = int(input("Enter your weight:"))
age = int(input("Enter your age:"))
bmi = int(input("Enter your BMI: "))


person = [[height, weight, age, bmi]]
result = model.predict(person)
print(result[0])

if (result[0] == "low"):
  yoga_poses_loss = dataset['low']
  print("Try this yoga poses for low BMI:")
  for i in range(3):
    random_poses = random.choice(yoga_poses_loss)
    print(random_poses)
  
elif(result[0] == "high"):
    yoga_poses_gain = dataset['high']
    print("Try this yoga poses for high BMI:")
    for i in range(3):
        random_poses = random.choice(yoga_poses_gain)
        print(random_poses)
  
else:
  print("normal")
