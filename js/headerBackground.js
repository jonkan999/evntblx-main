// Get a reference to the element with the class 'header'
const header = document.querySelector(".header");

// Calculate the scroll position when the header starts changing color
const scrollStart = window.innerHeight - 7 * 16; // 7rem converted to pixels

// Add a scroll event listener to the window
window.addEventListener("scroll", () => {
  // Get the current scroll position
  const scrollY = window.scrollY;

  // Calculate the scroll position relative to the 100vh mark
  const scrollPosition = scrollY - scrollStart;

  // Calculate the background color with transparency based on the scroll position
  const backgroundColor = interpolateColor(scrollPosition);

  // Set the background color of the header
  header.style.backgroundColor = backgroundColor;
});

// Function to interpolate the background color with transparency based on scroll position
function interpolateColor(scrollPosition) {
  // Define the colors and the corresponding scroll positions
  const colorStart = [0, 0, 0, 0]; // Initial color (black with 0% opacity)
  const colorEnd = [0, 0, 0, 1]; // Final color (black with 70% opacity)
  const startPosition = 0; // Scroll position when colorStart is applied
  const endPosition = 100; // Scroll position when colorEnd is applied

  // Calculate the interpolated color values
  const interpolatedColor = colorStart.map((channel, index) => {
    const startChannel = colorStart[index];
    const endChannel = colorEnd[index];
    return (
      startChannel +
      ((endChannel - startChannel) * (scrollPosition - startPosition)) /
        (endPosition - startPosition)
    );
  });

  // Return the RGBA color as a CSS string
  return `rgba(${interpolatedColor.join(",")})`;
}

const circles = document.querySelectorAll(".circle");
const positions = [
  { x: 150, y: 150 },
  { x: 300, y: 0 },
  // Add more positions here
];

circles.forEach((circle, index) => {
  const randomPosition = positions[index];
  circle.style.transform = `translate(${randomPosition.x}px, ${randomPosition.y}px)`;
});
