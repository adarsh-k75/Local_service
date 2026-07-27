# 1. 🌟 Changed from 3.11 to 3.12 so Django 6.0 can install without crashing!
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory inside the container
WORKDIR /app

# Install system dependencies needed for compiling certain python packages
RUN apt-get update && apt-get install -y \
    gcc \
    gettext \
    && rm -rf /var/lib/apt/lists/*

# 2. 🌟 Note: If you renamed your file to requirements.txt, keep this as is.
# If you kept the typo spelling on your disk, change both lines below to 'requriements.txt'
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the code from the local_service folder into the container
COPY . /app/

# Expose port 8000 for Daphne
EXPOSE 8000

# Run Daphne using your specific project configurations
CMD ["sh", "-c", "python manage.py migrate && daphne -b 0.0.0.0 -p 8000 local_service.asgi:application"]