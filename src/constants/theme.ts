import {configureFonts, DefaultTheme} from 'react-native-paper';
import {Theme as PaperTheme} from 'react-native-paper/src/types';
import {
  lightTheme as lightSeaside,
  darkTheme as darkSeaside,
  fullTheme,
} from '@oceanbit/styles';
import {Theme as NavTheme} from '@react-navigation/native/src/types';
import {DynamicValue} from 'react-native-dynamic';
import {
  epilogueLight,
  epilogueSemiBold,
  epilogueRegular,
  textStyles,
} from './text-styles';

const fontConfig: Parameters<typeof configureFonts>[0] = {
  default: {
    regular: epilogueRegular,
    medium: epilogueSemiBold,
    light: epilogueLight,
    thin: epilogueLight,
  },
};

export const darkPaperTheme: PaperTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: fullTheme.borderRadius.regular,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    accent: fullTheme.colors.primary_dark,
    background: fullTheme.colors.surface_dark,
    error: fullTheme.colors.error_dark,
    surface: fullTheme.colors.surface_dark,
    text: fullTheme.colors.label_high_emphasis_dark,
  },
};

export const lightPaperTheme: PaperTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: fullTheme.borderRadius.regular,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    accent: fullTheme.colors.primary_light,
    background: fullTheme.colors.surface_light,
    error: fullTheme.colors.error_light,
    surface: fullTheme.colors.surface_light,
    text: fullTheme.colors.label_high_emphasis_light,
  },
};

export const darkNavTheme: NavTheme = {
  dark: false,
  colors: {
    primary: fullTheme.colors.primary_dark,
    notification: fullTheme.colors.surface_dark,
    card: fullTheme.colors.surface_dark,
    background: fullTheme.colors.surface_dark,
    text: fullTheme.colors.label_high_emphasis_dark,
    border: fullTheme.colors.tint_on_surface_01_dark,
  },
};

export const lightNavTheme: NavTheme = {
  dark: false,
  colors: {
    primary: fullTheme.colors.primary_light,
    notification: fullTheme.colors.surface_light,
    card: fullTheme.colors.surface_light,
    background: fullTheme.colors.surface_light,
    text: fullTheme.colors.label_high_emphasis_light,
    border: fullTheme.colors.tint_on_surface_01_light,
  },
};

/**
 * This is an awful lot of hackiness. Crazy how it still works, iddnit?
 */
const colors = Object.keys(lightSeaside.colors).reduce(
  (prev, key: string) => {
    const theKey = key as 'primary';
    const lightVal = lightSeaside.colors[theKey];
    const darkVal = darkSeaside.colors[theKey];
    if (lightVal === darkVal) {
      prev[theKey] = lightVal as any;
    } else {
      prev[theKey] = new DynamicValue(lightVal, darkVal);
    }
    return prev;
  },
  {
    label_medium_emphasis_no_opacity: new DynamicValue('#717f9b', '#8f97a8'),
    // Temporary, as this should be moved into @oceanbit/styles
  } as Record<keyof typeof lightSeaside.colors, DynamicValue<string>> & {
    label_medium_emphasis_no_opacity: DynamicValue<string>;
  },
);

export const theme = {
  ...fullTheme,
  colors,
  textStyles: textStyles,
};
