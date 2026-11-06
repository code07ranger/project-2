import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import type {
  Event,
  Registration,
  Announcement,
  AttendanceStatus,
} from '../types';
import { demoEvents } from '../data/events';
import { demoAnnouncements } from '../data/announcements';
import { useAuth } from './AuthContext';

const EVENTS_STORAGE_KEY = 'infinity_events_v1';
const REGISTRATIONS_STORAGE_KEY = 'infinity_registrations_v1';
const ANNOUNCEMENTS_STORAGE_KEY = 'infinity_announcements_v1';

// Seed initial registrations for demo student
const INITIAL_DEMO_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-001',
    userId: 'student-001',
    eventId: 'evt-001', // Neural Frontiers AI & ML Workshop
    status: 'confirmed',
    attendanceStatus: 'pending',
    createdAt: '2026-10-05T14:20:00+05:30',
  },
  {
    id: 'reg-002',
    userId: 'student-001',
    eventId: 'evt-002', // CyberShield 2026
    status: 'confirmed',
    attendanceStatus: 'present',
    createdAt: '2026-09-22T11:00:00+05:30',
  },
  {
    id: 'reg-003',
    userId: 'student-001',
    eventId: 'evt-005', // DeFi Decoded
    status: 'confirmed',
    attendanceStatus: 'present',
    createdAt: '2026-09-05T09:30:00+05:30',
  },
];

interface EventContextValue {
  events: Event[];
  registrations: Registration[];
  announcements: Announcement[];
  loading: boolean;
  registerForEvent: (eventId: string, customData?: { name?: string; email?: string; notes?: string }) => {
    success: boolean;
    error?: string;
    registration?: Registration;
  };
  cancelRegistration: (registrationId: string) => void;
  createEvent: (eventData: Omit<Event, 'id' | 'createdAt' | 'registrationCount'>) => Event;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  updateAttendance: (registrationId: string, status: AttendanceStatus) => void;
  createAnnouncement: (title: string, body: string) => Announcement;
  deleteAnnouncement: (id: string) => void;
  isUserRegistered: (eventId: string, userId?: string) => boolean;
  getRegistrationForEvent: (eventId: string, userId?: string) => Registration | undefined;
  getUserRegistrations: (userId?: string) => Array<{ registration: Registration; event: Event }>;
  resetDemoData: () => void;
}

