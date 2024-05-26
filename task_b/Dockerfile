# TO-DO: Fix Dockerfile. Currently successfully builds the image but fails to run the container.

# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container to /api
WORKDIR /api

# Copy the application sub-directory to /api in the container
COPY api /api

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r /api/requirements.txt

# Copy other necessary directories if needed, e.g., data for seeding the database
COPY data /api/data

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Command to run the application
CMD ["flask", "run"]
