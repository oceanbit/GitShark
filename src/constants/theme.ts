import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    accent: '#002BFF',
    outlineColor: 'rgba(0, 51, 153, 0.2)',
    fadedGrey: 'rgba(20, 41, 82, 0.6)',
  },
};
