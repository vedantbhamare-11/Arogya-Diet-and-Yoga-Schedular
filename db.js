const userName = document.querySelector(".user-name");
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
          height: profileForm["height"].value,
          weight: profileForm["weight"].value,
          age: profileForm["age"].value,
          gender: document.querySelector('input[name="radio"]:checked').value,
          meal: document.querySelector('input[name="meal"]:checked').value,
          BMI: parseInt(
            (profileForm["weight"].value /
              profileForm["height"].value /
              profileForm["height"].value) *
              10000
          ),
        });
    });
    console.log("user signed in", user);
  } else {
    console.log("user signed out");
  }
});
