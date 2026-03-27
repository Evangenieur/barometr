'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { NavigationProvider, useNavigation } from '@/lib/context/NavigationContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { DomainSidebar } from '@/components/navigation/DomainSidebar';
import { CountryPanel } from '@/components/panels/CountryPanel';
import { GlobalStatsPanel } from '@/components/panels/GlobalStatsPanel';
import { MapLibreMap } from '@/components/map/MapLibreMap';
import { MapLegend } from '@/components/map/MapLegend';
import {
  AGGREGATE_DATA,
  computeScoreMap,
  computeRankMap,
  computeRawValueMap,
  computeGlobalStats,
  computeDomainStats,
  computeIndicatorStats,
  getRankedCountries,
} from '@/lib/aggregate';
import { getDomain } from '@/lib/domains/registry';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// ─── Inner app (uses NavigationContext) ───────────────────────────────────────

function MapAppInner() {
  const { nav, setDomain, setIndicator, setCountry, locale } = useNavigation();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Track which right panel is active: 'stats' or 'country'
  type RightPanel = 'stats' | 'country' | null;
  const [rightPanel, setRightPanel] = useState<RightPanel>(
    nav.countryCode ? 'country' : 'stats'
  );

  // Switch to country panel when a country is selected
  const prevCountryRef = useRef(nav.countryCode);
  useEffect(() => {
    if (nav.countryCode !== null && nav.countryCode !== prevCountryRef.current) {
      setRightPanel('country');
    }
    if (nav.countryCode === null && prevCountryRef.current !== null) {
      setRightPanel('stats');
    }
    prevCountryRef.current = nav.countryCode;
  }, [nav.countryCode, nav.domainId]);

  // Switch to stats panel when an indicator is selected
  const prevIndicatorRef = useRef(nav.indicatorId);
  useEffect(() => {
    if (nav.indicatorId !== null && nav.indicatorId !== prevIndicatorRef.current) {
      setRightPanel('stats');
    }
    prevIndicatorRef.current = nav.indicatorId;
  }, [nav.indicatorId]);

  // Show stats panel when a domain is selected (and no country active)
  const prevDomainRef = useRef(nav.domainId);
  useEffect(() => {
    if (nav.domainId !== null && nav.domainId !== prevDomainRef.current && rightPanel !== 'country') {
      setRightPanel('stats');
    }
    if (nav.domainId === null && prevDomainRef.current !== null && rightPanel !== 'country') {
      setRightPanel('stats');
    }
    prevDomainRef.current = nav.domainId;
  }, [nav.domainId, rightPanel]);

  // Computed maps
  const scoreMap = computeScoreMap(nav.domainId, nav.indicatorId);
  const rankMap = computeRankMap(scoreMap);

  const rawValueMap = nav.indicatorId !== null
    ? computeRawValueMap(nav.indicatorId)
    : undefined;

  const rawValueEntries = rawValueMap ? Object.values(rawValueMap) : undefined;
  const rawMin = rawValueEntries && rawValueEntries.length > 0 ? Math.min(...rawValueEntries) : undefined;
  const rawMax = rawValueEntries && rawValueEntries.length > 0 ? Math.max(...rawValueEntries) : undefined;

  const rawValueLabel: string | undefined = (() => {
    if (!nav.indicatorId || !nav.domainId) return undefined;
    const mod = getDomain(nav.domainId);
    const ind = mod?.definition.indicators.find((i) => i.id === nav.indicatorId);
    return ind ? (ind.unitLabel[locale] ?? ind.unitLabel['en']) : undefined;
  })();

  // Stats for the sidebar panel
  const stats = (() => {
    if (nav.indicatorId !== null) {
      return computeIndicatorStats(nav.indicatorId);
    }
    if (nav.domainId !== null) {
      return computeDomainStats(nav.domainId);
    }
    return computeGlobalStats();
  })();

  const statsMode = nav.indicatorId !== null
    ? 'indicator' as const
    : nav.domainId !== null
    ? 'domain' as const
    : 'global' as const;

  const rankedCountries = getRankedCountries(nav.domainId, nav.indicatorId);

  const handleCountryClick = useCallback((code: string, name: string) => {
    setCountry(code, name);
  }, [setCountry]);

  const handleCountrySelect = useCallback((code: string, name: string) => {
    setCountry(code, name);
    setMobileSidebarOpen(false);
  }, [setCountry]);

  const handleClose = useCallback(() => {
    setCountry(null, null);
  }, [setCountry]);

  // Close panels on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (rightPanel === 'country') {
          handleClose();
          setRightPanel(nav.domainId ? 'stats' : null);
        } else if (rightPanel === 'stats') {
          setRightPanel(null);
        } else if (nav.domainId !== null) {
          setDomain(null);
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [rightPanel, nav.domainId, handleClose, setDomain]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-void">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left sidebar — hidden on mobile */}
        <div className={cn(
          'hidden md:flex flex-col overflow-hidden flex-shrink-0 z-10'
        )}>
          <DomainSidebar
            activeDomainId={nav.domainId}
            activeIndicatorId={nav.indicatorId}
            onDomainSelect={setDomain}
            onIndicatorSelect={setIndicator}
            onCountrySelect={handleCountrySelect}
            locale={locale}
          />
        </div>

        {/* Map container */}
        <div className="flex-1 relative overflow-hidden">
          <MapLibreMap
            scoreMap={scoreMap}
            rankMap={rankMap}
            totalCountries={AGGREGATE_DATA.length}
            onCountryClick={handleCountryClick}
            {...(rawValueMap !== undefined ? { rawValueMap } : {})}
            {...(rawValueLabel !== undefined ? { rawValueLabel } : {})}
          />

          {/* Legend */}
          <div className="absolute bottom-8 left-4 z-10">
            <MapLegend
              mode={nav.indicatorId !== null ? 'raw' : 'score'}
              {...(rawValueLabel !== undefined ? { rawValueLabel } : {})}
              {...(rawMin !== undefined ? { rawMin } : {})}
              {...(rawMax !== undefined ? { rawMax } : {})}
            />
          </div>

          {/* Mobile sidebar toggle */}
          <button
            className="md:hidden absolute bottom-8 right-4 z-10 bg-surface border border-border-default rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-text-primary"
            onClick={() => setMobileSidebarOpen((v) => !v)}
            aria-label="Ouvrir la navigation"
          >
            <span className="text-lg" aria-hidden="true">≡</span>
          </button>
        </div>

        {/* Right panel — single slot, same width */}
        {rightPanel !== null && (
          <div className="hidden lg:flex flex-col w-80 flex-shrink-0 bg-surface border-l border-border-subtle overflow-y-auto z-10">
            {rightPanel === 'stats' && stats && (
              <>
                <div className="p-3 border-b border-border-subtle flex items-center justify-between">
                  <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    {statsMode === 'global'
                      ? 'Statistiques mondiales'
                      : statsMode === 'domain'
                      ? (() => {
                          const mod = nav.domainId ? getDomain(nav.domainId) : null;
                          const name = mod?.definition.label[locale] ?? mod?.definition.label['en'];
                          return name ? `${name}` : 'Statistiques domaine';
                        })()
                      : (() => {
                          const mod = nav.domainId ? getDomain(nav.domainId) : null;
                          const name = mod?.definition.label[locale] ?? mod?.definition.label['en'];
                          return name ? `${name} — indicateur` : 'Statistiques indicateur';
                        })()}
                  </h2>
                  <button
                    onClick={() => setRightPanel(null)}
                    className="text-text-muted hover:text-text-primary transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={16} />
                  </button>
                </div>
                <GlobalStatsPanel
                  stats={stats}
                  mode={statsMode}
                  locale={locale}
                  rankedCountries={rankedCountries}
                  activeCountryCode={nav.countryCode}
                  onCountrySelect={handleCountrySelect}
                  activeIndicatorId={nav.indicatorId}
                  onClose={() => setRightPanel(null)}
                  {...(rawValueLabel !== undefined ? { rawUnit: rawValueLabel } : {})}
                />
              </>
            )}

            {rightPanel === 'country' && nav.countryCode !== null && nav.countryName !== null && (
              <CountryPanel
                countryCode={nav.countryCode}
                countryName={nav.countryName}
                activeDomainId={nav.domainId}
                activeIndicatorId={nav.indicatorId}
                onClose={() => {
                  handleClose();
                  setRightPanel(nav.domainId ? 'stats' : null);
                }}
                onIndicatorSelect={(domainId, indicatorId) => {
                  setDomain(domainId);
                  setIndicator(indicatorId);
                }}
                locale={locale}
              />
            )}
          </div>
        )}

        {/* Mobile country panel — full-screen overlay */}
        {nav.countryCode !== null && nav.countryName !== null && (
          <div className="lg:hidden fixed inset-0 z-40 bg-surface overflow-y-auto animate-slide-in-right">
            <CountryPanel
              countryCode={nav.countryCode}
              countryName={nav.countryName}
              activeDomainId={nav.domainId}
              activeIndicatorId={nav.indicatorId}
              onClose={() => {
                handleClose();
              }}
              onIndicatorSelect={(domainId, indicatorId) => {
                setDomain(domainId);
                setIndicator(indicatorId);
                handleClose();
              }}
              locale={locale}
            />
          </div>
        )}

        {/* Mobile left panel */}
        {isMobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex flex-row">
            <div className="relative bg-surface border-r border-border-default w-72 max-w-[85vw] h-full overflow-y-auto animate-slide-in-left flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-border-subtle flex-shrink-0">
                <span className="text-sm font-semibold text-text-primary">Domaines</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="text-text-muted hover:text-text-primary"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>
              <DomainSidebar
                activeDomainId={nav.domainId}
                activeIndicatorId={nav.indicatorId}
                onDomainSelect={(id) => { setDomain(id); }}
                onIndicatorSelect={(id) => { setIndicator(id); setMobileSidebarOpen(false); }}
                onCountrySelect={(code, name) => { handleCountrySelect(code, name); setMobileSidebarOpen(false); }}
                locale={locale}
              />
            </div>
            <div
              className="flex-1 bg-void/70"
              onClick={() => setMobileSidebarOpen(false)}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export default function MapApp() {
  return (
    <NavigationProvider>
      <MapAppInner />
    </NavigationProvider>
  );
}
