async function loadApp() {
  try {
    const mod = await import('../backend/dist/src/app.js');
    return { app: mod.default, error: null };
  } catch (e) {
    return { app: null, error: e.message + ' [code:' + (e.code || 'none') + ']' };
  }
}

const appPromise = loadApp();

export default async function handler(req, res) {
  const { app, error } = await appPromise;
  if (!app) {
    return res.status(500).json({
      success: false,
      message: 'Backend module failed to load',
      error,
    });
  }
  return app(req, res);
}
