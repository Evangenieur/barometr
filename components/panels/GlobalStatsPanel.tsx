'use client';

import { useState } from 'react';
import { Trophy, AlertTriangle, ExternalLink } from 'lucide-react';
import { WeatherBadge } from '@/components/ui/WeatherBadge';
import { DistributionBar } from '@/components/ui/DistributionBar';
import { CountryRankingList } from '@/components/panels/CountryRankingList';
import { getFlagUrl } from '@/lib/utils/flags';
import { getDomainForIndicator } from '@/lib/domains/registry';
import { cn } from '@/lib/utils/cn';
import { ui } from '@/lib/utils/i18n';
import type { GlobalStats, DomainStats, IndicatorStats } from '@/lib/domains/types';
import type { Locale } from '@/lib/domains/types';

/** Derive a readable label from a data source URL */
function getSourceLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const MAP: Record<string, string> = {
      'data.worldbank.org': 'World Bank',
      'worldbank.org': 'World Bank',
      'who.int': 'WHO',
      'gho.who.int': 'WHO',
      'oecd.org': 'OECD',
      'stats.oecd.org': 'OECD',
      'transparency.org': 'Transparency Intl',
      'un.org': 'United Nations',
      'data.un.org': 'United Nations',
      'hdr.undp.org': 'UNDP',
      'ilo.org': 'ILO',
      'imf.org': 'IMF',
      'numbeo.com': 'Numbeo',
      'sipri.org': 'SIPRI',
      'visionofhumanity.org': 'Vision of Humanity',
      'ec.europa.eu': 'Eurostat',
      'eurostat.ec.europa.eu': 'Eurostat',
    };
    return MAP[host] ?? host;
  } catch {
    return 'Source';
  }
}

interface GlobalStatsPanelProps {
  stats: GlobalStats | DomainStats | IndicatorStats;
  mode: 'global' | 'domain' | 'indicator';
  locale: Locale;
  rankedCountries: Array<{ geoCode: string; geoName: string; score: number; rank: number; rawValue?: number }>;
  activeCountryCode: string | null;
  onCountrySelect: (geoCode: string, geoName: string) => void;
  /** Active indicator id — used to show indicator metadata card */
  activeIndicatorId?: string | null;
  /** Unit label for raw values in the ranking list (e.g. "ans", "% GDP") */
  rawUnit?: string;
  /** Close handler */
  onClose?: () => void;
}

function isGlobalStats(s: GlobalStats | DomainStats | IndicatorStats): s is GlobalStats {
  return 'worldAvgScore' in s;
}
function isDomainStats(s: GlobalStats | DomainStats | IndicatorStats): s is DomainStats {
  return 'domainId' in s;
}

