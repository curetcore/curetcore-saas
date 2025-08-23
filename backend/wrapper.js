#!/usr/bin/env node

/**
 * Wrapper script for the backend server to handle signals properly in EasyPanel
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('[Wrapper] Starting CuretCore Backend...');
console.log('[Wrapper] Node version:', process.version);
console.log('[Wrapper] Current directory:', process.cwd());

// Path to the actual server
const serverPath = path.join(__dirname, 'dist', 'server.js');

// Start the server as a child process
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env,
  detached: false
});

let isShuttingDown = false;

// Handle wrapper signals
const handleSignal = (signal) => {
  if (isShuttingDown) {
    console.log(`[Wrapper] Already shutting down, ignoring ${signal}`);
    return;
  }
  
  isShuttingDown = true;
  console.log(`[Wrapper] Received ${signal}, forwarding to server...`);
  
  // Forward signal to server
  if (server && !server.killed) {
    server.kill(signal);
  }
  
  // Give server time to shut down gracefully
  setTimeout(() => {
    if (!server.killed) {
      console.log('[Wrapper] Server did not exit, forcing shutdown...');
      server.kill('SIGKILL');
    }
    process.exit(0);
  }, 35000); // 35 seconds timeout
};

// Ignore SIGTERM initially
process.on('SIGTERM', () => {
  console.log('[Wrapper] SIGTERM received - will shutdown gracefully in 5 seconds...');
  setTimeout(() => handleSignal('SIGTERM'), 5000);
});

process.on('SIGINT', () => handleSignal('SIGINT'));
process.on('SIGHUP', () => {
  console.log('[Wrapper] SIGHUP received, ignoring...');
});

// Handle server exit
server.on('exit', (code, signal) => {
  console.log(`[Wrapper] Server exited with code ${code} and signal ${signal}`);
  if (!isShuttingDown) {
    console.log('[Wrapper] Server crashed, restarting in 5 seconds...');
    setTimeout(() => {
      process.exit(1); // Let EasyPanel restart the container
    }, 5000);
  }
});

server.on('error', (err) => {
  console.error('[Wrapper] Failed to start server:', err);
  process.exit(1);
});

// Keep wrapper alive
setInterval(() => {
  console.log(`[Wrapper] Alive - Server PID: ${server.pid || 'unknown'}`);
}, 120000); // Every 2 minutes