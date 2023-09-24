#!/bin/bash

# Change directory to the repository directory
cd /app/repo

git config --global user.email "joel.engstrom17@gmail.com"
git config --global user.name "jonkan999"
git config --global credential.helper '!f() { echo "password=$GIT_PAT"; }; f'

# Pull from the Git repository to update it (in case you're running it manually)
git pull

# Run your Python script
python "venues/docker_scripts/update_site_docker.py"

# Add, commit, and push changes made by the script
git add --all
git commit -m "autocommit"
git push