#!/bin/bash

# Specify the repository URL
repo_url="https://github.com/jonkan999/evntblx-main.git"

# Ensure the /app directory exists
mkdir -p /app

# Change directory to the /app directory
cd /app

# Initialize the Git repository
git init
git remote add origin "$repo_url"


# Pull from the Git repository to update it
git pull origin main

# Run your Python script
python "venues/python/generate_venue_boxes_docker.py"
