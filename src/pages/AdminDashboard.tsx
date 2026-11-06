import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plus,
  Calendar,
  Users,
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit3,
  RotateCcw,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  QrCode,
  Search,
  Download,
  Check,
  Star,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import EmptyState from '../components/ui/EmptyState';
import BorderBeam from '../components/motion/BorderBeam';
import ParticleBackground from '../components/motion/ParticleBackground';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { useToast } from '../context/ToastContext';
import type { Event, EventCategory, EventMode, AttendanceStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { user, login } = useAuth();
  const {
    events,
    registrations,
    announcements,
    createEvent,
    deleteEvent,
    updateEvent,
    updateAttendance,
    createAnnouncement,
    deleteAnnouncement,
    resetDemoData,
  } = useEvents();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'events' | 'attendance' | 'announcements'>('events');
  const [selectedEventForAttendance, setSelectedEventForAttendance] = useState<string>('all');
  const [fastPassInput, setFastPassInput] = useState('');
  const [attendanceSearch, setAttendanceSearch] = useState('');

  // Create Event Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<EventCategory>('workshops');
  const [newMode, setNewMode] = useState<EventMode>('offline');
  const [newVenue, setNewVenue] = useState('Seminar Hall, SGGSCC');
  const [newStart, setNewStart] = useState('2026-11-20T10:00');
  const [newEnd, setNewEnd] = useState('2026-11-20T17:00');
  const [newCapacity, setNewCapacity] = useState('100');
  const [newDesc, setNewDesc] = useState('');

  // Announcement State
  const [annTitle, setAnnTitle] = useState('');
  const [annBody, setAnnBody] = useState('');

  const isAdmin = user && user.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center flex flex-col items-center gap-6 relative z-10">
        <div className="p-8 flex flex-col items-center gap-6 bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg shadow-neo-lg dark:shadow-neo-dark-lg text-center w-full">
          <div className="w-16 h-16 rounded-neo-sm bg-neo-yellow border-2 border-neo-border text-neo-border flex items-center justify-center shadow-neo-sm">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <span className="font-handwriting text-xl font-bold text-neo-pink block">
              ★ RESTRICTED ACCESS
            </span>
            <h2 className="font-heading text-2xl font-black text-neo-text dark:text-neo-dark-text">
              Admin Portal Protected
            </h2>
            <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-xs sm:text-sm mt-2 leading-relaxed font-body">
              This administration portal requires role authorization. For testing and evaluation,
              you can instantly sign in using the demo administrator credentials.
            </p>
          </div>

          <Button
            fullWidth
            size="lg"
            variant="primary"
            onClick={() => login('admin@infinity.sggscc.ac.in', 'admin123')}
            icon={<Shield className="w-4 h-4" />}
          >
            One-Click Admin Evaluation Login
          </Button>
        </div>
      </div>
    );
  }

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent({
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      mode: newMode,
      venue: newVenue,
      startAt: newStart,
      endAt: newEnd,
      capacity: parseInt(newCapacity, 10) || 100,
      description: newDesc,
      status: 'published',
      coverImage: '',
    });
    toast.success(`Event "${newTitle}" created successfully!`);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annBody.trim()) return;
    createAnnouncement(annTitle, annBody);
    toast.success('Announcement broadcast to all student streams!');
    setAnnTitle('');
    setAnnBody('');
  };

  const handleFastCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fastPassInput.trim()) return;
    const targetReg = registrations.find(
      (r) => r.id.toLowerCase() === fastPassInput.trim().toLowerCase()
    );
    if (targetReg) {
      updateAttendance(targetReg.id, 'present');
      toast.success(`Participant ${targetReg.id} successfully marked as PRESENT!`);
      setFastPassInput('');
    } else {
      toast.error(`No registration pass found matching "${fastPassInput}"`);
    }
  };

  const handleExportCSV = () => {
    const rows = [
      ['Pass ID', 'User ID', 'Event ID', 'Attendance Status', 'Registration Date'],
      ...registrations.map((r) => [
        r.id,
        r.userId,
        r.eventId,
        r.attendanceStatus,
        r.createdAt,
      ]),
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `infinity_attendance_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Attendance records exported to CSV!');
  };

  // Filter attendance by event & query
  const displayedRegistrations = registrations.filter((r) => {
    if (selectedEventForAttendance !== 'all' && r.eventId !== selectedEventForAttendance) {
      return false;
    }
    if (!attendanceSearch.trim()) return true;
    const query = attendanceSearch.toLowerCase();
    const evt = events.find((e) => e.id === r.eventId);
    return (
      r.id.toLowerCase().includes(query) ||
      r.userId.toLowerCase().includes(query) ||
      (evt?.title || '').toLowerCase().includes(query)
    );
  });

  const adminTabs = [
    { id: 'events', label: `Event Manager (${events.length})`, icon: Calendar },
    { id: 'attendance', label: `Attendance (${registrations.length})`, icon: Users },
    { id: 'announcements', label: `Notices (${announcements.length})`, icon: Bell },
  ] as const;

  return (
    <div className="flex flex-col gap-10 pb-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative overflow-hidden">
      {/* ── Top Header with BorderBeam ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-neo-lg bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-neo-lg dark:shadow-neo-dark-lg relative overflow-hidden z-10"
      >
        <BorderBeam size={260} duration={14} colorFrom="#FFE600" colorTo="#7DD3FC" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-neo-text dark:text-neo-dark-text">
              INFINITY Administration Console
            </h1>
            <Badge variant="yellow" size="sm">
              Role: Admin
            </Badge>
          </div>
          <p className="text-neo-text/75 dark:text-neo-dark-text/75 text-xs sm:text-sm mt-1 font-mono">
            Manage society events, attendance status, and published announcements.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Button size="sm" variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setShowCreateModal(true)}>
            Create New Event
          </Button>
          <Button variant="secondary" size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />} onClick={resetDemoData}>
            Reset Demo Data
          </Button>
        </div>
      </motion.div>

      {/* ── Stat Highlights ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        <div className="p-5 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark">
          <p className="text-xs font-mono font-bold uppercase text-neo-text/70 dark:text-neo-dark-text/70">Total Events</p>
          <p className="font-heading font-black text-2xl sm:text-3xl text-neo-text dark:text-neo-dark-text mt-1">
            {events.length}
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark">
          <p className="text-xs font-mono font-bold uppercase text-neo-text/70 dark:text-neo-dark-text/70">Registrations</p>
          <p className="font-heading font-black text-2xl sm:text-3xl text-neo-blue mt-1">
            {registrations.length}
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark">
          <p className="text-xs font-mono font-bold uppercase text-neo-text/70 dark:text-neo-dark-text/70">Present Attendees</p>
          <p className="font-heading font-black text-2xl sm:text-3xl text-green-600 dark:text-green-400 mt-1">
            {registrations.filter((r) => r.attendanceStatus === 'present').length}
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark">
          <p className="text-xs font-mono font-bold uppercase text-neo-text/70 dark:text-neo-dark-text/70">Announcements</p>
          <p className="font-heading font-black text-2xl sm:text-3xl text-neo-pink mt-1">
            {announcements.length}
          </p>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-neo-dark-card rounded-neo-md border-[2.5px] border-neo-border dark:border-neo-dark-border overflow-x-auto scrollbar-none shadow-neo dark:shadow-neo-dark max-w-xl">
          {adminTabs.map((tab) => {
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

        {/* ── TAB 1: Events ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
                  All Scheduled & Past Events
                </h3>
                <Button size="sm" variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setShowCreateModal(true)}>
                  Add Event
                </Button>
              </div>

              <div className="space-y-3">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-5 rounded-neo-md bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg hover:-translate-y-0.5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="blue" size="sm">
                          {evt.category}
                        </Badge>
                        <Badge variant={evt.status === 'published' ? 'yellow' : 'muted'} size="sm">
                          {evt.status}
                        </Badge>
                        <span className="text-xs font-mono font-bold uppercase text-neo-text/70 dark:text-neo-dark-text/70">
                          {evt.mode}
                        </span>
                      </div>
                      <h4 className="font-heading font-black text-base text-neo-text dark:text-neo-dark-text">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-neo-text/70 dark:text-neo-dark-text/70 font-mono">
                        {new Date(evt.startAt).toLocaleString('en-US')} • {evt.venue} •{' '}
                        <span className="font-bold text-neo-text dark:text-neo-dark-text">{evt.registrationCount}</span> registered
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updateEvent(evt.id, {
                            status: evt.status === 'published' ? 'archived' : 'published',
                          })
                        }
                        className="px-3 py-1.5 text-xs font-mono font-bold rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text hover:bg-neo-yellow hover:text-neo-border shadow-neo-sm transition-all"
                      >
                        {evt.status === 'published' ? 'Archive' : 'Publish'}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteEvent(evt.id)}
                        className="p-2 rounded-neo-sm border-2 border-neo-border text-neo-text/70 hover:text-red-600 hover:border-red-500 transition-colors shadow-neo-sm"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── TAB 2: Attendance ── */}
          {activeTab === 'attendance' && (
            <motion.div
              key="attendance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Fast Pass ID / QR Desk Check-in Scanner Bar */}
              <div className="p-5 bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg shadow-neo-lg dark:shadow-neo-dark-lg relative overflow-hidden">
                <BorderBeam size={220} duration={12} colorFrom="#FFE600" colorTo="#7DD3FC" />
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center gap-2 text-neo-border dark:text-neo-yellow font-heading font-black text-sm">
                      <QrCode className="w-4 h-4" />
                      <span>Fast Pass / QR Desk Check-in</span>
                    </div>
                    <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75 font-body">
                      Type or paste a participant Pass ID (e.g.{' '}
                      <span className="font-mono font-bold text-neo-border dark:text-neo-yellow">reg-001</span>) to immediately
                      verify access and mark attendance as{' '}
                      <span className="font-bold underline text-green-600 dark:text-green-400">PRESENT</span>.
                    </p>
                  </div>

                  <form onSubmit={handleFastCheckIn} className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <input
                        type="text"
                        placeholder="Scan or type Pass ID..."
                        value={fastPassInput}
                        onChange={(e) => setFastPassInput(e.target.value)}
                        className="w-full bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border rounded-neo-sm px-3.5 py-2 text-xs text-neo-text dark:text-neo-dark-text placeholder:text-neo-text/50 font-mono shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow"
                      />
                    </div>
                    <Button type="submit" size="sm" variant="primary" icon={<Check className="w-4 h-4" />}>
                      Check In
                    </Button>
                  </form>
                </div>
              </div>

              {/* Filter Controls & CSV Export */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-neo-text/60 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Pass ID, User, or Event..."
                    value={attendanceSearch}
                    onChange={(e) => setAttendanceSearch(e.target.value)}
                    className="w-full bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border rounded-neo-sm pl-9 pr-3 py-2 text-xs text-neo-text dark:text-neo-dark-text placeholder:text-neo-text/50 shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedEventForAttendance}
                    onChange={(e) => setSelectedEventForAttendance(e.target.value)}
                    className="rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text px-3 py-2 text-xs shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow"
                  >
                    <option value="all">All Events ({registrations.length})</option>
                    {events.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.title}
                      </option>
                    ))}
                  </select>

                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Download className="w-3.5 h-3.5" />}
                    onClick={handleExportCSV}
                  >
                    Export CSV
                  </Button>
                </div>
              </div>

              {displayedRegistrations.length === 0 ? (
                <EmptyState
                  icon={<Users className="w-8 h-8 text-neo-yellow" />}
                  title="No registrations found"
                  description="Try adjusting your search criteria or event selection."
                />
              ) : (
                <div className="overflow-x-auto rounded-neo-md border-[2.5px] border-neo-border dark:border-neo-dark-border bg-white dark:bg-neo-dark-card shadow-neo dark:shadow-neo-dark">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neo-yellow border-b-2 border-neo-border text-neo-border font-mono font-black uppercase">
                      <tr>
                        <th className="p-4">Pass ID</th>
                        <th className="p-4">User</th>
                        <th className="p-4">Event</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Attendance</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-neo-border/20 font-mono">
                      {displayedRegistrations.map((r) => {
                        const evt = events.find((e) => e.id === r.eventId);
                        return (
                          <tr key={r.id} className="hover:bg-neo-bg/60 dark:hover:bg-neo-dark-bg/60 transition-colors">
                            <td className="p-4 text-neo-text dark:text-neo-dark-text font-black">{r.id}</td>
                            <td className="p-4 text-neo-text dark:text-neo-dark-text">{r.userId}</td>
                            <td className="p-4 text-neo-text/75 dark:text-neo-dark-text/75 truncate max-w-xs">{evt?.title || r.eventId}</td>
                            <td className="p-4">
                              <Badge variant="blue" size="sm">
                                {r.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge
                                variant={
                                  r.attendanceStatus === 'present'
                                    ? 'yellow'
                                    : r.attendanceStatus === 'absent'
                                    ? 'pink'
                                    : 'white'
                                }
                                size="sm"
                              >
                                {r.attendanceStatus.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  updateAttendance(r.id, 'present');
                                  toast.success(`Marked ${r.id} as PRESENT`);
                                }}
                                className="px-2.5 py-1 rounded-neo-sm border border-neo-border bg-neo-yellow text-neo-border font-bold text-[11px] shadow-neo-sm hover:shadow-neo"
                              >
                                Present
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  updateAttendance(r.id, 'absent');
                                  toast.info(`Marked ${r.id} as ABSENT`);
                                }}
                                className="px-2.5 py-1 rounded-neo-sm border border-neo-border bg-red-100 text-red-700 font-bold text-[11px] shadow-neo-sm hover:shadow-neo"
                              >
                                Absent
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  updateAttendance(r.id, 'pending');
                                  toast.info(`Reset attendance for ${r.id}`);
                                }}
                                className="px-2.5 py-1 rounded-neo-sm border border-neo-border bg-neo-bg dark:bg-neo-dark-bg text-neo-text text-[11px] shadow-neo-sm hover:shadow-neo"
                              >
                                Reset
                              </motion.button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* ── TAB 3: Announcements ── */}
          {activeTab === 'announcements' && (
            <motion.div
              key="announcements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5 p-6 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark space-y-4">
                <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
                  Broadcast New Announcement
                </h3>
                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <Input
                    label="Title / Headline"
                    placeholder="e.g. Hackathon Finalists Announced!"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-neo-text dark:text-neo-dark-text">Message Body</label>
                    <textarea
                      rows={4}
                      value={annBody}
                      onChange={(e) => setAnnBody(e.target.value)}
                      placeholder="Provide full announcement details…"
                      className="w-full rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text p-3 text-xs font-body shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" fullWidth icon={<Bell className="w-4 h-4" />}>
                    Publish to Student Stream
                  </Button>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
                  Active Society Announcements
                </h3>
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-5 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold text-neo-pink">
                        {new Date(ann.publishedAt).toLocaleDateString()}
                      </span>
                      <h4 className="font-heading font-black text-base text-neo-text dark:text-neo-dark-text">
                        {ann.title}
                      </h4>
                      <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75 leading-relaxed font-body">{ann.body}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="p-2 rounded-neo-sm border-2 border-neo-border text-neo-text/60 hover:text-red-600 hover:border-red-500 transition-colors shadow-neo-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Create Event Modal with BorderBeam ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl bg-white dark:bg-neo-dark-card p-8 rounded-neo-lg border-[3px] border-neo-border dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-dark-lg max-h-[90vh] overflow-y-auto relative"
          >
            <BorderBeam size={260} duration={10} colorFrom="#FFE600" colorTo="#7DD3FC" />

            <h3 className="font-heading font-black text-2xl text-neo-text dark:text-neo-dark-text mb-1 relative z-10">
              Create New Society Event
            </h3>
            <p className="text-xs text-neo-text/70 dark:text-neo-dark-text/70 mb-6 relative z-10 font-body">
              This event will appear on the public events listing and accept registrations.
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-4 relative z-10">
              <Input
                label="Event Title"
                placeholder="e.g. Next-Gen Cloud Architecture"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-neo-text dark:text-neo-dark-text">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as EventCategory)}
                    className="rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text px-3.5 py-2.5 text-xs font-body shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow"
                  >
                    <option value="ai-emerging-tech">AI & Emerging Tech</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="design-creative">Design & Creative</option>
                    <option value="gaming-competitions">Gaming & Competitions</option>
                    <option value="web3-digital-economy">Web3 & Digital Economy</option>
                    <option value="workshops">Workshops</option>
                    <option value="seminars">Seminars</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-neo-text dark:text-neo-dark-text">Mode</label>
                  <select
                    value={newMode}
                    onChange={(e) => setNewMode(e.target.value as EventMode)}
                    className="rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text px-3.5 py-2.5 text-xs font-body shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow"
                  >
                    <option value="offline">In-person (Offline)</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date & Time"
                  type="datetime-local"
                  value={newStart}
                  onChange={(e) => setNewStart(e.target.value)}
                  required
                />
                <Input
                  label="End Date & Time"
                  type="datetime-local"
                  value={newEnd}
                  onChange={(e) => setNewEnd(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Venue / Platform"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  required
                />
                <Input
                  label="Capacity"
                  type="number"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold uppercase text-neo-text dark:text-neo-dark-text">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Comprehensive event details…"
                  className="w-full rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-neo-text dark:text-neo-dark-text p-3 text-xs font-body shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-neo-yellow resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-neo-border/20">
                <Button variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">Publish Event</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
