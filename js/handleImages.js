const venueInfoJSON = localStorage.getItem("venueInfo");
console.log(JSON.parse(venueInfoJSON));
const test = localStorage.getItem("venueImages");
console.log(JSON.parse(test));
const imageUpload = document.getElementById("imageUpload");
const fileUploadStatus = document.getElementById("fileUploadStatus");

/* HANDLE CLEAR IMAGES BUTTON */
const clearImagesButton = document.getElementById("clearImagesButton");
clearImagesButton.addEventListener("click", function () {
  // Clear images from local storage
  localStorage.removeItem("venueImages");
  // Clear the image display on the page
  refreshImageDisplay();

  // Reset file upload status
  fileUploadStatus.textContent = "Inga bilder valda";
  location.reload();
});

/* HANDLE LABELS */
imageUpload.addEventListener("change", function () {
  if (imageUpload.files.length > 0) {
    const fileNames = [];
    for (const file of imageUpload.files) {
      fileNames.push(`${file.name} (${formatFileSize(file.size)})`);
    }
    fileUploadStatus.textContent = fileNames.join(", ");
  } else {
    fileUploadStatus.textContent = "Inga bilder valda";
  }
});

// Function to format file size
function formatFileSize(size) {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
}

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
