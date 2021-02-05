import {Platform, useColorScheme} from 'react-native';
import * as React from 'react';
import {
  DARK_MODE_STORAGE_KEY,
  DarkModeOptionTypes,
  darkPaperTheme,
  lightPaperTheme,
} from '@constants';
import {changeBarColors} from 'react-native-immersive-bars';
import DefaultPreference from 'react-native-default-preference';

export const useLocalDarkMode = () => {
  const systemColorTheme = useColorScheme();
  const isSystemDarkMode = systemColorTheme === 'dark';

  const [localDarkMode, setLocalDarkMode] = React.useState<DarkModeOptionTypes>(
    'auto',
  );

  const isDarkMode =
    localDarkMode === 'auto' ? isSystemDarkMode : localDarkMode === 'dark';

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      changeBarColors(isDarkMode);
    }
  }, [isDarkMode]);

  React.useEffect(() => {
    DefaultPreference.get(DARK_MODE_STORAGE_KEY).then(val => {
      if (val) {
        setLocalDarkMode(val as DarkModeOptionTypes);
      }
    });
  }, []);

  const updateLocalDarkMode = (val: DarkModeOptionTypes) => {
    DefaultPreference.set(DARK_MODE_STORAGE_KEY, val);
    setLocalDarkMode(val);
  };

  const paperTheme = isDarkMode ? darkPaperTheme : lightPaperTheme;

  return {
    isDarkMode,
    paperTheme,
    updateLocalDarkMode,
    localDarkMode,
  };
};
