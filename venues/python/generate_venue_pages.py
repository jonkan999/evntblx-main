import os
import sys
from save_images import save_images
from firebase.firebase_functions import read_all_from_venues
from jinja2 import Environment, FileSystemLoader

# Get the directory path of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

def format_thousands(value):
    try:
        numeric_value = float(value)
        return "{:,.0f}".format(numeric_value)
    except (ValueError, TypeError):
        return value

# Set up Jinja2 environment
template_path = os.path.join(script_dir, "venue_template.html")
env = Environment(loader=FileSystemLoader(searchpath=script_dir))
# Register the filter function with the Jinja2 environment
env.filters['format_thousands'] = format_thousands
template = env.get_template("venue_template.html")

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
    images_folder = os.path.join("C:/Users/engjoe/festlokalerstockholm/venues/img")
    os.makedirs(images_folder, exist_ok=True)
    image_paths=save_images(venue['venueImages']['images'], images_folder, cleaned_name)
    context = {
        'venue': venue,
        'image_paths': image_paths  # Pass the filename prefix here
    }
    
    # Render the Jinja2 template with the data
    html_content = template.render(context=context)

    # Create a new HTML file
    output_path = os.path.join("C:/Users/engjoe/festlokalerstockholm/venues", f"{cleaned_name}.html")
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as output_file:
        output_file.write(html_content)

print("HTML files generated successfully.")
