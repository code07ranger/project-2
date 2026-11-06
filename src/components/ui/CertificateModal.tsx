import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import InfinitySymbol from './InfinitySymbol';
import BorderBeam from '../motion/BorderBeam';
import type { Event, Registration } from '../../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  registration: Registration;
  userName: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  event,
  registration,
  userName,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const eventDate = new Date(event.startAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
        className="relative w-full max-w-3xl my-8 bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-lg p-6 sm:p-10 shadow-neo-lg dark:shadow-neo-dark-lg"
      >
        <BorderBeam size={320} duration={12} colorFrom="#FFE600" colorTo="#7DD3FC" />

        {/* Modal Header Controls */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-neo-border/20 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-neo-yellow" />
            <h3 className="font-heading font-black text-lg text-neo-text dark:text-neo-dark-text">
              Official Verified Participation Credential
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-neo-sm border-2 border-neo-border text-neo-text hover:bg-neo-yellow transition-colors shadow-neo-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Printable Certificate Canvas (Ivory / Warm Cream with Neo-Brutalist Frame) ── */}
        <div
          ref={certificateRef}
          id="printable-certificate"
          className="relative rounded-neo-md border-[3px] border-neo-border bg-[#FBF9F4] p-8 sm:p-12 text-center overflow-hidden shadow-neo"
        >
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <InfinitySymbol size="hero" />
          </div>

          {/* Certificate Inner Frame Border */}
          <div className="border-2 border-dashed border-neo-border p-6 sm:p-8 rounded-neo-sm relative z-10 space-y-6">
            {/* Institution Header */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neo-border font-black">
                Sri Guru Gobind Singh College of Commerce
              </p>
              <p className="text-[11px] font-mono text-neo-border/70 mt-0.5">
                University of Delhi • Academic Technology Society
              </p>
              <div className="flex items-center justify-center gap-2.5 mt-3">
                <div className="p-1.5 rounded-neo-sm bg-neo-yellow border-2 border-neo-border shadow-neo-sm text-neo-border">
                  <InfinitySymbol size="sm" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-heading font-black text-xl text-neo-border tracking-tight leading-none">
                    INFINITY
                  </span>
                  <span className="font-handwriting text-xs font-bold text-neo-border/85 -rotate-1 mt-0.5">
                    The Tech Society
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <span className="font-handwriting text-xl font-bold text-neo-pink inline-block mb-1">
                ★ CERTIFICATE OF VERIFIED PARTICIPATION ★
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-neo-border">
                Proudly Presented To
              </h2>
            </div>

            {/* Recipient Name */}
            <div className="py-2 border-b-2 border-neo-border inline-block px-8 max-w-full">
              <span className="font-heading text-2xl sm:text-4xl font-black text-neo-border">
                {userName}
              </span>
            </div>

            {/* Citation */}
            <p className="text-neo-border/80 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-body">
              For active participation and successful completion of the academic technology initiative{' '}
              <strong className="text-neo-border">"{event.title}"</strong>, organized by{' '}
              <span className="text-neo-border font-bold">Infinity — The Tech Society</span> on{' '}
              <span className="font-bold font-mono">{eventDate}</span>.
            </p>

            {/* Signatures & Verification Badge */}
            <div className="pt-6 border-t-2 border-neo-border/20 grid grid-cols-2 sm:grid-cols-3 gap-4 items-end text-xs">
              <div className="text-center sm:text-left space-y-1">
                <p className="font-mono text-[10px] text-neo-border/70 uppercase font-bold">Pass Verification ID</p>
                <p className="font-mono text-neo-border font-black">{registration.id}</p>
              </div>

              <div className="hidden sm:flex flex-col items-center justify-center space-y-1">
                <div className="p-2 rounded-full bg-neo-yellow border-2 border-neo-border shadow-neo-sm text-neo-border">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] text-neo-border uppercase font-black">
                  Digitally Authenticated
                </span>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <p className="font-mono text-[10px] text-neo-border/70 uppercase font-bold">Authorized By</p>
                <p className="font-heading text-neo-border font-bold">Infinity Executive Directorate</p>
                <p className="text-[10px] text-neo-border/70 font-mono">SGGSCC, University of Delhi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t-2 border-neo-border/20 relative z-10">
          <span className="text-xs font-mono font-bold text-neo-text dark:text-neo-dark-text flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span>Attendance Status: Present (Verified)</span>
          </span>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" size="sm" icon={<Printer className="w-4 h-4" />} onClick={handlePrint}>
              Print / Save PDF
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateModal;
