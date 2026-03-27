'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Info } from 'lucide-react';
import { Toast } from '@/components/ui/Toast';
import { useNavigation } from '@/lib/context/NavigationContext';
import { ui } from '@/lib/utils/i18n';

interface AppHeaderProps {
  onShareClick?: () => void;
}

function BarometrLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Dial background */}
      <circle cx="14" cy="14" r="12" stroke="#253447" strokeWidth="1.5" fill="#0A0F16" />
      {/* Arc segments (color-coded like a gauge) */}
      <path d="M4.5 18 A10 10 0 0 1 10 6.3" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M10 6.3 A10 10 0 0 1 18 6.3" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M18 6.3 A10 10 0 0 1 23.5 18" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Needle */}
      <line x1="14" y1="14" x2="19.5" y2="8.5" stroke="#3D8EF0" strokeWidth="2" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="14" cy="14" r="2" fill="#3D8EF0" />
    </svg>
  );
}

const LOCALE_FLAGS: Record<string, string> = { fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸' };
const LOCALE_ORDER = ['fr', 'en', 'es'] as const;

export function AppHeader({ onShareClick }: AppHeaderProps) {
  const { locale, setLocale } = useNavigation();
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
    } catch {
      // fallback: select URL
    }
    onShareClick?.();
  };

  return (
    <>
      <header className="h-12 flex items-center px-4 gap-3 bg-surface/90 backdrop-blur-sm border-b border-border-subtle flex-shrink-0 z-20">
        {/* Logo + title */}
        <div className="flex items-center gap-2 min-w-0">
          <BarometrLogo />
          <span className="font-mono text-md font-semibold text-text-primary tracking-tight hidden sm:block">
            Barometr
          </span>
          <span className="hidden sm:block text-border-strong text-md">·</span>
          <span className="hidden sm:block text-text-muted text-sm truncate max-w-[240px]">
            {ui('observatory', locale)}
          </span>
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <nav className="flex items-center gap-1" aria-label="Actions">
          <Link
            href="/about"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors duration-100"
            aria-label={ui('about', locale)}
          >
            <Info size={15} aria-hidden="true" />
            <span className="hidden sm:inline">{ui('about', locale)}</span>
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors duration-100"
            aria-label={ui('share', locale)}
          >
            <Share2 size={15} aria-hidden="true" />
            <span className="hidden sm:inline">{ui('share', locale)}</span>
          </button>

          {/* Language switcher */}
          <div className="flex items-center gap-0.5 ml-1">
            {LOCALE_ORDER.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={`px-1.5 py-1 rounded text-xs transition-colors ${
                  locale === loc
                    ? 'bg-elevated text-text-primary'
                    : 'text-text-muted hover:text-text-primary hover:bg-elevated/50'
                }`}
                aria-label={loc.toUpperCase()}
              >
                {LOCALE_FLAGS[loc]}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {showToast && (
        <Toast
          message={ui('linkCopied', locale)}
          type="success"
          duration={2000}
          onDismiss={() => setShowToast(false)}
        />
      )}
    </>
  );
}
