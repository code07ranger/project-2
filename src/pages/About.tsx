import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Shapes,
  Cpu,
  Orbit,
  CalendarDays,
  ExternalLink,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Crown,
  Terminal,
  Palette,
  GraduationCap,
  Star,
  Layers,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import InfinitySymbol from '../components/ui/InfinitySymbol';
import SpotlightCard from '../components/motion/SpotlightCard';
import BorderBeam from '../components/motion/BorderBeam';
import ParticleBackground from '../components/motion/ParticleBackground';

const VALUES = [
  {
    icon: Cpu,
    title: 'Practical Engineering',
    accentColor: 'bg-neo-yellow',
    tagVariant: 'yellow' as const,
    description:
      'We prioritize hands-on projects, deployments, and problem-solving over passive theoretical tutorials.',
  },
  {
    icon: Orbit,
    title: 'Inclusive Community',
    accentColor: 'bg-neo-blue',
    tagVariant: 'blue' as const,
    description:
      'No prior coding experience required. We nurture beginners and challenge advanced developers alike.',
  },
  {
    icon: Shapes,
    title: 'Design & Cross-Domain Thinking',
    accentColor: 'bg-neo-pink',
    tagVariant: 'pink' as const,
    description:
      'Tech is more than code. We champion UI/UX, product design, creative direction, and digital economics.',
  },
  {
    icon: ShieldCheck,
    title: 'Digital Ethics & Awareness',
    accentColor: 'bg-neo-yellow',
    tagVariant: 'yellow' as const,
    description:
      'Instilling cyber-hygiene, data privacy mindfulness, and responsible technological innovation.',
  },
];

const TIMELINE = [
  {
    year: '2023–24 Academic Session',
    verified: true,
    title: 'Graphista National Design Competition',
    description:
      'Infinity organized its flagship design competition attracting 400+ registrations from over 50 universities and colleges across India.',
    tag: 'Flagship Milestone',
    variant: 'pink' as const,
  },
  {
    year: '2023–24 Academic Session',
    verified: true,
    title: 'Web3.0 Workshop x WAGMI (Mudrex)',
    description:
      'Industry-partnered workshop educating students on decentralized finance, smart contract architecture, and web3 ecosystems.',
    tag: 'Industry Connect',
    variant: 'blue' as const,
  },
  {
    year: '2023–24 Academic Session',
    verified: true,
    title: 'National Webinar on Digital Economy & CBDCs',
    description:
      '100+ active attendees unpacked India’s fintech growth trajectory, UPI architecture, and Central Bank Digital Currencies (Digital Rupee).',
    tag: 'Fintech & Research',
    variant: 'yellow' as const,
  },
  {
    year: '2023–24 Academic Session',
    verified: true,
    title: 'Data Privacy & Cybersecurity Awareness Quizzes',
    description:
      'Campus-wide interactive quiz and workshops promoting safe digital practices and fundamental security literacy.',
    tag: 'Security Literacy',
    variant: 'blue' as const,
  },
  {
    year: '2024–25 Academic Session',
    verified: true,
    title: 'Monthly AI Tools for Students & TechTonics',
    description:
      'Regular workshops introducing undergraduate students to generative AI tools, prompt workflows, and annual fest competitions Cognition & Pass The Pixel.',
    tag: 'Campus Initiative',
    variant: 'yellow' as const,
  },
  {
    year: '2025–26 Academic Session',
    verified: false,
    title: 'Esports Arena & BGMI Showdown 2.0',
    description:
      '[Demo / Publicly Indexed] Multi-stage gaming tournaments and competitive programming showdowns for inter-college squads.',
    tag: 'Competitive Gaming',
    variant: 'pink' as const,
  },
];

const REPRESENTATIVE_COUNCIL = [
  { role: 'President', focus: 'Strategy, Institutional Relations & Vision', icon: Crown, accent: 'bg-neo-yellow' },
  { role: 'Vice President', focus: 'Operations, Outreach & Member Welfare', icon: Award, accent: 'bg-neo-blue' },
  { role: 'Technical Lead', focus: 'Open Source, Web Systems & Code Workshops', icon: Terminal, accent: 'bg-neo-pink' },
  { role: 'Design Lead', focus: 'Visual Systems, UI/UX & Brand Identity', icon: Palette, accent: 'bg-neo-yellow' },
  { role: 'Cybersecurity Lead', focus: 'CTF Competitions, Security Drills & Research', icon: ShieldCheck, accent: 'bg-neo-blue' },
  { role: 'Events & Logistics Lead', focus: 'Hackathon Coordination & Venue Management', icon: CalendarDays, accent: 'bg-neo-pink' },
];

