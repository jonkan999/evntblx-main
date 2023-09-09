import os
import base64

def save_images(images_data, output_folder, filename_prefix):
    image_paths = []  # List to store image paths
    for i, image_data in enumerate(images_data):
        try:
            # Split the image data string to get the format and actual Base64 data
            format, data = image_data.split(";base64,")
            extension = format.split("/")[-1]  # Extract the file extension

            # Create a filename for the image based on the index and format
            filename = f"{filename_prefix}_{i}.{extension}"
            
            # Save the binary data to a file in the output folder
            with open(os.path.join(output_folder, filename), "wb") as image_file:
                image_file.write(base64.b64decode(data))

            # Append the image path to the list
            image_paths.append(f"/venues/img/{filename}")
            
            print(f"Image {i} saved as {image_paths[-1]}")
        except Exception as e:
            print(f"Error saving image {i}: {str(e)}")
    
    return image_paths



