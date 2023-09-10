// Get a reference to the select element
const numberOfPeopleSelect = document.getElementById("numberOfPeople");

// Add an event listener to detect changes in the select element
numberOfPeopleSelect.addEventListener("change", function () {
  const selectedValues = numberOfPeopleSelect.value;

  // Set the constraint for participants to the selected values
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  constraints.standing = selectedValues;

  // Store the updated constraints back in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));
  console.log(selectedValues);
  venueApplyFilters();
});
