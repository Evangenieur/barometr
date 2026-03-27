'use client';

import { NavigationProvider } from '@/lib/context/NavigationContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <NavigationProvider>{children}</NavigationProvider>;
}
