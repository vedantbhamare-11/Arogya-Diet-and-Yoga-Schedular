const viewName = document.querySelector(".view-name");
const viewHeight = document.querySelector(".view-height");
const viewWeight = document.querySelector(".view-weight");
const viewAge = document.querySelector(".view-age");
const viewGender = document.querySelector(".view-gender");
const viewMeal = document.querySelector(".view-meal");
const viewActivity = document.querySelector(".view-activity");
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const name = `
        <div>Name: ${doc.data().name}</div>
        `;
        const height = `
        <div>Height: ${doc.data().height}</div>
        `;
        const weight = `
        <div>Weight: ${doc.data().weight}</div>
        `;
        const age = `
        <div>Age: ${doc.data().age}</div>
        `;
        const gender = `
        <div>Gender: ${doc.data().gender}</div>
        `;
        const meal = `
        <div>Meal: ${doc.data().meal}</div>
        `;
        const BMI = `
        <div>BMI: ${doc.data().BMI}</div>
        `;
        viewName.innerHTML = name;
        viewHeight.innerHTML = height;
        viewWeight.innerHTML = weight;
        viewAge.innerHTML = age;
        viewGender.innerHTML = gender;
        viewMeal.innerHTML = meal;
        viewActivity.innerHTML = BMI;
      });
  }
});
