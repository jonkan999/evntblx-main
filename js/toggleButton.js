const toggleButton = document.getElementById("toggleMapButton");
const button = toggleButton.querySelector("button");
const offIcon = toggleButton.querySelector("#offIcon");
const onIcon = toggleButton.querySelector("#onIcon");
const toggleButtoMapSection = document.querySelector(".map-section");
const toggleButtonVenuesSection = document.querySelector(".venues-section");
const venueSelector = document.querySelector(".venue-selector");

let isToggled = true;

button.addEventListener("click", () => {
  isToggled = !isToggled;

  if (isToggled) {
    offIcon.style.display = "none";
    onIcon.style.display = "inline-block";
    toggleButtoMapSection.style.display = "block";
    toggleButtonVenuesSection.style.gridTemplateColumns = "repeat(3, 1fr)";
    venueSelector.style.margin = "auto";
  } else {
    offIcon.style.display = "inline-block";
    onIcon.style.display = "none";
    toggleButtoMapSection.style.display = "none";
    /* 1787 1436 */
    if (window.innerWidth > 1787) {
      toggleButtonVenuesSection.style.gridTemplateColumns = "repeat(5, 1fr)";
    } else if (window.innerWidth > 1436) {
      toggleButtonVenuesSection.style.gridTemplateColumns = "repeat(4, 1fr)";
    }
    venueSelector.style.justifyContent = "center";
  }
});
