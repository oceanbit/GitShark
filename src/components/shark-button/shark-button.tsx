import * as React from 'react';
import {StyleProp, Text, View, ViewStyle, TextProps} from 'react-native';
import {Icon} from '@components/shark-icon';
import {spacing, textStyles, theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

export interface SharkButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
  icon?: string;
  type?: 'outline' | 'primary';
  disabled?: boolean;
  // When primary, what's the background color
  backgroundColor?: string;
  textProps?: TextProps;
}

export const SharkButton = ({
  onPress,
  text,
  icon,
  style = {},
  type = 'outline',
  disabled = false,
  backgroundColor,
  textProps = {},
}: SharkButtonProps) => {
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
        <Text style={[styles.btnText, buttonTextStyle]} {...textProps}>
          {text}
        </Text>
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
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xs,
  },
  iconButton: {
    paddingLeft: spacing.s,
    paddingRight: spacing.m,
    paddingVertical: spacing.xs,
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
    marginRight: spacing.xs,
  },
  btnText: {
    textAlign: 'center',
    // IDK why this works, but it sure does
    textAlignVertical: 'center',
    ...textStyles.callout,
  },
  disabled: {
    opacity: theme.disabledOpacity,
  },
});
