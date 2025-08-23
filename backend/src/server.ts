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

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`📚 API Base URL: http://0.0.0.0:${PORT}/api`);
  console.log('✅ Server is ready to accept connections');
  console.log('⚠️  Note: Database connection will be tested in background');
  console.log(`📊 Process info: PID=${process.pid}, Platform=${process.platform}`);
  console.log(`🔧 Environment: NODE_ENV=${process.env.NODE_ENV}`);
});

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't exit, just log
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit, just log
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} signal received: starting graceful shutdown`);
  console.log('Closing server...');
  
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
  
  // Force close after 10s
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Log that we're ready for Heroku/EasyPanel
console.log('Application is running and ready to accept connections');