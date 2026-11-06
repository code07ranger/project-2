/**
 * INFINITY Platform — Public Event Routes
 *
 * GET  /api/events            — list published events (search, category, status filters)
 * GET  /api/events/:slug      — single event by slug
 * POST /api/events/:id/register — register current user for event
 * GET  /api/me/registrations  — current user's registrations
 */

import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import {
  events,
  registrations,
  findEventById,
  findEventBySlug,
  getRegistrationsForEvent,
  getRegistrationsForUser,
} from '../data.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// ──────────────────────────── GET /api/events ────────────────────────────

router.get('/', (req: Request, res: Response): void => {
  try {
    const { search, category, status } = req.query;
    const now = new Date();

    let filtered = events.filter((e) => e.status === 'published');

    // Text search on title
    if (search && typeof search === 'string' && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.tagline.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Category filter
    if (category && typeof category === 'string' && category !== 'all') {
      filtered = filtered.filter((e) => e.category === category);
    }

    // Status filter (upcoming / past)
    if (status === 'upcoming') {
      filtered = filtered.filter((e) => new Date(e.date) >= now);
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (status === 'past') {
      filtered = filtered.filter((e) => new Date(e.date) < now);
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      // Default: upcoming first (ascending), then past (descending)
      filtered.sort((a, b) => {
        const aUpcoming = new Date(a.date) >= now;
        const bUpcoming = new Date(b.date) >= now;
        if (aUpcoming && !bUpcoming) return -1;
        if (!aUpcoming && bUpcoming) return 1;
        if (aUpcoming && bUpcoming) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

    // Enrich with registration count
    const enriched = filtered.map((e) => ({
      ...e,
      registrationCount: getRegistrationsForEvent(e.id).length,
    }));

    res.status(200).json({ success: true, data: enriched });
  } catch (err) {
    console.error('[events/list]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// ──────────────────────────── GET /api/events/:slug ────────────────────────────

router.get('/:slug', (req: Request, res: Response): void => {
  try {
    const event = findEventBySlug(req.params.slug);

    if (!event || event.status !== 'published') {
      res.status(404).json({ success: false, error: 'Event not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        ...event,
        registrationCount: getRegistrationsForEvent(event.id).length,
      },
    });
  } catch (err) {
    console.error('[events/detail]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// ──────────────────────────── POST /api/events/:id/register ────────────────────────────

router.post('/:id/register', verifyToken, (req: Request, res: Response): void => {
  try {
    const { id: eventId } = req.params;
    const userId = req.user!.id;

    const event = findEventById(eventId);

    if (!event) {
      res.status(404).json({ success: false, error: 'Event not found.' });
      return;
    }

    if (event.status !== 'published') {
      res.status(400).json({ success: false, error: 'This event is not open for registration.' });
      return;
    }

    // Check capacity
    const currentCount = getRegistrationsForEvent(eventId).length;
    if (currentCount >= event.capacity) {
      res.status(400).json({ success: false, error: 'This event has reached maximum capacity.' });
      return;
    }

    // Check duplicate
    const existing = registrations.find((r) => r.userId === userId && r.eventId === eventId);
    if (existing) {
      res.status(409).json({ success: false, error: 'You are already registered for this event.' });
      return;
    }

    const registration = {
      id: `reg_${uuid().slice(0, 8)}`,
      userId,
      eventId,
      attendance: 'pending' as const,
      registeredAt: new Date().toISOString(),
    };

    registrations.push(registration);

    res.status(201).json({ success: true, data: registration });
  } catch (err) {
    console.error('[events/register]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// ──────────────────────────── GET /api/me/registrations ────────────────────────────
// NOTE: This route is mounted at /api/me/registrations in index.ts,
//       but we also export a handler so it can be attached from the router.

export const myRegistrationsHandler = [
  verifyToken,
  (req: Request, res: Response): void => {
    try {
      const userId = req.user!.id;
      const userRegs = getRegistrationsForUser(userId);

      // Join event info
      const enriched = userRegs.map((r) => {
        const event = findEventById(r.eventId);
        return {
          ...r,
          event: event
            ? {
                id: event.id,
                slug: event.slug,
                title: event.title,
                date: event.date,
                time: event.time,
                venue: event.venue,
                category: event.category,
                imageUrl: event.imageUrl,
              }
            : null,
        };
      });

      res.status(200).json({ success: true, data: enriched });
    } catch (err) {
      console.error('[me/registrations]', err);
      res.status(500).json({ success: false, error: 'Internal server error.' });
    }
  },
] as const;

export default router;

