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
