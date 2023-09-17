// Get a reference to the .message-section and .show-more-icon elements
const messageSection = document.querySelector(".message-section");
const showMoreIcon = document.querySelector(".show-more-icon");

// Add a click event listener to the .show-more-icon
showMoreIcon.addEventListener("click", function () {
  // Toggle a CSS class to control the height
  messageSection.classList.toggle("expanded");

  // Check if the .message-section has the 'expanded' class
  if (messageSection.classList.contains("expanded")) {
    // Set height to 'auto' and min-height to '13rem' when expanded
    messageSection.style.height = "auto";
    messageSection.style.minHeight = "13rem";

    // Set top position of showMoreIcon based on the height
    /* const messageSectionHeight = messageSection.clientHeight; */
    showMoreIcon.style.top = "29rem";

    // Change the icon name to chevron-up-outline when expanded
    showMoreIcon.textContent = "chevron-up-outline";
    // Apply the mask gradient when expanded
    messageSection.style.webkitMaskImage = "none";
  } else {
    // Set height and min-height to '13rem' when collapsed
    messageSection.style.height = "13rem";
    messageSection.style.minHeight = "13rem";

    // Set top position of showMoreIcon to 0 when collapsed
    showMoreIcon.style.top = "calc(12rem + var(--header-size))";

    // Change the icon name to chevron-down-outline when collapsed
    showMoreIcon.textContent = "chevron-down-outline";
    // Remove the mask gradient when collapsed
    messageSection.style.webkitMaskImage =
      "linear-gradient(to bottom, black 50%, transparent 100%)";
  }
});
