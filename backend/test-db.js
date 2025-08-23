// Test database connection
const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:Pitagora@@147.93.177.156:5432/warehouse?sslmode=disable';

console.log('Testing database connection...');
console.log('URL:', DATABASE_URL.replace(/:[^:@]+@/, ':****@'));

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: false,
  connectionTimeoutMillis: 10000,
});

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ SUCCESS! Connected at:', res.rows[0].now);
  } catch (err) {
    console.error('❌ FAILED:', err.message);
    console.error('Error code:', err.code);
  } finally {
    await pool.end();
    process.exit();
  }
}

test();