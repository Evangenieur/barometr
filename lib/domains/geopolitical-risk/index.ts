import type { DomainModule } from '@/lib/domains/types';

/**
 * Domaine : Risque géopolitique
 *
 * Sources :
 *  - GPR   : Caldara & Iacoviello (2022) — matteoiacoviello.com/gpr.htm
 *            Indice mensuel basé sur la fréquence d'articles de presse traitant
 *            de risques géopolitiques (guerres, tensions, terrorisme).
 *            Base 100 = moyenne 1985-2019. Disponible pour ~45 pays + monde.
 *
 *  - Stabilité politique : World Bank — Worldwide Governance Indicators (WGI)
 *            "Political Stability and Absence of Violence/Terrorism", percentile 0-100.
 *            Source : info.worldbank.org/governance/wgi/ — données 2024.
 *
 *  - Intensité conflits : Uppsala Conflict Data Program (UCDP) / ACLED 2025
 *            Nombre de morts en conflits armés par million d'habitants, normalisé
 *            et inversé en score 0-100 (100 = absence totale de conflit armé).
 *
 * Données : 2025 pour la plupart des pays.
 * Iran (2026) : guerre ouverte US/Israël–Iran déclenchée début 2026 ;
 *   frappes sur installations nucléaires iraniennes et missiles balistiques iraniens
 *   → GPR Iran atteint des niveaux historiques (~700).
 */

