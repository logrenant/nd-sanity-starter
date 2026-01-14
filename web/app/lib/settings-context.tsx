import {createContext, useContext, type ReactNode} from 'react';
import type {SanitySettings} from './sanity-types';

const SettingsContext = createContext<SanitySettings | null | undefined>(null);

export function SettingsProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings: SanitySettings | null | undefined;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
