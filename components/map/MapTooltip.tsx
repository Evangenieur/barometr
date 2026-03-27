'use client';

import { createPortal } from 'react-dom';
import { WeatherBadge } from '@/components/ui/WeatherBadge';
import { getFlagUrl } from '@/lib/utils/flags';
import { ui } from '@/lib/utils/i18n';
import type { Locale } from '@/lib/domains/types';

interface MapTooltipProps {
  x: number;
  y: number;
  countryName: string;
  countryCode: string;
  score: number;
  rank: number;
  totalCountries: number;
  rawValue?: number;
  rawValueLabel?: string;
  locale?: Locale;
}

export function MapTooltip({
  x,
  y,
  countryName,
  countryCode,
  score,
  rank,
  totalCountries,
  rawValue,
  rawValueLabel,
  locale = 'fr',
}: MapTooltipProps) {
  const OFFSET = 14;

  const content = (
    <div
      className="fixed z-[999] pointer-events-none select-none"
      style={{ left: x + OFFSET, top: y + OFFSET }}
    >
      <div className="bg-overlay border border-border-default rounded-lg shadow-lg px-3 py-2 min-w-[140px] max-w-[200px]">
        <div className="flex items-center gap-1.5 mb-1">
          {countryCode && !countryCode.startsWith('X') && (
            <img src={getFlagUrl(countryCode)} alt={countryCode} className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm border border-white/10 shrink-0" />
          )}
          <span className="text-sm font-semibold text-text-primary truncate">{countryName}</span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          {score === -1 ? (
            <span className="text-xs text-text-muted">{ui('noData', locale)}</span>
          ) : (
            <>
              <span className="font-mono text-md font-bold text-text-primary tabular-nums">{score}</span>
              <span className="text-text-muted text-xs">/100</span>
              <WeatherBadge score={score} size="sm" showScore={false} />
            </>
          )}
        </div>

        {rank > 0 && score !== -1 && (
          <div className="text-2xs text-text-muted font-mono tabular-nums">
            {rank}{locale === 'fr' ? 'e' : locale === 'es' ? 'o' : rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'} / {totalCountries} {ui('countries', locale)}
          </div>
        )}

        {rawValue !== undefined && rawValueLabel && (
          <div className="text-2xs text-text-secondary font-mono tabular-nums mt-1 border-t border-border-subtle pt-1">
            {rawValue.toFixed(1)} {rawValueLabel}
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(content, document.body);
}
