
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import InfinitySymbol from '../components/ui/InfinitySymbol';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 py-20 text-center max-w-container mx-auto">
      <div className="p-4 bg-neo-yellow border-2 border-neo-border rounded-neo-sm shadow-neo mb-6 text-neo-border">
        <InfinitySymbol size="lg" />
      </div>
      <span className="font-handwriting text-2xl font-bold text-neo-pink inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neo-pink/15 border-2 border-neo-border shadow-neo-sm">
        <Star className="w-4 h-4 fill-neo-pink text-neo-border" />
        404 • PAGE NOT FOUND
      </span>
      <h1 className="font-heading font-black text-3xl sm:text-5xl text-neo-text dark:text-neo-dark-text mt-3 mb-4">
        Beyond the Known Perimeter
      </h1>
      <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-sm sm:text-base max-w-md leading-relaxed mb-8 font-body">
        The route you requested could not be located on the Infinity society portal.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/">
          <Button variant="primary" icon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
        </Link>
        <Link to="/events">
          <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
            Browse Events
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
