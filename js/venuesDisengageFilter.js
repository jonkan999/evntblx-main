// Get a reference to the venue-selector and filters section elements
const venueSelector = document.querySelector(".venues-section");
const filtersSection = document.querySelector(".filters-section");
const childElements = filtersSection.children;

// Variable to store the last known scroll position
let lastScrollPosition = venueSelector.scrollTop;
let scrollThreshold = 20; // Adjust the threshold value as needed

// Function to handle scroll events on the venue-selector element
function handleScroll() {
  const isMobile = window.innerWidth < 545;
  if (isMobile) {
    // Get the current scroll position of the venue-selector
    const currentScrollPosition = venueSelector.scrollTop;

    // Check if the user is scrolling down with a threshold
    if (currentScrollPosition > lastScrollPosition + scrollThreshold) {
      // User is scrolling down, slide away the filters section
      hideFiltersSection();
    } else if (
      currentScrollPosition < lastScrollPosition - scrollThreshold ||
      currentScrollPosition === 0
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
  filtersSection.style.height = "0";

  for (let i = 0; i < childElements.length; i++) {
    childElements[i].style.display = "none";
  }
}

// Function to show the filters section
function showFiltersSection() {
  filtersSection.style.height =
    "calc(1 * (4.5rem + 2.5rem) + 0.5rem + var(--header-size))";
  for (let i = 0; i < childElements.length; i++) {
    childElements[i].style.display = "grid";
  }
}

// Add a scroll event listener to the venue-selector element
venueSelector.addEventListener("scroll", handleScroll);
