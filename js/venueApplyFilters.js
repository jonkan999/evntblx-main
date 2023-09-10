function venueApplyFilters() {
  const constraints = JSON.parse(localStorage.getItem("constraints")) || {};
  const venueContainers = document.querySelectorAll(".venue-box-container");

  // Selectors for the different filters
  const eventTypeSelect = document.getElementById("eventType");
  const numberOfPeopleSelect = document.getElementById("numberOfPeople");

  venueContainers.forEach((container) => {
    const eventType = container.getAttribute("data-event-type");
    const standing = parseFloat(container.getAttribute("data-standing"));
    const seated = parseFloat(container.getAttribute("data-seated"));
    const checkout = parseFloat(container.getAttribute("data-checkout"));
    const ownDrinkF = container.getAttribute("data-ownDrinkF") === "true";
    const ownFoodF = container.getAttribute("data-ownFoodF") === "true";
    const soundF = container.getAttribute("data-soundF") === "true";
    const micsF = container.getAttribute("data-micsF") === "true";
    const projectorF = container.getAttribute("data-projectorF") === "true";
    const discolightsF = container.getAttribute("data-discolightsF") === "true";

    // Update the selected options for the filters based on constraints
    eventTypeSelect.value = constraints.eventType || "na";
    numberOfPeopleSelect.value = constraints.standing || "-1";

    if (
      (!constraints.eventType ||
        constraints.eventType === "na" ||
        constraints.eventType.includes(eventType)) &&
      (!constraints.standing ||
        constraints.standing === "-1" ||
        (constraints.standing >= standing * 0.2 &&
          constraints.standing <= standing)) &&
      (!constraints.seated ||
        (constraints.seated >= seated * 0.3 && constraints.seated <= seated)) &&
      (!constraints.checkout || constraints.checkout <= checkout) &&
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
