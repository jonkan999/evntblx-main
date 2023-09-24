#!/bin/bash

# Change directory to the repository directory
cd /app/repo

# Pull from the Git repository to update it (in case you're running it manually)
git pull

# Run your Python script
python "venues/docker_scripts/generate_venue_boxes_docker.py"
