import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NativeMobileNav from './NativeMobileNav';
import InfinityAIAssistant from '../ai/InfinityAIAssistant';
import CommandPalette from '../ui/CommandPalette';
import ParticleBackground from '../motion/ParticleBackground';
import ScrollManager from './ScrollManager';
import ScrollProgress from './ScrollProgress';

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-neo-bg dark:bg-neo-dark-bg text-neo-text dark:text-neo-dark-text pb-16 md:pb-0 transition-colors duration-200 neo-grid-pattern relative overflow-x-hidden">
      <ScrollManager />
      <ScrollProgress />
      {/* Interactive Colliding Particle Canvas (Theme-Adaptive) */}
      <ParticleBackground className="opacity-70 dark:opacity-65" />
      <Navbar />

      {/* Main content with instantaneous, lag-free page rendering */}
      <main className="flex-1 pt-16 relative z-10 w-full overflow-x-hidden">
        <div key={location.pathname} className="w-full flex-1">
          <Outlet />
        </div>
      </main>

      <Footer />
      <NativeMobileNav />
      <InfinityAIAssistant />
      <CommandPalette />
    </div>
  );
};

export default Layout;
