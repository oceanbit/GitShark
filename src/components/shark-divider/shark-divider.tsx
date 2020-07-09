import * as React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {theme} from '@constants';

interface SharkDividerProps {
  style?: StyleProp<ViewStyle>;
}

export const SharkDivider = ({style = {}}: SharkDividerProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return <View style={[styles.divider, style]} />;
};

const dynamicStyles = new DynamicStyleSheet({
  divider: {
    width: '100%',
    borderTopWidth: theme.borders.normal,
    borderTopColor: theme.colors.tint_on_surface_16,
  },
});
