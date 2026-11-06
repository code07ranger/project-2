import type { DomainInfo } from '../types';

/**
 * INFINITY's five core tech domains / pillars.
 * `icon` values are Lucide React component names (imported dynamically by UI).
 * `color` values reference the design-system tokens defined in tailwind.config.ts.
 */
export const domainData: DomainInfo[] = [
  {
    id: 'domain-ai',
    name: 'AI & Emerging Technology',
    icon: 'Brain',
    description:
      'Explore artificial intelligence, machine learning, generative AI, and next-generation computing paradigms through hands-on workshops and research showcases.',
    color: '#8B5CF6', // violet
    eventCount: 1,
  },
  {
    id: 'domain-cyber',
    name: 'Cybersecurity & Digital Awareness',
    icon: 'Shield',
    description:
      'Master ethical hacking, digital forensics, and cyber-hygiene through CTF competitions, awareness drives, and red-team / blue-team exercises.',
    color: '#38BDF8', // neon
    eventCount: 1,
  },
  {
    id: 'domain-design',
    name: 'Design & Creative Technology',
    icon: 'Palette',
    description:
      'Fuse aesthetics with functionality — learn UI/UX design, motion graphics, creative coding, and design thinking from industry experts.',
    color: '#C084FC', // lavender
    eventCount: 1,
  },
  {
    id: 'domain-gaming',
    name: 'Gaming & Competitions',
    icon: 'Gamepad2',
    description:
      'Compete in BGMI tournaments, competitive-programming contests, hackathons, and game-dev jams that push your skills to the limit.',
    color: '#E4A34C', // warning
    eventCount: 2,
  },
  {
    id: 'domain-web3',
    name: 'Web3 & Digital Economy',
    icon: 'Globe',
    description:
      'Understand blockchain, DeFi, tokenomics, and the evolving digital economy through seminars, hands-on labs, and industry panel discussions.',
    color: '#34B88A', // success
    eventCount: 1,
  },
];
