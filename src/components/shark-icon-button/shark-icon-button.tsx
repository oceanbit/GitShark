import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

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
  return (
    <TouchableRipple
      style={[styles.iconPadding, style]}
      onPress={onPress}
      disabled={disabled}
      rippleColor={theme.colors.outlineColor}>
      <Icon name={iconName} size={24} color={theme.colors.accent} />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  iconPadding: {
    padding: 8,
  },
});
