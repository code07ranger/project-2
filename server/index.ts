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
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: ["'self'", "https://infinity-sggscc.antideploy.app", "http://localhost:*"],
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

// Serve frontend build in production
app.use(express.static(distPath));
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡ INFINITY Backend Server running on http://localhost:${PORT}`);
});

export default app;

