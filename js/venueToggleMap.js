// Get references to the button and sections
const toggleButtonMobile = document.getElementById("toggleMapButtonMobile");
const venuesSection = document.querySelector(".venues-section");
const mapSection = document.querySelector(".map-section");

// Set an initial state
let isMapClose = true;

// Add a click event listener to the button
toggleButtonMobile.addEventListener("click", function () {
  // Toggle between the sections
  if (isMapClose) {
    venuesSection.style.display = "none";
    mapSection.style.width = "100%";
    toggleButtonMobile.innerHTML = `
      <div class="icon-container">
        <ion-icon name="list-outline"></ion-icon>
      </div>
      <p>lista</p>
    `;
    isMapClose = false;
  } else {
    venuesSection.style.display = "block";
    mapSection.style.width = "0";
    toggleButtonMobile.innerHTML = `
      <div class="icon-container">
        <ion-icon name="map-outline"></ion-icon>
      </div>
      <p>karta</p>
    `;
    isMapClose = true;
  }
});
