// Get references to the button and sections
const toggleButtonMobile = document.getElementById("toggleMapButtonMobile");
const venuesSection = document.querySelector(".venues-section");
const mapSection = document.querySelector(".map-section");

//reset filter style on map open
const filtersSection = document.querySelector(".filters-section");
const header= document.querySelector(".header");
 

// Set an initial state
let isMapClose = true;
const isMobile = window.innerWidth < 545;

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
    //reset filter style on map open
    if (isMobile) {
      filtersSection.style.opacity = "1";
      filtersSection.style.marginTop = "var(--header-size)";
      filtersSection.style.position = "fixed"
      header.style.opacity = "1";
      mapSection.style.paddingTop = "calc(1 * (4.5rem + 2.5rem) + 0.5rem + 2*var(--header-size))"
    }
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
