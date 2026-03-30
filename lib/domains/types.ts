// ─── Core domain types ────────────────────────────────────────────────────────

export type UnitType = 'percent' | 'years' | 'ratio' | 'currency' | 'index' | 'count';
export type Direction = 'higher_is_better' | 'lower_is_better';
export type Locale = 'fr' | 'en' | 'es';

export interface IndicatorDefinition {
  id: string;
  label: Record<string, string>;
  /** Short description of what this indicator measures */
  description?: Record<string, string>;
  unit: UnitType;
  unitLabel: Record<string, string>;
  direction: Direction;
  /** Relative weight within the domain, normalized automatically */
  weight: number;
  thresholds: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
  };
  minValue: number;
  maxValue: number;
}

export interface DomainDefinition {
  id: string;
  label: Record<string, string>;
  description: Record<string, string>;
  icon: string;
  group: string;
  indicators: IndicatorDefinition[];
  active: boolean;
  seedSources: string[];
}

export interface CountrySeedData {
  geoCode: string;
  geoName: string;
  dataYear: number;
  values: Record<string, number>;
}

export interface DomainModule {
  definition: DomainDefinition;
  seedData: CountrySeedData[];
  /** Previous year seed data for trend computation */
  seedDataPrev?: CountrySeedData[];
}

// ─── Trend types ─────────────────────────────────────────────────────────────

export type Trend = 'up2' | 'up1' | 'flat' | 'down1' | 'down2' | 'nodata';

// ─── Aggregate types ──────────────────────────────────────────────────────────

export interface CountryAggregate {
  geoCode: string;
  geoName: string;
  globalScore: number;
  domainScores: Record<string, number>;
  indicatorScores: Record<string, number>;
  rawValues: Record<string, number>;
  /** Data year per indicator (may differ across domains) */
  rawYears: Record<string, number>;
  dataYear: number;
  /** Trends computed from year-over-year score deltas */
  globalTrend: Trend;
  domainTrends: Record<string, Trend>;
  indicatorTrends: Record<string, Trend>;
}

// ─── Stats types ──────────────────────────────────────────────────────────────

export interface ScoreDistribution {
  excellent: number;
  good: number;
  fair: number;
  poor: number;
  critical: number;
}

export interface BestWorst {
  geoCode: string;
  geoName: string;
  score: number;
}

export interface GlobalStats {
  worldAvgScore: number;
  distribution: ScoreDistribution;
  best: BestWorst;
  worst: BestWorst;
  totalCountries: number;
}

export interface DomainStats {
  domainId: string;
  avgScore: number;
  distribution: ScoreDistribution;
  best: BestWorst;
  worst: BestWorst;
  totalCountries: number;
}

export interface IndicatorStats {
  indicatorId: string;
  avgRawValue: number;
  avgScore: number;
  distribution: ScoreDistribution;
  best: BestWorst & { rawValue: number };
  worst: BestWorst & { rawValue: number };
  totalCountries: number;
}

// ─── Navigation types ─────────────────────────────────────────────────────────

export interface NavState {
  domainId: string | null;
  indicatorId: string | null;
  countryCode: string | null;
  countryName: string | null;
}

// ─── Domain registry ──────────────────────────────────────────────────────────

export interface DomainGroup {
  id: string;
  label: Record<string, string>;
}
