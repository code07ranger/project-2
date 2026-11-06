// ─── INFINITY Platform — Core TypeScript Types ─────────────────────────────

/** Possible user roles within the INFINITY platform. */
export type UserRole = 'student' | 'admin';

/** Registered user on the platform. */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

/** Canonical event category slugs that map to INFINITY's five pillars plus
 *  generic workshop / seminar types. */
export type EventCategory =
  | 'ai-emerging-tech'
  | 'cybersecurity'
  | 'design-creative'
  | 'gaming-competitions'
  | 'web3-digital-economy'
  | 'workshops'
  | 'seminars';

/** Delivery format of an event. */
export type EventMode = 'online' | 'offline' | 'hybrid';

/** Publishing lifecycle state. */
export type EventStatus = 'draft' | 'published' | 'archived';

/** A single event hosted by INFINITY. */
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  tagline?: string;
  tags?: string[];
  featured?: boolean;
  category: EventCategory;
  startAt: string;
  endAt: string;
  venue: string;
  mode: EventMode;
  coverImage: string;
  status: EventStatus;
  capacity?: number;
  registrationCount: number;
  createdAt: string;
}

/** Registration status for a user–event pair. */
export type RegistrationStatus = 'confirmed' | 'cancelled';

/** Attendance tracking status. */
export type AttendanceStatus = 'pending' | 'present' | 'absent';

/** A user's registration for a specific event. */
export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  status: RegistrationStatus;
  attendanceStatus: AttendanceStatus;
  createdAt: string;
}

/** Admin-published announcement visible to all members. */
export interface Announcement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  createdBy: string;
}

/** Authentication state managed by AuthContext. */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

/** Metadata for one of INFINITY's tech domains / pillars. */
export interface DomainInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  eventCount: number;
}
