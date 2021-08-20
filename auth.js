//sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //getting user input
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //signup the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred);
  });
});
