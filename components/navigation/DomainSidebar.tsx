'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SearchInput } from '@/components/navigation/SearchInput';
import { WeatherBadge } from '@/components/ui/WeatherBadge';
import { getAllDomains, getDomainsByGroup, getGroupLabel, DOMAIN_GROUPS } from '@/lib/domains/registry';
import { AGGREGATE_DATA } from '@/lib/aggregate';
import { t } from '@/lib/utils/i18n';
import type { Locale } from '@/lib/domains/types';
import { cn } from '@/lib/utils/cn';

interface DomainSidebarProps {
  activeDomainId: string | null;
  activeIndicatorId: string | null;
  onDomainSelect: (domainId: string | null) => void;
  onIndicatorSelect: (indicatorId: string | null) => void;
  onCountrySelect: (geoCode: string, geoName: string) => void;
  locale: Locale;
}

export function DomainSidebar({
  activeDomainId,
  activeIndicatorId,
  onDomainSelect,
  onIndicatorSelect,
  onCountrySelect,
  locale,
}: DomainSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['economy', 'society', 'security', 'environment']));
  const domainsByGroup = getDomainsByGroup();
  const allDomains = getAllDomains();

  const countries = AGGREGATE_DATA.map((a) => ({
    geoCode: a.geoCode,
    geoName: a.geoName,
  })).sort((a, b) => a.geoName.localeCompare(b.geoName));

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const handleDomainClick = (domainId: string) => {
    if (activeDomainId === domainId) {
      onDomainSelect(null);
      onIndicatorSelect(null);
    } else {
      onDomainSelect(domainId);
      onIndicatorSelect(null);
    }
  };

  return (
    <aside
      className="w-full md:w-64 flex-shrink-0 h-full flex flex-col bg-surface border-r border-border-subtle overflow-hidden"
      aria-label="Navigation domaines"
    >
      {/* Search */}
      <div className="p-3 border-b border-border-subtle">
        <SearchInput
          countries={countries}
          onSelect={onCountrySelect}
          placeholder="Rechercher un pays…"
        />
      </div>

      {/* Global view */}
      <button
        onClick={() => { onDomainSelect(null); onIndicatorSelect(null); }}
        className={cn(
          'flex items-center gap-2 w-full px-3 py-2.5 text-sm text-left transition-colors duration-100',
          'border-b border-border-subtle',
          activeDomainId === null
            ? 'bg-elevated text-text-primary'
            : 'text-text-secondary hover:bg-elevated hover:text-text-primary'
        )}
        aria-current={activeDomainId === null ? 'page' : undefined}
      >
        <span className="text-base" aria-hidden="true">🌍</span>
        <span className="font-medium">Vue globale</span>
        {activeDomainId === null && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
        )}
      </button>

      {/* Domain groups */}
      <div className="flex-1 overflow-y-auto">
        {DOMAIN_GROUPS.map((group) => {
          const domainsInGroup = domainsByGroup.get(group.id);
          if (!domainsInGroup || domainsInGroup.length === 0) return null;
          const isExpanded = expandedGroups.has(group.id);

          return (
            <div key={group.id}>
              {/* Group header */}
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex items-center gap-2 w-full px-3 py-2 text-2xs font-semibold uppercase tracking-widest text-text-muted hover:text-text-secondary transition-colors duration-100 border-b border-border-subtle"
                aria-expanded={isExpanded}
              >
                {isExpanded
                  ? <ChevronDown size={11} aria-hidden="true" />
                  : <ChevronRight size={11} aria-hidden="true" />
                }
                {getGroupLabel(group.id, locale)}
              </button>

              {/* Domains */}
              {isExpanded && domainsInGroup.map((mod) => {
                const isActive = activeDomainId === mod.definition.id;

                return (
                  <div key={mod.definition.id}>
                    {/* Domain row */}
                    <button
                      onClick={() => handleDomainClick(mod.definition.id)}
                      className={cn(
                        'flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors duration-100',
                        isActive
                          ? 'bg-elevated text-text-primary border-l-2 border-accent-blue'
                          : 'text-text-secondary hover:bg-elevated hover:text-text-primary border-l-2 border-transparent'
                      )}
                      aria-expanded={isActive}
                    >
                      <span className="text-base" aria-hidden="true">{mod.definition.icon}</span>
                      <span className="flex-1 min-w-0 truncate">{t(mod.definition.label, locale)}</span>
                      {isActive
                        ? <ChevronDown size={12} className="text-text-muted flex-shrink-0" aria-hidden="true" />
                        : <ChevronRight size={12} className="text-text-muted flex-shrink-0" aria-hidden="true" />
                      }
                    </button>

                    {/* Indicators (when domain is active) */}
                    {isActive && (
                      <div className="bg-void/50 border-b border-border-subtle">
                        {mod.definition.indicators.map((ind) => {
                          const isIndActive = activeIndicatorId === ind.id;
                          return (
                            <button
                              key={ind.id}
                              onClick={() => onIndicatorSelect(isIndActive ? null : ind.id)}
                              className={cn(
                                'flex items-center gap-2 w-full pl-9 pr-3 py-1.5 text-xs text-left transition-colors duration-100',
                                isIndActive
                                  ? 'text-accent-blue bg-elevated'
                                  : 'text-text-muted hover:text-text-secondary hover:bg-elevated'
                              )}
                              aria-pressed={isIndActive}
                            >
                              <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                              <span className="flex-1 min-w-0 truncate">{t(ind.label, locale)}</span>
                              <span className="text-2xs text-text-muted flex-shrink-0">{t(ind.unitLabel, locale)}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border-subtle">
        <p className="text-2xs text-text-muted text-center">
          {allDomains.length} domaines · {AGGREGATE_DATA.length} pays
        </p>
      </div>
    </aside>
  );
}
