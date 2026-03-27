'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { DomainAccordion } from '@/components/about/DomainAccordion';
import { getAllDomains, getDomainsByGroup, DOMAIN_GROUPS } from '@/lib/domains/registry';
import { AGGREGATE_DATA } from '@/lib/aggregate';
import { useNavigation } from '@/lib/context/NavigationContext';
import { ui } from '@/lib/utils/i18n';
import type { Locale } from '@/lib/domains/types';

// ─── Local translations for about page ────────────────────────────────────────

const ABOUT_TEXT: Record<string, Record<Locale, string>> = {
  title: {
    fr: 'Méthodologie & À propos',
    en: 'Methodology & About',
    es: 'Metodología y Acerca de',
  },
  heroDesc: {
    fr: 'Barometr traduit des données socio-économiques mondiales en scores météo lisibles.',
    en: 'Barometr translates global socio-economic data into readable weather scores.',
    es: 'Barometr traduce datos socioeconómicos mundiales en puntuaciones meteorológicas legibles.',
  },
  heroStats: {
    fr: 'Chaque pays est évalué sur {domains} domaines couvrant {indicators} indicateurs, pour un total de {countries} pays couverts.',
    en: 'Each country is evaluated across {domains} domains covering {indicators} indicators, for a total of {countries} countries covered.',
    es: 'Cada país se evalúa en {domains} dominios que cubren {indicators} indicadores, para un total de {countries} países cubiertos.',
  },
  howItWorks: {
    fr: 'Comment ça marche',
    en: 'How it works',
    es: 'Cómo funciona',
  },
  step01Title: {
    fr: 'Données brutes',
    en: 'Raw data',
    es: 'Datos brutos',
  },
  step01Desc: {
    fr: 'Les indicateurs bruts proviennent de sources officielles : IMF, OCDE, OMS, Banque Mondiale, Transparency International, RSF.',
    en: 'Raw indicators come from official sources: IMF, OECD, WHO, World Bank, Transparency International, RSF.',
    es: 'Los indicadores brutos provienen de fuentes oficiales: FMI, OCDE, OMS, Banco Mundial, Transparency International, RSF.',
  },
  step02Title: {
    fr: 'Scoring linéaire',
    en: 'Linear scoring',
    es: 'Puntuación lineal',
  },
  step02Desc: {
    fr: 'Chaque valeur brute est convertie en score 0–100 via une interpolation linéaire par paliers (excellent → bon → passable → faible → critique).',
    en: 'Each raw value is converted to a 0–100 score via linear interpolation across thresholds (excellent → good → fair → poor → critical).',
    es: 'Cada valor bruto se convierte en una puntuación 0–100 mediante interpolación lineal por umbrales (excelente → bueno → aceptable → bajo → crítico).',
  },
  step03Title: {
    fr: 'Agrégation pondérée',
    en: 'Weighted aggregation',
    es: 'Agregación ponderada',
  },
  step03Desc: {
    fr: "Les scores d'indicateurs sont agrégés en score de domaine selon leur poids relatif. Les domaines sont moyennés pour le score global.",
    en: 'Indicator scores are aggregated into domain scores by their relative weight. Domains are averaged to produce the global score.',
    es: 'Las puntuaciones de indicadores se agregan en puntuaciones de dominio según su peso relativo. Los dominios se promedian para obtener la puntuación global.',
  },
  scoreWeatherTitle: {
    fr: 'Correspondance scores ↔ météo',
    en: 'Score ↔ weather mapping',
    es: 'Correspondencia puntuación ↔ clima',
  },
  thScore: {
    fr: 'Score',
    en: 'Score',
    es: 'Puntuación',
  },
  thWeather: {
    fr: 'Météo',
    en: 'Weather',
    es: 'Clima',
  },
  thLabel: {
    fr: 'Label',
    en: 'Label',
    es: 'Etiqueta',
  },
  thColor: {
    fr: 'Couleur',
    en: 'Color',
    es: 'Color',
  },
  labelExcellent: {
    fr: 'Excellent',
    en: 'Excellent',
    es: 'Excelente',
  },
  labelGood: {
    fr: 'Bon',
    en: 'Good',
    es: 'Bueno',
  },
  labelFair: {
    fr: 'Passable',
    en: 'Fair',
    es: 'Aceptable',
  },
  labelPoor: {
    fr: 'Faible',
    en: 'Poor',
    es: 'Bajo',
  },
  labelCritical: {
    fr: 'Critique',
    en: 'Critical',
    es: 'Crítico',
  },
  activeDomains: {
    fr: 'Domaines actifs',
    en: 'Active domains',
    es: 'Dominios activos',
  },
  contributionGuide: {
    fr: 'Guide de contribution',
    en: 'Contribution guide',
    es: 'Guía de contribución',
  },
  contributionIntro: {
    fr: "Le projet est open source sur",
    en: 'The project is open source on',
    es: 'El proyecto es open source en',
  },
  contributionCTA: {
    fr: "N'hésitez pas à ouvrir une <pr>Pull Request</pr> pour proposer de nouveaux domaines, corriger des données ou améliorer l'interface.",
    en: 'Feel free to open a <pr>Pull Request</pr> to propose new domains, fix data, or improve the interface.',
    es: 'No dude en abrir una <pr>Pull Request</pr> para proponer nuevos dominios, corregir datos o mejorar la interfaz.',
  },
  contributionOneFile: {
    fr: "Ajouter un nouveau domaine ne nécessite de modifier <strong>qu'un seul fichier</strong> existant :",
    en: 'Adding a new domain only requires modifying <strong>a single existing file</strong>:',
    es: 'Agregar un nuevo dominio solo requiere modificar <strong>un único archivo</strong> existente:',
  },
  step1: {
    fr: 'Forker le dépôt sur',
    en: 'Fork the repository on',
    es: 'Hacer fork del repositorio en',
  },
  step2: {
    fr: 'Créer un dossier',
    en: 'Create a folder',
    es: 'Crear una carpeta',
  },
  step3: {
    fr: 'Exporter un objet',
    en: 'Export a',
    es: 'Exportar un objeto',
  },
  step3detail: {
    fr: 'avec',
    en: 'object with',
    es: 'con',
  },
  step3and: {
    fr: 'et',
    en: 'and',
    es: 'y',
  },
  step4: {
    fr: "Importer le module dans",
    en: 'Import the module in',
    es: 'Importar el módulo en',
  },
  step4detail: {
    fr: "et l'ajouter à",
    en: 'and add it to',
    es: 'y agregarlo a',
  },
  step5: {
    fr: 'Ouvrir une <pr>Pull Request</pr> avec une description des sources de données utilisées',
    en: 'Open a <pr>Pull Request</pr> with a description of the data sources used',
    es: 'Abrir una <pr>Pull Request</pr> con una descripción de las fuentes de datos utilizadas',
  },
  codeExampleLabel: {
    fr: 'Exemple',
    en: 'Example',
    es: 'Ejemplo',
  },
  creditsTitle: {
    fr: 'Crédits & Sources officielles',
    en: 'Credits & Official sources',
    es: 'Créditos y fuentes oficiales',
  },
};

