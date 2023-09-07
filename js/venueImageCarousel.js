// JavaScript for the carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const venues = document.querySelectorAll(".venue-box-container");

  venues.forEach((venue) => {
    const carouselContainer = venue.querySelector(".image-carousel-container");
    const carouselItems = venue.querySelectorAll(".image-carousel-item");
    const prevButton = venue.querySelector(".carousel-nav-icon.prev");
    const nextButton = venue.querySelector(".carousel-nav-icon.next");
    const counter = venue.querySelector(".carousel-navigation #counter");

    let currentSlide = 0;

    function showSlide(slideIndex) {
      if (slideIndex >= 0 && slideIndex < carouselItems.length) {
        carouselItems[currentSlide].style.display = "none";
        currentSlide = slideIndex;
        carouselItems[currentSlide].style.display = "block";
        updateCounter();
      }
    }

    function updateCounter() {
      counter.textContent = `${currentSlide + 1}/${carouselItems.length}`;
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Initially show the first slide and update the counter
    showSlide(currentSlide);

    // Event listeners for button clicks
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;

      // Adjust the swipe sensitivity as needed
      if (swipeDistance > 50) {
        prevSlide();
      } else if (swipeDistance < -50) {
        nextSlide();
      }
    });
  });
});
