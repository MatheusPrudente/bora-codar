const slider = document.querySelector("#slider");
const beforeImage = document.querySelector(".before-image");
const dragger = document.querySelector("#dragger");


slider.addEventListener("input", (e) => {
  beforeImage.style.width = e.target.value + '%';
  dragger.style.left = `calc(${event.target.value}%)`
})