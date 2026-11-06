import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CalendarDays,
  UsersRound,
  Award,
  Terminal,
  ShieldCheck,
  Palette,
  Gamepad2,
  Blocks,
  BrainCircuit,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Code2,
  Cpu,
  Lock,
  Layers,
  Activity,
  Zap,
  Fingerprint,
  Orbit,
  Coins,
  Swords,
  Shapes,
  HelpCircle,
  Radio,
  Smartphone,
  Bot,
  Send,
  Github,
  Linkedin,
  Compass,
  Star,
  Globe,
  Binary,
} from 'lucide-react';
import InfinitySymbol from '../components/ui/InfinitySymbol';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionHeader from '../components/ui/SectionHeader';
import EventCard from '../components/ui/EventCard';
import Marquee from '../components/motion/Marquee';
import { useEvents } from '../context/EventContext';

const MARQUEE_ITEMS = [
  'SGGSCC • University of Delhi',
  'Graphista Flagship (400+ Entries)',
  '50+ Colleges & Institutions',
  'WAGMI x Mudrex Web3.0 Workshop',
  'Digital Rupee & Fintech (100+ Live)',
  'CyberShield CTF & Red Team Drills',
  'Monthly AI Tools Series',
  '8 Core Technology Domains',
  'Playful Neo-Brutalism + Creative Technology',
];

// 8 Required Technology Domains
const TECH_DOMAINS = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    subtitle: 'Neural Systems & LLMs',
    description: 'Explore generative AI models, transformer architectures, prompt engineering, and autonomous agent workflows.',
    icon: BrainCircuit,
    color: 'bg-neo-yellow',
    tag: 'Flagship Track',
    tagColor: 'yellow' as const,
    techs: ['PyTorch', 'Transformers', 'FastAPI', 'LangChain'],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    subtitle: 'Modern Scalable Web',
    description: 'Build responsive, production-ready web applications using modern component ecosystems and high-performance frameworks.',
    icon: Code2,
    color: 'bg-neo-blue',
    tag: 'Full Stack',
    tagColor: 'blue' as const,
    techs: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'app-dev',
    title: 'App Development',
    subtitle: 'Cross-Platform Mobile',
    description: 'Design and deploy native-feeling mobile applications for iOS and Android with fluid gesture-driven user experiences.',
    icon: Smartphone,
    color: 'bg-neo-pink',
    tag: 'Mobile First',
    tagColor: 'pink' as const,
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    subtitle: 'Data Science & Predictive Models',
    description: 'Harness predictive algorithms, computer vision pipelines, mathematical modeling, and structured data analysis.',
    icon: Binary,
    color: 'bg-neo-yellow',
    tag: 'Algorithms',
    tagColor: 'yellow' as const,
    techs: ['Scikit-learn', 'Pandas', 'OpenCV', 'NumPy'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    subtitle: 'Offensive & Defensive Drills',
    description: 'Capture-the-flag competitions, digital forensics, packet inspection, ethical vulnerability disclosure, and network hygiene.',
    icon: ShieldCheck,
    color: 'bg-neo-blue',
    tag: 'CTF & Defence',
    tagColor: 'blue' as const,
    techs: ['Wireshark', 'Burp Suite', 'Cryptography', 'Linux'],
  },
  {
    id: 'robotics',
    title: 'Robotics & IoT',
    subtitle: 'Hardware Meets Firmware',
    description: 'Bridge hardware and software with embedded controllers, micro-sensors, automation rigs, and Internet of Things protocols.',
    icon: Cpu,
    color: 'bg-neo-pink',
    tag: 'Hardware',
    tagColor: 'pink' as const,
    techs: ['Arduino', 'Raspberry Pi', 'ESP32', 'MQTT'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    subtitle: 'Design Systems & Graphista',
    description: 'Craft intuitive user interfaces, typography hierarchies, and interaction design. Proud host of national contest Graphista.',
    icon: Palette,
    color: 'bg-neo-yellow',
    tag: 'National Contest',
    tagColor: 'yellow' as const,
    techs: ['Figma', 'Design Tokens', 'Prototyping', 'User Research'],
  },
  {
    id: 'emerging-tech',
    title: 'Emerging Technologies',
    subtitle: 'Web3, CBDCs & Spatial Tech',
    description: 'Explore decentralized protocols, smart contract architecture, digital rupee fintech systems, and next-generation tech.',
    icon: Blocks,
    color: 'bg-neo-blue',
    tag: 'Web3 & Fintech',
    tagColor: 'blue' as const,
    techs: ['Solidity', 'Ethereum', 'CBDCs', 'Mudrex WAGMI'],
  },
];

