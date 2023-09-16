// Get a reference to the select elements
const numberOfPeopleSelect = document.getElementById("numberOfPeople");
const eventTypeSelect = document.getElementById("eventType");
const eventDateInput = document.getElementById("eventDate");

// Add an event listener to detect changes in the numberOfPeople select element
numberOfPeopleSelect.addEventListener("change", function () {
  const selectedValue = this.value;

  // Set the constraint for standing to the extracted lower end
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.standing = selectedValue;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});

// Add an event listener to detect changes in the eventType select element
eventTypeSelect.addEventListener("change", function () {
  const selectedValue = this.value;

  // Set the constraint for eventType to the selected value
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.eventType = selectedValue;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
// Add an event listener to detect changes in the eventDate input element
eventTypeSelect.addEventListener("change", function () {
  const selectedValue = this.value;

  // Set the constraint for eventType to the selected value
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.eventDate = selectedValue;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
