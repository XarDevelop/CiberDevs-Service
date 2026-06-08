async function init() {
  try {
    const mod = await import('../backend/dist/src/app.js');
    const app = mod.default;

    const dbModule = await import('../backend/dist/src/database/index.js');
    const migModule = await import('../backend/dist/src/database/runMigrations.js');

    await dbModule.connectDB();
    await migModule.runMigrations();
    console.log('Database initialized and migrations completed');

    return app;
  } catch (e) {
    console.error('INIT FAILED:', e.message, e.code);
    return null;
  }
}

const appPromise = init();

export default async function handler(req, res) {
  const app = await appPromise;
  if (!app) {
    return res.status(500).json({
      success: false,
      message: 'Backend initialization failed',
      error: 'Check Vercel logs for details',
    });
  }
  return app(req, res);
}
