import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, ExternalLink, Heart, Sparkles, Terminal } from 'lucide-react';
import InfinitySymbol from '../ui/InfinitySymbol';

const NAV_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'About Society', to: '/about' },
      { label: 'Technology Tracks', to: '/explore' },
      { label: 'Upcoming Events', to: '/events' },
      { label: 'Member Projects', to: '/explore#projects' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Build With Us', to: '/join' },
      { label: 'Student Dashboard', to: '/dashboard' },
      { label: 'Certificate Verifier', to: '/events' },
      { label: 'Core Team & Leads', to: '/about#team' },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/infinity.sggscc/',
    icon: Instagram,
    color: 'bg-neo-pink',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/infinitysggscc/',
    icon: Linkedin,
    color: 'bg-neo-blue',
  },
  {
    label: 'Email Us',
    href: 'mailto:infinity@sggscc.ac.in',
    icon: Mail,
    color: 'bg-neo-yellow',
  },
] as const;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neo-bg dark:bg-neo-dark-bg border-t-[3px] border-neo-border text-neo-text dark:text-neo-dark-text transition-colors duration-200">
      {/* ── Top Final CTA Strip ── */}
      <div className="border-b-2 border-neo-border/20 dark:border-neo-dark-border/20 py-8 px-4 sm:px-6 lg:px-8 max-w-container mx-auto">
        <div className="bg-neo-yellow dark:bg-neo-dark-card border-[2.5px] border-neo-border rounded-neo-lg p-6 sm:p-10 shadow-neo-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-handwriting text-xl sm:text-2xl font-bold text-neo-border inline-block transform -rotate-1">
              READY TO BUILD SOMETHING EXTRAORDINARY?
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-neo-border dark:text-neo-dark-text">
              Build the Future With Infinity SGGSCC.
            </h3>
            <p className="text-neo-border/80 dark:text-neo-dark-text/80 text-sm max-w-xl font-body">
              Whether you write code, design interfaces, research cybersecurity, or organize hackathons — Infinity is your launchpad.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-6 py-3 rounded-neo-md bg-white dark:bg-neo-dark-bg text-neo-border dark:text-neo-dark-text font-heading font-black text-sm uppercase tracking-wider border-2 border-neo-border shadow-neo hover:shadow-neo-lg hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>Build With Us</span>
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-neo-md bg-neo-blue text-neo-border font-heading font-bold text-sm border-2 border-neo-border shadow-neo hover:shadow-neo-lg hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>Browse Events</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Society Identity (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-neo-sm bg-neo-yellow border-2 border-neo-border shadow-neo-sm flex items-center justify-center group-hover:rotate-6 transition-transform text-neo-border">
                <InfinitySymbol size="sm" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-black text-2xl tracking-wider text-neo-text dark:text-neo-dark-text leading-none uppercase">
                  INFINITY
                </span>
                <span className="font-handwriting text-sm font-bold text-neo-text/80 dark:text-neo-yellow tracking-wide mt-0.5 -rotate-1">
                  The Tech Society • SGGSCC, DU
                </span>
              </div>
            </Link>

            <p className="text-sm text-neo-text/80 dark:text-neo-dark-text/80 leading-relaxed font-body max-w-md">
              The premier student-led technology society of Sri Guru Gobind Singh College of Commerce, University of Delhi. Fostering software engineering, design thinking, cybersecurity literacy, and national competitions.
            </p>

            {/* Social Pills */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-neo-sm ${color} border-2 border-neo-border shadow-neo-sm flex items-center justify-center text-neo-border hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all`}
                  aria-label={label}
                  title={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* College Accreditation Badge */}
            <div className="inline-flex items-center gap-2 p-2.5 rounded-neo-sm bg-white dark:bg-neo-dark-card border-2 border-neo-border shadow-neo-sm text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-neo-yellow animate-pulse" />
              <span className="font-bold text-neo-text dark:text-neo-dark-text">Affiliated to University of Delhi</span>
            </div>
          </div>

          {/* Column 2 & 3: Quick Navigation Links (Span 4) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            {NAV_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="font-heading font-black text-sm uppercase tracking-wider text-neo-text dark:text-neo-dark-text pb-1 border-b-2 border-neo-border/20 inline-block">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-xs sm:text-sm text-neo-text/75 dark:text-neo-dark-text/75 hover:text-neo-border dark:hover:text-neo-yellow hover:font-bold transition-all inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">›</span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 4: Location & Campus Contact (Span 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-neo-text dark:text-neo-dark-text pb-1 border-b-2 border-neo-border/20 inline-block">
              Campus Base
            </h4>
            <div className="p-4 rounded-neo-sm bg-white dark:bg-neo-dark-card border-2 border-neo-border shadow-neo-sm space-y-2 text-xs font-body">
              <div className="flex items-start gap-2 text-neo-text dark:text-neo-dark-text">
                <MapPin className="w-4 h-4 text-neo-pink shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold font-heading">SGGSCC, Delhi University</p>
                  <p className="text-neo-text/70 dark:text-neo-dark-text/70">Opp. TV Tower, Pitampura, New Delhi 110034</p>
                </div>
              </div>
              <div className="pt-2 border-t border-neo-border/20 flex items-center justify-between font-mono text-[11px] text-neo-text/60 dark:text-neo-dark-text/60">
                <span>Coordinates</span>
                <span className="font-bold">28.6984° N, 77.1352° E</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Sub-Footer ── */}
        <div className="mt-12 pt-6 border-t-2 border-neo-border/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neo-text/70 dark:text-neo-dark-text/70">
          <div className="flex items-center gap-2">
            <span>© {currentYear} INFINITY SGGSCC. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-neo-text/60 dark:text-neo-dark-text/60">
              Beyond Limits. Beyond Technology.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
