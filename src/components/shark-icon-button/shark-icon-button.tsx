import * as React from 'react';
import {Icon, SharkIcon} from '@components/shark-icon';
import {theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
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
  buttonProps: Partial<
    Omit<
      React.ComponentProps<typeof TouchableRipple>,
      'style' | 'onPress' | 'disabled'
    >
  >;
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
  return (
    <TouchableRipple
      accessibilityRole={'button'}
      accessibilityLabel={label}
      onPress={onPress}
      disabled={disabled}
      style={[styles.iconPadding, style]}>
      <SharkIcon
        iconName={iconName}
        color={color}
        style={[styles.noPadIcon, iconStyle]}
      />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  iconPadding: {
    padding: theme.spacing.xs,
  },
  noPadIcon: {
    padding: 0,
  },
});
