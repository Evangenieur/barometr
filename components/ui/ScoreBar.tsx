'use client';

import { useEffect, useRef, useState } from 'react';
import { getWeatherBand, WEATHER_CONFIG } from '@/lib/scoring';
import { cn } from '@/lib/utils/cn';

interface ScoreBarProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showValue?: boolean;
  className?: string;
}

const heightMap = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' };

export function ScoreBar({ score, size = 'md', animated = false, showValue = false, className }: ScoreBarProps) {
  const [width, setWidth] = useState(animated ? 0 : Math.max(0, score));

  useEffect(() => {
    if (!animated) {
      setWidth(Math.max(0, score));
      return;
    }
    // Reset to 0 then animate to target
    setWidth(0);
    const timer = setTimeout(() => setWidth(Math.max(0, score)), 50);
    return () => clearTimeout(timer);
  }, [animated, score]);

  const band = getWeatherBand(score);
  const color = WEATHER_CONFIG[band].color;
  const pct = Math.max(0, Math.min(100, width));

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-1 rounded-full overflow-hidden', heightMap[size], 'bg-border-default')}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
            transition: animated ? 'width 300ms ease-out' : undefined,
          }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-mono tabular-nums text-text-secondary w-7 text-right">
          {score === -1 ? '—' : score}
        </span>
      )}
    </div>
  );
}