function tx(key: string, locale: Locale): string {
  return ABOUT_TEXT[key]?.[locale] ?? ABOUT_TEXT[key]?.['en'] ?? key;
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

// ─── Code example (language-agnostic) ─────────────────────────────────────────

const EXAMPLE_DOMAIN_CODE = `// lib/domains/education/index.ts
import type { DomainModule } from '@/lib/domains/types';

const educationModule: DomainModule = {
  definition: {
    id: 'education',
    label: { fr: 'Éducation', en: 'Education' },
    description: { fr: '...', en: '...' },
    icon: '📚',
    group: 'society',
    active: true,
    seedSources: ['https://www.oecd.org/pisa/'],
    indicators: [
      {
        id: 'pisa_score',
        label: { fr: 'Score PISA moyen', en: 'Average PISA score' },
        unit: 'index',
        unitLabel: { fr: 'points', en: 'points' },
        direction: 'higher_is_better',
        weight: 4,
        thresholds: { excellent: 520, good: 490, fair: 460, poor: 430 },
        minValue: 300,
        maxValue: 600,
      },
    ],
  },
  seedData: [
    { geoCode: 'JP', geoName: 'Japan', dataYear: 2022, values: { pisa_score: 529 } },
    // ...
  ],
};
export default educationModule;`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const { locale } = useNavigation();

  const allDomains = getAllDomains();
  const domainsByGroup = getDomainsByGroup();
  const totalCountries = AGGREGATE_DATA.length;
  const totalIndicators = allDomains.reduce((s, m) => s + m.definition.indicators.length, 0);

  const weatherRows = [
    { range: '80–100', emoji: '☀️',  labelKey: 'labelExcellent', color: '#22C55E' },
    { range: '60–79',  emoji: '🌤️',  labelKey: 'labelGood',      color: '#84CC16' },
    { range: '40–59',  emoji: '⛅️',  labelKey: 'labelFair',      color: '#EAB308' },
    { range: '20–39',  emoji: '🌧️',  labelKey: 'labelPoor',      color: '#F97316' },
    { range: '0–19',   emoji: '⛈️',  labelKey: 'labelCritical',  color: '#EF4444' },
  ];

  const steps = [
    { step: '01', titleKey: 'step01Title', descKey: 'step01Desc' },
    { step: '02', titleKey: 'step02Title', descKey: 'step02Desc' },
    { step: '03', titleKey: 'step03Title', descKey: 'step03Desc' },
  ];

  return (
    <div className="min-h-screen bg-void text-text-primary">
      {/* Header */}
      <header className="bg-surface border-b border-border-subtle sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            {ui('backToMap', locale)}
          </Link>
          <span className="font-mono text-sm text-text-muted">Barometr</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section>
          <h1 className="text-3xl font-bold text-text-primary mb-4">{tx('title', locale)}</h1>
          <p className="text-base text-text-secondary leading-relaxed max-w-2xl">
            {tx('heroDesc', locale)}{' '}
            {interpolate(tx('heroStats', locale), {
              domains: allDomains.length,
              indicators: totalIndicators,
              countries: totalCountries,
            })}
          </p>
        </section>

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary border-b border-border-subtle pb-3">
            {tx('howItWorks', locale)}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {steps.map(({ step, titleKey, descKey }) => (
              <div key={step} className="bg-surface border border-border-default rounded-lg p-4">
                <div className="font-mono text-accent-blue text-sm font-bold mb-2">{step}</div>
                <h3 className="text-md font-semibold text-text-primary mb-2">{tx(titleKey, locale)}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{tx(descKey, locale)}</p>
              </div>
            ))}
          </div>

          {/* Thresholds table */}
          <div className="bg-surface border border-border-default rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border-subtle">
              <h3 className="text-sm font-semibold text-text-primary">{tx('scoreWeatherTitle', locale)}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left px-4 py-2 text-text-muted font-medium">{tx('thScore', locale)}</th>
                    <th className="text-left px-4 py-2 text-text-muted font-medium">{tx('thWeather', locale)}</th>
                    <th className="text-left px-4 py-2 text-text-muted font-medium">{tx('thLabel', locale)}</th>
                    <th className="text-left px-4 py-2 text-text-muted font-medium">{tx('thColor', locale)}</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherRows.map(({ range, emoji, labelKey, color }, i) => (
                    <tr key={range} className={i % 2 === 0 ? 'bg-surface' : 'bg-base/30'}>
                      <td className="px-4 py-2 font-mono text-text-primary tabular-nums">{range}</td>
                      <td className="px-4 py-2 text-xl">{emoji}</td>
                      <td className="px-4 py-2 font-semibold" style={{ color }}>{tx(labelKey, locale)}</td>
                      <td className="px-4 py-2">
                        <span className="font-mono text-xs" style={{ color }}>{color}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Active domains ───────────────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary border-b border-border-subtle pb-3">
            {tx('activeDomains', locale)} ({allDomains.length})
          </h2>

          {DOMAIN_GROUPS.map((group) => {
            const domainsInGroup = domainsByGroup.get(group.id);
            if (!domainsInGroup || domainsInGroup.length === 0) return null;
            return (
              <div key={group.id} className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {group.label[locale] ?? group.label['en'] ?? group.id}
                </h3>
                <div className="space-y-2">
                  {domainsInGroup.map((mod) => (
                    <DomainAccordion key={mod.definition.id} mod={mod} locale={locale} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Contribution guide ─────────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary border-b border-border-subtle pb-3">
            {tx('contributionGuide', locale)}
          </h2>

          <div className="prose-style space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              {tx('contributionIntro', locale)}{' '}
              <a
                href="https://github.com/Evangenieur/barometr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent-blue hover:underline"
              >
                GitHub
                <ExternalLink size={11} aria-hidden="true" />
              </a>.
              {' '}
              {tx('contributionCTA', locale)
                .split(/<\/?pr>/g)
                .map((part, i) =>
                  i === 1 ? (
                    <strong key={i} className="text-text-primary">{part}</strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
            </p>

            <p>
              {tx('contributionOneFile', locale)
                .split(/<\/?strong>/g)
                .map((part, i) =>
                  i === 1 ? (
                    <strong key={i} className="text-text-primary">{part}</strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              {' '}<code className="font-mono text-accent-blue bg-elevated px-1.5 py-0.5 rounded text-xs">lib/domains/registry.ts</code>.
            </p>

            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li>
                {tx('step1', locale)}{' '}
                <a href="https://github.com/Evangenieur/barometr" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">github.com/Evangenieur/barometr</a>
              </li>
              <li>
                {tx('step2', locale)}{' '}
                <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">lib/domains/&lt;domain-name&gt;/index.ts</code>
              </li>
              <li>
                {tx('step3', locale)}{' '}
                <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">DomainModule</code>{' '}
                {tx('step3detail', locale)}{' '}
                <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">definition</code>{' '}
                {tx('step3and', locale)}{' '}
                <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">seedData</code>
              </li>
              <li>
                {tx('step4', locale)}{' '}
                <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">registry.ts</code>{' '}
                {tx('step4detail', locale)}{' '}
                <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">ALL_DOMAIN_MODULES</code>
              </li>
              <li>
                {tx('step5', locale)
                  .split(/<\/?pr>/g)
                  .map((part, i) =>
                    i === 1 ? (
                      <strong key={i} className="text-text-primary">{part}</strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
              </li>
            </ol>
          </div>

          {/* Code example */}
          <div className="bg-base border border-border-default rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-surface border-b border-border-subtle flex items-center justify-between">
              <span className="text-xs text-text-muted font-mono">{tx('codeExampleLabel', locale)} — lib/domains/education/index.ts</span>
            </div>
            <pre className="p-4 text-xs font-mono text-text-secondary overflow-x-auto leading-relaxed">
              <code>{EXAMPLE_DOMAIN_CODE}</code>
            </pre>
          </div>
        </section>

        {/* ── Credits ────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary border-b border-border-subtle pb-3">
            {tx('creditsTitle', locale)}
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'Banque Mondiale',              url: 'https://data.worldbank.org' },
              { name: 'OMS / WHO',                    url: 'https://www.who.int/data' },
              { name: 'OCDE / OECD',                  url: 'https://data.oecd.org' },
              { name: 'FMI / IMF',                    url: 'https://www.imf.org/en/Data' },
              { name: 'Transparency International',   url: 'https://www.transparency.org/en/cpi' },
              { name: 'RSF — Reporters sans frontières', url: 'https://rsf.org/en/index' },
              { name: 'International Budget Partnership', url: 'https://internationalbudget.org' },
              { name: 'IQAir — Air Quality Report',   url: 'https://www.iqair.com/world-air-quality-report' },
              { name: 'Natural Earth GeoJSON',        url: 'https://github.com/datasets/geo-countries' },
            ].map(({ name, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-surface border border-border-default rounded-lg hover:bg-elevated hover:border-border-strong transition-colors text-sm text-text-secondary hover:text-text-primary"
              >
                <ExternalLink size={13} className="flex-shrink-0 text-accent-blue" aria-hidden="true" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Back to map ────────────────────────────────────────────────────── */}
        <div className="text-center py-8 border-t border-border-subtle">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border-default rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-elevated hover:border-border-strong transition-colors"
          >
            {ui('backToMap', locale)}
          </Link>
        </div>
      </main>
    </div>
  );
}
