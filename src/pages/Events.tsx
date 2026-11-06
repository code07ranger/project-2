import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter, Sparkles, X, Search, Star } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import EventCard from '../components/ui/EventCard';
import ParticleBackground from '../components/motion/ParticleBackground';
import { useEvents } from '../context/EventContext';

const CATEGORIES: Array<{ id: string; label: string }> = [
  { id: 'all', label: 'All Categories' },
  { id: 'ai-emerging-tech', label: 'AI & ML' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'design-creative', label: 'Design & Creative' },
  { id: 'gaming-competitions', label: 'Gaming & Contests' },
  { id: 'web3-digital-economy', label: 'Web3 & Fintech' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'seminars', label: 'Seminars' },
];

export const Events: React.FC = () => {
  const { events } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.some((c) => c.id === cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setTimeFilter('all');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const now = new Date();

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.status === 'published' || e.status === 'archived')
      .filter((e) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = e.title.toLowerCase().includes(q);
          const matchDesc = e.description.toLowerCase().includes(q);
          const matchVenue = e.venue.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchVenue) return false;
        }

        if (selectedCategory !== 'all' && e.category !== selectedCategory) {
          return false;
        }

        const eventDate = new Date(e.startAt);
        if (timeFilter === 'upcoming' && eventDate < now) return false;
        if (timeFilter === 'past' && eventDate >= now) return false;

        return true;
      })
      .sort((a, b) => {
        const aDate = new Date(a.startAt).getTime();
        const bDate = new Date(b.startAt).getTime();
        return bDate - aDate;
      });
  }, [events, searchQuery, selectedCategory, timeFilter, now]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedCategory !== 'all' || timeFilter !== 'all';

  return (
    <div className="flex flex-col gap-10 pb-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative overflow-hidden">
      {/* ── Top Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto relative z-10"
      >
        <span className="font-handwriting text-2xl font-bold text-neo-pink inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neo-pink/15 border-2 border-neo-border shadow-neo-sm">
          <Star className="w-4 h-4 fill-neo-pink text-neo-border" />
          ACTIVE SCHEDULE
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-neo-text dark:text-neo-dark-text tracking-tight leading-tight">
          Discover, Learn & Compete
        </h1>
        <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-base sm:text-lg leading-relaxed font-body">
          Browse all scheduled and archived Infinity technical bootcamps, masterclasses,
          hackathons, and gaming tournaments.
        </p>
      </motion.div>

      {/* ── Search & Filter Controls (Neo-Brutalist Card) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col gap-6 bg-white dark:bg-neo-dark-card p-6 sm:p-8 rounded-neo-lg border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg relative z-10"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by event title, venue, or keyword…"
            className="w-full md:max-w-md"
          />

          {/* Time Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-neo-bg dark:bg-neo-dark-bg rounded-neo-sm border-2 border-neo-border self-start md:self-auto shadow-neo-sm">
            {(['all', 'upcoming', 'past'] as const).map((mode) => {
              const active = timeFilter === mode;
              const label = mode === 'all' ? 'All Events' : mode === 'upcoming' ? 'Upcoming' : 'Past / Archived';
              return (
                <button
                  key={mode}
                  onClick={() => setTimeFilter(mode)}
                  className={`px-3.5 py-1.5 text-xs font-heading font-black rounded-neo-sm border transition-all select-none ${
                    active
                      ? 'bg-neo-yellow text-neo-border border-neo-border shadow-neo-sm'
                      : 'bg-transparent text-neo-text dark:text-neo-dark-text border-transparent hover:bg-white dark:hover:bg-neo-dark-card'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-neo-text/60 dark:text-neo-dark-text/60 shrink-0 mr-1" />
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-neo-sm text-xs font-heading font-bold border-2 transition-all whitespace-nowrap select-none ${
                  isSelected
                    ? 'bg-neo-yellow text-neo-border border-neo-border shadow-neo-sm -translate-y-0.5'
                    : 'bg-neo-bg dark:bg-neo-dark-bg border-neo-border text-neo-text dark:text-neo-dark-text hover:bg-white dark:hover:bg-neo-dark-card'
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Results Info Bar ── */}
      <div className="flex items-center justify-between text-xs text-neo-text/80 dark:text-neo-dark-text/80 font-mono relative z-10">
        <div>
          Showing <span className="font-bold text-neo-text dark:text-neo-dark-text bg-neo-yellow px-1.5 py-0.2 rounded-neo-sm border border-neo-border text-neo-border">{filteredEvents.length}</span> event
          {filteredEvents.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && (
            <span> in <span className="font-bold underline">{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span></span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1 text-xs font-bold text-neo-border dark:text-neo-yellow hover:underline transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* ── Events Grid / Empty State ── */}
      <div className="relative z-10">
        {filteredEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={<Calendar className="w-8 h-8 text-neo-yellow" />}
            title="No matching events found"
            description="We couldn't find any events matching your current search query or filter selection."
            action={
              <Button variant="secondary" size="sm" onClick={handleClearFilters}>
                Clear All Filters
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Events;
