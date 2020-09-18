import {getTextStyles} from '@oceanbit/styles';
import {Platform} from 'react-native';

const iOS = Platform.OS === 'ios';

export const epilogueLight = {
  fontFamily: iOS ? 'Rubik' : 'rubik_light',
  fontWeight: iOS ? ('300' as const) : ('normal' as const),
};

export const epilogueRegular = {
  fontFamily: iOS ? 'Rubik' : 'rubik_regular',
  fontWeight: 'normal' as const,
};

export const epilogueSemiBold = {
  fontFamily: iOS ? 'Rubik' : 'rubik_medium',
  fontWeight: iOS ? ('500' as const) : ('normal' as const),
};

export const epilogueBold = {
  fontFamily: iOS ? 'Rubik' : 'rubik_bold',
  fontWeight: iOS ? ('bold' as const) : ('normal' as const),
};

export const textStyles = getTextStyles({
  epilogueBold,
  epilogueSemiBold,
  epilogueRegular,
  robotoCode: epilogueRegular,
});
