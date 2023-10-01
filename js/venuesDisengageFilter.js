// Get a reference to the venue-selector and filters section elements
const disengVenueSelector = document.querySelector(".venues-section");
const disengageFiltersSection = document.querySelector(".filters-section");
const disengageChildElements = disengageFiltersSection.children;
/* const header= document.querySelector(".header"); */

// Variable to store the last known scroll position
let lastScrollPosition = disengVenueSelector.scrollTop;
let TopScrollThreshold = 33; // Adjust the threshold value as needed
let downScrollThreshold = 20;

// Function to handle scroll events on the venue-selector element
function handleScroll() {
  const isMobile = window.innerWidth < 545;
  if (isMobile) {
    // Get the current scroll position of the venue-selector
    const currentScrollPosition = disengVenueSelector.scrollTop;

    // Check if the user is scrolling down with a threshold
    if (currentScrollPosition > lastScrollPosition + downScrollThreshold) {
      // User is scrolling down, slide away the filters section
      hideFiltersSection();
    } else if (
      currentScrollPosition < lastScrollPosition - TopScrollThreshold ||
      currentScrollPosition < 150
    ) {
      // User is scrolling up with a threshold or at the top, show the filters section
      showFiltersSection();
    }

    // Update the last known scroll position
    lastScrollPosition = currentScrollPosition;
  }
}

// Function to slide away the filters section
function hideFiltersSection() {
  disengageFiltersSection.style.opacity = "0";
  disengageFiltersSection.style.marginTop = "0";
  header.style.opacity = "0.4";
  disengageFiltersSection.style.height = "0";

  for (let i = 0; i < disengageChildElements.length; i++) {
    disengageChildElements[i].style.display = "none";
  }
}

// Function to show the filters section
function showFiltersSection() {
  disengageFiltersSection.style.opacity = "1";
  disengageFiltersSection.style.marginTop = "var(--header-size)";
  header.style.opacity = "1";
  disengageFiltersSection.style.height =
    "calc(1 * (4.5rem + 2.5rem) + 0.5rem + var(--header-size))";
  for (let i = 0; i < disengageChildElements.length; i++) {
    disengageChildElements[i].style.display = "grid";
  }
}

// Add a scroll event listener to the venue-selector element
disengVenueSelector.addEventListener("scroll", handleScroll);
