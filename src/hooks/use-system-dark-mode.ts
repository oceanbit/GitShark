import * as React from 'react';
import {initialMode, eventEmitter} from 'react-native-dark-mode';

export const useSystemDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(initialMode === 'dark');

  React.useEffect(() => {
    const listener = (newMode: 'light' | 'dark') => {
      setIsDarkMode(newMode === 'dark');
    };
    eventEmitter.on('currentModeChanged', listener);
    return () => void eventEmitter.off('currentModeChanged', listener);
  }, []);

  return isDarkMode;
};
