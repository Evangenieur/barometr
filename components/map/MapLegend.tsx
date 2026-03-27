'use client';

import { ui } from '@/lib/utils/i18n';
import type { Locale } from '@/lib/domains/types';

interface MapLegendProps {
  mode: 'score' | 'raw';
  rawValueLabel?: string;
  rawMin?: number;
  rawMax?: number;
  className?: string;
  locale?: Locale;
}

const SCORE_STOPS = [
  { score: 0,   color: '#7F1D1D' },
  { score: 20,  color: '#9A3412' },
  { score: 40,  color: '#854D0E' },
  { score: 60,  color: '#365314' },
  { score: 80,  color: '#14532D' },
  { score: 100, color: '#16A34A' },
];

function fmtVal(v: number): string {
  return v % 1 !== 0 ? v.toFixed(1) : String(Math.round(v));
}

export function MapLegend({ mode, rawValueLabel, rawMin, rawMax, className, locale = 'fr' }: MapLegendProps) {
  const isRaw = mode === 'raw' && rawMin !== undefined && rawMax !== undefined;
  const minLabel = isRaw ? fmtVal(rawMin) : '0';
  const maxLabel = isRaw ? fmtVal(rawMax) : '100';
  const midLabel = isRaw ? fmtVal((rawMin + rawMax) / 2) : '50';

  return (
    <div
      className={`bg-overlay/90 backdrop-blur-sm border border-border-subtle rounded-lg px-3 py-2 shadow-md ${className ?? ''}`}
      aria-label="Légende de la carte"
    >
      <div className="text-2xs text-text-muted mb-1.5 font-medium uppercase tracking-wider">
        {mode === 'raw' && rawValueLabel ? rawValueLabel : ui('score100', locale)}
      </div>

      {/* Gradient bar */}
      <div
        className="h-2 rounded-full mb-1.5 w-32"
        style={{
          background: `linear-gradient(to right, ${SCORE_STOPS.map((s) => s.color).join(', ')})`,
        }}
        aria-hidden="true"
      />

      {/* Labels */}
      <div className="flex justify-between w-32">
        <span className="font-mono text-2xs text-text-muted tabular-nums">{minLabel}</span>
        <span className="font-mono text-2xs text-text-muted tabular-nums">{midLabel}</span>
        <span className="font-mono text-2xs text-text-muted tabular-nums">{maxLabel}</span>
      </div>

      {/* No data indicator */}
      <div className="flex items-center gap-1.5 mt-1.5">
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#0A0F16', border: '1px solid #253447' }} />
        <span className="text-2xs text-text-muted">{ui('noData', locale)}</span>
      </div>
    </div>
  );
}
