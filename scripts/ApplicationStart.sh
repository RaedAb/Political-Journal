#!/bin/bash

# Navigate to the application directory
cd ~/Political-Journal

# Start the Node.js application using PM2
pm2 start app.js --name political-journal