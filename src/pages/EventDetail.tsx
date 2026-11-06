import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Share2,
  ShieldCheck,
  Sparkles,
  Ticket,
  Lock,
  Copy,
  QrCode,
  Star,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import BorderBeam from '../components/motion/BorderBeam';
import ParticleBackground from '../components/motion/ParticleBackground';
import { EventPassModal } from '../components/ui/EventPassModal';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { events, registerForEvent, cancelRegistration, isUserRegistered, getRegistrationForEvent } =
    useEvents();
  const { user } = useAuth();
  const toast = useToast();

  const event = events.find((e) => e.slug === slug);

  // Registration Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [institution, setInstitution] = useState('Sri Guru Gobind Singh College of Commerce');
  const [year, setYear] = useState('2nd Year');
  const [formError, setFormError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  if (!event) {
    return (
      <div className="max-w-container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-3xl font-black text-neo-text dark:text-neo-dark-text mb-3">
          Event Not Found
        </h2>
        <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-sm mb-6 font-body">
          The event you are looking for does not exist or may have been removed.
        </p>
        <Link to="/events">
          <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to All Events
          </Button>
        </Link>
      </div>
    );
  }

  const registered = isUserRegistered(event.id);
  const currentRegistration = getRegistrationForEvent(event.id);

  const eventStart = new Date(event.startAt);
  const eventEnd = new Date(event.endAt);
  const isPast = eventStart < new Date();
  const isFull = event.capacity ? event.registrationCount >= event.capacity : false;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerForEvent(event.id, { name, email, notes: `${institution} - ${year}` });
      setIsSubmitting(false);

      if (!res.success) {
        setFormError(res.error || 'Failed to complete registration.');
        toast.error(res.error || 'Registration failed.');
      } else {
        setRegisterSuccess(true);
        toast.success(`Pass confirmed for ${event.title}!`);
        setShowPassModal(true);
      }
    }, 400);
  };

  const handleCancelRegistration = () => {
    if (currentRegistration) {
      cancelRegistration(currentRegistration.id);
      setRegisterSuccess(false);
      setConfirmCancel(false);
      toast.info(`Registration cancelled for ${event.title}.`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col gap-10 pb-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative overflow-hidden">
      {/* ── Breadcrumb & Back Link ── */}
      <div className="flex items-center justify-between relative z-10">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-bold text-neo-text dark:text-neo-dark-text hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events Listing</span>
        </Link>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neo-border dark:text-white bg-white dark:bg-neo-dark-card border-2 border-neo-border dark:border-neo-dark-border px-3 py-1.5 rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark hover:shadow-neo hover:-translate-y-0.5 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Link Copied!' : 'Share Event'}</span>
        </motion.button>
      </div>

      {/* ── Event Hero Banner with BorderBeam ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-12 rounded-neo-lg bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border relative overflow-hidden shadow-neo-lg dark:shadow-neo-dark-lg z-10"
      >
        <BorderBeam size={260} duration={12} colorFrom="#FFE600" colorTo="#7DD3FC" />

        <div className="flex flex-col gap-4 max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue" size="md">
              {event.category.toUpperCase().replace(/-/g, ' ')}
            </Badge>
            <Badge variant={isPast ? 'muted' : 'yellow'} size="md">
              {isPast ? 'Past Event' : event.mode.toUpperCase()}
            </Badge>
            {registered && (
              <Badge variant="yellow" size="md" className="gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-neo-border" /> Confirmed Participant
              </Badge>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-neo-text dark:text-neo-dark-text leading-tight">
            {event.title}
          </h1>

          <p className="text-neo-text/80 dark:text-neo-dark-text/80 text-base sm:text-lg leading-relaxed font-body">
            {event.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t-2 border-neo-border/20 dark:border-neo-dark-border/20 text-xs font-mono">
            <div className="p-3 bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark flex items-center gap-3">
              <div className="flex flex-col items-center justify-center shrink-0 w-11 rounded-neo-sm overflow-hidden border-2 border-neo-border dark:border-neo-dark-border shadow-[2px_2px_0px_#19191C] dark:shadow-[2px_2px_0px_#FFE600] select-none">
                <div className="w-full bg-[#19191C] dark:bg-neo-yellow text-neo-yellow dark:text-neo-border py-0.5 text-center text-[9px] font-mono font-black uppercase tracking-wider border-b border-neo-border dark:border-neo-dark-border leading-none">
                  {eventStart.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </div>
                <div className="w-full bg-neo-yellow dark:bg-neo-dark-bg text-neo-border dark:text-white py-1 text-center flex items-center justify-center">
                  <span className="text-sm font-heading font-black leading-none">
                    {eventStart.getDate()}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-neo-border dark:text-neo-dark-text font-bold mb-0.5">
                  <span className="text-[10px] uppercase font-mono">DATE</span>
                </div>
                <p className="font-bold text-neo-text dark:text-neo-dark-text text-xs">
                  {eventStart.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="p-3 bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark">
              <div className="flex items-center gap-1.5 text-neo-border dark:text-neo-dark-text font-bold mb-0.5">
                <Clock className="w-4 h-4 text-neo-blue" />
                <span className="text-[10px] uppercase">TIME</span>
              </div>
              <p className="font-bold text-neo-text dark:text-neo-dark-text">
                {eventStart.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div className="p-3 bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark">
              <div className="flex items-center gap-1.5 text-neo-border dark:text-neo-dark-text font-bold mb-0.5">
                <MapPin className="w-4 h-4 text-neo-yellow" />
                <span className="text-[10px] uppercase">VENUE</span>
              </div>
              <p className="font-bold text-neo-text dark:text-neo-dark-text truncate">{event.venue}</p>
            </div>

            <div className="p-3 bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-sm shadow-neo-sm dark:shadow-neo-dark">
              <div className="flex items-center gap-1.5 text-neo-border dark:text-neo-dark-text font-bold mb-0.5">
                <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-[10px] uppercase">CAPACITY</span>
              </div>
              <p className="font-bold text-neo-text dark:text-neo-dark-text">
                {event.registrationCount} {event.capacity ? `/ ${event.capacity}` : 'seats'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Main Content Grid: Details vs Registration Card ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        {/* Left: Event Details, Agenda, Prerequisites */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="p-8 bg-white dark:bg-neo-dark-card rounded-neo-lg border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo dark:shadow-neo-dark flex flex-col gap-6">
            <h3 className="font-heading font-black text-2xl text-neo-text dark:text-neo-dark-text">
              Event Overview & Agenda
            </h3>

            <div className="space-y-4 text-sm text-neo-text/80 dark:text-neo-dark-text/80 leading-relaxed font-body">
              <p>
                Organized under the auspices of <strong>Infinity – The Tech Society</strong> at
                SGGSCC, this initiative combines theoretical foundational knowledge with
                practical hands-on laboratory exercises.
              </p>
              <p>
                Whether you are attending online or in-person on campus, please arrive 15 minutes
                prior to the scheduled start time to complete check-in procedures.
              </p>
            </div>

            <h4 className="font-heading font-black text-neo-text dark:text-neo-dark-text text-base mt-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neo-pink" />
              <span>Key Session Takeaways</span>
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                'Practical real-world case studies and live code/design walkthroughs',
                'Access to presentation decks, starter repositories, and reference cheatsheets',
                'Interactive Q&A session with session leads and peer mentors',
                'Official certificate of participation upon verification of attendance',
              ].map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neo-text/85 dark:text-neo-dark-text/85 font-body">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>

            <h4 className="font-heading font-black text-neo-text dark:text-neo-dark-text text-base mt-2">
              Prerequisites & Requirements
            </h4>
            <div className="p-4 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-xs text-neo-text/80 dark:text-neo-dark-text/80 space-y-2 font-mono">
              <p>• A personal laptop (recommended for in-person workshops with charger).</p>
              <p>• Valid college ID card or government photo identification.</p>
              <p>• Registered event pass (digital confirmation on phone is sufficient).</p>
            </div>
          </div>
        </div>

        {/* Right: Registration / Ticket Box */}
        <div className="lg:col-span-5 sticky top-24">
          {registered || registerSuccess ? (
            /* ── Registration Confirmed Card ── */
            <div className="p-8 bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg flex flex-col gap-5 shadow-neo-lg dark:shadow-neo-dark-lg relative overflow-hidden">
              <BorderBeam size={220} duration={10} colorFrom="#FFE600" colorTo="#7DD3FC" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-neo-yellow border-2 border-neo-border text-neo-border flex items-center justify-center shadow-neo-sm shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-neo-text dark:text-neo-dark-text">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs font-mono font-bold text-neo-border dark:text-neo-yellow">You are booked for this session</p>
                </div>
              </div>

              <div className="p-4 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border space-y-3 text-xs relative z-10 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-neo-text/70 dark:text-neo-dark-text/70">Pass ID</span>
                  <span className="font-black text-neo-text dark:text-neo-dark-text">
                    {currentRegistration?.id || 'CONFIRMED'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neo-text/70 dark:text-neo-dark-text/70">Attendance Status</span>
                  <Badge
                    variant={
                      currentRegistration?.attendanceStatus === 'present'
                        ? 'yellow'
                        : 'blue'
                    }
                    size="sm"
                  >
                    {currentRegistration?.attendanceStatus === 'present'
                      ? 'Present'
                      : 'Pending Check-in'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neo-text/70 dark:text-neo-dark-text/70">Participant</span>
                  <span className="font-bold text-neo-text dark:text-neo-dark-text">{user?.name || name || 'Demo Student'}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 relative z-10">
                <Button
                  fullWidth
                  variant="primary"
                  icon={<QrCode className="w-4 h-4" />}
                  onClick={() => setShowPassModal(true)}
                >
                  View Digital Pass & QR Code
                </Button>
                <Link to="/student" className="w-full block">
                  <Button fullWidth variant="secondary" icon={<Ticket className="w-4 h-4" />}>
                    Open Student Dashboard
                  </Button>
                </Link>
                {confirmCancel ? (
                  <div className="p-3 rounded-neo-sm bg-red-100 dark:bg-red-950/40 border-2 border-red-500 text-center space-y-2">
                    <p className="text-xs font-bold text-red-700 dark:text-red-300">Are you sure you want to release your seat?</p>
                    <div className="flex items-center gap-2 justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelRegistration}
                        className="text-red-600 hover:text-red-700"
                      >
                        Yes, Cancel Pass
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setConfirmCancel(false)}
                      >
                        Keep Pass
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={() => setConfirmCancel(true)}
                    className="text-neo-text/70 hover:text-red-600"
                  >
                    Cancel Registration
                  </Button>
                )}
              </div>

              <p className="text-[11px] text-neo-text/60 dark:text-neo-dark-text/60 text-center font-mono relative z-10">
                Duplicate registration prevention is active.
              </p>
            </div>
          ) : isPast ? (
            /* ── Event Concluded ── */
            <div className="p-8 text-center flex flex-col gap-4 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border rounded-neo-lg shadow-neo">
              <Calendar className="w-10 h-10 text-neo-text/60 dark:text-neo-dark-text/60 mx-auto" />
              <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
                Event Concluded
              </h3>
              <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-xs leading-relaxed font-body">
                This event took place on{' '}
                {eventStart.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
                . Registrations are no longer accepted.
              </p>
              <Link to="/events">
                <Button variant="secondary" fullWidth size="sm">
                  Find Upcoming Events
                </Button>
              </Link>
            </div>
          ) : isFull ? (
            /* ── Capacity Full ── */
            <div className="p-8 text-center flex flex-col gap-4 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border rounded-neo-lg shadow-neo">
              <AlertCircle className="w-10 h-10 text-neo-yellow mx-auto" />
              <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
                Capacity Reached
              </h3>
              <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-xs leading-relaxed font-body">
                All {event.capacity} seats for this event are fully booked. Join the waitlist or
                explore other scheduled sessions.
              </p>
              <Link to="/events">
                <Button variant="secondary" fullWidth size="sm">
                  Browse Other Events
                </Button>
              </Link>
            </div>
          ) : (
            /* ── Active Registration Form ── */
            <div className="p-8 bg-white dark:bg-neo-dark-card rounded-neo-lg border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg flex flex-col gap-5 relative overflow-hidden">
              <BorderBeam size={220} duration={14} colorFrom="#FFE600" colorTo="#7DD3FC" />

              <div className="relative z-10">
                <span className="font-handwriting text-xl font-bold text-neo-pink block">
                  ★ INSTANT PASS
                </span>
                <h3 className="font-heading font-black text-2xl text-neo-text dark:text-neo-dark-text">
                  Register for Free
                </h3>
                <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-xs mt-1 font-body">
                  Secure your seat. Open to all college students.
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-neo-sm bg-red-100 dark:bg-red-950/40 border-2 border-red-500 text-xs font-bold text-red-700 dark:text-red-300 flex items-center gap-2 relative z-10 shadow-neo-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4 relative z-10">
                <Input
                  label="Full Name"
                  placeholder="e.g. Arjun Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. arjun@student.sggscc.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Institution / College"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />

                <Input
                  label="Academic Year / Degree"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    fullWidth
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    icon={<Ticket className="w-4 h-4" />}
                  >
                    Confirm My Registration
                  </Button>
                </div>
              </form>

              <div className="pt-3 border-t-2 border-neo-border/20 flex items-center justify-center gap-2 text-[11px] font-mono font-bold text-neo-text/70 dark:text-neo-dark-text/70 relative z-10">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span>Zero spam. Data used solely for event access.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Event Pass Modal with QR & .ics ── */}
      {currentRegistration && (
        <EventPassModal
          isOpen={showPassModal}
          onClose={() => setShowPassModal(false)}
          event={event}
          registration={currentRegistration}
          userName={user?.name || name || 'Demo Student'}
        />
      )}
    </div>
  );
};

export default EventDetail;
