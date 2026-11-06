import React, { useId } from 'react';
import { motion } from 'framer-motion';

type SymbolSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'widget';

interface InfinitySymbolProps {
  size?: SymbolSize;
  className?: string;
  variant?: 'default' | 'neo' | 'monochrome' | 'gradient';
  gradientVariant?: 'default' | 'purple-cyan';
  width?: number;
  height?: number;
  animate?: boolean;
}

const sizeMap: Record<SymbolSize, { width: number; height: number }> = {
  xs: { width: 24, height: 13 },
  sm: { width: 34, height: 18 },
  md: { width: 56, height: 30 },
  lg: { width: 96, height: 52 },
  xl: { width: 140, height: 75 },
  hero: { width: 260, height: 140 },
  widget: { width: 220, height: 118 },
};

/**
 * Official Interlocking Infinity Symbol of INFINITY — The Tech Society (SGGSCC)
 * Exact vector geometry reconstructed from the official club emblem.
 */
export const InfinitySymbol: React.FC<InfinitySymbolProps> = ({
  size = 'md',
  className = '',
  variant = 'neo',
  gradientVariant = 'default',
  width: customWidth,
  height: customHeight,
  animate = true,
}) => {
  const width = customWidth || sizeMap[size]?.width || 56;
  const height = customHeight || sizeMap[size]?.height || 30;
  const uid = useId().replace(/:/g, '');
  const gradId = `inf-grad-${uid}`;

  const isHero = size === 'hero' || size === 'widget' || size === 'xl';

  // Exact path coordinates of the official club interlocking links
  const pathLeft =
    'M 67.2 10.0 L 50.5 14.7 L 43.0 18.4 L 35.6 24.0 L 27.2 33.3 L 21.6 43.5 L 17.0 59.3 L 17.0 77.9 L 20.7 92.8 L 26.3 104.0 L 39.3 117.9 L 49.5 123.5 L 68.1 129.1 L 88.6 128.1 L 97.9 125.3 L 114.7 116.0 L 124.0 106.7 L 126.7 102.1 L 161.2 63.0 L 163.0 59.3 L 163.0 54.7 L 159.3 50.9 L 153.7 50.9 L 150.9 52.8 L 116.5 94.7 L 101.6 108.6 L 89.5 114.2 L 79.3 116.0 L 67.2 115.1 L 58.8 112.3 L 51.4 108.6 L 43.0 102.1 L 38.4 96.5 L 31.9 82.6 L 30.0 66.7 L 32.8 53.7 L 38.4 42.6 L 49.5 31.4 L 55.1 27.7 L 69.1 23.0 L 86.7 24.0 L 97.0 27.7 L 107.2 33.3 L 113.7 33.3 L 116.5 29.5 L 116.5 25.8 L 112.8 20.2 L 98.8 12.8 L 89.5 10.0 Z';

  const pathRight =
    'M 195.6 10.0 L 172.3 10.0 L 160.2 13.7 L 144.4 23.0 L 97.0 77.9 L 97.0 84.4 L 99.8 87.2 L 108.1 86.3 L 142.6 44.4 L 153.7 33.3 L 160.2 28.6 L 167.7 24.9 L 175.1 23.0 L 189.1 23.0 L 197.4 24.9 L 210.5 31.4 L 220.7 41.6 L 226.3 51.9 L 229.1 64.0 L 229.1 75.1 L 227.2 84.4 L 224.4 90.9 L 220.7 96.5 L 210.5 106.7 L 196.5 114.2 L 176.0 115.1 L 165.8 112.3 L 150.9 104.9 L 145.3 105.8 L 143.5 108.6 L 143.5 112.3 L 147.2 118.8 L 155.6 123.5 L 164.9 127.2 L 182.6 130.0 L 200.2 127.2 L 210.5 123.5 L 221.6 117.0 L 232.8 104.9 L 237.4 96.5 L 240.2 88.1 L 243.0 74.2 L 241.2 53.7 L 234.7 37.0 L 226.3 25.8 L 215.1 17.4 Z';

  // Fill selection based on variant
  let fillLeft = 'currentColor';
  let fillRight = 'currentColor';

  if (variant === 'gradient' || gradientVariant === 'purple-cyan') {
    fillLeft = `url(#${gradId})`;
    fillRight = `url(#${gradId})`;
  } else if (variant === 'neo') {
    // In light mode: crisp neo-charcoal (#19191C); in dark mode: neo-yellow or white
    fillLeft = 'currentColor';
    fillRight = 'currentColor';
  }

  return (
    <motion.div
      className={`inline-flex items-center justify-center select-none ${className}`}
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      aria-hidden="true"
    >
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 260 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          animate
            ? isHero
              ? { y: [0, -5, 0] }
              : { y: [0, -2, 0] }
            : undefined
        }
        transition={
          animate
            ? {
                duration: isHero ? 4 : 3,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop',
              }
            : undefined
        }
      >
        <defs>
          {gradientVariant === 'purple-cyan' ? (
            <linearGradient id={gradId} x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5E33AD" />
              <stop offset="46%" stopColor="#388FC7" />
              <stop offset="100%" stopColor="#08CFE0" />
            </linearGradient>
          ) : (
            <linearGradient id={gradId} x1="0" y1="0" x2="260" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE600" />
              <stop offset="50%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          )}
        </defs>

        {/* Left Link */}
        <path
          d={pathLeft}
          fill={fillLeft}
          className="transition-colors duration-200"
        />

        {/* Right Link */}
        <path
          d={pathRight}
          fill={fillRight}
          className="transition-colors duration-200"
        />
      </motion.svg>
    </motion.div>
  );
};

export default InfinitySymbol;
