# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Install Git (if not already installed)
RUN apt-get update && apt-get install -y git

# Create a temporary directory, clone the repository into it, and then move its contents to /app
RUN mkdir /tmp/evntblx-main && \
    git clone https://github.com/jonkan999/evntblx-main.git /tmp/evntblx-main && \
    mv /tmp/evntblx-main/* /app/ && \
    rm -rf /tmp/evntblx-main

# Install any needed packages specified in requirements.txt
RUN pip install -r venues/python/requirements.txt  # If you have any dependencies

# Run your Python script from its location within the repository
CMD ["python", "venues/python/generate_venue_boxes_docker.py"]
