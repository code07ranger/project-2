/**
 * INFINITY Platform — In-Memory Data Store & Demo Seed Data
 *
 * All data lives in plain arrays. Helper look-up functions are exported
 * so route handlers never touch the raw arrays directly.
 */

import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

// ──────────────────────────── Types ────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hash
  role: 'admin' | 'student';
  avatarUrl?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'workshop' | 'hackathon' | 'talk' | 'competition' | 'social' | 'webinar';
  imageUrl: string;
  date: string;       // ISO 8601
  endDate?: string;
  time: string;
  venue: string;
  capacity: number;
  status: 'draft' | 'published';
  featured: boolean;
  tags: string[];
  createdAt: string;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  attendance: 'pending' | 'present' | 'absent';
  registeredAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: 'general' | 'event' | 'achievement' | 'urgent';
  publishedAt: string;
}

// ──────────────────────────── Seed helpers ────────────────────────────

const hashSync = (plain: string): string => bcrypt.hashSync(plain, 10);

const now = new Date().toISOString();

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

// ──────────────────────────── Users ────────────────────────────

export const users: User[] = [
  {
    id: 'usr_admin_001',
    name: '[Demo] Admin User',
    email: 'admin@infinity.college',
    password: hashSync('admin123'),
    role: 'admin',
    avatarUrl: '/images/official/avatar-admin.png',
    createdAt: now,
  },
  {
    id: 'usr_student_001',
    name: '[Demo] Arjun Mehta',
    email: 'arjun@student.college',
    password: hashSync('student123'),
    role: 'student',
    avatarUrl: '/images/official/avatar-student.png',
    createdAt: now,
  },
];

// ──────────────────────────── Events ────────────────────────────

export const events: Event[] = [
  {
    id: 'evt_001',
    slug: 'quantum-hackathon-2025',
    title: '[Demo] Quantum Hackathon 2025',
    tagline: 'Build the impossible in 36 hours',
    description:
      'A high-energy 36-hour hackathon where teams of up to 4 compete to build innovative solutions across AI, blockchain, and quantum computing tracks. Mentors from top tech companies will be on-site.',
    category: 'hackathon',
    imageUrl: '/images/events/hackathon.png',
    date: daysFromNow(14),
    endDate: daysFromNow(16),
    time: '10:00 AM',
    venue: 'Main Auditorium, SGGSCC',
    capacity: 200,
    status: 'published',
    featured: true,
    tags: ['AI', 'Blockchain', 'Quantum', 'Team'],
    createdAt: now,
  },
  {
    id: 'evt_002',
    slug: 'intro-to-machine-learning',
    title: '[Demo] Intro to Machine Learning',
    tagline: 'Your first step into AI',
    description:
      'A beginner-friendly workshop covering the fundamentals of machine learning — from linear regression to neural networks. Bring your laptop with Python installed.',
    category: 'workshop',
    imageUrl: '/images/events/ml-workshop.png',
    date: daysFromNow(7),
    time: '2:00 PM',
    venue: 'CS Lab 3, Block B',
    capacity: 60,
    status: 'published',
    featured: false,
    tags: ['ML', 'Python', 'Beginner'],
    createdAt: now,
  },
  {
    id: 'evt_003',
    slug: 'cybersecurity-ctf',
    title: '[Demo] Cybersecurity CTF Challenge',
    tagline: 'Hack ethically. Win big.',
    description:
      'Capture-the-flag competition with challenges in web security, cryptography, reverse engineering, and forensics. Open to all skill levels with tiered difficulty.',
    category: 'competition',
    imageUrl: '/images/events/ctf.png',
    date: daysFromNow(21),
    time: '11:00 AM',
    venue: 'Online — Discord Server',
    capacity: 150,
    status: 'published',
    featured: true,
    tags: ['Security', 'CTF', 'Networking'],
    createdAt: now,
  },
  {
    id: 'evt_004',
    slug: 'tech-talk-future-of-web',
    title: '[Demo] Tech Talk: Future of the Web',
    tagline: 'Where is the web headed?',
    description:
      'Industry speaker panel discussing WebAssembly, edge computing, server components, and the evolving frontend landscape.',
    category: 'talk',
    imageUrl: '/images/events/tech-talk.png',
    date: daysFromNow(5),
    time: '4:00 PM',
    venue: 'Seminar Hall, Block A',
    capacity: 120,
    status: 'published',
    featured: false,
    tags: ['Web', 'WASM', 'Edge'],
    createdAt: now,
  },
  {
    id: 'evt_005',
    slug: 'git-github-bootcamp',
    title: '[Demo] Git & GitHub Bootcamp',
    tagline: 'Version control made simple',
    description:
      'Hands-on bootcamp: branching strategies, pull requests, CI/CD pipelines, and open-source contribution workflows.',
    category: 'workshop',
    imageUrl: '/images/events/git-bootcamp.png',
    date: daysFromNow(10),
    time: '10:00 AM',
    venue: 'CS Lab 1, Block B',
    capacity: 50,
    status: 'published',
    featured: false,
    tags: ['Git', 'GitHub', 'DevOps'],
    createdAt: now,
  },
  {
    id: 'evt_006',
    slug: 'ui-ux-design-sprint',
    title: '[Demo] UI/UX Design Sprint',
    tagline: 'Design thinking in action',
    description:
      'A 2-day design sprint where participants learn user research, wireframing, prototyping in Figma, and usability testing.',
    category: 'workshop',
    imageUrl: '/images/events/design-sprint.png',
    date: daysFromNow(-5),
    time: '9:00 AM',
    venue: 'Design Lab, Block C',
    capacity: 40,
    status: 'published',
    featured: false,
    tags: ['UI', 'UX', 'Figma', 'Design'],
    createdAt: now,
  },
  {
    id: 'evt_007',
    slug: 'blockchain-fundamentals',
    title: '[Demo] Blockchain Fundamentals',
    tagline: 'Beyond the buzzword',
    description:
      'Dive deep into blockchain technology — consensus mechanisms, smart contracts, and decentralised applications. Includes a hands-on Solidity coding session.',
    category: 'webinar',
    imageUrl: '/images/events/blockchain.png',
    date: daysFromNow(-10),
    time: '3:00 PM',
    venue: 'Online — Zoom',
    capacity: 100,
    status: 'published',
    featured: false,
    tags: ['Blockchain', 'Solidity', 'Web3'],
    createdAt: now,
  },
  {
    id: 'evt_008',
    slug: 'infinity-social-mixer',
    title: '[Demo] INFINITY Social Mixer',
    tagline: 'Connect. Collaborate. Create.',
    description:
      'An informal networking event for INFINITY members — board games, lightning talks, snacks, and a surprise coding challenge.',
    category: 'social',
    imageUrl: '/images/events/social-mixer.png',
    date: daysFromNow(30),
    time: '5:00 PM',
    venue: 'Cafeteria Lounge',
    capacity: 80,
    status: 'draft',
    featured: false,
    tags: ['Networking', 'Fun', 'Community'],
    createdAt: now,
  },
];

