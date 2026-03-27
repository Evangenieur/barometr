'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { getFlagUrl } from '@/lib/utils/flags';
import { cn } from '@/lib/utils/cn';

interface Country {
  geoCode: string;
  geoName: string;
}

interface SearchInputProps {
  countries: Country[];
  onSelect: (geoCode: string, geoName: string) => void;
  placeholder?: string;
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function SearchInput({ countries, onSelect, placeholder = 'Rechercher un pays…' }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = query.trim().length > 0
    ? countries
        .filter((c) => normalize(c.geoName).includes(normalize(query)))
        .slice(0, 6)
    : [];

  const handleSelect = useCallback((code: string, name: string) => {
    onSelect(code, name);
    setQuery('');
    setOpen(false);
    setActiveIndex(-1);
  }, [onSelect]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || filtered.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const country = filtered[activeIndex];
      if (country) handleSelect(country.geoCode, country.geoName);
    } else if (e.key === 'Escape') {
      setQuery('');
      setOpen(false);
    }
  };

  useEffect(() => {
    setActiveIndex(-1);
    setOpen(filtered.length > 0);
  }, [filtered.length, query]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!inputRef.current?.closest('[data-search-root]')?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div data-search-root className="relative">
      <div className="relative">
        <Search
          size={13}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full pl-8 pr-8 py-2 rounded-md text-sm',
            'bg-elevated border border-border-default',
            'text-text-primary placeholder:text-text-muted',
            'focus:outline-none focus:border-border-accent focus:ring-1 focus:ring-accent-blue/30',
            'transition-colors duration-100'
          )}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-controls="search-listbox"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
            aria-label="Effacer"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          id="search-listbox"
          role="listbox"
          className={cn(
            'absolute top-full left-0 right-0 mt-1 z-50',
            'bg-overlay border border-border-default rounded-md shadow-lg',
            'overflow-hidden max-h-56 overflow-y-auto'
          )}
        >
          {filtered.map((country, i) => (
            <li
              key={country.geoCode}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                'flex items-center gap-2 px-3 py-2 cursor-pointer text-sm',
                'transition-colors duration-75',
                i === activeIndex
                  ? 'bg-elevated text-text-primary'
                  : 'text-text-secondary hover:bg-elevated hover:text-text-primary'
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(country.geoCode, country.geoName);
              }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <img src={getFlagUrl(country.geoCode)} alt={country.geoCode} className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm border border-white/10 flex-shrink-0" />
              <span>{country.geoName}</span>
              <span className="ml-auto font-mono text-2xs text-text-muted">{country.geoCode}</span>
            </li>
          ))}
        </ul>
      )}

      {open && query.trim().length > 0 && filtered.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-overlay border border-border-default rounded-md shadow-lg px-3 py-2 text-sm text-text-muted">
          Aucun résultat pour «&nbsp;{query}&nbsp;»
        </div>
      )}
    </div>
  );
}
