import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollManager handles:
 * 1. Smooth scroll-to-anchor when navigation contains a hash (e.g. /#projects, /#contact, /about#team)
 * 2. Instant scroll-to-top on route change when there is no hash
 */
export const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const navOffset = 85;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navOffset,
            behavior: 'smooth',
          });
          return true;
        }
        return false;
      };

      // Try scrolling immediately without delay
      if (!scrollToHash()) {
        const timer = setTimeout(scrollToHash, 50);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;

