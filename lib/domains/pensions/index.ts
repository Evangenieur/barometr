import type { DomainModule } from '@/lib/domains/types';

const pensionsModule: DomainModule = {
  definition: {
    id: 'pensions',
    label: { fr: 'Retraites', en: 'Pensions' },
    description: {
      fr: 'Viabilité des systèmes de retraite : taux de remplacement, dépendance démographique et capitalisation.',
      en: 'Pension system viability: replacement rate, demographic dependency and fund capitalisation.',
    },
    icon: '🏦',
    group: 'society',
    active: true,
    seedSources: [
      'https://www.oecd.org/pensions/pensionsat-a-glance.htm',
      'https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS',
    ],
    indicators: [
      {
        id: 'replacement_rate',
        label: { fr: 'Taux de remplacement net', en: 'Net replacement rate' },
        unit: 'percent',
        unitLabel: { fr: '% du salaire', en: '% of salary' },
        direction: 'higher_is_better',
        weight: 3,
        thresholds: { excellent: 75, good: 60, fair: 45, poor: 30 },
        minValue: 0,
        maxValue: 120,
      },
      {
        id: 'old_age_dependency',
        label: { fr: 'Ratio de dépendance vieillesse', en: 'Old-age dependency ratio' },
        unit: 'percent',
        unitLabel: { fr: '%', en: '%' },
        direction: 'lower_is_better',
        weight: 2,
        thresholds: { excellent: 20, good: 30, fair: 40, poor: 50 },
        minValue: 5,
        maxValue: 70,
      },
      {
        id: 'pension_assets_gdp',
        label: { fr: 'Actifs fonds retraite / PIB', en: 'Pension fund assets / GDP' },
        unit: 'percent',
        unitLabel: { fr: '% PIB', en: '% GDP' },
        direction: 'higher_is_better',
        weight: 2,
        thresholds: { excellent: 100, good: 60, fair: 30, poor: 10 },
        minValue: 0,
        maxValue: 200,
      },
    ],
  },
  seedData: [
    // ── Europe du Nord ──
    { geoCode: 'NL', geoName: 'Netherlands',    dataYear: 2023, values: { replacement_rate: 80.5, old_age_dependency: 31.2, pension_assets_gdp: 213 } },
    { geoCode: 'IS', geoName: 'Iceland',        dataYear: 2023, values: { replacement_rate: 76.0, old_age_dependency: 23.5, pension_assets_gdp: 185 } },
    { geoCode: 'DK', geoName: 'Denmark',        dataYear: 2023, values: { replacement_rate: 74.2, old_age_dependency: 31.8, pension_assets_gdp: 199 } },
    { geoCode: 'SE', geoName: 'Sweden',         dataYear: 2023, values: { replacement_rate: 53.4, old_age_dependency: 33.2, pension_assets_gdp: 95  } },
    { geoCode: 'NO', geoName: 'Norway',         dataYear: 2023, values: { replacement_rate: 62.0, old_age_dependency: 27.5, pension_assets_gdp: 47  } },
    { geoCode: 'FI', geoName: 'Finland',        dataYear: 2023, values: { replacement_rate: 56.6, old_age_dependency: 38.0, pension_assets_gdp: 95  } },

    // ── Europe de l'Ouest ──
    { geoCode: 'GB', geoName: 'United Kingdom', dataYear: 2023, values: { replacement_rate: 51.4, old_age_dependency: 30.2, pension_assets_gdp: 93  } },
    { geoCode: 'IE', geoName: 'Ireland',        dataYear: 2023, values: { replacement_rate: 42.3, old_age_dependency: 22.8, pension_assets_gdp: 32  } },
    { geoCode: 'DE', geoName: 'Germany',        dataYear: 2023, values: { replacement_rate: 52.9, old_age_dependency: 35.8, pension_assets_gdp: 18  } },
    { geoCode: 'AT', geoName: 'Austria',        dataYear: 2023, values: { replacement_rate: 91.8, old_age_dependency: 29.8, pension_assets_gdp: 7   } },
    { geoCode: 'CH', geoName: 'Switzerland',    dataYear: 2023, values: { replacement_rate: 67.9, old_age_dependency: 30.5, pension_assets_gdp: 148 } },
    { geoCode: 'FR', geoName: 'France',         dataYear: 2023, values: { replacement_rate: 74.5, old_age_dependency: 35.5, pension_assets_gdp: 12  } },
    { geoCode: 'BE', geoName: 'Belgium',        dataYear: 2023, values: { replacement_rate: 66.2, old_age_dependency: 31.5, pension_assets_gdp: 5   } },
    { geoCode: 'LU', geoName: 'Luxembourg',     dataYear: 2023, values: { replacement_rate: 89.0, old_age_dependency: 21.5, pension_assets_gdp: 4   } },

    // ── Europe du Sud ──
    { geoCode: 'IT', geoName: 'Italy',          dataYear: 2023, values: { replacement_rate: 91.8, old_age_dependency: 38.5, pension_assets_gdp: 8   } },
    { geoCode: 'ES', geoName: 'Spain',          dataYear: 2023, values: { replacement_rate: 88.8, old_age_dependency: 33.2, pension_assets_gdp: 10  } },
    { geoCode: 'PT', geoName: 'Portugal',       dataYear: 2023, values: { replacement_rate: 94.0, old_age_dependency: 36.5, pension_assets_gdp: 11  } },
    { geoCode: 'GR', geoName: 'Greece',         dataYear: 2023, values: { replacement_rate: 88.0, old_age_dependency: 37.2, pension_assets_gdp: 4   } },
    { geoCode: 'MT', geoName: 'Malta',          dataYear: 2023, values: { replacement_rate: 63.0, old_age_dependency: 28.5, pension_assets_gdp: 5   } },
    { geoCode: 'CY', geoName: 'Cyprus',         dataYear: 2023, values: { replacement_rate: 54.0, old_age_dependency: 23.8, pension_assets_gdp: 8   } },

    // ── Europe centrale & orientale ──
    { geoCode: 'CZ', geoName: 'Czechia',        dataYear: 2023, values: { replacement_rate: 58.0, old_age_dependency: 32.5, pension_assets_gdp: 10  } },
    { geoCode: 'PL', geoName: 'Poland',         dataYear: 2023, values: { replacement_rate: 38.6, old_age_dependency: 30.5, pension_assets_gdp: 8   } },
    { geoCode: 'SK', geoName: 'Slovakia',       dataYear: 2023, values: { replacement_rate: 62.5, old_age_dependency: 26.2, pension_assets_gdp: 12  } },
    { geoCode: 'HU', geoName: 'Hungary',        dataYear: 2023, values: { replacement_rate: 73.6, old_age_dependency: 30.8, pension_assets_gdp: 5   } },
    { geoCode: 'SI', geoName: 'Slovenia',       dataYear: 2023, values: { replacement_rate: 59.0, old_age_dependency: 33.5, pension_assets_gdp: 8   } },
    { geoCode: 'HR', geoName: 'Croatia',        dataYear: 2023, values: { replacement_rate: 54.5, old_age_dependency: 34.0, pension_assets_gdp: 12  } },
    { geoCode: 'RO', geoName: 'Romania',        dataYear: 2023, values: { replacement_rate: 58.0, old_age_dependency: 29.5, pension_assets_gdp: 5   } },
    { geoCode: 'BG', geoName: 'Bulgaria',       dataYear: 2023, values: { replacement_rate: 55.0, old_age_dependency: 35.0, pension_assets_gdp: 7   } },

    // ── Pays baltes ──
    { geoCode: 'EE', geoName: 'Estonia',        dataYear: 2023, values: { replacement_rate: 52.5, old_age_dependency: 33.0, pension_assets_gdp: 18  } },
    { geoCode: 'LT', geoName: 'Lithuania',      dataYear: 2023, values: { replacement_rate: 45.0, old_age_dependency: 32.5, pension_assets_gdp: 10  } },
    { geoCode: 'LV', geoName: 'Latvia',         dataYear: 2023, values: { replacement_rate: 48.0, old_age_dependency: 33.5, pension_assets_gdp: 8   } },

    // ── Balkans ──
    { geoCode: 'RS', geoName: 'Serbia',         dataYear: 2023, values: { replacement_rate: 58.5, old_age_dependency: 30.2, pension_assets_gdp: 2   } },
    { geoCode: 'BA', geoName: 'Bosnia and Herzegovina', dataYear: 2023, values: { replacement_rate: 42.0, old_age_dependency: 26.5, pension_assets_gdp: 1 } },
    { geoCode: 'AL', geoName: 'Albania',        dataYear: 2023, values: { replacement_rate: 52.0, old_age_dependency: 22.0, pension_assets_gdp: 1   } },
    { geoCode: 'MK', geoName: 'North Macedonia', dataYear: 2023, values: { replacement_rate: 55.0, old_age_dependency: 22.5, pension_assets_gdp: 3  } },
    { geoCode: 'ME', geoName: 'Montenegro',     dataYear: 2023, values: { replacement_rate: 48.0, old_age_dependency: 24.0, pension_assets_gdp: 2   } },

    // ── Europe de l'Est (hors UE) ──
    { geoCode: 'RU', geoName: 'Russia',         dataYear: 2023, values: { replacement_rate: 34.0, old_age_dependency: 27.5, pension_assets_gdp: 5   } },
    { geoCode: 'UA', geoName: 'Ukraine',        dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency: 26.0, pension_assets_gdp: 1   } },
    { geoCode: 'MD', geoName: 'Moldova',        dataYear: 2023, values: { replacement_rate: 32.0, old_age_dependency: 22.5, pension_assets_gdp: 1   } },
    { geoCode: 'BY', geoName: 'Belarus',        dataYear: 2023, values: { replacement_rate: 40.0, old_age_dependency: 24.5, pension_assets_gdp: 1   } },

    // ── Caucase ──
    { geoCode: 'GE', geoName: 'Georgia',        dataYear: 2023, values: { replacement_rate: 28.0, old_age_dependency: 24.0, pension_assets_gdp: 2   } },
    { geoCode: 'AM', geoName: 'Armenia',        dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency: 19.5, pension_assets_gdp: 4   } },
    { geoCode: 'AZ', geoName: 'Azerbaijan',     dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency: 11.0, pension_assets_gdp: 2   } },

    // ── Amérique du Nord ──
    { geoCode: 'US', geoName: 'United States',  dataYear: 2023, values: { replacement_rate: 49.0, old_age_dependency: 26.5, pension_assets_gdp: 148 } },
    { geoCode: 'CA', geoName: 'Canada',         dataYear: 2023, values: { replacement_rate: 52.0, old_age_dependency: 26.4, pension_assets_gdp: 96  } },

    // ── Amérique centrale & Caraïbes ──
    { geoCode: 'MX', geoName: 'Mexico',         dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency: 11.5, pension_assets_gdp: 17  } },
    { geoCode: 'GT', geoName: 'Guatemala',      dataYear: 2023, values: { replacement_rate: 18.0, old_age_dependency:  7.5, pension_assets_gdp: 2   } },
    { geoCode: 'HN', geoName: 'Honduras',       dataYear: 2023, values: { replacement_rate: 20.0, old_age_dependency:  7.8, pension_assets_gdp: 3   } },
    { geoCode: 'SV', geoName: 'El Salvador',    dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency: 13.5, pension_assets_gdp: 15  } },
    { geoCode: 'CR', geoName: 'Costa Rica',     dataYear: 2023, values: { replacement_rate: 55.0, old_age_dependency: 14.5, pension_assets_gdp: 8   } },
    { geoCode: 'PA', geoName: 'Panama',         dataYear: 2023, values: { replacement_rate: 42.0, old_age_dependency: 13.0, pension_assets_gdp: 5   } },
    { geoCode: 'JM', geoName: 'Jamaica',        dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency: 14.0, pension_assets_gdp: 10  } },
    { geoCode: 'TT', geoName: 'Trinidad and Tobago', dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency: 15.0, pension_assets_gdp: 8 } },
    { geoCode: 'DO', geoName: 'Dominican Republic',  dataYear: 2023, values: { replacement_rate: 28.0, old_age_dependency: 11.5, pension_assets_gdp: 10 } },
    { geoCode: 'CU', geoName: 'Cuba',           dataYear: 2023, values: { replacement_rate: 55.0, old_age_dependency: 22.5, pension_assets_gdp: 0   } },
    { geoCode: 'NI', geoName: 'Nicaragua',      dataYear: 2023, values: { replacement_rate: 25.0, old_age_dependency:  8.5, pension_assets_gdp: 3   } },
    { geoCode: 'HT', geoName: 'Haiti',          dataYear: 2023, values: { replacement_rate: 10.0, old_age_dependency:  7.5, pension_assets_gdp: 0   } },

    // ── Amérique du Sud ──
    { geoCode: 'BR', geoName: 'Brazil',         dataYear: 2023, values: { replacement_rate: 76.7, old_age_dependency: 14.5, pension_assets_gdp: 14  } },
    { geoCode: 'AR', geoName: 'Argentina',      dataYear: 2023, values: { replacement_rate: 63.0, old_age_dependency: 18.5, pension_assets_gdp: 2   } },
    { geoCode: 'CL', geoName: 'Chile',          dataYear: 2023, values: { replacement_rate: 37.0, old_age_dependency: 17.5, pension_assets_gdp: 75  } },
    { geoCode: 'CO', geoName: 'Colombia',       dataYear: 2023, values: { replacement_rate: 55.0, old_age_dependency: 13.5, pension_assets_gdp: 25  } },
    { geoCode: 'PE', geoName: 'Peru',           dataYear: 2023, values: { replacement_rate: 38.0, old_age_dependency: 12.5, pension_assets_gdp: 20  } },
    { geoCode: 'VE', geoName: 'Venezuela',      dataYear: 2023, values: { replacement_rate: 40.0, old_age_dependency: 11.5, pension_assets_gdp: 1   } },
    { geoCode: 'EC', geoName: 'Ecuador',        dataYear: 2023, values: { replacement_rate: 50.0, old_age_dependency: 12.0, pension_assets_gdp: 6   } },
    { geoCode: 'UY', geoName: 'Uruguay',        dataYear: 2023, values: { replacement_rate: 62.0, old_age_dependency: 23.0, pension_assets_gdp: 22  } },
    { geoCode: 'PY', geoName: 'Paraguay',       dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency: 10.0, pension_assets_gdp: 3   } },
    { geoCode: 'BO', geoName: 'Bolivia',        dataYear: 2023, values: { replacement_rate: 28.0, old_age_dependency: 10.5, pension_assets_gdp: 12  } },

    // ── Asie de l'Est ──
    { geoCode: 'JP', geoName: 'Japan',          dataYear: 2023, values: { replacement_rate: 34.6, old_age_dependency: 51.0, pension_assets_gdp: 35  } },
    { geoCode: 'KR', geoName: 'South Korea',    dataYear: 2023, values: { replacement_rate: 31.2, old_age_dependency: 25.5, pension_assets_gdp: 55  } },
    { geoCode: 'CN', geoName: 'China',          dataYear: 2023, values: { replacement_rate: 82.9, old_age_dependency: 20.5, pension_assets_gdp: 2   } },
    { geoCode: 'TW', geoName: 'Taiwan',         dataYear: 2023, values: { replacement_rate: 42.0, old_age_dependency: 26.0, pension_assets_gdp: 18  } },
    { geoCode: 'MN', geoName: 'Mongolia',       dataYear: 2023, values: { replacement_rate: 45.0, old_age_dependency:  8.5, pension_assets_gdp: 3   } },

    // ── Asie du Sud-Est ──
    { geoCode: 'SG', geoName: 'Singapore',      dataYear: 2023, values: { replacement_rate: 56.0, old_age_dependency: 22.5, pension_assets_gdp: 64  } },
    { geoCode: 'TH', geoName: 'Thailand',       dataYear: 2023, values: { replacement_rate: 45.0, old_age_dependency: 19.5, pension_assets_gdp: 10  } },
    { geoCode: 'MY', geoName: 'Malaysia',       dataYear: 2023, values: { replacement_rate: 48.0, old_age_dependency: 10.5, pension_assets_gdp: 55  } },
    { geoCode: 'ID', geoName: 'Indonesia',      dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency:  9.8, pension_assets_gdp: 4   } },
    { geoCode: 'PH', geoName: 'Philippines',    dataYear: 2023, values: { replacement_rate: 42.0, old_age_dependency:  8.5, pension_assets_gdp: 5   } },
    { geoCode: 'VN', geoName: 'Vietnam',        dataYear: 2023, values: { replacement_rate: 58.0, old_age_dependency: 12.5, pension_assets_gdp: 3   } },
    { geoCode: 'MM', geoName: 'Myanmar',        dataYear: 2023, values: { replacement_rate: 15.0, old_age_dependency: 10.0, pension_assets_gdp: 1   } },
    { geoCode: 'KH', geoName: 'Cambodia',       dataYear: 2023, values: { replacement_rate: 12.0, old_age_dependency:  7.5, pension_assets_gdp: 0   } },
    { geoCode: 'LA', geoName: 'Laos',           dataYear: 2023, values: { replacement_rate: 18.0, old_age_dependency:  7.0, pension_assets_gdp: 1   } },
    { geoCode: 'BN', geoName: 'Brunei',         dataYear: 2023, values: { replacement_rate: 38.0, old_age_dependency:  7.5, pension_assets_gdp: 18  } },

    // ── Asie du Sud ──
    { geoCode: 'IN', geoName: 'India',          dataYear: 2023, values: { replacement_rate: 38.2, old_age_dependency:  9.5, pension_assets_gdp: 4   } },
    { geoCode: 'BD', geoName: 'Bangladesh',     dataYear: 2023, values: { replacement_rate: 20.0, old_age_dependency:  8.5, pension_assets_gdp: 1   } },
    { geoCode: 'PK', geoName: 'Pakistan',       dataYear: 2023, values: { replacement_rate: 22.0, old_age_dependency:  7.5, pension_assets_gdp: 2   } },
    { geoCode: 'LK', geoName: 'Sri Lanka',      dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency: 17.5, pension_assets_gdp: 6   } },
    { geoCode: 'NP', geoName: 'Nepal',          dataYear: 2023, values: { replacement_rate: 15.0, old_age_dependency:  9.5, pension_assets_gdp: 2   } },
    { geoCode: 'AF', geoName: 'Afghanistan',    dataYear: 2023, values: { replacement_rate:  8.0, old_age_dependency:  5.0, pension_assets_gdp: 0   } },

    // ── Asie centrale ──
    { geoCode: 'KZ', geoName: 'Kazakhstan',     dataYear: 2023, values: { replacement_rate: 42.0, old_age_dependency: 12.5, pension_assets_gdp: 10  } },
    { geoCode: 'UZ', geoName: 'Uzbekistan',     dataYear: 2023, values: { replacement_rate: 38.0, old_age_dependency:  8.0, pension_assets_gdp: 2   } },
    { geoCode: 'TM', geoName: 'Turkmenistan',   dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency:  7.5, pension_assets_gdp: 1   } },
    { geoCode: 'KG', geoName: 'Kyrgyzstan',     dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency:  8.0, pension_assets_gdp: 1   } },
    { geoCode: 'TJ', geoName: 'Tajikistan',     dataYear: 2023, values: { replacement_rate: 25.0, old_age_dependency:  6.0, pension_assets_gdp: 0   } },

    // ── Moyen-Orient ──
    { geoCode: 'TR', geoName: 'Turkey',         dataYear: 2023, values: { replacement_rate: 78.9, old_age_dependency: 13.5, pension_assets_gdp: 3   } },
    { geoCode: 'SA', geoName: 'Saudi Arabia',   dataYear: 2023, values: { replacement_rate: 44.0, old_age_dependency:  5.5, pension_assets_gdp: 5   } },
    { geoCode: 'AE', geoName: 'United Arab Emirates', dataYear: 2023, values: { replacement_rate: 48.0, old_age_dependency: 2.5, pension_assets_gdp: 8 } },
    { geoCode: 'IL', geoName: 'Israel',         dataYear: 2023, values: { replacement_rate: 68.8, old_age_dependency: 19.0, pension_assets_gdp: 60  } },
    { geoCode: 'IQ', geoName: 'Iraq',           dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency:  5.5, pension_assets_gdp: 1   } },
    { geoCode: 'JO', geoName: 'Jordan',         dataYear: 2023, values: { replacement_rate: 50.0, old_age_dependency:  7.0, pension_assets_gdp: 18  } },
    { geoCode: 'LB', geoName: 'Lebanon',        dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency: 12.5, pension_assets_gdp: 3   } },
    { geoCode: 'KW', geoName: 'Kuwait',         dataYear: 2023, values: { replacement_rate: 55.0, old_age_dependency:  4.0, pension_assets_gdp: 15  } },
    { geoCode: 'QA', geoName: 'Qatar',          dataYear: 2023, values: { replacement_rate: 50.0, old_age_dependency:  2.5, pension_assets_gdp: 10  } },
    { geoCode: 'BH', geoName: 'Bahrain',        dataYear: 2023, values: { replacement_rate: 48.0, old_age_dependency:  4.0, pension_assets_gdp: 12  } },
    { geoCode: 'OM', geoName: 'Oman',           dataYear: 2023, values: { replacement_rate: 42.0, old_age_dependency:  4.5, pension_assets_gdp: 8   } },
    { geoCode: 'YE', geoName: 'Yemen',          dataYear: 2023, values: { replacement_rate: 10.0, old_age_dependency:  5.0, pension_assets_gdp: 0   } },
    { geoCode: 'SY', geoName: 'Syria',          dataYear: 2023, values: { replacement_rate: 15.0, old_age_dependency:  7.0, pension_assets_gdp: 0   } },
    { geoCode: 'IR', geoName: 'Iran',           dataYear: 2023, values: { replacement_rate: 55.0, old_age_dependency: 10.5, pension_assets_gdp: 5   } },

    // ── Afrique du Nord ──
    { geoCode: 'EG', geoName: 'Egypt',          dataYear: 2023, values: { replacement_rate: 50.0, old_age_dependency:  8.5, pension_assets_gdp: 4   } },
    { geoCode: 'MA', geoName: 'Morocco',        dataYear: 2023, values: { replacement_rate: 52.0, old_age_dependency: 12.0, pension_assets_gdp: 18  } },
    { geoCode: 'DZ', geoName: 'Algeria',        dataYear: 2023, values: { replacement_rate: 60.0, old_age_dependency: 10.5, pension_assets_gdp: 1   } },
    { geoCode: 'TN', geoName: 'Tunisia',        dataYear: 2023, values: { replacement_rate: 55.0, old_age_dependency: 14.0, pension_assets_gdp: 4   } },
    { geoCode: 'LY', geoName: 'Libya',          dataYear: 2023, values: { replacement_rate: 45.0, old_age_dependency:  7.5, pension_assets_gdp: 2   } },

    // ── Afrique de l'Ouest ──
    { geoCode: 'NG', geoName: 'Nigeria',        dataYear: 2023, values: { replacement_rate: 25.0, old_age_dependency:  5.5, pension_assets_gdp: 4   } },
    { geoCode: 'GH', geoName: 'Ghana',          dataYear: 2023, values: { replacement_rate: 32.0, old_age_dependency:  6.0, pension_assets_gdp: 6   } },
    { geoCode: 'SN', geoName: 'Senegal',        dataYear: 2023, values: { replacement_rate: 35.0, old_age_dependency:  5.5, pension_assets_gdp: 3   } },
    { geoCode: 'CI', geoName: "Cote d'Ivoire",  dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency:  5.5, pension_assets_gdp: 3   } },
    { geoCode: 'ML', geoName: 'Mali',           dataYear: 2023, values: { replacement_rate: 20.0, old_age_dependency:  5.0, pension_assets_gdp: 1   } },
    { geoCode: 'NE', geoName: 'Niger',          dataYear: 2023, values: { replacement_rate: 15.0, old_age_dependency:  4.5, pension_assets_gdp: 0   } },
    { geoCode: 'BF', geoName: 'Burkina Faso',   dataYear: 2023, values: { replacement_rate: 18.0, old_age_dependency:  4.5, pension_assets_gdp: 1   } },
    { geoCode: 'GN', geoName: 'Guinea',         dataYear: 2023, values: { replacement_rate: 15.0, old_age_dependency:  5.0, pension_assets_gdp: 0   } },

    // ── Afrique centrale ──
    { geoCode: 'CM', geoName: 'Cameroon',       dataYear: 2023, values: { replacement_rate: 28.0, old_age_dependency:  5.5, pension_assets_gdp: 2   } },
    { geoCode: 'CD', geoName: 'DR Congo',       dataYear: 2023, values: { replacement_rate: 10.0, old_age_dependency:  5.0, pension_assets_gdp: 0   } },
    { geoCode: 'GA', geoName: 'Gabon',          dataYear: 2023, values: { replacement_rate: 40.0, old_age_dependency:  6.5, pension_assets_gdp: 3   } },
    { geoCode: 'TD', geoName: 'Chad',           dataYear: 2023, values: { replacement_rate: 10.0, old_age_dependency:  4.5, pension_assets_gdp: 0   } },
    { geoCode: 'AO', geoName: 'Angola',         dataYear: 2023, values: { replacement_rate: 22.0, old_age_dependency:  5.0, pension_assets_gdp: 2   } },

    // ── Afrique de l'Est ──
    { geoCode: 'KE', geoName: 'Kenya',          dataYear: 2023, values: { replacement_rate: 28.0, old_age_dependency:  5.0, pension_assets_gdp: 12  } },
    { geoCode: 'ET', geoName: 'Ethiopia',       dataYear: 2023, values: { replacement_rate: 18.0, old_age_dependency:  6.0, pension_assets_gdp: 1   } },
    { geoCode: 'TZ', geoName: 'Tanzania',       dataYear: 2023, values: { replacement_rate: 20.0, old_age_dependency:  5.5, pension_assets_gdp: 3   } },
    { geoCode: 'UG', geoName: 'Uganda',         dataYear: 2023, values: { replacement_rate: 18.0, old_age_dependency:  4.0, pension_assets_gdp: 4   } },
    { geoCode: 'RW', geoName: 'Rwanda',         dataYear: 2023, values: { replacement_rate: 15.0, old_age_dependency:  5.5, pension_assets_gdp: 4   } },
    { geoCode: 'MZ', geoName: 'Mozambique',     dataYear: 2023, values: { replacement_rate: 12.0, old_age_dependency:  5.5, pension_assets_gdp: 1   } },
    { geoCode: 'MG', geoName: 'Madagascar',     dataYear: 2023, values: { replacement_rate: 10.0, old_age_dependency:  5.5, pension_assets_gdp: 1   } },
    { geoCode: 'MW', geoName: 'Malawi',         dataYear: 2023, values: { replacement_rate: 10.0, old_age_dependency:  5.0, pension_assets_gdp: 2   } },
    { geoCode: 'SS', geoName: 'South Sudan',    dataYear: 2023, values: { replacement_rate:  5.0, old_age_dependency:  4.5, pension_assets_gdp: 0   } },

    // ── Afrique australe ──
    { geoCode: 'ZA', geoName: 'South Africa',   dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency:  8.5, pension_assets_gdp: 44  } },
    { geoCode: 'ZW', geoName: 'Zimbabwe',       dataYear: 2023, values: { replacement_rate: 18.0, old_age_dependency:  6.5, pension_assets_gdp: 3   } },
    { geoCode: 'BW', geoName: 'Botswana',       dataYear: 2023, values: { replacement_rate: 25.0, old_age_dependency:  7.0, pension_assets_gdp: 42  } },
    { geoCode: 'NA', geoName: 'Namibia',        dataYear: 2023, values: { replacement_rate: 22.0, old_age_dependency:  6.0, pension_assets_gdp: 55  } },
    { geoCode: 'MU', geoName: 'Mauritius',      dataYear: 2023, values: { replacement_rate: 40.0, old_age_dependency: 18.5, pension_assets_gdp: 20  } },
    { geoCode: 'ZM', geoName: 'Zambia',         dataYear: 2023, values: { replacement_rate: 18.0, old_age_dependency:  4.5, pension_assets_gdp: 5   } },

    // ── Océanie ──
    { geoCode: 'AU', geoName: 'Australia',      dataYear: 2023, values: { replacement_rate: 68.3, old_age_dependency: 24.8, pension_assets_gdp: 130 } },
    { geoCode: 'NZ', geoName: 'New Zealand',    dataYear: 2023, values: { replacement_rate: 55.7, old_age_dependency: 24.5, pension_assets_gdp: 24  } },
    { geoCode: 'FJ', geoName: 'Fiji',           dataYear: 2023, values: { replacement_rate: 30.0, old_age_dependency: 10.0, pension_assets_gdp: 25  } },
    { geoCode: 'PG', geoName: 'Papua New Guinea', dataYear: 2023, values: { replacement_rate: 12.0, old_age_dependency: 5.5, pension_assets_gdp: 3  } },
  ],
  seedDataPrev: [
    // ── (old_age_dependency: World Bank SP.POP.DPND.OL 2022; replacement_rate/pension_assets: OECD approx) ──

    // ── Europe du Nord ──
    { geoCode: 'NL', geoName: 'Netherlands',    dataYear: 2022, values: { replacement_rate: 80.0, old_age_dependency: 30.7, pension_assets_gdp: 208 } },
    { geoCode: 'IS', geoName: 'Iceland',        dataYear: 2022, values: { replacement_rate: 75.5, old_age_dependency: 22.7, pension_assets_gdp: 180 } },
    { geoCode: 'DK', geoName: 'Denmark',        dataYear: 2022, values: { replacement_rate: 73.8, old_age_dependency: 32.1, pension_assets_gdp: 193 } },
    { geoCode: 'SE', geoName: 'Sweden',         dataYear: 2022, values: { replacement_rate: 53.0, old_age_dependency: 32.7, pension_assets_gdp: 92  } },
    { geoCode: 'NO', geoName: 'Norway',         dataYear: 2022, values: { replacement_rate: 62.0, old_age_dependency: 28.3, pension_assets_gdp: 45  } },
    { geoCode: 'FI', geoName: 'Finland',        dataYear: 2022, values: { replacement_rate: 56.3, old_age_dependency: 37.7, pension_assets_gdp: 92  } },

    // ── Europe de l'Ouest ──
    { geoCode: 'GB', geoName: 'United Kingdom', dataYear: 2022, values: { replacement_rate: 51.3, old_age_dependency: 29.8, pension_assets_gdp: 90  } },
    { geoCode: 'IE', geoName: 'Ireland',        dataYear: 2022, values: { replacement_rate: 42.0, old_age_dependency: 23.2, pension_assets_gdp: 30  } },
    { geoCode: 'DE', geoName: 'Germany',        dataYear: 2022, values: { replacement_rate: 52.9, old_age_dependency: 35.3, pension_assets_gdp: 17  } },
    { geoCode: 'AT', geoName: 'Austria',        dataYear: 2022, values: { replacement_rate: 91.5, old_age_dependency: 30.1, pension_assets_gdp: 6   } },
    { geoCode: 'CH', geoName: 'Switzerland',    dataYear: 2022, values: { replacement_rate: 67.5, old_age_dependency: 29.3, pension_assets_gdp: 150 } },
    { geoCode: 'FR', geoName: 'France',         dataYear: 2022, values: { replacement_rate: 74.5, old_age_dependency: 34.7, pension_assets_gdp: 11  } },
    { geoCode: 'BE', geoName: 'Belgium',        dataYear: 2022, values: { replacement_rate: 65.8, old_age_dependency: 31.0, pension_assets_gdp: 5   } },
    { geoCode: 'LU', geoName: 'Luxembourg',     dataYear: 2022, values: { replacement_rate: 88.5, old_age_dependency: 21.4, pension_assets_gdp: 3   } },

    // ── Europe du Sud ──
    { geoCode: 'IT', geoName: 'Italy',          dataYear: 2022, values: { replacement_rate: 91.5, old_age_dependency: 37.6, pension_assets_gdp: 7   } },
    { geoCode: 'ES', geoName: 'Spain',          dataYear: 2022, values: { replacement_rate: 88.3, old_age_dependency: 30.5, pension_assets_gdp: 9   } },
    { geoCode: 'PT', geoName: 'Portugal',       dataYear: 2022, values: { replacement_rate: 93.5, old_age_dependency: 37.4, pension_assets_gdp: 10  } },
    { geoCode: 'GR', geoName: 'Greece',         dataYear: 2022, values: { replacement_rate: 87.5, old_age_dependency: 36.9, pension_assets_gdp: 4   } },
    { geoCode: 'MT', geoName: 'Malta',          dataYear: 2022, values: { replacement_rate: 62.5, old_age_dependency: 28.0, pension_assets_gdp: 4   } },
    { geoCode: 'CY', geoName: 'Cyprus',         dataYear: 2022, values: { replacement_rate: 53.5, old_age_dependency: 23.2, pension_assets_gdp: 7   } },

    // ── Europe centrale & orientale ──
    { geoCode: 'CZ', geoName: 'Czechia',        dataYear: 2022, values: { replacement_rate: 57.5, old_age_dependency: 32.3, pension_assets_gdp: 9   } },
    { geoCode: 'PL', geoName: 'Poland',         dataYear: 2022, values: { replacement_rate: 38.3, old_age_dependency: 29.0, pension_assets_gdp: 7   } },
    { geoCode: 'SK', geoName: 'Slovakia',       dataYear: 2022, values: { replacement_rate: 62.0, old_age_dependency: 25.5, pension_assets_gdp: 11  } },
    { geoCode: 'HU', geoName: 'Hungary',        dataYear: 2022, values: { replacement_rate: 73.0, old_age_dependency: 30.3, pension_assets_gdp: 4   } },
    { geoCode: 'SI', geoName: 'Slovenia',       dataYear: 2022, values: { replacement_rate: 58.5, old_age_dependency: 33.0, pension_assets_gdp: 7   } },
    { geoCode: 'HR', geoName: 'Croatia',        dataYear: 2022, values: { replacement_rate: 54.0, old_age_dependency: 33.5, pension_assets_gdp: 11  } },
    { geoCode: 'RO', geoName: 'Romania',        dataYear: 2022, values: { replacement_rate: 57.5, old_age_dependency: 29.0, pension_assets_gdp: 4   } },
    { geoCode: 'BG', geoName: 'Bulgaria',       dataYear: 2022, values: { replacement_rate: 54.5, old_age_dependency: 34.5, pension_assets_gdp: 6   } },

    // ── Pays baltes ──
    { geoCode: 'EE', geoName: 'Estonia',        dataYear: 2022, values: { replacement_rate: 52.0, old_age_dependency: 32.5, pension_assets_gdp: 16  } },
    { geoCode: 'LT', geoName: 'Lithuania',      dataYear: 2022, values: { replacement_rate: 44.5, old_age_dependency: 32.0, pension_assets_gdp: 9   } },
    { geoCode: 'LV', geoName: 'Latvia',         dataYear: 2022, values: { replacement_rate: 47.5, old_age_dependency: 33.0, pension_assets_gdp: 7   } },

    // ── Balkans ──
    { geoCode: 'RS', geoName: 'Serbia',         dataYear: 2022, values: { replacement_rate: 58.0, old_age_dependency: 29.8, pension_assets_gdp: 2   } },
    { geoCode: 'BA', geoName: 'Bosnia and Herzegovina', dataYear: 2022, values: { replacement_rate: 41.5, old_age_dependency: 26.0, pension_assets_gdp: 1 } },
    { geoCode: 'AL', geoName: 'Albania',        dataYear: 2022, values: { replacement_rate: 51.5, old_age_dependency: 21.5, pension_assets_gdp: 1   } },
    { geoCode: 'MK', geoName: 'North Macedonia', dataYear: 2022, values: { replacement_rate: 54.5, old_age_dependency: 22.0, pension_assets_gdp: 3  } },
    { geoCode: 'ME', geoName: 'Montenegro',     dataYear: 2022, values: { replacement_rate: 47.5, old_age_dependency: 23.5, pension_assets_gdp: 2   } },

    // ── Europe de l'Est (hors UE) ──
    { geoCode: 'RU', geoName: 'Russia',         dataYear: 2022, values: { replacement_rate: 34.0, old_age_dependency: 24.3, pension_assets_gdp: 5   } },
    { geoCode: 'UA', geoName: 'Ukraine',        dataYear: 2022, values: { replacement_rate: 34.5, old_age_dependency: 25.5, pension_assets_gdp: 1   } },
    { geoCode: 'MD', geoName: 'Moldova',        dataYear: 2022, values: { replacement_rate: 31.5, old_age_dependency: 22.0, pension_assets_gdp: 1   } },
    { geoCode: 'BY', geoName: 'Belarus',        dataYear: 2022, values: { replacement_rate: 39.5, old_age_dependency: 24.0, pension_assets_gdp: 1   } },

    // ── Caucase ──
    { geoCode: 'GE', geoName: 'Georgia',        dataYear: 2022, values: { replacement_rate: 27.5, old_age_dependency: 23.5, pension_assets_gdp: 2   } },
    { geoCode: 'AM', geoName: 'Armenia',        dataYear: 2022, values: { replacement_rate: 29.5, old_age_dependency: 19.0, pension_assets_gdp: 3   } },
    { geoCode: 'AZ', geoName: 'Azerbaijan',     dataYear: 2022, values: { replacement_rate: 34.5, old_age_dependency: 10.5, pension_assets_gdp: 2   } },

    // ── Amérique du Nord ──
    { geoCode: 'US', geoName: 'United States',  dataYear: 2022, values: { replacement_rate: 49.0, old_age_dependency: 26.0, pension_assets_gdp: 143 } },
    { geoCode: 'CA', geoName: 'Canada',         dataYear: 2022, values: { replacement_rate: 52.0, old_age_dependency: 28.9, pension_assets_gdp: 147 } },

    // ── Amérique centrale & Caraïbes ──
    { geoCode: 'MX', geoName: 'Mexico',         dataYear: 2022, values: { replacement_rate: 30.0, old_age_dependency: 11.6, pension_assets_gdp: 15  } },
    { geoCode: 'GT', geoName: 'Guatemala',      dataYear: 2022, values: { replacement_rate: 17.5, old_age_dependency:  7.2, pension_assets_gdp: 2   } },
    { geoCode: 'HN', geoName: 'Honduras',       dataYear: 2022, values: { replacement_rate: 19.5, old_age_dependency:  7.5, pension_assets_gdp: 3   } },
    { geoCode: 'SV', geoName: 'El Salvador',    dataYear: 2022, values: { replacement_rate: 34.5, old_age_dependency: 13.0, pension_assets_gdp: 14  } },
    { geoCode: 'CR', geoName: 'Costa Rica',     dataYear: 2022, values: { replacement_rate: 54.5, old_age_dependency: 14.0, pension_assets_gdp: 7   } },
    { geoCode: 'PA', geoName: 'Panama',         dataYear: 2022, values: { replacement_rate: 41.5, old_age_dependency: 12.5, pension_assets_gdp: 5   } },
    { geoCode: 'JM', geoName: 'Jamaica',        dataYear: 2022, values: { replacement_rate: 29.5, old_age_dependency: 13.5, pension_assets_gdp: 9   } },
    { geoCode: 'TT', geoName: 'Trinidad and Tobago', dataYear: 2022, values: { replacement_rate: 34.5, old_age_dependency: 14.5, pension_assets_gdp: 7 } },
    { geoCode: 'DO', geoName: 'Dominican Republic',  dataYear: 2022, values: { replacement_rate: 27.5, old_age_dependency: 11.0, pension_assets_gdp: 9 } },
    { geoCode: 'CU', geoName: 'Cuba',           dataYear: 2022, values: { replacement_rate: 55.0, old_age_dependency: 22.0, pension_assets_gdp: 0   } },
    { geoCode: 'NI', geoName: 'Nicaragua',      dataYear: 2022, values: { replacement_rate: 24.5, old_age_dependency:  8.0, pension_assets_gdp: 3   } },
    { geoCode: 'HT', geoName: 'Haiti',          dataYear: 2022, values: { replacement_rate: 10.0, old_age_dependency:  7.2, pension_assets_gdp: 0   } },

    // ── Amérique du Sud ──
    { geoCode: 'BR', geoName: 'Brazil',         dataYear: 2022, values: { replacement_rate: 76.5, old_age_dependency: 14.7, pension_assets_gdp: 12  } },
    { geoCode: 'AR', geoName: 'Argentina',      dataYear: 2022, values: { replacement_rate: 63.0, old_age_dependency: 18.5, pension_assets_gdp: 2   } },
    { geoCode: 'CL', geoName: 'Chile',          dataYear: 2022, values: { replacement_rate: 37.0, old_age_dependency: 19.3, pension_assets_gdp: 72  } },
    { geoCode: 'CO', geoName: 'Colombia',       dataYear: 2022, values: { replacement_rate: 54.5, old_age_dependency: 13.0, pension_assets_gdp: 24  } },
    { geoCode: 'PE', geoName: 'Peru',           dataYear: 2022, values: { replacement_rate: 37.5, old_age_dependency: 12.0, pension_assets_gdp: 19  } },
    { geoCode: 'VE', geoName: 'Venezuela',      dataYear: 2022, values: { replacement_rate: 40.0, old_age_dependency: 11.0, pension_assets_gdp: 1   } },
    { geoCode: 'EC', geoName: 'Ecuador',        dataYear: 2022, values: { replacement_rate: 49.5, old_age_dependency: 11.5, pension_assets_gdp: 5   } },
    { geoCode: 'UY', geoName: 'Uruguay',        dataYear: 2022, values: { replacement_rate: 61.5, old_age_dependency: 22.5, pension_assets_gdp: 21  } },
    { geoCode: 'PY', geoName: 'Paraguay',       dataYear: 2022, values: { replacement_rate: 29.5, old_age_dependency:  9.5, pension_assets_gdp: 3   } },
    { geoCode: 'BO', geoName: 'Bolivia',        dataYear: 2022, values: { replacement_rate: 27.5, old_age_dependency: 10.0, pension_assets_gdp: 11  } },

    // ── Asie de l'Est ──
    { geoCode: 'JP', geoName: 'Japan',          dataYear: 2022, values: { replacement_rate: 34.6, old_age_dependency: 50.1, pension_assets_gdp: 33  } },
    { geoCode: 'KR', geoName: 'South Korea',    dataYear: 2022, values: { replacement_rate: 31.2, old_age_dependency: 24.6, pension_assets_gdp: 52  } },
    { geoCode: 'CN', geoName: 'China',          dataYear: 2022, values: { replacement_rate: 82.5, old_age_dependency: 20.0, pension_assets_gdp: 2   } },
    { geoCode: 'TW', geoName: 'Taiwan',         dataYear: 2022, values: { replacement_rate: 41.5, old_age_dependency: 25.0, pension_assets_gdp: 17  } },
    { geoCode: 'MN', geoName: 'Mongolia',       dataYear: 2022, values: { replacement_rate: 44.5, old_age_dependency:  8.0, pension_assets_gdp: 3   } },

    // ── Asie du Sud-Est ──
    { geoCode: 'SG', geoName: 'Singapore',      dataYear: 2022, values: { replacement_rate: 55.5, old_age_dependency: 16.9, pension_assets_gdp: 61  } },
    { geoCode: 'TH', geoName: 'Thailand',       dataYear: 2022, values: { replacement_rate: 44.5, old_age_dependency: 19.0, pension_assets_gdp: 9   } },
    { geoCode: 'MY', geoName: 'Malaysia',       dataYear: 2022, values: { replacement_rate: 47.5, old_age_dependency: 10.0, pension_assets_gdp: 53  } },
    { geoCode: 'ID', geoName: 'Indonesia',      dataYear: 2022, values: { replacement_rate: 34.5, old_age_dependency:  9.5, pension_assets_gdp: 4   } },
    { geoCode: 'PH', geoName: 'Philippines',    dataYear: 2022, values: { replacement_rate: 41.5, old_age_dependency:  8.0, pension_assets_gdp: 5   } },
    { geoCode: 'VN', geoName: 'Vietnam',        dataYear: 2022, values: { replacement_rate: 57.5, old_age_dependency: 12.0, pension_assets_gdp: 3   } },
    { geoCode: 'MM', geoName: 'Myanmar',        dataYear: 2022, values: { replacement_rate: 15.0, old_age_dependency:  9.5, pension_assets_gdp: 1   } },
    { geoCode: 'KH', geoName: 'Cambodia',       dataYear: 2022, values: { replacement_rate: 12.0, old_age_dependency:  7.0, pension_assets_gdp: 0   } },
    { geoCode: 'LA', geoName: 'Laos',           dataYear: 2022, values: { replacement_rate: 17.5, old_age_dependency:  6.5, pension_assets_gdp: 1   } },
    { geoCode: 'BN', geoName: 'Brunei',         dataYear: 2022, values: { replacement_rate: 37.5, old_age_dependency:  7.0, pension_assets_gdp: 17  } },

    // ── Asie du Sud ──
    { geoCode: 'IN', geoName: 'India',          dataYear: 2022, values: { replacement_rate: 38.0, old_age_dependency:  9.9, pension_assets_gdp: 4   } },
    { geoCode: 'BD', geoName: 'Bangladesh',     dataYear: 2022, values: { replacement_rate: 19.5, old_age_dependency:  8.0, pension_assets_gdp: 1   } },
    { geoCode: 'PK', geoName: 'Pakistan',       dataYear: 2022, values: { replacement_rate: 21.5, old_age_dependency:  7.0, pension_assets_gdp: 2   } },
    { geoCode: 'LK', geoName: 'Sri Lanka',      dataYear: 2022, values: { replacement_rate: 34.5, old_age_dependency: 17.0, pension_assets_gdp: 5   } },
    { geoCode: 'NP', geoName: 'Nepal',          dataYear: 2022, values: { replacement_rate: 14.5, old_age_dependency:  9.0, pension_assets_gdp: 2   } },
    { geoCode: 'AF', geoName: 'Afghanistan',    dataYear: 2022, values: { replacement_rate:  8.0, old_age_dependency:  4.5, pension_assets_gdp: 0   } },

    // ── Asie centrale ──
    { geoCode: 'KZ', geoName: 'Kazakhstan',     dataYear: 2022, values: { replacement_rate: 41.5, old_age_dependency: 12.0, pension_assets_gdp: 9   } },
    { geoCode: 'UZ', geoName: 'Uzbekistan',     dataYear: 2022, values: { replacement_rate: 37.5, old_age_dependency:  7.5, pension_assets_gdp: 2   } },
    { geoCode: 'TM', geoName: 'Turkmenistan',   dataYear: 2022, values: { replacement_rate: 34.5, old_age_dependency:  7.0, pension_assets_gdp: 1   } },
    { geoCode: 'KG', geoName: 'Kyrgyzstan',     dataYear: 2022, values: { replacement_rate: 29.5, old_age_dependency:  7.5, pension_assets_gdp: 1   } },
    { geoCode: 'TJ', geoName: 'Tajikistan',     dataYear: 2022, values: { replacement_rate: 24.5, old_age_dependency:  5.5, pension_assets_gdp: 0   } },

    // ── Moyen-Orient ──
    { geoCode: 'TR', geoName: 'Turkey',         dataYear: 2022, values: { replacement_rate: 78.4, old_age_dependency: 14.3, pension_assets_gdp: 3   } },
    { geoCode: 'SA', geoName: 'Saudi Arabia',   dataYear: 2022, values: { replacement_rate: 44.0, old_age_dependency:  3.7, pension_assets_gdp: 5   } },
    { geoCode: 'AE', geoName: 'United Arab Emirates', dataYear: 2022, values: { replacement_rate: 47.5, old_age_dependency: 2.2, pension_assets_gdp: 7 } },
    { geoCode: 'IL', geoName: 'Israel',         dataYear: 2022, values: { replacement_rate: 68.5, old_age_dependency: 18.5, pension_assets_gdp: 57  } },
    { geoCode: 'IQ', geoName: 'Iraq',           dataYear: 2022, values: { replacement_rate: 29.5, old_age_dependency:  5.0, pension_assets_gdp: 1   } },
    { geoCode: 'JO', geoName: 'Jordan',         dataYear: 2022, values: { replacement_rate: 49.5, old_age_dependency:  6.5, pension_assets_gdp: 17  } },
    { geoCode: 'LB', geoName: 'Lebanon',        dataYear: 2022, values: { replacement_rate: 35.0, old_age_dependency: 12.0, pension_assets_gdp: 3   } },
    { geoCode: 'KW', geoName: 'Kuwait',         dataYear: 2022, values: { replacement_rate: 54.5, old_age_dependency:  3.5, pension_assets_gdp: 14  } },
    { geoCode: 'QA', geoName: 'Qatar',          dataYear: 2022, values: { replacement_rate: 49.5, old_age_dependency:  2.0, pension_assets_gdp: 9   } },
    { geoCode: 'BH', geoName: 'Bahrain',        dataYear: 2022, values: { replacement_rate: 47.5, old_age_dependency:  3.5, pension_assets_gdp: 11  } },
    { geoCode: 'OM', geoName: 'Oman',           dataYear: 2022, values: { replacement_rate: 41.5, old_age_dependency:  4.0, pension_assets_gdp: 7   } },
    { geoCode: 'YE', geoName: 'Yemen',          dataYear: 2022, values: { replacement_rate: 10.0, old_age_dependency:  4.5, pension_assets_gdp: 0   } },
    { geoCode: 'SY', geoName: 'Syria',          dataYear: 2022, values: { replacement_rate: 15.0, old_age_dependency:  6.5, pension_assets_gdp: 0   } },
    { geoCode: 'IR', geoName: 'Iran',           dataYear: 2022, values: { replacement_rate: 54.5, old_age_dependency: 10.0, pension_assets_gdp: 5   } },

    // ── Afrique du Nord ──
    { geoCode: 'EG', geoName: 'Egypt',          dataYear: 2022, values: { replacement_rate: 49.5, old_age_dependency:  8.0, pension_assets_gdp: 4   } },
    { geoCode: 'MA', geoName: 'Morocco',        dataYear: 2022, values: { replacement_rate: 51.5, old_age_dependency: 11.5, pension_assets_gdp: 17  } },
    { geoCode: 'DZ', geoName: 'Algeria',        dataYear: 2022, values: { replacement_rate: 59.5, old_age_dependency: 10.0, pension_assets_gdp: 1   } },
    { geoCode: 'TN', geoName: 'Tunisia',        dataYear: 2022, values: { replacement_rate: 54.5, old_age_dependency: 13.5, pension_assets_gdp: 4   } },
    { geoCode: 'LY', geoName: 'Libya',          dataYear: 2022, values: { replacement_rate: 44.5, old_age_dependency:  7.0, pension_assets_gdp: 2   } },

    // ── Afrique de l'Ouest ──
    { geoCode: 'NG', geoName: 'Nigeria',        dataYear: 2022, values: { replacement_rate: 24.5, old_age_dependency:  5.2, pension_assets_gdp: 4   } },
    { geoCode: 'GH', geoName: 'Ghana',          dataYear: 2022, values: { replacement_rate: 31.5, old_age_dependency:  5.8, pension_assets_gdp: 5   } },
    { geoCode: 'SN', geoName: 'Senegal',        dataYear: 2022, values: { replacement_rate: 34.5, old_age_dependency:  5.2, pension_assets_gdp: 3   } },
    { geoCode: 'CI', geoName: "Cote d'Ivoire",  dataYear: 2022, values: { replacement_rate: 29.5, old_age_dependency:  5.2, pension_assets_gdp: 3   } },
    { geoCode: 'ML', geoName: 'Mali',           dataYear: 2022, values: { replacement_rate: 19.5, old_age_dependency:  4.8, pension_assets_gdp: 1   } },
    { geoCode: 'NE', geoName: 'Niger',          dataYear: 2022, values: { replacement_rate: 14.5, old_age_dependency:  4.2, pension_assets_gdp: 0   } },
    { geoCode: 'BF', geoName: 'Burkina Faso',   dataYear: 2022, values: { replacement_rate: 17.5, old_age_dependency:  4.2, pension_assets_gdp: 1   } },
    { geoCode: 'GN', geoName: 'Guinea',         dataYear: 2022, values: { replacement_rate: 14.5, old_age_dependency:  4.8, pension_assets_gdp: 0   } },

    // ── Afrique centrale ──
    { geoCode: 'CM', geoName: 'Cameroon',       dataYear: 2022, values: { replacement_rate: 27.5, old_age_dependency:  5.2, pension_assets_gdp: 2   } },
    { geoCode: 'CD', geoName: 'DR Congo',       dataYear: 2022, values: { replacement_rate: 10.0, old_age_dependency:  4.8, pension_assets_gdp: 0   } },
    { geoCode: 'GA', geoName: 'Gabon',          dataYear: 2022, values: { replacement_rate: 39.5, old_age_dependency:  6.0, pension_assets_gdp: 3   } },
    { geoCode: 'TD', geoName: 'Chad',           dataYear: 2022, values: { replacement_rate: 10.0, old_age_dependency:  4.2, pension_assets_gdp: 0   } },
    { geoCode: 'AO', geoName: 'Angola',         dataYear: 2022, values: { replacement_rate: 21.5, old_age_dependency:  4.8, pension_assets_gdp: 2   } },

    // ── Afrique de l'Est ──
    { geoCode: 'KE', geoName: 'Kenya',          dataYear: 2022, values: { replacement_rate: 27.5, old_age_dependency:  4.8, pension_assets_gdp: 11  } },
    { geoCode: 'ET', geoName: 'Ethiopia',       dataYear: 2022, values: { replacement_rate: 17.5, old_age_dependency:  5.8, pension_assets_gdp: 1   } },
    { geoCode: 'TZ', geoName: 'Tanzania',       dataYear: 2022, values: { replacement_rate: 19.5, old_age_dependency:  5.2, pension_assets_gdp: 3   } },
    { geoCode: 'UG', geoName: 'Uganda',         dataYear: 2022, values: { replacement_rate: 17.5, old_age_dependency:  3.8, pension_assets_gdp: 4   } },
    { geoCode: 'RW', geoName: 'Rwanda',         dataYear: 2022, values: { replacement_rate: 14.5, old_age_dependency:  5.2, pension_assets_gdp: 3   } },
    { geoCode: 'MZ', geoName: 'Mozambique',     dataYear: 2022, values: { replacement_rate: 11.5, old_age_dependency:  5.2, pension_assets_gdp: 1   } },
    { geoCode: 'MG', geoName: 'Madagascar',     dataYear: 2022, values: { replacement_rate: 10.0, old_age_dependency:  5.2, pension_assets_gdp: 1   } },
    { geoCode: 'MW', geoName: 'Malawi',         dataYear: 2022, values: { replacement_rate: 10.0, old_age_dependency:  4.8, pension_assets_gdp: 2   } },
    { geoCode: 'SS', geoName: 'South Sudan',    dataYear: 2022, values: { replacement_rate:  5.0, old_age_dependency:  4.2, pension_assets_gdp: 0   } },

    // ── Afrique australe ──
    { geoCode: 'ZA', geoName: 'South Africa',   dataYear: 2022, values: { replacement_rate: 30.0, old_age_dependency:  9.5, pension_assets_gdp: 42  } },
    { geoCode: 'ZW', geoName: 'Zimbabwe',       dataYear: 2022, values: { replacement_rate: 17.5, old_age_dependency:  6.2, pension_assets_gdp: 3   } },
    { geoCode: 'BW', geoName: 'Botswana',       dataYear: 2022, values: { replacement_rate: 24.5, old_age_dependency:  6.5, pension_assets_gdp: 40  } },
    { geoCode: 'NA', geoName: 'Namibia',        dataYear: 2022, values: { replacement_rate: 21.5, old_age_dependency:  5.8, pension_assets_gdp: 53  } },
    { geoCode: 'MU', geoName: 'Mauritius',      dataYear: 2022, values: { replacement_rate: 39.5, old_age_dependency: 18.0, pension_assets_gdp: 19  } },
    { geoCode: 'ZM', geoName: 'Zambia',         dataYear: 2022, values: { replacement_rate: 17.5, old_age_dependency:  4.2, pension_assets_gdp: 4   } },

    // ── Océanie ──
    { geoCode: 'AU', geoName: 'Australia',      dataYear: 2022, values: { replacement_rate: 68.0, old_age_dependency: 26.4, pension_assets_gdp: 125 } },
    { geoCode: 'NZ', geoName: 'New Zealand',    dataYear: 2022, values: { replacement_rate: 55.5, old_age_dependency: 25.3, pension_assets_gdp: 22  } },
    { geoCode: 'FJ', geoName: 'Fiji',           dataYear: 2022, values: { replacement_rate: 29.5, old_age_dependency:  9.5, pension_assets_gdp: 24  } },
    { geoCode: 'PG', geoName: 'Papua New Guinea', dataYear: 2022, values: { replacement_rate: 11.5, old_age_dependency: 5.2, pension_assets_gdp: 3  } },
  ],
};

export default pensionsModule;
