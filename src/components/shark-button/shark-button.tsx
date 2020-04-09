import * as React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';
import {TouchableRipple} from 'react-native-paper';

interface SharkTextInputProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
  icon?: string;
  type?: 'outline' | 'primary';
  disabled?: boolean;
}
export const SharkButton = ({
  onPress,
  text,
  icon,
  style = {},
  type = 'outline',
  disabled = false,
}: SharkTextInputProps) => {
  const buttonPaddingStyle = icon ? styles.iconButton : styles.noIconButton;
  const buttonTypeStyle =
    type === 'outline' ? styles.outlineButton : styles.primaryButton;
  const buttonTextStyle =
    type === 'outline' ? styles.outlineButtonText : styles.primaryButtonText;
  const iconColor = type === 'outline' ? theme.colors.accent : 'white';
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

const styles = StyleSheet.create({
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
    borderColor: theme.colors.outlineColor,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
  },
  outlineButtonText: {
    color: theme.colors.accent,
  },
  primaryButtonText: {
    color: 'white',
  },
  iconView: {
    marginRight: 8,
  },
  btnText: {
    textAlign: 'center',
    ...textStyles.callout,
  },
  disabled: {
    opacity: 0.4,
  },
});
