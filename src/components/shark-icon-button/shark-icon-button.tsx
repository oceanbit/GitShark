import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants';
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
}

export const SharkIconButton = ({
  iconName,
  onPress,
  style = {},
  iconStyle = {},
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
      <Animated.View style={iconStyle}>
        <Icon name={iconName} size={24} color={accentColor} />
      </Animated.View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  iconPadding: {
    padding: 8,
  },
});
