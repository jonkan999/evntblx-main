/* import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
 */
/* import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; */
/* import firebase from "firebase/app";
import "firebase/firestore";
 */
/* import firebaseConfig from "./config.js"; // Update the path to match your directory structure
 */

/* firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); */

// Wait for the page to load
window.addEventListener("load", function () {
  const colorSelection = document.querySelector(".color-selection");
  const loading = document.querySelector(".loading");
  const venuePage = document.getElementById("venuePage");

  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      colorBoxes.forEach((box) => {
        box.classList.remove("active");
      });
      this.classList.add("active"); // Add active class to the clicked color box

      loading.style.display = "flex";

      // Show the submit button
      const submitButton = document.getElementById("submit");
      submitButton.style.display = "block";

      loading.style.display = "none";
      venuePage.style.display = "block";
      renderVenuePage();
    });
  });

  function addOverlay(imageElement) {
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");
    imageElement.appendChild(overlay);

    return imageElement;
  }

  let rightSplit; // Declare rightSplit outside of initiateCalendar()
  function renderVenuePage() {
    const venueInfoJSON = localStorage.getItem("venueInfo");
    if (!venueInfoJSON) {
      console.error("Venue info not found in local storage");
      return;
    }

    const venueInfo = JSON.parse(venueInfoJSON);
    const venuePage = document.querySelector(".venue-page");

    // Clear previous content of venuePage
    venuePage.innerHTML = "";

    const venueImagesJSON = localStorage.getItem("venueImages");
    if (!venueImagesJSON) {
      console.error("Venue images not found in local storage");
      return;
    }

    const venueImages = JSON.parse(venueImagesJSON);

    // Create picture carousel
    const imagesSection = document.createElement("div");
    imagesSection.classList.add("images-section", "section", "airy-margin");

    const leftImage = document.createElement("div");
    leftImage.classList.add("left-image");
    leftImage.style.backgroundImage = `url(${venueImages.images[0]})`;
    addOverlay(leftImage);

    const rightImagesSection = document.createElement("div");
    rightImagesSection.classList.add("right-images-section");

    const topRightImage = document.createElement("div");
    topRightImage.classList.add("top-right-image");
    topRightImage.style.backgroundImage = `url(${venueImages.images[1]})`;
    addOverlay(topRightImage);

    const bottomRightImages = document.createElement("div");
    bottomRightImages.classList.add("bottom-right-images");

    for (let i = 2; i < Math.min(venueImages.images.length, 4); i++) {
      const bottomRightImage = document.createElement("div");
      bottomRightImage.classList.add("bottom-right-image");
      bottomRightImage.style.backgroundImage = `url(${venueImages.images[i]})`;

      addOverlay(bottomRightImage);
      bottomRightImages.appendChild(bottomRightImage);
    }

    /* ADDING SHOW MORE IMAGES BUTTON */
    // Append the square icons
    const squareIconContainerContainer = document.createElement("div");
    squareIconContainerContainer.classList.add(
      "square-icon-container-container"
    );
    for (let i = 0; i < 4; i++) {
      const squareIconContainer = document.createElement("div");
      squareIconContainer.classList.add("square-icon-container");

      const squareIcon = document.createElement("ion-icon");
      squareIcon.classList.add("icon", "ion-ios-square-outline");
      squareIcon.setAttribute("name", "square-outline");

      squareIconContainer.appendChild(squareIcon);
      squareIconContainerContainer.appendChild(squareIconContainer);
    }

    // Append the "visa alla bilder" text
    const showAllImagesText = document.createElement("div");
    showAllImagesText.classList.add("show-all-images-text");
    showAllImagesText.textContent = "Visa alla";

    const showAllContainer = document.createElement("div");
    showAllContainer.classList.add("show-all-container");
    showAllContainer.appendChild(squareIconContainerContainer);
    showAllContainer.appendChild(showAllImagesText);

    bottomRightImages.appendChild(showAllContainer);

    rightImagesSection.appendChild(topRightImage);
    rightImagesSection.appendChild(bottomRightImages);

    imagesSection.appendChild(leftImage);
    imagesSection.appendChild(rightImagesSection);

    venuePage.appendChild(imagesSection);

    // Create and populate h1 title
    const title = document.createElement("h1");
    title.classList.add("event-space-title");
    title.textContent = venueInfo.name;
    venuePage.appendChild(title);

    // Create and populate adress line

    const adressDiv = document.createElement("div");
    adressDiv.classList.add("adress-div");

    const location = document.createElement("ion-icon");
    location.classList.add("icon", "ion-ios-location-outline");
    location.setAttribute("name", "location-outline");

    const adress = document.createElement("p");
    adress.classList.add("event-space-address");
    adress.textContent = venueInfo.address;

    adressDiv.appendChild(location);
    adressDiv.appendChild(adress);
    venuePage.appendChild(adressDiv);

    //Create and populate highlights section
    const highlightsContainer = document.createElement("ul");
    highlightsContainer.classList.add("highlights-container");
    const starRatingDiv = document.createElement("div");
    starRatingDiv.classList.add("highlight-stars");

    // Create a half-filled star (☆) element
    const halfFilledStar = document.createElement("ion-icon");
    halfFilledStar.classList.add("star-icon", "ion-ios-star-outline");
    halfFilledStar.setAttribute("name", "star-half-outline");

    // Add filled and half-filled stars to the rating
    for (let i = 0; i < 4; i++) {
      const filledStar = document.createElement("ion-icon");
      filledStar.classList.add("star-icon", "ion-ios-star-outline");
      filledStar.setAttribute("name", "star");
      starRatingDiv.appendChild(filledStar);
    }
    starRatingDiv.appendChild(halfFilledStar);

    // Create div for seated and mingling guests
    const guestsDiv = document.createElement("li");
    guestsDiv.classList.add("highlight-info");
    const guestsIcon = document.createElement("ion-icon");
    guestsIcon.classList.add("highlight-icon", "ion-ios-people-outline");
    guestsIcon.setAttribute("name", "people-outline");
    const guestsText = document.createElement("p");
    guestsText.textContent =
      venueInfo.seated + " sittandes, " + venueInfo.standing + " minglandes";
    guestsDiv.appendChild(guestsIcon);
    guestsDiv.appendChild(guestsText);

    // Create div for venue size
    const sizeDiv = document.createElement("li");
    sizeDiv.classList.add("highlight-info");
    const sizeIcon = document.createElement("ion-icon");
    sizeIcon.classList.add("highlight-icon", "ion-ios-crop-outline");
    sizeIcon.setAttribute("name", "crop-outline");
    const sizeText = document.createElement("p");
    sizeText.innerHTML = venueInfo.size + " m&sup2;";
    sizeDiv.appendChild(sizeIcon);
    sizeDiv.appendChild(sizeText);

    // Create div for own food and drink
    const foodDiv = document.createElement("li");
    foodDiv.classList.add("highlight-info");
    const foodIcon = document.createElement("ion-icon");
    foodIcon.classList.add("highlight-icon", "ion-ios-restaurant-outline");
    foodIcon.setAttribute("name", "restaurant-outline");
    const foodText = document.createElement("p");
    foodText.textContent = venueInfo.ownFoodF
      ? "Egen mat tillåten"
      : "Matservering tillhandahållen av lokalen";
    foodDiv.appendChild(foodIcon);
    foodDiv.appendChild(foodText);

    // Create div for own drinks
    const drinkDiv = document.createElement("li");
    drinkDiv.classList.add("highlight-info");
    const drinkIcon = document.createElement("ion-icon");
    drinkIcon.classList.add("highlight-icon", "ion-ios-wine-outline");
    drinkIcon.setAttribute("name", "wine-outline");
    const drinkText = document.createElement("p");
    drinkText.textContent = venueInfo.ownDrinkF
      ? "Egen dryck tillåten"
      : "Dryck tillhandahållen av lokalen";
    drinkDiv.appendChild(drinkIcon);
    drinkDiv.appendChild(drinkText);

    // Append all created elements to highlightsContainer
    highlightsContainer.appendChild(starRatingDiv);
    highlightsContainer.appendChild(guestsDiv);
    highlightsContainer.appendChild(sizeDiv);
    highlightsContainer.appendChild(foodDiv);
    highlightsContainer.appendChild(drinkDiv);

    // Append highlightsContainer to venuePage
    venuePage.appendChild(highlightsContainer);

    venuePage.appendChild(highlightsContainer);

    //subsection split
    const subsectionSplit = document.createElement("div");
    subsectionSplit.classList.add("subsection-split-container");

    // Create and populate the venue description section
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("description-container");
    const descriptionHeader = document.createElement("h2");
    descriptionHeader.textContent = "Om lokalen";
    const description = document.createElement("p");
    description.classList.add("venue-description");
    description.textContent = venueInfo.description;
    descriptionContainer.appendChild(descriptionHeader);
    descriptionContainer.appendChild(description);

    // Append the description and map sections to the venuePage subsection split

    subsectionSplit.appendChild(descriptionContainer);
    venuePage.appendChild(subsectionSplit);

    //subsection right split
    rightSplit = document.createElement("div");
    rightSplit.classList.add("subsection-right-split-container");
    subsectionSplit.appendChild(rightSplit);

    // Create and populate the map section
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2xsdHRyNDU2MHUxYTNlbzdzZHB2aGkyZiJ9._hS--VA8nG49uiiDGpBK3w";
    // Get the venue address from venueInfo
    const address = venueInfo.address;

    // Create a DOM element for the custom marker
    function createMarkerElement(svg) {
      const markerElement = document.createElement("div");
      markerElement.innerHTML = svg;
      return markerElement;
    }

    // Perform a geocoding search
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        const features = data.features;
        if (features.length > 0) {
          // Check if mapboxFeatures is already in local storage and remove it
          if (localStorage.getItem("mapboxCenter")) {
            localStorage.removeItem("mapboxCenter");
          }

          // Store the new mapbox features in local storage
          localStorage.setItem(
            "mapboxCenter",
            JSON.stringify(features[0].center)
          );

          const center = features[0].center;

          // Create the map and center it on the obtained coordinates
          const mapContainer = document.createElement("div");
          mapContainer.classList.add("map-container");
          rightSplit.appendChild(mapContainer);

          const map = new mapboxgl.Map({
            container: mapContainer,
            style: "mapbox://styles/mapbox/light-v10",
            center: center,
            zoom: 11,
          });

          // Custom marker SVG
          const markerSvg = `
                      <svg display="block" height="41px" width="27px" viewBox="0 0 27 41">
                          <!-- ... other SVG elements ... -->
                          <g transform="translate(8.0, 8.0)">
                              <circle fill="#9c51b6" opacity="0.25" cx="5.5" cy="5.5" r="5.4999962"></circle>
                              <circle fill="#9c51b6" cx="5.5" cy="5.5" r="5.4999962"></circle>
                          </g>
                      </svg>`;

          // Add a custom marker at the center coordinates
          new mapboxgl.Marker({ element: createMarkerElement(markerSvg) })
            .setLngLat(center)
            .addTo(map);

          map.on("load", () => {
            // Remove the Mapbox logo element
            const mapboxLogo = document.querySelector(".mapboxgl-ctrl-logo");
            if (mapboxLogo) {
              mapboxLogo.parentNode.removeChild(mapboxLogo);
            }

            // Remove the "Improve this map" link element
            const improveMapLink = document.querySelector(
              ".mapbox-improve-map"
            );
            if (improveMapLink) {
              improveMapLink.parentNode.removeChild(improveMapLink);
            }
          });
        }

        // Create the calendar container here since its part of the same div as the map
        const calendarContainer = document.createElement("div");
        calendarContainer.classList.add("calendar-container");

        // Create buttons for navigating months
        const prevMonthButton = document.createElement("button");
        prevMonthButton.textContent = "<";
        prevMonthButton.classList.add("calendar-nav-button");

        const nextMonthButton = document.createElement("button");
        nextMonthButton.textContent = ">";
        nextMonthButton.classList.add("calendar-nav-button");

        // Create the mail template container
        const mailTemplateContainer = document.createElement("div");
        mailTemplateContainer.classList.add("mail-template-container");

        // Create the mail template text input
        const mailTemplateInput = document.createElement("textarea");

        const template = `Hej!

Jag är intresserad av att hyra lokalen, och enligt nedan specifikationer:
          
Deltagarantal: 
Tid:
Beskrivning: 
Särskilda önskemål: 

Tack på förhand!`;

        mailTemplateInput.value = template;
        mailTemplateContainer.appendChild(mailTemplateInput);

        // Create the "Uppgifter till kontaktperson" (Contact person information) box
        const addInfoBox = document.createElement("div");
        addInfoBox.classList.add("add-info-box");

        // Create input fields for Namn, Telefon, and Mail
        const namnInput = document.createElement("input");
        namnInput.id = "contactName";
        namnInput.type = "text";
        namnInput.placeholder = "Kontaktpersonens namn";

        const telefonInput = document.createElement("input");
        telefonInput.id = "contactPhone";
        telefonInput.type = "tel";
        telefonInput.placeholder = "Kontaktpersonens telefonnummer";

        const mailInput = document.createElement("input");
        mailInput.id = "contactMail";
        mailInput.type = "email";
        mailInput.placeholder = "Kontaktpersonens e-postadress";

        // Create input headers for Namn, Telefon, and Mail
        const namnInputHeader = document.createElement("p");
        namnInputHeader.classList.add("input-header");
        namnInputHeader.textContent = "Namn:";

        const telefonInputHeader = document.createElement("p");
        telefonInputHeader.classList.add("input-header");
        telefonInputHeader.textContent = "Telefon:";

        const mailInputHeader = document.createElement("p");
        mailInputHeader.classList.add("input-header");
        mailInputHeader.textContent = "Mail:";

        // Append input fields and headers to the addInfoBox
        addInfoBox.appendChild(namnInputHeader);
        addInfoBox.appendChild(namnInput);
        addInfoBox.appendChild(telefonInputHeader);
        addInfoBox.appendChild(telefonInput);
        addInfoBox.appendChild(mailInputHeader);
        addInfoBox.appendChild(mailInput);
        mailTemplateContainer.appendChild(addInfoBox);

        // Create the "Skicka förfrågan" (Send Inquiry) button
        const sendButton = document.createElement("button");
        sendButton.textContent = "Skicka förfrågan";
        sendButton.classList.add("search-button");
        sendButton.classList.add("continue-button");
        mailTemplateContainer.appendChild(sendButton);

        // Append the elements to the calendar and mail template containers
        calendarContainer.appendChild(prevMonthButton);
        calendarContainer.appendChild(nextMonthButton);

        mailTemplateContainer.appendChild(sendButton);

        rightSplit.appendChild(calendarContainer);
        rightSplit.appendChild(mailTemplateContainer);
        initiateCalendar();
      })
      .catch((error) => {
        console.error("Error performing geocoding search:", error);
      });

    /* venuePage.appendChild(mapContainer); */

    // Continue building the rest of the venue page structure
    // Description, checkboxes, map, etc.
  }

  function initiateCalendar() {
    // Get the calendar container
    console.log("Calendar container found");
    const calendarContainer = document.querySelector(".calendar-container");

    // HTML structure for the calendar
    calendarContainer.innerHTML = `
  <div class="calendar">
    <div class="calendar-header">
      <button id="prevMonth">&lt;</button>
      <h2 id="currentMonth">Month Year</h2>
      <button id="nextMonth">&gt;</button>
    </div>
    <div class="calendar-days">
      <div class="day">Mån</div>
      <div class="day">Tis</div>
      <div class="day">Ons</div>
      <div class="day">Tor</div>
      <div class="day">Fre</div>
      <div class="day">Lör</div>
      <div class="day">Sön</div>
    </div>
    <div class="calendar-grid" id="calendarGrid"></div>
    <input
      type="text"
      id="selectedDate"
      placeholder="Selected Date"
      readonly
    />
  </div>
`;

    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const currentMonthHeader = document.getElementById("currentMonth");
    const calendarGrid = document.getElementById("calendarGrid");
    const selectedDateInput = document.getElementById("selectedDate");

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let currentDate = new Date();

    function updateCalendar() {
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      currentMonthHeader.textContent = new Intl.DateTimeFormat("sv-SE", {
        year: "numeric",
        month: "long",
      }).format(currentDate);
      calendarGrid.innerHTML = "";

      for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const emptyCell = document.createElement("div");
        calendarGrid.appendChild(emptyCell);
      }

      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day-cell");
        dayCell.textContent = i;

        dayCell.addEventListener("click", () => {
          const selectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i
          );
          selectedDateInput.value = selectedDate.toLocaleDateString("sv-SE");
          resetSelectedDate();

          // Remove the existing mail template container if it exists
          const existingMailTemplateContainer = rightSplit.querySelector(
            ".mail-template-container"
          );
          if (existingMailTemplateContainer) {
            rightSplit.removeChild(existingMailTemplateContainer);
          }
          dayCell.classList.add("selected");

          const template = `Hej!

Jag är intresserad av att hyra lokalen den ${selectedDate.toLocaleDateString(
            "sv-SE"
          )}, och enligt nedan specifikationer:
          
Deltagarantal: 
Tid:
Beskrivning: 
Särskilda önskemål: 

Tack på förhand!`;

          // Create the mail template container
          const mailTemplateContainer = document.createElement("div");
          mailTemplateContainer.classList.add("mail-template-container");

          // Create the mail template text input
          const mailTemplateInput = document.createElement("textarea");
          mailTemplateInput.value = template;

          // Append the mail template input to the mail template container
          mailTemplateContainer.appendChild(mailTemplateInput);

          // Create the "Uppgifter till kontaktperson" (Contact person information) box
          const addInfoBox = document.createElement("div");
          addInfoBox.classList.add("add-info-box");

          // Create input fields for Namn, Telefon, and Mail
          const namnInput = document.createElement("input");
          namnInput.id = "contactName";
          namnInput.type = "text";
          namnInput.placeholder = "Kontaktpersonens namn";

          const telefonInput = document.createElement("input");
          telefonInput.id = "contactPhone";
          telefonInput.type = "tel";
          telefonInput.placeholder = "Kontaktpersonens telefonnummer";

          const mailInput = document.createElement("input");
          mailInput.id = "contactMail";
          mailInput.type = "email";
          mailInput.placeholder = "Kontaktpersonens e-postadress";

          // Create input headers for Namn, Telefon, and Mail
          const namnInputHeader = document.createElement("p");
          namnInputHeader.classList.add("input-header");
          namnInputHeader.textContent = "Namn:";

          const telefonInputHeader = document.createElement("p");
          telefonInputHeader.classList.add("input-header");
          telefonInputHeader.textContent = "Telefon:";

          const mailInputHeader = document.createElement("p");
          mailInputHeader.classList.add("input-header");
          mailInputHeader.textContent = "Mail:";

          // Append input fields and headers to the addInfoBox
          addInfoBox.appendChild(namnInputHeader);
          addInfoBox.appendChild(namnInput);
          addInfoBox.appendChild(telefonInputHeader);
          addInfoBox.appendChild(telefonInput);
          addInfoBox.appendChild(mailInputHeader);
          addInfoBox.appendChild(mailInput);
          mailTemplateContainer.appendChild(addInfoBox);

          // Create the "Skicka förfrågan" (Send Inquiry) button
          const sendButton = document.createElement("button");
          sendButton.textContent = "Skicka förfrågan";
          sendButton.classList.add("search-button");
          sendButton.classList.add("continue-button");
          mailTemplateContainer.appendChild(sendButton);

          // Append the mail template container to the right split
          rightSplit.appendChild(mailTemplateContainer);
        });

        calendarGrid.appendChild(dayCell);
      }
    }

    function resetSelectedDate() {
      const selectedCells = document.querySelectorAll(".day-cell.selected");
      selectedCells.forEach((cell) => {
        cell.classList.remove("selected");
      });
    }

    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar();
    });

    updateCalendar();
  }
});
