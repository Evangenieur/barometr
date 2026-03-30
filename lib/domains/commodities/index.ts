import type { DomainModule } from '@/lib/domains/types';

const commoditiesModule: DomainModule = {
  definition: {
    id: 'commodities',
    label: { fr: 'Matières premières', en: 'Commodities', es: 'Materias primas' },
    description: {
      fr: 'Dépendance et souveraineté sur les ressources naturelles : énergie, alimentation et sécurité des approvisionnements.',
      en: 'Dependence and sovereignty over natural resources: energy, food supply security and strategic reserves.',
      es: 'Dependencia y soberanía sobre los recursos naturales: energía, seguridad alimentaria y reservas estratégicas.',
    },
    icon: '⛽',
    group: 'economy',
    active: true,
    seedSources: [
      'https://www.iea.org/reports/world-energy-outlook',
      'https://www.foodsecurityindex.eiu.com/',
      'https://ec.europa.eu/eurostat/statistics-explained/index.php/Energy_dependence',
    ],
    indicators: [
      {
        id: 'energy_import_dependence',
        label: { fr: 'Dépendance énergétique importée', en: 'Energy import dependence', es: 'Dependencia energética importada' },
        description: {
          fr: "Part de la consommation énergétique nationale couverte par les importations",
          en: 'Share of national energy consumption covered by imports',
        },
        unit: 'percent',
        unitLabel: { fr: '% énergie importée', en: '% energy imported', es: '% energía importada' },
        direction: 'lower_is_better',
        weight: 3,
        thresholds: { excellent: 15, good: 35, fair: 55, poor: 75 },
        minValue: 0,
        maxValue: 100,
      },
      {
        id: 'food_security_index',
        label: { fr: 'Indice de sécurité alimentaire', en: 'Food security index', es: 'Índice de seguridad alimentaria' },
        description: {
          fr: "Score composite mesurant la disponibilité, l'accessibilité et la qualité alimentaires d'un pays (EIU)",
          en: 'Composite score measuring food availability, affordability and quality in a country (EIU)',
        },
        unit: 'index',
        unitLabel: { fr: 'indice /100', en: 'index /100', es: 'índice /100' },
        direction: 'higher_is_better',
        weight: 4,
        thresholds: { excellent: 80, good: 65, fair: 48, poor: 30 },
        minValue: 0,
        maxValue: 100,
      },
      {
        id: 'critical_mineral_reserves',
        label: { fr: 'Réserves minérales stratégiques', en: 'Strategic mineral reserves', es: 'Reservas minerales estratégicas' },
        description: {
          fr: "Dotation estimée en minerais critiques (lithium, cobalt, terres rares) essentiels aux technologies vertes et à la défense",
          en: 'Estimated endowment of critical minerals (lithium, cobalt, rare earths) essential for green technologies and defence',
        },
        unit: 'index',
        unitLabel: { fr: 'indice /100', en: 'index /100', es: 'índice /100' },
        direction: 'higher_is_better',
        weight: 2,
        thresholds: { excellent: 70, good: 50, fair: 30, poor: 15 },
        minValue: 0,
        maxValue: 100,
      },
      {
        id: 'commodity_export_ratio',
        label: { fr: 'Exportations de matières premières (% export)', en: 'Commodity exports (% of exports)', es: 'Exportaciones de materias primas (% export.)' },
        description: {
          fr: "Part des matières premières brutes dans le total des exportations du pays",
          en: 'Share of raw commodities in the country\'s total exports',
        },
        unit: 'percent',
        unitLabel: { fr: '%', en: '%', es: '%' },
        direction: 'higher_is_better',
        weight: 1,
        thresholds: { excellent: 40, good: 25, fair: 15, poor: 5 },
        minValue: 0,
        maxValue: 100,
      },
    ],
  },
  seedData: [
    // ── Europe du Nord & Scandinavie ─────────────────────────────────────
    { geoCode: 'NO', geoName: 'Norway',         dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 86, critical_mineral_reserves: 55, commodity_export_ratio: 72 } },
    { geoCode: 'IS', geoName: 'Iceland',        dataYear: 2023, values: { energy_import_dependence: 20, food_security_index: 82, critical_mineral_reserves: 30, commodity_export_ratio: 42 } },
    { geoCode: 'SE', geoName: 'Sweden',         dataYear: 2023, values: { energy_import_dependence: 28, food_security_index: 84, critical_mineral_reserves: 42, commodity_export_ratio: 18 } },
    { geoCode: 'DK', geoName: 'Denmark',        dataYear: 2023, values: { energy_import_dependence: 18, food_security_index: 84, critical_mineral_reserves: 25, commodity_export_ratio: 22 } },
    { geoCode: 'FI', geoName: 'Finland',        dataYear: 2023, values: { energy_import_dependence: 42, food_security_index: 82, critical_mineral_reserves: 38, commodity_export_ratio: 20 } },
    { geoCode: 'EE', geoName: 'Estonia',        dataYear: 2023, values: { energy_import_dependence: 12, food_security_index: 76, critical_mineral_reserves: 22, commodity_export_ratio: 16 } },
    { geoCode: 'LV', geoName: 'Latvia',         dataYear: 2023, values: { energy_import_dependence: 45, food_security_index: 73, critical_mineral_reserves: 18, commodity_export_ratio: 20 } },
    { geoCode: 'LT', geoName: 'Lithuania',      dataYear: 2023, values: { energy_import_dependence: 55, food_security_index: 75, critical_mineral_reserves: 16, commodity_export_ratio: 22 } },
    { geoCode: 'IE', geoName: 'Ireland',        dataYear: 2023, values: { energy_import_dependence: 70, food_security_index: 83, critical_mineral_reserves: 28, commodity_export_ratio: 8  } },

    // ── Europe occidentale ───────────────────────────────────────────────
    { geoCode: 'FR', geoName: 'France',         dataYear: 2023, values: { energy_import_dependence: 45, food_security_index: 85, critical_mineral_reserves: 35, commodity_export_ratio: 10 } },
    { geoCode: 'DE', geoName: 'Germany',        dataYear: 2023, values: { energy_import_dependence: 65, food_security_index: 86, critical_mineral_reserves: 32, commodity_export_ratio: 6  } },
    { geoCode: 'GB', geoName: 'United Kingdom', dataYear: 2023, values: { energy_import_dependence: 38, food_security_index: 84, critical_mineral_reserves: 30, commodity_export_ratio: 12 } },
    { geoCode: 'NL', geoName: 'Netherlands',    dataYear: 2023, values: { energy_import_dependence: 52, food_security_index: 84, critical_mineral_reserves: 22, commodity_export_ratio: 12 } },
    { geoCode: 'BE', geoName: 'Belgium',        dataYear: 2023, values: { energy_import_dependence: 78, food_security_index: 85, critical_mineral_reserves: 20, commodity_export_ratio: 5  } },
    { geoCode: 'AT', geoName: 'Austria',        dataYear: 2023, values: { energy_import_dependence: 65, food_security_index: 83, critical_mineral_reserves: 28, commodity_export_ratio: 7  } },
    { geoCode: 'CH', geoName: 'Switzerland',    dataYear: 2023, values: { energy_import_dependence: 72, food_security_index: 87, critical_mineral_reserves: 22, commodity_export_ratio: 4  } },
    { geoCode: 'LU', geoName: 'Luxembourg',     dataYear: 2023, values: { energy_import_dependence: 95, food_security_index: 84, critical_mineral_reserves: 12, commodity_export_ratio: 3  } },

    // ── Europe méridionale ───────────────────────────────────────────────
    { geoCode: 'IT', geoName: 'Italy',          dataYear: 2023, values: { energy_import_dependence: 75, food_security_index: 82, critical_mineral_reserves: 25, commodity_export_ratio: 5  } },
    { geoCode: 'ES', geoName: 'Spain',          dataYear: 2023, values: { energy_import_dependence: 68, food_security_index: 80, critical_mineral_reserves: 28, commodity_export_ratio: 8  } },
    { geoCode: 'PT', geoName: 'Portugal',       dataYear: 2023, values: { energy_import_dependence: 72, food_security_index: 75, critical_mineral_reserves: 40, commodity_export_ratio: 10 } },
    { geoCode: 'GR', geoName: 'Greece',         dataYear: 2023, values: { energy_import_dependence: 72, food_security_index: 72, critical_mineral_reserves: 22, commodity_export_ratio: 18 } },
    { geoCode: 'HR', geoName: 'Croatia',        dataYear: 2023, values: { energy_import_dependence: 52, food_security_index: 71, critical_mineral_reserves: 20, commodity_export_ratio: 14 } },
    { geoCode: 'SI', geoName: 'Slovenia',       dataYear: 2023, values: { energy_import_dependence: 50, food_security_index: 76, critical_mineral_reserves: 18, commodity_export_ratio: 8  } },
    { geoCode: 'MT', geoName: 'Malta',          dataYear: 2023, values: { energy_import_dependence: 97, food_security_index: 74, critical_mineral_reserves: 8,  commodity_export_ratio: 2  } },
    { geoCode: 'CY', geoName: 'Cyprus',         dataYear: 2023, values: { energy_import_dependence: 92, food_security_index: 72, critical_mineral_reserves: 15, commodity_export_ratio: 10 } },
    { geoCode: 'AL', geoName: 'Albania',        dataYear: 2023, values: { energy_import_dependence: 35, food_security_index: 58, critical_mineral_reserves: 32, commodity_export_ratio: 22 } },
    { geoCode: 'RS', geoName: 'Serbia',         dataYear: 2023, values: { energy_import_dependence: 38, food_security_index: 65, critical_mineral_reserves: 35, commodity_export_ratio: 18 } },
    { geoCode: 'BA', geoName: 'Bosnia and Herzegovina', dataYear: 2023, values: { energy_import_dependence: 32, food_security_index: 58, critical_mineral_reserves: 25, commodity_export_ratio: 20 } },
    { geoCode: 'MK', geoName: 'North Macedonia', dataYear: 2023, values: { energy_import_dependence: 48, food_security_index: 60, critical_mineral_reserves: 22, commodity_export_ratio: 15 } },
    { geoCode: 'ME', geoName: 'Montenegro',     dataYear: 2023, values: { energy_import_dependence: 40, food_security_index: 62, critical_mineral_reserves: 18, commodity_export_ratio: 12 } },

    // ── Europe centrale & orientale ──────────────────────────────────────
    { geoCode: 'PL', geoName: 'Poland',         dataYear: 2023, values: { energy_import_dependence: 48, food_security_index: 78, critical_mineral_reserves: 35, commodity_export_ratio: 12 } },
    { geoCode: 'CZ', geoName: 'Czechia',        dataYear: 2023, values: { energy_import_dependence: 55, food_security_index: 80, critical_mineral_reserves: 28, commodity_export_ratio: 8  } },
    { geoCode: 'RO', geoName: 'Romania',        dataYear: 2023, values: { energy_import_dependence: 25, food_security_index: 70, critical_mineral_reserves: 30, commodity_export_ratio: 25 } },
    { geoCode: 'BG', geoName: 'Bulgaria',       dataYear: 2023, values: { energy_import_dependence: 35, food_security_index: 68, critical_mineral_reserves: 30, commodity_export_ratio: 18 } },
    { geoCode: 'SK', geoName: 'Slovakia',       dataYear: 2023, values: { energy_import_dependence: 60, food_security_index: 76, critical_mineral_reserves: 22, commodity_export_ratio: 7  } },
    { geoCode: 'HU', geoName: 'Hungary',        dataYear: 2023, values: { energy_import_dependence: 58, food_security_index: 74, critical_mineral_reserves: 20, commodity_export_ratio: 10 } },
    { geoCode: 'UA', geoName: 'Ukraine',        dataYear: 2023, values: { energy_import_dependence: 40, food_security_index: 60, critical_mineral_reserves: 62, commodity_export_ratio: 42 } },
    { geoCode: 'MD', geoName: 'Moldova',        dataYear: 2023, values: { energy_import_dependence: 88, food_security_index: 52, critical_mineral_reserves: 12, commodity_export_ratio: 25 } },
    { geoCode: 'BY', geoName: 'Belarus',        dataYear: 2023, values: { energy_import_dependence: 85, food_security_index: 66, critical_mineral_reserves: 25, commodity_export_ratio: 30 } },

    // ── Russie & Asie centrale ───────────────────────────────────────────
    { geoCode: 'RU', geoName: 'Russia',         dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 74, critical_mineral_reserves: 95, commodity_export_ratio: 60 } },
    { geoCode: 'KZ', geoName: 'Kazakhstan',     dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 68, critical_mineral_reserves: 80, commodity_export_ratio: 70 } },
    { geoCode: 'UZ', geoName: 'Uzbekistan',     dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 55, critical_mineral_reserves: 55, commodity_export_ratio: 45 } },
    { geoCode: 'TM', geoName: 'Turkmenistan',   dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 48, critical_mineral_reserves: 50, commodity_export_ratio: 82 } },
    { geoCode: 'AZ', geoName: 'Azerbaijan',     dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 58, critical_mineral_reserves: 42, commodity_export_ratio: 85 } },
    { geoCode: 'GE', geoName: 'Georgia',        dataYear: 2023, values: { energy_import_dependence: 72, food_security_index: 56, critical_mineral_reserves: 22, commodity_export_ratio: 20 } },
    { geoCode: 'AM', geoName: 'Armenia',        dataYear: 2023, values: { energy_import_dependence: 75, food_security_index: 55, critical_mineral_reserves: 30, commodity_export_ratio: 25 } },
    { geoCode: 'MN', geoName: 'Mongolia',       dataYear: 2023, values: { energy_import_dependence: 10, food_security_index: 48, critical_mineral_reserves: 70, commodity_export_ratio: 78 } },

    // ── Amérique du Nord ─────────────────────────────────────────────────
    { geoCode: 'US', geoName: 'United States',  dataYear: 2023, values: { energy_import_dependence: 5,  food_security_index: 90, critical_mineral_reserves: 82, commodity_export_ratio: 18 } },
    { geoCode: 'CA', geoName: 'Canada',         dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 88, critical_mineral_reserves: 75, commodity_export_ratio: 38 } },
    { geoCode: 'MX', geoName: 'Mexico',         dataYear: 2023, values: { energy_import_dependence: 15, food_security_index: 68, critical_mineral_reserves: 65, commodity_export_ratio: 30 } },

    // ── Amérique centrale & Caraïbes ─────────────────────────────────────
    { geoCode: 'GT', geoName: 'Guatemala',      dataYear: 2023, values: { energy_import_dependence: 60, food_security_index: 40, critical_mineral_reserves: 18, commodity_export_ratio: 30 } },
    { geoCode: 'CR', geoName: 'Costa Rica',     dataYear: 2023, values: { energy_import_dependence: 50, food_security_index: 65, critical_mineral_reserves: 12, commodity_export_ratio: 25 } },
    { geoCode: 'PA', geoName: 'Panama',         dataYear: 2023, values: { energy_import_dependence: 75, food_security_index: 62, critical_mineral_reserves: 30, commodity_export_ratio: 12 } },
    { geoCode: 'DO', geoName: 'Dominican Republic', dataYear: 2023, values: { energy_import_dependence: 82, food_security_index: 55, critical_mineral_reserves: 22, commodity_export_ratio: 15 } },
    { geoCode: 'CU', geoName: 'Cuba',           dataYear: 2023, values: { energy_import_dependence: 70, food_security_index: 48, critical_mineral_reserves: 38, commodity_export_ratio: 30 } },
    { geoCode: 'JM', geoName: 'Jamaica',        dataYear: 2023, values: { energy_import_dependence: 88, food_security_index: 55, critical_mineral_reserves: 28, commodity_export_ratio: 20 } },
    { geoCode: 'HN', geoName: 'Honduras',       dataYear: 2023, values: { energy_import_dependence: 65, food_security_index: 38, critical_mineral_reserves: 15, commodity_export_ratio: 22 } },
    { geoCode: 'TT', geoName: 'Trinidad and Tobago', dataYear: 2023, values: { energy_import_dependence: 0, food_security_index: 65, critical_mineral_reserves: 20, commodity_export_ratio: 72 } },

    // ── Amérique du Sud ──────────────────────────────────────────────────
    { geoCode: 'BR', geoName: 'Brazil',         dataYear: 2023, values: { energy_import_dependence: 8,  food_security_index: 64, critical_mineral_reserves: 78, commodity_export_ratio: 58 } },
    { geoCode: 'AR', geoName: 'Argentina',      dataYear: 2023, values: { energy_import_dependence: 10, food_security_index: 65, critical_mineral_reserves: 70, commodity_export_ratio: 62 } },
    { geoCode: 'CL', geoName: 'Chile',          dataYear: 2023, values: { energy_import_dependence: 60, food_security_index: 65, critical_mineral_reserves: 82, commodity_export_ratio: 62 } },
    { geoCode: 'CO', geoName: 'Colombia',       dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 60, critical_mineral_reserves: 65, commodity_export_ratio: 55 } },
    { geoCode: 'PE', geoName: 'Peru',           dataYear: 2023, values: { energy_import_dependence: 25, food_security_index: 55, critical_mineral_reserves: 75, commodity_export_ratio: 60 } },
    { geoCode: 'EC', geoName: 'Ecuador',        dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 52, critical_mineral_reserves: 35, commodity_export_ratio: 55 } },
    { geoCode: 'VE', geoName: 'Venezuela',      dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 32, critical_mineral_reserves: 68, commodity_export_ratio: 90 } },
    { geoCode: 'BO', geoName: 'Bolivia',        dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 42, critical_mineral_reserves: 58, commodity_export_ratio: 65 } },
    { geoCode: 'PY', geoName: 'Paraguay',       dataYear: 2023, values: { energy_import_dependence: 15, food_security_index: 48, critical_mineral_reserves: 15, commodity_export_ratio: 55 } },
    { geoCode: 'UY', geoName: 'Uruguay',        dataYear: 2023, values: { energy_import_dependence: 40, food_security_index: 70, critical_mineral_reserves: 15, commodity_export_ratio: 48 } },

    // ── Moyen-Orient & Golfe ─────────────────────────────────────────────
    { geoCode: 'SA', geoName: 'Saudi Arabia',   dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 75, critical_mineral_reserves: 88, commodity_export_ratio: 82 } },
    { geoCode: 'IR', geoName: 'Iran',           dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 58, critical_mineral_reserves: 72, commodity_export_ratio: 55 } },
    { geoCode: 'AE', geoName: 'United Arab Emirates', dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 76, critical_mineral_reserves: 62, commodity_export_ratio: 75 } },
    { geoCode: 'QA', geoName: 'Qatar',          dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 72, critical_mineral_reserves: 55, commodity_export_ratio: 85 } },
    { geoCode: 'KW', geoName: 'Kuwait',         dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 70, critical_mineral_reserves: 48, commodity_export_ratio: 88 } },
    { geoCode: 'OM', geoName: 'Oman',           dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 65, critical_mineral_reserves: 42, commodity_export_ratio: 78 } },
    { geoCode: 'BH', geoName: 'Bahrain',        dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 68, critical_mineral_reserves: 30, commodity_export_ratio: 70 } },
    { geoCode: 'IQ', geoName: 'Iraq',           dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 45, critical_mineral_reserves: 55, commodity_export_ratio: 92 } },
    { geoCode: 'IL', geoName: 'Israel',         dataYear: 2023, values: { energy_import_dependence: 55, food_security_index: 78, critical_mineral_reserves: 25, commodity_export_ratio: 8  } },
    { geoCode: 'JO', geoName: 'Jordan',         dataYear: 2023, values: { energy_import_dependence: 92, food_security_index: 58, critical_mineral_reserves: 32, commodity_export_ratio: 18 } },
    { geoCode: 'LB', geoName: 'Lebanon',        dataYear: 2023, values: { energy_import_dependence: 95, food_security_index: 48, critical_mineral_reserves: 12, commodity_export_ratio: 8  } },
    { geoCode: 'TR', geoName: 'Turkey',         dataYear: 2023, values: { energy_import_dependence: 70, food_security_index: 68, critical_mineral_reserves: 45, commodity_export_ratio: 15 } },

    // ── Afrique du Nord ──────────────────────────────────────────────────
    { geoCode: 'EG', geoName: 'Egypt',          dataYear: 2023, values: { energy_import_dependence: 12, food_security_index: 45, critical_mineral_reserves: 42, commodity_export_ratio: 38 } },
    { geoCode: 'MA', geoName: 'Morocco',        dataYear: 2023, values: { energy_import_dependence: 88, food_security_index: 52, critical_mineral_reserves: 55, commodity_export_ratio: 35 } },
    { geoCode: 'DZ', geoName: 'Algeria',        dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 50, critical_mineral_reserves: 42, commodity_export_ratio: 92 } },
    { geoCode: 'TN', geoName: 'Tunisia',        dataYear: 2023, values: { energy_import_dependence: 55, food_security_index: 55, critical_mineral_reserves: 30, commodity_export_ratio: 18 } },
    { geoCode: 'LY', geoName: 'Libya',          dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 38, critical_mineral_reserves: 35, commodity_export_ratio: 90 } },

    // ── Afrique de l'Ouest ───────────────────────────────────────────────
    { geoCode: 'NG', geoName: 'Nigeria',        dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 42, critical_mineral_reserves: 65, commodity_export_ratio: 78 } },
    { geoCode: 'GH', geoName: 'Ghana',          dataYear: 2023, values: { energy_import_dependence: 20, food_security_index: 45, critical_mineral_reserves: 50, commodity_export_ratio: 60 } },
    { geoCode: 'SN', geoName: 'Senegal',        dataYear: 2023, values: { energy_import_dependence: 60, food_security_index: 40, critical_mineral_reserves: 28, commodity_export_ratio: 30 } },
    { geoCode: 'CI', geoName: 'Ivory Coast',    dataYear: 2023, values: { energy_import_dependence: 22, food_security_index: 38, critical_mineral_reserves: 32, commodity_export_ratio: 55 } },
    { geoCode: 'ML', geoName: 'Mali',           dataYear: 2023, values: { energy_import_dependence: 70, food_security_index: 32, critical_mineral_reserves: 40, commodity_export_ratio: 55 } },
    { geoCode: 'BF', geoName: 'Burkina Faso',   dataYear: 2023, values: { energy_import_dependence: 75, food_security_index: 30, critical_mineral_reserves: 35, commodity_export_ratio: 50 } },
    { geoCode: 'NE', geoName: 'Niger',          dataYear: 2023, values: { energy_import_dependence: 65, food_security_index: 28, critical_mineral_reserves: 45, commodity_export_ratio: 55 } },
    { geoCode: 'GN', geoName: 'Guinea',         dataYear: 2023, values: { energy_import_dependence: 50, food_security_index: 30, critical_mineral_reserves: 65, commodity_export_ratio: 70 } },

    // ── Afrique centrale ─────────────────────────────────────────────────
    { geoCode: 'CD', geoName: 'DR Congo',       dataYear: 2023, values: { energy_import_dependence: 30, food_security_index: 25, critical_mineral_reserves: 85, commodity_export_ratio: 80 } },
    { geoCode: 'CG', geoName: 'Congo',          dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 30, critical_mineral_reserves: 40, commodity_export_ratio: 82 } },
    { geoCode: 'CM', geoName: 'Cameroon',       dataYear: 2023, values: { energy_import_dependence: 15, food_security_index: 36, critical_mineral_reserves: 35, commodity_export_ratio: 48 } },
    { geoCode: 'GA', geoName: 'Gabon',          dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 40, critical_mineral_reserves: 48, commodity_export_ratio: 80 } },

    // ── Afrique de l'Est ─────────────────────────────────────────────────
    { geoCode: 'KE', geoName: 'Kenya',          dataYear: 2023, values: { energy_import_dependence: 78, food_security_index: 42, critical_mineral_reserves: 30, commodity_export_ratio: 28 } },
    { geoCode: 'ET', geoName: 'Ethiopia',       dataYear: 2023, values: { energy_import_dependence: 80, food_security_index: 36, critical_mineral_reserves: 38, commodity_export_ratio: 22 } },
    { geoCode: 'TZ', geoName: 'Tanzania',       dataYear: 2023, values: { energy_import_dependence: 60, food_security_index: 35, critical_mineral_reserves: 45, commodity_export_ratio: 40 } },
    { geoCode: 'UG', geoName: 'Uganda',         dataYear: 2023, values: { energy_import_dependence: 65, food_security_index: 33, critical_mineral_reserves: 25, commodity_export_ratio: 35 } },
    { geoCode: 'RW', geoName: 'Rwanda',         dataYear: 2023, values: { energy_import_dependence: 70, food_security_index: 38, critical_mineral_reserves: 40, commodity_export_ratio: 32 } },
    { geoCode: 'MG', geoName: 'Madagascar',     dataYear: 2023, values: { energy_import_dependence: 75, food_security_index: 28, critical_mineral_reserves: 42, commodity_export_ratio: 30 } },
    { geoCode: 'MZ', geoName: 'Mozambique',     dataYear: 2023, values: { energy_import_dependence: 15, food_security_index: 26, critical_mineral_reserves: 50, commodity_export_ratio: 65 } },

    // ── Afrique australe ─────────────────────────────────────────────────
    { geoCode: 'ZA', geoName: 'South Africa',   dataYear: 2023, values: { energy_import_dependence: 18, food_security_index: 55, critical_mineral_reserves: 88, commodity_export_ratio: 48 } },
    { geoCode: 'ZW', geoName: 'Zimbabwe',       dataYear: 2023, values: { energy_import_dependence: 40, food_security_index: 30, critical_mineral_reserves: 55, commodity_export_ratio: 55 } },
    { geoCode: 'ZM', geoName: 'Zambia',         dataYear: 2023, values: { energy_import_dependence: 20, food_security_index: 32, critical_mineral_reserves: 62, commodity_export_ratio: 72 } },
    { geoCode: 'BW', geoName: 'Botswana',       dataYear: 2023, values: { energy_import_dependence: 60, food_security_index: 42, critical_mineral_reserves: 55, commodity_export_ratio: 78 } },
    { geoCode: 'NA', geoName: 'Namibia',        dataYear: 2023, values: { energy_import_dependence: 55, food_security_index: 40, critical_mineral_reserves: 58, commodity_export_ratio: 55 } },
    { geoCode: 'AO', geoName: 'Angola',         dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 28, critical_mineral_reserves: 52, commodity_export_ratio: 90 } },

    // ── Asie de l'Est ────────────────────────────────────────────────────
    { geoCode: 'CN', geoName: 'China',          dataYear: 2023, values: { energy_import_dependence: 22, food_security_index: 76, critical_mineral_reserves: 88, commodity_export_ratio: 12 } },
    { geoCode: 'JP', geoName: 'Japan',          dataYear: 2023, values: { energy_import_dependence: 88, food_security_index: 82, critical_mineral_reserves: 35, commodity_export_ratio: 4  } },
    { geoCode: 'KR', geoName: 'South Korea',    dataYear: 2023, values: { energy_import_dependence: 92, food_security_index: 77, critical_mineral_reserves: 30, commodity_export_ratio: 3  } },
    { geoCode: 'TW', geoName: 'Taiwan',         dataYear: 2023, values: { energy_import_dependence: 95, food_security_index: 80, critical_mineral_reserves: 25, commodity_export_ratio: 3  } },

    // ── Asie du Sud-Est ──────────────────────────────────────────────────
    { geoCode: 'SG', geoName: 'Singapore',      dataYear: 2023, values: { energy_import_dependence: 98, food_security_index: 87, critical_mineral_reserves: 15, commodity_export_ratio: 2  } },
    { geoCode: 'ID', geoName: 'Indonesia',      dataYear: 2023, values: { energy_import_dependence: 20, food_security_index: 58, critical_mineral_reserves: 72, commodity_export_ratio: 48 } },
    { geoCode: 'TH', geoName: 'Thailand',       dataYear: 2023, values: { energy_import_dependence: 50, food_security_index: 68, critical_mineral_reserves: 42, commodity_export_ratio: 28 } },
    { geoCode: 'VN', geoName: 'Vietnam',        dataYear: 2023, values: { energy_import_dependence: 35, food_security_index: 62, critical_mineral_reserves: 55, commodity_export_ratio: 32 } },
    { geoCode: 'MY', geoName: 'Malaysia',       dataYear: 2023, values: { energy_import_dependence: 5,  food_security_index: 70, critical_mineral_reserves: 48, commodity_export_ratio: 35 } },
    { geoCode: 'PH', geoName: 'Philippines',    dataYear: 2023, values: { energy_import_dependence: 55, food_security_index: 52, critical_mineral_reserves: 40, commodity_export_ratio: 20 } },
    { geoCode: 'MM', geoName: 'Myanmar',        dataYear: 2023, values: { energy_import_dependence: 25, food_security_index: 35, critical_mineral_reserves: 45, commodity_export_ratio: 40 } },
    { geoCode: 'KH', geoName: 'Cambodia',       dataYear: 2023, values: { energy_import_dependence: 70, food_security_index: 40, critical_mineral_reserves: 15, commodity_export_ratio: 12 } },
    { geoCode: 'LA', geoName: 'Laos',           dataYear: 2023, values: { energy_import_dependence: 10, food_security_index: 38, critical_mineral_reserves: 35, commodity_export_ratio: 42 } },

    // ── Asie du Sud ──────────────────────────────────────────────────────
    { geoCode: 'IN', geoName: 'India',          dataYear: 2023, values: { energy_import_dependence: 42, food_security_index: 58, critical_mineral_reserves: 62, commodity_export_ratio: 18 } },
    { geoCode: 'PK', geoName: 'Pakistan',       dataYear: 2023, values: { energy_import_dependence: 55, food_security_index: 42, critical_mineral_reserves: 35, commodity_export_ratio: 15 } },
    { geoCode: 'BD', geoName: 'Bangladesh',     dataYear: 2023, values: { energy_import_dependence: 60, food_security_index: 45, critical_mineral_reserves: 18, commodity_export_ratio: 5  } },
    { geoCode: 'LK', geoName: 'Sri Lanka',      dataYear: 2023, values: { energy_import_dependence: 75, food_security_index: 48, critical_mineral_reserves: 22, commodity_export_ratio: 15 } },
    { geoCode: 'NP', geoName: 'Nepal',          dataYear: 2023, values: { energy_import_dependence: 80, food_security_index: 40, critical_mineral_reserves: 18, commodity_export_ratio: 8  } },

    // ── Océanie ──────────────────────────────────────────────────────────
    { geoCode: 'AU', geoName: 'Australia',      dataYear: 2023, values: { energy_import_dependence: 0,  food_security_index: 82, critical_mineral_reserves: 90, commodity_export_ratio: 55 } },
    { geoCode: 'NZ', geoName: 'New Zealand',    dataYear: 2023, values: { energy_import_dependence: 20, food_security_index: 84, critical_mineral_reserves: 40, commodity_export_ratio: 55 } },
    { geoCode: 'PG', geoName: 'Papua New Guinea', dataYear: 2023, values: { energy_import_dependence: 10, food_security_index: 30, critical_mineral_reserves: 48, commodity_export_ratio: 75 } },
  ],
  seedDataPrev: [
    // ── Europe du Nord & Scandinavie ─────────────────────────────────────
    { geoCode: 'NO', geoName: 'Norway',         dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 80.5, critical_mineral_reserves: 54, commodity_export_ratio: 74 } },
    { geoCode: 'IS', geoName: 'Iceland',        dataYear: 2022, values: { energy_import_dependence: 22, food_security_index: 78.0, critical_mineral_reserves: 30, commodity_export_ratio: 41 } },
    { geoCode: 'SE', geoName: 'Sweden',         dataYear: 2022, values: { energy_import_dependence: 29, food_security_index: 79.1, critical_mineral_reserves: 42, commodity_export_ratio: 18 } },
    { geoCode: 'DK', geoName: 'Denmark',        dataYear: 2022, values: { energy_import_dependence: 19, food_security_index: 77.8, critical_mineral_reserves: 25, commodity_export_ratio: 22 } },
    { geoCode: 'FI', geoName: 'Finland',        dataYear: 2022, values: { energy_import_dependence: 44, food_security_index: 83.7, critical_mineral_reserves: 38, commodity_export_ratio: 20 } },
    { geoCode: 'EE', geoName: 'Estonia',        dataYear: 2022, values: { energy_import_dependence: 13, food_security_index: 73.5, critical_mineral_reserves: 22, commodity_export_ratio: 15 } },
    { geoCode: 'LV', geoName: 'Latvia',         dataYear: 2022, values: { energy_import_dependence: 47, food_security_index: 70.8, critical_mineral_reserves: 18, commodity_export_ratio: 19 } },
    { geoCode: 'LT', geoName: 'Lithuania',      dataYear: 2022, values: { energy_import_dependence: 57, food_security_index: 72.4, critical_mineral_reserves: 16, commodity_export_ratio: 21 } },
    { geoCode: 'IE', geoName: 'Ireland',        dataYear: 2022, values: { energy_import_dependence: 72, food_security_index: 80.5, critical_mineral_reserves: 28, commodity_export_ratio: 8  } },

    // ── Europe occidentale ───────────────────────────────────────────────
    { geoCode: 'FR', geoName: 'France',         dataYear: 2022, values: { energy_import_dependence: 47, food_security_index: 80.2, critical_mineral_reserves: 35, commodity_export_ratio: 10 } },
    { geoCode: 'DE', geoName: 'Germany',        dataYear: 2022, values: { energy_import_dependence: 67, food_security_index: 77.0, critical_mineral_reserves: 32, commodity_export_ratio: 6  } },
    { geoCode: 'GB', geoName: 'United Kingdom', dataYear: 2022, values: { energy_import_dependence: 40, food_security_index: 78.8, critical_mineral_reserves: 30, commodity_export_ratio: 11 } },
    { geoCode: 'NL', geoName: 'Netherlands',    dataYear: 2022, values: { energy_import_dependence: 54, food_security_index: 80.1, critical_mineral_reserves: 22, commodity_export_ratio: 11 } },
    { geoCode: 'BE', geoName: 'Belgium',        dataYear: 2022, values: { energy_import_dependence: 80, food_security_index: 77.5, critical_mineral_reserves: 20, commodity_export_ratio: 5  } },
    { geoCode: 'AT', geoName: 'Austria',        dataYear: 2022, values: { energy_import_dependence: 67, food_security_index: 78.1, critical_mineral_reserves: 28, commodity_export_ratio: 7  } },
    { geoCode: 'CH', geoName: 'Switzerland',    dataYear: 2022, values: { energy_import_dependence: 74, food_security_index: 78.2, critical_mineral_reserves: 22, commodity_export_ratio: 4  } },
    { geoCode: 'LU', geoName: 'Luxembourg',     dataYear: 2022, values: { energy_import_dependence: 96, food_security_index: 81.0, critical_mineral_reserves: 12, commodity_export_ratio: 3  } },

    // ── Europe méridionale ───────────────────────────────────────────────
    { geoCode: 'IT', geoName: 'Italy',          dataYear: 2022, values: { energy_import_dependence: 77, food_security_index: 74.0, critical_mineral_reserves: 25, commodity_export_ratio: 5  } },
    { geoCode: 'ES', geoName: 'Spain',          dataYear: 2022, values: { energy_import_dependence: 73, food_security_index: 75.7, critical_mineral_reserves: 28, commodity_export_ratio: 8  } },
    { geoCode: 'PT', geoName: 'Portugal',       dataYear: 2022, values: { energy_import_dependence: 74, food_security_index: 78.7, critical_mineral_reserves: 40, commodity_export_ratio: 10 } },
    { geoCode: 'GR', geoName: 'Greece',         dataYear: 2022, values: { energy_import_dependence: 74, food_security_index: 72.2, critical_mineral_reserves: 22, commodity_export_ratio: 18 } },
    { geoCode: 'HR', geoName: 'Croatia',        dataYear: 2022, values: { energy_import_dependence: 54, food_security_index: 68.5, critical_mineral_reserves: 20, commodity_export_ratio: 13 } },
    { geoCode: 'SI', geoName: 'Slovenia',       dataYear: 2022, values: { energy_import_dependence: 52, food_security_index: 73.2, critical_mineral_reserves: 18, commodity_export_ratio: 8  } },
    { geoCode: 'MT', geoName: 'Malta',          dataYear: 2022, values: { energy_import_dependence: 98, food_security_index: 71.5, critical_mineral_reserves: 8,  commodity_export_ratio: 2  } },
    { geoCode: 'CY', geoName: 'Cyprus',         dataYear: 2022, values: { energy_import_dependence: 93, food_security_index: 69.8, critical_mineral_reserves: 15, commodity_export_ratio: 10 } },
    { geoCode: 'AL', geoName: 'Albania',        dataYear: 2022, values: { energy_import_dependence: 37, food_security_index: 55.5, critical_mineral_reserves: 31, commodity_export_ratio: 21 } },
    { geoCode: 'RS', geoName: 'Serbia',         dataYear: 2022, values: { energy_import_dependence: 40, food_security_index: 62.8, critical_mineral_reserves: 34, commodity_export_ratio: 17 } },
    { geoCode: 'BA', geoName: 'Bosnia and Herzegovina', dataYear: 2022, values: { energy_import_dependence: 34, food_security_index: 55.2, critical_mineral_reserves: 25, commodity_export_ratio: 19 } },
    { geoCode: 'MK', geoName: 'North Macedonia', dataYear: 2022, values: { energy_import_dependence: 50, food_security_index: 57.5, critical_mineral_reserves: 22, commodity_export_ratio: 14 } },
    { geoCode: 'ME', geoName: 'Montenegro',     dataYear: 2022, values: { energy_import_dependence: 42, food_security_index: 59.8, critical_mineral_reserves: 18, commodity_export_ratio: 11 } },

    // ── Europe centrale & orientale ──────────────────────────────────────
    { geoCode: 'PL', geoName: 'Poland',         dataYear: 2022, values: { energy_import_dependence: 50, food_security_index: 75.5, critical_mineral_reserves: 35, commodity_export_ratio: 12 } },
    { geoCode: 'CZ', geoName: 'Czechia',        dataYear: 2022, values: { energy_import_dependence: 57, food_security_index: 77.7, critical_mineral_reserves: 28, commodity_export_ratio: 8  } },
    { geoCode: 'RO', geoName: 'Romania',        dataYear: 2022, values: { energy_import_dependence: 26, food_security_index: 68.8, critical_mineral_reserves: 30, commodity_export_ratio: 25 } },
    { geoCode: 'BG', geoName: 'Bulgaria',       dataYear: 2022, values: { energy_import_dependence: 36, food_security_index: 73.0, critical_mineral_reserves: 30, commodity_export_ratio: 18 } },
    { geoCode: 'SK', geoName: 'Slovakia',       dataYear: 2022, values: { energy_import_dependence: 62, food_security_index: 73.8, critical_mineral_reserves: 22, commodity_export_ratio: 7  } },
    { geoCode: 'HU', geoName: 'Hungary',        dataYear: 2022, values: { energy_import_dependence: 60, food_security_index: 71.5, critical_mineral_reserves: 20, commodity_export_ratio: 10 } },
    { geoCode: 'UA', geoName: 'Ukraine',        dataYear: 2022, values: { energy_import_dependence: 43, food_security_index: 57.9, critical_mineral_reserves: 61, commodity_export_ratio: 38 } },
    { geoCode: 'MD', geoName: 'Moldova',        dataYear: 2022, values: { energy_import_dependence: 90, food_security_index: 49.5, critical_mineral_reserves: 12, commodity_export_ratio: 24 } },
    { geoCode: 'BY', geoName: 'Belarus',        dataYear: 2022, values: { energy_import_dependence: 87, food_security_index: 63.8, critical_mineral_reserves: 25, commodity_export_ratio: 29 } },

    // ── Russie & Asie centrale ───────────────────────────────────────────
    { geoCode: 'RU', geoName: 'Russia',         dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 67.0, critical_mineral_reserves: 94, commodity_export_ratio: 62 } },
    { geoCode: 'KZ', geoName: 'Kazakhstan',     dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 72.1, critical_mineral_reserves: 79, commodity_export_ratio: 72 } },
    { geoCode: 'UZ', geoName: 'Uzbekistan',     dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 53.2, critical_mineral_reserves: 54, commodity_export_ratio: 44 } },
    { geoCode: 'TM', geoName: 'Turkmenistan',   dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 45.8, critical_mineral_reserves: 49, commodity_export_ratio: 83 } },
    { geoCode: 'AZ', geoName: 'Azerbaijan',     dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 55.5, critical_mineral_reserves: 41, commodity_export_ratio: 87 } },
    { geoCode: 'GE', geoName: 'Georgia',        dataYear: 2022, values: { energy_import_dependence: 74, food_security_index: 53.8, critical_mineral_reserves: 22, commodity_export_ratio: 19 } },
    { geoCode: 'AM', geoName: 'Armenia',        dataYear: 2022, values: { energy_import_dependence: 77, food_security_index: 52.5, critical_mineral_reserves: 30, commodity_export_ratio: 24 } },
    { geoCode: 'MN', geoName: 'Mongolia',       dataYear: 2022, values: { energy_import_dependence: 11, food_security_index: 45.8, critical_mineral_reserves: 69, commodity_export_ratio: 80 } },

    // ── Amérique du Nord ─────────────────────────────────────────────────
    { geoCode: 'US', geoName: 'United States',  dataYear: 2022, values: { energy_import_dependence: 6,  food_security_index: 78.0, critical_mineral_reserves: 81, commodity_export_ratio: 17 } },
    { geoCode: 'CA', geoName: 'Canada',         dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 79.1, critical_mineral_reserves: 74, commodity_export_ratio: 37 } },
    { geoCode: 'MX', geoName: 'Mexico',         dataYear: 2022, values: { energy_import_dependence: 16, food_security_index: 69.1, critical_mineral_reserves: 64, commodity_export_ratio: 31 } },

    // ── Amérique centrale & Caraïbes ─────────────────────────────────────
    { geoCode: 'GT', geoName: 'Guatemala',      dataYear: 2022, values: { energy_import_dependence: 62, food_security_index: 38.5, critical_mineral_reserves: 18, commodity_export_ratio: 29 } },
    { geoCode: 'CR', geoName: 'Costa Rica',     dataYear: 2022, values: { energy_import_dependence: 52, food_security_index: 63.2, critical_mineral_reserves: 12, commodity_export_ratio: 24 } },
    { geoCode: 'PA', geoName: 'Panama',         dataYear: 2022, values: { energy_import_dependence: 77, food_security_index: 59.8, critical_mineral_reserves: 30, commodity_export_ratio: 11 } },
    { geoCode: 'DO', geoName: 'Dominican Republic', dataYear: 2022, values: { energy_import_dependence: 84, food_security_index: 53.2, critical_mineral_reserves: 22, commodity_export_ratio: 14 } },
    { geoCode: 'CU', geoName: 'Cuba',           dataYear: 2022, values: { energy_import_dependence: 72, food_security_index: 46.5, critical_mineral_reserves: 37, commodity_export_ratio: 30 } },
    { geoCode: 'JM', geoName: 'Jamaica',        dataYear: 2022, values: { energy_import_dependence: 90, food_security_index: 53.0, critical_mineral_reserves: 27, commodity_export_ratio: 19 } },
    { geoCode: 'HN', geoName: 'Honduras',       dataYear: 2022, values: { energy_import_dependence: 67, food_security_index: 36.5, critical_mineral_reserves: 15, commodity_export_ratio: 21 } },
    { geoCode: 'TT', geoName: 'Trinidad and Tobago', dataYear: 2022, values: { energy_import_dependence: 0, food_security_index: 63.5, critical_mineral_reserves: 20, commodity_export_ratio: 74 } },

    // ── Amérique du Sud ──────────────────────────────────────────────────
    { geoCode: 'BR', geoName: 'Brazil',         dataYear: 2022, values: { energy_import_dependence: 9,  food_security_index: 65.1, critical_mineral_reserves: 77, commodity_export_ratio: 59 } },
    { geoCode: 'AR', geoName: 'Argentina',      dataYear: 2022, values: { energy_import_dependence: 11, food_security_index: 64.8, critical_mineral_reserves: 69, commodity_export_ratio: 63 } },
    { geoCode: 'CL', geoName: 'Chile',          dataYear: 2022, values: { energy_import_dependence: 62, food_security_index: 74.2, critical_mineral_reserves: 81, commodity_export_ratio: 63 } },
    { geoCode: 'CO', geoName: 'Colombia',       dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 60.1, critical_mineral_reserves: 64, commodity_export_ratio: 56 } },
    { geoCode: 'PE', geoName: 'Peru',           dataYear: 2022, values: { energy_import_dependence: 27, food_security_index: 53.5, critical_mineral_reserves: 74, commodity_export_ratio: 61 } },
    { geoCode: 'EC', geoName: 'Ecuador',        dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 50.2, critical_mineral_reserves: 34, commodity_export_ratio: 56 } },
    { geoCode: 'VE', geoName: 'Venezuela',      dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 30.5, critical_mineral_reserves: 67, commodity_export_ratio: 92 } },
    { geoCode: 'BO', geoName: 'Bolivia',        dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 40.2, critical_mineral_reserves: 57, commodity_export_ratio: 66 } },
    { geoCode: 'PY', geoName: 'Paraguay',       dataYear: 2022, values: { energy_import_dependence: 16, food_security_index: 46.5, critical_mineral_reserves: 15, commodity_export_ratio: 54 } },
    { geoCode: 'UY', geoName: 'Uruguay',        dataYear: 2022, values: { energy_import_dependence: 42, food_security_index: 68.2, critical_mineral_reserves: 15, commodity_export_ratio: 47 } },

    // ── Moyen-Orient & Golfe ─────────────────────────────────────────────
    { geoCode: 'SA', geoName: 'Saudi Arabia',   dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 69.9, critical_mineral_reserves: 87, commodity_export_ratio: 84 } },
    { geoCode: 'IR', geoName: 'Iran',           dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 55.0, critical_mineral_reserves: 71, commodity_export_ratio: 56 } },
    { geoCode: 'AE', geoName: 'United Arab Emirates', dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 73.5, critical_mineral_reserves: 61, commodity_export_ratio: 77 } },
    { geoCode: 'QA', geoName: 'Qatar',          dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 69.8, critical_mineral_reserves: 54, commodity_export_ratio: 87 } },
    { geoCode: 'KW', geoName: 'Kuwait',         dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 68.2, critical_mineral_reserves: 47, commodity_export_ratio: 90 } },
    { geoCode: 'OM', geoName: 'Oman',           dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 63.0, critical_mineral_reserves: 41, commodity_export_ratio: 80 } },
    { geoCode: 'BH', geoName: 'Bahrain',        dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 66.5, critical_mineral_reserves: 30, commodity_export_ratio: 72 } },
    { geoCode: 'IQ', geoName: 'Iraq',           dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 43.2, critical_mineral_reserves: 54, commodity_export_ratio: 94 } },
    { geoCode: 'IL', geoName: 'Israel',         dataYear: 2022, values: { energy_import_dependence: 57, food_security_index: 74.8, critical_mineral_reserves: 25, commodity_export_ratio: 8  } },
    { geoCode: 'JO', geoName: 'Jordan',         dataYear: 2022, values: { energy_import_dependence: 94, food_security_index: 55.8, critical_mineral_reserves: 31, commodity_export_ratio: 17 } },
    { geoCode: 'LB', geoName: 'Lebanon',        dataYear: 2022, values: { energy_import_dependence: 96, food_security_index: 45.2, critical_mineral_reserves: 12, commodity_export_ratio: 7  } },
    { geoCode: 'TR', geoName: 'Turkey',         dataYear: 2022, values: { energy_import_dependence: 72, food_security_index: 65.3, critical_mineral_reserves: 45, commodity_export_ratio: 15 } },

    // ── Afrique du Nord ──────────────────────────────────────────────────
    { geoCode: 'EG', geoName: 'Egypt',          dataYear: 2022, values: { energy_import_dependence: 13, food_security_index: 56.0, critical_mineral_reserves: 41, commodity_export_ratio: 38 } },
    { geoCode: 'MA', geoName: 'Morocco',        dataYear: 2022, values: { energy_import_dependence: 90, food_security_index: 63.0, critical_mineral_reserves: 54, commodity_export_ratio: 34 } },
    { geoCode: 'DZ', geoName: 'Algeria',        dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 48.5, critical_mineral_reserves: 41, commodity_export_ratio: 93 } },
    { geoCode: 'TN', geoName: 'Tunisia',        dataYear: 2022, values: { energy_import_dependence: 57, food_security_index: 53.2, critical_mineral_reserves: 29, commodity_export_ratio: 17 } },
    { geoCode: 'LY', geoName: 'Libya',          dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 36.0, critical_mineral_reserves: 34, commodity_export_ratio: 92 } },

    // ── Afrique de l'Ouest ───────────────────────────────────────────────
    { geoCode: 'NG', geoName: 'Nigeria',        dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 42.0, critical_mineral_reserves: 64, commodity_export_ratio: 80 } },
    { geoCode: 'GH', geoName: 'Ghana',          dataYear: 2022, values: { energy_import_dependence: 22, food_security_index: 43.5, critical_mineral_reserves: 49, commodity_export_ratio: 58 } },
    { geoCode: 'SN', geoName: 'Senegal',        dataYear: 2022, values: { energy_import_dependence: 62, food_security_index: 38.2, critical_mineral_reserves: 27, commodity_export_ratio: 29 } },
    { geoCode: 'CI', geoName: 'Ivory Coast',    dataYear: 2022, values: { energy_import_dependence: 24, food_security_index: 36.5, critical_mineral_reserves: 31, commodity_export_ratio: 54 } },
    { geoCode: 'ML', geoName: 'Mali',           dataYear: 2022, values: { energy_import_dependence: 72, food_security_index: 30.5, critical_mineral_reserves: 39, commodity_export_ratio: 54 } },
    { geoCode: 'BF', geoName: 'Burkina Faso',   dataYear: 2022, values: { energy_import_dependence: 77, food_security_index: 28.5, critical_mineral_reserves: 34, commodity_export_ratio: 49 } },
    { geoCode: 'NE', geoName: 'Niger',          dataYear: 2022, values: { energy_import_dependence: 67, food_security_index: 26.2, critical_mineral_reserves: 44, commodity_export_ratio: 54 } },
    { geoCode: 'GN', geoName: 'Guinea',         dataYear: 2022, values: { energy_import_dependence: 52, food_security_index: 28.5, critical_mineral_reserves: 64, commodity_export_ratio: 69 } },

    // ── Afrique centrale ─────────────────────────────────────────────────
    { geoCode: 'CD', geoName: 'DR Congo',       dataYear: 2022, values: { energy_import_dependence: 32, food_security_index: 23.5, critical_mineral_reserves: 84, commodity_export_ratio: 81 } },
    { geoCode: 'CG', geoName: 'Congo',          dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 28.5, critical_mineral_reserves: 39, commodity_export_ratio: 83 } },
    { geoCode: 'CM', geoName: 'Cameroon',       dataYear: 2022, values: { energy_import_dependence: 17, food_security_index: 34.2, critical_mineral_reserves: 34, commodity_export_ratio: 47 } },
    { geoCode: 'GA', geoName: 'Gabon',          dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 38.5, critical_mineral_reserves: 47, commodity_export_ratio: 82 } },

    // ── Afrique de l'Est ─────────────────────────────────────────────────
    { geoCode: 'KE', geoName: 'Kenya',          dataYear: 2022, values: { energy_import_dependence: 80, food_security_index: 53.0, critical_mineral_reserves: 30, commodity_export_ratio: 27 } },
    { geoCode: 'ET', geoName: 'Ethiopia',       dataYear: 2022, values: { energy_import_dependence: 82, food_security_index: 44.5, critical_mineral_reserves: 37, commodity_export_ratio: 22 } },
    { geoCode: 'TZ', geoName: 'Tanzania',       dataYear: 2022, values: { energy_import_dependence: 62, food_security_index: 33.5, critical_mineral_reserves: 44, commodity_export_ratio: 39 } },
    { geoCode: 'UG', geoName: 'Uganda',         dataYear: 2022, values: { energy_import_dependence: 67, food_security_index: 31.5, critical_mineral_reserves: 24, commodity_export_ratio: 34 } },
    { geoCode: 'RW', geoName: 'Rwanda',         dataYear: 2022, values: { energy_import_dependence: 72, food_security_index: 36.2, critical_mineral_reserves: 39, commodity_export_ratio: 31 } },
    { geoCode: 'MG', geoName: 'Madagascar',     dataYear: 2022, values: { energy_import_dependence: 77, food_security_index: 26.5, critical_mineral_reserves: 41, commodity_export_ratio: 29 } },
    { geoCode: 'MZ', geoName: 'Mozambique',     dataYear: 2022, values: { energy_import_dependence: 17, food_security_index: 24.8, critical_mineral_reserves: 49, commodity_export_ratio: 64 } },

    // ── Afrique australe ─────────────────────────────────────────────────
    { geoCode: 'ZA', geoName: 'South Africa',   dataYear: 2022, values: { energy_import_dependence: 19, food_security_index: 61.7, critical_mineral_reserves: 87, commodity_export_ratio: 47 } },
    { geoCode: 'ZW', geoName: 'Zimbabwe',       dataYear: 2022, values: { energy_import_dependence: 42, food_security_index: 28.5, critical_mineral_reserves: 54, commodity_export_ratio: 54 } },
    { geoCode: 'ZM', geoName: 'Zambia',         dataYear: 2022, values: { energy_import_dependence: 22, food_security_index: 30.5, critical_mineral_reserves: 61, commodity_export_ratio: 73 } },
    { geoCode: 'BW', geoName: 'Botswana',       dataYear: 2022, values: { energy_import_dependence: 62, food_security_index: 40.2, critical_mineral_reserves: 54, commodity_export_ratio: 80 } },
    { geoCode: 'NA', geoName: 'Namibia',        dataYear: 2022, values: { energy_import_dependence: 57, food_security_index: 38.5, critical_mineral_reserves: 57, commodity_export_ratio: 54 } },
    { geoCode: 'AO', geoName: 'Angola',         dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 26.5, critical_mineral_reserves: 51, commodity_export_ratio: 92 } },

    // ── Asie de l'Est ────────────────────────────────────────────────────
    { geoCode: 'CN', geoName: 'China',          dataYear: 2022, values: { energy_import_dependence: 23, food_security_index: 74.2, critical_mineral_reserves: 87, commodity_export_ratio: 11 } },
    { geoCode: 'JP', geoName: 'Japan',          dataYear: 2022, values: { energy_import_dependence: 90, food_security_index: 79.5, critical_mineral_reserves: 35, commodity_export_ratio: 4  } },
    { geoCode: 'KR', geoName: 'South Korea',    dataYear: 2022, values: { energy_import_dependence: 94, food_security_index: 70.2, critical_mineral_reserves: 30, commodity_export_ratio: 3  } },
    { geoCode: 'TW', geoName: 'Taiwan',         dataYear: 2022, values: { energy_import_dependence: 97, food_security_index: 78.0, critical_mineral_reserves: 25, commodity_export_ratio: 3  } },

    // ── Asie du Sud-Est ──────────────────────────────────────────────────
    { geoCode: 'SG', geoName: 'Singapore',      dataYear: 2022, values: { energy_import_dependence: 99, food_security_index: 73.1, critical_mineral_reserves: 15, commodity_export_ratio: 2  } },
    { geoCode: 'ID', geoName: 'Indonesia',      dataYear: 2022, values: { energy_import_dependence: 21, food_security_index: 60.2, critical_mineral_reserves: 71, commodity_export_ratio: 49 } },
    { geoCode: 'TH', geoName: 'Thailand',       dataYear: 2022, values: { energy_import_dependence: 52, food_security_index: 60.1, critical_mineral_reserves: 42, commodity_export_ratio: 28 } },
    { geoCode: 'VN', geoName: 'Vietnam',        dataYear: 2022, values: { energy_import_dependence: 36, food_security_index: 67.9, critical_mineral_reserves: 54, commodity_export_ratio: 33 } },
    { geoCode: 'MY', geoName: 'Malaysia',       dataYear: 2022, values: { energy_import_dependence: 6,  food_security_index: 68.2, critical_mineral_reserves: 47, commodity_export_ratio: 34 } },
    { geoCode: 'PH', geoName: 'Philippines',    dataYear: 2022, values: { energy_import_dependence: 57, food_security_index: 50.5, critical_mineral_reserves: 39, commodity_export_ratio: 19 } },
    { geoCode: 'MM', geoName: 'Myanmar',        dataYear: 2022, values: { energy_import_dependence: 27, food_security_index: 33.5, critical_mineral_reserves: 44, commodity_export_ratio: 39 } },
    { geoCode: 'KH', geoName: 'Cambodia',       dataYear: 2022, values: { energy_import_dependence: 72, food_security_index: 38.2, critical_mineral_reserves: 15, commodity_export_ratio: 11 } },
    { geoCode: 'LA', geoName: 'Laos',           dataYear: 2022, values: { energy_import_dependence: 12, food_security_index: 36.5, critical_mineral_reserves: 34, commodity_export_ratio: 41 } },

    // ── Asie du Sud ──────────────────────────────────────────────────────
    { geoCode: 'IN', geoName: 'India',          dataYear: 2022, values: { energy_import_dependence: 44, food_security_index: 58.9, critical_mineral_reserves: 61, commodity_export_ratio: 17 } },
    { geoCode: 'PK', geoName: 'Pakistan',       dataYear: 2022, values: { energy_import_dependence: 57, food_security_index: 40.5, critical_mineral_reserves: 34, commodity_export_ratio: 14 } },
    { geoCode: 'BD', geoName: 'Bangladesh',     dataYear: 2022, values: { energy_import_dependence: 62, food_security_index: 43.2, critical_mineral_reserves: 17, commodity_export_ratio: 5  } },
    { geoCode: 'LK', geoName: 'Sri Lanka',      dataYear: 2022, values: { energy_import_dependence: 77, food_security_index: 46.2, critical_mineral_reserves: 21, commodity_export_ratio: 14 } },
    { geoCode: 'NP', geoName: 'Nepal',          dataYear: 2022, values: { energy_import_dependence: 82, food_security_index: 38.5, critical_mineral_reserves: 17, commodity_export_ratio: 7  } },

    // ── Océanie ──────────────────────────────────────────────────────────
    { geoCode: 'AU', geoName: 'Australia',      dataYear: 2022, values: { energy_import_dependence: 0,  food_security_index: 78.0, critical_mineral_reserves: 89, commodity_export_ratio: 56 } },
    { geoCode: 'NZ', geoName: 'New Zealand',    dataYear: 2022, values: { energy_import_dependence: 21, food_security_index: 77.8, critical_mineral_reserves: 40, commodity_export_ratio: 56 } },
    { geoCode: 'PG', geoName: 'Papua New Guinea', dataYear: 2022, values: { energy_import_dependence: 11, food_security_index: 28.5, critical_mineral_reserves: 47, commodity_export_ratio: 76 } },
  ],
};

export default commoditiesModule;
