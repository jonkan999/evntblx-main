import os
import sys
import json
# Add the parent folder of firebase_functions to the Python path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__),  '..'))
sys.path.append(parent_dir)
from python.firebase.firebase_functions import read_all_from_venues
from python.save_images import save_images
from jinja2 import Environment, FileSystemLoader

# Set up Jinja2 environment
def extract_first_ten_words(description):
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

env = Environment(loader=FileSystemLoader(searchpath="/app/repo"))
env.filters['extract_first_ten_words'] = extract_first_ten_words
env.filters['format_thousands'] = format_thousands
main_template = env.get_template("/venue_box_seo_template.html")

# Get venues data from Firebase (you should replace this with your actual method)
venues = read_all_from_venues()
# Function to clean and format the venue name for the output filename
def clean_filename(name):
    name = name.replace('-', ' ').replace('/', '').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').lower()
    return '-'.join(name.split())

# Read the seed file
seed_file_path_suffixes = [
    "sodermalm_seed.json",
    "vasastan_seed.json",
    "enskede_seed.json",
    "nacka_seed.json",
    "solna_seed.json",    
]
seed_file_paths = [os.path.join("/app/repo/venues/python/seo_seeds/", suffix) for suffix in seed_file_path_suffixes]
for seed_file_path in seed_file_paths:

  try:
      with open(seed_file_path, 'r', encoding="utf-8") as seed_file:
          seed_data = json.load(seed_file)
          included_venue_names = seed_data.get("includedVenues", [])
          seed_additional_data = {
              'path_suffix': seed_data.get("path_suffix", ""),
              'title': seed_data.get("title", ""),
              'description': seed_data.get("description", ""),
              'header': seed_data.get("header", ""),
              'text': seed_data.get("text", ""),
          }
          print("Included venues: " + str(included_venue_names))
  except FileNotFoundError:
      included_venue_names = []
      seed_additional_data = {}


  # Filter venues based on includedVenues list
  included_venues = []
  for venue_name in included_venue_names:
      print("Looking for venue: " + venue_name)
      for venue in venues:
          if venue['venueInfo']['name'] == venue_name:
              included_venues.append(venue)

  list_of_filepaths = []

  for venue in included_venues:
      cleaned_name = clean_filename(venue['venueInfo']['name'])
      # Save images associated with the venue
      images_folder = os.path.join("/app/repo/venues/img")
      os.makedirs(images_folder, exist_ok=True)
      image_paths = save_images(venue['venueImages']['images'], images_folder, cleaned_name)
      list_of_filepaths.append(image_paths)

  context = {
      'venues': included_venues,  # Use the filtered venues list
      'list_of_filepaths': list_of_filepaths,  # Pass the filename prefix here
      'seed_additional_data': seed_additional_data  # Include additional key-values from the seed data
  }
  print(seed_additional_data['path_suffix'])
  # Render the main template with the filtered venues data
  rendered_html = main_template.render(context=context)

  # Write the rendered HTML content to a new file
  output_filename = f"festlokaler-{seed_additional_data['path_suffix']}.html"
  output_path = os.path.join("/app/repo/", output_filename)
  with open(output_path, "w", encoding="utf-8") as output_file:
      output_file.write(rendered_html)

  print("Updated HTML file generated successfully.")
