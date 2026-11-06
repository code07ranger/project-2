import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showToast: (title: string, message?: string, type?: ToastType) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: ToastType = 'info') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      setToasts((prev) => [...prev, { id, type, title, message }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = useCallback(
    (title: string, message?: string) => showToast(title, message, 'success'),
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string) => showToast(title, message, 'error'),
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string) => showToast(title, message, 'info'),
    [showToast]
  );

  const value = useMemo(
    () => ({ showToast, success, error, info }),
    [showToast, success, error, info]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Floating Toast Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === 'success';
            const isError = toast.type === 'error';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-neo-md border-[2.5px] border-neo-border dark:border-neo-dark-border shadow-neo dark:shadow-neo-dark bg-white dark:bg-neo-dark-card text-neo-text dark:text-neo-dark-text ${
                  isSuccess
                    ? 'border-l-[6px] border-l-green-500'
                    : isError
                    ? 'border-l-[6px] border-l-red-500'
                    : 'border-l-[6px] border-l-neo-yellow'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : isError ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Info className="w-5 h-5 text-neo-border dark:text-neo-yellow" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-black text-sm text-neo-text dark:text-neo-dark-text">
                    {toast.title}
                  </h4>
                  {toast.message && (
                    <p className="text-xs text-neo-text/75 dark:text-neo-dark-text/75 mt-0.5 leading-relaxed font-body">
                      {toast.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-neo-text/60 dark:text-neo-dark-text/60 hover:text-neo-text dark:hover:text-neo-dark-text p-1 rounded-sm transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

