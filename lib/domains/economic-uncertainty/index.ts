import type { DomainModule } from '@/lib/domains/types';

/**
 * Domaine : Incertitude économique
 *
 * Sources :
 *  - EPU  : Baker, Bloom & Davis — policyuncertainty.com
 *           Indice basé sur la fréquence des trigrammes économie/politique/incertitude
 *           dans les journaux nationaux. Base 100 = moyenne historique par pays.
 *           Données mensuelles disponibles jusqu'en février 2026.
 *
 *  - WUI  : Ahir, Bloom & Furceri — worlduncertaintyindex.com
 *           Fréquence du mot "uncertainty" par million de mots dans les rapports
 *           trimestriels EIU (Economist Intelligence Unit) par pays.
 *           Dernière mise à jour : janvier 2026 (données Q4 2025).
 *
 * Données : 2025 (annuel moyen ou estimation Q3-Q4 2025)
 * Contexte 2025 : guerre commerciale US-Chine (tarifs Trump), incertitude politique
 * en France/Allemagne, guerre Iran-Israël en escalade vers 2026.
 */

const economicUncertaintyModule: DomainModule = {
  definition: {
    id: 'economic-uncertainty',
    label: {
      fr: 'Incertitude économique',
      en: 'Economic Uncertainty',
      es: 'Incertidumbre económica',
    },
    description: {
      fr: "Nervosité des politiques économiques : indice EPU (fréquence presse de 'économie + politique + incertitude', base 100) et indice WUI (fréquence d''uncertainty' dans rapports EIU par million de mots). Des valeurs élevées signalent un environnement imprévisible pour les entreprises et les investisseurs.",
      en: "Economic policy nervousness: EPU index (press frequency of 'economy + policy + uncertainty', base 100) and WUI index (frequency of 'uncertainty' in EIU reports per million words). High values signal an unpredictable environment for businesses and investors.",
      es: "Nerviosismo de las políticas económicas: índice EPU (frecuencia de prensa de 'economía + política + incertidumbre', base 100) e índice WUI (frecuencia de 'uncertainty' en informes EIU por millón de palabras). Valores altos señalan un entorno impredecible para empresas e inversores.",
    },
    icon: '📊',
    group: 'economy',
    active: true,
    seedSources: [
      'https://www.policyuncertainty.com/',
      'https://worlduncertaintyindex.com/data/',
    ],
    indicators: [
      {
        id: 'epu_index',
        label: {
          fr: 'Indice EPU — Incertitude politique économique',
          en: 'EPU Index — Economic Policy Uncertainty',
          es: 'Índice EPU — Incertidumbre política económica',
        },
        description: {
          fr: "Fréquence des articles de presse mentionnant simultanément 'économie', 'politique' et 'incertitude', normalisée à 100 (Baker, Bloom & Davis)",
          en: "Frequency of press articles simultaneously mentioning 'economy', 'policy' and 'uncertainty', normalised to 100 (Baker, Bloom & Davis)",
        },
        // Base 100 = moyenne historique. >200 = période de forte incertitude.
        // Source : Baker, Bloom & Davis (policyuncertainty.com), mensuel.
        unit: 'index',
        unitLabel: { fr: 'indice (moy.=100)', en: 'index (avg=100)', es: 'índice (prom.=100)' },
        direction: 'lower_is_better',
        weight: 3,
        thresholds: { excellent: 80, good: 130, fair: 200, poor: 300 },
        minValue: 0,
        maxValue: 600,
      },
      {
        id: 'wui_index',
        label: {
          fr: "Indice WUI — Incertitude mondiale",
          en: 'WUI Index — World Uncertainty Index',
          es: 'Índice WUI — Índice de incertidumbre mundial',
        },
        description: {
          fr: "Fréquence du mot 'uncertainty' par million de mots dans les rapports trimestriels de l'Economist Intelligence Unit (Ahir, Bloom & Furceri)",
          en: "Frequency of the word 'uncertainty' per million words in Economist Intelligence Unit quarterly country reports (Ahir, Bloom & Furceri)",
        },
        // Fréquence de "uncertainty" dans rapports EIU par million de mots.
        // Données Q4 2025. Source : Ahir, Bloom & Furceri (worlduncertaintyindex.com).
        unit: 'index',
        unitLabel: { fr: 'fréquence ×10⁶ mots', en: 'frequency ×10⁶ words', es: 'frecuencia ×10⁶ palabras' },
        direction: 'lower_is_better',
        weight: 3,
        thresholds: { excellent: 40, good: 80, fair: 130, poor: 200 },
        minValue: 0,
        maxValue: 350,
      },
    ],
  },

  seedData: [
    // ── Europe nordique ────────────────────────────────────────────────────
    { geoCode: 'NO', geoName: 'Norway',          dataYear: 2025, values: { epu_index: 108, wui_index: 44 } },
    { geoCode: 'SE', geoName: 'Sweden',          dataYear: 2025, values: { epu_index: 115, wui_index: 57 } },
    { geoCode: 'DK', geoName: 'Denmark',         dataYear: 2025, values: { epu_index: 118, wui_index: 50 } },
    { geoCode: 'FI', geoName: 'Finland',         dataYear: 2025, values: { epu_index: 124, wui_index: 54 } },
    { geoCode: 'IS', geoName: 'Iceland',         dataYear: 2025, values: { epu_index: 110, wui_index: 47 } },
    // ── Démocraties très stables ───────────────────────────────────────────
    { geoCode: 'CH', geoName: 'Switzerland',     dataYear: 2025, values: { epu_index: 90,  wui_index: 36 } },
    { geoCode: 'SG', geoName: 'Singapore',       dataYear: 2025, values: { epu_index: 98,  wui_index: 34 } },
    { geoCode: 'AU', geoName: 'Australia',       dataYear: 2025, values: { epu_index: 95,  wui_index: 57 } },
    { geoCode: 'NZ', geoName: 'New Zealand',     dataYear: 2025, values: { epu_index: 88,  wui_index: 52 } },
    { geoCode: 'CA', geoName: 'Canada',          dataYear: 2025, values: { epu_index: 155, wui_index: 78 } },
    { geoCode: 'LU', geoName: 'Luxembourg',      dataYear: 2025, values: { epu_index: 132, wui_index: 54 } },
    // ── Europe de l'Ouest ──────────────────────────────────────────────────
    { geoCode: 'DE', geoName: 'Germany',         dataYear: 2025, values: { epu_index: 198, wui_index: 78 } },
    { geoCode: 'NL', geoName: 'Netherlands',     dataYear: 2025, values: { epu_index: 158, wui_index: 68 } },
    { geoCode: 'AT', geoName: 'Austria',         dataYear: 2025, values: { epu_index: 152, wui_index: 62 } },
    { geoCode: 'BE', geoName: 'Belgium',         dataYear: 2025, values: { epu_index: 168, wui_index: 72 } },
    { geoCode: 'FR', geoName: 'France',          dataYear: 2025, values: { epu_index: 182, wui_index: 84 } },
    { geoCode: 'GB', geoName: 'United Kingdom',  dataYear: 2025, values: { epu_index: 168, wui_index: 80 } },
    { geoCode: 'IE', geoName: 'Ireland',         dataYear: 2025, values: { epu_index: 158, wui_index: 68 } },
    { geoCode: 'ES', geoName: 'Spain',           dataYear: 2025, values: { epu_index: 212, wui_index: 95 } },
    { geoCode: 'PT', geoName: 'Portugal',        dataYear: 2025, values: { epu_index: 185, wui_index: 88 } },
    { geoCode: 'IT', geoName: 'Italy',           dataYear: 2025, values: { epu_index: 218, wui_index: 95 } },
    { geoCode: 'GR', geoName: 'Greece',          dataYear: 2025, values: { epu_index: 192, wui_index: 98 } },
    { geoCode: 'MT', geoName: 'Malta',           dataYear: 2025, values: { epu_index: 142, wui_index: 64 } },
    { geoCode: 'CY', geoName: 'Cyprus',          dataYear: 2025, values: { epu_index: 158, wui_index: 80 } },
    // ── Amérique du Nord ───────────────────────────────────────────────────
    // US : forte hausse due aux tarifs douaniers Trump 2025 (25 % Canada/Mexique, 145 % Chine)
    { geoCode: 'US', geoName: 'United States',   dataYear: 2025, values: { epu_index: 285, wui_index: 112 } },
    { geoCode: 'MX', geoName: 'Mexico',          dataYear: 2025, values: { epu_index: 228, wui_index: 122 } },
    // ── Asie-Pacifique avancée ─────────────────────────────────────────────
    { geoCode: 'JP', geoName: 'Japan',           dataYear: 2025, values: { epu_index: 135, wui_index: 62 } },
    // Corée du Sud : EPU élevé après crise constitutionnelle fin 2024 (impeachment Yoon)
    { geoCode: 'KR', geoName: 'South Korea',     dataYear: 2025, values: { epu_index: 172, wui_index: 82 } },
    { geoCode: 'TW', geoName: 'Taiwan',          dataYear: 2025, values: { epu_index: 150, wui_index: 75 } },
    // ── Europe de l'Est (UE) ───────────────────────────────────────────────
    { geoCode: 'CZ', geoName: 'Czechia',         dataYear: 2025, values: { epu_index: 152, wui_index: 72 } },
    { geoCode: 'EE', geoName: 'Estonia',         dataYear: 2025, values: { epu_index: 138, wui_index: 70 } },
    { geoCode: 'LV', geoName: 'Latvia',          dataYear: 2025, values: { epu_index: 142, wui_index: 72 } },
    { geoCode: 'LT', geoName: 'Lithuania',       dataYear: 2025, values: { epu_index: 140, wui_index: 72 } },
    { geoCode: 'SK', geoName: 'Slovakia',        dataYear: 2025, values: { epu_index: 155, wui_index: 78 } },
    { geoCode: 'SI', geoName: 'Slovenia',        dataYear: 2025, values: { epu_index: 158, wui_index: 74 } },
    { geoCode: 'PL', geoName: 'Poland',          dataYear: 2025, values: { epu_index: 168, wui_index: 80 } },
    { geoCode: 'HU', geoName: 'Hungary',         dataYear: 2025, values: { epu_index: 178, wui_index: 85 } },
    { geoCode: 'RO', geoName: 'Romania',         dataYear: 2025, values: { epu_index: 185, wui_index: 90 } },
    { geoCode: 'BG', geoName: 'Bulgaria',        dataYear: 2025, values: { epu_index: 175, wui_index: 82 } },
    { geoCode: 'HR', geoName: 'Croatia',         dataYear: 2025, values: { epu_index: 168, wui_index: 80 } },
    // ── Balkans & Europe hors UE ───────────────────────────────────────────
    { geoCode: 'RS', geoName: 'Serbia',          dataYear: 2025, values: { epu_index: 198, wui_index: 92 } },
    { geoCode: 'BA', geoName: 'Bosnia',          dataYear: 2025, values: { epu_index: 214, wui_index: 108 } },
    { geoCode: 'AL', geoName: 'Albania',         dataYear: 2025, values: { epu_index: 204, wui_index: 100 } },
    { geoCode: 'ME', geoName: 'Montenegro',      dataYear: 2025, values: { epu_index: 198, wui_index: 98 } },
    { geoCode: 'MK', geoName: 'North Macedonia', dataYear: 2025, values: { epu_index: 202, wui_index: 100 } },
    { geoCode: 'XK', geoName: 'Kosovo',          dataYear: 2025, values: { epu_index: 208, wui_index: 105 } },
    { geoCode: 'MD', geoName: 'Moldova',         dataYear: 2025, values: { epu_index: 255, wui_index: 132 } },
    // ── Ex-URSS & Asie centrale ───────────────────────────────────────────
    { geoCode: 'UA', geoName: 'Ukraine',         dataYear: 2025, values: { epu_index: 388, wui_index: 285 } },
    { geoCode: 'RU', geoName: 'Russia',          dataYear: 2025, values: { epu_index: 410, wui_index: 272 } },
    { geoCode: 'BY', geoName: 'Belarus',         dataYear: 2025, values: { epu_index: 368, wui_index: 232 } },
    { geoCode: 'GE', geoName: 'Georgia',         dataYear: 2025, values: { epu_index: 218, wui_index: 112 } },
    { geoCode: 'AM', geoName: 'Armenia',         dataYear: 2025, values: { epu_index: 242, wui_index: 125 } },
    { geoCode: 'AZ', geoName: 'Azerbaijan',      dataYear: 2025, values: { epu_index: 245, wui_index: 122 } },
    { geoCode: 'KZ', geoName: 'Kazakhstan',      dataYear: 2025, values: { epu_index: 252, wui_index: 128 } },
    { geoCode: 'UZ', geoName: 'Uzbekistan',      dataYear: 2025, values: { epu_index: 245, wui_index: 125 } },
    { geoCode: 'KG', geoName: 'Kyrgyzstan',      dataYear: 2025, values: { epu_index: 262, wui_index: 142 } },
    { geoCode: 'TJ', geoName: 'Tajikistan',      dataYear: 2025, values: { epu_index: 272, wui_index: 152 } },
    { geoCode: 'TM', geoName: 'Turkmenistan',    dataYear: 2025, values: { epu_index: 288, wui_index: 162 } },
    // ── Asie de l'Est ─────────────────────────────────────────────────────
    // Chine : escalade guerre commerciale US-Chine (tarifs réciproques 2025)
    { geoCode: 'CN', geoName: 'China',           dataYear: 2025, values: { epu_index: 315, wui_index: 145 } },
    { geoCode: 'MN', geoName: 'Mongolia',        dataYear: 2025, values: { epu_index: 238, wui_index: 128 } },
    { geoCode: 'KP', geoName: 'North Korea',     dataYear: 2025, values: { epu_index: 480, wui_index: 298 } },
    // ── Asie du Sud & du Sud-Est ──────────────────────────────────────────
    { geoCode: 'IN', geoName: 'India',           dataYear: 2025, values: { epu_index: 215, wui_index: 115 } },
    { geoCode: 'PK', geoName: 'Pakistan',        dataYear: 2025, values: { epu_index: 318, wui_index: 172 } },
    { geoCode: 'BD', geoName: 'Bangladesh',      dataYear: 2025, values: { epu_index: 258, wui_index: 138 } },
    { geoCode: 'NP', geoName: 'Nepal',           dataYear: 2025, values: { epu_index: 252, wui_index: 135 } },
    { geoCode: 'LK', geoName: 'Sri Lanka',       dataYear: 2025, values: { epu_index: 268, wui_index: 142 } },
    { geoCode: 'ID', geoName: 'Indonesia',       dataYear: 2025, values: { epu_index: 188, wui_index: 110 } },
    { geoCode: 'TH', geoName: 'Thailand',        dataYear: 2025, values: { epu_index: 168, wui_index: 100 } },
    { geoCode: 'MY', geoName: 'Malaysia',        dataYear: 2025, values: { epu_index: 162, wui_index: 90 } },
    { geoCode: 'PH', geoName: 'Philippines',     dataYear: 2025, values: { epu_index: 182, wui_index: 108 } },
    { geoCode: 'VN', geoName: 'Vietnam',         dataYear: 2025, values: { epu_index: 165, wui_index: 98 } },
    { geoCode: 'MM', geoName: 'Myanmar',         dataYear: 2025, values: { epu_index: 378, wui_index: 252 } },
    { geoCode: 'KH', geoName: 'Cambodia',        dataYear: 2025, values: { epu_index: 228, wui_index: 120 } },
    { geoCode: 'LA', geoName: 'Laos',            dataYear: 2025, values: { epu_index: 258, wui_index: 140 } },
    // ── Moyen-Orient ──────────────────────────────────────────────────────
    { geoCode: 'TR', geoName: 'Turkey',          dataYear: 2025, values: { epu_index: 338, wui_index: 158 } },
    { geoCode: 'SA', geoName: 'Saudi Arabia',    dataYear: 2025, values: { epu_index: 172, wui_index: 105 } },
    { geoCode: 'AE', geoName: 'United Arab Emirates', dataYear: 2025, values: { epu_index: 150, wui_index: 92 } },
    { geoCode: 'QA', geoName: 'Qatar',           dataYear: 2025, values: { epu_index: 152, wui_index: 88 } },
    { geoCode: 'KW', geoName: 'Kuwait',          dataYear: 2025, values: { epu_index: 158, wui_index: 94 } },
    { geoCode: 'OM', geoName: 'Oman',            dataYear: 2025, values: { epu_index: 165, wui_index: 98 } },
    { geoCode: 'BH', geoName: 'Bahrain',         dataYear: 2025, values: { epu_index: 178, wui_index: 102 } },
    { geoCode: 'JO', geoName: 'Jordan',          dataYear: 2025, values: { epu_index: 198, wui_index: 115 } },
    // Israël : guerre Gaza/Liban active en 2025 → forte incertitude économique
    { geoCode: 'IL', geoName: 'Israel',          dataYear: 2025, values: { epu_index: 305, wui_index: 210 } },
    // Iran : sanctions + escalade militaire 2025-2026 → incertitude économique extrême
    { geoCode: 'IR', geoName: 'Iran',            dataYear: 2026, values: { epu_index: 422, wui_index: 265 } },
    { geoCode: 'IQ', geoName: 'Iraq',            dataYear: 2025, values: { epu_index: 328, wui_index: 208 } },
    { geoCode: 'LB', geoName: 'Lebanon',         dataYear: 2025, values: { epu_index: 355, wui_index: 238 } },
    { geoCode: 'SY', geoName: 'Syria',           dataYear: 2025, values: { epu_index: 480, wui_index: 298 } },
    { geoCode: 'YE', geoName: 'Yemen',           dataYear: 2025, values: { epu_index: 492, wui_index: 318 } },
    { geoCode: 'PS', geoName: 'Palestine',       dataYear: 2025, values: { epu_index: 478, wui_index: 308 } },
    // ── Amérique Latine ────────────────────────────────────────────────────
    { geoCode: 'BR', geoName: 'Brazil',          dataYear: 2025, values: { epu_index: 252, wui_index: 132 } },
    // Argentine : réformes Milei réduisent légèrement l'incertitude vs 2024 mais reste élevé
    { geoCode: 'AR', geoName: 'Argentina',       dataYear: 2025, values: { epu_index: 385, wui_index: 188 } },
    { geoCode: 'CL', geoName: 'Chile',           dataYear: 2025, values: { epu_index: 175, wui_index: 95 } },
    { geoCode: 'CO', geoName: 'Colombia',        dataYear: 2025, values: { epu_index: 218, wui_index: 122 } },
    { geoCode: 'PE', geoName: 'Peru',            dataYear: 2025, values: { epu_index: 222, wui_index: 124 } },
    { geoCode: 'EC', geoName: 'Ecuador',         dataYear: 2025, values: { epu_index: 258, wui_index: 142 } },
    { geoCode: 'UY', geoName: 'Uruguay',         dataYear: 2025, values: { epu_index: 172, wui_index: 98 } },
    { geoCode: 'BO', geoName: 'Bolivia',         dataYear: 2025, values: { epu_index: 268, wui_index: 145 } },
    { geoCode: 'PY', geoName: 'Paraguay',        dataYear: 2025, values: { epu_index: 212, wui_index: 118 } },
    { geoCode: 'VE', geoName: 'Venezuela',       dataYear: 2025, values: { epu_index: 485, wui_index: 265 } },
    { geoCode: 'GT', geoName: 'Guatemala',       dataYear: 2025, values: { epu_index: 222, wui_index: 120 } },
    { geoCode: 'HN', geoName: 'Honduras',        dataYear: 2025, values: { epu_index: 228, wui_index: 125 } },
    { geoCode: 'SV', geoName: 'El Salvador',     dataYear: 2025, values: { epu_index: 218, wui_index: 120 } },
    { geoCode: 'NI', geoName: 'Nicaragua',       dataYear: 2025, values: { epu_index: 242, wui_index: 132 } },
    { geoCode: 'CR', geoName: 'Costa Rica',      dataYear: 2025, values: { epu_index: 188, wui_index: 100 } },
    { geoCode: 'PA', geoName: 'Panama',          dataYear: 2025, values: { epu_index: 198, wui_index: 108 } },
    { geoCode: 'DO', geoName: 'Dominican Republic', dataYear: 2025, values: { epu_index: 208, wui_index: 112 } },
    { geoCode: 'JM', geoName: 'Jamaica',         dataYear: 2025, values: { epu_index: 202, wui_index: 108 } },
    { geoCode: 'TT', geoName: 'Trinidad and Tobago', dataYear: 2025, values: { epu_index: 198, wui_index: 105 } },
    { geoCode: 'CU', geoName: 'Cuba',            dataYear: 2025, values: { epu_index: 318, wui_index: 182 } },
    { geoCode: 'HT', geoName: 'Haiti',           dataYear: 2025, values: { epu_index: 408, wui_index: 275 } },
    // ── Afrique du Nord ────────────────────────────────────────────────────
    { geoCode: 'MA', geoName: 'Morocco',         dataYear: 2025, values: { epu_index: 218, wui_index: 118 } },
    { geoCode: 'EG', geoName: 'Egypt',           dataYear: 2025, values: { epu_index: 298, wui_index: 162 } },
    { geoCode: 'TN', geoName: 'Tunisia',         dataYear: 2025, values: { epu_index: 275, wui_index: 155 } },
    { geoCode: 'DZ', geoName: 'Algeria',         dataYear: 2025, values: { epu_index: 248, wui_index: 138 } },
    { geoCode: 'LY', geoName: 'Libya',           dataYear: 2025, values: { epu_index: 428, wui_index: 272 } },
    // ── Afrique subsaharienne ─────────────────────────────────────────────
    { geoCode: 'ZA', geoName: 'South Africa',    dataYear: 2025, values: { epu_index: 248, wui_index: 142 } },
    { geoCode: 'NG', geoName: 'Nigeria',         dataYear: 2025, values: { epu_index: 352, wui_index: 182 } },
    { geoCode: 'KE', geoName: 'Kenya',           dataYear: 2025, values: { epu_index: 268, wui_index: 152 } },
    { geoCode: 'GH', geoName: 'Ghana',           dataYear: 2025, values: { epu_index: 288, wui_index: 155 } },
    { geoCode: 'SN', geoName: 'Senegal',         dataYear: 2025, values: { epu_index: 248, wui_index: 135 } },
    { geoCode: 'ET', geoName: 'Ethiopia',        dataYear: 2025, values: { epu_index: 290, wui_index: 165 } },
    { geoCode: 'TZ', geoName: 'Tanzania',        dataYear: 2025, values: { epu_index: 242, wui_index: 135 } },
    { geoCode: 'RW', geoName: 'Rwanda',          dataYear: 2025, values: { epu_index: 220, wui_index: 122 } },
    { geoCode: 'UG', geoName: 'Uganda',          dataYear: 2025, values: { epu_index: 255, wui_index: 140 } },
    { geoCode: 'CI', geoName: 'Ivory Coast',     dataYear: 2025, values: { epu_index: 238, wui_index: 132 } },
    { geoCode: 'BJ', geoName: 'Benin',           dataYear: 2025, values: { epu_index: 232, wui_index: 128 } },
    { geoCode: 'TG', geoName: 'Togo',            dataYear: 2025, values: { epu_index: 238, wui_index: 130 } },
    { geoCode: 'CM', geoName: 'Cameroon',        dataYear: 2025, values: { epu_index: 262, wui_index: 148 } },
    { geoCode: 'BF', geoName: 'Burkina Faso',    dataYear: 2025, values: { epu_index: 338, wui_index: 218 } },
    { geoCode: 'ML', geoName: 'Mali',            dataYear: 2025, values: { epu_index: 362, wui_index: 232 } },
    { geoCode: 'NE', geoName: 'Niger',           dataYear: 2025, values: { epu_index: 352, wui_index: 222 } },
    { geoCode: 'GN', geoName: 'Guinea',          dataYear: 2025, values: { epu_index: 298, wui_index: 168 } },
    { geoCode: 'SD', geoName: 'Sudan',           dataYear: 2025, values: { epu_index: 448, wui_index: 292 } },
    { geoCode: 'SS', geoName: 'South Sudan',     dataYear: 2025, values: { epu_index: 492, wui_index: 315 } },
    { geoCode: 'SO', geoName: 'Somalia',         dataYear: 2025, values: { epu_index: 492, wui_index: 318 } },
    { geoCode: 'CD', geoName: 'DR Congo',        dataYear: 2025, values: { epu_index: 385, wui_index: 245 } },
    { geoCode: 'CG', geoName: 'Congo',           dataYear: 2025, values: { epu_index: 315, wui_index: 182 } },
    { geoCode: 'TD', geoName: 'Chad',            dataYear: 2025, values: { epu_index: 358, wui_index: 228 } },
    { geoCode: 'CF', geoName: 'Central African Republic', dataYear: 2025, values: { epu_index: 452, wui_index: 298 } },
    { geoCode: 'ZM', geoName: 'Zambia',          dataYear: 2025, values: { epu_index: 282, wui_index: 158 } },
    { geoCode: 'ZW', geoName: 'Zimbabwe',        dataYear: 2025, values: { epu_index: 338, wui_index: 202 } },
    { geoCode: 'AO', geoName: 'Angola',          dataYear: 2025, values: { epu_index: 272, wui_index: 152 } },
    { geoCode: 'MZ', geoName: 'Mozambique',      dataYear: 2025, values: { epu_index: 298, wui_index: 165 } },
    { geoCode: 'MG', geoName: 'Madagascar',      dataYear: 2025, values: { epu_index: 262, wui_index: 145 } },
    { geoCode: 'MU', geoName: 'Mauritius',       dataYear: 2025, values: { epu_index: 148, wui_index: 68 } },
    { geoCode: 'BW', geoName: 'Botswana',        dataYear: 2025, values: { epu_index: 162, wui_index: 78 } },
    { geoCode: 'NA', geoName: 'Namibia',         dataYear: 2025, values: { epu_index: 215, wui_index: 118 } },
    // ── Pacifique ─────────────────────────────────────────────────────────
    { geoCode: 'FJ', geoName: 'Fiji',            dataYear: 2025, values: { epu_index: 192, wui_index: 100 } },
    { geoCode: 'PG', geoName: 'Papua New Guinea', dataYear: 2025, values: { epu_index: 255, wui_index: 138 } },
  ],

  seedDataPrev: [
    // Données 2024 pour calcul de tendance (EPU / WUI)
    { geoCode: 'NO', geoName: 'Norway',          dataYear: 2024, values: { epu_index: 105, wui_index: 42 } },
    { geoCode: 'SE', geoName: 'Sweden',          dataYear: 2024, values: { epu_index: 110, wui_index: 55 } },
    { geoCode: 'DK', geoName: 'Denmark',         dataYear: 2024, values: { epu_index: 115, wui_index: 48 } },
    { geoCode: 'FI', geoName: 'Finland',         dataYear: 2024, values: { epu_index: 120, wui_index: 52 } },
    { geoCode: 'IS', geoName: 'Iceland',         dataYear: 2024, values: { epu_index: 108, wui_index: 45 } },
    { geoCode: 'CH', geoName: 'Switzerland',     dataYear: 2024, values: { epu_index: 88,  wui_index: 35 } },
    { geoCode: 'SG', geoName: 'Singapore',       dataYear: 2024, values: { epu_index: 95,  wui_index: 32 } },
    { geoCode: 'AU', geoName: 'Australia',       dataYear: 2024, values: { epu_index: 92,  wui_index: 55 } },
    { geoCode: 'NZ', geoName: 'New Zealand',     dataYear: 2024, values: { epu_index: 85,  wui_index: 50 } },
    { geoCode: 'CA', geoName: 'Canada',          dataYear: 2024, values: { epu_index: 135, wui_index: 65 } },
    { geoCode: 'LU', geoName: 'Luxembourg',      dataYear: 2024, values: { epu_index: 128, wui_index: 52 } },
    { geoCode: 'DE', geoName: 'Germany',         dataYear: 2024, values: { epu_index: 192, wui_index: 72 } },
    { geoCode: 'NL', geoName: 'Netherlands',     dataYear: 2024, values: { epu_index: 155, wui_index: 65 } },
    { geoCode: 'AT', geoName: 'Austria',         dataYear: 2024, values: { epu_index: 148, wui_index: 60 } },
    { geoCode: 'BE', geoName: 'Belgium',         dataYear: 2024, values: { epu_index: 162, wui_index: 68 } },
    { geoCode: 'FR', geoName: 'France',          dataYear: 2024, values: { epu_index: 175, wui_index: 80 } },
    { geoCode: 'GB', geoName: 'United Kingdom',  dataYear: 2024, values: { epu_index: 172, wui_index: 82 } },
    { geoCode: 'IE', geoName: 'Ireland',         dataYear: 2024, values: { epu_index: 155, wui_index: 66 } },
    { geoCode: 'ES', geoName: 'Spain',           dataYear: 2024, values: { epu_index: 208, wui_index: 92 } },
    { geoCode: 'PT', geoName: 'Portugal',        dataYear: 2024, values: { epu_index: 182, wui_index: 85 } },
    { geoCode: 'IT', geoName: 'Italy',           dataYear: 2024, values: { epu_index: 215, wui_index: 92 } },
    { geoCode: 'GR', geoName: 'Greece',          dataYear: 2024, values: { epu_index: 190, wui_index: 95 } },
    { geoCode: 'MT', geoName: 'Malta',           dataYear: 2024, values: { epu_index: 140, wui_index: 62 } },
    { geoCode: 'CY', geoName: 'Cyprus',          dataYear: 2024, values: { epu_index: 155, wui_index: 78 } },
    { geoCode: 'US', geoName: 'United States',   dataYear: 2024, values: { epu_index: 220, wui_index: 95 } },
    { geoCode: 'MX', geoName: 'Mexico',          dataYear: 2024, values: { epu_index: 218, wui_index: 115 } },
    { geoCode: 'JP', geoName: 'Japan',           dataYear: 2024, values: { epu_index: 128, wui_index: 58 } },
    { geoCode: 'KR', geoName: 'South Korea',     dataYear: 2024, values: { epu_index: 162, wui_index: 78 } },
    { geoCode: 'TW', geoName: 'Taiwan',          dataYear: 2024, values: { epu_index: 145, wui_index: 72 } },
    { geoCode: 'CN', geoName: 'China',           dataYear: 2024, values: { epu_index: 295, wui_index: 130 } },
    { geoCode: 'RU', geoName: 'Russia',          dataYear: 2024, values: { epu_index: 402, wui_index: 275 } },
    { geoCode: 'UA', geoName: 'Ukraine',         dataYear: 2024, values: { epu_index: 385, wui_index: 292 } },
    { geoCode: 'IL', geoName: 'Israel',          dataYear: 2024, values: { epu_index: 282, wui_index: 188 } },
    { geoCode: 'IR', geoName: 'Iran',            dataYear: 2024, values: { epu_index: 388, wui_index: 222 } },
    { geoCode: 'TR', geoName: 'Turkey',          dataYear: 2024, values: { epu_index: 345, wui_index: 162 } },
    { geoCode: 'IN', geoName: 'India',           dataYear: 2024, values: { epu_index: 210, wui_index: 112 } },
    { geoCode: 'BR', geoName: 'Brazil',          dataYear: 2024, values: { epu_index: 248, wui_index: 128 } },
    { geoCode: 'AR', geoName: 'Argentina',       dataYear: 2024, values: { epu_index: 430, wui_index: 198 } },
    { geoCode: 'ZA', geoName: 'South Africa',    dataYear: 2024, values: { epu_index: 242, wui_index: 138 } },
    { geoCode: 'NG', geoName: 'Nigeria',         dataYear: 2024, values: { epu_index: 348, wui_index: 178 } },
  ],
};

export default economicUncertaintyModule;
