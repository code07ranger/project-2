import type { Announcement } from '../types';

/**
 * Four demo announcements for the INFINITY platform.
 * All body text is prefixed with "[Demo]" per project convention.
 */
export const demoAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    title: 'INFINITY Membership Drive 2026-27 is Now Open!',
    body: '[Demo] We are thrilled to announce that registrations for the 2026-27 session are officially live. Join INFINITY to gain access to exclusive workshops, hackathons, industry connect sessions, and a vibrant community of tech enthusiasts. Early-bird members receive limited-edition INFINITY merch. Head over to the Join page to sign up before seats fill up!',
    publishedAt: '2026-11-01T09:00:00+05:30',
    createdBy: 'admin-001',
  },
  {
    id: 'ann-002',
    title: 'Congratulations to CyberShield 2026 Winners 🏆',
    body: '[Demo] A huge round of applause to all 174 participants of CyberShield 2026! Special shoutout to Team PhantomBytes for topping the CTF leaderboard and to Arjun Kapoor for the Best Individual Performer award. Photos and the full scoreboard are now available on the Events page.',
    publishedAt: '2026-10-20T14:30:00+05:30',
    createdBy: 'admin-001',
  },
  {
    id: 'ann-003',
    title: 'New Partnership: INFINITY x CloudNext Labs',
    body: '[Demo] We are excited to announce a strategic partnership with CloudNext Labs. As part of this collaboration, INFINITY members will receive free credits for cloud computing resources, access to industry mentorship programs, and priority invitations to CloudNext\'s annual developer conference. Stay tuned for more details!',
    publishedAt: '2026-10-12T11:00:00+05:30',
    createdBy: 'admin-002',
  },
  {
    id: 'ann-004',
    title: 'Campus Wi-Fi Workshop Resources Available',
    body: '[Demo] Missed the "Secure Your Digital Life" campus workshop? All presentation slides, cheat-sheets, and the recorded session are now uploaded to the Resources section. Topics covered include password hygiene, two-factor authentication setup, VPN basics, and safe browsing practices. Share with your friends and stay safe online!',
    publishedAt: '2026-09-30T16:00:00+05:30',
    createdBy: 'admin-001',
  },
];
