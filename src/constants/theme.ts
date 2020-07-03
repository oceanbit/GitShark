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

export const theme = {
  ...baseTheme,
  colors: {
    on_primary: new DynamicValue(
      seasideTheme.on_primary_light,
      seasideTheme.on_primary_dark,
    ),
    primary: new DynamicValue(
      seasideTheme.primary_light,
      seasideTheme.primary_dark,
    ),
    on_surface: new DynamicValue(
      seasideTheme.on_surface_light,
      seasideTheme.on_surface_dark,
    ),
    floating_surface: new DynamicValue(
      seasideTheme.floating_surface_light,
      seasideTheme.floating_surface_dark,
    ),
    surface: new DynamicValue(
      seasideTheme.surface_light,
      seasideTheme.surface_dark,
    ),
    error: new DynamicValue(seasideTheme.error_light, seasideTheme.error_dark),
    error_background: new DynamicValue(
      seasideTheme.error_background_light,
      seasideTheme.error_background_dark,
    ),
    on_change: new DynamicValue(
      seasideTheme.on_change_light,
      seasideTheme.on_change_dark,
    ),
    change_addition: new DynamicValue(
      seasideTheme.change_addition_light,
      seasideTheme.change_addition_dark,
    ),
    change_removal: new DynamicValue(
      seasideTheme.change_removal_light,
      seasideTheme.change_removal_dark,
    ),
    change_mixed: new DynamicValue(
      seasideTheme.change_mixed_light,
      seasideTheme.change_mixed_dark,
    ),
    change_refactored: new DynamicValue(
      seasideTheme.change_refactored_light,
      seasideTheme.change_refactored_dark,
    ),

    ripple_primary: new DynamicValue(
      seasideTheme.ripple_primary_light,
      seasideTheme.ripple_primary_dark,
    ),
    ripple_surface: new DynamicValue(
      seasideTheme.ripple_on_surface_light,
      seasideTheme.ripple_on_surface_dark,
    ),
    tint_on_surface_24: new DynamicValue(
      seasideTheme.tint_on_surface_24_light,
      seasideTheme.tint_on_surface_24_dark,
    ),
    tint_on_surface_16: new DynamicValue(
      seasideTheme.tint_on_surface_16_light,
      seasideTheme.tint_on_surface_16_dark,
    ),
    tint_on_surface_08: new DynamicValue(
      seasideTheme.tint_on_surface_08_light,
      seasideTheme.tint_on_surface_08_dark,
    ),
    tint_on_surface_04: new DynamicValue(
      seasideTheme.tint_on_surface_04_light,
      seasideTheme.tint_on_surface_04_dark,
    ),
    tint_primary_20: new DynamicValue(
      seasideTheme.tint_primary_20_light,
      seasideTheme.tint_primary_20_dark,
    ),
    tint_primary_10: new DynamicValue(
      seasideTheme.tint_primary_10_light,
      seasideTheme.tint_primary_10_dark,
    ),
    // PLEASE use `on_surface` with `opacity.secondary` instead! This is anti-pattern
    on_surface_secondary: new DynamicValue(
      getSecondaryStatic(seasideTheme.on_surface_light),
      getSecondaryStatic(seasideTheme.on_surface_dark),
    ),
    // // No seriously, please don't use this unless you ABSOLUTELY have to
    on_surface_secondary_no_opacity: new DynamicValue(
      '#717f9b', // Navy 800 "0.6 alpha"
      '#8f97a8', // Navy 100 "0.6 alpha"
    ),
  },
};
