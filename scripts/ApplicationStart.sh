#!/bin/bash

# Navigate to the application directory
cd /var/www/Political-Journal

# Check if the PM2 process with the name "political-journal" exists
if pm2 info political-journal &> /dev/null; then
    # If it exists, start the process
    pm2 start political-journal
else
    # If it doesn't exist, start the application with the specified name
    pm2 start app.js --name "political-journal"
fi
