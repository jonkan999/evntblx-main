/* HANDLE LABELS */
const venueInfoJSON = localStorage.getItem("venueInfo");

console.log(JSON.parse(venueInfoJSON));
const imageUpload = document.getElementById("imageUpload");
const fileUploadStatus = document.getElementById("fileUploadStatus");

imageUpload.addEventListener("change", function () {
  if (imageUpload.files.length > 0) {
    if (imageUpload.files.length === 1) {
      fileUploadStatus.textContent = "1 bild vald";
    } else {
      fileUploadStatus.textContent = imageUpload.files.length + " bilder valda";
    }
  } else {
    fileUploadStatus.textContent = "Inga bilder valda";
  }
});

/* HANDLE UPLOAD BUTTON */

// Retrieve images from local storage on page load
const venueImagesJSON = localStorage.getItem("venueImages");
const venueImagesData = venueImagesJSON
  ? JSON.parse(venueImagesJSON)
  : { images: [] };

// Function to handle image uploads
function handleImageUpload(event) {
  const files = event.target.files;
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      venueImagesData.images.push(e.target.result); // Store data URI
      // Update local storage with the new images
      localStorage.setItem("venueImages", JSON.stringify(venueImagesData));
      // Update the page to show the uploaded image
      displayImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

/* HANDLE DRAG AND DROP AREA */
const dragDropArea = document.getElementById("dragDropArea");

// Prevent default drag behavior to enable drop
dragDropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  if (!dragDropArea.classList.contains("dragging-over")) {
    dragDropArea.classList.add("dragging-over");
    dragDropArea.style.transform = "scale(1.11)"; // Scale up when hovering
  }
});

// Revert style changes when drag leaves the area
dragDropArea.addEventListener("dragleave", (event) => {
  const rect = dragDropArea.getBoundingClientRect();
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  if (
    mouseX < rect.left ||
    mouseX > rect.right ||
    mouseY < rect.top ||
    mouseY > rect.bottom
  ) {
    dragDropArea.classList.remove("dragging-over");
    dragDropArea.style.transform = ""; // Remove scaling when leaving
  }
});

// Handle the dropped files
dragDropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dragDropArea.classList.remove("dragging-over");
  dragDropArea.style.transform = ""; // Remove scaling when dropping

  const files = event.dataTransfer.files;
  handleImageUpload({ target: { files } });
});

/* DISPLAY IMAGES */

// Function to display uploaded image
function displayImage(imageData) {
  const imgContainer = document.createElement("div");
  imgContainer.className = "uploaded-image-container";

  const img = document.createElement("img");
  img.src = imageData;

  const deleteIcon = document.createElement("ion-icon");
  deleteIcon.classList.add("icon", "delete-icon");
  deleteIcon.setAttribute("name", "close-circle-outline");
  deleteIcon.addEventListener("click", function () {
    removeImage(imageData);
    refreshImageDisplay();
  });

  imgContainer.appendChild(img);
  imgContainer.appendChild(deleteIcon);

  document.querySelector(".image-container").appendChild(imgContainer);
}

// Function to remove an image from the list
function removeImage(imageData) {
  console.log(imageData);
  venueImagesData.images = venueImagesData.images.filter(
    (image) => image !== imageData
  );
  // Update local storage after removing image
  localStorage.setItem("venueImages", JSON.stringify(venueImagesData));
}

// Function to refresh the image display
function refreshImageDisplay() {
  const imageContainer = document.querySelector(".image-container");
  // Clear the image container
  imageContainer.innerHTML = "";
  // Re-display remaining images
  venueImagesData.images.forEach((imageData) => displayImage(imageData));
}

// Listen for file input change event
const fileInput = document.getElementById("imageUpload");
fileInput.addEventListener("change", handleImageUpload);

const imageContainer = document.querySelector(".image-container");

imageContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-icon")) {
    const uploadedImage = event.target.closest(".uploaded-image-container");
    const index = Array.from(imageContainer.children).indexOf(uploadedImage);

    if (index !== -1) {
      removeImage(venueImagesData.images[index]);
      refreshImageDisplay();
    }
  }
});

// Initial display of images
refreshImageDisplay();
