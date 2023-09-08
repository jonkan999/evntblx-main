// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Fetch the Firebase config from the serverless function
fetch("/.netlify/functions/getFirebaseConfig")
  .then((response) => response.json())
  .then((firebaseConfig) => {
    // Parse the fetched JSON string
    const config = JSON.parse(firebaseConfig);
    // Initialize Firebase
    const app = initializeApp(config);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    // Rest of your code...
    // Function to handle submission for request emails
    async function handleRequestEmail() {
      // Check if the message textarea is not empty and other fields have values
      const messageTextarea = document.querySelector("textarea");
      const contactNameInput = document.querySelector("#contactName");
      const contactPhoneInput = document.querySelector("#contactPhone");
      const contactMailInput = document.querySelector("#contactMail");
      const errorMessage = document.getElementById("errorMessage");

      if (
        messageTextarea.value.trim() === "" ||
        contactNameInput.value.trim() === "" ||
        contactPhoneInput.value.trim() === "" ||
        contactMailInput.value.trim() === ""
      ) {
        errorMessage.textContent =
          "Fyll i meddelandet och alla kontaktuppgifter, tack!";
        errorMessage.style.opacity = "1";
        // Hide the error message after 7 seconds
        setTimeout(() => {
          errorMessage.style.opacity = "0";
        }, 6000); // 7000 milliseconds = 7 seconds

        return;
      }
      // Clear any existing error message if all fields are filled
      errorMessage.textContent = "";
      errorMessage.style.opacity = "0";

      // Get data for the request email
      const timestamp = serverTimestamp();
      const name = document.querySelector(".event-space-title").textContent;
      const hostEmail = document
        .querySelector('li:contains("Kontaktmail:")')
        .textContent.split(":")[1]
        .trim();
      const requesterInfo = {
        name: contactNameInput.value.trim(),
        phone: contactPhoneInput.value.trim(),
        email: contactMailInput.value.trim(),
      };
      const message = messageTextarea.value.trim();

      // Reference to the "venue_request_emails" collection
      const requestEmailsCollection = collection(db, "venue_request_emails");

      try {
        // Add a new document to the "venue_request_emails" collection
        await addDoc(requestEmailsCollection, {
          timestamp,
          name,
          hostEmail,
          requesterInfo,
          message,
        });
        console.log("Request email added to Firestore");
        // You can perform further actions or show a success message here
        // Show the popup
        const popup = document.getElementById("popupRequestAdded");
        popup.style.display = "block";

        // Hide the popup after a certain time (e.g., 3 seconds)
        setTimeout(() => {
          popup.style.display = "none";
        }, 3000); // 3000 milliseconds = 3 seconds
      } catch (error) {
        console.error("Error adding request email: ", error);
        // Handle the error or show an error message
        // Show the popup
        const popup = document.getElementById("popupRequestFailed");
        popup.style.display = "block";

        // Hide the popup after a certain time (e.g., 3 seconds)
        setTimeout(() => {
          popup.style.display = "none";
        }, 3000); // 3000 milliseconds = 3 seconds
      }
    }
    // Attach the handleRequestEmail function to the "Skicka förfrågan" button's click event
    const requestButton = document.querySelector(".continue-button");
    requestButton.addEventListener("click", handleRequestEmail);
  })
  .catch((error) => {
    console.error("Error fetching Firebase config:", error);
  });
