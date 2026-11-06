import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Layers,
  Sparkles,
  Shield,
  User,
  ArrowRight,
  Command,
  X,
  Compass,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import BorderBeam from '../motion/BorderBeam';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Pillars' | 'Events' | 'Quick Actions';
  icon: React.ElementType;
  hint?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();
  const { events, resetDemoData } = useEvents();
  const { login, logout, user } = useAuth();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const close = () => setIsOpen(false);

  // Build command catalogue
  const items: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Home Portal',
      category: 'Navigation',
      icon: Compass,
      hint: 'Go to main overview & telemetry',
      action: () => { navigate('/'); close(); },
    },
    {
      id: 'nav-about',
      title: 'About SGGSCC & Society Heritage',
      category: 'Navigation',
      icon: FileText,
      hint: 'Official constitution & milestones',
      action: () => { navigate('/about'); close(); },
    },
    {
      id: 'nav-explore',
      title: 'Explore 5 Core Society Pillars',
      category: 'Navigation',
      icon: Layers,
      hint: 'AI, Cyber, Web3, Creative, Gaming',
      action: () => { navigate('/explore'); close(); },
    },
    {
      id: 'nav-events',
      title: 'All Events & Workshops',
      category: 'Navigation',
      icon: Calendar,
      hint: 'Browse upcoming & past archives',
      action: () => { navigate('/events'); close(); },
    },
    {
      id: 'nav-student',
      title: 'Student Dashboard & Digital Passes',
      category: 'Navigation',
      icon: User,
      hint: 'View confirmed passes & certificates',
      action: () => { navigate('/student'); close(); },
    },
    {
      id: 'nav-admin',
      title: 'Admin Management Console',
      category: 'Navigation',
      icon: Shield,
      hint: 'Manage events, attendees, and notices',
      action: () => { navigate('/admin'); close(); },
    },
    {
      id: 'nav-join',
      title: 'Join Society Core Team',
      category: 'Navigation',
      icon: Sparkles,
      hint: 'Submit candidate onboarding form',
      action: () => { navigate('/join'); close(); },
    },

    // 5 Society Pillars
    {
      id: 'pillar-ai',
      title: 'Pillar: AI & Emerging Tech',
      category: 'Pillars',
      icon: Sparkles,
      hint: 'LLMs, PyTorch, LangChain, Agents',
      action: () => { navigate('/explore?pillar=ai-emerging-tech'); close(); },
    },
    {
      id: 'pillar-cyber',
      title: 'Pillar: Cybersecurity & Digital Awareness',
      category: 'Pillars',
      icon: Shield,
      hint: 'CTFs, ethical hacking, CyberShield',
      action: () => { navigate('/explore?pillar=cybersecurity'); close(); },
    },
    {
      id: 'pillar-web3',
      title: 'Pillar: Web3 & Digital Economy',
      category: 'Pillars',
      icon: Layers,
      hint: 'Solidity, Ethereum, Mudrex workshop',
      action: () => { navigate('/explore?pillar=web3-digital-economy'); close(); },
    },
    {
      id: 'pillar-design',
      title: 'Pillar: Design & Creative Tech',
      category: 'Pillars',
      icon: Layers,
      hint: 'UI/UX, Figma, Graphista design fest',
      action: () => { navigate('/explore?pillar=design-creative-tech'); close(); },
    },
    {
      id: 'pillar-gaming',
      title: 'Pillar: Gaming & Competitions',
      category: 'Pillars',
      icon: Layers,
      hint: 'Esports tournaments, TechTonics',
      action: () => { navigate('/explore?pillar=gaming-competitions'); close(); },
    },

    // Quick Actions
    {
      id: 'action-demo-student',
      title: 'Switch to Demo Student Account',
      category: 'Quick Actions',
      icon: User,
      hint: 'student@infinity.sggscc.ac.in',
      action: () => {
        login('student@infinity.sggscc.ac.in', 'student123');
        toast.success('Signed in as Demo Student');
        close();
      },
    },
    {
      id: 'action-demo-admin',
      title: 'Switch to Demo Administrator Account',
      category: 'Quick Actions',
      icon: Shield,
      hint: 'admin@infinity.sggscc.ac.in',
      action: () => {
        login('admin@infinity.sggscc.ac.in', 'admin123');
        toast.success('Signed in as Demo Administrator');
        close();
      },
    },
    {
      id: 'action-reset-demo',
      title: 'Reset Demo Data to Initial State',
      category: 'Quick Actions',
      icon: RotateCcw,
      hint: 'Restores default sample registrations & events',
      action: () => {
        resetDemoData();
        toast.info('Demo database restored to default seed state.');
        close();
      },
    },

    // Dynamic Events
    ...events.map((evt) => ({
      id: `evt-${evt.id}`,
      title: evt.title,
      category: 'Events' as const,
      icon: Calendar,
      hint: `${evt.mode.toUpperCase()} • ${evt.venue}`,
      action: () => {
        navigate(`/events/${evt.slug}`);
        close();
      },
    })),
  ];

  // Filter items
  const filtered = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.hint && item.hint.toLowerCase().includes(q))
    );
  });

  // Handle arrow key navigation
  const handleItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={close}
          />

          {/* Modal Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl rounded-neo-lg bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg overflow-hidden relative z-10 flex flex-col max-h-[75vh]"
          >
            <BorderBeam size={220} duration={10} colorFrom="#FFE600" colorTo="#7DD3FC" />

            {/* Top Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b-2 border-neo-border/20 bg-neo-bg dark:bg-neo-dark-bg">
              <Search className="w-4 h-4 text-neo-border dark:text-neo-yellow shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleItemKeyDown}
                placeholder="Type a command, page, pillar, or event name..."
                className="w-full bg-transparent text-sm text-neo-text dark:text-neo-dark-text placeholder:text-neo-text/50 dark:placeholder:text-neo-dark-text/50 focus:outline-none font-body font-medium"
              />
              <button
                onClick={close}
                className="text-neo-text dark:text-neo-dark-text p-1 rounded-neo-sm transition-colors text-xs font-mono flex items-center gap-1 bg-white dark:bg-neo-dark-card border-2 border-neo-border px-1.5 py-0.5 shadow-neo-sm"
              >
                <span>ESC</span>
              </button>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="overflow-y-auto p-2 space-y-1.5 scrollbar-none flex-1"
            >
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-neo-text/60 dark:text-neo-dark-text/60 text-xs font-mono">
                  <p>No matching commands or events found for "{query}".</p>
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-neo-sm cursor-pointer text-xs transition-all ${
                        isSelected
                          ? 'bg-neo-yellow text-neo-border border-2 border-neo-border shadow-neo-sm -translate-y-0.5'
                          : 'hover:bg-neo-bg dark:hover:bg-neo-dark-bg text-neo-text dark:text-neo-dark-text border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div
                          className={`w-7 h-7 rounded-neo-sm border-2 border-neo-border flex items-center justify-center shrink-0 shadow-neo-sm ${
                            isSelected
                              ? 'bg-white text-neo-border'
                              : 'bg-neo-bg dark:bg-neo-dark-bg text-neo-text dark:text-neo-dark-text'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <p
                            className={`font-bold truncate ${
                              isSelected ? 'text-neo-border' : 'text-neo-text dark:text-neo-dark-text'
                            }`}
                          >
                            {item.title}
                          </p>
                          {item.hint && (
                            <p className="text-[10px] text-neo-text/70 dark:text-neo-dark-text/70 truncate">{item.hint}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-neo-sm bg-white dark:bg-neo-dark-bg border border-neo-border text-neo-border dark:text-neo-dark-text">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-neo-border" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2 border-t-2 border-neo-border/20 bg-neo-bg dark:bg-neo-dark-bg flex items-center justify-between text-[10px] text-neo-text/70 dark:text-neo-dark-text/70 font-mono">
              <div className="flex items-center gap-2">
                <span>Navigate: <kbd className="bg-white dark:bg-neo-dark-card border border-neo-border px-1 py-0.5 rounded text-[9px] font-bold">↑</kbd> <kbd className="bg-white dark:bg-neo-dark-card border border-neo-border px-1 py-0.5 rounded text-[9px] font-bold">↓</kbd></span>
                <span>Select: <kbd className="bg-white dark:bg-neo-dark-card border border-neo-border px-1 py-0.5 rounded text-[9px] font-bold">↵</kbd></span>
              </div>
              <span className="hidden sm:inline font-bold">SGGSCC Infinity Digital Platform</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;

