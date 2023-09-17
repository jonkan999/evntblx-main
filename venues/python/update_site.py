import subprocess

# Define the paths to Python executables and script files
python_exe = r"C:\Users\engjoe\AppData\Local\Programs\Python\Python39\python.exe"
generate_venue_boxes_script = r"c:\Users\engjoe\festlokalerstockholm\venues\python\generate_venue_boxes.py"
generate_venue_pages_script = r"c:\Users\engjoe\festlokalerstockholm\venues\python\generate_venue_pages.py"
generate_venue_pages_script = r"c:\Users\engjoe\festlokalerstockholm\venues\python\generate_seo_venue_box_page.py"

# Run the Python scripts using subprocess
subprocess.run([python_exe, generate_venue_boxes_script])
subprocess.run([python_exe, generate_venue_pages_script])

# Run Git commands
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "autocommit"])
subprocess.run(["git", "push"])
