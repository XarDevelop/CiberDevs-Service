async function loadApp() {
  try {
    const mod = await import('../backend/dist/src/app.js');
    return mod.default;
  } catch (e) {
    console.error('IMPORT FAILED:', e.message, e.code);
    return null;
  }
}

const appPromise = loadApp();

export default async function handler(req, res) {
  const app = await appPromise;
  if (!app) {
    return res.status(500).json({
      success: false,
      message: 'Backend module failed to load',
      error: 'Check Vercel logs for IMPORT FAILED details'
    });
  }
  return app(req, res);
}
