var i = auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const bmiValue = doc.data().BMI;
        var ele = document.getElementById("pointer");
        if (bmiValue < 40 && bmiValue >= 30) {
          ele.style.left = "67%";
        }
        if (bmiValue < 25 && bmiValue >= 20) {
          ele.style.left = "21%";
        }
      });
  }
});
