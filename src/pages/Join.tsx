import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Send,
  Instagram,
  Linkedin,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Code,
  Palette,
  Shield,
  Gamepad2,
  Globe,
  Star,
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import InfinitySymbol from '../components/ui/InfinitySymbol';
import BorderBeam from '../components/motion/BorderBeam';
import ParticleBackground from '../components/motion/ParticleBackground';

const RECRUITMENT_STEPS = [
  {
    step: '01',
    title: 'Interest Application',
    desc: 'Submit your profile, technical interests, and projects via our portal.',
    accent: 'bg-neo-yellow',
  },
  {
    step: '02',
    title: 'Skill & Task Sprint',
    desc: 'Complete an open challenge tailored to your chosen domain (code, design, or case study).',
    accent: 'bg-neo-blue',
  },
  {
    step: '03',
    title: 'Interactive Interview',
    desc: 'Meet senior council leads to discuss your passion, teamwork ethos, and learning goals.',
    accent: 'bg-neo-pink',
  },
  {
    step: '04',
    title: 'Induction & Onboarding',
    desc: 'Welcome to Infinity! Get assigned to your domain squad and start building.',
    accent: 'bg-neo-yellow',
  },
];

export const Join: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('B.Sc. (Hons) Computer Science');
  const [year, setYear] = useState('1st Year');
  const [domain, setDomain] = useState('AI & Emerging Tech');
  const [statement, setStatement] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-16 pb-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative overflow-hidden">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto relative z-10"
      >
        <div className="p-2 rounded-neo-sm bg-neo-yellow border-2 border-neo-border shadow-neo-sm text-neo-border">
          <InfinitySymbol size="md" />
        </div>
        <span className="font-handwriting text-2xl font-bold text-neo-pink inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neo-pink/15 border-2 border-neo-border shadow-neo-sm">
          <Star className="w-4 h-4 fill-neo-pink text-neo-border" />
          RECRUITMENT & MEMBERSHIP
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-neo-text dark:text-neo-dark-text tracking-tight leading-tight">
          Join the Movement Beyond Technology
        </h1>
        <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-base sm:text-lg leading-relaxed font-body">
          Become part of Sri Guru Gobind Singh College of Commerce's premier tech
          society. Build products, organize national fests, and level up your skills.
        </p>
      </motion.div>

      {/* ── Official Verification Notice ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="p-5 rounded-neo-md bg-neo-yellow border-2 border-neo-border text-neo-border shadow-neo flex items-start sm:items-center gap-3.5 max-w-3xl mx-auto relative z-10"
      >
        <ShieldAlert className="w-6 h-6 text-neo-border shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-xs font-mono font-medium leading-relaxed">
          <strong className="font-black uppercase">Prototype Platform Notice:</strong> Submitting this
          form registers your profile in the digital platform. Official annual recruitment drives
          are also announced via the official{' '}
          <a
            href="https://www.instagram.com/infinity.sggscc/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            Infinity Instagram
          </a>{' '}
          and college notice boards.
        </p>
      </motion.div>

      {/* ── Induction Steps ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {RECRUITMENT_STEPS.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-neo-md bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg hover:-translate-y-1 transition-all flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-3xl font-black text-neo-border dark:text-neo-yellow">{s.step}</span>
              <div className={`w-3.5 h-3.5 rounded-full ${s.accent} border-2 border-neo-border`} />
            </div>
            <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">{s.title}</h3>
            <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75 leading-relaxed font-body">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Application Form / Success State with BorderBeam ── */}
      <div className="max-w-2xl mx-auto w-full relative z-10">
        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center gap-6 bg-white dark:bg-neo-dark-card rounded-neo-lg border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg relative overflow-hidden">
            <BorderBeam size={260} duration={10} colorFrom="#10B981" colorTo="#7DD3FC" />

            <div className="w-16 h-16 rounded-full bg-green-400 border-2 border-neo-border text-neo-border flex items-center justify-center relative z-10 shadow-neo-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="relative z-10">
              <h2 className="font-heading font-black text-2xl text-neo-text dark:text-neo-dark-text">
                Application Received!
              </h2>
              <p className="text-sm text-neo-text/80 dark:text-neo-dark-text/80 mt-2 leading-relaxed font-body">
                Thank you for applying to join INFINITY, <strong>{name}</strong>! Your
                interest in <strong>{domain}</strong> has been logged in the system.
              </p>
            </div>

            <div className="p-4 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-xs text-neo-text/80 dark:text-neo-dark-text/80 max-w-md relative z-10 font-mono">
              Follow our official society channels for upcoming recruitment updates, task sprint
              prompts, and interview schedules.
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <a
                href="https://www.instagram.com/infinity.sggscc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-neo-sm bg-neo-pink text-neo-border font-bold border-2 border-neo-border text-xs shadow-neo-sm hover:shadow-neo transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>@infinity.sggscc</span>
              </a>
              <a
                href="https://www.linkedin.com/company/infinitysggscc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-neo-sm bg-neo-blue text-neo-border font-bold border-2 border-neo-border text-xs shadow-neo-sm hover:shadow-neo transition-all"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setStatement('');
              }}
            >
              Submit Another Application
            </Button>
          </div>
        ) : (
          <div className="p-8 sm:p-10 bg-white dark:bg-neo-dark-card rounded-neo-lg border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg relative overflow-hidden">
            <BorderBeam size={280} duration={14} colorFrom="#FFE600" colorTo="#7DD3FC" />

            <div className="mb-8 relative z-10">
              <h2 className="font-heading font-black text-2xl text-neo-text dark:text-neo-dark-text">
                Candidate Application Form
              </h2>
              <p className="text-xs text-neo-text/70 dark:text-neo-dark-text/70 mt-1 font-body">
                Tell us about your passions, skills, and which Infinity track excites you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <Input
                label="Full Name"
                placeholder="e.g. Navjot Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. navjot@sggscc.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Phone / WhatsApp"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text uppercase">
                    Course / Degree
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text px-3.5 py-2.5 text-xs font-body shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow"
                  >
                    <option value="B.Sc. (Hons) Computer Science">B.Sc. (Hons) Computer Science</option>
                    <option value="B.Com (Hons)">B.Com (Hons)</option>
                    <option value="B.A. (Hons) Business Economics">B.A. (Hons) Business Economics</option>
                    <option value="B.A. (Hons) Economics">B.A. (Hons) Economics</option>
                    <option value="Other Department / Institution">Other Department / College</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text uppercase">
                    Academic Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text px-3.5 py-2.5 text-xs font-body shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text uppercase">
                  Primary Domain of Interest
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text px-3.5 py-2.5 text-xs font-body shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow"
                >
                  <option value="AI & Emerging Tech">AI & Emerging Technology</option>
                  <option value="Cybersecurity">Cybersecurity & Digital Awareness</option>
                  <option value="Design & Creative">Design & Creative Technology</option>
                  <option value="Gaming & Esports">Gaming & Competitions</option>
                  <option value="Web3 & Digital Economy">Web3 & Digital Economy</option>
                  <option value="Core Development / Open Source">Core Web/App Development</option>
                  <option value="Events, PR & Logistics">Events, PR & Operations</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text uppercase">
                  Why do you want to join Infinity?
                </label>
                <textarea
                  rows={3}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="Share your interests, what you hope to learn, or past projects you worked on…"
                  className="w-full rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text p-3 text-xs font-body shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow resize-none"
                  required
                />
              </div>

              <Input
                label="Portfolio / GitHub / LinkedIn (Optional)"
                placeholder="https://github.com/your-handle"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />

              <div className="pt-2">
                <Button type="submit" fullWidth size="lg" variant="primary" loading={loading} icon={<Send className="w-4 h-4" />}>
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
