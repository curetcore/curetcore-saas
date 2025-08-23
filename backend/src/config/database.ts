import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create pool only if DATABASE_URL is provided
let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    // Handle pool errors silently
    pool.on('error', (err) => {
      console.error('Database pool error:', err.message);
    });

    // Test connection in background (don't block server startup)
    setTimeout(async () => {
      try {
        if (pool) {
          const res = await pool.query('SELECT NOW()');
          console.log('✅ Database connected at:', res.rows[0].now);
        }
      } catch (err: any) {
        console.error('⚠️  Database not available:', err.message);
        console.error('⚠️  Using mock authentication for testing');
      }
    }, 1000);
    
  } catch (err: any) {
    console.error('Failed to create database pool:', err.message);
    pool = null;
  }
} else {
  console.warn('⚠️  No DATABASE_URL provided, using mock data');
}

// Export a mock pool if real pool is not available
const mockPool = {
  query: async () => {
    throw new Error('Database not available');
  },
  on: () => {},
  end: async () => {}
};

export default pool || mockPool as any;