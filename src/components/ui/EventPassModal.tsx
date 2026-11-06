import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Download, QrCode, CheckCircle2, Ticket } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import InfinitySymbol from './InfinitySymbol';
import BorderBeam from '../motion/BorderBeam';
import type { Event, Registration } from '../../types';

interface EventPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  registration: Registration;
  userName: string;
}

export const EventPassModal: React.FC<EventPassModalProps> = ({
  isOpen,
  onClose,
  event,
  registration,
  userName,
}) => {
  if (!isOpen) return null;

  const eventStart = new Date(event.startAt);
  const formattedDate = eventStart.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = eventStart.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Generate .ics calendar file download
  const handleDownloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//INFINITY SGGSCC//Event Pass//EN',
      'BEGIN:VEVENT',
      `UID:${registration.id}@infinity.sggscc.ac.in`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${eventStart.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${new Date(event.endAt).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.venue}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.slug}-pass.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
        className="relative w-full max-w-lg my-8 bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg p-6 sm:p-8 shadow-neo-lg dark:shadow-neo-dark-lg"
      >
        <BorderBeam size={260} duration={12} colorFrom="#FFE600" colorTo="#7DD3FC" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-neo-border/20 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-neo-border dark:text-neo-yellow" />
            <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
              Digital Event Access Pass
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-neo-sm border-2 border-neo-border text-neo-text hover:bg-neo-yellow transition-colors shadow-neo-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Boarding Pass Body ── */}
        <div className="rounded-neo-md border-[2.5px] border-neo-border bg-neo-bg dark:bg-neo-dark-bg p-6 space-y-6 relative overflow-hidden shadow-neo-sm">
          {/* Pass Top Branding */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-neo-sm bg-neo-yellow border-2 border-neo-border shadow-neo-sm text-neo-border">
                <InfinitySymbol size="sm" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-base text-neo-text dark:text-neo-dark-text leading-none">
                    INFINITY
                  </span>
                  <span className="px-1 py-0.2 rounded-neo-sm bg-neo-blue text-neo-border border border-neo-border text-[8px] font-mono font-bold">
                    SGGSCC
                  </span>
                </div>
                <span className="font-handwriting text-xs font-bold text-neo-text/80 dark:text-neo-yellow -rotate-1 mt-0.5">
                  The Tech Society
                </span>
              </div>
            </div>

            <Badge variant="yellow" size="sm" className="gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
            </Badge>
          </div>

          {/* Event Title */}
          <div>
            <span className="font-mono text-[11px] uppercase font-bold text-neo-pink">
              {event.category.replace(/-/g, ' ')}
            </span>
            <h4 className="font-heading font-black text-xl text-neo-text dark:text-neo-dark-text mt-0.5">
              {event.title}
            </h4>
          </div>

          {/* Pass Data Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y-2 border-neo-border/20 text-xs font-mono">
            <div>
              <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-[10px] uppercase font-bold">Attendee</p>
              <p className="font-bold text-neo-text dark:text-neo-dark-text truncate">{userName}</p>
            </div>
            <div>
              <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-[10px] uppercase font-bold">Pass ID</p>
              <p className="font-black text-neo-border dark:text-neo-yellow">{registration.id}</p>
            </div>
            <div>
              <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-[10px] uppercase font-bold">Date & Time</p>
              <p className="font-bold text-neo-text dark:text-neo-dark-text">{formattedDate}</p>
              <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-[11px]">{formattedTime}</p>
            </div>
            <div>
              <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-[10px] uppercase font-bold">Venue & Mode</p>
              <p className="font-bold text-neo-text dark:text-neo-dark-text truncate">{event.venue}</p>
              <p className="font-bold text-neo-pink text-[11px] uppercase">{event.mode}</p>
            </div>
          </div>

          {/* Simulated QR Code & Barcode */}
          <div className="flex items-center justify-between pt-2">
            <div className="p-3 bg-white border-2 border-neo-border rounded-neo-sm shadow-neo-sm">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect width="64" height="64" fill="white" />
                <rect x="4" y="4" width="20" height="20" fill="black" />
                <rect x="8" y="8" width="12" height="12" fill="white" />
                <rect x="10" y="10" width="8" height="8" fill="black" />
                <rect x="40" y="4" width="20" height="20" fill="black" />
                <rect x="44" y="8" width="12" height="12" fill="white" />
                <rect x="46" y="10" width="8" height="8" fill="black" />
                <rect x="4" y="40" width="20" height="20" fill="black" />
                <rect x="8" y="44" width="12" height="12" fill="white" />
                <rect x="10" y="46" width="8" height="8" fill="black" />
                <rect x="28" y="8" width="6" height="12" fill="black" />
                <rect x="28" y="28" width="14" height="14" fill="black" />
                <rect x="46" y="32" width="10" height="8" fill="black" />
                <rect x="36" y="46" width="8" height="10" fill="black" />
                <rect x="48" y="48" width="10" height="8" fill="black" />
              </svg>
            </div>

            <div className="text-right space-y-1">
              <p className="font-mono text-[10px] font-bold text-neo-text/70 dark:text-neo-dark-text/70 uppercase">Fast Check-In</p>
              <p className="text-xs font-bold text-neo-text dark:text-neo-dark-text">Present at desk on arrival</p>
              <div className="h-6 w-32 bg-neo-yellow border border-neo-border rounded flex items-center justify-around px-1 font-mono text-[9px] font-black text-neo-border">
                |||| | ||||| || |||
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t-2 border-neo-border/20 relative z-10">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Done
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Calendar className="w-4 h-4" />}
            onClick={handleDownloadCalendar}
          >
            Add to Calendar (.ics)
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EventPassModal;