export function GlobalStatsPanel({
  stats,
  mode,
  locale,
  rankedCountries,
  activeCountryCode,
  onCountrySelect,
  activeIndicatorId,
  rawUnit,
  onClose,
}: GlobalStatsPanelProps) {
  const [showRanking, setShowRanking] = useState(true);

  const avgScore = isGlobalStats(stats)
    ? stats.worldAvgScore
    : isDomainStats(stats)
    ? stats.avgScore
    : stats.avgScore;

  const label = mode === 'global'
    ? ui('worldAvg', locale)
    : mode === 'domain'
    ? ui('domainAvg', locale)
    : ui('indicatorAvg', locale);

  // Indicator metadata (description, year, sources)
  const indicatorMeta = (() => {
    if (mode !== 'indicator' || !activeIndicatorId) return null;
    const mod = getDomainForIndicator(activeIndicatorId);
    if (!mod) return null;
    const ind = mod.definition.indicators.find((i) => i.id === activeIndicatorId);
    if (!ind) return null;
    const description = ind.description?.[locale] ?? ind.description?.['en'] ?? mod.definition.description[locale] ?? mod.definition.description['en'];
    const dataYear = mod.seedData[0]?.dataYear;
    const sources = mod.definition.seedSources ?? [];
    return { ind, description, dataYear, sources };
  })();

  return (
    <div className="flex flex-col gap-4 px-3 py-3">
      {/* Indicator info card */}
      {indicatorMeta && (
        <div className="rounded-md border border-border-subtle bg-elevated/30 p-2.5 flex flex-col gap-1.5">
          <div className="text-xs font-medium text-text-primary">
            {indicatorMeta.ind.label[locale] ?? indicatorMeta.ind.label['en']}
          </div>
          {indicatorMeta.description && (
            <p className="text-2xs text-text-muted leading-relaxed italic">
              {indicatorMeta.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
            {indicatorMeta.dataYear && (
              <span className="text-2xs text-text-muted">
                {ui('data', locale)} {indicatorMeta.dataYear}
              </span>
            )}
            {indicatorMeta.sources.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-2xs text-accent-blue hover:underline"
              >
                {getSourceLabel(url)}
                <ExternalLink size={9} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Score mondial */}
      <div className="text-center">
        <div className="text-xs text-text-muted mb-1">{label}</div>
        <div className="flex items-center justify-center gap-2">
          <span className="font-mono text-2xl font-bold text-text-primary">{avgScore}</span>
          <span className="text-xs text-text-muted">/100</span>
          <WeatherBadge score={avgScore} size="lg" showScore={false} showLabel={false} />
        </div>
        <div className="text-xs text-text-muted mt-1">
          {stats.totalCountries} {ui('countriesCovered', locale)}
        </div>
      </div>

      {/* Distribution */}
      <div>
        <div className="text-xs text-text-muted mb-2">
          {ui('distribution', locale)}
        </div>
        <DistributionBar
          distribution={stats.distribution}
          total={stats.totalCountries}
          locale={locale}
        />
      </div>

      {/* Best / Worst */}
      <div className="grid grid-cols-2 gap-2">
        <BestWorstCard
          type="best"
          geoCode={stats.best.geoCode}
          geoName={stats.best.geoName}
          score={stats.best.score}
          locale={locale}
        />
        <BestWorstCard
          type="worst"
          geoCode={stats.worst.geoCode}
          geoName={stats.worst.geoName}
          score={stats.worst.score}
          locale={locale}
        />
      </div>

      {/* Ranking toggle */}
      <div>
        <button
          onClick={() => setShowRanking((r) => !r)}
          className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
        >
          <span>{ui('fullRanking', locale)}</span>
          <span className="text-text-muted">{showRanking ? '▲' : '▼'}</span>
        </button>

        {showRanking && (
          <div className="mt-2">
            <CountryRankingList
              entries={rankedCountries}
              activeCountryCode={activeCountryCode}
              onCountrySelect={onCountrySelect}
              {...(rawUnit !== undefined ? { rawUnit } : {})}
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface BestWorstCardProps {
  type: 'best' | 'worst';
  geoCode: string;
  geoName: string;
  score: number;
  locale: Locale;
}

function BestWorstCard({ type, geoCode, geoName, score, locale }: BestWorstCardProps) {
  const Icon = type === 'best' ? Trophy : AlertTriangle;
  const color = type === 'best' ? '#22C55E' : '#F97316';
  const label = type === 'best'
    ? ui('best', locale)
    : ui('worst', locale);

  return (
    <div className={cn(
      'flex flex-col gap-1 p-2 rounded-md border',
      type === 'best' ? 'border-score-excellent/20 bg-score-excellent/5' : 'border-score-poor/20 bg-score-poor/5',
    )}>
      <div className="flex items-center gap-1">
        <Icon size={11} style={{ color }} aria-hidden="true" />
        <span className="text-2xs text-text-muted">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <img src={getFlagUrl(geoCode)} alt={geoCode} className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm border border-white/10" />
        <span className="text-xs text-text-secondary truncate flex-1">{geoName}</span>
      </div>
      <span className="font-mono text-sm font-bold" style={{ color }}>{score}</span>
    </div>
  );
}
