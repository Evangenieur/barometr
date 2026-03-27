'use client';

import { useEffect, useRef, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapTooltip } from '@/components/map/MapTooltip';
import { useState } from 'react';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const GEOJSON_URL = `${BASE_PATH}/geo/world-countries.geojson`;
const MAP_STYLE = process.env.NEXT_PUBLIC_MAPLIBRE_STYLE ?? 'https://tiles.openfreemap.org/styles/dark';

// Score → MapLibre fill-color interpolation stops (matches spec)
const FILL_COLOR_EXPRESSION: maplibregl.ExpressionSpecification = [
  'interpolate',
  ['linear'],
  ['coalesce', ['feature-state', 'score'], -1],
  -1,  '#0A0F16',
  0,   '#7F1D1D',
  20,  '#9A3412',
  40,  '#854D0E',
  60,  '#365314',
  80,  '#14532D',
  100, '#16A34A',
];

interface TooltipState {
  x: number;
  y: number;
  countryName: string;
  countryCode: string;
  score: number;
  rank: number;
  rawValue?: number;
  rawValueLabel?: string;
}

export interface MapLibreMapProps {
  scoreMap: Record<string, number>;
  rankMap: Record<string, number>;
  totalCountries: number;
  onCountryClick?: (geoCode: string, geoName: string) => void;
  rawValueMap?: Record<string, number>;
  rawValueLabel?: string;
}

export function MapLibreMap({
  scoreMap,
  rankMap,
  totalCountries,
  onCountryClick,
  rawValueMap,
  rawValueLabel,
}: MapLibreMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const geojsonLoaded = useRef(false);

  // Refs to keep handlers up-to-date without re-registering them
  const scoreMapRef = useRef<Record<string, number>>(scoreMap);
  const rankMapRef = useRef<Record<string, number>>(rankMap);
  const rawValueMapRef = useRef<Record<string, number> | undefined>(rawValueMap);
  const rawValueLabelRef = useRef<string | undefined>(rawValueLabel);
  const onCountryClickRef = useRef<((geoCode: string, geoName: string) => void) | undefined>(onCountryClick);

  useEffect(() => { scoreMapRef.current = scoreMap; }, [scoreMap]);
  useEffect(() => { rankMapRef.current = rankMap; }, [rankMap]);
  useEffect(() => { rawValueMapRef.current = rawValueMap; }, [rawValueMap]);
  useEffect(() => { rawValueLabelRef.current = rawValueLabel; }, [rawValueLabel]);
  useEffect(() => { onCountryClickRef.current = onCountryClick; }, [onCountryClick]);

  // Apply feature states for all countries
  const applyScores = useCallback(() => {
    const map = mapRef.current;
    if (!map || !geojsonLoaded.current) return;

    for (const [geoCode, score] of Object.entries(scoreMap)) {
      map.setFeatureState(
        { source: 'countries', id: geoCode },
        { score }
      );
    }
  }, [scoreMap]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: [15, 20],
      zoom: 1.8,
      minZoom: 1,
      maxZoom: 8,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      // Add countries source with promoteId for feature state
      map.addSource('countries', {
        type: 'geojson',
        data: GEOJSON_URL,
        promoteId: 'ISO3166-1-Alpha-2',
      });

      // Fill layer
      map.addLayer({
        id: 'countries-fill',
        type: 'fill',
        source: 'countries',
        paint: {
          'fill-color': FILL_COLOR_EXPRESSION,
          'fill-opacity': 0.9,
        },
      });

      // Border layer
      map.addLayer({
        id: 'countries-border',
        type: 'line',
        source: 'countries',
        paint: {
          'line-color': '#1E2D3D',
          'line-width': 0.8,
          'line-opacity': 0.8,
        },
      });

      // Hover border layer
      map.addLayer({
        id: 'countries-hover',
        type: 'line',
        source: 'countries',
        paint: {
          'line-color': '#253447',
          'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 2, 0],
        },
      });

      geojsonLoaded.current = true;
      applyScores();
    });

    // Hover
    let hoveredId: string | null = null;

    map.on('mousemove', 'countries-fill', (e) => {
      if (!e.features || e.features.length === 0) return;
      const feature = e.features[0];
      if (!feature) return;

      const id = feature.id as string | undefined;
      const props = feature.properties as Record<string, unknown> | undefined;
      const name = (props?.['name'] ?? props?.['ADMIN'] ?? props?.['NAME'] ?? id ?? 'Unknown') as string;
      const geoCode = id ?? '';

      if (hoveredId && hoveredId !== id) {
        map.setFeatureState({ source: 'countries', id: hoveredId }, { hover: false });
      }
      if (id) {
        hoveredId = id;
        map.setFeatureState({ source: 'countries', id }, { hover: true });
      }

      const score = scoreMapRef.current[geoCode] ?? -1;
      const rank = rankMapRef.current[geoCode] ?? 0;

      const base: TooltipState = { x: e.point.x, y: e.point.y, countryName: name, countryCode: geoCode, score, rank };
      const rv = rawValueMapRef.current?.[geoCode];
      if (rv !== undefined) base.rawValue = rv;
      if (rawValueLabelRef.current !== undefined) base.rawValueLabel = rawValueLabelRef.current;
      setTooltip(base);

      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'countries-fill', () => {
      if (hoveredId) {
        map.setFeatureState({ source: 'countries', id: hoveredId }, { hover: false });
        hoveredId = null;
      }
      setTooltip(null);
      map.getCanvas().style.cursor = '';
    });

    // Click
    map.on('click', 'countries-fill', (e) => {
      if (!e.features || e.features.length === 0) return;
      const feature = e.features[0];
      if (!feature) return;
      const id = feature.id as string | undefined;
      const props = feature.properties as Record<string, unknown> | undefined;
      const name = (props?.['name'] ?? props?.['ADMIN'] ?? props?.['NAME'] ?? '') as string;
      if (id && name) {
        onCountryClickRef.current?.(id, name);
        setTooltip(null);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
      geojsonLoaded.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-apply scores when scoreMap changes
  useEffect(() => {
    if (geojsonLoaded.current) {
      applyScores();
    }
  }, [applyScores]);

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-full"
        aria-label="Carte du monde interactive"
        role="application"
      />
      {tooltip && (
        <MapTooltip
          x={tooltip.x}
          y={tooltip.y}
          countryName={tooltip.countryName}
          countryCode={tooltip.countryCode}
          score={tooltip.score}
          rank={tooltip.rank}
          totalCountries={totalCountries}
          {...(tooltip.rawValue !== undefined ? { rawValue: tooltip.rawValue } : {})}
          {...(tooltip.rawValueLabel !== undefined ? { rawValueLabel: tooltip.rawValueLabel } : {})}
        />
      )}
    </>
  );
}
