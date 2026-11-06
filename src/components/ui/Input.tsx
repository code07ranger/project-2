import React, { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';

/* ─────────────────────────── Input ─────────────────────────── */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, ...rest }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-mono font-bold uppercase tracking-wider text-neo-text dark:text-neo-dark-text"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neo-text/60 dark:text-neo-dark-text/60 pointer-events-none" aria-hidden="true">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text placeholder:text-neo-text/50 dark:placeholder:text-neo-dark-text/50 shadow-neo-sm',
              'px-4 py-2.5 text-xs sm:text-sm font-body',
              'transition-all duration-150 ease-out',
              'focus:outline-none focus:ring-2 focus:ring-neo-yellow focus:border-neo-border',
              icon ? 'pl-10' : '',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                : 'hover:border-neo-border',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error && inputId ? `${inputId}-error` : undefined}
            {...rest}
          />
        </div>
        {error && (
          <p
            id={inputId ? `${inputId}-error` : undefined}
            className="text-xs font-bold text-red-600 dark:text-red-400 mt-0.5"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/* ─────────────────────────── Textarea ─────────────────────────── */

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...rest }, ref) => {
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-mono font-bold uppercase tracking-wider text-neo-text dark:text-neo-dark-text"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={[
            'w-full rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text placeholder:text-neo-text/50 dark:placeholder:text-neo-dark-text/50 shadow-neo-sm',
            'px-4 py-2.5 text-xs sm:text-sm font-body min-h-[100px] resize-y',
            'transition-all duration-150 ease-out',
            'focus:outline-none focus:ring-2 focus:ring-neo-yellow focus:border-neo-border',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
              : 'hover:border-neo-border',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p
            id={textareaId ? `${textareaId}-error` : undefined}
            className="text-xs font-bold text-red-600 dark:text-red-400 mt-0.5"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };
export default Input;