// Member-Built Projects per Section 9
const MEMBER_PROJECTS = [
  {
    title: 'Infinity Digital Platform 2.0',
    category: 'Society Operating System',
    description: 'The modern digital hub for SGGSCC tech society featuring QR pass ticketing, verified student certificates, real-time command palette, and an AI FAQ assistant.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Neo-Brutalism', 'Node.js'],
    github: 'https://github.com/infinitysggscc/infinity-platform',
    demo: 'https://infinity-sggscc.vercel.app',
    featured: true,
    accent: 'bg-neo-yellow',
  },
  {
    title: 'CyberShield CTF Arena',
    category: 'Security & Penetration Testing',
    description: 'Interactive capture-the-flag training arena with dynamic jeopardy scoring, real-time leaderboards, and sandboxed web vulnerability challenges.',
    tech: ['Docker', 'Python', 'FastAPI', 'Redis', 'Tailwind'],
    github: 'https://github.com/infinitysggscc',
    demo: '#',
    featured: false,
    accent: 'bg-neo-blue',
  },
  {
    title: 'Graphista Showcase & Scoring Matrix',
    category: 'Design & Visual Arts',
    description: 'National design submission portal handling 400+ entries across 50+ universities with automated resolution checks and juror rubrics.',
    tech: ['Next.js', 'Figma API', 'PostgreSQL', 'Framer Motion'],
    github: 'https://github.com/infinitysggscc',
    demo: '#',
    featured: false,
    accent: 'bg-neo-pink',
  },
  {
    title: 'DU Campus Pulse Bot',
    category: 'AI & Student Workflow',
    description: 'Conversational campus assistant parsing SGGSCC notices, timetable schedules, society events, and academic syllabus updates into clear summaries.',
    tech: ['Python', 'LangChain', 'FastAPI', 'Telegram API'],
    github: 'https://github.com/infinitysggscc',
    demo: '#',
    featured: false,
    accent: 'bg-neo-yellow',
  },
];

// Team & Leadership per Section 10
const CORE_TEAM = [
  {
    name: 'Dr. Rekha Sharma',
    role: 'Faculty Convener',
    domain: 'Department of Computer Science',
    initials: 'RS',
    accent: 'bg-neo-yellow',
    note: 'Guiding academic rigor & innovation',
    social: { linkedin: 'https://www.linkedin.com/school/sggscc/' },
  },
  {
    name: 'Harsh Vardhan',
    role: 'President',
    domain: 'Society Leadership & Strategy',
    initials: 'HV',
    accent: 'bg-neo-blue',
    note: 'Overseeing all 8 technology tracks',
    social: { linkedin: 'https://www.linkedin.com/company/infinitysggscc/' },
  },
  {
    name: 'Ananya Mehra',
    role: 'Vice President',
    domain: 'Operations & Member Welfare',
    initials: 'AM',
    accent: 'bg-neo-pink',
    note: 'Campus outreach & partnerships',
    social: { linkedin: 'https://www.linkedin.com/company/infinitysggscc/' },
  },
  {
    name: 'Rohan Sethi',
    role: 'Technical Lead',
    domain: 'Full Stack & Open Source',
    initials: 'RS',
    accent: 'bg-neo-yellow',
    note: 'Building student software & CTF',
    social: { linkedin: 'https://www.linkedin.com/company/infinitysggscc/' },
  },
  {
    name: 'Simran Kaur',
    role: 'Design & Creative Lead',
    domain: 'UI/UX & Graphista Lead',
    initials: 'SK',
    accent: 'bg-neo-blue',
    note: 'Creative direction & brand identity',
    social: { linkedin: 'https://www.linkedin.com/company/infinitysggscc/' },
  },
  {
    name: 'Jaspreet Singh',
    role: 'Cybersecurity Head',
    domain: 'CTF & Digital Hygiene',
    initials: 'JS',
    accent: 'bg-neo-pink',
    note: 'Red team drills & security workshops',
    social: { linkedin: 'https://www.linkedin.com/company/infinitysggscc/' },
  },
];

