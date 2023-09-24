#!/bin/bash

# Change directory to the repository directory
cd /app/repo

# Set Git authentication using the GitHub password
git config --global credential.helper '!f() { echo "password=$GITHUB_PASSWORD"; }; f'


# Pull from the Git repository to update it (in case you're running it manually)
git pull

# Run your Python script
python "venues/docker_scripts/update_site_docker.py"

# Add, commit, and push changes made by the script
git add .
git commit -m "autocommit"
git push