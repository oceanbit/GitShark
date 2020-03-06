import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    accent: '#002BFF',
    background: 'white',
    outlineColor: 'rgba(0, 51, 153, 0.2)',
    // White
    on_primary_light: '#002BFF',

    // Electric Blue 500
    primary_light: '#002BFF',

    // Navy 900
    on_surface_light: '#142952',

    // Navy 50
    background_light: '#EBF0FA',

    // White
    on_error_light: '#FFF',

    // Brown
    error_light: '#994D00',

    // Brown
    error_light_background: 'rgba(153,77,0, 0.1)',

    // White
    on_change_light: '#FFF',

    // Purple
    change_refactored_light: '#8800CC',

    // Gold
    change_mixed_light: '#E39600',

    // Red
    change_removal_light: '#002BFF',

    // Green
    change_addition_light: '#002BFF',

    // Navy 1000
    on_primary_dark: '#00081A',

    // Electric Blue 200
    primary_dark: '#99BBFF',

    // Navy 100
    on_surface_dark: '#EBF0FA',

    // Navy 900
    surface_dark: '#142952',

    // Navy 1000
    background_dark: '#00081A',

    // Black
    on_error_dark: '#000',

    // Light Brown
    error_dark: '#D9A68C',

    // Black
    on_change_dark: '#000',

    // Light Purple
    change_refactored_dark: '#CF8FEF',

    // Light Gold
    change_mixed_dark: '#FFDC99',

    // Light Red
    change_removal_dark: '#FFA8BE',

    // Light Green
    change_addition_dark: '#91EFD8',

    // Electric Blue 200 0.3 alpha
    divider_dark: 'rgba(153, 187, 255, 0.3)',
  },
};
