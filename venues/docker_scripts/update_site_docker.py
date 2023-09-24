import subprocess

# Define the paths to Python executables and script files within the Docker container
python_exe = "/usr/local/bin/python"  # Update this path if needed
generate_venue_boxes_script = "/app/repo/venues/python/generate_venue_boxes_docker.py"
""" generate_venue_pages_script = "/app/repo/venues/python/generate_venue_pages.py"
generate_seo_venue_box_pages_script = "/app/repo/venues/python/generate_seo_venue_box_page.py"
 """
# Run the Python scripts using subprocess within the Docker container
subprocess.run([python_exe, generate_venue_boxes_script])
""" subprocess.run([python_exe, generate_venue_pages_script])
subprocess.run([python_exe, generate_seo_venue_box_pages_script])
 """
# Run Git commands within the Docker container
""" subprocess.run(["git", "add", "."], cwd="/app/repo")
subprocess.run(["git", "commit", "-m", "autocommit"], cwd="/app/repo")
subprocess.run(["git", "push"], cwd="/app/repo") """
