import type { Locale } from '@/lib/domains/types';

export function t(record: Record<string, string>, locale: Locale): string {
  return record[locale] ?? record['en'] ?? Object.values(record)[0] ?? '';
}

export const UI_LABELS: Record<string, Record<Locale, string>> = {
  globalView:       { fr: 'Vue globale',          en: 'Global view'        },
  searchPlaceholder:{ fr: 'Rechercher un pays…',  en: 'Search a country…'  },
  share:            { fr: 'Partager',              en: 'Share'              },
  linkCopied:       { fr: 'Lien copié !',          en: 'Link copied!'       },
  about:            { fr: 'À propos',              en: 'About'              },
  close:            { fr: 'Fermer',                en: 'Close'              },
  rank:             { fr: 'Rang',                  en: 'Rank'               },
  of:               { fr: 'sur',                   en: 'of'                 },
  countries:        { fr: 'pays',                  en: 'countries'          },
  globalScore:      { fr: 'Score global',          en: 'Global score'       },
  worldAvg:         { fr: 'Moyenne mondiale',      en: 'World average'      },
  best:             { fr: 'Meilleur',              en: 'Best'               },
  worst:            { fr: 'Pire',                  en: 'Worst'              },
  distribution:     { fr: 'Distribution',          en: 'Distribution'       },
  fullRanking:      { fr: 'Classement complet',    en: 'Full ranking'       },
  showMore:         { fr: 'Voir plus',             en: 'Show more'          },
  showLess:         { fr: 'Voir moins',            en: 'Show less'          },
  noData:           { fr: 'Sans données',          en: 'No data'            },
  estimatedTrend:   { fr: 'Tendance estimée',      en: 'Estimated trend'    },
  backToMap:        { fr: '← Retour à la carte',   en: '← Back to map'     },
  indicators:       { fr: 'Indicateurs',           en: 'Indicators'         },
  sources:          { fr: 'Sources',               en: 'Sources'            },
  weight:           { fr: 'Poids',                 en: 'Weight'             },
  copySource:       { fr: 'Copier',                en: 'Copy'               },
  copied:           { fr: 'Copié !',               en: 'Copied!'            },
};

export function ui(key: keyof typeof UI_LABELS, locale: Locale): string {
  return UI_LABELS[key]?.[locale] ?? key;
}
