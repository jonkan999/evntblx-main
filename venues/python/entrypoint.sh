#!/bin/bash

# Change directory to the repository directory
cd /app/repo

# Set Git user name and email from environment variables
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_USERNAME"

# Pull from the Git repository to update it (in case you're running it manually)
git pull

# Run your Python script
python "venues/docker_scripts/update_site_docker.py"

# Add, commit, and push changes made by the script
git add .
git commit -m "autocommit"
git push