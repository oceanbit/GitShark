import {Platform} from 'react-native';

const iOS = Platform.OS === 'ios';

export const rubikLight = {
  fontFamily: iOS ? 'Rubik' : 'rubik_light',
  fontWeight: iOS ? ('300' as const) : ('normal' as const),
};

export const rubikRegular = {
  fontFamily: iOS ? 'Rubik' : 'rubik_regular',
  fontWeight: 'normal' as const,
};

export const rubikMedium = {
  fontFamily: iOS ? 'Rubik' : 'rubik_medium',
  fontWeight: iOS ? ('500' as const) : ('normal' as const),
};

export const rubikBold = {
  fontFamily: iOS ? 'Rubik' : 'rubik_bold',
  fontWeight: iOS ? ('bold' as const) : ('normal' as const),
};

export const textStyles = {
  display: {
    ...rubikBold,
    fontSize: 48,
    lineHeight: 64,
  },

  headline_01: {
    ...rubikBold,
    fontSize: 34,
    lineHeight: 48,
  },

  headline_02: {
    ...rubikBold,
    fontSize: 28,
    lineHeight: 36,
  },

  headline_03: {
    ...rubikMedium,
    fontSize: 20,
    lineHeight: 28,
  },

  callout: {
    ...rubikMedium,
    fontSize: 16,
    lineHeight: 24,
  },

  body_01: {
    ...rubikRegular,
    fontSize: 16,
    lineHeight: 24,
  },

  body_02: {
    ...rubikRegular,
    fontSize: 14,
    lineHeight: 20,
  },

  caption_01: {
    ...rubikMedium,
    fontSize: 12,
    lineHeight: 16,
  },

  caption_02: {
    ...rubikRegular,
    fontSize: 12,
    lineHeight: 16,
  },

  overline: {
    ...rubikRegular,
    fontSize: 9,
    lineHeight: 12,
  },
};
