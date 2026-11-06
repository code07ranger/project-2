import React, { type ReactNode } from 'react';

export type BadgeVariant = 'yellow' | 'blue' | 'pink' | 'white' | 'dark' | 'violet' | 'neon' | 'lavender' | 'success' | 'warning' | 'muted';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  yellow: 'bg-[#FFE600] text-[#19191C] border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]',
  blue: 'bg-[#7DD3FC] text-[#19191C] border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]',
  pink: 'bg-[#F472B6] text-[#19191C] border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]',
  white: 'bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-[#FBF9F4] border-[2px] border-[#19191C] dark:border-[#3A3A44] shadow-[2px_2px_0px_#19191C] dark:shadow-[2px_2px_0px_#FFE600]',
  dark: 'bg-[#19191C] text-[#FBF9F4] border-[2px] border-[#FFE600] shadow-[2px_2px_0px_#FFE600]',
  warning: 'bg-[#FFE600] text-[#19191C] border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]',
  neon: 'bg-[#7DD3FC] text-[#19191C] border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]',
  lavender: 'bg-[#F472B6] text-[#19191C] border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]',
  violet: 'bg-[#8B5CF6] text-white border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]',
  success: 'bg-[#10B981] text-white border-[2px] border-[#19191C] shadow-[2px_2px_0px_#19191C]',
  muted: 'bg-[#E5E7EB] dark:bg-[#2D2D35] text-[#19191C] dark:text-[#FBF9F4] border-[2px] border-[#19191C] dark:border-[#3A3A44] shadow-[2px_2px_0px_#19191C]',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] rounded-[6px]',
  md: 'px-3 py-1 text-xs rounded-[8px]',
  lg: 'px-3.5 py-1.5 text-sm rounded-[10px]',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'yellow',
  size = 'md',
  children,
  className = '',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center font-heading font-bold select-none whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
};

export default Badge;
