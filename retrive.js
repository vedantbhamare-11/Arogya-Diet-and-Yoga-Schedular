const userDetails = document.querySelector(".user-details");
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
        <h1>Hey ${doc.data().name}</h1>
        <h1>Your BMI is ${doc.data().BMI} </h1>
        `;
        userDetails.innerHTML = html;
      });
  }
});
