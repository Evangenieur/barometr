/**
 * Domain Registry — single place to register/de-register domains.
 * To add a domain: import its module and add it to DOMAIN_MODULES.
 * No other file needs to change.
 */
import type { DomainGroup, DomainModule } from '@/lib/domains/types';

import healthModule from '@/lib/domains/health';
import ecologyModule from '@/lib/domains/ecology';
import corruptionModule from '@/lib/domains/corruption';
import pensionsModule from '@/lib/domains/pensions';
import costOfLivingModule from '@/lib/domains/cost-of-living';
import wellbeingModule from '@/lib/domains/wellbeing';
import fiscalModule from '@/lib/domains/fiscal';
import educationModule from '@/lib/domains/education';
import demographicsModule from '@/lib/domains/demographics';
import securityModule from '@/lib/domains/security';
import infrastructureModule from '@/lib/domains/infrastructure';
import economicSectorsModule from '@/lib/domains/economic-sectors';
import commoditiesModule from '@/lib/domains/commodities';
import geopoliticalRiskModule from '@/lib/domains/geopolitical-risk';
import economicUncertaintyModule from '@/lib/domains/economic-uncertainty';
import digitalModule from '@/lib/domains/digital';
import equalityModule from '@/lib/domains/equality';
import waterBiodiversityModule from '@/lib/domains/water-biodiversity';
import climateRiskModule from '@/lib/domains/climate-risk';

// ─── Domain groups ────────────────────────────────────────────────────────────

export const DOMAIN_GROUPS: DomainGroup[] = [
  { id: 'economy',     label: { fr: 'Économie',      en: 'Economy',     es: 'Economía'     } },
  { id: 'society',     label: { fr: 'Société',       en: 'Society',     es: 'Sociedad'     } },
  { id: 'security',    label: { fr: 'Sécurité',      en: 'Security',    es: 'Seguridad'    } },
  { id: 'environment', label: { fr: 'Environnement', en: 'Environment', es: 'Medio ambiente' } },
];

// ─── Domain registry ──────────────────────────────────────────────────────────

const ALL_DOMAIN_MODULES: DomainModule[] = [
  // Society
  healthModule,
  pensionsModule,
  wellbeingModule,
  educationModule,
  demographicsModule,
  infrastructureModule,
  equalityModule,
  digitalModule,
  // Economy
  costOfLivingModule,
  fiscalModule,
  economicSectorsModule,
  commoditiesModule,
  economicUncertaintyModule,
  // Security
  corruptionModule,
  securityModule,
  geopoliticalRiskModule,
  // Environment
  ecologyModule,
  waterBiodiversityModule,
  climateRiskModule,
];

/** Map<domainId, DomainModule> — includes seed data for aggregate computation */
export const DOMAIN_REGISTRY: Map<string, DomainModule> = new Map(
  ALL_DOMAIN_MODULES
    .filter((m) => m.definition.active)
    .map((m) => [m.definition.id, m])
);

/** Sorted list of active domain definitions */
export function getAllDomains(): DomainModule[] {
  return [...DOMAIN_REGISTRY.values()];
}

/** Get domain by id */
export function getDomain(id: string): DomainModule | undefined {
  return DOMAIN_REGISTRY.get(id);
}

/** Get the domain module that owns a given indicator id */
export function getDomainForIndicator(indicatorId: string): DomainModule | undefined {
  for (const mod of DOMAIN_REGISTRY.values()) {
    if (mod.definition.indicators.some((i) => i.id === indicatorId)) {
      return mod;
    }
  }
  return undefined;
}

/** Get group label */
export function getGroupLabel(groupId: string, locale: string): string {
  const group = DOMAIN_GROUPS.find((g) => g.id === groupId);
  if (!group) return groupId;
  return group.label[locale] ?? group.label['en'] ?? groupId;
}

/** Domains grouped by group id */
export function getDomainsByGroup(): Map<string, DomainModule[]> {
  const result = new Map<string, DomainModule[]>();
  for (const group of DOMAIN_GROUPS) {
    result.set(group.id, []);
  }
  for (const mod of DOMAIN_REGISTRY.values()) {
    const groupList = result.get(mod.definition.group);
    if (groupList) {
      groupList.push(mod);
    } else {
      result.set(mod.definition.group, [mod]);
    }
  }
  // Remove empty groups
  return new Map([...result].filter(([, v]) => v.length > 0));
}
