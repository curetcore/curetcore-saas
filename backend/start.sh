#!/bin/bash

echo "Starting CuretCore Backend..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Current directory: $(pwd)"
echo "Files in dist:"
ls -la dist/

# Set up signal handlers
trap 'echo "Received SIGTERM, shutting down gracefully..."; kill -TERM $PID; wait $PID' SIGTERM
trap 'echo "Received SIGINT, shutting down gracefully..."; kill -INT $PID; wait $PID' SIGINT

# Start the application
echo "Starting server..."
node dist/server.js &
PID=$!

# Wait for the process
wait $PID