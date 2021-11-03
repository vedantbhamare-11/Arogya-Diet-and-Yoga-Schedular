var i = auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const bmiValue = doc.data().BMI;
        var ele = document.getElementById("pointer");
//under weight
        if (bmiValue < 14 && bmiValue >= 12) {
          ele.style.left = "4%";
        }
        if (bmiValue < 17 && bmiValue >= 15) {
          ele.style.left = "8%";
        }
        if (bmiValue < 19 && bmiValue >= 18) {
          ele.style.left = "12%";
        }
//healthy weight
        if (bmiValue < 22 && bmiValue >= 20) {
          ele.style.left = "17%";
        }
        if (bmiValue < 24 && bmiValue >= 23) {
          ele.style.left = "20%";
        }
//over weight
        if (bmiValue < 25 && bmiValue >= 26) {
          ele.style.left = "25%";
        }
        if (bmiValue < 27 && bmiValue >= 29) {
          ele.style.left = "28%";
        }
//significantly over weight
        if (bmiValue < 33 && bmiValue >= 30) {
          ele.style.left = "35%";
        }
        if (bmiValue < 36 && bmiValue >= 34) {
          ele.style.left = "40%";
        }
        if (bmiValue < 39 && bmiValue >= 37) {
          ele.style.left = "45%";
        }
//Dangerously over weight
        if (bmiValue < 43 && bmiValue >= 40) {
          ele.style.left = "53%";
        }
        if (bmiValue < 47 && bmiValue >= 44) {
          ele.style.left = "57%";
        }
        if (bmiValue < 51 && bmiValue >= 48) {
          ele.style.left = "62%";
        }
      });
  }
});
