'use client';

import { useState } from 'react';
import type { ScoreDistribution } from '@/lib/domains/types';
import { cn } from '@/lib/utils/cn';

interface DistributionBarProps {
  distribution: ScoreDistribution;
  total: number;
  activeSegment?: 'excellent' | 'good' | 'fair' | 'poor' | 'critical' | null;
  onSegmentHover?: (segment: string | null) => void;
  locale?: 'fr' | 'en' | 'es';
}

const SEGMENTS = [
  { key: 'excellent' as const, color: '#22C55E', label: { fr: 'Excellent', en: 'Excellent', es: 'Excelente'  } },
  { key: 'good'      as const, color: '#84CC16', label: { fr: 'Bon',       en: 'Good',      es: 'Bueno'      } },
  { key: 'fair'      as const, color: '#EAB308', label: { fr: 'Passable',  en: 'Fair',      es: 'Regular'    } },
  { key: 'poor'      as const, color: '#F97316', label: { fr: 'Faible',    en: 'Poor',      es: 'Bajo'       } },
  { key: 'critical'  as const, color: '#EF4444', label: { fr: 'Critique',  en: 'Critical',  es: 'Crítico'    } },
];

export function DistributionBar({
  distribution,
  total,
  activeSegment,
  onSegmentHover,
  locale = 'fr',
}: DistributionBarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const pct = (n: number) => (total > 0 ? Math.round((n / total) * 100) : 0);
  const active = activeSegment ?? hovered;

  return (
    <div className="space-y-2">
      {/* Bar */}
      <div
        className="flex h-2 rounded-full overflow-hidden gap-px"
        role="img"
        aria-label="Distribution des scores"
      >
        {SEGMENTS.map(({ key, color }) => {
          const count = distribution[key];
          const width = pct(count);
          if (width === 0) return null;
          return (
            <div
              key={key}
              style={{
                width: `${width}%`,
                backgroundColor: color,
                opacity: active && active !== key ? 0.35 : 1,
                transition: 'opacity 150ms ease-out',
                cursor: 'pointer',
              }}
              onMouseEnter={() => { setHovered(key); onSegmentHover?.(key); }}
              onMouseLeave={() => { setHovered(null); onSegmentHover?.(null); }}
            />
          );
        })}
      </div>

      {/* Legend rows */}
      <div className="space-y-1">
        {SEGMENTS.map(({ key, color, label }) => {
          const count = distribution[key];
          const width = pct(count);
          if (count === 0) return null;
          const isActive = active === key;

          return (
            <div
              key={key}
              className={cn(
                'flex items-center gap-2 text-xs transition-opacity duration-100',
                active && !isActive ? 'opacity-40' : 'opacity-100'
              )}
              onMouseEnter={() => { setHovered(key); onSegmentHover?.(key); }}
              onMouseLeave={() => { setHovered(null); onSegmentHover?.(null); }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="text-text-secondary flex-1 text-2xs">{label[locale]}</span>
              <span className="font-mono tabular-nums text-text-primary text-2xs">{width}%</span>
              <span className="font-mono tabular-nums text-text-muted text-2xs">({count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
