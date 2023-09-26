import os
import sys
import json
# Add the parent folder of firebase_functions to the Python path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__),  '..'))
sys.path.append(parent_dir)
from python.firebase.firebase_functions import read_all_from_venues
from python.save_images import save_images
from jinja2 import Environment, FileSystemLoader


def format_thousands(value):
    try:
        numeric_value = float(value)
        return "{:,.0f}".format(numeric_value)
    except (ValueError, TypeError):
        return value

# Set up Jinja2 environment
# Update the path to the template directory to use the /app directory within the container
env = Environment(loader=FileSystemLoader(searchpath="/app/repo"))

# Register the filter function with the Jinja2 environment
env.filters['format_thousands'] = format_thousands
template = env.get_template("/venues/python/venue_template.html")

venues = read_all_from_venues()


# Function to clean and format the venue name for the output filename
def clean_filename(name):
    name = name.replace('-', ' ').replace('/', '').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').lower()
    return '-'.join(name.split())




# Generate HTML files for each venue
for venue in venues:
    print("Generates:" + venue["venueInfo"]["name"] + ".html")
    cleaned_name = clean_filename(venue['venueInfo']['name'])

    # Save images associated with the venue

    # Combine the root directory and the relative path to create the full path
    images_folder = "/app/repo/venues/img"

    # Create the directory if it doesn't exist
    os.makedirs(images_folder, exist_ok=True)
    image_paths=save_images(venue['venueImages']['images'], images_folder, cleaned_name)
    context = {
        'venue': venue,
        'image_paths': image_paths  # Pass the filename prefix here
    }
    
    # Render the Jinja2 template with the data
    html_content = template.render(context=context)

    # Combine the root directory and the relative path to create the full path
    os_relative_path = "/app/repo/venues"
    output_path = os.path.join(os_relative_path, f"{cleaned_name}.html")
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as output_file:
        output_file.write(html_content)

print("HTML files generated successfully.")
