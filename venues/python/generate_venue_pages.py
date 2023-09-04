import os
import sys
from firebase.firebase_functions import read_all_from_venues
from jinja2 import Environment, FileSystemLoader

# Get the directory path of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Set up Jinja2 environment
template_path = os.path.join(script_dir, "venue_template.html")
env = Environment(loader=FileSystemLoader(searchpath=script_dir))
template = env.get_template("venue_template.html")

venues = read_all_from_venues()


# Function to clean and format the venue name for the output filename
def clean_filename(name):
    name = name.replace('-', ' ').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').lower()
    return '-'.join(name.split())

# Generate HTML files for each venue
for venue in venues:
    print("Generates:" + venue["venueInfo"]["name"] + ".html")
    
    # Render the Jinja2 template with the data
    html_content = template.render(venue=venue)

    # Create a new HTML file
    cleaned_name = clean_filename(venue['venueInfo']['name'])
    output_path = os.path.join("C:/Users/engjoe/festlokalerstockholm/venues", f"{cleaned_name}.html")
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as output_file:
        output_file.write(html_content)

print("HTML files generated successfully.")
