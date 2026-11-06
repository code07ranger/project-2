import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const unsubscribeScroll = scrollY.on('change', (latest) => {
      setShowTopBtn(latest > 320);
    });

    const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });

    return () => {
      unsubscribeScroll();
      unsubscribeProgress();
    };
  }, [scrollY, scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* ── Fixed Neo-Brutalist Top Scroll Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3.5px] bg-transparent pointer-events-none">
        <motion.div
          className="h-full origin-left bg-[#FFE600] border-b border-[#19191C] shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
          style={{
            scaleX,
            backgroundImage: 'linear-gradient(90deg, #FFE600 0%, #7DD3FC 60%, #F472B6 100%)',
          }}
        />
      </div>

      {/* ── Floating Neo-Brutalist Back-to-Top Button ── */}
      {showTopBtn && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed left-4 sm:left-6 bottom-20 md:bottom-6 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92, y: 1 }}
            onClick={scrollToTop}
            title={`Scroll to top (${scrollPercent}%)`}
            aria-label="Scroll to top of page"
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo sm:shadow-neo-md dark:shadow-neo-dark hover:bg-neo-yellow dark:hover:bg-neo-yellow text-neo-border dark:text-neo-dark-text dark:hover:text-neo-border transition-all cursor-pointer"
          >
            {/* Circular Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-neo-border/15 dark:stroke-white/15"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-neo-border dark:stroke-neo-yellow dark:group-hover:stroke-neo-border transition-colors"
                strokeWidth="2.5"
                strokeDasharray={113}
                strokeDashoffset={113 - (113 * scrollPercent) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform relative z-10" />
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgress;

