import subprocess
import sys
import os

# Define the paths to script files within your project
project_directory = os.path.dirname(os.path.abspath(__file__))
generate_venue_boxes_script = os.path.join(project_directory, "generate_venue_boxes.py")
generate_venue_pages_script = os.path.join(project_directory, "generate_venue_pages.py")
generate_seo_venue_box_pages_script = os.path.join(project_directory, "generate_seo_venue_box_page.py")

# Run the Python scripts using the virtual environment's Python interpreter
subprocess.run([sys.executable, generate_venue_boxes_script])
subprocess.run([sys.executable, generate_venue_pages_script])
subprocess.run([sys.executable, generate_seo_venue_box_pages_script])

# Run Git commands
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "autocommit"])
subprocess.run(["git", "push"])
