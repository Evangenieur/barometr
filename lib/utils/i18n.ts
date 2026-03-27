import type { Locale } from '@/lib/domains/types';

export function t(record: Record<string, string>, locale: Locale): string {
  return record[locale] ?? record['en'] ?? Object.values(record)[0] ?? '';
}

export const UI_LABELS: Record<string, Record<Locale, string>> = {
  globalView:       { fr: 'Vue globale',            en: 'Global view',            es: 'Vista global'            },
  searchPlaceholder:{ fr: 'Rechercher un pays…',    en: 'Search a country…',      es: 'Buscar un país…'         },
  share:            { fr: 'Partager',                en: 'Share',                  es: 'Compartir'               },
  linkCopied:       { fr: 'Lien copié !',            en: 'Link copied!',           es: '¡Enlace copiado!'        },
  about:            { fr: 'À propos',                en: 'About',                  es: 'Acerca de'               },
  close:            { fr: 'Fermer',                  en: 'Close',                  es: 'Cerrar'                  },
  rank:             { fr: 'Rang',                    en: 'Rank',                   es: 'Rango'                   },
  of:               { fr: 'sur',                     en: 'of',                     es: 'de'                      },
  countries:        { fr: 'pays',                    en: 'countries',              es: 'países'                  },
  countriesRanked:  { fr: 'pays classés',            en: 'countries ranked',       es: 'países clasificados'     },
  globalScore:      { fr: 'Score global',            en: 'Global score',           es: 'Puntuación global'       },
  worldAvg:         { fr: 'Moyenne mondiale',        en: 'World average',          es: 'Promedio mundial'        },
  domainAvg:        { fr: 'Moyenne domaine',         en: 'Domain average',         es: 'Promedio del dominio'    },
  indicatorAvg:     { fr: 'Moyenne indicateur',      en: 'Indicator average',      es: 'Promedio del indicador'  },
  best:             { fr: 'Meilleur',                en: 'Best',                   es: 'Mejor'                   },
  worst:            { fr: 'Pire',                    en: 'Worst',                  es: 'Peor'                    },
  distribution:     { fr: 'Distribution',            en: 'Distribution',           es: 'Distribución'            },
  fullRanking:      { fr: 'Classement complet',      en: 'Full ranking',           es: 'Clasificación completa'  },
  showMore:         { fr: 'Voir plus',               en: 'Show more',              es: 'Ver más'                 },
  showLess:         { fr: 'Voir moins',              en: 'Show less',              es: 'Ver menos'               },
  noData:           { fr: 'Sans données',            en: 'No data',                es: 'Sin datos'               },
  estimatedTrend:   { fr: 'Tendance estimée',        en: 'Estimated trend',        es: 'Tendencia estimada'      },
  backToMap:        { fr: '← Retour à la carte',     en: '← Back to map',         es: '← Volver al mapa'       },
  indicators:       { fr: 'Indicateurs',             en: 'Indicators',             es: 'Indicadores'             },
  sources:          { fr: 'Sources',                  en: 'Sources',               es: 'Fuentes'                 },
  weight:           { fr: 'Poids',                    en: 'Weight',                es: 'Peso'                    },
  copySource:       { fr: 'Copier',                   en: 'Copy',                  es: 'Copiar'                  },
  copied:           { fr: 'Copié !',                  en: 'Copied!',               es: '¡Copiado!'               },
  countriesCovered: { fr: 'pays couverts',            en: 'countries covered',     es: 'países cubiertos'        },
  worldStats:       { fr: 'Statistiques mondiales',   en: 'World statistics',      es: 'Estadísticas mundiales'  },
  domains:          { fr: 'Domaines',                 en: 'Domains',               es: 'Dominios'                },
  openNav:          { fr: 'Ouvrir la navigation',     en: 'Open navigation',       es: 'Abrir navegación'        },
  observatory:      { fr: 'Observatoire mondial',     en: 'World observatory',     es: 'Observatorio mundial'    },
  data:             { fr: 'Données',                  en: 'Data',                  es: 'Datos'                   },
  noDataAvailable:  { fr: 'Aucune donnée disponible', en: 'No data available',     es: 'No hay datos disponibles'},
  noResults:        { fr: 'Aucun résultat pour',      en: 'No results for',        es: 'Sin resultados para'     },
  clear:            { fr: 'Effacer',                  en: 'Clear',                 es: 'Borrar'                  },
  trendTitle:       { fr: 'Tendance sur 1 an',        en: '1-year trend',          es: 'Tendencia a 1 año'       },
  score100:         { fr: 'Score / 100',              en: 'Score / 100',            es: 'Puntuación / 100'        },
  higherBetter:     { fr: '↑ Plus = mieux',           en: '↑ Higher = better',     es: '↑ Mayor = mejor'         },
  lowerBetter:      { fr: '↓ Moins = mieux',          en: '↓ Lower = better',      es: '↓ Menor = mejor'         },
  indicator:        { fr: 'Indicateur',               en: 'Indicator',             es: 'Indicador'               },
  unit:             { fr: 'Unité',                    en: 'Unit',                  es: 'Unidad'                  },
  direction:        { fr: 'Direction',                en: 'Direction',             es: 'Dirección'               },
};

export function ui(key: keyof typeof UI_LABELS, locale: Locale): string {
  return UI_LABELS[key]?.[locale] ?? key;
}
