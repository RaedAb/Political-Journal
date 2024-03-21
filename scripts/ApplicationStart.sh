#!/bin/bash

# Navigate to the application directory
cd ~/var/www/Political-Journal

# Start the Node.js application using PM2
pm2 start  --silent app.js --name political-journal