import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
import * as React from 'react';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useDynamicValue} from 'react-native-dynamic';

interface SharkIconButtonProps {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconStyle?: any;
  disabled?: boolean;
  color?: string;
  label: string;
}

export const SharkIconButton = ({
  iconName,
  onPress,
  style = {},
  iconStyle = {},
  disabled = false,
  color,
  label,
}: SharkIconButtonProps) => {
  const accentColor = useDynamicValue(theme.colors.primary);

  const iconColor = !color ? accentColor : color;

  return (
    <TouchableRipple
      accessibilityRole={'button'}
      accessibilityLabel={label}
      style={[styles.iconPadding, style]}
      onPress={onPress}
      disabled={disabled}>
      <Animated.View style={iconStyle}>
        <Icon name={iconName} size={24} color={iconColor} />
      </Animated.View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  iconPadding: {
    padding: theme.spacing.xs,
  },
});
