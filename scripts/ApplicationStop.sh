#!/bin/bash

# Check if the process exists before attempting to stop it
if pm2 list | grep -q 'political-journal'; then
    # If the process exists, stop it
    pm2 stop --silent political-journal
    echo "Stopped the political-journal process."
else
    echo "The political-journal process is not running."
fi