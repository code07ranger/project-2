import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  highlightWord?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  align = 'left',
  className = '',
  highlightWord,
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  // Render title with optional highlight word in neo-yellow badge
  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return title;
    }
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="inline-block bg-neo-yellow text-neo-border px-2.5 py-0.5 mx-1 rounded-neo-sm border-2 border-neo-border shadow-neo-sm transform -rotate-1">
          {highlightWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && (
        <span className="font-handwriting text-lg sm:text-xl font-bold text-neo-pink tracking-wide inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neo-pink/10 border border-neo-pink/30">
          <span>★</span>
          <span>{label}</span>
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-neo-text dark:text-neo-dark-text tracking-tight leading-[1.15]">
        {renderTitle()}
      </h2>
      {description && (
        <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-base sm:text-lg max-w-2xl leading-relaxed font-body">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
