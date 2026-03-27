'use client';

import { getWeatherBand, WEATHER_CONFIG } from '@/lib/scoring';
import type { Locale } from '@/lib/domains/types';
import { cn } from '@/lib/utils/cn';

interface WeatherBadgeProps {
  score: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showScore?: boolean;
  showLabel?: boolean;
  locale?: Locale;
  className?: string;
}

const sizeConfig = {
  xs: { emoji: 'text-sm',  score: 'text-xs',  label: 'text-2xs', gap: 'gap-1'  },
  sm: { emoji: 'text-base',score: 'text-sm',  label: 'text-xs',  gap: 'gap-1'  },
  md: { emoji: 'text-xl',  score: 'text-md',  label: 'text-sm',  gap: 'gap-2'  },
  lg: { emoji: 'text-2xl', score: 'text-xl',  label: 'text-md',  gap: 'gap-2'  },
};

export function WeatherBadge({
  score,
  size = 'sm',
  showScore = true,
  showLabel = false,
  locale = 'fr',
  className,
}: WeatherBadgeProps) {
  const band = getWeatherBand(score);
  const config = WEATHER_CONFIG[band];
  const sizes = sizeConfig[size];

  return (
    <span
      className={cn('inline-flex items-center font-mono', sizes.gap, className)}
      style={{ color: config.color }}
    >
      <span
        className={sizes.emoji}
        role="img"
        aria-label={locale === 'fr' ? config.labelFr : config.labelEn}
        style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.4))' }}
      >
        {config.emoji}
      </span>
      {showScore && score !== -1 && (
        <span className={cn(sizes.score, 'tabular-nums')}>{score}</span>
      )}
      {showLabel && (
        <span className={sizes.label} style={{ color: config.color }}>
          {locale === 'fr' ? config.labelFr : config.labelEn}
        </span>
      )}
    </span>
  );
}
