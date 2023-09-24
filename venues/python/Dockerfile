# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Install Git (if not already installed)
RUN apt-get update && apt-get install -y git

# Install any needed packages specified in requirements.txt
RUN pip install -r venues/python/requirements.txt  # If you have any dependencies

# Copy the entrypoint script into the container
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint script as the entrypoint for the container
ENTRYPOINT ["/entrypoint.sh"]