export const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-20 pb-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative overflow-hidden">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto relative z-10"
      >
        <span className="font-handwriting text-2xl font-bold text-neo-pink inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neo-pink/15 border-2 border-neo-border shadow-neo-sm">
          <Star className="w-4 h-4 fill-neo-pink text-neo-border" />
          ABOUT THE SOCIETY
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-neo-text dark:text-neo-dark-text tracking-tight leading-tight">
          Pioneering Student Technology at SGGSCC
        </h1>
        <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-base sm:text-lg leading-relaxed font-body">
          Infinity is the student-led academic technology society of Sri Guru Gobind
          Singh College of Commerce, University of Delhi. Founded to cultivate
          practical engineering, digital awareness, and innovative thinking.
        </p>
      </motion.div>

      {/* ── Mission & College Affiliation with BorderBeam ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative z-10"
      >
        <div className="relative rounded-neo-lg bg-white dark:bg-neo-dark-card p-8 sm:p-12 border-[3px] border-neo-border dark:border-neo-dark-border overflow-hidden shadow-neo-lg dark:shadow-neo-dark-lg">
          <BorderBeam size={280} duration={14} colorFrom="#FFE600" colorTo="#7DD3FC" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <span className="font-mono text-xs uppercase tracking-wider text-neo-border dark:text-neo-yellow font-black flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-neo-yellow" />
                Institutional Affiliation
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-neo-text dark:text-neo-dark-text leading-tight">
                Rooted in Academic Excellence, Driven by Industry Readiness
              </h2>
              <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-sm sm:text-base leading-relaxed font-body">
                As documented in official college archives, Infinity operates as a platform
                where undergraduate students explore modern technology domains outside the
                traditional syllabus. We bridge the classroom-industry divide through peer-to-peer
                learning, expert masterclasses, and national-level competitions.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <a
                  href="https://www.sggscc.ac.in/societies/academicsocieties/infinity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-neo-border dark:text-neo-blue hover:underline"
                >
                  <span>Official SGGSCC Society Page</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="hidden sm:inline text-neo-border/30 dark:text-white/20">•</span>
                <a
                  href="https://www.sggscc.ac.in/uploads/staticfiles/societies/Infinity%20Annual%20Report%202023-24.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-neo-border dark:text-neo-yellow hover:underline"
                >
                  <span>Official 2023–24 Annual Report PDF</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-neo-md bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-center shadow-neo">
              <div className="p-3 bg-neo-yellow border-2 border-neo-border rounded-neo-md shadow-neo-sm mb-3 text-neo-border">
                <InfinitySymbol size="lg" />
              </div>
              <h3 className="font-heading font-black text-neo-text dark:text-neo-dark-text text-2xl tracking-wider uppercase leading-none">
                INFINITY
              </h3>
              <p className="font-handwriting text-base font-bold text-neo-text/80 dark:text-neo-yellow mt-0.5 -rotate-1">
                The Tech Society
              </p>
              <p className="text-xs text-neo-text/70 dark:text-neo-dark-text/70 font-mono mt-2">
                Sri Guru Gobind Singh College of Commerce • University of Delhi
              </p>
              <div className="mt-4 pt-4 border-t-2 border-neo-border/20 w-full flex items-center justify-center gap-2 text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Officially Recognized Academic Society</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Core Values (Spotlight Cards) ── */}
      <section className="flex flex-col gap-10 relative z-10">
        <SectionHeader
          label="Our Philosophy"
          title="What Defines Infinity"
          highlightWord="Infinity"
          description="We uphold four core pillars that guide every workshop, project, and event we host."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md p-6 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg hover:-translate-y-1 transition-all flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-neo-sm ${val.accentColor} border-2 border-neo-border shadow-neo-sm flex items-center justify-center text-neo-border`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant={val.tagVariant} size="sm">
                    Pillar
                  </Badge>
                </div>
                <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
                  {val.title}
                </h3>
                <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-xs sm:text-sm leading-relaxed font-body">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Verified Historical Timeline ── */}
      <section className="flex flex-col gap-10 relative z-10">
        <SectionHeader
          label="Documented Journey"
          title="Verified Milestones & Achievements"
          highlightWord="Milestones"
          description="Grounding our pride in verified records from the college archives and official reports."
        />

        <div className="relative border-l-[3px] border-neo-border ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Bullet node */}
              <div className="absolute -left-[33px] sm:-left-[49px] top-2 w-5 h-5 rounded-full bg-neo-yellow border-2 border-neo-border shadow-neo-sm group-hover:scale-125 transition-transform" />

              <div className="bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md p-6 shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg hover:-translate-y-1 transition-all flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-black text-neo-border dark:text-neo-yellow bg-neo-yellow dark:bg-neo-dark-bg px-2.5 py-0.5 rounded-neo-sm border border-neo-border">
                    {item.year}
                  </span>
                  <Badge variant={item.variant} size="sm">
                    {item.tag}
                  </Badge>
                </div>

                <h3 className="font-heading font-black text-xl text-neo-text dark:text-neo-dark-text mt-1">
                  {item.title}
                </h3>

                <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-sm leading-relaxed font-body">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Executive Structure ── */}
      <section id="team" className="flex flex-col gap-8 bg-white dark:bg-neo-dark-card p-8 sm:p-10 rounded-neo-lg border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-handwriting text-xl font-bold text-neo-pink block mb-1">
              ★ LEADERSHIP ROLES
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-neo-text dark:text-neo-dark-text">
              Society Council Structure
            </h2>
            <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-sm mt-1 max-w-xl font-body">
              Per official guidelines, the functional leadership model coordinates workshops, industry hackathons, design competitions, and technical infrastructure.
            </p>
          </div>
          <Link to="/join">
            <Button size="sm" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Join the Team
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REPRESENTATIVE_COUNCIL.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 transition-all flex items-start gap-4"
              >
                <div className={`p-3 rounded-neo-sm ${c.accent} border-2 border-neo-border text-neo-border shrink-0 shadow-neo-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-neo-text dark:text-neo-dark-text text-base">
                    {c.role}
                  </h4>
                  <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75 mt-1 leading-relaxed font-body">
                    {c.focus}
                  </p>
                  <span className="inline-block mt-2 font-mono text-[11px] font-bold text-neo-text/60 dark:text-neo-dark-text/60">
                    Council Directorate
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default About;
