import React from 'react';
import InfinitySymbol from './InfinitySymbol';

interface OfficialLogoProps {
  layout?: 'horizontal' | 'vertical' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showSubtitle?: boolean;
}

/**
 * Official Club Emblem & Lockup for:
 * INFINITY — The Tech Society (SGGSCC, University of Delhi)
 * Faithfully matches the official club logo and integrates with Neo-Brutalist UI tokens.
 */
export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  layout = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  if (layout === 'badge') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-5 rounded-neo-lg bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo ${className}`}
      >
        <div className="p-3 rounded-neo-md bg-neo-yellow border-2 border-neo-border shadow-neo-sm mb-3">
          <InfinitySymbol size="lg" className="text-neo-border" />
        </div>
        <span className="font-heading font-black text-2xl tracking-wider text-neo-text dark:text-neo-dark-text uppercase leading-none">
          INFINITY
        </span>
        {showSubtitle && (
          <span className="font-handwriting text-base font-bold text-neo-text/80 dark:text-neo-yellow tracking-wide mt-1 -rotate-1">
            The Tech Society
          </span>
        )}
      </div>
    );
  }

  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <div className="p-2.5 rounded-neo-md bg-neo-yellow border-2 border-neo-border shadow-neo-sm mb-2">
          <InfinitySymbol
            size={size === 'hero' ? 'hero' : size === 'lg' ? 'lg' : 'md'}
            className="text-neo-border"
          />
        </div>
        <span className="font-heading font-black text-2xl sm:text-3xl tracking-wider text-neo-text dark:text-neo-dark-text uppercase leading-none">
          INFINITY
        </span>
        {showSubtitle && (
          <span className="font-handwriting text-base sm:text-lg text-neo-text/80 dark:text-neo-yellow tracking-wide mt-1 -rotate-1">
            The Tech Society
          </span>
        )}
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="p-1.5 rounded-neo-sm bg-neo-yellow border-2 border-neo-border shadow-neo-sm shrink-0">
        <InfinitySymbol size={size === 'sm' ? 'xs' : 'sm'} className="text-neo-border" />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="font-heading font-black text-lg sm:text-xl tracking-wider text-neo-text dark:text-neo-dark-text uppercase leading-none">
            INFINITY
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-neo-sm bg-neo-blue text-neo-border border border-neo-border text-[9px] font-mono font-bold shadow-[1px_1px_0px_#19191C]">
            SGGSCC
          </span>
        </div>
        {showSubtitle && (
          <span className="font-handwriting text-xs font-bold text-neo-text/80 dark:text-neo-yellow leading-tight mt-0.5 -rotate-1">
            The Tech Society
          </span>
        )}
      </div>
    </div>
  );
};

export default OfficialLogo;

