/**
 * Aggregate computation — runs once at module load time (build time).
 * Produces AGGREGATE_DATA: CountryAggregate[] for the entire app.
 */
import { computeScore } from '@/lib/scoring';
import { DOMAIN_REGISTRY } from '@/lib/domains/registry';
import type {
  CountryAggregate,
  GlobalStats,
  DomainStats,
  IndicatorStats,
  ScoreDistribution,
  BestWorst,
  Trend,
} from '@/lib/domains/types';

// ─── Trend classification ────────────────────────────────────────────────────

function classifyTrend(current: number, previous: number | undefined): Trend {
  if (previous === undefined) return 'nodata';
  const delta = current - previous;
  if (delta >= 5) return 'up2';
  if (delta >= 2) return 'up1';
  if (delta <= -5) return 'down2';
  if (delta <= -2) return 'down1';
  return 'flat';
}

// ─── Core computation ─────────────────────────────────────────────────────────

interface MutableAggregate {
  geoCode: string;
  geoName: string;
  domainScores: Record<string, number>;
  indicatorScores: Record<string, number>;
  rawValues: Record<string, number>;
  rawYears: Record<string, number>;
  dataYear: number;
}

interface MutablePrevScores {
  domainScores: Record<string, number>;
  indicatorScores: Record<string, number>;
}

function buildAggregates(): CountryAggregate[] {
  const countryMap = new Map<string, MutableAggregate>();
  const prevMap = new Map<string, MutablePrevScores>();

  for (const domainMod of DOMAIN_REGISTRY.values()) {
    const { definition, seedData, seedDataPrev } = domainMod;
    if (!definition.active) continue;

    // ── Current year ──
    for (const row of seedData) {
      const { geoCode, geoName, values, dataYear } = row;

      if (!countryMap.has(geoCode)) {
        countryMap.set(geoCode, {
          geoCode,
          geoName,
          domainScores: {},
          indicatorScores: {},
          rawValues: {},
          rawYears: {},
          dataYear,
        });
      }

      const entry = countryMap.get(geoCode);
      if (!entry) continue;

      if (dataYear > entry.dataYear) {
        entry.dataYear = dataYear;
        entry.geoName = geoName;
      }

      let totalWeight = 0;
      let weightedSum = 0;

      for (const indicator of definition.indicators) {
        const rawValue = values[indicator.id];
        if (rawValue === undefined) continue;

        const score = computeScore(rawValue, indicator);
        entry.indicatorScores[indicator.id] = score;
        entry.rawValues[indicator.id] = rawValue;
        entry.rawYears[indicator.id] = dataYear;
        weightedSum += score * indicator.weight;
        totalWeight += indicator.weight;
      }

      if (totalWeight > 0) {
        entry.domainScores[definition.id] = Math.round(weightedSum / totalWeight);
      }
    }

    // ── Previous year (for trends) ──
    if (seedDataPrev) {
      for (const row of seedDataPrev) {
        const { geoCode, values } = row;

        if (!prevMap.has(geoCode)) {
          prevMap.set(geoCode, { domainScores: {}, indicatorScores: {} });
        }

        const prev = prevMap.get(geoCode)!;
        let totalWeight = 0;
        let weightedSum = 0;

        for (const indicator of definition.indicators) {
          const rawValue = values[indicator.id];
          if (rawValue === undefined) continue;

          const score = computeScore(rawValue, indicator);
          prev.indicatorScores[indicator.id] = score;
          weightedSum += score * indicator.weight;
          totalWeight += indicator.weight;
        }

        if (totalWeight > 0) {
          prev.domainScores[definition.id] = Math.round(weightedSum / totalWeight);
        }
      }
    }
  }

  // Minimum domain coverage to compute a meaningful global score
  const MIN_DOMAINS = Math.ceil(DOMAIN_REGISTRY.size / 2);

  // Compute global scores + trends
  return [...countryMap.values()].map((entry) => {
    const domainScoreValues = Object.values(entry.domainScores);
    const globalScore =
      domainScoreValues.length >= MIN_DOMAINS
        ? Math.round(
            domainScoreValues.reduce((a, b) => a + b, 0) / domainScoreValues.length
          )
        : -1;

    // Compute previous global score for trend
    const prev = prevMap.get(entry.geoCode);
    const prevDomainValues = prev ? Object.values(prev.domainScores) : [];
    const prevGlobalScore =
      prevDomainValues.length > 0
        ? Math.round(prevDomainValues.reduce((a, b) => a + b, 0) / prevDomainValues.length)
        : undefined;

    // Classify trends
    const domainTrends: Record<string, Trend> = {};
    for (const domainId of Object.keys(entry.domainScores)) {
      domainTrends[domainId] = classifyTrend(
        entry.domainScores[domainId]!,
        prev?.domainScores[domainId]
      );
    }

    const indicatorTrends: Record<string, Trend> = {};
    for (const indId of Object.keys(entry.indicatorScores)) {
      indicatorTrends[indId] = classifyTrend(
        entry.indicatorScores[indId]!,
        prev?.indicatorScores[indId]
      );
    }

    return {
      geoCode: entry.geoCode,
      geoName: entry.geoName,
      globalScore,
      domainScores: entry.domainScores,
      indicatorScores: entry.indicatorScores,
      rawValues: entry.rawValues,
      rawYears: entry.rawYears,
      dataYear: entry.dataYear,
      globalTrend: classifyTrend(globalScore, prevGlobalScore),
      domainTrends,
      indicatorTrends,
    } satisfies CountryAggregate;
  });
}

