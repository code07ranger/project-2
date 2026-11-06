import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { AuthState, User } from '../types';

// ─── Demo credential store ──────────────────────────────────────────────────

interface DemoCredential {
  password: string;
  user: User;
}

const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    password: 'admin123',
    user: {
      id: 'admin-001',
      name: 'INFINITY Admin',
      email: 'admin@infinity.sggscc.ac.in',
      role: 'admin',
      createdAt: '2026-01-01T00:00:00+05:30',
    },
  },
  {
    password: 'student123',
    user: {
      id: 'student-001',
      name: 'Demo Student',
      email: 'student@demo.sggscc.ac.in',
      role: 'student',
      createdAt: '2026-08-01T00:00:00+05:30',
    },
  },
];

/** In-memory store that grows when users sign up during the prototype session. */
let runtimeCredentials: DemoCredential[] = [...DEMO_CREDENTIALS];

// ─── Context shape ──────────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Helpers ────────────────────────────────────────────────────────────────

const TOKEN_KEY = 'infinity_auth_token';

/** Create a simple, deterministic demo JWT-like token (NOT real crypto). */
function createDemoToken(user: User): string {
  const payload = btoa(JSON.stringify({ sub: user.id, email: user.email }));
  return `demo.${payload}.sig`;
}

/** Decode user id from the demo token. */
function decodeTokenUserId(token: string): string | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const parsed = JSON.parse(atob(payload)) as { sub?: string };
    return parsed.sub ?? null;
  } catch {
    return null;
  }
}

/** Find user by id across runtime credentials. */
function findUserById(id: string): User | undefined {
  return runtimeCredentials.find((c) => c.user.id === id)?.user;
}

// ─── Provider ───────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Rehydrate session from localStorage on mount.
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      const userId = decodeTokenUserId(stored);
      const existingUser = userId ? findUserById(userId) : undefined;
      if (existingUser) {
        setUser(existingUser);
        setToken(stored);
      } else {
        // Token is stale / invalid — clean up.
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate async network delay.
    await new Promise((r) => setTimeout(r, 400));

    const match = runtimeCredentials.find(
      (c) => c.user.email === email && c.password === password,
    );

    if (!match) {
      throw new Error('Invalid email or password.');
    }

    const newToken = createDemoToken(match.user);
    localStorage.setItem(TOKEN_KEY, newToken);
    setUser(match.user);
    setToken(newToken);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      await new Promise((r) => setTimeout(r, 400));

      if (runtimeCredentials.some((c) => c.user.email === email)) {
        throw new Error('An account with this email already exists.');
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'student',
        createdAt: new Date().toISOString(),
      };

      runtimeCredentials = [
        ...runtimeCredentials,
        { password, user: newUser },
      ];

      const newToken = createDemoToken(newUser);
      localStorage.setItem(TOKEN_KEY, newToken);
      setUser(newUser);
      setToken(newToken);
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: !!user,
      loading,
      login,
      signup,
      logout,
    }),
    [user, token, loading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return ctx;
}
