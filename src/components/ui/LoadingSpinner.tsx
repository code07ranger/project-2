import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

const sizeMap: Record<SpinnerSize, { container: string; stroke: number }> = {
  sm: { container: 'w-5 h-5', stroke: 2.5 },
  md: { container: 'w-8 h-8', stroke: 2 },
  lg: { container: 'w-12 h-12', stroke: 1.8 },
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label,
  className = '',
}) => {
  const { container, stroke } = sizeMap[size];

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-label={label ?? 'Loading'}
    >
      <svg
        className={`${container} animate-spin motion-reduce:animate-none`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-white/10"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="url(#spinner-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="spinner-gradient" x1="12" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>
      {label && (
        <p className="text-sm text-muted font-medium">{label}</p>
      )}
      <span className="sr-only">{label ?? 'Loading'}</span>
    </div>
  );
};

export default LoadingSpinner;
