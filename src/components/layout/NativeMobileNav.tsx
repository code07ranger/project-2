import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, BrainCircuit, Ticket, UserCheck, ShieldCheck, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const NativeMobileNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { label: 'Home', to: '/', icon: LayoutGrid },
    { label: 'Domains', to: '/explore', icon: BrainCircuit },
    { label: 'Events', to: '/events', icon: Ticket },
    {
      label: user?.role === 'admin' ? 'Admin' : 'Portal',
      to: user?.role === 'admin' ? '/admin' : (user ? '/student' : '/login'),
      icon: user?.role === 'admin' ? ShieldCheck : UserCheck,
    },
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto rounded-full bg-white/95 dark:bg-neo-dark-card/95 backdrop-blur-md border-[2.5px] border-neo-border dark:border-neo-dark-border px-3 py-1.5 shadow-neo dark:shadow-neo-dark flex items-center justify-around">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center py-1 px-3 select-none"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  active
                    ? 'text-neo-border dark:text-neo-yellow font-black'
                    : 'text-neo-text/70 dark:text-neo-dark-text/70 hover:text-neo-text dark:hover:text-neo-dark-text'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-mono leading-none">
                  {item.label}
                </span>
              </motion.div>

              {active && (
                <motion.div
                  layoutId="native-bottom-dot"
                  className="absolute -bottom-1 w-2 h-2 rounded-full bg-neo-yellow border border-neo-border"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        {/* Center Quick Search Trigger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="flex flex-col items-center justify-center p-2.5 rounded-full bg-neo-yellow border-2 border-neo-border text-neo-border shadow-neo-sm select-none -translate-y-1 hover:rotate-6 transition-transform"
          title="Search (Ctrl+K)"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </motion.button>

        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center py-1 px-3 select-none"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  active
                    ? 'text-neo-border dark:text-neo-yellow font-black'
                    : 'text-neo-text/70 dark:text-neo-dark-text/70 hover:text-neo-text dark:hover:text-neo-dark-text'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-mono leading-none">
                  {item.label}
                </span>
              </motion.div>

              {active && (
                <motion.div
                  layoutId="native-bottom-dot"
                  className="absolute -bottom-1 w-2 h-2 rounded-full bg-neo-yellow border border-neo-border"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NativeMobileNav;
