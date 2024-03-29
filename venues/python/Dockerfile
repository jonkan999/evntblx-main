# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Install Git (if not already installed)
RUN apt-get update && apt-get install -y git

#ADD token arg = github personal access token tokens(classic) to build command with:
# aktivera venv
# cd venues/python
#starta dockker desktop 
# docker build --build-arg TOKEN_ARG=personalized-access-token -t update_site .
# docker tag update_site europe-central2-docker.pkg.dev/lokaler-3300/spaco/update_site
# docker push europe-central2-docker.pkg.dev/lokaler-3300/spaco/update_site
# IF YOU NEED TO ADD AUTHENTICATION TO THE DOCKER config to push images to gcloud: gcloud auth configure-docker europe-central2-docker.pkg.dev
# sen cloud console > cloud run > update_site job > edit byt till senaste imagen
ARG TOKEN_ARG
ENV TOKEN=$TOKEN_ARG

# Remove the existing /app/repo directory if it exists
RUN rm -rf /app/repo

# Clone your Git repository or update it if it exists
RUN git clone https://github.com/jonkan999/evntblx-main.git /app/repo || (cd /app/repo && git pull)

# Install any needed packages specified in requirements.txt
RUN pip install -r /app/repo/venues/python/requirements.txt

# Copy the local service-account-key.json into the Docker image
COPY ./firebase/service-account-key.json /app/repo/venues/python/firebase/service-account-key.json

# Copy the entrypoint script into the container
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint script as the entrypoint for the container
ENTRYPOINT ["/entrypoint.sh"]
