function venueApplyFilters() {
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  const venueContainers = document.querySelectorAll(".venue-box-container");

  // Selectors for the different filters
  const eventTypeSelect = document.getElementById("eventType");
  const numberOfPeopleSelect = document.getElementById("numberOfPeople");
  const eventDateInput = document.getElementById("eventDate");
  const ownFoodInputF = document.getElementById("ownFoodF");
  const ownDrinkInputF = document.getElementById("ownDrinkF");
  const soundInputF = document.getElementById("soundF");
  const micsInputF = document.getElementById("micsF");
  const projectorInputF = document.getElementById("projectorF");
  const discolightsInputF = document.getElementById("discolightsF");
  const checkoutInput = document.getElementById("checkout");

  venueContainers.forEach((container) => {
    const eventType = container.getAttribute("data-event-type");
    const standing = parseFloat(container.getAttribute("data-standing"));
    const seated = parseFloat(container.getAttribute("data-seated"));
    const checkout = parseFloat(container.getAttribute("data-checkout"));
    const ownDrinkF = container.getAttribute("data-ownDrinkF") === "True";
    const ownFoodF = container.getAttribute("data-ownFoodF") === "True";
    const soundF = container.getAttribute("data-soundF") === "True";
    const micsF = container.getAttribute("data-micsF") === "True";
    const projectorF = container.getAttribute("data-projectorF") === "True";
    const discolightsF = container.getAttribute("data-discolightsF") === "True";

    // Update the selected options for the filters based on constraints
    eventTypeSelect.value = constraints.eventType || "na";
    numberOfPeopleSelect.value = constraints.standing || "-1";
    eventDateInput.value = constraints.eventDate || "YYYY-MM-DD";
    ownFoodInputF.checked = constraints.ownFoodF || false;
    ownDrinkInputF.checked = constraints.ownDrinkF || false;
    soundInputF.checked = constraints.soundF || false;
    micsInputF.checked = constraints.micsF || false;
    projectorInputF.checked = constraints.projectorF || false;
    discolightsInputF.checked = constraints.discolightsF || false;
    console.log(checkout);

    if (
      (!constraints.eventType ||
        constraints.eventType === "na" ||
        eventType ===
          "" /* no data element for eventType, allowing all event types in venue  */ ||
        constraints.eventType.includes(eventType)) &&
      (!constraints.standing ||
        constraints.standing === "-1" ||
        (constraints.standing >= standing * 0.2 &&
          constraints.standing <= standing)) &&
      (!constraints.seated ||
        (constraints.seated >= seated * 0.3 && constraints.seated <= seated)) &&
      (!constraints.checkout || (checkout >= 1 && checkout <= 6)) &&
      (!constraints.ownDrinkF || constraints.ownDrinkF === ownDrinkF) &&
      (!constraints.ownFoodF || constraints.ownFoodF === ownFoodF) &&
      (!constraints.soundF || constraints.soundF === soundF) &&
      (!constraints.micsF || constraints.micsF === micsF) &&
      (!constraints.projectorF || constraints.projectorF === projectorF) &&
      (!constraints.discolightsF || constraints.discolightsF === discolightsF)
    ) {
      // If all constraints are met, show the container
      updateContainerDisplayAndMarkerStyle(container, "block");
    } else {
      // If any constraint is not met, hide the container
      updateContainerDisplayAndMarkerStyle(container, "none");
    }
  });
}
venueApplyFilters();
function updateContainerDisplayAndMarkerStyle(container, display) {
  const containerName = container.getAttribute("data-name"); // Step 1

  container.style.display = display;

  if (display === "block") {
    // If the container is displayed, find and style the matching marker
    const markerElements = document.querySelectorAll(".mapboxgl-marker");

    markerElements.forEach((markerElement) => {
      const markerDataName = markerElement.getAttribute("data-name");

      if (markerDataName === containerName) {
        // Found the matching marker, apply the same style
        markerElement.style.display = "block";
      }
    });
  } else {
    // If the container is hidden, find and hide the matching marker
    const markerElements = document.querySelectorAll(".mapboxgl-marker");

    markerElements.forEach((markerElement) => {
      const markerDataName = markerElement.getAttribute("data-name");

      if (markerDataName === containerName) {
        // Found the matching marker, hide it
        markerElement.style.display = "none";
      }
    });
  }
}
