// Get references to the button and sections
const toggleButtonMobile = document.getElementById("toggleMapButtonMobile");
const venuesSection = document.querySelector(".venues-section");
const mapSection = document.querySelector(".map-section");

// Add a click event listener to the button
toggleButtonMobile.addEventListener("click", function () {
  if (venuesSection.style.display === "block") {
    // If venues-section is currently displayed, switch to map
    venuesSection.style.display = "none";
    mapSection.style.display = "block";
    toggleButtonMobile.innerHTML = `
      <div class="icon-container">
        <ion-icon name="list-outline"></ion-icon>
      </div>
      <p>lista</p>
    `;
  } else {
    // If map-section is currently displayed, switch to venues
    venuesSection.style.display = "block";
    mapSection.style.display = "none";
    toggleButtonMobile.innerHTML = `
      <div class="icon-container">
        <ion-icon name="map-outline"></ion-icon>
      </div>
      <p>karta</p>
    `;
  }
});
