document.addEventListener("DOMContentLoaded", function () {
  const menuBox = document.querySelector(".menu-box");
  const menu = document.querySelector(".menu");
  const closeButton = document.querySelector(".close-button");
  const menuOverlay = document.querySelector(".menu-overlay");

  // Event listener for the menu box click
  menuBox.addEventListener("click", function (event) {
    event.stopPropagation();
    // Toggle the 'open' class on the menu to show/hide the sliding menu
    menu.classList.toggle("open");

    // Toggle the display of the overlay to show/hide the background shadow
    menuOverlay.style.display = menu.classList.contains("open")
      ? "block"
      : "none";
  });

  // Event listener for clicks outside the menu to close it
  document.addEventListener("click", function (event) {
    const targetElement = event.target;
    const isMenuClicked = menu.contains(targetElement);
    const isMenuBoxClicked = menuBox.contains(targetElement);

    if (!isMenuClicked && !isMenuBoxClicked) {
      // Close the menu by removing the 'open' class
      menu.classList.remove("open");
      // Hide the overlay when the menu is closed
      menuOverlay.style.display = "none";
    }
  });

  // Event listener for the close button click
  closeButton.addEventListener("click", function () {
    // Close the menu by removing the 'open' class
    menu.classList.remove("open");
    // Hide the overlay when the menu is closed
    menuOverlay.style.display = "none";
  });
});
