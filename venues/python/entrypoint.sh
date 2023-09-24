#!/bin/bash

# Specify the repository URL
repo_url="https://github.com/jonkan999/evntblx-main.git"

# Specify the target directory where you want to clone the repository
target_dir="/app"

# Ensure the target directory exists
mkdir -p "$target_dir"

# Change directory to the target directory
cd "$target_dir"

# Check if the target directory is already a Git repository
if [ -d .git ]; then
    # If it's a Git repository, remove it to start fresh
    rm -rf .git
fi

# Clone the Git repository into the target directory
git clone "$repo_url" "$target_dir"

# Change directory to the cloned repository
cd "$target_dir"

# Run your Python script
python "venues/python/generate_venue_boxes_docker.py"
