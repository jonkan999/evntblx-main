function adjustHeader() {
  const header = document.querySelector(".header");
  const menuItems = header.querySelectorAll(".category-link");
  const ctaLink = header.querySelector(".cta");
  const menuBox = header.querySelector(".menu-box");
  const brandBox = header.querySelector(".brand-box");
  const brandBoxSmall = header.querySelector(".brand-box-small");

  if (window.innerWidth < 574) {
    menuItems.forEach((item) => (item.style.display = "none"));
    ctaLink.style.display = "none";
    menuBox.style.display = "block";
  } else if (window.innerWidth < 974) {
    menuItems.forEach((item) => (item.style.display = "none"));
    ctaLink.style.display = "block";
    menuBox.style.display = "block";
    brandBox.style.display = "none";
    brandBoxSmall.style.display = "flex";
  } else {
    menuItems.forEach((item) => (item.style.display = "block"));
    ctaLink.style.display = "block";
    brandBox.style.display = "flex";
    menuBox.style.display = "none";
    brandBoxSmall.style.display = "none";
  }
}

// Initial adjustment on page load
adjustHeader();

// Listen for window resize events
window.addEventListener("resize", adjustHeader);
