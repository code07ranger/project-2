import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Shield, Search, Sun, Moon, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import InfinitySymbol from '../ui/InfinitySymbol';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

/* ── Center navigation links per specification ── */
const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Domains', to: '/explore' },
  { label: 'Events', to: '/events' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Team', to: '/about#team' },
  { label: 'Contact', to: '/#contact' },
] as const;

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname, location.hash]);

  /* Close user dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.replace('/', '');
    }
    return location.pathname === path;
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-[#FBF9F4] dark:bg-[#131316] border-b-[2.5px] border-[#19191C] dark:border-[#3A3A44] transition-colors duration-200 shadow-neo-ambient dark:shadow-none">
      <nav className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* ── Left: Official Club Logo + Wordmark ── */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group select-none"
            aria-label="INFINITY — The Tech Society Home"
          >
            <div className="p-1.5 rounded-[8px] bg-[#FFE600] border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform text-[#19191C]">
              <InfinitySymbol size="sm" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[#19191C] dark:text-white leading-none">
                  INFINITY
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-[5px] bg-[#7DD3FC] text-[#19191C] border-[1.5px] border-[#19191C] text-[10px] font-mono font-bold shadow-[1px_1px_0px_#19191C]">
                  SGGSCC
                </span>
              </div>
              <span className="font-handwriting text-xs font-bold text-[#19191C]/80 dark:text-[#FFE600] tracking-wide mt-0.5 -rotate-1">
                The Tech Society
              </span>
            </div>
          </Link>

          {/* ── Center: Minimalist Navigation Links ── */}
          <ul className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {NAV_LINKS.map(({ label, to }) => {
              const active = isActive(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={[
                      'px-3.5 py-1.5 rounded-[8px] text-sm font-heading font-bold transition-all duration-150',
                      'border-[2px]',
                      active
                        ? 'bg-[#FFE600] text-[#19191C] border-[#19191C] shadow-[2px_2px_0px_#19191C]'
                        : 'border-transparent text-[#19191C] dark:text-[#FBF9F4] hover:bg-[#FFE600] hover:text-[#19191C] hover:border-[#19191C] hover:shadow-[2px_2px_0px_#19191C]',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right Actions: Theme Toggle, Search, Join Button & User Menu ── */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              aria-label="Search"
              className="p-2 rounded-[8px] bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-white border-[2px] border-[#19191C] dark:border-[#3A3A44] shadow-[2px_2px_0px_#19191C] dark:shadow-[2px_2px_0px_#FFE600] hover:bg-[#7DD3FC] dark:hover:bg-[#7DD3FC] dark:hover:text-[#19191C] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4 text-[#19191C] dark:text-[#FFE600]" />
            </motion.button>

            {/* Dark/Light Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-[8px] bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-white border-[2px] border-[#19191C] dark:border-[#3A3A44] shadow-[2px_2px_0px_#19191C] dark:shadow-[2px_2px_0px_#FFE600] hover:bg-[#7DD3FC] dark:hover:bg-[#7DD3FC] dark:hover:text-[#19191C] transition-colors"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#FFE600]" />
              ) : (
                <Moon className="w-4 h-4 text-[#19191C]" />
              )}
            </motion.button>

            {/* Logged in User Menu OR Join Infinity Button */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-white border-[2px] border-[#19191C] dark:border-white shadow-[2px_2px_0px_#19191C] dark:shadow-[2px_2px_0px_#FFE600] font-heading font-bold text-xs"
                >
                  <span className="w-6 h-6 rounded-full bg-[#FFE600] text-[#19191C] border border-[#19191C] flex items-center justify-center text-xs font-extrabold">
                    {initials}
                  </span>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1E1E24] border-[2.5px] border-[#19191C] dark:border-white rounded-[12px] shadow-[4px_4px_0px_#19191C] dark:shadow-[4px_4px_0px_#FFE600] overflow-hidden z-50 p-1"
                    >
                      <Link
                        to="/student"
                        className="flex items-center gap-2 px-3 py-2 text-xs font-heading font-bold text-[#19191C] dark:text-white rounded-[6px] hover:bg-[#FFE600] hover:text-[#19191C] transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Student Dashboard</span>
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-heading font-bold text-[#19191C] dark:text-white rounded-[6px] hover:bg-[#FFE600] hover:text-[#19191C] transition-colors"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          <span>Admin Console</span>
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-heading font-bold text-red-600 rounded-[6px] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-heading font-bold text-[#19191C] dark:text-white hover:underline"
                >
                  Log In
                </Link>
                <Link to="/join">
                  <motion.button
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 2, y: 2 }}
                    className="flex items-center justify-center px-4 py-2 rounded-[10px] bg-[#FFE600] text-[#19191C] border-[2.5px] border-[#19191C] shadow-[3px_3px_0px_#19191C] font-heading font-extrabold text-xs tracking-wide cursor-pointer"
                  >
                    <span>Build With Us</span>
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Actions (Theme Toggle & Hamburger) ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-[8px] bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-white border-[2px] border-[#19191C] dark:border-white shadow-[2px_2px_0px_#19191C]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FFE600]" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              aria-label="Search"
              className="p-2 rounded-[8px] bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-white border-[2px] border-[#19191C] dark:border-white shadow-[2px_2px_0px_#19191C]"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-[8px] bg-[#FFE600] text-[#19191C] border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#FBF9F4] dark:bg-[#131316] border-t-[2px] border-[#19191C] dark:border-white px-4 py-6 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="p-3 rounded-[10px] bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-white border-[2px] border-[#19191C] dark:border-white shadow-[2px_2px_0px_#19191C] font-heading font-bold text-sm text-center hover:bg-[#FFE600] hover:text-[#19191C] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link to="/join" className="w-full block">
                <Button fullWidth size="lg" variant="primary">
                  Build With Us
                </Button>
              </Link>
              <Link to="/events" className="w-full block">
                <Button fullWidth size="md" variant="secondary">
                  Explore Events
                </Button>
              </Link>
              {user ? (
                <Link to="/student" className="w-full block">
                  <Button fullWidth size="sm" variant="outline">
                    Student Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login" className="w-full block">
                  <Button fullWidth size="sm" variant="outline">
                    Log In to Portal
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
