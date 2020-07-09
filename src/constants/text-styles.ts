import {getTextStyles} from 'seaside/text_styles';
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

export const textStyles = getTextStyles({
  rubikBold,
  rubikLight,
  rubikMedium,
  rubikRegular,
});
