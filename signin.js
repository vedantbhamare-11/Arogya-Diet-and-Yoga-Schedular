// signup switch
let left_cover = document.getElementById("left-cover");
let left_form = document.getElementById("left-form");

let right_cover = document.getElementById("right-cover");
let right_form = document.getElementById("right-form");

function switchSignup() {
  right_form.classList.add("fade-in-element");
  left_cover.classList.add("fade-in-element");

  left_form.classList.add("form-hide");
  left_cover.classList.remove("cover-hide");
  right_form.classList.remove("form-hide");
  right_cover.classList.add("cover-hide");
}
// show password switch
let state = false;
function showPass1() {
  if (state) {
    document.getElementById("signin-password").setAttribute("type", "password");
    document.getElementById("eye1").style.color = "#7a797e";
    state = false;
  } else {
    document.getElementById("signin-password").setAttribute("type", "text");
    document.getElementById("eye1").style.color = "#799741";
    state = true;
  }
}
function showPass2() {
  if (state) {
    document.getElementById("signup-password").setAttribute("type", "password");
    document.getElementById("eye2").style.color = "#7a797e";
    state = false;
  } else {
    document.getElementById("signup-password").setAttribute("type", "text");
    document.getElementById("eye2").style.color = "#799741";
    state = true;
  }
}
function showPass3() {
  if (state) {
    document
      .getElementById("confirm-password")
      .setAttribute("type", "password");
    document.getElementById("eye3").style.color = "#7a797e";
    state = false;
  } else {
    document.getElementById("confirm-password").setAttribute("type", "text");
    document.getElementById("eye3").style.color = "#799741";
    state = true;
  }
}
