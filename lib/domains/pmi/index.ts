import type { DomainModule } from '@/lib/domains/types';

const pmiModule: DomainModule = {
  definition: {
    id: 'pmi',
    label: { fr: 'Activité économique (PMI)', en: 'Economic Activity (PMI)', es: 'Actividad económica (PMI)' },
    description: {
      fr: 'Indice des directeurs d\'achat (PMI) mesurant l\'activité manufacturière et des services. Au-dessus de 50 = expansion, en-dessous = contraction.',
      en: 'Purchasing Managers\' Index measuring manufacturing and services activity. Above 50 = expansion, below 50 = contraction.',
      es: 'Índice de Gestores de Compras (PMI) que mide la actividad manufacturera y de servicios. Por encima de 50 = expansión, por debajo = contracción.',
    },
    icon: '🏭',
    group: 'economy',
    active: true,
    seedSources: [
      'https://www.pmi.spglobal.com/',
      'https://tradingeconomics.com/country-list/manufacturing-pmi',
      'https://tradingeconomics.com/country-list/services-pmi',
    ],
    indicators: [
      {
        id: 'pmi_manufacturing',
        label: { fr: 'PMI Manufacturier', en: 'Manufacturing PMI', es: 'PMI Manufacturero' },
        description: {
          fr: 'Enquête mensuelle auprès des directeurs d\'achat du secteur manufacturier. Reflète les commandes, la production et l\'emploi industriel.',
          en: 'Monthly survey of purchasing managers in the manufacturing sector. Reflects orders, output and industrial employment.',
        },
        unit: 'index',
        unitLabel: { fr: 'indice', en: 'index', es: 'índice' },
        direction: 'higher_is_better',
        weight: 2,
        thresholds: { excellent: 55, good: 50, fair: 45, poor: 40 },
        minValue: 0,
        maxValue: 65,
      },
      {
        id: 'pmi_services',
        label: { fr: 'PMI Services', en: 'Services PMI', es: 'PMI Servicios' },
        description: {
          fr: 'Enquête mensuelle auprès des directeurs d\'achat du secteur des services. Reflète l\'activité commerciale et la demande.',
          en: 'Monthly survey of purchasing managers in the services sector. Reflects business activity and demand.',
        },
        unit: 'index',
        unitLabel: { fr: 'indice', en: 'index', es: 'índice' },
        direction: 'higher_is_better',
        weight: 2,
        thresholds: { excellent: 55, good: 50, fair: 45, poor: 40 },
        minValue: 0,
        maxValue: 65,
      },
    ],
  },
  seedData: [
    // ── Europe nordique ─────────────────────────────────────────────────
    { geoCode: 'SE', geoName: 'Sweden',         dataYear: 2026, values: { pmi_manufacturing: 56.1, pmi_services: 48.3 } },
    { geoCode: 'NO', geoName: 'Norway',         dataYear: 2026, values: { pmi_manufacturing: 51.2, pmi_services: 53.0 } },
    { geoCode: 'DK', geoName: 'Denmark',        dataYear: 2026, values: { pmi_manufacturing: 51.5, pmi_services: 52.5 } },
    { geoCode: 'FI', geoName: 'Finland',        dataYear: 2026, values: { pmi_manufacturing: 50.5, pmi_services: 50.8 } },
    // ── Europe de l'Ouest ────────────────────────────────────────────────
    { geoCode: 'DE', geoName: 'Germany',        dataYear: 2026, values: { pmi_manufacturing: 51.7, pmi_services: 51.2 } },
    { geoCode: 'FR', geoName: 'France',         dataYear: 2026, values: { pmi_manufacturing: 50.2, pmi_services: 48.3 } },
    { geoCode: 'GB', geoName: 'United Kingdom', dataYear: 2026, values: { pmi_manufacturing: 51.4, pmi_services: 51.2 } },
    { geoCode: 'NL', geoName: 'Netherlands',    dataYear: 2026, values: { pmi_manufacturing: 50.8, pmi_services: 51.5 } },
    { geoCode: 'CH', geoName: 'Switzerland',    dataYear: 2026, values: { pmi_manufacturing: 47.4, pmi_services: 54.2 } },
    { geoCode: 'AT', geoName: 'Austria',        dataYear: 2026, values: { pmi_manufacturing: 52.4, pmi_services: 51.5 } },
    { geoCode: 'IE', geoName: 'Ireland',        dataYear: 2026, values: { pmi_manufacturing: 53.1, pmi_services: 51.8 } },
    // ── Europe du Sud ────────────────────────────────────────────────────
    { geoCode: 'IT', geoName: 'Italy',          dataYear: 2026, values: { pmi_manufacturing: 50.6, pmi_services: 52.3 } },
    { geoCode: 'ES', geoName: 'Spain',          dataYear: 2026, values: { pmi_manufacturing: 50.0, pmi_services: 51.9 } },
    { geoCode: 'GR', geoName: 'Greece',         dataYear: 2026, values: { pmi_manufacturing: 54.4, pmi_services: 52.5 } },
    // ── Europe centrale & orientale ──────────────────────────────────────
    { geoCode: 'PL', geoName: 'Poland',         dataYear: 2026, values: { pmi_manufacturing: 47.1, pmi_services: 51.2 } },
    { geoCode: 'CZ', geoName: 'Czechia',        dataYear: 2026, values: { pmi_manufacturing: 50.0, pmi_services: 50.8 } },
    { geoCode: 'HU', geoName: 'Hungary',        dataYear: 2026, values: { pmi_manufacturing: 51.3, pmi_services: 49.5 } },
    { geoCode: 'RO', geoName: 'Romania',        dataYear: 2026, values: { pmi_manufacturing: 45.3, pmi_services: 50.2 } },
    // ── Amérique du Nord & Océanie ────────────────────────────────────────
    { geoCode: 'US', geoName: 'United States',  dataYear: 2026, values: { pmi_manufacturing: 52.4, pmi_services: 51.1 } },
    { geoCode: 'CA', geoName: 'Canada',         dataYear: 2026, values: { pmi_manufacturing: 51.0, pmi_services: 46.5 } },
    { geoCode: 'AU', geoName: 'Australia',      dataYear: 2026, values: { pmi_manufacturing: 50.1, pmi_services: 46.6 } },
    { geoCode: 'NZ', geoName: 'New Zealand',    dataYear: 2026, values: { pmi_manufacturing: 55.0, pmi_services: 48.0 } },
    // ── Asie de l'Est ────────────────────────────────────────────────────
    { geoCode: 'JP', geoName: 'Japan',          dataYear: 2026, values: { pmi_manufacturing: 51.4, pmi_services: 52.8 } },
    { geoCode: 'CN', geoName: 'China',          dataYear: 2026, values: { pmi_manufacturing: 52.1, pmi_services: 56.7 } },
    { geoCode: 'KR', geoName: 'South Korea',    dataYear: 2026, values: { pmi_manufacturing: 51.1, pmi_services: 52.0 } },
    { geoCode: 'TW', geoName: 'Taiwan',         dataYear: 2026, values: { pmi_manufacturing: 55.2, pmi_services: 51.5 } },
    { geoCode: 'HK', geoName: 'Hong Kong',      dataYear: 2026, values: { pmi_manufacturing: 53.3, pmi_services: 51.2 } },
    { geoCode: 'MN', geoName: 'Mongolia',       dataYear: 2026, values: { pmi_manufacturing: 51.1, pmi_services: 44.5 } },
    // ── Asie du Sud-Est ──────────────────────────────────────────────────
    { geoCode: 'SG', geoName: 'Singapore',      dataYear: 2026, values: { pmi_manufacturing: 50.6, pmi_services: 52.5 } },
    { geoCode: 'MY', geoName: 'Malaysia',       dataYear: 2026, values: { pmi_manufacturing: 49.3, pmi_services: 50.5 } },
    { geoCode: 'TH', geoName: 'Thailand',       dataYear: 2026, values: { pmi_manufacturing: 53.5, pmi_services: 51.5 } },
    { geoCode: 'ID', geoName: 'Indonesia',      dataYear: 2026, values: { pmi_manufacturing: 53.8, pmi_services: 52.5 } },
    { geoCode: 'VN', geoName: 'Vietnam',        dataYear: 2026, values: { pmi_manufacturing: 54.3, pmi_services: 53.5 } },
    { geoCode: 'PH', geoName: 'Philippines',    dataYear: 2026, values: { pmi_manufacturing: 54.6, pmi_services: 55.0 } },
    { geoCode: 'MM', geoName: 'Myanmar',        dataYear: 2026, values: { pmi_manufacturing: 51.5, pmi_services: 48.0 } },
    // ── Asie du Sud ──────────────────────────────────────────────────────
    { geoCode: 'IN', geoName: 'India',          dataYear: 2026, values: { pmi_manufacturing: 53.8, pmi_services: 57.2 } },
    { geoCode: 'LK', geoName: 'Sri Lanka',      dataYear: 2026, values: { pmi_manufacturing: 56.8, pmi_services: 54.4 } },
    // ── Asie centrale ────────────────────────────────────────────────────
    { geoCode: 'KZ', geoName: 'Kazakhstan',     dataYear: 2026, values: { pmi_manufacturing: 48.1, pmi_services: 48.0 } },
    // ── Moyen-Orient & Afrique du Nord ───────────────────────────────────
    { geoCode: 'SA', geoName: 'Saudi Arabia',   dataYear: 2026, values: { pmi_manufacturing: 56.1, pmi_services: 54.5 } },
    { geoCode: 'AE', geoName: 'United Arab Emirates', dataYear: 2026, values: { pmi_manufacturing: 55.0, pmi_services: 55.5 } },
    { geoCode: 'QA', geoName: 'Qatar',          dataYear: 2026, values: { pmi_manufacturing: 50.6, pmi_services: 52.0 } },
    { geoCode: 'LB', geoName: 'Lebanon',        dataYear: 2026, values: { pmi_manufacturing: 51.2, pmi_services: 46.5 } },
    { geoCode: 'EG', geoName: 'Egypt',          dataYear: 2026, values: { pmi_manufacturing: 48.9, pmi_services: 47.0 } },
    // ── Afrique subsaharienne ────────────────────────────────────────────
    { geoCode: 'NG', geoName: 'Nigeria',        dataYear: 2026, values: { pmi_manufacturing: 51.0, pmi_services: 55.3 } },
    { geoCode: 'KE', geoName: 'Kenya',          dataYear: 2026, values: { pmi_manufacturing: 50.4, pmi_services: 51.5 } },
    { geoCode: 'ZA', geoName: 'South Africa',   dataYear: 2026, values: { pmi_manufacturing: 47.4, pmi_services: 48.5 } },
    // ── Amérique Latine ──────────────────────────────────────────────────
    { geoCode: 'BR', geoName: 'Brazil',         dataYear: 2026, values: { pmi_manufacturing: 47.3, pmi_services: 53.1 } },
    { geoCode: 'MX', geoName: 'Mexico',         dataYear: 2026, values: { pmi_manufacturing: 47.1, pmi_services: 50.0 } },
    { geoCode: 'CO', geoName: 'Colombia',       dataYear: 2026, values: { pmi_manufacturing: 51.6, pmi_services: 52.5 } },
    // ── Ex-URSS ──────────────────────────────────────────────────────────
    { geoCode: 'RU', geoName: 'Russia',         dataYear: 2026, values: { pmi_manufacturing: 49.5, pmi_services: 51.3 } },
    { geoCode: 'TR', geoName: 'Turkey',         dataYear: 2026, values: { pmi_manufacturing: 49.3, pmi_services: 51.5 } },
  ],
  seedDataPrev: [
    // ── Europe nordique ─────────────────────────────────────────────────── (PMI Q4 2025)
    { geoCode: 'SE', geoName: 'Sweden',         dataYear: 2025, values: { pmi_manufacturing: 52.8, pmi_services: 47.5 } },
    { geoCode: 'NO', geoName: 'Norway',         dataYear: 2025, values: { pmi_manufacturing: 50.5, pmi_services: 52.0 } },
    { geoCode: 'DK', geoName: 'Denmark',        dataYear: 2025, values: { pmi_manufacturing: 50.8, pmi_services: 51.5 } },
    { geoCode: 'FI', geoName: 'Finland',        dataYear: 2025, values: { pmi_manufacturing: 49.8, pmi_services: 50.2 } },
    // ── Europe de l'Ouest ────────────────────────────────────────────────
    { geoCode: 'DE', geoName: 'Germany',        dataYear: 2025, values: { pmi_manufacturing: 46.5, pmi_services: 49.8 } },
    { geoCode: 'FR', geoName: 'France',         dataYear: 2025, values: { pmi_manufacturing: 43.0, pmi_services: 46.5 } },
    { geoCode: 'GB', geoName: 'United Kingdom', dataYear: 2025, values: { pmi_manufacturing: 49.5, pmi_services: 50.5 } },
    { geoCode: 'NL', geoName: 'Netherlands',    dataYear: 2025, values: { pmi_manufacturing: 49.0, pmi_services: 50.8 } },
    { geoCode: 'CH', geoName: 'Switzerland',    dataYear: 2025, values: { pmi_manufacturing: 46.0, pmi_services: 52.5 } },
    { geoCode: 'AT', geoName: 'Austria',        dataYear: 2025, values: { pmi_manufacturing: 49.5, pmi_services: 50.5 } },
    { geoCode: 'IE', geoName: 'Ireland',        dataYear: 2025, values: { pmi_manufacturing: 51.5, pmi_services: 51.0 } },
    // ── Europe du Sud ────────────────────────────────────────────────────
    { geoCode: 'IT', geoName: 'Italy',          dataYear: 2025, values: { pmi_manufacturing: 48.5, pmi_services: 51.0 } },
    { geoCode: 'ES', geoName: 'Spain',          dataYear: 2025, values: { pmi_manufacturing: 48.8, pmi_services: 51.5 } },
    { geoCode: 'GR', geoName: 'Greece',         dataYear: 2025, values: { pmi_manufacturing: 52.5, pmi_services: 52.0 } },
    // ── Europe centrale & orientale ──────────────────────────────────────
    { geoCode: 'PL', geoName: 'Poland',         dataYear: 2025, values: { pmi_manufacturing: 45.8, pmi_services: 50.5 } },
    { geoCode: 'CZ', geoName: 'Czechia',        dataYear: 2025, values: { pmi_manufacturing: 48.5, pmi_services: 50.0 } },
    { geoCode: 'HU', geoName: 'Hungary',        dataYear: 2025, values: { pmi_manufacturing: 49.8, pmi_services: 49.0 } },
    { geoCode: 'RO', geoName: 'Romania',        dataYear: 2025, values: { pmi_manufacturing: 44.0, pmi_services: 49.5 } },
    // ── Amérique du Nord & Océanie ────────────────────────────────────────
    { geoCode: 'US', geoName: 'United States',  dataYear: 2025, values: { pmi_manufacturing: 50.5, pmi_services: 52.5 } },
    { geoCode: 'CA', geoName: 'Canada',         dataYear: 2025, values: { pmi_manufacturing: 49.8, pmi_services: 48.5 } },
    { geoCode: 'AU', geoName: 'Australia',      dataYear: 2025, values: { pmi_manufacturing: 49.0, pmi_services: 48.0 } },
    { geoCode: 'NZ', geoName: 'New Zealand',    dataYear: 2025, values: { pmi_manufacturing: 52.0, pmi_services: 49.5 } },
    // ── Asie de l'Est ────────────────────────────────────────────────────
    { geoCode: 'JP', geoName: 'Japan',          dataYear: 2025, values: { pmi_manufacturing: 49.5, pmi_services: 51.5 } },
    { geoCode: 'CN', geoName: 'China',          dataYear: 2025, values: { pmi_manufacturing: 50.5, pmi_services: 54.5 } },
    { geoCode: 'KR', geoName: 'South Korea',    dataYear: 2025, values: { pmi_manufacturing: 49.8, pmi_services: 51.0 } },
    { geoCode: 'TW', geoName: 'Taiwan',         dataYear: 2025, values: { pmi_manufacturing: 53.5, pmi_services: 51.0 } },
    { geoCode: 'HK', geoName: 'Hong Kong',      dataYear: 2025, values: { pmi_manufacturing: 51.5, pmi_services: 50.5 } },
    { geoCode: 'MN', geoName: 'Mongolia',       dataYear: 2025, values: { pmi_manufacturing: 50.5, pmi_services: 44.0 } },
    // ── Asie du Sud-Est ──────────────────────────────────────────────────
    { geoCode: 'SG', geoName: 'Singapore',      dataYear: 2025, values: { pmi_manufacturing: 49.8, pmi_services: 52.0 } },
    { geoCode: 'MY', geoName: 'Malaysia',       dataYear: 2025, values: { pmi_manufacturing: 50.5, pmi_services: 50.0 } },
    { geoCode: 'TH', geoName: 'Thailand',       dataYear: 2025, values: { pmi_manufacturing: 51.8, pmi_services: 51.0 } },
    { geoCode: 'ID', geoName: 'Indonesia',      dataYear: 2025, values: { pmi_manufacturing: 52.0, pmi_services: 52.0 } },
    { geoCode: 'VN', geoName: 'Vietnam',        dataYear: 2025, values: { pmi_manufacturing: 53.5, pmi_services: 53.0 } },
    { geoCode: 'PH', geoName: 'Philippines',    dataYear: 2025, values: { pmi_manufacturing: 53.5, pmi_services: 54.5 } },
    { geoCode: 'MM', geoName: 'Myanmar',        dataYear: 2025, values: { pmi_manufacturing: 50.8, pmi_services: 47.5 } },
    // ── Asie du Sud ──────────────────────────────────────────────────────
    { geoCode: 'IN', geoName: 'India',          dataYear: 2025, values: { pmi_manufacturing: 57.5, pmi_services: 58.5 } },
    { geoCode: 'LK', geoName: 'Sri Lanka',      dataYear: 2025, values: { pmi_manufacturing: 54.0, pmi_services: 53.0 } },
    // ── Asie centrale ────────────────────────────────────────────────────
    { geoCode: 'KZ', geoName: 'Kazakhstan',     dataYear: 2025, values: { pmi_manufacturing: 49.5, pmi_services: 48.5 } },
    // ── Moyen-Orient & Afrique du Nord ───────────────────────────────────
    { geoCode: 'SA', geoName: 'Saudi Arabia',   dataYear: 2025, values: { pmi_manufacturing: 54.5, pmi_services: 54.0 } },
    { geoCode: 'AE', geoName: 'United Arab Emirates', dataYear: 2025, values: { pmi_manufacturing: 54.0, pmi_services: 55.0 } },
    { geoCode: 'QA', geoName: 'Qatar',          dataYear: 2025, values: { pmi_manufacturing: 51.0, pmi_services: 51.5 } },
    { geoCode: 'LB', geoName: 'Lebanon',        dataYear: 2025, values: { pmi_manufacturing: 49.5, pmi_services: 46.0 } },
    { geoCode: 'EG', geoName: 'Egypt',          dataYear: 2025, values: { pmi_manufacturing: 47.5, pmi_services: 46.5 } },
    // ── Afrique subsaharienne ────────────────────────────────────────────
    { geoCode: 'NG', geoName: 'Nigeria',        dataYear: 2025, values: { pmi_manufacturing: 50.5, pmi_services: 54.0 } },
    { geoCode: 'KE', geoName: 'Kenya',          dataYear: 2025, values: { pmi_manufacturing: 49.8, pmi_services: 51.0 } },
    { geoCode: 'ZA', geoName: 'South Africa',   dataYear: 2025, values: { pmi_manufacturing: 48.0, pmi_services: 48.0 } },
    // ── Amérique Latine ──────────────────────────────────────────────────
    { geoCode: 'BR', geoName: 'Brazil',         dataYear: 2025, values: { pmi_manufacturing: 49.5, pmi_services: 52.5 } },
    { geoCode: 'MX', geoName: 'Mexico',         dataYear: 2025, values: { pmi_manufacturing: 48.5, pmi_services: 49.5 } },
    { geoCode: 'CO', geoName: 'Colombia',       dataYear: 2025, values: { pmi_manufacturing: 50.5, pmi_services: 52.0 } },
    // ── Ex-URSS ──────────────────────────────────────────────────────────
    { geoCode: 'RU', geoName: 'Russia',         dataYear: 2025, values: { pmi_manufacturing: 50.5, pmi_services: 50.5 } },
    { geoCode: 'TR', geoName: 'Turkey',         dataYear: 2025, values: { pmi_manufacturing: 48.0, pmi_services: 51.0 } },
  ],
};

export default pmiModule;
