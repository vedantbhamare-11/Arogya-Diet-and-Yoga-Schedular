const userDetails = document.querySelector(".user-details");
const yogaContent = document.querySelector(".yoga-content");
const dietContent = document.querySelector(".diet-content");
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
        <div>Hey ${doc.data().name}</div>
        <span>Your BMI is ${doc.data().BMI} </span>
        `;
        userDetails.innerHTML = html;
        const height = doc.data().height;
        const weight = doc.data().weight;
        const BMI = doc.data().BMI;
        const age = doc.data().age;
        const vegNonveg = doc.data().meal;
        const gender = doc.data().gender;
        const activity = doc.data().activity;
        console.log(`activity is ${activity}`);
        const h = doc.data().height;
        const w = doc.data().weight;
        const inputYoga = [height, weight, BMI, age];
        const inputDiet = [w, h, BMI, age, vegNonveg, gender, activity];

        axios.post("http://localhost:5000/yoga", inputYoga).then((response) => {
          console.log(response.data);
          const yogaHTML = `<div>${response.data.output}</div>`;
          // <div>${response.data.output[1]}</div>
          // <div>${response.data.output[2]}</div>`;
          yogaContent.innerHTML = yogaHTML;
        });
        axios.post("http://localhost:5000/diet", inputDiet).then((response) => {
          console.log(response.data);
          const dietHTML = `<div>${response.data.output}</div>`;
          dietContent.innerHTML = dietHTML;
        });
      });
  }
});
