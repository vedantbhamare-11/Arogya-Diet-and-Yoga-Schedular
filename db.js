//listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    const profileForm = document.querySelector("#profile-form");
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("function is working");
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
        });
    });
    console.log("user signed in", user);
  } else {
    console.log("user signed out");
  }
});
