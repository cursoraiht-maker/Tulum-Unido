import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900/90 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md border border-slate-700/50 animate-in fade-in slide-in-from-bottom-2 duration-150">
      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
};
