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
      });
  }
});
