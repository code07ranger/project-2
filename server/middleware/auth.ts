/**
 * INFINITY Platform — Auth Middleware
 *
 * JWT verification and role-based access control.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById, User } from '../data.js';

// ──────────────────────────── Type augmentation ────────────────────────────

export interface TokenPayload {
  userId: string;
  role: 'admin' | 'student';
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>;
    }
  }
}

// ──────────────────────────── Helpers ────────────────────────────

const JWT_SECRET: string = process.env.JWT_SECRET || 'infinity-dev-secret';

export function signToken(payload: { userId: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// ──────────────────────────── Middleware ────────────────────────────

/**
 * Extracts & verifies a Bearer token from the Authorization header.
 * Attaches the full user object (sans password) to `req.user`.
 */
export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      res.status(401).json({ success: false, error: 'Authentication required. Provide a Bearer token.' });
      return;
    }

    const token = header.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    const user = findUserById(decoded.userId);
    if (!user) {
      res.status(401).json({ success: false, error: 'User associated with this token no longer exists.' });
      return;
    }

    // Attach user without password
    const { password: _pw, ...safeUser } = user;
    req.user = safeUser as Omit<User, 'password'>;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ success: false, error: 'Invalid or expired token.' });
      return;
    }
    res.status(500).json({ success: false, error: 'Internal server error during authentication.' });
  }
}

/**
 * Must be placed AFTER verifyToken.
 * Rejects non-admin users with 403.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ success: false, error: 'Admin access required.' });
    return;
  }
  next();
}

