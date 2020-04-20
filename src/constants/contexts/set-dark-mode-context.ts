import * as React from 'react';

export type DarkModeOptionTypes = 'light' | 'dark' | 'auto';

interface SetDarkModeContextType {
  setDarkMode: (val: DarkModeOptionTypes) => void;
}

export const SetDarkModeContext = React.createContext<SetDarkModeContextType>({
  setDarkMode: () => {},
});
