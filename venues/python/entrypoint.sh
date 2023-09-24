#!/bin/bash

# Set the repository directory
repo_dir="/app"

# Change directory to the repository directory
cd "$repo_dir"

# Pull from the Git repository to update it
git pull

# Run your Python script
python "$repo_dir/venues/python/generate_venue_boxes_docker.py"
