'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  duration?: number;
  onDismiss: () => void;
}

const typeConfig = {
  success: { bg: 'bg-surface border-score-excellent/40', icon: '✓', color: '#22C55E' },
  info:    { bg: 'bg-surface border-border-accent/40',   icon: 'ℹ', color: '#3D8EF0' },
  error:   { bg: 'bg-surface border-score-critical/40',  icon: '✕', color: '#EF4444' },
};

export function Toast({ message, type = 'success', duration = 2000, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const config = typeConfig[type];

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]',
        'flex items-center gap-3 px-4 py-3 rounded-lg border',
        'shadow-lg animate-toast-in',
        config.bg
      )}
      role="alert"
      aria-live="polite"
    >
      <span className="text-sm font-medium" style={{ color: config.color }}>
        {config.icon}
      </span>
      <span className="text-sm text-text-primary whitespace-nowrap">{message}</span>
      <button
        onClick={onDismiss}
        className="text-text-muted hover:text-text-secondary transition-colors ml-1"
        aria-label="Fermer"
      >
        <X size={14} />
      </button>
    </div>
  );
}
