// Get references to the elements
const moreFilterButton = document.getElementById("moreFilter");
const filterCheckboxes = document.querySelectorAll(".filter-checkbox");

// Initialize a flag to keep track of the state
let isFiltersVisible = false;

// Function to toggle filter visibility and update text/icon
function toggleFilters() {
  isFiltersVisible = !isFiltersVisible;

  // Loop through filter checkboxes and toggle their display
  filterCheckboxes.forEach((checkbox) => {
    checkbox.style.display = isFiltersVisible ? "block" : "none";
  });

  // Update the text and icon of moreFilterButton
  moreFilterButton.querySelector("p").textContent = isFiltersVisible
    ? "Färre filter"
    : "Fler filter";

  moreFilterButton.querySelector("ion-icon").name = isFiltersVisible
    ? "close-outline"
    : "options-outline";
}

// Add a click event listener to moreFilterButton
moreFilterButton.addEventListener("click", toggleFilters);
