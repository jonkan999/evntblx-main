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
  updateDoc,
  doc,
  setDoc,
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
    console.log("fetching config");
    // Rest of your code...
    // Function to handle submission for request emails
    async function handleRequestEmail() {
      // Check if the message textarea is not empty and other fields have values
      const messageTextarea = document.querySelector("textarea");
      const contactNameInput = document.querySelector("#contactName");
      const contactPhoneInput = document.querySelector("#contactPhone");
      const contactMailInput = document.querySelector("#contactMail");
      const errorMessage = document.getElementById("errorMessage");
      console.log("inside handleRequestEmail");
      if (
        messageTextarea.value.trim() === "" ||
        contactNameInput.value.trim() === "" ||
        contactPhoneInput.value.trim() === "" ||
        contactMailInput.value.trim() === ""
      ) {
        console.log(errorMessage);
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
      const hostEmailElement = document.querySelector("li.contact-mail");
      const hostEmail = hostEmailElement.getAttribute("data-contact-mail");
      const requesterInfo = {
        name: contactNameInput.value.trim(),
        phone: contactPhoneInput.value.trim(),
        email: contactMailInput.value.trim(),
      };
      const message = messageTextarea.value.trim();

      // Reference to the "venue_request_emails" collection
      const requestEmailsCollection = collection(db, "venue_request_emails");
      console.log("Trying to add request email to Firestore");
      try {
        // Concatenate the name with the timestamp to form the document ID
        const timestampJS = new Date().getTime().toString(36); // Convert timestamp to string
        const documentId = `${requesterInfo.name}_${name}_${timestampJS}`;

        // Add a new document to the "venue_request_emails" collection with the concatenated document ID
        await setDoc(doc(requestEmailsCollection, documentId), {
          name,
          hostEmail,
          requesterInfo,
          message,
          timestamp,
        });
        console.log("Request email added to Firestore");
        // Reuse the errorMessage element for success message
        console.log(errorMessage);
        errorMessage.textContent =
          "Meddelandet har nu skickats till lokalvärden som återkommer till dig snarast, tack!";
        errorMessage.style.opacity = "1";

        // Hide the success message after 7 seconds
        setTimeout(() => {
          errorMessage.style.opacity = "0";
        }, 7000); // 7000 milliseconds = 7 seconds
      } catch (error) {
        console.error("Error adding request email: ", error);
        // Handle the error or show an error message
        // Show the popup
        // Reuse the errorMessage element for success message
        errorMessage.textContent =
          "Kunde tyvärr inte skicka meddelandet, försök igen senare!";
        errorMessage.style.opacity = "1";

        // Hide the success message after 7 seconds
        setTimeout(() => {
          errorMessage.style.opacity = "0";
        }, 7000); // 7000 milliseconds = 7 seconds
      }
    }
    // Attach the handleRequestEmail function to the "Skicka förfrågan" button's click event
    const requestButton = document.querySelector(".continue-button");
    requestButton.addEventListener("click", handleRequestEmail);
  })
  .catch((error) => {
    console.error("Error fetching Firebase config:", error);
  });
