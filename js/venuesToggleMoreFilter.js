// Get references to the elements
const moreFilterButton = document.getElementById("moreFilter");
const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
const filterSection = document.querySelector(".filters-section");
console.log(filterSection);

// Initialize a flag to keep track of the state
let isFiltersVisible = false;

// Function to toggle filter visibility and update text/icon
function toggleFilters() {
  isFiltersVisible = !isFiltersVisible;
  // Check the screen width using CSS media queries
  const isMobile = window.matchMedia("(max-width: 59em)").matches;

  // Loop through filter checkboxes and toggle their display
  filterCheckboxes.forEach((checkbox) => {
    const input = checkbox.querySelector("input");
    checkbox.style.display = isFiltersVisible ? "flex" : "none";
    input.style.display = isFiltersVisible ? "block" : "none";
  });

  // Update the text and icon of moreFilterButton
  moreFilterButton.querySelector("p").textContent = isFiltersVisible
    ? "Färre filter"
    : "Fler filter";

  moreFilterButton.querySelector("ion-icon").name = isFiltersVisible
    ? "close-outline"
    : "options-outline";
  /*   filterSection.style.display = isFiltersVisible ? "block" : "flex";
   */
  if (isMobile) {
    filterSection.style.height = isFiltersVisible
      ? "calc(5 * (4.5rem - 1.5rem) + var(--header-size))"
      : "calc(1 * (4.5rem + 2.5rem) + var(--header-size))";
  } else {
    filterSection.style.height = isFiltersVisible
      ? "calc(2 * (4.5rem + 2.5rem) + var(--header-size))"
      : "var(--header-size)";
  }
}

// Add a click event listener to moreFilterButton
moreFilterButton.addEventListener("click", toggleFilters);
