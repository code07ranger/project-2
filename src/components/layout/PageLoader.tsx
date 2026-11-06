import React from 'react';
import { motion } from 'framer-motion';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center justify-center p-8 relative">
      {/* Top Fixed Progress Line */}
      <div className="fixed top-0 left-0 w-full h-[3.5px] bg-neo-yellow/20 z-[100] overflow-hidden pointer-events-none">
        <motion.div
          className="h-full bg-neo-yellow border-b border-neo-border"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            duration: 1.1,
            ease: 'easeInOut',
          }}
          style={{ width: '50%' }}
        />
      </div>

      {/* Tactile Central Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="flex flex-col items-center gap-3 p-5 rounded-neo-md bg-white dark:bg-neo-dark-card border-2 border-neo-border dark:border-neo-dark-border shadow-neo"
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-neo-yellow border border-neo-border animate-bounce" />
          <span className="w-3 h-3 rounded-full bg-neo-blue border border-neo-border animate-bounce [animation-delay:0.15s]" />
          <span className="w-3 h-3 rounded-full bg-neo-pink border border-neo-border animate-bounce [animation-delay:0.3s]" />
        </div>
        <span className="font-mono text-xs font-black tracking-wider uppercase text-neo-text dark:text-neo-dark-text">
          Loading Infinity...
        </span>
      </motion.div>
    </div>
  );
};

export default PageLoader;

