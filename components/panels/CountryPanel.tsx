'use client';

import { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { WeatherBadge } from '@/components/ui/WeatherBadge';
import { ScoreBar } from '@/components/ui/ScoreBar';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { getFlagUrl } from '@/lib/utils/flags';
import { getAllDomains } from '@/lib/domains/registry';
import { AGGREGATE_DATA } from '@/lib/aggregate';
import { getScoreColor } from '@/lib/scoring';
import { t, ui } from '@/lib/utils/i18n';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/lib/domains/types';

interface CountryPanelProps {
  countryCode: string;
  countryName: string;
  activeDomainId: string | null;
  activeIndicatorId: string | null;
  onClose: () => void;
  onIndicatorSelect?: (domainId: string, indicatorId: string) => void;
  locale: Locale;
}


export function CountryPanel({
  countryCode,
  countryName,
  activeDomainId,
  activeIndicatorId,
  onClose,
  onIndicatorSelect,
  locale,
}: CountryPanelProps) {
  const aggregate = AGGREGATE_DATA.find((a) => a.geoCode === countryCode);
  const allCountries = AGGREGATE_DATA.filter((a) => a.globalScore > 0);
  const sorted = [...allCountries].sort((a, b) => b.globalScore - a.globalScore);
  const rank = sorted.findIndex((a) => a.geoCode === countryCode) + 1;
  const totalRanked = sorted.length;

  // Domain-level expand state (shows individual indicators when expanded)
  const defaultExpandedDomains = activeDomainId ? new Set([activeDomainId]) : new Set<string>();
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(defaultExpandedDomains);

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domainId)) next.delete(domainId);
      else next.add(domainId);
      return next;
    });
  };

  if (!aggregate) {
    return (
      <aside className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="text-xl"><img src={getFlagUrl(countryCode)} alt={countryName} className="w-7 h-5 object-cover rounded-[3px] shadow-sm border border-white/10" /></span>
            <h2 className="text-md font-semibold text-text-primary">{countryName}</h2>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors" aria-label={ui('close', locale)}>
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center text-text-muted text-sm">
          {ui('noDataAvailable', locale)}
        </div>
      </aside>
    );
  }

  const allDomains = getAllDomains();

  return (
    <aside
      className="flex flex-col flex-1 overflow-hidden"
      aria-label={`Détail — ${countryName}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border-subtle flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl leading-none flex-shrink-0" role="img" aria-label={`Drapeau ${countryName}`}>
                <img src={getFlagUrl(countryCode)} alt={countryName} className="w-7 h-5 object-cover rounded-[3px] shadow-sm border border-white/10" />
              </span>
              <h2 className="text-md font-semibold text-text-primary truncate">{countryName}</h2>
            </div>

            {/* Global score */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-mono font-bold tabular-nums" style={{ color: '#E2EBF5' }}>
                {aggregate.globalScore}
                <span className="text-sm text-text-muted font-normal">/100</span>
              </span>
              <WeatherBadge score={aggregate.globalScore} size="md" showScore={false} showLabel locale={locale} />
            </div>

            {rank > 0 && (
              <p className="text-xs text-text-muted font-mono mt-1 tabular-nums">
                {rank}
                <sup className="text-2xs">e</sup>
                {' '}{ui('of', locale)} {totalRanked} {ui('countriesRanked', locale)}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0 mt-0.5"
            aria-label="Fermer le panneau"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* All domains — flat list with score bars, click to expand indicators */}
      <div className="flex-1 overflow-y-auto">
        {allDomains.map((mod) => {
          const domainScore = aggregate.domainScores[mod.definition.id];
          if (domainScore === undefined) return null;

          const isActiveDomain = activeDomainId === mod.definition.id;
          const isDomainExpanded = expandedDomains.has(mod.definition.id);

          return (
            <div key={mod.definition.id} className={cn(
              'border-b border-border-subtle last:border-b-0',
              isActiveDomain && 'bg-elevated/40'
            )}>
              {/* Domain row — icon, name, score bar, weather badge */}
              <button
                onClick={() => toggleDomain(mod.definition.id)}
                className="flex items-center gap-2 w-full px-4 py-2 text-left group"
                aria-expanded={isDomainExpanded}
              >
                <span className="text-sm flex-shrink-0" aria-hidden="true">{mod.definition.icon}</span>
                <span className={cn(
                  'text-sm min-w-0 truncate w-24 flex-shrink-0',
                  isActiveDomain ? 'text-text-primary font-medium' : 'text-text-secondary group-hover:text-text-primary'
                )}>
                  {t(mod.definition.label, locale)}
                </span>
                <div className="flex-1 mx-1">
                  <ScoreBar score={domainScore} size="sm" animated showValue={false} />
                </div>
                <span className="font-mono text-xs font-bold tabular-nums text-text-primary flex-shrink-0 w-7 text-right">
                  {domainScore}
                </span>
                <TrendBadge trend={aggregate.domainTrends[mod.definition.id] ?? 'nodata'} size="sm" />
                <span className="text-text-muted flex-shrink-0">
                  {isDomainExpanded
                    ? <ChevronDown size={10} aria-hidden="true" />
                    : <ChevronRight size={10} aria-hidden="true" />
                  }
                </span>
              </button>

              {/* Expanded: individual indicators */}
              {isDomainExpanded && (
                <div className="px-4 pb-3 pt-1">
                  <div className="space-y-1.5">
                    {mod.definition.indicators.map((ind) => {
                      const indScore = aggregate.indicatorScores[ind.id];
                      const rawValue = aggregate.rawValues[ind.id];
                      const rawYear = aggregate.rawYears[ind.id];
                      if (indScore === undefined) return null;

                      return (
                        <button
                          key={ind.id}
                          className="pl-2 border-l border-border-subtle w-full text-left hover:bg-elevated/40 rounded-r transition-colors cursor-pointer"
                          onClick={() => onIndicatorSelect?.(mod.definition.id, ind.id)}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-2xs text-text-muted flex-1 min-w-0 truncate">
                              {t(ind.label, locale)}
                            </span>
                            {rawValue !== undefined && (
                              <span
                                className="font-mono text-2xs font-semibold tabular-nums flex-shrink-0"
                                style={{ color: getScoreColor(indScore) }}
                              >
                                {rawValue.toFixed(rawValue % 1 !== 0 ? 1 : 0)}
                                {' '}{t(ind.unitLabel, locale)}
                                {rawYear !== undefined && (
                                  <span className="opacity-60 ml-0.5">({rawYear})</span>
                                )}
                              </span>
                            )}
                            <TrendBadge trend={aggregate.indicatorTrends[ind.id] ?? 'nodata'} size="sm" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border-subtle flex-shrink-0">
        <p className="text-2xs text-text-muted text-center">
          {ui('data', locale)} {aggregate.dataYear} · <span className="text-2xs italic">{ui('estimatedTrend', locale)}</span>
        </p>
      </div>
    </aside>
  );
}
