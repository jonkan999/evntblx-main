// Get a reference to the select elements
const numberOfPeopleSelect = document.getElementById("numberOfPeople");
const eventTypeSelect = document.getElementById("eventType");
const eventDateInput = document.getElementById("eventDate");
const ownFoodInputF = document.getElementById("ownFoodF");
const ownDrinkInputF = document.getElementById("ownDrinkF");
const soundInputF = document.getElementById("soundF");
const micsInputF = document.getElementById("micsF");
const projectorInputF = document.getElementById("projectorF");
const discolightsInputF = document.getElementById("discolightsF");
const checkoutInput = document.getElementById("checkout");

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
eventDateInput.addEventListener("change", function () {
  const selectedValue = this.value;

  // Set the constraint for eventType to the selected value
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.eventDate = selectedValue;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
// Add an event listener to detect changes in the ownFoodF input element
ownFoodInputF.addEventListener("change", function () {
  const isChecked = this.checked; // Check if the checkbox is checked

  // Set the constraint for ownFoodF to the checked status
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.ownFoodF = isChecked;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
// Add an event listener to detect changes in the ownFoodF input element
ownDrinkInputF.addEventListener("change", function () {
  const isChecked = this.checked; // Check if the checkbox is checked

  // Set the constraint for ownFoodF to the checked status
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.ownDrinkF = isChecked;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
soundInputF.addEventListener("change", function () {
  const isChecked = this.checked; // Check if the checkbox is checked

  // Set the constraint for ownFoodF to the checked status
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.soundF = isChecked;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
micsInputF.addEventListener("change", function () {
  const isChecked = this.checked; // Check if the checkbox is checked

  // Set the constraint for ownFoodF to the checked status
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.micsF = isChecked;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
projectorInputF.addEventListener("change", function () {
  const isChecked = this.checked; // Check if the checkbox is checked

  // Set the constraint for ownFoodF to the checked status
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.projectorF = isChecked;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
discolightsInputF.addEventListener("change", function () {
  const isChecked = this.checked; // Check if the checkbox is checked

  // Set the constraint for ownFoodF to the checked status
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.discolightsF = isChecked;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
checkoutInput.addEventListener("change", function () {
  const isChecked = this.checked; // Check if the checkbox is checked

  // Set the constraint for ownFoodF to the checked status
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.checkout = isChecked;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));

  venueApplyFilters();
});
