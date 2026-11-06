import type { Event } from '../types';

/**
 * Eight demo events spanning every INFINITY category.
 * Dates are anchored around November 2026.
 * All descriptions are prefixed with "[Demo]" per project convention.
 */
export const demoEvents: Event[] = [
  // ── 1  AI & Emerging Tech — upcoming ──────────────────────────────────
  {
    id: 'evt-001',
    title: 'Neural Frontiers: AI & ML Workshop',
    slug: 'neural-frontiers-ai-ml-workshop',
    description:
      '[Demo] Dive deep into neural network architectures, transformer models, and real-world ML pipelines. Build a working image classifier from scratch and deploy it to the cloud — all in one intensive weekend session guided by industry practitioners.',
    category: 'ai-emerging-tech',
    startAt: '2026-11-15T10:00:00+05:30',
    endAt: '2026-11-15T17:00:00+05:30',
    venue: 'Seminar Hall A, SGGSCC',
    mode: 'offline',
    coverImage: '/images/events/neural-frontiers.webp',
    status: 'published',
    capacity: 120,
    registrationCount: 87,
    createdAt: '2026-10-01T08:00:00+05:30',
  },

  // ── 2  Cybersecurity — past ───────────────────────────────────────────
  {
    id: 'evt-002',
    title: 'CyberShield 2026: Security Awareness Week',
    slug: 'cybershield-2026-security-awareness-week',
    description:
      '[Demo] A week-long campaign featuring CTF challenges, ethical hacking demos, and guest lectures on digital privacy. Participants learned to spot phishing, harden their devices, and think like a red-teamer.',
    category: 'cybersecurity',
    startAt: '2026-10-14T09:00:00+05:30',
    endAt: '2026-10-18T18:00:00+05:30',
    venue: 'Computer Lab Block C, SGGSCC',
    mode: 'hybrid',
    coverImage: '/images/events/cybershield.webp',
    status: 'published',
    capacity: 200,
    registrationCount: 174,
    createdAt: '2026-09-20T10:00:00+05:30',
  },

  // ── 3  Design & Creative — upcoming ───────────────────────────────────
  {
    id: 'evt-003',
    title: 'PixelCraft: Design Thinking Bootcamp',
    slug: 'pixelcraft-design-thinking-bootcamp',
    description:
      '[Demo] From empathy maps to high-fidelity prototypes in 48 hours. PixelCraft takes you through the full design-thinking lifecycle using Figma, Framer, and user-research techniques that leading product teams swear by.',
    category: 'design-creative',
    startAt: '2026-11-22T10:00:00+05:30',
    endAt: '2026-11-23T18:00:00+05:30',
    venue: 'Innovation Lab, SGGSCC',
    mode: 'offline',
    coverImage: '/images/events/pixelcraft.webp',
    status: 'published',
    capacity: 60,
    registrationCount: 42,
    createdAt: '2026-10-10T12:00:00+05:30',
  },

  // ── 4  Gaming & Competitions — upcoming ───────────────────────────────
  {
    id: 'evt-004',
    title: 'Code Colosseum: Competitive Programming',
    slug: 'code-colosseum-competitive-programming',
    description:
      '[Demo] Test your algorithmic prowess in a 5-hour contest with problems ranging from greedy strategies to advanced graph theory. Top scorers win cash prizes, swag, and a fast-track interview with our partner companies.',
    category: 'gaming-competitions',
    startAt: '2026-11-29T11:00:00+05:30',
    endAt: '2026-11-29T16:00:00+05:30',
    venue: 'Online — HackerRank',
    mode: 'online',
    coverImage: '/images/events/code-colosseum.webp',
    status: 'published',
    capacity: 500,
    registrationCount: 213,
    createdAt: '2026-10-15T09:00:00+05:30',
  },

  // ── 5  Web3 & Digital Economy — past ──────────────────────────────────
  {
    id: 'evt-005',
    title: 'DeFi Decoded: Web3 Fundamentals',
    slug: 'defi-decoded-web3-fundamentals',
    description:
      '[Demo] An introductory session demystifying decentralised finance, smart contracts, and tokenomics. Attendees built a simple ERC-20 token on a test-net and explored real DeFi protocols hands-on.',
    category: 'web3-digital-economy',
    startAt: '2026-09-28T14:00:00+05:30',
    endAt: '2026-09-28T17:30:00+05:30',
    venue: 'Auditorium, SGGSCC',
    mode: 'offline',
    coverImage: '/images/events/defi-decoded.webp',
    status: 'published',
    capacity: 150,
    registrationCount: 150,
    createdAt: '2026-09-01T08:30:00+05:30',
  },

  // ── 6  Seminars — past ────────────────────────────────────────────────
  {
    id: 'evt-006',
    title: 'TechTalk: The Digital Economy Landscape',
    slug: 'techtalk-digital-economy-landscape',
    description:
      '[Demo] A panel of fintech founders and economists discussed how UPI, CBDCs, and AI-driven credit scoring are reshaping India\'s financial infrastructure. Insightful Q&A with 300+ live attendees.',
    category: 'seminars',
    startAt: '2026-10-05T15:00:00+05:30',
    endAt: '2026-10-05T17:00:00+05:30',
    venue: 'Conference Room 1, SGGSCC',
    mode: 'hybrid',
    coverImage: '/images/events/techtalk-economy.webp',
    status: 'published',
    capacity: 300,
    registrationCount: 278,
    createdAt: '2026-09-15T07:00:00+05:30',
  },

  // ── 7  Workshops — upcoming ───────────────────────────────────────────
  {
    id: 'evt-007',
    title: 'Full-Stack Forge: Modern Web Dev Workshop',
    slug: 'full-stack-forge-modern-web-dev-workshop',
    description:
      '[Demo] Build and deploy a production-grade React + Node app in a single day. Covers TypeScript, Tailwind CSS, REST API design, database modelling, and CI/CD with GitHub Actions.',
    category: 'workshops',
    startAt: '2026-12-06T10:00:00+05:30',
    endAt: '2026-12-06T18:00:00+05:30',
    venue: 'Computer Lab Block A, SGGSCC',
    mode: 'offline',
    coverImage: '/images/events/fullstack-forge.webp',
    status: 'published',
    capacity: 80,
    registrationCount: 55,
    createdAt: '2026-10-20T11:00:00+05:30',
  },

  // ── 8  Gaming & Competitions — past ───────────────────────────────────
  {
    id: 'evt-008',
    title: 'BGMI Arena: Inter-College Gaming Tournament',
    slug: 'bgmi-arena-inter-college-gaming-tournament',
    description:
      '[Demo] 64 squads from colleges across Delhi NCR battled it out in an electrifying BGMI showdown. Three rounds of intense gameplay culminated in a grand-final streamed live on YouTube.',
    category: 'gaming-competitions',
    startAt: '2026-10-26T12:00:00+05:30',
    endAt: '2026-10-26T20:00:00+05:30',
    venue: 'Sports Complex Hall, SGGSCC',
    mode: 'offline',
    coverImage: '/images/events/bgmi-arena.webp',
    status: 'archived',
    capacity: 256,
    registrationCount: 256,
    createdAt: '2026-09-25T10:00:00+05:30',
  },
];
