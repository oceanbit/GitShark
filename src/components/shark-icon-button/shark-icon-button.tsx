import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useDynamicValue} from 'react-native-dark-mode';

interface SharkIconButtonProps {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
export const SharkIconButton = ({
  iconName,
  onPress,
  style = {},
  disabled = false,
}: SharkIconButtonProps) => {
  const dividerColor = useDynamicValue(theme.colors.divider);
  const accentColor = useDynamicValue(theme.colors.primary);

  return (
    <TouchableRipple
      style={[styles.iconPadding, style]}
      onPress={onPress}
      disabled={disabled}
      rippleColor={dividerColor}>
      <Icon name={iconName} size={24} color={accentColor} />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  iconPadding: {
    padding: 8,
  },
});
