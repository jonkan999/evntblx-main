document.addEventListener("DOMContentLoaded", function () {
  const eventDateInput = document.getElementById("eventDate");

  // Set the default value to "När som helst"
  eventDateInput.value = "När som helst";

  // Clear the value when the input receives focus
  eventDateInput.addEventListener("focus", function () {
    if (eventDateInput.value === "När som helst") {
      eventDateInput.value = "";
    }
  });

  // Set the value back to "När som helst" when focus is lost and the input is empty
  eventDateInput.addEventListener("blur", function () {
    if (eventDateInput.value === "") {
      eventDateInput.value = "När som helst";
    }
  });
});
