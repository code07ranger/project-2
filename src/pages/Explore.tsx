import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit,
  ShieldCheck,
  Palette,
  Gamepad2,
  Blocks,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Cpu,
  BookOpen,
  Award,
  CheckCircle2,
  Coins,
  Fingerprint,
  Swords,
  Shapes,
  Star,
  Code2,
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import EventCard from '../components/ui/EventCard';
import BorderBeam from '../components/motion/BorderBeam';
import ParticleBackground from '../components/motion/ParticleBackground';
import { useEvents } from '../context/EventContext';

interface DomainDetail {
  id: string;
  categorySlug: string;
  name: string;
  icon: any;
  color: string;
  badgeVariant: 'yellow' | 'blue' | 'pink';
  accentColor: string;
  tagline: string;
  overview: string;
  skills: string[];
  techStack: string[];
  sampleInitiatives: string[];
}

const DOMAINS: DomainDetail[] = [
  {
    id: 'domain-ai',
    categorySlug: 'ai-emerging-tech',
    name: 'AI & Emerging Technology',
    icon: BrainCircuit,
    color: '#FFE600',
    badgeVariant: 'yellow',
    accentColor: 'bg-neo-yellow',
    tagline: 'From Foundational Models to Applied Neural Systems',
    overview:
      'We dive into machine learning, deep learning, NLP transformers, generative AI frameworks, and cloud AI deployments through practical build sessions.',
    skills: ['Supervised & Unsupervised ML', 'LLM Prompt Engineering & RAG', 'Computer Vision Pipelines', 'Model Deployment (FastAPI, ONNX)'],
    techStack: ['Python', 'PyTorch', 'Hugging Face', 'LangChain', 'Scikit-Learn'],
    sampleInitiatives: ['Monthly AI Tools for Students series', 'Neural Frontiers Hands-on Workshop', 'Cognition AI Hackathon'],
  },
  {
    id: 'domain-cyber',
    categorySlug: 'cybersecurity',
    name: 'Cybersecurity & Digital Awareness',
    icon: ShieldCheck,
    color: '#7DD3FC',
    badgeVariant: 'blue',
    accentColor: 'bg-neo-blue',
    tagline: 'Offensive Security, Defensive Hardening & Digital Hygiene',
    overview:
      'Empowering students to understand vulnerabilities, network packet analysis, CTF competitions, and best practices for securing personal and organizational data.',
    skills: ['Network Forensics & Packet Analysis', 'Web Application Penetration Testing', 'CTF Flag Decryption & Cryptography', 'Device & Identity Hardening'],
    techStack: ['Wireshark', 'Burp Suite', 'Kali Linux', 'Metasploit', 'Nmap'],
    sampleInitiatives: ['CyberShield Awareness Week', 'Campus Digital Privacy Quizzes', 'Inter-College CTF Tournaments'],
  },
  {
    id: 'domain-design',
    categorySlug: 'design-creative',
    name: 'Design & Creative Technology',
    icon: Palette,
    color: '#F472B6',
    badgeVariant: 'pink',
    accentColor: 'bg-neo-pink',
    tagline: 'User Experience, Visual Systems & Digital Craftsmanship',
    overview:
      'Bridging design intuition with digital systems. We focus on design thinking, typography, design systems in Figma, motion design, and user-centric problem solving.',
    skills: ['Design Thinking & Wireframing', 'High-Fidelity Component Systems', 'Interactive Prototyping & Micro-interactions', 'Visual Storytelling & Poster Art'],
    techStack: ['Figma', 'Framer', 'Adobe Illustrator', 'After Effects', 'Spline 3D'],
    sampleInitiatives: ['Graphista National Design Contest (400+ entries)', 'PixelCraft Design Sprint', 'Pass The Pixel Speed Design Challenge'],
  },
  {
    id: 'domain-gaming',
    categorySlug: 'gaming-competitions',
    name: 'Gaming & Competitions',
    icon: Gamepad2,
    color: '#FFE600',
    badgeVariant: 'yellow',
    accentColor: 'bg-neo-yellow',
    tagline: 'Esports Strategy, Competitive Coding & Game Dev',
    overview:
      'Fostering tactical teamwork and rapid algorithmic problem-solving through organized esports leagues, competitive programming contests, and game jams.',
    skills: ['Algorithmic Speed & Dynamic Programming', 'Esports Squad Coordination & Strategy', 'Game Mechanics & Scripting', 'Tournament Bracket Logistics'],
    techStack: ['C++', 'Python', 'Unity Engine', 'Discord API', 'HackerRank'],
    sampleInitiatives: ['BGMI Arena / Showdown 2.0', 'Code Colosseum 5-Hour Speed Contest', 'TechTonics Hackathon Sprints'],
  },
  {
    id: 'domain-web3',
    categorySlug: 'web3-digital-economy',
    name: 'Web3 & Digital Economy',
    icon: Blocks,
    color: '#7DD3FC',
    badgeVariant: 'blue',
    accentColor: 'bg-neo-blue',
    tagline: 'Decentralized Protocols, Smart Contracts & Fintech Rails',
    overview:
      'Understanding the evolution of the global digital economy, India’s fintech stack (UPI, CBDC Digital Rupee), blockchain consensus models, and smart contract development.',
    skills: ['Smart Contract Architecture', 'DeFi Protocol Mechanics', 'Digital Asset Custody & Security', 'Fintech & Digital Rupee Analysis'],
    techStack: ['Solidity', 'Ethereum / EVM', 'Hardhat', 'Ethers.js', 'Web3.js'],
    sampleInitiatives: ['Web3.0 Masterclass with Mudrex (WAGMI)', 'National Webinar on Digital Rupee & Economy', 'DeFi Decoded Hands-on Session'],
  },
];

