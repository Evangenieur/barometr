import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { DomainAccordion } from '@/components/about/DomainAccordion';
import { getAllDomains, getDomainsByGroup, DOMAIN_GROUPS } from '@/lib/domains/registry';
import { AGGREGATE_DATA } from '@/lib/aggregate';

export const metadata = {
  title: 'Barometr — Méthodologie & À propos',
  description: 'Comment Barometr calcule ses scores météo, sources de données et guide de contribution.',
};

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
    // ... ajouter les données pays ici
  ],
};
export default educationModule;

// Puis dans lib/domains/registry.ts, ajouter :
// import educationModule from '@/lib/domains/education';
// ... et l'ajouter à ALL_DOMAIN_MODULES`;

export default function AboutPage() {
  const allDomains = getAllDomains();
  const domainsByGroup = getDomainsByGroup();
  const totalCountries = AGGREGATE_DATA.length;
  const totalIndicators = allDomains.reduce((s, m) => s + m.definition.indicators.length, 0);

  return (
    <div className="min-h-screen bg-void text-text-primary">
      {/* Header */}
      <header className="bg-surface border-b border-border-subtle sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            ← Retour à la carte
          </Link>
          <span className="font-mono text-sm text-text-muted">Barometr</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section>
          <h1 className="text-3xl font-bold text-text-primary mb-4">Méthodologie & À propos</h1>
          <p className="text-base text-text-secondary leading-relaxed max-w-2xl">
            Barometr traduit des données socio-économiques mondiales en scores météo lisibles.
            Chaque pays est évalué sur {allDomains.length} domaines couvrant {totalIndicators} indicateurs,
            pour un total de {totalCountries} pays couverts.
          </p>
        </section>

        {/* ── Comment ça marche ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary border-b border-border-subtle pb-3">
            Comment ça marche
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                step: '01',
                title: 'Données brutes',
                desc: 'Les indicateurs bruts proviennent de sources officielles : IMF, OCDE, OMS, Banque Mondiale, Transparency International, RSF.',
              },
              {
                step: '02',
                title: 'Scoring linéaire',
                desc: 'Chaque valeur brute est convertie en score 0–100 via une interpolation linéaire par paliers (excellent → bon → passable → faible → critique).',
              },
              {
                step: '03',
                title: 'Agrégation pondérée',
                desc: 'Les scores d\'indicateurs sont agrégés en score de domaine selon leur poids relatif. Les domaines sont moyennés pour le score global.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-surface border border-border-default rounded-lg p-4">
                <div className="font-mono text-accent-blue text-sm font-bold mb-2">{step}</div>
                <h3 className="text-md font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Thresholds table */}
          <div className="bg-surface border border-border-default rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border-subtle">
              <h3 className="text-sm font-semibold text-text-primary">Correspondance scores ↔ météo</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left px-4 py-2 text-text-muted font-medium">Score</th>
                    <th className="text-left px-4 py-2 text-text-muted font-medium">Météo</th>
                    <th className="text-left px-4 py-2 text-text-muted font-medium">Label</th>
                    <th className="text-left px-4 py-2 text-text-muted font-medium">Couleur</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { range: '80–100', emoji: '☀️',  label: 'Excellent', color: '#22C55E' },
                    { range: '60–79',  emoji: '🌤',  label: 'Bon',       color: '#84CC16' },
                    { range: '40–59',  emoji: '⛅',  label: 'Passable',  color: '#EAB308' },
                    { range: '20–39',  emoji: '🌧',  label: 'Faible',    color: '#F97316' },
                    { range: '0–19',   emoji: '⛈',  label: 'Critique',  color: '#EF4444' },
                  ].map(({ range, emoji, label, color }, i) => (
                    <tr key={range} className={i % 2 === 0 ? 'bg-surface' : 'bg-base/30'}>
                      <td className="px-4 py-2 font-mono text-text-primary tabular-nums">{range}</td>
                      <td className="px-4 py-2 text-xl">{emoji}</td>
                      <td className="px-4 py-2 font-semibold" style={{ color }}>{label}</td>
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

        {/* ── Domaines actifs ───────────────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary border-b border-border-subtle pb-3">
            Domaines actifs ({allDomains.length})
          </h2>

          {DOMAIN_GROUPS.map((group) => {
            const domainsInGroup = domainsByGroup.get(group.id);
            if (!domainsInGroup || domainsInGroup.length === 0) return null;
            return (
              <div key={group.id} className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {group.label['fr'] ?? group.id}
                </h3>
                <div className="space-y-2">
                  {domainsInGroup.map((mod) => (
                    <DomainAccordion key={mod.definition.id} mod={mod} locale="fr" />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Guide de contribution ─────────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary border-b border-border-subtle pb-3">
            Guide de contribution
          </h2>

          <div className="prose-style space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              Le projet est open source sur{' '}
              <a
                href="https://github.com/Evangenieur/barometr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent-blue hover:underline"
              >
                GitHub
                <ExternalLink size={11} aria-hidden="true" />
              </a>.
              {' '}N&apos;hésitez pas à ouvrir une <strong className="text-text-primary">Pull Request</strong> pour proposer de nouveaux domaines, corriger des données ou améliorer l&apos;interface.
            </p>

            <p>
              Ajouter un nouveau domaine ne nécessite de modifier <strong className="text-text-primary">qu&apos;un seul fichier</strong> existant :
              {' '}<code className="font-mono text-accent-blue bg-elevated px-1.5 py-0.5 rounded text-xs">lib/domains/registry.ts</code>.
            </p>

            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li>Forker le dépôt sur <a href="https://github.com/Evangenieur/barometr" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">github.com/Evangenieur/barometr</a></li>
              <li>Créer un dossier <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">lib/domains/&lt;nom-domaine&gt;/index.ts</code></li>
              <li>Exporter un objet <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">DomainModule</code> avec <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">definition</code> et <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">seedData</code></li>
              <li>Importer le module dans <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">registry.ts</code> et l&apos;ajouter à <code className="font-mono text-xs text-text-primary bg-elevated px-1 rounded">ALL_DOMAIN_MODULES</code></li>
              <li>Ouvrir une <strong className="text-text-primary">Pull Request</strong> avec une description des sources de données utilisées</li>
            </ol>
          </div>

          {/* Code example */}
          <div className="bg-base border border-border-default rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-surface border-b border-border-subtle flex items-center justify-between">
              <span className="text-xs text-text-muted font-mono">Exemple — lib/domains/education/index.ts</span>
            </div>
            <pre className="p-4 text-xs font-mono text-text-secondary overflow-x-auto leading-relaxed">
              <code>{EXAMPLE_DOMAIN_CODE}</code>
            </pre>
          </div>
        </section>

        {/* ── Crédits ────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary border-b border-border-subtle pb-3">
            Crédits & Sources officielles
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
            ← Retour à la carte
          </Link>
        </div>
      </main>
    </div>
  );
}
