import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Shield, ArrowRight, Sparkles, CheckCircle2, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import InfinitySymbol from '../components/ui/InfinitySymbol';
import BorderBeam from '../components/motion/BorderBeam';
import ParticleBackground from '../components/motion/ParticleBackground';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, user } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectPath = (location.state as any)?.from?.pathname || (user?.role === 'admin' ? '/admin' : '/student');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate('/student');
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string, demoPass: string, role: 'student' | 'admin') => {
    setError(null);
    setLoading(true);
    try {
      await login(demoEmail, demoPass);
      navigate(role === 'admin' ? '/admin' : '/student');
    } catch (err: any) {
      setError(err?.message || 'Quick login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 max-w-container mx-auto relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md flex flex-col gap-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="p-2.5 bg-neo-yellow border-2 border-neo-border rounded-neo-sm shadow-neo-sm text-neo-border">
            <InfinitySymbol size="md" />
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-neo-text dark:text-neo-dark-text">
            {mode === 'login' ? 'Sign In to INFINITY' : 'Create Member Account'}
          </h1>
          <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75 max-w-xs font-body">
            Access your registrations, attendance certificates, and society notices.
          </p>
        </div>

        {/* ── One-Click Quick Demo Access ── */}
        <div className="p-4 bg-white dark:bg-neo-dark-card border-[2.5px] border-neo-border dark:border-neo-dark-border rounded-neo-md shadow-neo dark:shadow-neo-dark space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-black uppercase tracking-wider flex items-center gap-1.5 text-neo-border dark:text-neo-yellow">
              <Sparkles className="w-3.5 h-3.5 text-neo-pink" />
              1-Click Demo Evaluation
            </span>
            <Badge variant="yellow" size="sm">Prototype</Badge>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() =>
                handleQuickLogin('student@demo.sggscc.ac.in', 'student123', 'student')
              }
              className="px-3 py-2.5 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-left transition-all hover:bg-neo-yellow hover:text-neo-border group select-none shadow-neo-sm"
            >
              <div className="flex items-center gap-1.5 text-neo-text dark:text-neo-dark-text text-xs font-bold group-hover:text-neo-border">
                <User className="w-3.5 h-3.5" />
                <span>Demo Student</span>
              </div>
              <p className="text-[10px] text-neo-text/60 dark:text-neo-dark-text/60 font-mono mt-0.5 truncate group-hover:text-neo-border">
                student@demo…
              </p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() =>
                handleQuickLogin('admin@infinity.sggscc.ac.in', 'admin123', 'admin')
              }
              className="px-3 py-2.5 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border text-left transition-all hover:bg-neo-blue hover:text-neo-border group select-none shadow-neo-sm"
            >
              <div className="flex items-center gap-1.5 text-neo-text dark:text-neo-dark-text text-xs font-bold group-hover:text-neo-border">
                <Shield className="w-3.5 h-3.5" />
                <span>Demo Admin</span>
              </div>
              <p className="text-[10px] text-neo-text/60 dark:text-neo-dark-text/60 font-mono mt-0.5 truncate group-hover:text-neo-border">
                admin@infinity…
              </p>
            </motion.button>
          </div>
        </div>

        {/* ── Main Form Card with BorderBeam ── */}
        <div className="p-8 bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg shadow-neo-lg dark:shadow-neo-dark-lg relative overflow-hidden">
          <BorderBeam size={220} duration={12} colorFrom="#FFE600" colorTo="#7DD3FC" />

          {error && (
            <div className="mb-5 p-3 rounded-neo-sm bg-red-100 dark:bg-red-950/40 border-2 border-red-500 text-xs font-bold text-red-700 dark:text-red-300 relative z-10 shadow-neo-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {mode === 'signup' && (
              <Input
                label="Full Name"
                placeholder="e.g. Navjot Kaur"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. you@sggscc.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="pt-2">
              <Button type="submit" fullWidth size="lg" variant="primary" loading={loading}>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t-2 border-neo-border/20 text-center text-xs text-neo-text/75 dark:text-neo-dark-text/75 relative z-10 font-body">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold underline text-neo-border dark:text-neo-yellow"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold underline text-neo-border dark:text-neo-yellow"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
