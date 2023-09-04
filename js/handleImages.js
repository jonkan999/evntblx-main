const venueInfoJSON = localStorage.getItem("venueInfo");

const test = localStorage.getItem("venueImages");

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

// Function to handle image uploads with iterative compression

/* async function handleImageUpload(event) {
  showLoadingSpinner();
  const files = event.target.files;
  const promises = []; // Create an array to store the promises
  const numImagesInStorage = venueImagesData.images.length; // Get the number of images already in storage
  const maxNumImages = 10 - numImagesInStorage; // Calculate the maximum number of images that can be uploaded
  const targetSize = 500000; // 500 kB
  for (let i = 0; i < files.length && i < maxNumImages; i++) {
    const file = files[i];
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result;

        // Create an image element to load the image
        const image = new Image();
        image.src = imageData;

        image.onload = async () => {
          // Create a canvas to draw the compressed image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the initial canvas dimensions
          let newWidth = image.width;
          let newHeight = image.height;

          // Calculate the current image size
          const currentSize = imageData.length;

          // Use linear regression to estimate the compression quality that results in the target size

          let compressionQuality = 0.9;
          let newSize = currentSize;
          while (newSize > targetSize) {
            // Adjust the compression quality
            const stepSize = newSize > targetSize * 1.5 ? 0.2 : 0.1;
            compressionQuality -= stepSize;

            // Set the canvas dimensions for compression
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the image on the canvas with the compressed dimensions
            ctx.drawImage(image, 0, 0, newWidth, newHeight);

            // Convert the canvas data to a compressed JPEG image
            const compressedImageData = canvas.toDataURL(
              "image/jpeg",
              compressionQuality
            );

            // Calculate the new image size
            newSize = compressedImageData.length;
          }

          // Compress the image using the estimated compression quality
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(image, 0, 0, newWidth, newHeight);
          const compressedImageData = canvas.toDataURL(
            "image/jpeg",
            compressionQuality
          );

          // Store the compressed image data
          venueImagesData.images.push(compressedImageData);

          // Update local storage with the new images
          localStorage.setItem("venueImages", JSON.stringify(venueImagesData));

          // Update the page to show the uploaded image
          displayImage(compressedImageData);

          resolve(); // Resolve the promise when the image processing is complete
        };
      };
      reader.readAsDataURL(file);
    });
    promises.push(promise); // Push the promise into the array
  }

  // Wait for all promises to resolve
  await Promise.all(promises);

  hideLoadingSpinner(); // Execute the hide loading spinner function after the for loop is complete
} */

async function handleImageUpload(event) {
  showLoadingSpinner();
  const files = event.target.files;
  const promises = []; // Create an array to store the promises
  const numImagesInStorage = venueImagesData.images.length; // Get the number of images already in storage
  const allowedImages = 8;
  const maxFileSize = 1048576 / allowedImages; // Calculate the maximum file size for each image
  const maxNumImages = allowedImages - numImagesInStorage; // Calculate the maximum number of images that can be uploaded
  console.log(files.maxNumImages);
  console.log(files.length);

  if (files.length > maxNumImages) {
    alert(
      `Du kan bara ladda upp fler bilder då vår nuvarande gräns är ${allowedImages} bilder per lokal.`
    );
    hideLoadingSpinner();
    return;
  }
  for (let i = 0; i < files.length && i < maxNumImages; i++) {
    const file = files[i];
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result;

        // Create an image element to load the image
        const image = new Image();
        image.src = imageData;

        image.onload = async () => {
          // Create a canvas to draw the compressed image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the initial canvas dimensions
          let newWidth = image.width;
          let newHeight = image.height;
          // Calculate the current image size
          const currentSize = imageData.length;
          // Iteratively compress the image until the size is within the threshold
          let compressionQuality = 0.9; // Start with a high quality
          let compressedImageData = "";
          let newSize = maxFileSize;
          while (
            compressedImageData.length > maxFileSize ||
            compressedImageData.length === 0
          ) {
            // Adjust the compression quality
            const stepSize = newSize > maxFileSize * 1.5 ? 0.2 : 0.1;
            compressionQuality -= stepSize;

            // Set the canvas dimensions for compression
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the image on the canvas with the compressed dimensions
            ctx.drawImage(image, 0, 0, newWidth, newHeight);

            // Convert the canvas data to a compressed WebP image
            compressedImageData = canvas.toDataURL(
              "image/webp",
              compressionQuality
            );

            // Update the dimensions for the next iteration
            newWidth *= 0.9; // Reducing width
            newHeight *= 0.9; // Reducing height
            // Calculate the new image size
            newSize = compressedImageData.length;
          }

          // Store the compressed image data
          venueImagesData.images.push(compressedImageData);

          // Update local storage with the new images
          localStorage.setItem("venueImages", JSON.stringify(venueImagesData));

          // Update the page to show the uploaded image
          displayImage(compressedImageData);

          resolve(); // Resolve the promise when the image processing is complete
        };
      };
      reader.readAsDataURL(file);
    });
    promises.push(promise); // Push the promise into the array
  }

  // Wait for all promises to resolve
  await Promise.all(promises);

  hideLoadingSpinner(); // Execute the hide loading spinner function after the for loop is complete
}
// Function to show the loading spinner
function showLoadingSpinner() {
  const loadingOverlay = document.getElementById("loadingOverlay");

  loadingOverlay.style.display = "flex";
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "none";
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
