import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.js';
import eventRoutes, { myRegistrationsHandler } from './routes/events.js';
import adminRoutes from './routes/admin.js';
import { announcements } from './data.js';

const app = express();
const PORT = process.env.PORT || 3001;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

// Security Headers (Helmet)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://static.cloudflareinsights.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: ["'self'", "https://infinity-sggscc.antideploy.app", "https://cloudflareinsights.com", "http://localhost:*"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Restricted CORS Origins
const allowedOrigins: (string | RegExp)[] = [
  'https://infinity-sggscc.antideploy.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
  /^http:\/\/localhost:\d+$/,
];

if (process.env.APP_URL) {
  allowedOrigins.push(process.env.APP_URL.replace(/\/$/, ''));
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// Request logger in dev
app.use((req, _res, next) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    society: 'INFINITY — The Tech Society | SGGSCC',
    tagline: 'Beyond Limits. Beyond Technology.',
    time: new Date().toISOString(),
  });
});

// Public & Student Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.get('/api/me/registrations', ...myRegistrationsHandler);

// Public announcements route
app.get('/api/announcements', (_req: Request, res: Response) => {
  res.json({ success: true, data: announcements });
});

// Role-protected Admin Routes
app.use('/api/admin', adminRoutes);

// 404 for unknown API routes
app.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'API endpoint not found.' });
});

// Serve frontend build in production with cache control
app.use(
  express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  })
);

// Explicit 404 for missing static assets — MUST NEVER return index.html for assets/files
app.get(['/assets/*', '*.*'], (req: Request, res: Response) => {
  res.status(404).type('text/plain').send(`Asset not found: ${req.path}`);
});

// Serve fresh index.html for all SPA routes
app.get('*', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡ INFINITY Backend Server running on http://localhost:${PORT}`);
});

export default app;

