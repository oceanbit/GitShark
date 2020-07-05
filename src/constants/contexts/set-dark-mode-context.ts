import * as React from 'react';

export type DarkModeOptionTypes = 'light' | 'dark' | 'auto';

interface SetDarkModeContextType {
  setDarkMode: (val: DarkModeOptionTypes) => void;
  localDarkMode: DarkModeOptionTypes;
}

export const SetDarkModeContext = React.createContext<SetDarkModeContextType>({
  setDarkMode: () => {},
  localDarkMode: 'auto',
});