// ──────────────────────────── Registrations ────────────────────────────

export const registrations: Registration[] = [
  {
    id: 'reg_001',
    userId: 'usr_student_001',
    eventId: 'evt_001',
    attendance: 'pending',
    registeredAt: now,
  },
  {
    id: 'reg_002',
    userId: 'usr_student_001',
    eventId: 'evt_002',
    attendance: 'pending',
    registeredAt: now,
  },
];

// ──────────────────────────── Announcements ────────────────────────────

export const announcements: Announcement[] = [
  {
    id: 'ann_001',
    title: '[Demo] Quantum Hackathon Registrations Open!',
    body: 'We are thrilled to announce that registrations for the Quantum Hackathon 2025 are now live. Form your teams and register before slots fill up!',
    category: 'event',
    publishedAt: daysFromNow(-1),
  },
  {
    id: 'ann_002',
    title: '[Demo] New Workshop Series Launching',
    body: 'INFINITY is rolling out a 6-part workshop series covering ML, Cloud, DevOps, and more. Stay tuned for the schedule drop.',
    category: 'general',
    publishedAt: daysFromNow(-3),
  },
  {
    id: 'ann_003',
    title: '[Demo] INFINITY Wins Best Tech Society Award',
    body: 'We are proud to share that INFINITY has been recognized as the Best Tech Society at the National College Tech Awards 2025!',
    category: 'achievement',
    publishedAt: daysFromNow(-7),
  },
  {
    id: 'ann_004',
    title: '[Demo] Campus Network Maintenance Notice',
    body: 'The campus network will be undergoing scheduled maintenance this Saturday from 2 AM to 6 AM. Online events during this window may experience disruptions.',
    category: 'urgent',
    publishedAt: daysFromNow(-2),
  },
];

// ──────────────────────────── Lookup Helpers ────────────────────────────

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function findEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function findEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function findAnnouncementById(id: string): Announcement | undefined {
  return announcements.find((a) => a.id === id);
}

export function findRegistrationById(id: string): Registration | undefined {
  return registrations.find((r) => r.id === id);
}

export function getRegistrationsForEvent(eventId: string): Registration[] {
  return registrations.filter((r) => r.eventId === eventId);
}

export function getRegistrationsForUser(userId: string): Registration[] {
  return registrations.filter((r) => r.userId === userId);
}

export function removeEvent(id: string): boolean {
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  events.splice(idx, 1);
  // Also remove all registrations for that event
  for (let i = registrations.length - 1; i >= 0; i--) {
    if (registrations[i].eventId === id) registrations.splice(i, 1);
  }
  return true;
}

export function removeAnnouncement(id: string): boolean {
  const idx = announcements.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  announcements.splice(idx, 1);
  return true;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function sanitizeUser(user: User): Omit<User, 'password'> {
  const { password: _pw, ...rest } = user;
  return rest;
}

