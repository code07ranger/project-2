import React from 'react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = 'left',
  className = '',
}) => {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap select-none py-3.5 border-y-[2.5px] border-neo-border dark:border-neo-dark-border bg-neo-yellow dark:bg-neo-dark-card ${className}`}
    >
      <div
        className={`inline-flex items-center gap-8 ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        }`}
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-neo-border dark:bg-neo-yellow" />
            <span className="text-neo-border dark:text-neo-dark-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
