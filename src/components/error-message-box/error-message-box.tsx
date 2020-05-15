import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {textStyles, theme} from '@constants';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

interface ErrorMessageBoxProps {
  message: string;
  style?: StyleProp<ViewStyle>;
}

export const ErrorMessageBox = ({
  message,
  style = {},
}: ErrorMessageBoxProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const error = useDynamicValue(theme.colors.error);

  return (
    <View style={[styles.errorBoxContainer, style]}>
      <Icon name="alert-circle" size={18} color={error} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBoxContainer: {
    backgroundColor: theme.colors.error_bubble,
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: 12,
    paddingVertical: 7,
    borderRadius: theme.roundness,
  },
  errorText: {
    marginLeft: 7,
    color: theme.colors.error,
    ...textStyles.caption_01,
  },
});
