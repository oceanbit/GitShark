import {
  configureFonts,
  DefaultTheme,
  Theme as PaperTheme,
} from 'react-native-paper';
import {
  lightTheme as lightSeaside,
  darkTheme as darkSeaside,
  fullTheme,
} from 'seaside/theme';
import {Theme as NavTheme} from '@react-navigation/native/src/types';
import {DynamicValue} from 'react-native-dark-mode';
import {rubikLight, rubikMedium, rubikRegular, textStyles} from './text-styles';
import {opacity} from './opacity';

// Taken from: https://github.com/regexhq/hsla-regex
// Don't add a `/g` flag it breaks JavaScereipt
// // // Have a problem with how I spelt JS right then? Well I have a problem with how JS treats the g flag
// https://stackoverflow.com/questions/18462784/why-is-javascript-regex-matching-every-second-time
const hslaRegex = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)/i;

const getSecondaryStatic = (color: string) => {
  const hsla = hslaRegex.exec(color) || [];
  const newVal = `hsla(${hsla[1]},${hsla[2]}%,${
    hsla[3]
  }%,${opacity.secondary.toFixed(1)})`;
  return newVal;
};

const fontConfig: Parameters<typeof configureFonts>[0] = {
  default: {
    regular: rubikRegular,
    medium: rubikMedium,
    light: rubikLight,
    thin: rubikLight,
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
    text: fullTheme.colors.on_surface_dark,
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
    text: fullTheme.colors.on_surface_light,
  },
};

export const darkNavTheme: NavTheme = {
  dark: false,
  colors: {
    primary: fullTheme.colors.primary_dark,
    card: fullTheme.colors.surface_dark,
    background: fullTheme.colors.surface_dark,
    text: fullTheme.colors.on_surface_dark,
    border: fullTheme.colors.tint_on_surface_16_dark,
  },
};

export const lightNavTheme: NavTheme = {
  dark: false,
  colors: {
    primary: fullTheme.colors.primary_light,
    card: fullTheme.colors.surface_light,
    background: fullTheme.colors.surface_light,
    text: fullTheme.colors.on_surface_light,
    border: fullTheme.colors.tint_on_surface_16_light,
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
    on_surface_secondary: new DynamicValue(
      getSecondaryStatic(fullTheme.colors.on_surface_light),
      getSecondaryStatic(fullTheme.colors.on_surface_dark),
    ),
    on_surface_secondary_no_opacity: new DynamicValue('#717f9b', '#8f97a8'),
  } as Record<keyof typeof lightSeaside.colors, DynamicValue<string>> & {
    on_surface_secondary: DynamicValue<string>;
    on_surface_secondary_no_opacity: DynamicValue<string>;
  },
);

export const theme = {
  ...fullTheme,
  colors,
  textStyles: textStyles,
};
