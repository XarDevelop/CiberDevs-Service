import app from '../backend/dist/src/app.js';
import { connectDB } from '../backend/dist/src/database/index.js';
import { runMigrations } from '../backend/dist/src/database/runMigrations.js';

let initialized = false;

const ensureDb = async () => {
  if (initialized) return;
  await connectDB();
  await runMigrations();
  initialized = true;
};

export default async function handler(req, res) {
  await ensureDb();
  return app(req, res);
}
