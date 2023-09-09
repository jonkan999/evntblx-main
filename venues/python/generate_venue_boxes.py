import os
from firebase.firebase_functions import read_all_from_venues
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

env = Environment(loader=FileSystemLoader(searchpath="C:/Users/engjoe/festlokalerstockholm/venues/python"))
env.filters['extract_first_ten_words'] = extract_first_ten_words
env.filters['format_thousands'] = format_thousands
main_template = env.get_template("venue_box_template.html")

# Get venues data from Firebase (you should replace this with your actual method)
venues = read_all_from_venues()
# Function to clean and format the venue name for the output filename
def clean_filename(name):
    name = name.replace('-', ' ').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').lower()
    return '-'.join(name.split())

list_of_filepaths=[]
for venue in venues:
    cleaned_name = clean_filename(venue['venueInfo']['name'])
    # Save images associated with the venue
    images_folder = os.path.join("C:/Users/engjoe/festlokalerstockholm/venues/img")
    os.makedirs(images_folder, exist_ok=True)
    image_paths=save_images(venue['venueImages']['images'], images_folder, cleaned_name)
    list_of_filepaths.append(image_paths)

context = {
     'venues': venues,
     'list_of_filepaths': list_of_filepaths  # Pass the filename prefix here
 }
print(context['venues'][0]['venueInfo'])
# Render the main template with the venues data
rendered_html = main_template.render(context=context)

# Write the rendered HTML content to a new file
output_path = os.path.join("C:/Users/engjoe/festlokalerstockholm/", "festlokaler-stockholm.html")
with open(output_path, "w", encoding="utf-8") as output_file:
    output_file.write(rendered_html)

print("Updated HTML file generated successfully.")