const FAQS = [
  {
    q: 'What is INFINITY and which institution does it belong to?',
    a: 'INFINITY is the official student-led academic technology society of Sri Guru Gobind Singh College of Commerce (SGGSCC), University of Delhi. We foster hands-on software engineering, design systems, cybersecurity literacy, competitive gaming, and industry readiness.',
  },
  {
    q: 'Do I need prior coding experience to attend events or join?',
    a: 'No prior coding experience is required! INFINITY spans diverse domains including creative design, digital economy, esports, and cybersecurity awareness alongside core software engineering. We offer beginner-friendly workshops through to advanced hackathons.',
  },
  {
    q: 'Are event registrations on this platform complimentary?',
    a: 'Yes, all workshops, seminars, and hackathons hosted on this digital portal are completely free for students. Simply register to secure your digital pass with an instant verifiable QR ticket.',
  },
  {
    q: 'How does attendance and certificate issuance work?',
    a: 'When you attend an event, the administration checks you in on the portal. Once marked Present, your digitally verified Certificate of Participation is generated and ready to download in your Student Dashboard.',
  },
];

export const Home: React.FC = () => {
  const { events } = useEvents();
  const [eventFilter, setEventFilter] = useState<'all' | 'workshops' | 'competitions' | 'flagship'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Filter events
  const now = new Date();
  const publishedEvents = events.filter((e) => e.status === 'published');
  const upcomingEvents = publishedEvents.filter((e) => new Date(e.startAt) >= now);

  const filteredEvents = (upcomingEvents.length > 0 ? upcomingEvents : publishedEvents).filter((evt) => {
    if (eventFilter === 'all') return true;
    if (eventFilter === 'workshops') return evt.category === 'workshops' || evt.category === 'ai-emerging-tech';
    if (eventFilter === 'competitions') return evt.category === 'gaming-competitions' || evt.category === 'cybersecurity';
    if (eventFilter === 'flagship') return evt.category === 'design-creative' || evt.category === 'ai-emerging-tech';
    return true;
  }).slice(0, 3);

  return (
    <div className="flex flex-col gap-20 sm:gap-24 md:gap-32 pb-24 overflow-hidden relative">
      {/* ══════════════════════════════════════════════════════════════
          SECTION 5: HERO SECTION (Two-Column Playful Neo-Brutalism)
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto w-full pt-4 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* LEFT SIDE per Prompt Section 5 */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 text-left"
          >
            {/* Small handwritten label: HELLO, INNOVATORS! */}
            <div className="inline-flex items-center gap-2 self-start">
              <span className="font-handwriting text-xl sm:text-2xl md:text-3xl font-black text-neo-pink transform -rotate-2 inline-flex items-center gap-2 px-3 py-1 rounded-neo-sm bg-neo-pink/15 border-2 border-neo-border shadow-neo-sm">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-neo-pink text-neo-border" />
                HELLO, INNOVATORS!
              </span>
            </div>

            {/* Main Heading: Where Ideas Meet TECHNOLOGY */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-neo-text dark:text-neo-dark-text leading-[1.1] sm:leading-[1.08] tracking-tight">
              Where Ideas
              <br />
              Meet{' '}
              <span className="inline-block bg-neo-yellow text-neo-border px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-neo-md border-[2.5px] sm:border-[3px] border-neo-border shadow-neo-sm transform -rotate-1">
                TECHNOLOGY.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl font-body">
              A community of creators, developers and innovators building meaningful experiences through technology, collaboration and creativity.
            </p>

            {/* Buttons: Primary CTA sky-blue per prompt, secondary yellow - fully responsive */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link to="/events" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                  icon={<ArrowRight className="w-4 h-4 text-neo-border" />}
                >
                  Explore Infinity
                </Button>
              </Link>
              <Link to="/join" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center">
                  Join Our Community
                </Button>
              </Link>
            </div>

            {/* Quick Micro-Stats Strip with enhanced light tints & responsive mobile stacking */}
            <div className="pt-6 border-t-2 border-neo-border/20 dark:border-neo-dark-border/20 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs font-mono">
              <div className="p-3 bg-[#FFF0F6] dark:bg-neo-dark-card border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark hover:shadow-neo dark:hover:shadow-neo-dark hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-1.5 text-neo-border dark:text-neo-dark-text font-bold">
                  <Palette className="w-3.5 h-3.5 text-neo-pink" />
                  <span className="font-heading text-lg font-black text-neo-text dark:text-neo-dark-text">400+</span>
                </div>
                <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-[11px] leading-tight mt-0.5">Graphista Entries</p>
              </div>

              <div className="p-3 bg-[#EFF9FF] dark:bg-neo-dark-card border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark hover:shadow-neo dark:hover:shadow-neo-dark hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-1.5 text-neo-border dark:text-neo-dark-text font-bold">
                  <Globe className="w-3.5 h-3.5 text-neo-blue" />
                  <span className="font-heading text-lg font-black text-neo-text dark:text-neo-dark-text">50+</span>
                </div>
                <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-[11px] leading-tight mt-0.5">Colleges Engaged</p>
              </div>

              <div className="p-3 bg-[#FFF8E1] dark:bg-neo-dark-card border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark hover:shadow-neo dark:hover:shadow-neo-dark hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-1.5 text-neo-border dark:text-neo-dark-text font-bold">
                  <Cpu className="w-3.5 h-3.5 text-neo-border dark:text-neo-yellow" />
                  <span className="font-heading text-lg font-black text-neo-text dark:text-neo-dark-text">8 Tracks</span>
                </div>
                <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-[11px] leading-tight mt-0.5">Tech Domains</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE per Prompt Section 5: Large framed technology-themed visual */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            {/* Framed composition: 3px black border, hard offset shadow, corner brackets */}
            <div className="relative w-full rounded-neo-lg bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg overflow-hidden">
              {/* Corner brackets decorations */}
              <div className="absolute top-2 left-2 font-mono text-xs font-black text-neo-border dark:text-neo-yellow z-20 pointer-events-none">
                ┌
              </div>
              <div className="absolute top-2 right-2 font-mono text-xs font-black text-neo-border dark:text-neo-yellow z-20 pointer-events-none">
                ┐
              </div>
              <div className="absolute bottom-2 left-2 font-mono text-xs font-black text-neo-border dark:text-neo-yellow z-20 pointer-events-none">
                └
              </div>
              <div className="absolute bottom-2 right-2 font-mono text-xs font-black text-neo-border dark:text-neo-yellow z-20 pointer-events-none">
                ┘
              </div>

              {/* Neo Terminal Window Header */}
              <div className="px-5 py-3.5 bg-neo-yellow border-b-[2.5px] border-neo-border flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-400 border border-neo-border inline-block shadow-neo-sm" />
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-300 border border-neo-border inline-block shadow-neo-sm" />
                  <span className="w-3.5 h-3.5 rounded-full bg-green-400 border border-neo-border inline-block shadow-neo-sm" />
                  <span className="font-mono text-xs font-bold text-neo-border ml-2">
                    infinity://sggscc.du
                  </span>
                </div>
              </div>

              {/* Framed Visual Body with Stylised Infinity Symbol & Circuit-Inspired Details */}
              <div className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[340px] relative z-10 neo-dot-pattern">
                {/* Decorative floating badges */}
                <div className="absolute top-4 left-4 bg-neo-pink text-neo-border text-[10px] font-mono font-black px-2 py-0.5 rounded-neo-sm border-2 border-neo-border shadow-neo-sm transform -rotate-3">
                  ★ CREATIVE TECH
                </div>
                <div className="absolute top-4 right-4 bg-neo-blue text-neo-border text-[10px] font-mono font-black px-2 py-0.5 rounded-neo-sm border-2 border-neo-border shadow-neo-sm transform rotate-2">
                  SGGSCC // DU
                </div>

                <div className="w-full flex flex-col items-center text-center gap-4 mt-1">
                  {/* Official Club Emblem Framed Presentation */}
                  <div className="relative my-1 p-5 w-full bg-white dark:bg-neo-dark-bg border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo dark:shadow-neo-dark rounded-neo-md text-center flex flex-col items-center justify-center">
                    <div className="p-3 rounded-neo-sm bg-neo-yellow border-2 border-neo-border shadow-neo-sm mb-2 text-neo-border">
                      <InfinitySymbol size="lg" />
                    </div>
                    <span className="font-heading font-black text-2xl tracking-wider text-neo-text dark:text-neo-dark-text uppercase leading-none">
                      INFINITY
                    </span>
                    <span className="font-handwriting text-base font-bold text-neo-text/80 dark:text-neo-yellow tracking-wide mt-1 -rotate-1">
                      The Tech Society
                    </span>
                  </div>

                  <div className="w-full p-4 rounded-neo-md bg-white dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border shadow-neo-sm dark:shadow-neo-dark text-left font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neo-text/70 dark:text-neo-dark-text/70 font-semibold">Society:</span>
                      <span className="text-neo-text dark:text-neo-dark-text font-black">INFINITY SGGSCC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neo-text/70 dark:text-neo-dark-text/70 font-semibold">Institution:</span>
                      <span className="text-neo-text dark:text-neo-dark-text font-bold truncate max-w-[190px]">
                        Sri Guru Gobind Singh College of Commerce
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neo-text/70 dark:text-neo-dark-text/70 font-semibold">Active Pillars:</span>
                      <span className="text-neo-border font-bold bg-neo-yellow px-1.5 py-0.2 rounded-neo-sm border border-neo-border">
                        8 Tech Domains
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neo-text/70 dark:text-neo-dark-text/70 font-semibold">Operational Status:</span>
                      <span className="text-neo-border bg-neo-blue px-1.5 py-0.2 rounded-neo-sm border border-neo-border font-black flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Live & Open
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee Ribbon ── */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6: ABOUT SECTION ("More Than a Technology Club")
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            label="About Society"
            title="More Than a Technology Club."
            highlightWord="Technology"
            description="Introducing Infinity: where computer science meets creative design, competitive spirit, and real-world impact at SGGSCC."
          />
          <Link to="/about">
            <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
              Read Verified History
            </Button>
          </Link>
        </div>

        {/* Editorial Layout: Outlined Cards with Hard Offset Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 (Span 6): Vision & Mission */}
          <div className="md:col-span-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-lg p-6 sm:p-8 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="font-handwriting text-xl font-bold text-neo-pink">
                ★ OUR NORTH STAR
              </span>
              <Badge variant="yellow" size="sm">
                Vision & Mission
              </Badge>
            </div>
            <h3 className="font-heading font-black text-2xl text-neo-text dark:text-neo-dark-text mb-3">
              Cultivating Real-World Technical Craftsmanship
            </h3>
            <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-sm sm:text-base leading-relaxed font-body mb-4">
              Infinity was established at Sri Guru Gobind Singh College of Commerce to bridge the gap between classroom theory and industry-grade engineering. We equip undergraduate students to author production software, design human-centered interfaces, and solve complex technological challenges.
            </p>
            <div className="p-3 bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm font-mono text-xs flex items-center justify-between shadow-neo-sm dark:shadow-neo-dark">
              <span className="font-bold text-neo-text dark:text-neo-dark-text">Affiliation:</span>
              <span className="font-black text-neo-border bg-neo-yellow px-2 py-0.5 rounded-neo-sm border border-neo-border">
                SGGSCC, University of Delhi
              </span>
            </div>
          </div>

          {/* Card 2 (Span 6): Community & Inclusive Culture */}
          <div className="md:col-span-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-lg p-6 sm:p-8 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="font-handwriting text-xl font-bold text-neo-blue">
                ★ 500+ BUILDERS
              </span>
              <Badge variant="blue" size="sm">
                Inclusive Community
              </Badge>
            </div>
            <h3 className="font-heading font-black text-2xl text-neo-text dark:text-neo-dark-text mb-3">
              Everyone Has a Seat at the Innovation Table
            </h3>
            <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-sm sm:text-base leading-relaxed font-body mb-4">
              Whether you are an aspiring software engineer writing your first line of Python, a Figma enthusiast designing vector illustrations, or a competitive gamer strategizing with your squad — Infinity welcomes all backgrounds. No prior coding experience required.
            </p>
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-2.5 bg-neo-yellow border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm text-neo-border font-bold text-center shadow-neo-sm">
                Hands-On Workshops
              </div>
              <div className="p-2.5 bg-neo-pink border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm text-neo-border font-bold text-center shadow-neo-sm">
                National Competitions
              </div>
            </div>
          </div>

          {/* Card 3 (Span 12): Verified Institutional Report Citations */}
          <div className="md:col-span-12 bg-neo-bg dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-lg p-6 sm:p-8 shadow-neo dark:shadow-neo-dark">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="font-handwriting text-xl font-bold text-neo-border dark:text-neo-yellow">
                  ★ OFFICIAL SGGSCC ANNUAL REPORT 2023–24 CITATIONS
                </span>
                <h4 className="font-heading font-black text-xl text-neo-text dark:text-neo-dark-text mt-1">
                  Documented Campus Impact & Milestones
                </h4>
              </div>
              <a
                href="https://www.sggscc.ac.in/uploads/staticfiles/societies/Infinity%20Annual%20Report%202023-24.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neo-border bg-neo-yellow px-3 py-1.5 rounded-neo-sm border-2 border-neo-border shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 transition-all self-start sm:self-auto"
              >
                <span>View Official PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-white dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark">
                <span className="text-neo-pink font-black text-lg block mb-1">Graphista Contest</span>
                <p className="text-neo-text/80 dark:text-neo-dark-text/80 font-body text-xs">
                  400+ registrations across 50+ colleges & institutions nationally in graphic design and visual storytelling.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark">
                <span className="text-neo-blue font-black text-lg block mb-1">WAGMI x Mudrex Web3</span>
                <p className="text-neo-text/80 dark:text-neo-dark-text/80 font-body text-xs">
                  Industry-partnered workshop educating students on decentralized finance, smart contract architecture, and web3 ecosystems.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark">
                <span className="text-neo-yellow font-black text-lg block mb-1">Digital Rupee & Fintech</span>
                <p className="text-neo-text/80 dark:text-neo-dark-text/80 font-body text-xs">
                  100+ active attendees unpacked India’s fintech growth trajectory, UPI architecture, and Central Bank Digital Currencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 7: TECHNOLOGY DOMAINS (8 Interactive Cards)
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="domains"
        className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            label="Specialized Tracks"
            title="Technology Domains"
            highlightWord="Domains"
            description="Explore our 8 specialized learning and engineering tracks. From neural networks to hardware IoT, pick your domain and build."
          />
          <Link to="/explore">
            <Button variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
              Deep Dive into Tracks
            </Button>
          </Link>
        </div>

        {/* 8 Responsive Interactive Domain Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_DOMAINS.map((domain, idx) => {
            const Icon = domain.icon;
            // Alternating surface tints for light UI richness
            const surfaceBg =
              idx % 4 === 0
                ? 'bg-[#FFF8E1] dark:bg-neo-dark-card'
                : idx % 4 === 1
                ? 'bg-[#EFF9FF] dark:bg-neo-dark-card'
                : idx % 4 === 2
                ? 'bg-[#FFF0F6] dark:bg-neo-dark-card'
                : 'bg-[#ECFDF5] dark:bg-neo-dark-card';

            return (
              <div
                key={domain.id}
                className={`group relative flex flex-col justify-between ${surfaceBg} border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md p-6 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg hover:-translate-y-1.5 transition-all duration-200`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-12 h-12 rounded-neo-sm ${domain.color} border-2 border-neo-border shadow-neo-sm flex items-center justify-center text-neo-border group-hover:rotate-6 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant={domain.tagColor} size="sm">
                      {domain.tag}
                    </Badge>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading font-black text-xl text-neo-text dark:text-neo-dark-text group-hover:text-neo-blue transition-colors">
                    {domain.title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-neo-text/60 dark:text-neo-dark-text/60 mb-2">
                    {domain.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-neo-text/75 dark:text-neo-dark-text/75 leading-relaxed font-body">
                    {domain.description}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {domain.techs.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-neo-sm bg-white dark:bg-neo-dark-bg border border-neo-border dark:border-neo-dark-border text-neo-text dark:text-neo-dark-text shadow-neo-sm dark:shadow-neo-dark"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Action Button */}
                <div className="pt-6 mt-6 border-t-2 border-neo-border/20 dark:border-neo-dark-border/20">
                  <Link
                    to="/explore"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-neo-sm text-xs font-heading font-bold text-neo-border dark:text-white bg-white dark:bg-neo-dark-card border-2 border-neo-border dark:border-neo-dark-border shadow-neo-sm dark:shadow-neo-dark group-hover:bg-neo-yellow group-hover:text-neo-border dark:group-hover:bg-neo-yellow dark:group-hover:text-neo-border dark:group-hover:border-neo-border transition-all"
                  >
                    <span>Explore Domain</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8: EVENTS SECTION (Vibrant Showcase & Filters)
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="events"
        className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeader
            label="Schedule & Passes"
            title="Upcoming Workshops & Events"
            highlightWord="Events"
            description="Reserve your complimentary student pass for hands-on technical bootcamps, gaming showdowns, and design hackathons."
          />
          <Link to="/events">
            <Button variant="primary" icon={<CalendarDays className="w-4 h-4" />}>
              Browse Full Calendar
            </Button>
          </Link>
        </div>

        {/* Filter Tabs per Prompt Section 8 - mobile swipeable */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {(
            [
              { key: 'all', label: 'All Activities' },
              { key: 'workshops', label: 'Workshops & Labs' },
              { key: 'competitions', label: 'Competitions & CTF' },
              { key: 'flagship', label: 'Flagship Masterclasses' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setEventFilter(tab.key)}
              className={`px-4 py-1.5 rounded-neo-sm text-xs font-heading font-black border-2 border-neo-border shadow-neo-sm transition-all whitespace-nowrap shrink-0 ${
                eventFilter === tab.key
                  ? 'bg-neo-yellow text-neo-border shadow-neo -translate-y-0.5'
                  : 'bg-white dark:bg-neo-dark-card text-neo-text dark:text-neo-dark-text hover:bg-neo-bg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div key={evt.id}>
              <EventCard event={evt} featured={evt.category === 'ai-emerging-tech'} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 9: PROJECTS SECTION (Member-Built Innovations)
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="projects"
        className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            label="Built by Society"
            title="Member-Built Projects"
            highlightWord="Projects"
            description="Software products, security platforms, and design galleries engineered directly by student members of Infinity."
          />
          <a
            href="https://github.com/infinitysggscc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-neo-sm bg-white dark:bg-neo-dark-card text-neo-border dark:text-neo-dark-text font-heading font-black text-xs border-2 border-neo-border shadow-neo hover:shadow-neo-lg hover:-translate-y-0.5 transition-all self-start md:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Organization</span>
          </a>
        </div>

        {/* Large Feature Card + Smaller Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Feature Card: Infinity Platform 2.0 (Span 7) */}
          <div className="md:col-span-7 bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg p-6 sm:p-8 shadow-neo-lg dark:shadow-neo-dark-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant="yellow" size="md">
                  ★ Flagship Society Platform
                </Badge>
                <span className="font-mono text-xs font-bold text-neo-text/60 dark:text-neo-dark-text/60">
                  Open Source
                </span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-neo-text dark:text-neo-dark-text mb-3">
                {MEMBER_PROJECTS[0].title}
              </h3>
              <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-sm sm:text-base leading-relaxed font-body mb-6">
                {MEMBER_PROJECTS[0].description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {MEMBER_PROJECTS[0].tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border text-neo-text dark:text-neo-dark-text shadow-neo-sm dark:shadow-neo-dark"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t-2 border-neo-border/20 dark:border-neo-dark-border/20 flex flex-wrap items-center gap-3">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-neo-sm bg-neo-yellow text-neo-border font-heading font-bold text-xs border-2 border-neo-border shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Live Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={MEMBER_PROJECTS[0].github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-neo-sm bg-white dark:bg-neo-dark-bg text-neo-text dark:text-neo-dark-text font-heading font-bold text-xs border-2 border-neo-border dark:border-neo-dark-border shadow-neo-sm dark:shadow-neo-dark hover:shadow-neo hover:-translate-y-0.5 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            </div>
          </div>

          {/* Three Smaller Project Cards (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {MEMBER_PROJECTS.slice(1).map((proj, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md p-5 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border border-neo-border dark:border-neo-dark-border text-neo-text dark:text-neo-dark-text">
                    {proj.category}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${proj.accent} border border-neo-border`} />
                </div>
                <h4 className="font-heading font-bold text-lg text-neo-text dark:text-neo-dark-text mb-1">
                  {proj.title}
                </h4>
                <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75 line-clamp-2 leading-relaxed mb-3">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border border-neo-border dark:border-neo-dark-border text-neo-text/80 dark:text-neo-dark-text/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 10: TEAM SECTION (Framed Profile Cards)
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="team"
        className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            label="Society Leadership"
            title="The Core Council"
            highlightWord="Council"
            description="Meet the faculty coordinator and student domain leads powering workshops, hackathons, and software engineering at Infinity."
          />
          <Link to="/about">
            <Button variant="outline" icon={<UsersRound className="w-4 h-4" />}>
              Full Leadership Structure
            </Button>
          </Link>
        </div>

        {/* Framed Profile Cards per Prompt Section 10 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_TEAM.map((member, idx) => {
            const surfaceBg =
              idx % 3 === 0
                ? 'bg-[#FFF8E1] dark:bg-neo-dark-card'
                : idx % 3 === 1
                ? 'bg-[#EFF9FF] dark:bg-neo-dark-card'
                : 'bg-[#FFF0F6] dark:bg-neo-dark-card';

            return (
              <div
                key={idx}
                className={`${surfaceBg} border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md p-6 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  {/* Visual Avatar with initials & accent box */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-neo-md ${member.accent} border-2 border-neo-border shadow-neo-sm flex items-center justify-center font-heading font-black text-xl text-neo-border`}>
                      {member.initials}
                    </div>
                    <Badge variant={idx === 0 ? 'yellow' : idx % 2 === 0 ? 'pink' : 'blue'} size="sm">
                      {member.role}
                    </Badge>
                  </div>

                  <h3 className="font-heading font-black text-xl text-neo-text dark:text-neo-dark-text mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono font-bold text-neo-text/70 dark:text-neo-dark-text/70 mb-2">
                    {member.domain}
                  </p>
                  <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75 font-body leading-relaxed">
                    {member.note}
                  </p>
                </div>

                {/* Social Connect Strip */}
                <div className="pt-4 mt-4 border-t-2 border-neo-border/20 dark:border-neo-dark-border/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-neo-text/60 dark:text-neo-dark-text/60">Connect</span>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-neo-sm bg-white dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border shadow-neo-sm dark:shadow-neo-dark flex items-center justify-center text-neo-border dark:text-white hover:bg-neo-yellow hover:text-neo-border dark:hover:bg-neo-yellow dark:hover:text-neo-border hover:shadow-neo transition-all"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 11: CONTACT & FAQ (Final CTA + Neo Accordion)
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="px-4 sm:px-6 lg:px-8 max-w-container mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: FAQ Accordion (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SectionHeader
              label="Answers & Transparency"
              title="Frequently Asked Questions"
              highlightWord="Questions"
              description="Clear answers about society membership, event attendance passes, and what makes Infinity unique."
            />

            <div className="space-y-3 pt-2">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-neo-md bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo-sm dark:shadow-neo-dark overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-neo-bg/60 dark:hover:bg-neo-dark-bg/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-neo-pink shrink-0" />
                        <span className="font-heading font-black text-neo-text dark:text-neo-dark-text text-sm sm:text-base">
                          {faq.q}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-neo-border dark:text-neo-dark-text transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-neo-text/80 dark:text-neo-dark-text/80 text-xs sm:text-sm leading-relaxed border-t-2 border-neo-border/20 font-body">
                        <p className="mt-3">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Quick Contact & Inquiry Form (Span 5) */}
          <div className="lg:col-span-5 bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg p-6 sm:p-8 shadow-neo-lg dark:shadow-neo-dark-lg">
            <span className="font-handwriting text-2xl font-bold text-neo-pink block mb-1">
              ★ REACH THE COUNCIL
            </span>
            <h3 className="font-heading font-black text-2xl text-neo-text dark:text-neo-dark-text mb-2">
              Have a Query or Idea?
            </h3>
            <p className="text-xs sm:text-sm text-neo-text/75 dark:text-neo-dark-text/75 mb-6 font-body">
              Drop a note to the Infinity core team. We respond to campus collaborations, event questions, and member inquiries.
            </p>

            {contactSubmitted ? (
              <div className="p-6 rounded-neo-md bg-neo-yellow border-2 border-neo-border text-center space-y-2 shadow-neo-sm">
                <CheckCircle2 className="w-8 h-8 text-neo-border mx-auto" />
                <h4 className="font-heading font-black text-lg text-neo-border">Message Transmitted!</h4>
                <p className="text-xs font-mono text-neo-border">
                  Thank you! The Infinity secretarial council will respond to your inquiry shortly.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="mt-3 text-xs font-bold underline text-neo-border cursor-pointer"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    className="w-full px-3.5 py-2.5 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border font-body text-xs text-neo-text dark:text-neo-dark-text focus:outline-none focus:ring-2 focus:ring-neo-yellow shadow-neo-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@sggscc.ac.in"
                    className="w-full px-3.5 py-2.5 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border font-body text-xs text-neo-text dark:text-neo-dark-text focus:outline-none focus:ring-2 focus:ring-neo-yellow shadow-neo-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text uppercase mb-1">
                    Message / Collaboration Note
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us what you'd like to collaborate on..."
                    className="w-full px-3.5 py-2.5 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border font-body text-xs text-neo-text dark:text-neo-dark-text focus:outline-none focus:ring-2 focus:ring-neo-yellow shadow-neo-sm resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  Send Message to Infinity
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
