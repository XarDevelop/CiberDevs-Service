import app from '../backend/dist/src/app.js';
import { connectDB } from '../backend/dist/src/database/index.js';
import { runMigrations } from '../backend/dist/src/database/runMigrations.js';

(async () => {
  try {
    await connectDB();
    await runMigrations();
    console.log('Database initialized successfully');
  } catch (e) {
    console.error('Database initialization failed:', e.message);
  }
})();

export default app;
