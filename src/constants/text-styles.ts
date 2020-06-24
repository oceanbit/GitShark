import {Platform} from 'react-native';

const iOS = Platform.OS === 'ios';

export const textStyles = {
  display: {
    fontFamily: iOS ? 'Rubik' : 'rubik_bold',
    fontWeight: iOS ? ('bold' as const) : ('normal' as const),
    fontSize: 48,
    lineHeight: 64,
  },

  headline_01: {
    fontFamily: iOS ? 'Rubik' : 'rubik_bold',
    fontWeight: iOS ? ('bold' as const) : ('normal' as const),
    fontSize: 34,
    lineHeight: 48,
  },

  headline_02: {
    fontFamily: iOS ? 'Rubik' : 'rubik_bold',
    fontWeight: iOS ? ('bold' as const) : ('normal' as const),
    fontSize: 28,
    lineHeight: 36,
  },

  headline_03: {
    fontFamily: iOS ? 'Rubik' : 'rubik_medium',
    fontWeight: iOS ? ('500' as const) : ('normal' as const),
    fontSize: 20,
    lineHeight: 28,
  },

  callout: {
    fontFamily: iOS ? 'Rubik' : 'rubik_medium',
    fontWeight: iOS ? ('500' as const) : ('normal' as const),
    fontSize: 16,
    lineHeight: 24,
  },

  body_01: {
    fontFamily: iOS ? 'Rubik' : 'rubik_regular',
    fontWeight: 'normal' as const,
    fontSize: 16,
    lineHeight: 24,
  },

  body_02: {
    fontFamily: iOS ? 'Rubik' : 'rubik_regular',
    fontWeight: 'normal' as const,
    fontSize: 14,
    lineHeight: 20,
  },

  caption_01: {
    fontFamily: iOS ? 'Rubik' : 'rubik_medium',
    fontWeight: iOS ? ('500' as const) : ('normal' as const),
    fontSize: 12,
    lineHeight: 16,
  },

  caption_02: {
    fontFamily: iOS ? 'Rubik' : 'rubik_regular',
    fontWeight: 'normal' as const,
    fontSize: 12,
    lineHeight: 16,
  },

  overline: {
    fontFamily: iOS ? 'Rubik' : 'rubik_regular',
    fontWeight: 'normal' as const,
    fontSize: 9,
    lineHeight: 12,
  },
};
