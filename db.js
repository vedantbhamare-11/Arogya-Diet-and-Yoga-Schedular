const profileForm = document.querySelector("#profile-form");
//listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(profileForm["name"].value + " profile updated");
      return db
        .collection("users")
        .doc(user.uid)
        .set({
          name: profileForm["name"].value,
          height: parseInt(profileForm["height"].value),
          weight: parseInt(profileForm["weight"].value),
          age: parseInt(profileForm["age"].value),
          gender: document.querySelector('input[name="radio"]:checked').value,
          meal: document.querySelector('input[name="meal"]:checked').value,
          activity: document.querySelector('input[name="workout"]:checked')
            .value,
          BMI: parseInt(
            (profileForm["weight"].value /
              profileForm["height"].value /
              profileForm["height"].value) *
              10000
          ),
        })
        .then(() => {
          window.location.href = "mainpage.html";
        });
    });
    console.log("user signed in", user);
  } else {
    console.log("user signed out");
  }
});
