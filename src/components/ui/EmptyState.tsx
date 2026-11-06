import React, { type ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-16 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-lg shadow-neo dark:shadow-neo-dark ${className}`}
    >
      <div className="mb-4" aria-hidden="true">
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-neo-sm bg-neo-yellow border-2 border-neo-border text-neo-border shadow-neo-sm">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-heading font-black text-neo-text dark:text-neo-dark-text mb-2">
        {title}
      </h3>
      <p className="text-sm text-neo-text/75 dark:text-neo-dark-text/75 max-w-sm mb-6 leading-relaxed font-body">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
