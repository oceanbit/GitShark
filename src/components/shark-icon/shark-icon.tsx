import * as React from 'react';
import {Animated, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Icon} from './icon';
import {useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';

interface SharkIconButtonProps {
  iconName: string;
  style?: React.ComponentProps<typeof Animated.View>['style'];
  color?: string;
}

export const SharkIcon = ({color, style, iconName}: SharkIconButtonProps) => {
  const accentColor = useDynamicValue(theme.colors.primary);

  const iconColor = !color ? accentColor : color;

  return (
    <Animated.View style={[styles.iconPadding, style]}>
      <Icon name={iconName} size={24} color={iconColor} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconPadding: {
    padding: theme.spacing.xs,
  },
});
