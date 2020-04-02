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
}
export const SharkButton = ({
  onPress,
  text,
  icon,
  style = {},
  type = 'outline',
}: SharkTextInputProps) => {
  const buttonPaddingStyle = icon ? styles.iconButton : styles.noIconButton;
  const buttonTypeStyle =
    type === 'outline' ? styles.outlineButton : styles.primaryButton;
  const buttonTextStyle =
    type === 'outline' ? styles.outlineButtonText : styles.primaryButtonText;
  const iconColor = type === 'outline' ? theme.colors.accent : 'white';
  return (
    <TouchableRipple
      onPress={onPress}
      style={[styles.button, buttonPaddingStyle, buttonTypeStyle, style]}>
      <View>
        {!!icon && (
          <View style={styles.iconView}>
            <Icon size={24} name={icon} color={iconColor} />
          </View>
        )}
        <Text style={[styles.btnText, buttonTextStyle]}>{text}</Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.roundness,
    alignContent: 'center',
    minHeight: 24,
    justifyContent: 'center',
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
    ...textStyles.callout,
  },
});
