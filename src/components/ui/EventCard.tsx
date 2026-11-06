import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Ticket,
  BrainCircuit,
  ShieldCheck,
  Palette,
  Gamepad2,
  Blocks,
  Terminal,
  Radio,
} from 'lucide-react';
import type { Event } from '../../types';
import Badge from './Badge';
import { useEvents } from '../../context/EventContext';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const CATEGORY_MAP: Record<
  string,
  {
    label: string;
    variant: 'yellow' | 'blue' | 'pink' | 'white' | 'dark';
    icon: React.ElementType;
  }
> = {
  'ai-emerging-tech': {
    label: 'AI & Emerging Tech',
    variant: 'blue',
    icon: BrainCircuit,
  },
  cybersecurity: {
    label: 'Cybersecurity',
    variant: 'yellow',
    icon: ShieldCheck,
  },
  'design-creative': {
    label: 'Design & Creative',
    variant: 'pink',
    icon: Palette,
  },
  'gaming-competitions': {
    label: 'Gaming & Contests',
    variant: 'yellow',
    icon: Gamepad2,
  },
  'web3-digital-economy': {
    label: 'Web3 & Economy',
    variant: 'blue',
    icon: Blocks,
  },
  workshops: {
    label: 'Workshop',
    variant: 'pink',
    icon: Terminal,
  },
  seminars: {
    label: 'Seminar',
    variant: 'white',
    icon: Radio,
  },
};

export const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const { isUserRegistered } = useEvents();
  const registered = isUserRegistered(event.id);

  const cat = CATEGORY_MAP[event.category] || { label: event.category, variant: 'blue' as const, icon: Sparkles };
  const eventDate = new Date(event.startAt);
  const isPast = eventDate < new Date();

  const dayNumber = eventDate.getDate();
  const monthName = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const percentFilled = event.capacity
    ? Math.min(100, Math.round((event.registrationCount / event.capacity) * 100))
    : 50;

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md p-5 sm:p-6 transition-all duration-200 ${
        featured
          ? 'shadow-neo-lg dark:shadow-neo-dark-lg hover:-translate-y-1 hover:shadow-[7px_7px_0px_#19191C] dark:hover:shadow-[7px_7px_0px_#FFE600]'
          : 'shadow-neo dark:shadow-neo-dark hover:-translate-y-1 hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg'
      }`}
    >
      {/* Top Banner Ribbon for Featured */}
      {featured && (
        <div className="absolute -top-3.5 right-4 bg-neo-yellow text-neo-border text-[11px] font-mono font-bold px-3 py-0.5 rounded-full border-2 border-neo-border shadow-neo-sm uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-neo-border" />
          <span>Flagship</span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col gap-4">
        {/* Header Strip with Date Pill and Category */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
            {/* Visual Neo-Brutalist Calendar Ticket Stamp */}
            <div className="flex flex-col items-center justify-center shrink-0 w-14 rounded-neo-sm overflow-hidden border-2 border-neo-border dark:border-neo-dark-border shadow-[3px_3px_0px_#19191C] dark:shadow-[3px_3px_0px_#FFE600] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_#19191C] dark:group-hover:shadow-[4px_4px_0px_#FFE600] transition-all duration-200 select-none">
              {/* Month Header Banner */}
              <div className="w-full bg-[#19191C] dark:bg-neo-yellow text-neo-yellow dark:text-neo-border py-1 px-1.5 text-center text-[10px] font-mono font-black tracking-wider uppercase border-b-2 border-neo-border dark:border-neo-dark-border leading-none">
                {monthName}
              </div>
              {/* Day Number Body */}
              <div className="w-full bg-neo-yellow dark:bg-neo-dark-bg text-neo-border dark:text-white py-2 px-1 text-center flex items-center justify-center">
                <span className="text-lg font-heading font-black tracking-tight leading-none">
                  {dayNumber}
                </span>
              </div>
            </div>

            <Badge variant={cat.variant} size="sm" className="gap-1.5">
              {React.createElement(cat.icon, { className: 'w-3 h-3' })}
              <span>{cat.label}</span>
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            {registered ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-neo-border bg-neo-yellow px-2 py-0.5 rounded-neo-sm border-2 border-neo-border shadow-neo-sm">
                <CheckCircle2 className="w-3 h-3" /> Registered
              </span>
            ) : (
              <span
                className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-neo-sm border-2 border-neo-border ${
                  isPast
                    ? 'bg-neo-bg text-neo-text/70'
                    : 'bg-neo-blue text-neo-border'
                }`}
              >
                {isPast ? 'Concluded' : event.mode}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <Link to={`/events/${event.slug}`} className="block">
          <h3 className="font-heading font-bold text-xl text-neo-text dark:text-neo-dark-text group-hover:text-neo-blue transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-xs sm:text-sm line-clamp-2 leading-relaxed font-body">
          {event.description}
        </p>
      </div>

      {/* Footer & Seat Indicator */}
      <div className="pt-4 mt-4 border-t-2 border-neo-border/20 dark:border-neo-dark-border/20">
        {/* Metadata Details */}
        <div className="space-y-3 text-xs mb-4">
          <div className="flex items-center justify-between text-neo-text/80 dark:text-neo-dark-text/80 font-mono">
            <span className="flex items-center gap-1.5 font-medium truncate max-w-[170px]">
              <MapPin className="w-3.5 h-3.5 text-neo-text shrink-0" />
              <span className="truncate">{event.venue}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{formattedTime}</span>
            </span>
          </div>

          {/* Seat Capacity Bar */}
          {event.capacity && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono font-medium text-neo-text/80 dark:text-neo-dark-text/80">
                <span>Passes Claimed</span>
                <span className="font-bold">
                  {event.registrationCount}/{event.capacity} ({percentFilled}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-neo-bg dark:bg-neo-dark-bg rounded-full overflow-hidden border-2 border-neo-border dark:border-neo-dark-border">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-neo-yellow"
                  style={{ width: `${percentFilled}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Link */}
        <Link
          to={`/events/${event.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-neo-sm text-xs sm:text-sm font-bold tracking-wide bg-neo-blue text-neo-border border-2 border-neo-border shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all"
        >
          {registered ? (
            <Ticket className="w-4 h-4 text-neo-border" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-neo-border" />
          )}
          <span>{registered ? 'View Digital Pass' : 'Reserve Free Ticket'}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
