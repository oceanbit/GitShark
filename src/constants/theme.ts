import {
  configureFonts,
  DefaultTheme,
  Theme as PaperTheme,
} from 'react-native-paper';
import {theme as seasideTheme} from 'seaside/theme';
import {Theme as NavTheme} from '@react-navigation/native/src/types';
import {DynamicValue} from 'react-native-dark-mode';
import {rubikLight, rubikMedium, rubikRegular} from './text-styles';
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

const baseTheme = {
  ...DefaultTheme,
  roundness: 8,
  disabledOpacity: 0.4,
  lessRoundness: 4,
  fonts: configureFonts(fontConfig),
};

export const darkPaperTheme: PaperTheme = {
  ...baseTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    accent: seasideTheme.primary_dark,
    background: seasideTheme.surface_dark,
    error: seasideTheme.error_dark,
    surface: seasideTheme.surface_dark,
    text: seasideTheme.on_surface_dark,
  },
};

export const lightPaperTheme: PaperTheme = {
  ...baseTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    accent: seasideTheme.primary_light,
    background: seasideTheme.surface_light,
    error: seasideTheme.error_light,
    surface: seasideTheme.surface_light,
    text: seasideTheme.on_surface_light,
  },
};

export const darkNavTheme: NavTheme = {
  dark: false,
  colors: {
    primary: seasideTheme.primary_dark,
    card: seasideTheme.surface_dark,
    background: seasideTheme.surface_dark,
    text: seasideTheme.on_surface_dark,
    border: seasideTheme.tint_on_surface_16_dark,
  },
};

export const lightNavTheme: NavTheme = {
  dark: false,
  colors: {
    primary: seasideTheme.primary_light,
    card: seasideTheme.surface_light,
    background: seasideTheme.surface_light,
    text: seasideTheme.on_surface_light,
    border: seasideTheme.tint_on_surface_16_light,
  },
};

/**
 * This is an awful lot of hackiness. Crazy how it still works, iddnit?
 */
const colors = Object.keys(lightTheme).reduce(
  (prev, key: string) => {
    const theKey = key as 'primary';
    const lightVal = lightTheme[theKey];
    const darkVal = darkTheme[theKey];
    if (lightVal === darkVal) {
      prev[theKey] = lightVal;
    } else {
      prev[theKey] = (new DynamicValue(lightVal, darkVal) as any) as string;
    }
    return prev;
  },
  {
    on_surface_secondary: new DynamicValue(
      getSecondaryStatic(seasideTheme.on_surface_light),
      getSecondaryStatic(seasideTheme.on_surface_dark),
    ),
    on_surface_secondary_no_opacity: new DynamicValue('#717f9b', '#8f97a8'),
  } as typeof lightTheme,
);

export const theme = {
  ...baseTheme,
  colors,
};
