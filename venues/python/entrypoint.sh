#!/bin/bash

# Pull from the Git repository to update it
git pull

# Run your Python script
python "$repo_dir/venues/python/generate_venue_boxes_docker.py"
