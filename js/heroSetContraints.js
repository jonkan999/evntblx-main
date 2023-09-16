// Get a reference to the "Hitta lokal" link
const searchButton = document.querySelector(".search-button");

// Add a click event listener to the link
searchButton.addEventListener("click", function () {
  // Get the selected values from both selectors
  const numberOfPeopleSelect = document.getElementById("numberOfPeople");
  const selectedNumberOfPeople = numberOfPeopleSelect.value;

  const eventTypeSelect = document.getElementById("eventType");
  const selectedEventType = eventTypeSelect.value;

  const eventDateInput = document.getElementById("eventDate");
  const selectedEventDate = eventDateInput.value;

  // Create the constraints object with both values
  const constraints = {
    standing: selectedNumberOfPeople,
    eventType: selectedEventType,
    eventDate: selectedEventDate,
  };

  // Store the constraints in local storage
  localStorage.setItem("constraints", JSON.stringify(constraints));
  console.log(constraints);
});
