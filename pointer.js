var i = auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const bmiValue = doc.data().BMI;
        var ele = document.getElementById("pointer");
        switch (true) {
          case bmiValue <= 14 && bmiValue >= 8:
            ele.style.left = "4%";
            break;
          case bmiValue <= 17 && bmiValue >= 15:
            ele.style.left = "8%";
            break;
          case bmiValue <= 19 && bmiValue >= 18:
            ele.style.left = "12%";
            break;
          case bmiValue <= 22 && bmiValue >= 20:
            ele.style.left = "17%";
            break;
          case bmiValue <= 24 && bmiValue >= 23:
            ele.style.left = "20%";
            break;
          case bmiValue <= 26 && bmiValue >= 25:
            ele.style.left = "25%";
            break;
          case bmiValue <= 29 && bmiValue >= 27:
            ele.style.left = "28%";
            break;
          case bmiValue <= 33 && bmiValue >= 30:
            ele.style.left = "35%";
            break;
          case bmiValue <= 36 && bmiValue >= 34:
            ele.style.left = "40%";
            break;
          case bmiValue <= 39 && bmiValue >= 37:
            ele.style.left = "45%";
            break;
          case bmiValue <= 43 && bmiValue >= 40:
            ele.style.left = "53%";
            break;
          case bmiValue <= 47 && bmiValue >= 44:
            ele.style.left = "57%";
            break;
          default:
            ele.style.left = "62%";
        }
      });
  }
});
