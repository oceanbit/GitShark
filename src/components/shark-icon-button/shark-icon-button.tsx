import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle, Animated} from 'react-native';
import {useDynamicValue} from 'react-native-dark-mode';

interface SharkIconButtonProps {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconStyle?: any;
  disabled?: boolean;
  primaryColor?: boolean;
}

export const SharkIconButton = ({
  iconName,
  onPress,
  style = {},
  iconStyle = {},
  disabled = false,
  primaryColor = true,
}: SharkIconButtonProps) => {
  const dividerColor = useDynamicValue(theme.colors.divider);
  const accentColor = useDynamicValue(theme.colors.primary);
  const onSurfaceColor = useDynamicValue(theme.colors.on_surface);

  const iconColor = primaryColor ? accentColor : onSurfaceColor;

  return (
    <TouchableRipple
      style={[styles.iconPadding, style]}
      onPress={onPress}
      disabled={disabled}
      rippleColor={dividerColor}>
      <Animated.View style={iconStyle}>
        <Icon name={iconName} size={24} color={iconColor} />
      </Animated.View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  iconPadding: {
    padding: 8,
  },
});