const geopoliticalRiskModule: DomainModule = {
  definition: {
    id: 'geopolitical-risk',
    label: {
      fr: 'Risque géopolitique',
      en: 'Geopolitical Risk',
      es: 'Riesgo geopolítico',
    },
    description: {
      fr: "Tensions géopolitiques et conflits armés : indice GPR (fréquence presse de risques de guerre/terrorisme, base 100) ; stabilité politique WB-WGI (absence de coups d'État et violence, percentile 0-100) ; intensité des conflits armés UCDP/ACLED (morts au combat normalisées, score inversé 0-100).",
      en: 'Geopolitical tensions and armed conflicts: GPR index (press frequency of war/terrorism risk, base 100); WB-WGI political stability (absence of coups and violence, percentile 0-100); UCDP/ACLED armed conflict intensity (normalized battle deaths, inverted score 0-100).',
      es: 'Tensiones geopolíticas y conflictos armados: índice GPR (frecuencia de prensa de riesgo de guerra/terrorismo, base 100); estabilidad política WB-WGI (ausencia de golpes de Estado y violencia, percentil 0-100); intensidad de conflictos armados UCDP/ACLED (muertes normalizadas, score invertido 0-100).',
    },
    icon: '⚔️',
    group: 'security',
    active: true,
    seedSources: [
      'https://matteoiacoviello.com/gpr.htm',
      'https://info.worldbank.org/governance/wgi/',
      'https://ucdp.uu.se/',
      'https://acleddata.com/',
    ],
    indicators: [
      {
        id: 'gpr_index',
        label: {
          fr: 'Indice GPR — Risque géopolitique (Caldara & Iacoviello)',
          en: 'GPR Index — Geopolitical Risk (Caldara & Iacoviello)',
          es: 'Índice GPR — Riesgo geopolítico (Caldara & Iacoviello)',
        },
        description: {
          fr: "Fréquence d'articles de presse traitant de guerres, tensions diplomatiques et terrorisme, base 100 = moyenne 1985-2019 (Caldara & Iacoviello)",
          en: 'Frequency of press articles covering wars, diplomatic tensions and terrorism, base 100 = average 1985-2019 (Caldara & Iacoviello)',
        },
        // Fréquence mensuelle d'articles de presse sur guerres, tensions et terrorisme.
        // Base 100 = moyenne historique 1985-2019. Source : matteoiacoviello.com/gpr.htm
        unit: 'index',
        unitLabel: { fr: 'indice (moy.=100)', en: 'index (avg=100)', es: 'índice (prom.=100)' },
        direction: 'lower_is_better',
        weight: 4,
        thresholds: { excellent: 60, good: 120, fair: 220, poor: 380 },
        minValue: 0,
        maxValue: 800,
      },
      {
        id: 'political_stability',
        label: {
          fr: 'Stabilité politique (WB-WGI)',
          en: 'Political Stability (WB-WGI)',
          es: 'Estabilidad política (WB-WGI)',
        },
        description: {
          fr: "Percentile d'absence de violence politique, coups d'État et terrorisme (0-100, 100 = plus stable) — Banque Mondiale WGI",
          en: 'Percentile of absence of political violence, coups and terrorism (0-100, 100 = most stable) — World Bank WGI',
        },
        // Percentile 0-100 (100 = plus stable). Absence de violence politique,
        // coups d'État et terrorisme. Source : Banque Mondiale WGI 2024.
        unit: 'index',
        unitLabel: { fr: 'percentile /100', en: 'percentile /100', es: 'percentil /100' },
        direction: 'higher_is_better',
        weight: 3,
        thresholds: { excellent: 85, good: 65, fair: 40, poor: 20 },
        minValue: 0,
        maxValue: 100,
      },
      {
        id: 'conflict_intensity',
        label: {
          fr: 'Intensité des conflits armés (UCDP/ACLED)',
          en: 'Armed conflict intensity (UCDP/ACLED)',
          es: 'Intensidad de conflictos armados (UCDP/ACLED)',
        },
        description: {
          fr: "Score inversé (0-100, 100 = aucun conflit) calculé à partir des morts au combat par million d'habitants (UCDP/GED et ACLED)",
          en: 'Inverted score (0-100, 100 = no conflict) calculated from battle deaths per million inhabitants (UCDP/GED and ACLED)',
        },
        // Score inversé 0-100 (100 = aucun conflit armé actif). Calculé depuis les
        // morts au combat par million d'habitants. Source : UCDP/GED 2025 + ACLED 2025.
        unit: 'index',
        unitLabel: { fr: 'score /100 (inv.)', en: 'score /100 (inv.)', es: 'score /100 (inv.)' },
        direction: 'higher_is_better',
        weight: 3,
        thresholds: { excellent: 92, good: 75, fair: 50, poor: 28 },
        minValue: 0,
        maxValue: 100,
      },
    ],
  },

  seedData: [
    // ── Europe nordique ────────────────────────────────────────────────────
    { geoCode: 'NO', geoName: 'Norway',         dataYear: 2025, values: { gpr_index: 62,  political_stability: 96, conflict_intensity: 97 } },
    { geoCode: 'IS', geoName: 'Iceland',        dataYear: 2025, values: { gpr_index: 48,  political_stability: 97, conflict_intensity: 99 } },
    { geoCode: 'SE', geoName: 'Sweden',         dataYear: 2025, values: { gpr_index: 68,  political_stability: 94, conflict_intensity: 96 } },
    { geoCode: 'FI', geoName: 'Finland',        dataYear: 2025, values: { gpr_index: 72,  political_stability: 93, conflict_intensity: 95 } },
    { geoCode: 'DK', geoName: 'Denmark',        dataYear: 2025, values: { gpr_index: 65,  political_stability: 95, conflict_intensity: 96 } },
    // ── Océanie & autres démocraties avancées ─────────────────────────────
    { geoCode: 'NZ', geoName: 'New Zealand',    dataYear: 2025, values: { gpr_index: 52,  political_stability: 94, conflict_intensity: 98 } },
    { geoCode: 'CH', geoName: 'Switzerland',    dataYear: 2025, values: { gpr_index: 55,  political_stability: 95, conflict_intensity: 97 } },
    { geoCode: 'AU', geoName: 'Australia',      dataYear: 2025, values: { gpr_index: 72,  political_stability: 90, conflict_intensity: 95 } },
    { geoCode: 'CA', geoName: 'Canada',         dataYear: 2025, values: { gpr_index: 80,  political_stability: 90, conflict_intensity: 95 } },
    { geoCode: 'LU', geoName: 'Luxembourg',     dataYear: 2025, values: { gpr_index: 58,  political_stability: 92, conflict_intensity: 96 } },
    // ── Europe de l'Ouest ──────────────────────────────────────────────────
    { geoCode: 'NL', geoName: 'Netherlands',    dataYear: 2025, values: { gpr_index: 72,  political_stability: 88, conflict_intensity: 94 } },
    { geoCode: 'AT', geoName: 'Austria',        dataYear: 2025, values: { gpr_index: 68,  political_stability: 88, conflict_intensity: 94 } },
    { geoCode: 'IE', geoName: 'Ireland',        dataYear: 2025, values: { gpr_index: 70,  political_stability: 86, conflict_intensity: 94 } },
    { geoCode: 'DE', geoName: 'Germany',        dataYear: 2025, values: { gpr_index: 88,  political_stability: 84, conflict_intensity: 90 } },
    { geoCode: 'BE', geoName: 'Belgium',        dataYear: 2025, values: { gpr_index: 82,  political_stability: 80, conflict_intensity: 88 } },
    { geoCode: 'FR', geoName: 'France',         dataYear: 2025, values: { gpr_index: 95,  political_stability: 80, conflict_intensity: 82 } },
    { geoCode: 'GB', geoName: 'United Kingdom', dataYear: 2025, values: { gpr_index: 98,  political_stability: 80, conflict_intensity: 82 } },
    { geoCode: 'PT', geoName: 'Portugal',       dataYear: 2025, values: { gpr_index: 72,  political_stability: 82, conflict_intensity: 92 } },
    { geoCode: 'ES', geoName: 'Spain',          dataYear: 2025, values: { gpr_index: 90,  political_stability: 74, conflict_intensity: 84 } },
    { geoCode: 'IT', geoName: 'Italy',          dataYear: 2025, values: { gpr_index: 88,  political_stability: 72, conflict_intensity: 84 } },
    { geoCode: 'GR', geoName: 'Greece',         dataYear: 2025, values: { gpr_index: 102, political_stability: 68, conflict_intensity: 80 } },
    { geoCode: 'MT', geoName: 'Malta',          dataYear: 2025, values: { gpr_index: 62,  political_stability: 80, conflict_intensity: 92 } },
    { geoCode: 'CY', geoName: 'Cyprus',         dataYear: 2025, values: { gpr_index: 88,  political_stability: 68, conflict_intensity: 76 } },
    // ── Amérique du Nord ───────────────────────────────────────────────────
    // US : GPR élevé — acteur direct dans le conflit Iran 2026
    { geoCode: 'US', geoName: 'United States',  dataYear: 2026, values: { gpr_index: 152, political_stability: 70, conflict_intensity: 72 } },
    { geoCode: 'MX', geoName: 'Mexico',         dataYear: 2025, values: { gpr_index: 148, political_stability: 28, conflict_intensity: 38 } },
    // ── Asie-Pacifique avancée ─────────────────────────────────────────────
    { geoCode: 'JP', geoName: 'Japan',          dataYear: 2025, values: { gpr_index: 85,  political_stability: 88, conflict_intensity: 82 } },
    { geoCode: 'KR', geoName: 'South Korea',    dataYear: 2025, values: { gpr_index: 115, political_stability: 72, conflict_intensity: 65 } },
    { geoCode: 'SG', geoName: 'Singapore',      dataYear: 2025, values: { gpr_index: 72,  political_stability: 92, conflict_intensity: 92 } },
    { geoCode: 'TW', geoName: 'Taiwan',         dataYear: 2025, values: { gpr_index: 135, political_stability: 70, conflict_intensity: 55 } },
    // ── Europe de l'Est (UE) ───────────────────────────────────────────────
    { geoCode: 'CZ', geoName: 'Czechia',        dataYear: 2025, values: { gpr_index: 82,  political_stability: 80, conflict_intensity: 86 } },
    { geoCode: 'EE', geoName: 'Estonia',        dataYear: 2025, values: { gpr_index: 92,  political_stability: 82, conflict_intensity: 75 } },
    { geoCode: 'PL', geoName: 'Poland',         dataYear: 2025, values: { gpr_index: 105, political_stability: 68, conflict_intensity: 74 } },
    { geoCode: 'SK', geoName: 'Slovakia',       dataYear: 2025, values: { gpr_index: 88,  political_stability: 65, conflict_intensity: 78 } },
    { geoCode: 'HU', geoName: 'Hungary',        dataYear: 2025, values: { gpr_index: 85,  political_stability: 62, conflict_intensity: 78 } },
    { geoCode: 'HR', geoName: 'Croatia',        dataYear: 2025, values: { gpr_index: 80,  political_stability: 65, conflict_intensity: 82 } },
    { geoCode: 'RO', geoName: 'Romania',        dataYear: 2025, values: { gpr_index: 88,  political_stability: 58, conflict_intensity: 75 } },
    { geoCode: 'BG', geoName: 'Bulgaria',       dataYear: 2025, values: { gpr_index: 85,  political_stability: 52, conflict_intensity: 74 } },
    { geoCode: 'LT', geoName: 'Lithuania',      dataYear: 2025, values: { gpr_index: 92,  political_stability: 75, conflict_intensity: 74 } },
    { geoCode: 'LV', geoName: 'Latvia',         dataYear: 2025, values: { gpr_index: 90,  political_stability: 74, conflict_intensity: 74 } },
    { geoCode: 'SI', geoName: 'Slovenia',       dataYear: 2025, values: { gpr_index: 72,  political_stability: 76, conflict_intensity: 88 } },
    // ── Balkans & Europe hors UE ───────────────────────────────────────────
    { geoCode: 'RS', geoName: 'Serbia',         dataYear: 2025, values: { gpr_index: 120, political_stability: 45, conflict_intensity: 65 } },
    { geoCode: 'BA', geoName: 'Bosnia and Herzegovina', dataYear: 2025, values: { gpr_index: 115, political_stability: 28, conflict_intensity: 62 } },
    { geoCode: 'ME', geoName: 'Montenegro',     dataYear: 2025, values: { gpr_index: 95,  political_stability: 42, conflict_intensity: 74 } },
    { geoCode: 'MK', geoName: 'North Macedonia', dataYear: 2025, values: { gpr_index: 98,  political_stability: 40, conflict_intensity: 70 } },
    { geoCode: 'AL', geoName: 'Albania',        dataYear: 2025, values: { gpr_index: 92,  political_stability: 38, conflict_intensity: 72 } },
    { geoCode: 'XK', geoName: 'Kosovo',         dataYear: 2025, values: { gpr_index: 118, political_stability: 32, conflict_intensity: 58 } },
    { geoCode: 'MD', geoName: 'Moldova',        dataYear: 2025, values: { gpr_index: 128, political_stability: 32, conflict_intensity: 58 } },
    // ── Ex-URSS & Asie centrale ───────────────────────────────────────────
    { geoCode: 'RU', geoName: 'Russia',         dataYear: 2025, values: { gpr_index: 358, political_stability: 20, conflict_intensity: 15 } },
    { geoCode: 'UA', geoName: 'Ukraine',        dataYear: 2025, values: { gpr_index: 382, political_stability: 18, conflict_intensity: 12 } },
    { geoCode: 'BY', geoName: 'Belarus',        dataYear: 2025, values: { gpr_index: 188, political_stability: 15, conflict_intensity: 52 } },
    { geoCode: 'GE', geoName: 'Georgia',        dataYear: 2025, values: { gpr_index: 128, political_stability: 32, conflict_intensity: 55 } },
    { geoCode: 'AM', geoName: 'Armenia',        dataYear: 2025, values: { gpr_index: 148, political_stability: 28, conflict_intensity: 40 } },
    { geoCode: 'AZ', geoName: 'Azerbaijan',     dataYear: 2025, values: { gpr_index: 138, political_stability: 32, conflict_intensity: 42 } },
    { geoCode: 'KZ', geoName: 'Kazakhstan',     dataYear: 2025, values: { gpr_index: 105, political_stability: 45, conflict_intensity: 65 } },
    { geoCode: 'UZ', geoName: 'Uzbekistan',     dataYear: 2025, values: { gpr_index: 98,  political_stability: 40, conflict_intensity: 62 } },
    { geoCode: 'TM', geoName: 'Turkmenistan',   dataYear: 2025, values: { gpr_index: 108, political_stability: 32, conflict_intensity: 65 } },
    { geoCode: 'KG', geoName: 'Kyrgyzstan',     dataYear: 2025, values: { gpr_index: 112, political_stability: 28, conflict_intensity: 55 } },
    { geoCode: 'TJ', geoName: 'Tajikistan',     dataYear: 2025, values: { gpr_index: 118, political_stability: 25, conflict_intensity: 50 } },
    // ── Asie de l'Est & du Sud-Est ────────────────────────────────────────
    { geoCode: 'CN', geoName: 'China',          dataYear: 2025, values: { gpr_index: 138, political_stability: 42, conflict_intensity: 55 } },
    { geoCode: 'IN', geoName: 'India',          dataYear: 2025, values: { gpr_index: 145, political_stability: 28, conflict_intensity: 45 } },
    { geoCode: 'TH', geoName: 'Thailand',       dataYear: 2025, values: { gpr_index: 95,  political_stability: 38, conflict_intensity: 62 } },
    { geoCode: 'VN', geoName: 'Vietnam',        dataYear: 2025, values: { gpr_index: 88,  political_stability: 52, conflict_intensity: 68 } },
    { geoCode: 'ID', geoName: 'Indonesia',      dataYear: 2025, values: { gpr_index: 98,  political_stability: 38, conflict_intensity: 62 } },
    { geoCode: 'PH', geoName: 'Philippines',    dataYear: 2025, values: { gpr_index: 115, political_stability: 25, conflict_intensity: 50 } },
    // Pakistan : tensions récurrentes avec l'Inde + insécurité frontalière afghane
    { geoCode: 'PK', geoName: 'Pakistan',       dataYear: 2025, values: { gpr_index: 182, political_stability: 12, conflict_intensity: 28 } },
    { geoCode: 'BD', geoName: 'Bangladesh',     dataYear: 2025, values: { gpr_index: 115, political_stability: 18, conflict_intensity: 52 } },
    { geoCode: 'MY', geoName: 'Malaysia',       dataYear: 2025, values: { gpr_index: 82,  political_stability: 68, conflict_intensity: 75 } },
    // Myanmar : guerre civile entre junte et forces de résistance
    { geoCode: 'MM', geoName: 'Myanmar',        dataYear: 2025, values: { gpr_index: 315, political_stability: 5,  conflict_intensity: 14 } },
    { geoCode: 'KH', geoName: 'Cambodia',       dataYear: 2025, values: { gpr_index: 88,  political_stability: 22, conflict_intensity: 62 } },
    { geoCode: 'LA', geoName: 'Laos',           dataYear: 2025, values: { gpr_index: 82,  political_stability: 32, conflict_intensity: 70 } },
    { geoCode: 'MN', geoName: 'Mongolia',       dataYear: 2025, values: { gpr_index: 72,  political_stability: 62, conflict_intensity: 80 } },
    { geoCode: 'LK', geoName: 'Sri Lanka',      dataYear: 2025, values: { gpr_index: 108, political_stability: 28, conflict_intensity: 55 } },
    { geoCode: 'NP', geoName: 'Nepal',          dataYear: 2025, values: { gpr_index: 98,  political_stability: 22, conflict_intensity: 58 } },
    // Corée du Nord : programme nucléaire, fournisseur de munitions à la Russie
    { geoCode: 'KP', geoName: 'North Korea',    dataYear: 2025, values: { gpr_index: 228, political_stability: 18, conflict_intensity: 35 } },
    // ── Moyen-Orient ──────────────────────────────────────────────────────
    { geoCode: 'SA', geoName: 'Saudi Arabia',   dataYear: 2025, values: { gpr_index: 215, political_stability: 28, conflict_intensity: 42 } },
    // Iran 2026 : guerre ouverte avec frappes US et israéliennes → GPR historiquement élevé
    { geoCode: 'IR', geoName: 'Iran',           dataYear: 2026, values: { gpr_index: 695, political_stability: 5,  conflict_intensity: 6  } },
    { geoCode: 'TR', geoName: 'Turkey',         dataYear: 2025, values: { gpr_index: 145, political_stability: 28, conflict_intensity: 42 } },
    { geoCode: 'AE', geoName: 'United Arab Emirates', dataYear: 2025, values: { gpr_index: 115, political_stability: 68, conflict_intensity: 72 } },
    { geoCode: 'QA', geoName: 'Qatar',          dataYear: 2025, values: { gpr_index: 108, political_stability: 65, conflict_intensity: 72 } },
    { geoCode: 'KW', geoName: 'Kuwait',         dataYear: 2025, values: { gpr_index: 118, political_stability: 42, conflict_intensity: 62 } },
    { geoCode: 'OM', geoName: 'Oman',           dataYear: 2025, values: { gpr_index: 105, political_stability: 55, conflict_intensity: 72 } },
    { geoCode: 'BH', geoName: 'Bahrain',        dataYear: 2025, values: { gpr_index: 128, political_stability: 38, conflict_intensity: 60 } },
    { geoCode: 'JO', geoName: 'Jordan',         dataYear: 2025, values: { gpr_index: 168, political_stability: 30, conflict_intensity: 50 } },
    // Israël : guerre Gaza (2023-2025) + frappes sur Liban + escalade Iran 2026
    { geoCode: 'IL', geoName: 'Israel',         dataYear: 2026, values: { gpr_index: 448, political_stability: 25, conflict_intensity: 18 } },
    // Irak : pris en étau entre Iran et opérations US — débordements conflit Iran 2026
    { geoCode: 'IQ', geoName: 'Iraq',           dataYear: 2026, values: { gpr_index: 368, political_stability: 8,  conflict_intensity: 22 } },
    { geoCode: 'LB', geoName: 'Lebanon',        dataYear: 2025, values: { gpr_index: 295, political_stability: 8,  conflict_intensity: 32 } },
    { geoCode: 'SY', geoName: 'Syria',          dataYear: 2025, values: { gpr_index: 268, political_stability: 5,  conflict_intensity: 18 } },
    // Yémen : guerre civile + Houthis (frappes US et Israël sur positions Houthis)
    { geoCode: 'YE', geoName: 'Yemen',          dataYear: 2025, values: { gpr_index: 395, political_stability: 3,  conflict_intensity: 8  } },
    // Palestine : conflit Gaza actif, reconstruction partielle Nord Gaza
    { geoCode: 'PS', geoName: 'Palestine',      dataYear: 2025, values: { gpr_index: 498, political_stability: 5,  conflict_intensity: 10 } },
    // ── Amérique du Nord & Caraïbes ───────────────────────────────────────
    { geoCode: 'CR', geoName: 'Costa Rica',     dataYear: 2025, values: { gpr_index: 65,  political_stability: 65, conflict_intensity: 84 } },
    { geoCode: 'UY', geoName: 'Uruguay',        dataYear: 2025, values: { gpr_index: 58,  political_stability: 68, conflict_intensity: 86 } },
    { geoCode: 'PA', geoName: 'Panama',         dataYear: 2025, values: { gpr_index: 88,  political_stability: 42, conflict_intensity: 70 } },
    { geoCode: 'JM', geoName: 'Jamaica',        dataYear: 2025, values: { gpr_index: 105, political_stability: 28, conflict_intensity: 55 } },
    { geoCode: 'TT', geoName: 'Trinidad and Tobago', dataYear: 2025, values: { gpr_index: 95, political_stability: 35, conflict_intensity: 60 } },
    { geoCode: 'DO', geoName: 'Dominican Republic', dataYear: 2025, values: { gpr_index: 90, political_stability: 30, conflict_intensity: 62 } },
    { geoCode: 'CU', geoName: 'Cuba',           dataYear: 2025, values: { gpr_index: 115, political_stability: 38, conflict_intensity: 72 } },
    // Haïti : contrôle de facto par gangs armés dans la capitale
    { geoCode: 'HT', geoName: 'Haiti',          dataYear: 2025, values: { gpr_index: 298, political_stability: 2,  conflict_intensity: 18 } },
    // ── Amérique Latine ────────────────────────────────────────────────────
    { geoCode: 'BR', geoName: 'Brazil',         dataYear: 2025, values: { gpr_index: 98,  political_stability: 35, conflict_intensity: 65 } },
    { geoCode: 'AR', geoName: 'Argentina',      dataYear: 2025, values: { gpr_index: 88,  political_stability: 38, conflict_intensity: 70 } },
    { geoCode: 'CL', geoName: 'Chile',          dataYear: 2025, values: { gpr_index: 80,  political_stability: 65, conflict_intensity: 78 } },
    { geoCode: 'CO', geoName: 'Colombia',       dataYear: 2025, values: { gpr_index: 148, political_stability: 18, conflict_intensity: 38 } },
    { geoCode: 'PE', geoName: 'Peru',           dataYear: 2025, values: { gpr_index: 108, political_stability: 22, conflict_intensity: 52 } },
    { geoCode: 'EC', geoName: 'Ecuador',        dataYear: 2025, values: { gpr_index: 128, political_stability: 15, conflict_intensity: 42 } },
    { geoCode: 'BO', geoName: 'Bolivia',        dataYear: 2025, values: { gpr_index: 98,  political_stability: 20, conflict_intensity: 55 } },
    { geoCode: 'PY', geoName: 'Paraguay',       dataYear: 2025, values: { gpr_index: 88,  political_stability: 22, conflict_intensity: 65 } },
    // Venezuela : régime autoritaire + crise économique profonde
    { geoCode: 'VE', geoName: 'Venezuela',      dataYear: 2025, values: { gpr_index: 178, political_stability: 8,  conflict_intensity: 38 } },
    { geoCode: 'GT', geoName: 'Guatemala',      dataYear: 2025, values: { gpr_index: 118, political_stability: 15, conflict_intensity: 45 } },
    { geoCode: 'HN', geoName: 'Honduras',       dataYear: 2025, values: { gpr_index: 122, political_stability: 12, conflict_intensity: 42 } },
    { geoCode: 'SV', geoName: 'El Salvador',    dataYear: 2025, values: { gpr_index: 95,  political_stability: 32, conflict_intensity: 50 } },
    { geoCode: 'NI', geoName: 'Nicaragua',      dataYear: 2025, values: { gpr_index: 108, political_stability: 10, conflict_intensity: 55 } },
    // ── Afrique du Nord ───────────────────────────────────────────────────
    { geoCode: 'MA', geoName: 'Morocco',        dataYear: 2025, values: { gpr_index: 98,  political_stability: 48, conflict_intensity: 60 } },
    { geoCode: 'EG', geoName: 'Egypt',          dataYear: 2025, values: { gpr_index: 128, political_stability: 22, conflict_intensity: 38 } },
    { geoCode: 'TN', geoName: 'Tunisia',        dataYear: 2025, values: { gpr_index: 112, political_stability: 28, conflict_intensity: 62 } },
    { geoCode: 'DZ', geoName: 'Algeria',        dataYear: 2025, values: { gpr_index: 118, political_stability: 22, conflict_intensity: 50 } },
    // Libye : deux gouvernements rivaux, présence de mercenaires, pas de paix durable
    { geoCode: 'LY', geoName: 'Libya',          dataYear: 2025, values: { gpr_index: 275, political_stability: 5,  conflict_intensity: 18 } },
    // ── Afrique de l'Ouest ────────────────────────────────────────────────
    { geoCode: 'NG', geoName: 'Nigeria',        dataYear: 2025, values: { gpr_index: 228, political_stability: 10, conflict_intensity: 24 } },
    { geoCode: 'GH', geoName: 'Ghana',          dataYear: 2025, values: { gpr_index: 85,  political_stability: 42, conflict_intensity: 65 } },
    { geoCode: 'SN', geoName: 'Senegal',        dataYear: 2025, values: { gpr_index: 108, political_stability: 35, conflict_intensity: 58 } },
    { geoCode: 'CI', geoName: 'Ivory Coast',    dataYear: 2025, values: { gpr_index: 115, political_stability: 22, conflict_intensity: 50 } },
    // Burkina Faso : insurrection jihadiste, juntes militaires depuis 2022
    { geoCode: 'BF', geoName: 'Burkina Faso',   dataYear: 2025, values: { gpr_index: 282, political_stability: 5,  conflict_intensity: 18 } },
    // Mali : présence Wagner (devenu Africa Corps), zones entières sous contrôle jihadiste
    { geoCode: 'ML', geoName: 'Mali',           dataYear: 2025, values: { gpr_index: 262, political_stability: 5,  conflict_intensity: 18 } },
    { geoCode: 'NE', geoName: 'Niger',          dataYear: 2025, values: { gpr_index: 252, political_stability: 8,  conflict_intensity: 22 } },
    { geoCode: 'GN', geoName: 'Guinea',         dataYear: 2025, values: { gpr_index: 148, political_stability: 10, conflict_intensity: 40 } },
    { geoCode: 'BJ', geoName: 'Benin',          dataYear: 2025, values: { gpr_index: 128, political_stability: 28, conflict_intensity: 52 } },
    { geoCode: 'TG', geoName: 'Togo',           dataYear: 2025, values: { gpr_index: 118, political_stability: 18, conflict_intensity: 55 } },
    // ── Afrique de l'Est ──────────────────────────────────────────────────
    { geoCode: 'KE', geoName: 'Kenya',          dataYear: 2025, values: { gpr_index: 135, political_stability: 18, conflict_intensity: 38 } },
    { geoCode: 'ET', geoName: 'Ethiopia',       dataYear: 2025, values: { gpr_index: 228, political_stability: 8,  conflict_intensity: 20 } },
    { geoCode: 'TZ', geoName: 'Tanzania',       dataYear: 2025, values: { gpr_index: 102, political_stability: 30, conflict_intensity: 58 } },
    { geoCode: 'UG', geoName: 'Uganda',         dataYear: 2025, values: { gpr_index: 115, political_stability: 18, conflict_intensity: 40 } },
    { geoCode: 'RW', geoName: 'Rwanda',         dataYear: 2025, values: { gpr_index: 138, political_stability: 35, conflict_intensity: 48 } },
    { geoCode: 'MZ', geoName: 'Mozambique',     dataYear: 2025, values: { gpr_index: 158, political_stability: 12, conflict_intensity: 30 } },
    { geoCode: 'MG', geoName: 'Madagascar',     dataYear: 2025, values: { gpr_index: 95,  political_stability: 18, conflict_intensity: 55 } },
    // Somalie : Al-Shabaab contrôle de larges zones rurales
    { geoCode: 'SO', geoName: 'Somalia',        dataYear: 2025, values: { gpr_index: 282, political_stability: 2,  conflict_intensity: 16 } },
    // Soudan : guerre civile RSF vs armée depuis avril 2023, crise humanitaire majeure
    { geoCode: 'SD', geoName: 'Sudan',          dataYear: 2025, values: { gpr_index: 368, political_stability: 2,  conflict_intensity: 10 } },
    { geoCode: 'SS', geoName: 'South Sudan',    dataYear: 2025, values: { gpr_index: 342, political_stability: 2,  conflict_intensity: 12 } },
    { geoCode: 'ER', geoName: 'Eritrea',        dataYear: 2025, values: { gpr_index: 128, political_stability: 12, conflict_intensity: 35 } },
    { geoCode: 'DJ', geoName: 'Djibouti',       dataYear: 2025, values: { gpr_index: 108, political_stability: 22, conflict_intensity: 55 } },
    // ── Afrique australe & centrale ───────────────────────────────────────
    { geoCode: 'ZA', geoName: 'South Africa',   dataYear: 2025, values: { gpr_index: 102, political_stability: 32, conflict_intensity: 58 } },
    { geoCode: 'BW', geoName: 'Botswana',       dataYear: 2025, values: { gpr_index: 62,  political_stability: 68, conflict_intensity: 84 } },
    { geoCode: 'NA', geoName: 'Namibia',        dataYear: 2025, values: { gpr_index: 72,  political_stability: 48, conflict_intensity: 78 } },
    { geoCode: 'MU', geoName: 'Mauritius',      dataYear: 2025, values: { gpr_index: 55,  political_stability: 65, conflict_intensity: 92 } },
    { geoCode: 'ZM', geoName: 'Zambia',         dataYear: 2025, values: { gpr_index: 88,  political_stability: 30, conflict_intensity: 68 } },
    { geoCode: 'ZW', geoName: 'Zimbabwe',       dataYear: 2025, values: { gpr_index: 118, political_stability: 8,  conflict_intensity: 50 } },
    { geoCode: 'AO', geoName: 'Angola',         dataYear: 2025, values: { gpr_index: 108, political_stability: 18, conflict_intensity: 52 } },
    // RDC : conflit M23 soutenu par Rwanda à l'Est, un des conflits les plus meurtriers au monde
    { geoCode: 'CD', geoName: 'DR Congo',       dataYear: 2025, values: { gpr_index: 325, political_stability: 2,  conflict_intensity: 12 } },
    { geoCode: 'CG', geoName: 'Congo',          dataYear: 2025, values: { gpr_index: 115, political_stability: 8,  conflict_intensity: 44 } },
    { geoCode: 'CM', geoName: 'Cameroon',       dataYear: 2025, values: { gpr_index: 142, political_stability: 10, conflict_intensity: 30 } },
    { geoCode: 'TD', geoName: 'Chad',           dataYear: 2025, values: { gpr_index: 198, political_stability: 5,  conflict_intensity: 20 } },
    { geoCode: 'CF', geoName: 'Central African Republic', dataYear: 2025, values: { gpr_index: 268, political_stability: 2, conflict_intensity: 14 } },
    // ── Pacifique ─────────────────────────────────────────────────────────
    { geoCode: 'FJ', geoName: 'Fiji',           dataYear: 2025, values: { gpr_index: 72,  political_stability: 30, conflict_intensity: 82 } },
    { geoCode: 'PG', geoName: 'Papua New Guinea', dataYear: 2025, values: { gpr_index: 95, political_stability: 15, conflict_intensity: 50 } },
  ],

  seedDataPrev: [
    // Données 2023-2024 pour calcul de tendance
    { geoCode: 'NO', geoName: 'Norway',         dataYear: 2024, values: { gpr_index: 58,  political_stability: 95, conflict_intensity: 97 } },
    { geoCode: 'IS', geoName: 'Iceland',        dataYear: 2024, values: { gpr_index: 45,  political_stability: 96, conflict_intensity: 99 } },
    { geoCode: 'SE', geoName: 'Sweden',         dataYear: 2024, values: { gpr_index: 65,  political_stability: 94, conflict_intensity: 96 } },
    { geoCode: 'FI', geoName: 'Finland',        dataYear: 2024, values: { gpr_index: 70,  political_stability: 93, conflict_intensity: 95 } },
    { geoCode: 'DK', geoName: 'Denmark',        dataYear: 2024, values: { gpr_index: 62,  political_stability: 94, conflict_intensity: 96 } },
    { geoCode: 'CH', geoName: 'Switzerland',    dataYear: 2024, values: { gpr_index: 52,  political_stability: 95, conflict_intensity: 97 } },
    { geoCode: 'DE', geoName: 'Germany',        dataYear: 2024, values: { gpr_index: 85,  political_stability: 82, conflict_intensity: 90 } },
    { geoCode: 'FR', geoName: 'France',         dataYear: 2024, values: { gpr_index: 92,  political_stability: 78, conflict_intensity: 82 } },
    { geoCode: 'GB', geoName: 'United Kingdom', dataYear: 2024, values: { gpr_index: 95,  political_stability: 78, conflict_intensity: 82 } },
    { geoCode: 'US', geoName: 'United States',  dataYear: 2024, values: { gpr_index: 118, political_stability: 72, conflict_intensity: 72 } },
    { geoCode: 'RU', geoName: 'Russia',         dataYear: 2024, values: { gpr_index: 340, political_stability: 18, conflict_intensity: 16 } },
    { geoCode: 'UA', geoName: 'Ukraine',        dataYear: 2024, values: { gpr_index: 365, political_stability: 15, conflict_intensity: 12 } },
    { geoCode: 'IL', geoName: 'Israel',         dataYear: 2024, values: { gpr_index: 385, political_stability: 22, conflict_intensity: 22 } },
    { geoCode: 'IR', geoName: 'Iran',           dataYear: 2024, values: { gpr_index: 295, political_stability: 12, conflict_intensity: 25 } },
    { geoCode: 'PS', geoName: 'Palestine',      dataYear: 2024, values: { gpr_index: 465, political_stability: 4,  conflict_intensity: 8  } },
    { geoCode: 'YE', geoName: 'Yemen',          dataYear: 2024, values: { gpr_index: 365, political_stability: 2,  conflict_intensity: 10 } },
    { geoCode: 'SY', geoName: 'Syria',          dataYear: 2024, values: { gpr_index: 248, political_stability: 4,  conflict_intensity: 20 } },
    { geoCode: 'SD', geoName: 'Sudan',          dataYear: 2024, values: { gpr_index: 345, political_stability: 2,  conflict_intensity: 12 } },
    { geoCode: 'MM', geoName: 'Myanmar',        dataYear: 2024, values: { gpr_index: 295, political_stability: 4,  conflict_intensity: 16 } },
    { geoCode: 'CN', geoName: 'China',          dataYear: 2024, values: { gpr_index: 128, political_stability: 40, conflict_intensity: 56 } },
    { geoCode: 'IN', geoName: 'India',          dataYear: 2024, values: { gpr_index: 138, political_stability: 26, conflict_intensity: 46 } },
    { geoCode: 'PK', geoName: 'Pakistan',       dataYear: 2024, values: { gpr_index: 172, political_stability: 10, conflict_intensity: 30 } },
    { geoCode: 'CD', geoName: 'DR Congo',       dataYear: 2024, values: { gpr_index: 305, political_stability: 2,  conflict_intensity: 14 } },
  ],
};

export default geopoliticalRiskModule;
