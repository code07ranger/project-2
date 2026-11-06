import React, { useRef, type ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search…',
  onClear,
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neo-text/70 dark:text-neo-dark-text/70 pointer-events-none"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={[
          'w-full rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text placeholder:text-neo-text/50 dark:placeholder:text-neo-dark-text/50 shadow-neo-sm',
          'pl-10 pr-10 py-2.5 text-xs sm:text-sm font-body',
          'transition-all duration-150 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-neo-yellow focus:border-neo-border',
        ].join(' ')}
        aria-label={placeholder}
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neo-text/70 dark:text-neo-dark-text/70 hover:text-neo-text dark:hover:text-neo-dark-text transition-colors duration-150 p-1 rounded-sm focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
