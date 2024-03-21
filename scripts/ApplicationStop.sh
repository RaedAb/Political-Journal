#!/bin/bash

# Print environment variables
echo "Environment variables:"
env

# Check current working directory
echo "Current working directory: $(pwd)"

# Check the user running the script
echo "User running the script: $(whoami)"

# Check if the process exists before attempting to stop it
if pm2 list | grep -q 'political-journal'; then
    # If the process exists, stop it
    pm2 stop political-journal
    echo "Stopped the political-journal process."
else
    echo "The political-journal process is not running."
fi