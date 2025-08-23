// Simplified server for testing
import express from 'express';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Simple health check
app.get('/health', (req, res) => {
  res.send('OK');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Prevent exit
process.on('SIGTERM', () => {
  console.log('SIGTERM received but ignoring for now');
});

// Keep alive
setInterval(() => {}, 1000);