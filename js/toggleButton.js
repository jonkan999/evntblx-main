const toggleButton = document.getElementById("toggleButton");
const button = toggleButton.querySelector("button");
const offIcon = toggleButton.querySelector("#offIcon");
const onIcon = toggleButton.querySelector("#onIcon");

let isToggled = false;

button.addEventListener("click", () => {
  isToggled = !isToggled;

  if (isToggled) {
    offIcon.style.display = "none";
    onIcon.style.display = "inline-block";
  } else {
    offIcon.style.display = "inline-block";
    onIcon.style.display = "none";
  }
});