export const AGGREGATE_DATA: CountryAggregate[] = buildAggregates();

// ─── Score map helpers ────────────────────────────────────────────────────────

export function computeScoreMap(
  domainId: string | null,
  indicatorId: string | null
): Record<string, number> {
  const map: Record<string, number> = {};
  for (const agg of AGGREGATE_DATA) {
    if (indicatorId !== null) {
      const score = agg.indicatorScores[indicatorId];
      map[agg.geoCode] = score !== undefined ? score : -1;
    } else if (domainId !== null) {
      const score = agg.domainScores[domainId];
      map[agg.geoCode] = score !== undefined ? score : -1;
    } else {
      map[agg.geoCode] = agg.globalScore;
    }
  }
  return map;
}

export function computeRankMap(scoreMap: Record<string, number>): Record<string, number> {
  const entries = Object.entries(scoreMap)
    .filter(([, s]) => s !== -1)
    .sort(([, a], [, b]) => b - a);

  const rankMap: Record<string, number> = {};
  entries.forEach(([code], i) => {
    rankMap[code] = i + 1;
  });
  return rankMap;
}

export function computeRawValueMap(indicatorId: string): Record<string, number> {
  const map: Record<string, number> = {};
  for (const agg of AGGREGATE_DATA) {
    const val = agg.rawValues[indicatorId];
    if (val !== undefined) map[agg.geoCode] = val;
  }
  return map;
}

// ─── Stats helpers ────────────────────────────────────────────────────────────

function buildDistribution(scores: number[]): ScoreDistribution {
  const dist: ScoreDistribution = { excellent: 0, good: 0, fair: 0, poor: 0, critical: 0 };
  for (const s of scores) {
    if (s >= 80) dist.excellent++;
    else if (s >= 60) dist.good++;
    else if (s >= 40) dist.fair++;
    else if (s >= 20) dist.poor++;
    else dist.critical++;
  }
  return dist;
}

function bestWorst(entries: Array<{ geoCode: string; geoName: string; score: number }>): {
  best: BestWorst;
  worst: BestWorst;
} {
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const best = sorted[0] ?? { geoCode: '??', geoName: 'N/A', score: 0 };
  const worst = sorted[sorted.length - 1] ?? { geoCode: '??', geoName: 'N/A', score: 0 };
  return { best, worst };
}

export function computeGlobalStats(): GlobalStats {
  const scored = AGGREGATE_DATA
    .filter((a) => a.globalScore > 0)
    .map((a) => ({
      geoCode: a.geoCode,
      geoName: a.geoName,
      score: a.globalScore,
    }));
  const scores = scored.map((e) => e.score);
  const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const { best, worst } = bestWorst(scored);

  return {
    worldAvgScore: avg,
    distribution: buildDistribution(scores),
    best,
    worst,
    totalCountries: scored.length,
  };
}

