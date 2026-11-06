import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import {
  events,
  registrations,
  announcements,
  findEventById,
  findRegistrationById,
  getRegistrationsForEvent,
  removeEvent,
  removeAnnouncement,
  slugify,
} from '../data.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Protect all admin routes
router.use(verifyToken, requireAdmin);

// POST /api/admin/events — create event
router.post('/events', (req: Request, res: Response): void => {
  try {
    const { title, tagline, description, category, date, time, venue, capacity, status, featured, tags } = req.body;

    if (!title || !description || !date) {
      res.status(400).json({ success: false, error: 'Title, description, and date are required.' });
      return;
    }

    const newEvent = {
      id: `evt_${uuid().slice(0, 8)}`,
      slug: `${slugify(title)}-${uuid().slice(0, 4)}`,
      title: title.startsWith('[Demo]') ? title : `[Demo] ${title}`,
      tagline: tagline || '',
      description,
      category: category || 'workshop',
      imageUrl: '/images/events/default.png',
      date: new Date(date).toISOString(),
      time: time || '10:00 AM',
      venue: venue || 'SGGSCC Campus',
      capacity: Number(capacity) || 100,
      status: (status as 'draft' | 'published') || 'published',
      featured: Boolean(featured),
      tags: Array.isArray(tags) ? tags : ['Technology'],
      createdAt: new Date().toISOString(),
    };

    events.unshift(newEvent);
    res.status(201).json({ success: true, data: newEvent });
  } catch (err) {
    console.error('[admin/create-event]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// PATCH /api/admin/events/:id — update event
router.patch('/events/:id', (req: Request, res: Response): void => {
  try {
    const event = findEventById(req.params.id);
    if (!event) {
      res.status(404).json({ success: false, error: 'Event not found.' });
      return;
    }

    Object.assign(event, req.body);
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    console.error('[admin/update-event]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// DELETE /api/admin/events/:id — delete event
router.delete('/events/:id', (req: Request, res: Response): void => {
  try {
    const deleted = removeEvent(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Event not found.' });
      return;
    }
    res.status(200).json({ success: true, message: 'Event and associated registrations deleted.' });
  } catch (err) {
    console.error('[admin/delete-event]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// GET /api/admin/events/:id/registrations — get all registrations for event
router.get('/events/:id/registrations', (req: Request, res: Response): void => {
  try {
    const eventRegs = getRegistrationsForEvent(req.params.id);
    res.status(200).json({ success: true, data: eventRegs });
  } catch (err) {
    console.error('[admin/event-registrations]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// PATCH /api/admin/registrations/:id/attendance — update attendance status
router.patch('/registrations/:id/attendance', (req: Request, res: Response): void => {
  try {
    const { attendance } = req.body;
    if (!['pending', 'present', 'absent'].includes(attendance)) {
      res.status(400).json({ success: false, error: 'Invalid attendance status. Must be pending, present, or absent.' });
      return;
    }

    const reg = findRegistrationById(req.params.id);
    if (!reg) {
      res.status(404).json({ success: false, error: 'Registration record not found.' });
      return;
    }

    reg.attendance = attendance;
    res.status(200).json({ success: true, data: reg });
  } catch (err) {
    console.error('[admin/attendance]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// POST /api/admin/announcements — create announcement
router.post('/announcements', (req: Request, res: Response): void => {
  try {
    const { title, body, category } = req.body;
    if (!title || !body) {
      res.status(400).json({ success: false, error: 'Title and body are required.' });
      return;
    }

    const newAnnouncement = {
      id: `ann_${uuid().slice(0, 8)}`,
      title: title.startsWith('[Demo]') ? title : `[Demo] ${title}`,
      body,
      category: category || 'general',
      publishedAt: new Date().toISOString(),
    };

    announcements.unshift(newAnnouncement);
    res.status(201).json({ success: true, data: newAnnouncement });
  } catch (err) {
    console.error('[admin/create-announcement]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// DELETE /api/admin/announcements/:id
router.delete('/announcements/:id', (req: Request, res: Response): void => {
  try {
    const removed = removeAnnouncement(req.params.id);
    if (!removed) {
      res.status(404).json({ success: false, error: 'Announcement not found.' });
      return;
    }
    res.status(200).json({ success: true, message: 'Announcement deleted.' });
  } catch (err) {
    console.error('[admin/delete-announcement]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

export default router;

