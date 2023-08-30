import os
from firebase.firebase_functions import read_all_from_venues
from jinja2 import Environment, FileSystemLoader

# Set up Jinja2 environment
def extract_first_ten_words(description):
    words = description.split()
    return ' '.join(words[:10])

env = Environment(loader=FileSystemLoader(searchpath="C:/Users/engjoe/festlokalerstockholm/venues/python"))
env.filters['extract_first_ten_words'] = extract_first_ten_words
main_template = env.get_template("venue_box_template.html")

# Get venues data from Firebase (you should replace this with your actual method)
venues = read_all_from_venues()

# Render the main template with the venues data
rendered_html = main_template.render(venues=venues)

# Write the rendered HTML content to a new file
output_path = os.path.join("C:/Users/engjoe/festlokalerstockholm/", "festlokaler-stockholm-updated.html")
with open(output_path, "w", encoding="utf-8") as output_file:
    output_file.write(rendered_html)

print("Updated HTML file generated successfully.")
