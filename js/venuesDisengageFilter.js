// Get a reference to the venue-selector and filters section elements
const venueSelector = document.querySelector(".venues-section");
const filtersSection = document.querySelector(".filters-section");
const childElements = filtersSection.children;

// Variable to store the last known scroll position
let lastScrollPosition = venueSelector.scrollTop;

// Function to handle scroll events on the venue-selector element
function handleScroll() {
  const isMobile = window.innerWidth < 545;
  if (isMobile) {
    // Get the current scroll position of the venue-selector
    const currentScrollPosition = venueSelector.scrollTop;

    // Check if the user is scrolling down
    if (currentScrollPosition > lastScrollPosition) {
      // User is scrolling down, slide away the filters section
      filtersSection.style.height = "0";

      for (let i = 0; i < childElements.length; i++) {
        childElements[i].style.display = "none";
      }
    } else {
      // User is scrolling up (or not scrolling), show the filters section
      filtersSection.style.height =
        "calc(1 * (4.5rem + 2.5rem) + 0.5rem + var(--header-size))";
      for (let i = 0; i < childElements.length; i++) {
        childElements[i].style.display = "grid";
      }
    }

    // Update the last known scroll position
    lastScrollPosition = currentScrollPosition;
  }
}

// Add a scroll event listener to the venue-selector element
venueSelector.addEventListener("scroll", handleScroll);
