//listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    const profileForm = document.querySelector("#profile-form");
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("function is working");
      return db.collection("users").doc(user.uid).set({
        name: profileForm["name"].value,
        height: profileForm["height"].value,
        weight: profileForm["weight"].value,
        age: profileForm["age"].value,
        // gender: profileForm["gender"].value,
        // meal: profileForm["meal"].value,
      });
    });
    console.log("user signed in", user);
  } else {
    console.log("user signed out");
  }
});
let gender = document.getElementById("userGender").value;
let gender_value;
if (gender == "male") {
  gender_value = document.getElementById("male").value;
} else if (gender == "female") {
  gender_value = document.getElementById("female").value;
}

console.log(gender_value);
