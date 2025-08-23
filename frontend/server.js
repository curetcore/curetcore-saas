const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Track connections
const connections = new Set();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Track connections
  server.on('connection', (connection) => {
    connections.add(connection);
    connection.on('close', () => {
      connections.delete(connection);
    });
  });

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log('> Server is running in production mode');
    console.log('> Process PID:', process.pid);
  });

  // Graceful shutdown
  let isShuttingDown = false;

  const gracefulShutdown = (signal) => {
    if (isShuttingDown) return;
    
    isShuttingDown = true;
    console.log(`\n${signal} received, starting graceful shutdown...`);
    console.log(`Active connections: ${connections.size}`);

    // Stop accepting new connections
    server.close((err) => {
      if (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
      }
      console.log('Server closed successfully');
      process.exit(0);
    });

    // Close existing connections
    connections.forEach(connection => {
      connection.end();
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      connections.forEach(connection => {
        connection.destroy();
      });
      process.exit(1);
    }, 30000);
  };

  // Handle signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  
  // Ignore SIGHUP
  process.on('SIGHUP', () => {
    console.log('SIGHUP received, ignoring...');
  });

  // Keep alive logging
  setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log(`[Health] Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB | Connections: ${connections.size} | Uptime: ${Math.round(process.uptime())}s`);
  }, 60000);
});

// Handle errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});