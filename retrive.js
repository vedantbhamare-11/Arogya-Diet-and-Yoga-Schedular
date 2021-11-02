const userDetails = document.querySelector(".user-details");
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
        <div>Hey ${doc.data().name}</div>
        <div>Your BMI is ${doc.data().BMI} </div>
        `;
        userDetails.innerHTML = html;
        const height = doc.data().height;
        const weight = doc.data().weight;
        const BMI = doc.data().BMI;
        const age = doc.data().age;
        const input = [height, weight, BMI, age];

        axios.post("localhost:5000/yoga", input).then((response) => {
          console.log(response.data);
        });
      });
  }
});
