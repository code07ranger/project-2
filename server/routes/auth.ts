/**
 * INFINITY Platform — Auth Routes
 *
 * POST /api/auth/register
 * POST /api/auth/login
 * GET  /api/auth/me
 */

import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { users, findUserByEmail, sanitizeUser } from '../data.js';
import { verifyToken, signToken } from '../middleware/auth.js';

const router = Router();

// ──────────────────────────── POST /api/auth/register ────────────────────────────

router.post('/register', (req: Request, res: Response): void => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Name is required.' });
      return;
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'A valid email is required.' });
      return;
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      res.status(400).json({ success: false, error: 'Password must be at least 6 characters.' });
      return;
    }

    // Check uniqueness
    if (findUserByEmail(email)) {
      res.status(409).json({ success: false, error: 'An account with this email already exists.' });
      return;
    }

    const newUser = {
      id: `usr_${uuid().slice(0, 8)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      role: 'student' as const,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    const token = signToken({ userId: newUser.id, role: newUser.role });

    res.status(201).json({
      success: true,
      data: {
        token,
        user: sanitizeUser(newUser),
      },
    });
  } catch (err) {
    console.error('[auth/register]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// ──────────────────────────── POST /api/auth/login ────────────────────────────

router.post('/login', (req: Request, res: Response): void => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string') {
      res.status(400).json({ success: false, error: 'Email is required.' });
      return;
    }
    if (!password || typeof password !== 'string') {
      res.status(400).json({ success: false, error: 'Password is required.' });
      return;
    }

    const user = findUserByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid email or password.' });
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ success: false, error: 'Invalid email or password.' });
      return;
    }

    const token = signToken({ userId: user.id, role: user.role });

    res.status(200).json({
      success: true,
      data: {
        token,
        user: sanitizeUser(user),
      },
    });
  } catch (err) {
    console.error('[auth/login]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// ──────────────────────────── GET /api/auth/me ────────────────────────────

router.get('/me', verifyToken, (req: Request, res: Response): void => {
  try {
    res.status(200).json({
      success: true,
      data: { user: req.user },
    });
  } catch (err) {
    console.error('[auth/me]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

export default router;

