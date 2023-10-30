import os
import sys
import json
# Add the parent folder of firebase_functions to the Python path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__),  '..'))
sys.path.append(parent_dir)
from python.firebase.firebase_functions import read_all_from_venues
from python.save_images import save_images
from jinja2 import Environment, FileSystemLoader

def extract_first_ten_words(description):
    description = description.replace("<br>", " ")
    words = description.split()
    return_string = ' '.join(words[:14])
    return_string += '...'
    return return_string

def format_thousands(value):
    try:
        numeric_value = float(value)
        return "{:,.0f}".format(numeric_value)
    except (ValueError, TypeError):
        return value
    
# Set up Jinja2 environment

# Update the path to the template directory to use the /app directory within the container
env = Environment(loader=FileSystemLoader(searchpath="/app/repo"))

env.filters['extract_first_ten_words'] = extract_first_ten_words
env.filters['format_thousands'] = format_thousands
main_template = env.get_template("/venues/python/venue_box_template.html")

# Get venues data from Firebase (you should replace this with your actual method)
venues = read_all_from_venues()

# Function to clean and format the venue name for the output filename
def clean_filename(name):
    name = name.replace('-', ' ').replace('/', '').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').lower()
    return '-'.join(name.split())

# Update the path to the seed file to use the /app directory within the container
seed_file_path = "/app/repo/venues/python/venue_priority_seed.json"

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
    images_folder = "/app/repo/venues/img"
    os.makedirs(images_folder, exist_ok=True)
    image_paths = save_images(venue['venueImages']['images'], images_folder, cleaned_name)
    list_of_filepaths.append(image_paths)

# Pop venues with special types, e.g yoga studios
# Split the context based on venue type

# festlokaler_context
festlokaler_context = {
    'venues': [venue for venue in ordered_venues if venue.get('venueInfo', {}).get('venueType') != 'yoga'],
    'list_of_filepaths': [filepaths for i, filepaths in enumerate(list_of_filepaths) if ordered_venues[i].get('venueInfo', {}).get('venueType') != 'yoga'],
    'venue_type': 'festlokaler'
}

# yoga_studios_context
yoga_studios_context = {
    'venues': [venue for venue in ordered_venues if venue.get('venueInfo', {}).get('venueType') == 'yoga'],
    'list_of_filepaths': [filepaths for i, filepaths in enumerate(list_of_filepaths) if ordered_venues[i].get('venueInfo', {}).get('venueType') == 'yoga'],
    'venue_type': 'yoga'
}


def render_and_write_html(output_path, context, template):
    # Render the template with the provided context
    rendered_html = template.render(context=context)

    # Write the rendered HTML content to the specified output file
    with open(output_path, "w", encoding="utf-8") as output_file:
        output_file.write(rendered_html)

print("Rendering and writing HTML files..." +yoga_studios_context['venue_type'])
render_and_write_html("/app/repo/festlokaler-stockholm.html", festlokaler_context, main_template)

render_and_write_html("/app/repo/yoga-studios-stockholm.html", yoga_studios_context, main_template)


