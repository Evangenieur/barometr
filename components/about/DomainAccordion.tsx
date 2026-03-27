'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, ExternalLink } from 'lucide-react';
import type { DomainModule } from '@/lib/domains/types';
import { t, ui } from '@/lib/utils/i18n';
import { cn } from '@/lib/utils/cn';

interface DomainAccordionProps {
  mod: DomainModule;
  locale?: 'fr' | 'en' | 'es';
}

export function DomainAccordion({ mod, locale = 'fr' }: DomainAccordionProps) {
  const [open, setOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const { definition } = mod;
  const totalWeight = definition.indicators.reduce((s, i) => s + i.weight, 0);

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      id={`domain-${definition.id}`}
      className="border border-border-default rounded-lg overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-3 w-full px-4 py-3 text-left transition-colors duration-100',
          open
            ? 'bg-elevated border-b border-border-subtle'
            : 'bg-surface hover:bg-elevated'
        )}
        aria-expanded={open}
      >
        <span className="text-xl flex-shrink-0" aria-hidden="true">{definition.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-md font-semibold text-text-primary">{t(definition.label, locale)}</div>
          <div className="text-xs text-text-muted truncate">{t(definition.description, locale)}</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xs text-text-muted font-mono bg-elevated px-2 py-0.5 rounded-full border border-border-subtle">
            {definition.indicators.length} ind.
          </span>
          {open
            ? <ChevronDown size={16} className="text-text-muted" aria-hidden="true" />
            : <ChevronRight size={16} className="text-text-muted" aria-hidden="true" />
          }
        </div>
      </button>

      {/* Body */}
      <div
        style={{
          maxHeight: open ? '2000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 300ms ease-out',
        }}
      >
        <div className="bg-surface">
          {/* Indicators table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left px-4 py-2 text-text-muted font-medium">{ui('indicator', locale)}</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">{ui('unit', locale)}</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">{ui('direction', locale)}</th>
                  <th className="text-right px-3 py-2 text-text-muted font-medium">{ui('weight', locale)}</th>
                </tr>
              </thead>
              <tbody>
                {definition.indicators.map((ind, i) => {
                  const pct = totalWeight > 0 ? Math.round((ind.weight / totalWeight) * 100) : 0;
                  return (
                    <tr
                      key={ind.id}
                      className={cn(
                        'border-b border-border-subtle last:border-b-0',
                        i % 2 === 0 ? 'bg-surface' : 'bg-base/30'
                      )}
                    >
                      <td className="px-4 py-2 text-text-primary font-medium">
                        {t(ind.label, locale)}
                      </td>
                      <td className="px-3 py-2 text-text-secondary font-mono">
                        {t(ind.unitLabel, locale)}
                      </td>
                      <td className="px-3 py-2">
                        <span className={cn(
                          'inline-flex items-center text-2xs px-1.5 py-0.5 rounded-sm font-medium',
                          ind.direction === 'higher_is_better'
                            ? 'text-score-good bg-score-good/10'
                            : 'text-score-fair bg-score-fair/10'
                        )}>
                          {ind.direction === 'higher_is_better' ? ui('higherBetter', locale) : ui('lowerBetter', locale)}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Weight bar */}
                          <div className="w-12 h-1 rounded-full bg-border-default overflow-hidden">
                            <div
                              className="h-full bg-accent-blue rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-mono text-text-primary tabular-nums">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Sources */}
          <div className="px-4 py-3 border-t border-border-subtle">
            <div className="text-2xs text-text-muted uppercase tracking-wider font-semibold mb-2">{ui('sources', locale)}</div>
            <ul className="space-y-1">
              {definition.seedSources.map((url) => (
                <li key={url} className="flex items-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-blue hover:underline flex-1 min-w-0 truncate flex items-center gap-1"
                  >
                    <ExternalLink size={11} aria-hidden="true" className="flex-shrink-0" />
                    <span className="truncate">{url}</span>
                  </a>
                  <button
                    onClick={() => void handleCopy(url)}
                    className="text-text-muted hover:text-text-secondary transition-colors flex-shrink-0"
                    title="Copier l'URL"
                    aria-label={`Copier ${url}`}
                  >
                    {copiedUrl === url
                      ? <span className="text-score-good text-2xs">✓</span>
                      : <Copy size={11} aria-hidden="true" />
                    }
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
