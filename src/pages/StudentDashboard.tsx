import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  Bell,
  Trash2,
  ExternalLink,
  QrCode,
  User,
  Shield,
  Star,
  Sparkles,
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import BorderBeam from '../components/motion/BorderBeam';
import ParticleBackground from '../components/motion/ParticleBackground';
import { EventPassModal } from '../components/ui/EventPassModal';
import { CertificateModal } from '../components/ui/CertificateModal';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import type { Event, Registration } from '../types';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { events, registrations, announcements, cancelRegistration } = useEvents();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'registrations' | 'announcements' | 'certificates' | 'profile'>('registrations');
  const [selectedPass, setSelectedPass] = useState<{ event: Event; registration: Registration } | null>(null);
  const [selectedCert, setSelectedCert] = useState<{ event: Event; registration: Registration } | null>(null);

  // Filter user registrations
  const userRegistrations = registrations.filter(
    (r) => r.userId === user?.id || (!user?.id && r.userId === 'student-001') || (user?.id === 'student-001' && r.userId === 'student-001')
  );

  const registeredItems = userRegistrations
    .map((r) => {
      const ev = events.find((e) => e.id === r.eventId);
      return ev ? { registration: r, event: ev } : null;
    })
    .filter(Boolean) as { registration: Registration; event: Event }[];

  const now = new Date();
  const upcomingRegistrations = registeredItems.filter(
    ({ event }) => new Date(event.startAt) >= now
  );
  const attendedRegistrations = registeredItems.filter(
    ({ registration }) => registration.attendanceStatus === 'present'
  );

  const handleCancel = (regId: string, eventTitle: string) => {
    cancelRegistration(regId);
    toast.info('Registration Cancelled', `Your pass for "${eventTitle}" has been cancelled.`);
  };

  const tabOptions = [
    { id: 'registrations', label: `My Passes (${registeredItems.length})`, icon: Ticket },
    { id: 'announcements', label: `Notices (${announcements.length})`, icon: Bell },
    { id: 'certificates', label: `Certificates (${attendedRegistrations.length})`, icon: Award },
    { id: 'profile', label: 'Member Profile', icon: User },
  ] as const;

  return (
    <div className="flex flex-col gap-10 pb-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative overflow-hidden">
      {/* ── Welcome Banner with BorderBeam ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-neo-lg bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-neo-lg dark:shadow-neo-dark-lg relative overflow-hidden z-10"
      >
        <BorderBeam size={260} duration={14} colorFrom="#FFE600" colorTo="#7DD3FC" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-neo-sm bg-neo-yellow border-2 border-neo-border flex items-center justify-center text-neo-border font-heading font-black text-2xl shadow-neo-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-neo-text dark:text-neo-dark-text">
                Welcome back, {user?.name || 'Demo Student'}
              </h1>
              <Badge variant="yellow" size="sm">
                Student Member
              </Badge>
            </div>
            <p className="text-neo-text/70 dark:text-neo-dark-text/70 text-xs sm:text-sm mt-1 font-mono">
              {user?.email || 'student@demo.sggscc.ac.in'} • SGGSCC Tech Society Portal
            </p>
          </div>
        </div>

        <Link to="/events" className="relative z-10">
          <Button size="sm" variant="primary" icon={<Calendar className="w-4 h-4" />}>
            Browse More Events
          </Button>
        </Link>
      </motion.div>

      {/* ── Metric Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
        <div className="p-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark flex items-center justify-between">
          <div>
            <p className="text-xs font-mono font-bold uppercase text-neo-text/70 dark:text-neo-dark-text/70 tracking-wider">
              Total Registrations
            </p>
            <p className="font-heading font-black text-3xl text-neo-text dark:text-neo-dark-text mt-1">
              {registeredItems.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-neo-sm bg-neo-yellow border-2 border-neo-border text-neo-border shadow-neo-sm flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark flex items-center justify-between">
          <div>
            <p className="text-xs font-mono font-bold uppercase text-neo-text/70 dark:text-neo-dark-text/70 tracking-wider">
              Upcoming Sessions
            </p>
            <p className="font-heading font-black text-3xl text-neo-text dark:text-neo-dark-text mt-1">
              {upcomingRegistrations.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-neo-sm bg-neo-blue border-2 border-neo-border text-neo-border shadow-neo-sm flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark flex items-center justify-between">
          <div>
            <p className="text-xs font-mono font-bold uppercase text-neo-text/70 dark:text-neo-dark-text/70 tracking-wider">
              Verified Attended
            </p>
            <p className="font-heading font-black text-3xl text-neo-text dark:text-neo-dark-text mt-1">
              {attendedRegistrations.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-neo-sm bg-neo-pink border-2 border-neo-border text-neo-border shadow-neo-sm flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ── Tabbed View (Segmented Control) ── */}
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-neo-dark-card rounded-neo-md border-[2.5px] border-neo-border dark:border-neo-dark-border overflow-x-auto scrollbar-none shadow-neo dark:shadow-neo-dark max-w-2xl">
          {tabOptions.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-neo-sm text-xs sm:text-sm font-heading font-bold border-2 transition-all whitespace-nowrap select-none flex-1 justify-center ${
                  active
                    ? 'bg-neo-yellow text-neo-border border-neo-border shadow-neo-sm -translate-y-0.5'
                    : 'bg-transparent text-neo-text dark:text-neo-dark-text border-transparent hover:bg-neo-bg dark:hover:bg-neo-dark-bg'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: Registrations ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'registrations' && (
            <motion.div
              key="registrations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {registeredItems.length > 0 ? (
                <div className="space-y-4">
                  {registeredItems.map(({ registration, event }) => {
                    const evDate = new Date(event.startAt);
                    const isPast = evDate < now;
                    return (
                      <div
                        key={registration.id}
                        className="p-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                      >
                        <div className="flex items-start gap-4">
                          {/* Visual Neo-Brutalist Calendar Ticket Stamp */}
                          <div className="hidden sm:flex flex-col items-center justify-center shrink-0 w-14 rounded-neo-sm overflow-hidden border-2 border-neo-border dark:border-neo-dark-border shadow-[3px_3px_0px_#19191C] dark:shadow-[3px_3px_0px_#FFE600] select-none mt-1">
                            <div className="w-full bg-[#19191C] dark:bg-neo-yellow text-neo-yellow dark:text-neo-border py-1 px-1.5 text-center text-[10px] font-mono font-black tracking-wider uppercase border-b-2 border-neo-border dark:border-neo-dark-border leading-none">
                              {evDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                            </div>
                            <div className="w-full bg-neo-yellow dark:bg-neo-dark-bg text-neo-border dark:text-white py-2 px-1 text-center flex items-center justify-center">
                              <span className="text-lg font-heading font-black tracking-tight leading-none">
                                {evDate.getDate()}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="blue" size="sm">
                                {event.category.toUpperCase().replace(/-/g, ' ')}
                              </Badge>
                              <Badge
                                variant={
                                  registration.attendanceStatus === 'present'
                                    ? 'yellow'
                                    : isPast
                                    ? 'muted'
                                    : 'pink'
                                }
                                size="sm"
                              >
                                {registration.attendanceStatus === 'present'
                                  ? 'Attended / Present'
                                  : isPast
                                  ? 'Concluded'
                                  : 'Upcoming Session'}
                              </Badge>
                              <span className="font-mono text-xs text-neo-text/70 dark:text-neo-dark-text/70">
                                Pass: {registration.id}
                              </span>
                            </div>

                            <Link
                              to={`/events/${event.slug}`}
                              className="font-heading font-black text-lg sm:text-xl text-neo-text dark:text-neo-dark-text hover:text-neo-blue transition-colors block"
                            >
                              {event.title}
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-neo-text/70 dark:text-neo-dark-text/70 font-mono">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-neo-pink" />
                                {evDate.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-neo-blue" />
                                {event.venue}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<QrCode className="w-3.5 h-3.5" />}
                            onClick={() => setSelectedPass({ event, registration })}
                          >
                            Digital Pass
                          </Button>
                          {!isPast && (
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleCancel(registration.id, event.title)}
                              title="Cancel Registration"
                              className="p-2.5 rounded-neo-sm border-2 border-neo-border bg-neo-bg dark:bg-neo-dark-bg text-neo-text/70 hover:text-red-600 hover:border-red-500 transition-colors shadow-neo-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  icon={<Ticket className="w-8 h-8 text-neo-yellow" />}
                  title="No registrations yet"
                  description="You have not registered for any upcoming or past Infinity events yet."
                  action={
                    <Link to="/events">
                      <Button variant="primary" size="sm">Explore & Register for Events</Button>
                    </Link>
                  }
                />
              )}
            </motion.div>
          )}

          {/* ── TAB 2: Announcements ── */}
          {activeTab === 'announcements' && (
            <motion.div
              key="announcements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {announcements.map((ann) => {
                const pubDate = new Date(ann.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                return (
                  <div
                    key={ann.id}
                    className="p-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="pink" size="sm">
                        Society Notice
                      </Badge>
                      <span className="font-mono font-bold text-neo-text/70 dark:text-neo-dark-text/70">{pubDate}</span>
                    </div>
                    <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
                      {ann.title}
                    </h3>
                    <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-sm leading-relaxed font-body">
                      {ann.body}
                    </p>
                    <p className="text-[11px] font-mono font-bold text-neo-text/60 dark:text-neo-dark-text/60 pt-2 border-t-2 border-neo-border/20">
                      Posted by: {ann.createdBy}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ── TAB 3: Certificates ── */}
          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-neo-md bg-neo-yellow border-2 border-neo-border text-neo-border shadow-neo flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-black text-lg text-neo-border">
                    Verified Participation Credentials
                  </h3>
                  <p className="text-neo-border/80 text-xs mt-1 font-mono">
                    Certificates are automatically authorized after the society marks your attendance as Present.
                  </p>
                </div>
                <Badge variant="white" size="md">
                  Verified Records
                </Badge>
              </div>

              {attendedRegistrations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attendedRegistrations.map(({ registration, event }) => (
                    <div
                      key={registration.id}
                      className="p-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="yellow" size="sm">
                            Verified Completion
                          </Badge>
                          <span className="font-mono text-[11px] text-neo-text/70 dark:text-neo-dark-text/70">
                            ID: {registration.id}
                          </span>
                        </div>
                        <h4 className="font-heading font-black text-base text-neo-text dark:text-neo-dark-text">
                          {event.title}
                        </h4>
                        <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75">
                          Awarded to: <span className="font-bold text-neo-text dark:text-neo-dark-text">{user?.name}</span>
                        </p>
                      </div>

                      <div className="pt-4 border-t-2 border-neo-border/20 flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Digitally Signed
                        </span>
                        <Button
                          size="sm"
                          variant="secondary"
                          icon={<Award className="w-3.5 h-3.5" />}
                          onClick={() => setSelectedCert({ event, registration })}
                        >
                          View Certificate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Award className="w-8 h-8 text-neo-yellow" />}
                  title="No certificates available yet"
                  description="Once you attend an event and the administration marks your attendance as Present, your certificate will appear here."
                />
              )}
            </motion.div>
          )}

          {/* ── TAB 4: Profile ── */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="p-8 max-w-2xl bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg shadow-neo-lg dark:shadow-neo-dark-lg space-y-6">
                <h3 className="font-heading font-black text-xl text-neo-text dark:text-neo-dark-text">
                  Member Credentials
                </h3>
                <div className="space-y-4 text-sm font-mono">
                  <div className="flex justify-between py-2 border-b-2 border-neo-border/20">
                    <span className="text-neo-text/70 dark:text-neo-dark-text/70">Full Name</span>
                    <span className="font-bold text-neo-text dark:text-neo-dark-text">{user?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b-2 border-neo-border/20">
                    <span className="text-neo-text/70 dark:text-neo-dark-text/70">Registered Email</span>
                    <span className="font-bold text-neo-text dark:text-neo-dark-text">{user?.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b-2 border-neo-border/20">
                    <span className="text-neo-text/70 dark:text-neo-dark-text/70">Account Role</span>
                    <Badge variant="blue" size="sm">{user?.role?.toUpperCase()}</Badge>
                  </div>
                  <div className="flex justify-between py-2 border-b-2 border-neo-border/20">
                    <span className="text-neo-text/70 dark:text-neo-dark-text/70">Affiliated College</span>
                    <span className="font-bold text-neo-text dark:text-neo-dark-text">Sri Guru Gobind Singh College of Commerce</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Certificate Modal ── */}
      {selectedCert && (
        <CertificateModal
          isOpen={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          event={selectedCert.event}
          registration={selectedCert.registration}
          userName={user?.name || 'Demo Student'}
        />
      )}

      {/* ── Digital Event Pass Modal ── */}
      {selectedPass && (
        <EventPassModal
          isOpen={Boolean(selectedPass)}
          onClose={() => setSelectedPass(null)}
          event={selectedPass.event}
          registration={selectedPass.registration}
          userName={user?.name || 'Demo Student'}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
