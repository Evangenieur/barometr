import type { IndicatorDefinition } from '@/lib/domains/types';

/**
 * Piecewise-linear interpolation.
 * stops must be sorted ascending by x value.
 */
function piecewiseLinear(x: number, stops: Array<[number, number]>): number {
  if (stops.length === 0) return 0;
  const first = stops[0];
  const last = stops[stops.length - 1];
  if (first === undefined || last === undefined) return 0;
  if (x <= first[0]) return first[1];
  if (x >= last[0]) return last[1];

  for (let i = 0; i < stops.length - 1; i++) {
    const s0 = stops[i];
    const s1 = stops[i + 1];
    if (s0 === undefined || s1 === undefined) continue;
    if (x >= s0[0] && x <= s1[0]) {
      const range = s1[0] - s0[0];
      if (range === 0) return s0[1];
      const t = (x - s0[0]) / range;
      return s0[1] + t * (s1[1] - s0[1]);
    }
  }
  return 0;
}

/**
 * Converts a raw indicator value to a 0–100 score.
 *
 * For higher_is_better: stops are [min→0, poor→25, fair→50, good→75, excellent→100, max→100]
 * For lower_is_better:  stops are [min→100, excellent→100, good→75, fair→50, poor→25, max→0]
 *
 * Thresholds for lower_is_better must satisfy: excellent < good < fair < poor
 */
export function computeScore(rawValue: number, indicator: IndicatorDefinition): number {
  const { direction, thresholds, minValue, maxValue } = indicator;
  const clamped = Math.max(minValue, Math.min(maxValue, rawValue));

  let score: number;

  if (direction === 'higher_is_better') {
    const stops: Array<[number, number]> = [
      [minValue, 0],
      [thresholds.poor, 25],
      [thresholds.fair, 50],
      [thresholds.good, 75],
      [thresholds.excellent, 100],
      [maxValue, 100],
    ];
    score = piecewiseLinear(clamped, stops);
  } else {
    // lower_is_better: excellent < good < fair < poor (in value terms)
    const stops: Array<[number, number]> = [
      [minValue, 100],
      [thresholds.excellent, 100],
      [thresholds.good, 75],
      [thresholds.fair, 50],
      [thresholds.poor, 25],
      [maxValue, 0],
    ];
    score = piecewiseLinear(clamped, stops);
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

// ─── Score → weather band ─────────────────────────────────────────────────────

export type WeatherBand = 'excellent' | 'good' | 'fair' | 'poor' | 'critical' | 'nodata';

export function getWeatherBand(score: number): WeatherBand {
  if (score === -1) return 'nodata';
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  if (score >= 20) return 'poor';
  return 'critical';
}

export const WEATHER_CONFIG: Record<WeatherBand, { emoji: string; color: string; bgColor: string; labelFr: string; labelEn: string }> = {
  excellent: { emoji: '☀️',   color: '#22C55E', bgColor: '#22C55E1A', labelFr: 'Excellent',    labelEn: 'Excellent'  },
  good:      { emoji: '🌤️',  color: '#84CC16', bgColor: '#84CC161A', labelFr: 'Bon',           labelEn: 'Good'       },
  fair:      { emoji: '⛅️',  color: '#EAB308', bgColor: '#EAB3081A', labelFr: 'Passable',      labelEn: 'Fair'       },
  poor:      { emoji: '🌧️',  color: '#F97316', bgColor: '#F973161A', labelFr: 'Faible',        labelEn: 'Poor'       },
  critical:  { emoji: '⛈️',  color: '#EF4444', bgColor: '#EF44441A', labelFr: 'Critique',      labelEn: 'Critical'   },
  nodata:    { emoji: '—',   color: '#3A4A5C', bgColor: '#3A4A5C1A', labelFr: 'Sans données',  labelEn: 'No data'    },
};

export function getScoreColor(score: number): string {
  const band = getWeatherBand(score);
  return WEATHER_CONFIG[band].color;
}

/** Returns an interpolated map fill color based on the spec gradient */
export function getMapFillColor(score: number): string {
  if (score === -1) return '#0A0F16';
  const stops: Array<[number, string]> = [
    [0,   '#7F1D1D'],
    [20,  '#9A3412'],
    [40,  '#854D0E'],
    [60,  '#365314'],
    [80,  '#14532D'],
    [100, '#052E16'],
  ];

  if (score <= 0) return stops[0]?.[1] ?? '#7F1D1D';
  if (score >= 100) return stops[stops.length - 1]?.[1] ?? '#052E16';

  for (let i = 0; i < stops.length - 1; i++) {
    const s0 = stops[i];
    const s1 = stops[i + 1];
    if (s0 === undefined || s1 === undefined) continue;
    if (score >= s0[0] && score <= s1[0]) {
      return interpolateHexColor(s0[1], s1[1], (score - s0[0]) / (s1[0] - s0[0]));
    }
  }
  return '#0A0F16';
}

function interpolateHexColor(hex1: string, hex2: string, t: number): string {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
