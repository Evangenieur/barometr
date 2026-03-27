/**
 * ISO 3166-1 alpha-2 → flag emoji (Unicode regional indicator symbols)
 * Note: Windows does NOT render flag emojis — they show as "FR", "US" etc.
 * Use getFlagUrl() for cross-platform flag images.
 */
export function getFlagEmoji(isoCode: string): string {
  const code = isoCode.toUpperCase();
  if (code.length !== 2) return '🏳';
  const points = [...code].map((c) => {
    const cp = c.codePointAt(0);
    if (cp === undefined) return 0;
    return 0x1F1E6 + (cp - 65);
  });
  return String.fromCodePoint(...points.filter((p) => p > 0));
}

/**
 * ISO 3166-1 alpha-2 → flag SVG URL (works on all platforms including Windows)
 * Uses flagcdn.com SVG format for crisp rendering at any size
 */
export function getFlagUrl(isoCode: string): string {
  const code = isoCode.toLowerCase();
  return `https://flagcdn.com/${code}.svg`;
}

/** Map of ISO2 → readable country name fallback */
export const ISO2_TO_NAME: Record<string, string> = {
  AF: 'Afghanistan',    AL: 'Albania',        DZ: 'Algeria',      AO: 'Angola',
  AR: 'Argentina',      AM: 'Armenia',        AU: 'Australia',    AT: 'Austria',
  AZ: 'Azerbaijan',     BD: 'Bangladesh',     BY: 'Belarus',      BE: 'Belgium',
  BO: 'Bolivia',        BA: 'Bosnia & Herz.', BR: 'Brazil',       BG: 'Bulgaria',
  CA: 'Canada',         CL: 'Chile',          CN: 'China',        CO: 'Colombia',
  CD: 'DR Congo',       CG: 'Congo',          HR: 'Croatia',      CZ: 'Czechia',
  DK: 'Denmark',        EC: 'Ecuador',        EG: 'Egypt',        ET: 'Ethiopia',
  FI: 'Finland',        FR: 'France',         GE: 'Georgia',      DE: 'Germany',
  GH: 'Ghana',          GR: 'Greece',         GT: 'Guatemala',    HU: 'Hungary',
  IN: 'India',          ID: 'Indonesia',      IR: 'Iran',         IQ: 'Iraq',
  IE: 'Ireland',        IL: 'Israel',         IT: 'Italy',        JP: 'Japan',
  JO: 'Jordan',         KZ: 'Kazakhstan',     KE: 'Kenya',        KR: 'South Korea',
  KW: 'Kuwait',         LB: 'Lebanon',        LU: 'Luxembourg',   MY: 'Malaysia',
  MX: 'Mexico',         MA: 'Morocco',        MZ: 'Mozambique',   MM: 'Myanmar',
  NL: 'Netherlands',    NZ: 'New Zealand',    NI: 'Nicaragua',    NG: 'Nigeria',
  NO: 'Norway',         PK: 'Pakistan',       PE: 'Peru',         PH: 'Philippines',
  PL: 'Poland',         PT: 'Portugal',       QA: 'Qatar',        RO: 'Romania',
  RU: 'Russia',         SA: 'Saudi Arabia',   SN: 'Senegal',      RS: 'Serbia',
  SG: 'Singapore',      SK: 'Slovakia',       ZA: 'South Africa', ES: 'Spain',
  LK: 'Sri Lanka',      SD: 'Sudan',          SE: 'Sweden',       CH: 'Switzerland',
  SY: 'Syria',          TW: 'Taiwan',         TZ: 'Tanzania',     TH: 'Thailand',
  TN: 'Tunisia',        TR: 'Turkey',         UA: 'Ukraine',      AE: 'UAE',
  GB: 'United Kingdom', US: 'United States',  UY: 'Uruguay',      UZ: 'Uzbekistan',
  VE: 'Venezuela',      VN: 'Vietnam',        YE: 'Yemen',        ZM: 'Zambia',
  ZW: 'Zimbabwe',       IS: 'Iceland',
};
