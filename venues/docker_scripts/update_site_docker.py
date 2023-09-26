import subprocess
import os
import sys
# Add the parent folder of firebase_functions to the Python path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__),  '..'))
sys.path.append(parent_dir)
from python.firebase.firebase_functions import check_initial, toggle_initial_off

if check_initial():
    # Define the paths to Python executables and script files within the Docker container
    python_exe = "/usr/local/bin/python"  # Update this path if needed
    generate_venue_boxes_script = "/app/repo/venues/docker_scripts/generate_venue_boxes_docker.py"
    generate_venue_pages_script = "/app/repo/venues/docker_scripts/generate_venue_pages_docker.py"
    generate_seo_venue_box_pages_script = "/app/repo/venues/docker_scripts/generate_seo_venue_box_page_docker.py"

    # Run the Python scripts using subprocess within the Docker container
    subprocess.run([python_exe, generate_venue_boxes_script])
    subprocess.run([python_exe, generate_venue_pages_script])
    subprocess.run([python_exe, generate_seo_venue_box_pages_script])

    # Run Git commands within the Docker container
    # Uncomment and customize these commands as needed
    """
    subprocess.run(["git", "add", "."], cwd="/app/repo")
    subprocess.run(["git", "commit", "-m", "autocommit"], cwd="/app/repo")
    subprocess.run(["git", "push"], cwd="/app/repo")
    """

    # After completing the tasks, toggle_initial_off to set trigger_initial to False
    toggle_initial_off()
