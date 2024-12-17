#!/bin/sh

# Enable strict error handling
set -e

# Log startup
echo "Starting NGINX entrypoint..."

# Validate NGINX configuration
if nginx -t; then
    echo "NGINX configuration is valid."
else
    echo "NGINX configuration is invalid. Exiting..."
    exit 1
fi

# Start NGINX in the foreground
echo "Starting NGINX..."

nginx -g "daemon off;"