export function computeDomainStats(domainId: string): DomainStats | null {
  const entries: Array<{ geoCode: string; geoName: string; score: number }> = [];

  for (const agg of AGGREGATE_DATA) {
    const score = agg.domainScores[domainId];
    if (score !== undefined) {
      entries.push({ geoCode: agg.geoCode, geoName: agg.geoName, score });
    }
  }

  if (entries.length === 0) return null;
  const scores = entries.map((e) => e.score);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const { best, worst } = bestWorst(entries);

  return {
    domainId,
    avgScore: avg,
    distribution: buildDistribution(scores),
    best,
    worst,
    totalCountries: entries.length,
  };
}

export function computeIndicatorStats(indicatorId: string): IndicatorStats | null {
  const entries: Array<{ geoCode: string; geoName: string; score: number; rawValue: number }> = [];

  for (const agg of AGGREGATE_DATA) {
    const score = agg.indicatorScores[indicatorId];
    const rawValue = agg.rawValues[indicatorId];
    if (score !== undefined && rawValue !== undefined) {
      entries.push({ geoCode: agg.geoCode, geoName: agg.geoName, score, rawValue });
    }
  }

  if (entries.length === 0) return null;
  const scores = entries.map((e) => e.score);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const avgRaw = entries.reduce((a, e) => a + e.rawValue, 0) / entries.length;

  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const best = sorted[0] ?? { geoCode: '??', geoName: 'N/A', score: 0, rawValue: 0 };
  const worst = sorted[sorted.length - 1] ?? { geoCode: '??', geoName: 'N/A', score: 0, rawValue: 0 };

  return {
    indicatorId,
    avgScore: avg,
    avgRawValue: avgRaw,
    distribution: buildDistribution(scores),
    best,
    worst,
    totalCountries: entries.length,
  };
}

/** All countries sorted by score (descending) for the current view */
export function getRankedCountries(
  domainId: string | null,
  indicatorId: string | null
): Array<{ geoCode: string; geoName: string; score: number; rank: number; rawValue?: number }> {
  // When ranking by indicator, compute a precise (non-rounded) score for accurate sorting
  let preciseScores: Map<string, number> | undefined;
  let indicatorDirection: 'higher_is_better' | 'lower_is_better' | undefined;
  if (indicatorId !== null) {
    preciseScores = new Map();
    for (const mod of DOMAIN_REGISTRY.values()) {
      const ind = mod.definition.indicators.find((i) => i.id === indicatorId);
      if (ind) {
        indicatorDirection = ind.direction;
        for (const entry of mod.seedData) {
          const raw = entry.values[indicatorId];
          if (raw !== undefined) {
            preciseScores.set(entry.geoCode, computeScore(raw, ind));
          }
        }
        break;
      }
    }
  }

  const scored = AGGREGATE_DATA.map((agg) => {
    let score: number;
    let rawValue: number | undefined;
    let preciseScore: number | undefined;
    if (indicatorId !== null) {
      score = agg.indicatorScores[indicatorId] ?? -1;
      rawValue = agg.rawValues[indicatorId];
      preciseScore = preciseScores?.get(agg.geoCode);
    } else if (domainId !== null) {
      score = agg.domainScores[domainId] ?? -1;
    } else {
      score = agg.globalScore;
    }
    return { geoCode: agg.geoCode, geoName: agg.geoName, score, rawValue, preciseScore };
  });

  const withData = scored.filter((e) => e.score !== -1).sort((a, b) => {
    // Use precise score when available for accurate indicator ranking
    const sa = a.preciseScore ?? a.score;
    const sb = b.preciseScore ?? b.score;
    return sb - sa;
  });
  return withData.map((e, i) => {
    const entry: { geoCode: string; geoName: string; score: number; rank: number; rawValue?: number } = {
      geoCode: e.geoCode,
      geoName: e.geoName,
      score: e.score,
      rank: i + 1,
    };
    if (e.rawValue !== undefined) entry.rawValue = e.rawValue;
    return entry;
  });
}
