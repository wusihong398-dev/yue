import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
        };

        const bgBorders = {
          success: 'bg-white/95 border-emerald-200 text-zinc-800 shadow-emerald-500/10',
          warning: 'bg-white/95 border-amber-200 text-zinc-800 shadow-amber-500/10',
          error: 'bg-white/95 border-rose-200 text-zinc-800 shadow-rose-500/10',
          info: 'bg-white/95 border-sky-200 text-zinc-800 shadow-sky-500/10',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-3 ${bgBorders[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-zinc-900 leading-snug">{toast.title}</div>
              {toast.desc && (
                <div className="text-xs text-zinc-600 mt-0.5 leading-relaxed break-words">
                  {toast.desc}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
