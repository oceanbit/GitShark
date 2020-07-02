import {
  configureFonts,
  DefaultTheme,
  Theme as PaperTheme,
} from 'react-native-paper';
import {theme as seasideTheme} from 'seaside/theme';
import {Theme as NavTheme} from '@react-navigation/native/src/types';
import {DynamicValue} from 'react-native-dark-mode';
import {rubikLight, rubikMedium, rubikRegular} from './text-styles';

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
    tinted_surface: new DynamicValue(
      seasideTheme.tinted_surface_light,
      seasideTheme.tinted_surface_dark,
    ),
    change_addition: new DynamicValue(
      seasideTheme.change_addition_light,
      seasideTheme.change_addition_dark,
    ),
    change_mixed: new DynamicValue(
      seasideTheme.change_mixed_light,
      seasideTheme.change_mixed_dark,
    ),
    change_refactored: new DynamicValue(
      seasideTheme.change_refactored_light,
      seasideTheme.change_refactored_dark,
    ),
    change_removal: new DynamicValue(
      seasideTheme.change_removal_light,
      seasideTheme.change_removal_dark,
    ),
    tint_on_surface_16: new DynamicValue(
      seasideTheme.tint_on_surface_16_light,
      seasideTheme.tint_on_surface_16_dark,
    ),
    error: new DynamicValue(seasideTheme.error_light, seasideTheme.error_dark),
    error_bubble: new DynamicValue(
      seasideTheme.error_bubble_light,
      seasideTheme.error_bubble_dark,
    ),
    floating_surface: new DynamicValue(
      seasideTheme.floating_surface_light,
      seasideTheme.floating_surface_dark,
    ),
    on_change: new DynamicValue(
      seasideTheme.on_change_light,
      seasideTheme.on_change_dark,
    ),
    on_error: new DynamicValue(
      seasideTheme.on_error_light,
      seasideTheme.on_error_dark,
    ),
    on_primary: new DynamicValue(
      seasideTheme.on_primary_light,
      seasideTheme.on_primary_dark,
    ),
    on_surface: new DynamicValue(
      seasideTheme.on_surface_light,
      seasideTheme.on_surface_dark,
    ),
    on_surface_secondary: new DynamicValue(
      seasideTheme.on_surface_secondary_light,
      seasideTheme.on_surface_secondary_dark,
    ),
    // Please don't use this unless you ABSOLUTELY have to
    on_surface_secondary_no_opacity: new DynamicValue(
      seasideTheme.on_surface_secondary_light_no_opacity,
      seasideTheme.on_surface_secondary_dark_no_opacity,
    ),
    primary: new DynamicValue(
      seasideTheme.primary_light,
      seasideTheme.primary_dark,
    ),
    ripple_primary: new DynamicValue(
      seasideTheme.ripple_primary_light,
      seasideTheme.ripple_primary_dark,
    ),
    ripple_surface: new DynamicValue(
      seasideTheme.ripple_surface_light,
      seasideTheme.ripple_surface_dark,
    ),
    surface: new DynamicValue(
      seasideTheme.surface_light,
      seasideTheme.surface_dark,
    ),
    selected_primary: new DynamicValue(
      seasideTheme.selected_primary_light,
      seasideTheme.selected_primary_dark,
    ),
  },
};
