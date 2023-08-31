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

// Your web app's Firebase configuration
import firebaseConfig from "./config.js";

// Fetch the Firebase config from the serverless function
fetch("/.netlify/functions/getFirebaseConfig")
  .then((response) => response.json())
  .then((firebaseConfig) => {
    // Now you have the Firebase config, you can use it in your app
    // For example, you can import it where needed
    import("./config.js")
      .then((module) => {
        module.default = firebaseConfig;
        // Now you can use the firebaseConfig object as if it were imported from './config.js'

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

        // Get a reference to the Firestore database
        const db = getFirestore(app);

        // Function to handle submission

        async function handleSubmit() {
          // Get venue data from localStorage
          const venueInfoJSON = localStorage.getItem("venueInfo");
          const venueImagesJSON = localStorage.getItem("venueImages");
          const mapboxCenterJSON = localStorage.getItem("mapboxCenter");

          // Convert JSON strings to objects
          const venueInfo = JSON.parse(venueInfoJSON);
          const venueImages = JSON.parse(venueImagesJSON);
          const mapboxCenter = JSON.parse(mapboxCenterJSON);

          // Reference to the "venues" collection
          const venuesCollection = collection(db, "venues");

          // Create a query to check if a document with the same name exists
          const querySnapshot = await getDocs(
            query(
              venuesCollection,
              where("venueInfo.name", "==", venueInfo.name)
            )
          );

          if (!querySnapshot.empty) {
            console.log("Venue with the same name already exists.");
            // Show a popup or display a message indicating that the venue already exists

            // Show the popup
            const popup = document.getElementById("popup");
            popup.style.display = "block";

            // Hide the popup after a certain time (e.g., 3 seconds)
            setTimeout(() => {
              popup.style.display = "none";
            }, 3000); // 3000 milliseconds = 3 seconds
            return;
          }

          // Add a new document to the "venues" collection with the submitted data
          try {
            await addDoc(venuesCollection, {
              venueInfo,
              venueImages,
              mapboxCenter,
              timestamp: serverTimestamp(),
              // ... Other data ...
            });
            console.log("Venue data added to Firestore");
            // You can perform further actions or show a success message here
            // Show the popup
            const popup = document.getElementById("popupAdded");
            popup.style.display = "block";

            // Hide the popup after a certain time (e.g., 3 seconds)
            setTimeout(() => {
              popup.style.display = "none";
            }, 3000); // 3000 milliseconds = 3 seconds
          } catch (error) {
            console.error("Error adding venue data: ", error);
            // Handle the error or show an error message
            // Show the popup
            const popup = document.getElementById("popupFailed");
            popup.style.display = "block";

            // Hide the popup after a certain time (e.g., 3 seconds)
            setTimeout(() => {
              popup.style.display = "none";
            }, 3000); // 3000 milliseconds = 3 seconds
          }
        }
        // Attach the handleSubmit function to the submit button's click event
        const submitButton = document.getElementById("submit");
        submitButton.addEventListener("click", handleSubmit);
      })
      .catch((error) => {
        console.error("Error importing config:", error);
      });
  })
  .catch((error) => {
    console.error("Error fetching Firebase config:", error);
  });
