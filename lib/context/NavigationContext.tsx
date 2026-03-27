'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { NavState, Locale } from '@/lib/domains/types';

export interface NavigationContextValue {
  nav: NavState;
  setDomain: (domainId: string | null) => void;
  setIndicator: (indicatorId: string | null) => void;
  setCountry: (geoCode: string | null, geoName: string | null) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used inside NavigationProvider');
  return ctx;
}

interface NavigationProviderProps {
  children: React.ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [locale, setLocale] = useState<Locale>('fr');

  const [nav, setNav] = useState<NavState>({
    domainId: null,
    indicatorId: null,
    countryCode: null,
    countryName: null,
  });

  // Track whether the next URL update should push a new history entry
  const shouldPushRef = useRef(false);

  // Read initial state from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const domainId    = params.get('domain');
    const indicatorId = params.get('indicator');
    const countryCode = params.get('country');
    const countryName = params.get('name');
    const lang        = params.get('lang');
    setNav({
      domainId:    domainId    ?? null,
      indicatorId: indicatorId ?? null,
      countryCode: countryCode ?? null,
      countryName: countryName ?? null,
    });
    if (lang === 'en' || lang === 'fr') {
      setLocale(lang);
    }
  }, []);

  // Sync state → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (nav.domainId    !== null) params.set('domain',    nav.domainId);
    if (nav.indicatorId !== null) params.set('indicator', nav.indicatorId);
    if (nav.countryCode !== null) params.set('country',   nav.countryCode);
    if (nav.countryName !== null) params.set('name',      nav.countryName);
    if (locale !== 'fr')          params.set('lang',      locale);
    const search = params.toString();
    const newUrl = window.location.pathname + (search ? '?' + search : '');
    if (shouldPushRef.current) {
      window.history.pushState(null, '', newUrl);
      shouldPushRef.current = false;
    } else {
      window.history.replaceState(null, '', newUrl);
    }
  }, [nav, locale]);

  const setDomain = useCallback((domainId: string | null) => {
    shouldPushRef.current = true;
    setNav((prev) => ({
      ...prev,
      domainId,
      indicatorId: null, // reset indicator when domain changes
    }));
  }, []);

  const setIndicator = useCallback((indicatorId: string | null) => {
    setNav((prev) => ({ ...prev, indicatorId }));
  }, []);

  const setCountry = useCallback((geoCode: string | null, geoName: string | null) => {
    shouldPushRef.current = true;
    setNav((prev) => ({ ...prev, countryCode: geoCode, countryName: geoName }));
  }, []);

  return (
    <NavigationContext.Provider value={{ nav, setDomain, setIndicator, setCountry, locale, setLocale }}>
      {children}
    </NavigationContext.Provider>
  );
}