const EventContext = createContext<EventContextValue | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // ── State initialization from localStorage or defaults ──
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      const saved = localStorage.getItem(EVENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return demoEvents;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    try {
      const saved = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DEMO_REGISTRATIONS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return demoAnnouncements;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(registrations));
    } catch {
      // ignore
    }
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
    } catch {
      // ignore
    }
  }, [announcements]);

  useEffect(() => {
    setLoading(false);
  }, []);

  // ── Duplicate Check & Registration ──
  const isUserRegistered = useCallback(
    (eventId: string, customUserId?: string): boolean => {
      const uid = customUserId || user?.id;
      if (!uid) return false;
      return registrations.some(
        (r) => r.eventId === eventId && r.userId === uid && r.status === 'confirmed'
      );
    },
    [registrations, user?.id]
  );

  const getRegistrationForEvent = useCallback(
    (eventId: string, customUserId?: string): Registration | undefined => {
      const uid = customUserId || user?.id;
      if (!uid) return undefined;
      return registrations.find(
        (r) => r.eventId === eventId && r.userId === uid && r.status === 'confirmed'
      );
    },
    [registrations, user?.id]
  );

  const registerForEvent = useCallback(
    (eventId: string, _customData?: { name?: string; email?: string; notes?: string }) => {
      const currentUserId = user?.id || 'student-001';

      // Check if event exists
      const targetEvent = events.find((e) => e.id === eventId);
      if (!targetEvent) {
        return { success: false, error: 'Event not found.' };
      }

      // Check duplicate registration
      const existing = registrations.find(
        (r) => r.eventId === eventId && r.userId === currentUserId && r.status === 'confirmed'
      );
      if (existing) {
        return { success: false, error: 'You are already registered for this event.' };
      }

      // Check capacity
      if (targetEvent.capacity && targetEvent.registrationCount >= targetEvent.capacity) {
        return { success: false, error: 'Event capacity reached. Registrations are closed.' };
      }

      const newRegistration: Registration = {
        id: `reg-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
        userId: currentUserId,
        eventId,
        status: 'confirmed',
        attendanceStatus: 'pending',
        createdAt: new Date().toISOString(),
      };

      setRegistrations((prev) => [newRegistration, ...prev]);

      // Increment count on event
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId ? { ...e, registrationCount: e.registrationCount + 1 } : e
        )
      );

      return { success: true, registration: newRegistration };
    },
    [events, registrations, user?.id]
  );

  const cancelRegistration = useCallback((registrationId: string) => {
    setRegistrations((prev) => {
      const reg = prev.find((r) => r.id === registrationId);
      if (reg && reg.status === 'confirmed') {
        // decrement count on event
        setEvents((evs) =>
          evs.map((e) =>
            e.id === reg.eventId
              ? { ...e, registrationCount: Math.max(0, e.registrationCount - 1) }
              : e
          )
        );
      }
      return prev.filter((r) => r.id !== registrationId);
    });
  }, []);

  const createEvent = useCallback(
    (eventData: Omit<Event, 'id' | 'createdAt' | 'registrationCount'>): Event => {
      const newEvent: Event = {
        ...eventData,
        id: `evt-${Date.now().toString(36)}`,
        registrationCount: 0,
        createdAt: new Date().toISOString(),
      };
      setEvents((prev) => [newEvent, ...prev]);
      return newEvent;
    },
    []
  );

  const updateEvent = useCallback((id: string, updates: Partial<Event>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setRegistrations((prev) => prev.filter((r) => r.eventId !== id));
  }, []);

  const updateAttendance = useCallback((registrationId: string, status: AttendanceStatus) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === registrationId ? { ...r, attendanceStatus: status } : r))
    );
  }, []);

  const createAnnouncement = useCallback(
    (title: string, body: string): Announcement => {
      const newAnn: Announcement = {
        id: `ann-${Date.now().toString(36)}`,
        title,
        body,
        publishedAt: new Date().toISOString(),
        createdBy: user?.name || 'INFINITY Admin',
      };
      setAnnouncements((prev) => [newAnn, ...prev]);
      return newAnn;
    },
    [user?.name]
  );

  const deleteAnnouncement = useCallback((id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const getUserRegistrations = useCallback(
    (customUserId?: string) => {
      const uid = customUserId || user?.id;
      if (!uid) return [];
      return registrations
        .filter((r) => r.userId === uid && r.status === 'confirmed')
        .map((registration) => {
          const event = events.find((e) => e.id === registration.eventId) || {
            id: registration.eventId,
            title: 'Archived Event',
            slug: 'archived',
            description: 'This event details have been archived.',
            category: 'workshops' as const,
            startAt: registration.createdAt,
            endAt: registration.createdAt,
            venue: 'SGGSCC Campus',
            mode: 'offline' as const,
            coverImage: '',
            status: 'archived' as const,
            registrationCount: 0,
            createdAt: registration.createdAt,
          };
          return { registration, event };
        });
    },
    [events, registrations, user?.id]
  );

  const resetDemoData = useCallback(() => {
    setEvents(demoEvents);
    setRegistrations(INITIAL_DEMO_REGISTRATIONS);
    setAnnouncements(demoAnnouncements);
    localStorage.removeItem(EVENTS_STORAGE_KEY);
    localStorage.removeItem(REGISTRATIONS_STORAGE_KEY);
    localStorage.removeItem(ANNOUNCEMENTS_STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      events,
      registrations,
      announcements,
      loading,
      registerForEvent,
      cancelRegistration,
      createEvent,
      updateEvent,
      deleteEvent,
      updateAttendance,
      createAnnouncement,
      deleteAnnouncement,
      isUserRegistered,
      getRegistrationForEvent,
      getUserRegistrations,
      resetDemoData,
    }),
    [
      events,
      registrations,
      announcements,
      loading,
      registerForEvent,
      cancelRegistration,
      createEvent,
      updateEvent,
      deleteEvent,
      updateAttendance,
      createAnnouncement,
      deleteAnnouncement,
      isUserRegistered,
      getRegistrationForEvent,
      getUserRegistrations,
      resetDemoData,
    ]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvents = () => {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return ctx;
};

