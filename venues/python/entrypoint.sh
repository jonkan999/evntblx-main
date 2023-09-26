#!/bin/bash

# Change directory to the repository directory
cd /app/repo


# Replace 'your-github-username' with your GitHub username
USERNAME="jonkan999"

# Replace 'your-github-repo' with your GitHub repository name
REPO="https://${USERNAME}:${TOKEN}@github.com/jonkan999/evntblx-main.git"

# Authenticate with GitHub using the PAT from github_token.txt
TOKEN=$(cat /app/repo/github_token.txt)
git config --global user.name $USERNAME
git config --global user.email "${USERNAME}@users.noreply.github.com"
git config --global credential.helper store
git config --global --unset-all credential.helper
git config --local credential.helper "store --file=/app/repo/.git/credentials"

# Pull from the Git repository to update it (in case you're running it manually)
git pull

# Run your Python script
python "venues/docker_scripts/update_site_docker.py"

# Add, commit, and push changes made by the script
git add --all
git commit -m "autocommit"
git push https://${USERNAME}:${TOKEN}@github.com/jonkan999/evntblx-main.git

