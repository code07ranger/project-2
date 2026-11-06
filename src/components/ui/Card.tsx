import React, { type HTMLAttributes, type ReactNode, forwardRef } from 'react';

export type CardVariant =
  | 'default'
  | 'elevated'
  | 'interactive'
  | 'yellow'
  | 'blue'
  | 'pink'
  | 'warm'
  | 'cool'
  | 'blush'
  | 'mint';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    'bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-[#FBF9F4] border-[2.5px] border-[#19191C] dark:border-[#3A3A44] shadow-[5px_5px_0px_#19191C] dark:shadow-[4px_4px_0px_#FFE600]',
  elevated:
    'bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-[#FBF9F4] border-[2.5px] border-[#19191C] dark:border-[#3A3A44] shadow-[7px_7px_0px_#19191C] dark:shadow-[6px_6px_0px_#FFE600]',
  interactive:
    'bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-[#FBF9F4] border-[2.5px] border-[#19191C] dark:border-[#3A3A44] shadow-[5px_5px_0px_#19191C] dark:shadow-[4px_4px_0px_#FFE600] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0px_#19191C] dark:hover:shadow-[7px_7px_0px_#FFE600] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#19191C] transition-all duration-150 cursor-pointer',
  yellow:
    'bg-[#FFE600] text-[#19191C] border-[2.5px] border-[#19191C] shadow-[5px_5px_0px_#19191C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#19191C] transition-all duration-150',
  blue:
    'bg-[#7DD3FC] text-[#19191C] border-[2.5px] border-[#19191C] shadow-[5px_5px_0px_#19191C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#19191C] transition-all duration-150',
  pink:
    'bg-[#F472B6] text-[#19191C] border-[2.5px] border-[#19191C] shadow-[5px_5px_0px_#19191C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#19191C] transition-all duration-150',
  warm:
    'bg-[#FFF8E1] dark:bg-[#1E1C14] text-[#19191C] dark:text-[#FBF9F4] border-[2.5px] border-[#19191C] dark:border-[#3A3A44] shadow-[5px_5px_0px_#19191C] dark:shadow-[4px_4px_0px_#FFE600]',
  cool:
    'bg-[#EFF9FF] dark:bg-[#141A1E] text-[#19191C] dark:text-[#FBF9F4] border-[2.5px] border-[#19191C] dark:border-[#3A3A44] shadow-[5px_5px_0px_#19191C] dark:shadow-[4px_4px_0px_#7DD3FC]',
  blush:
    'bg-[#FFF0F6] dark:bg-[#1E141A] text-[#19191C] dark:text-[#FBF9F4] border-[2.5px] border-[#19191C] dark:border-[#3A3A44] shadow-[5px_5px_0px_#19191C] dark:shadow-[4px_4px_0px_#F472B6]',
  mint:
    'bg-[#ECFDF5] dark:bg-[#141E1A] text-[#19191C] dark:text-[#FBF9F4] border-[2.5px] border-[#19191C] dark:border-[#3A3A44] shadow-[5px_5px_0px_#19191C] dark:shadow-[4px_4px_0px_#34D399]',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          'rounded-[18px] overflow-hidden',
          variantClasses[variant],
          paddingClasses[padding],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
