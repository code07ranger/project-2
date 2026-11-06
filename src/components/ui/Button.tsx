import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#FFE600] text-[#19191C] border-[2.5px] border-[#19191C] shadow-[4px_4px_0px_#19191C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#19191C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#19191C]',
  secondary:
    'bg-[#7DD3FC] text-[#19191C] border-[2.5px] border-[#19191C] shadow-[4px_4px_0px_#19191C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#19191C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#19191C]',
  accent:
    'bg-[#F472B6] text-[#19191C] border-[2.5px] border-[#19191C] shadow-[4px_4px_0px_#19191C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#19191C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#19191C]',
  outline:
    'bg-white dark:bg-[#1E1E24] text-[#19191C] dark:text-[#FBF9F4] border-[2.5px] border-[#19191C] dark:border-[#3A3A44] shadow-[4px_4px_0px_#19191C] dark:shadow-[4px_4px_0px_#FFE600] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#19191C] dark:hover:shadow-[6px_6px_0px_#FFE600] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#19191C]',
  ghost:
    'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#19191C] dark:text-[#FBF9F4] border-[2px] border-transparent hover:border-[#19191C] dark:hover:border-[#3A3A44]',
  danger:
    'bg-[#EF4444] text-white border-[2.5px] border-[#19191C] shadow-[4px_4px_0px_#19191C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#19191C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#19191C]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs font-bold gap-1.5 rounded-[8px]',
  md: 'px-5 py-2.5 text-sm font-bold gap-2 rounded-[12px]',
  lg: 'px-7 py-3.5 text-base font-extrabold gap-2.5 rounded-[14px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      fullWidth = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-heading select-none',
          'transition-all duration-150 ease-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19191C]',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
        ) : icon ? (
          <span className="shrink-0" aria-hidden="true">{icon}</span>
        ) : null}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