export const Explore: React.FC = () => {
  const { events } = useEvents();
  const [selectedDomain, setSelectedDomain] = useState<string>('domain-ai');

  const currentDomain = DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[0];

  const domainEvents = events.filter(
    (e) => e.category === currentDomain.categorySlug && e.status === 'published'
  );

  return (
    <div className="flex flex-col gap-16 pb-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative overflow-hidden">
      {/* ── Top Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto relative z-10"
      >
        <span className="font-handwriting text-2xl font-bold text-neo-pink inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neo-pink/15 border-2 border-neo-border shadow-neo-sm">
          <Star className="w-4 h-4 fill-neo-pink text-neo-border" />
          EXPLORE DOMAINS
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-neo-text dark:text-neo-dark-text tracking-tight leading-tight">
          Pillars of Technological Innovation
        </h1>
        <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-base sm:text-lg leading-relaxed font-body">
          Discover our specialized technology tracks. Each domain represents
          a dedicated curriculum of workshops, hackathons, and member project squads.
        </p>
      </motion.div>

      {/* ── Segmented Control Tabs (Neo-Brutalist) ── */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none relative z-10 p-2 rounded-neo-md bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo dark:shadow-neo-dark max-w-3xl mx-auto">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          const isActive = domain.id === selectedDomain;
          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-neo-sm text-xs sm:text-sm font-heading font-black border-2 transition-all whitespace-nowrap select-none ${
                isActive
                  ? 'bg-neo-yellow text-neo-border border-neo-border shadow-neo-sm -translate-y-0.5'
                  : 'bg-transparent text-neo-text dark:text-neo-dark-text border-transparent hover:bg-neo-bg dark:hover:bg-neo-dark-bg'
              }`}
            >
              <Icon className="w-4 h-4 text-neo-border dark:text-neo-dark-text" />
              <span>{domain.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* ── Active Domain Showcase Card ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={currentDomain.id}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="p-8 sm:p-12 relative overflow-hidden bg-white dark:bg-neo-dark-card rounded-neo-lg border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg">
            <BorderBeam size={300} duration={12} colorFrom="#FFE600" colorTo="#7DD3FC" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-3.5">
                  <div className={`w-14 h-14 rounded-neo-sm flex items-center justify-center border-2 border-neo-border ${currentDomain.accentColor} shadow-neo-sm text-neo-border`}>
                    {React.createElement(currentDomain.icon, {
                      className: 'w-7 h-7',
                    })}
                  </div>
                  <div>
                    <Badge variant={currentDomain.badgeVariant} size="sm">
                      {currentDomain.name}
                    </Badge>
                    <h2 className="font-heading font-black text-2xl sm:text-3xl text-neo-text dark:text-neo-dark-text mt-1">
                      {currentDomain.tagline}
                    </h2>
                  </div>
                </div>

                <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-base leading-relaxed font-body">
                  {currentDomain.overview}
                </p>

                {/* Skills Acquired */}
                <div>
                  <h4 className="font-heading font-black text-neo-text dark:text-neo-dark-text text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-neo-pink" />
                    <span>Core Competencies Acquired</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentDomain.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-body text-neo-text/80 dark:text-neo-dark-text/80">
                        <span className="w-2 h-2 rounded-full bg-neo-yellow border border-neo-border" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-heading font-black text-neo-text dark:text-neo-dark-text text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-neo-blue" />
                    <span>Standard Tools & Technologies</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentDomain.techStack.map((tool, i) => (
                      <span
                        key={i}
                        className="font-mono text-xs font-bold px-3 py-1 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text shadow-neo-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Highlights */}
              <div className="lg:col-span-5 flex flex-col gap-6 p-6 rounded-neo-md bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border shadow-neo-sm">
                <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text flex items-center gap-2">
                  <Award className="w-4 h-4 text-neo-yellow" />
                  <span>Signature Initiatives</span>
                </h3>
                <div className="space-y-3">
                  {currentDomain.sampleInitiatives.map((init, i) => (
                    <motion.div
                      whileHover={{ scale: 1.02, x: 4 }}
                      key={i}
                      className="p-3.5 rounded-neo-sm bg-white dark:bg-neo-dark-card border-2 border-neo-border shadow-neo-sm flex items-center gap-3 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-neo-pink shrink-0" />
                      <span className="text-xs sm:text-sm text-neo-text dark:text-neo-dark-text font-bold font-body">{init}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t-2 border-neo-border/20">
                  <Link to={`/events?category=${currentDomain.categorySlug}`}>
                    <Button fullWidth variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                      Explore {currentDomain.name} Events
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ── Related Events for Current Domain ── */}
      <section className="flex flex-col gap-6 relative z-10">
        <SectionHeader
          title={`${currentDomain.name} Events`}
          description={`Scheduled and past sessions hosted under this pillar.`}
        />

        {domainEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domainEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 p-6 rounded-neo-md bg-white dark:bg-neo-dark-card border-2 border-neo-border shadow-neo text-neo-text/75 dark:text-neo-dark-text/75">
            <p className="text-sm font-body">
              More upcoming workshops for {currentDomain.name} will be announced soon.
            </p>
            <Link to="/events" className="text-neo-border dark:text-neo-yellow font-bold underline text-sm inline-block mt-2">
              Browse all available events &rarr;
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Explore;
