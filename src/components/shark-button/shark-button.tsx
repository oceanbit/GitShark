import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {textStyles, theme} from '../../constants';
import {TouchableRipple} from 'react-native-paper';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

interface SharkTextInputProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
  icon?: string;
  type?: 'outline' | 'primary';
  disabled?: boolean;
  // When primary, what's the background color
  backgroundColor?: string;
}

export const SharkButton = ({
  onPress,
  text,
  icon,
  style = {},
  type = 'outline',
  disabled = false,
  backgroundColor,
}: SharkTextInputProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);
  const on_primary = useDynamicValue(theme.colors.on_primary);

  const buttonPaddingStyle = icon ? styles.iconButton : styles.noIconButton;
  const buttonTypeStyle =
    type === 'outline'
      ? styles.outlineButton
      : {
          backgroundColor: backgroundColor || accent,
        };
  const buttonTextStyle =
    type === 'outline' ? styles.outlineButtonText : styles.primaryButtonText;
  const iconColor = type === 'outline' ? accent : on_primary;
  const stateStyle = disabled ? styles.disabled : {};
  return (
    <TouchableRipple
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        buttonPaddingStyle,
        buttonTypeStyle,
        stateStyle,
        style,
      ]}>
      <>
        {!!icon && (
          <View style={styles.iconView}>
            <Icon size={24} name={icon} color={iconColor} />
          </View>
        )}
        <Text style={[styles.btnText, buttonTextStyle]}>{text}</Text>
      </>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  button: {
    borderRadius: theme.roundness,
    alignContent: 'center',
    minHeight: 24,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  noIconButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconButton: {
    paddingLeft: 12,
    paddingRight: 16,
    paddingVertical: 8,
  },
  outlineButton: {
    borderColor: theme.colors.divider,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    color: theme.colors.primary,
  },
  primaryButtonText: {
    color: theme.colors.on_primary,
  },
  iconView: {
    marginRight: 8,
  },
  btnText: {
    textAlign: 'center',
    ...textStyles.callout,
  },
  disabled: {
    opacity: theme.disabledOpacity,
  },
});
