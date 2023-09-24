# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Install Git (if not already installed)
RUN apt-get update && apt-get install -y git

# Clone your Git repository or update it if it exists
RUN git clone https://github.com/jonkan999/evntblx-main.git /app/repo || (cd /app/repo && git pull)

# Install any needed packages specified in requirements.txt
RUN pip install -r /app/repo/venues/python/requirements.txt

# Copy the local service-account-key.json into the Docker image
COPY C:/Users/Joel/evntblx-main/venues/python/firebase/service-account-key.json /app/repo/venues/python/firebase/service-account-key.json


# Copy the entrypoint script into the container
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint script as the entrypoint for the container
ENTRYPOINT ["/entrypoint.sh"]
