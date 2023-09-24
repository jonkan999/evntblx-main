import os
import json
from ..firebase.firebase_functions import read_all_from_venues
from jinja2 import Environment, FileSystemLoader
from save_images import save_images

# Set up Jinja2 environment
def extract_first_ten_words(description):
    words = description.split()
    return_string=' '.join(words[:14])
    return_string+='...'
    return return_string
def format_thousands(value):
    try:
        numeric_value = float(value)
        return "{:,.0f}".format(numeric_value)
    except (ValueError, TypeError):
        return value

env = Environment(loader=FileSystemLoader(searchpath="C:/Users/Joel/evntblx-main/venues/python"))
env.filters['extract_first_ten_words'] = extract_first_ten_words
env.filters['format_thousands'] = format_thousands
main_template = env.get_template("venue_box_template.html")

# Get venues data from Firebase (you should replace this with your actual method)
venues = read_all_from_venues()
# Function to clean and format the venue name for the output filename
def clean_filename(name):
    name = name.replace('-', ' ').replace('/', '').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').lower()
    return '-'.join(name.split())

# Read the seed file and extract priority venues
seed_file_path = "C:/Users/Joel/evntblx-main/venues/python/venue_priority_seed.json"  # Update with the actual path
try:
    with open(seed_file_path, 'r', encoding="utf-8") as seed_file:
        seed_data = json.load(seed_file)
        priority_venue_names = seed_data.get("priorityVenues", [])
except FileNotFoundError:
    priority_venue_names = []

# Reorder the venues list based on the priority in the seed file
ordered_venues = []
print("Priority venues: " + str(priority_venue_names))
for venue_name in priority_venue_names:
    print("Looking for venue: " + venue_name)
    for venue in venues:
        if venue['venueInfo']['name'] == venue_name:
            ordered_venues.append(venue)
            print("Added venue: " + venue_name)

# Add remaining venues that are not in the priority list
remaining_venues = [venue for venue in venues if venue['venueInfo']['name'] not in priority_venue_names]
ordered_venues.extend(remaining_venues)

list_of_filepaths = []

for venue in ordered_venues:
    cleaned_name = clean_filename(venue['venueInfo']['name'])
    # Save images associated with the venue
    images_folder = os.path.join("C:/Users/Joel/evntblx-main/venues/img")
    os.makedirs(images_folder, exist_ok=True)
    image_paths = save_images(venue['venueImages']['images'], images_folder, cleaned_name)
    list_of_filepaths.append(image_paths)


context = {
    'venues': ordered_venues,  # Use the ordered venues list
    'list_of_filepaths': list_of_filepaths  # Pass the filename prefix here
}

# Render the main template with the ordered venues data
rendered_html = main_template.render(context=context)

# Write the rendered HTML content to a new file
output_path = os.path.join("C:/Users/Joel/evntblx-main/", "festlokaler-stockholm.html")
with open(output_path, "w", encoding="utf-8") as output_file:
    output_file.write(rendered_html)

print("Updated HTML file generated successfully.")