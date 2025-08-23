import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import authentikRoutes from './routes/authentik';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Trust proxy for EasyPanel/Heroku
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: function (origin: any, callback: any) {
    const allowedOrigins = [
      process.env.CORS_ORIGIN,
      'https://curetcore.com',
      'https://www.curetcore.com',
      'http://localhost:3000',
      'http://localhost:3001'
    ];
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', limiter);

// Health check endpoints
app.get('/health', (_req, res) => {
  console.log('Health check requested');
  res.status(200).json({ 
    status: 'OK', 
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Alternative health check endpoints
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

app.get('/ready', (_req, res) => {
  res.status(200).send('OK');
});

app.get('/live', (_req, res) => {
  res.status(200).send('OK');
});

// Root endpoint
app.get('/', (_req, res) => {
  res.status(200).json({ 
    message: 'CuretCore API',
    version: '2.0.0',
    health: '/health',
    api: '/api'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/authentik', authentikRoutes);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server with error handling
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`📚 API Base URL: http://0.0.0.0:${PORT}/api`);
  console.log('✅ Server is ready to accept connections');
  console.log('⚠️  Note: Database connection will be tested in background');
  console.log(`📊 Process info: PID=${process.pid}, Platform=${process.platform}`);
  console.log(`🔧 Environment: NODE_ENV=${process.env.NODE_ENV}`);
  console.log('💪 Server will continue running even if database is unavailable');
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if ((error as any).code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't exit on database errors
  if (err.message && err.message.includes('database')) {
    console.log('Database error detected, but server will continue running');
  } else if (err.message && err.message.includes('ECONNREFUSED')) {
    console.log('Connection refused, but server will continue running');
  } else {
    // For other critical errors, log but don't exit
    console.error('Critical error, but keeping server alive');
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit on promise rejections
  console.log('Promise rejection detected, but server will continue running');
});

// Keep track of connections
const connections = new Set<any>();

server.on('connection', (connection) => {
  connections.add(connection);
  connection.on('close', () => {
    connections.delete(connection);
  });
});

// Graceful shutdown
let isShuttingDown = false;

const gracefulShutdown = (signal: string) => {
  if (isShuttingDown) {
    console.log('Shutdown already in progress');
    return;
  }
  
  isShuttingDown = true;
  console.log(`\n${signal} signal received: starting graceful shutdown`);
  console.log(`Active connections: ${connections.size}`);
  
  // Stop accepting new connections
  server.close((err) => {
    if (err) {
      console.error('Error closing server:', err);
    } else {
      console.log('HTTP server closed successfully');
    }
    process.exit(0);
  });
  
  // Close all connections
  connections.forEach((connection) => {
    connection.end();
  });
  
  // Force close after 30s (more time for EasyPanel)
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    connections.forEach((connection) => {
      connection.destroy();
    });
    process.exit(1);
  }, 30000);
};

// Handle signals
process.on('SIGTERM', () => {
  console.log('SIGTERM received from EasyPanel/system');
  gracefulShutdown('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('SIGINT received (Ctrl+C)');
  gracefulShutdown('SIGINT');
});

// Handle SIGHUP (often sent by process managers)
process.on('SIGHUP', () => {
  console.log('SIGHUP received, ignoring...');
});

// Log that we're ready for Heroku/EasyPanel
console.log('Application is running and ready to accept connections');

// Keep the process alive and check health
let healthCheckFailures = 0;
const maxHealthCheckFailures = 5;

setInterval(() => {
  try {
    const memUsage = process.memoryUsage();
    const healthStatus = {
      status: 'OK',
      memory: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
      connections: connections.size,
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString()
    };
    
    console.log(`[${healthStatus.timestamp}] Health: ${healthStatus.status} | Memory: ${healthStatus.memory} | Connections: ${healthStatus.connections} | Uptime: ${healthStatus.uptime}s`);
    
    // Reset health check failures on successful log
    healthCheckFailures = 0;
  } catch (error) {
    console.error('Health check error:', error);
    healthCheckFailures++;
    
    if (healthCheckFailures >= maxHealthCheckFailures) {
      console.error(`Health check failed ${healthCheckFailures} times, but keeping server alive`);
      healthCheckFailures = 0; // Reset counter
    }
  }
}, 30000); // Log every 30 seconds for better monitoring

// Prevent the process from exiting
process.stdin.resume();