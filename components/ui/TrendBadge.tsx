'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Trend } from '@/lib/domains/types';

interface TrendBadgeProps {
  trend: Trend;
  size?: 'sm' | 'md';
}

const TREND_CONFIG: Record<Trend, { label: string; color: string; icon: typeof Minus | null }> = {
  up2:    { label: '↑↑', color: '#22C55E', icon: TrendingUp   },
  up1:    { label: '↑',  color: '#84CC16', icon: TrendingUp   },
  flat:   { label: '→',  color: '#8BA4BE', icon: Minus        },
  down1:  { label: '↓',  color: '#F97316', icon: TrendingDown },
  down2:  { label: '↓↓', color: '#EF4444', icon: TrendingDown },
  nodata: { label: '–',  color: '#64748B', icon: null         },
};

export function TrendBadge({ trend, size = 'sm' }: TrendBadgeProps) {
  const config = TREND_CONFIG[trend];
  if (!config.icon) return null;

  const Icon = config.icon;
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span
      className={cn('inline-flex items-center gap-0.5 font-mono', size === 'sm' ? 'text-xs' : 'text-sm')}
      style={{ color: config.color }}
      title="Tendance sur 1 an"
    >
      <Icon size={iconSize} strokeWidth={2.5} aria-hidden="true" />
    </span>
  );
}
