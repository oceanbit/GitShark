import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

interface ErrorMessageBoxProps {
  message: string;
  style?: StyleProp<ViewStyle>;
}

export const ErrorMessageBox = ({
  message,
  style = {},
}: ErrorMessageBoxProps) => {
  const styles = useDynamicValue(dynamicStyles);
  const error = useDynamicValue(theme.colors.error);

  return (
    <View style={[styles.errorBoxContainer, style]}>
      <Icon
        name="error"
        size={18}
        color={error}
        accessibilityElementsHidden={true}
        importantForAccessibility={'no'}
      />
      <Text accessibilityLiveRegion={'assertive'} style={styles.errorText}>
        {message}
      </Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBoxContainer: {
    backgroundColor: theme.colors.error_background,
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: theme.spacing.s,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.regular,
  },
  errorText: {
    marginLeft: 7,
    color: theme.colors.error,
    ...theme.textStyles.caption_01,
  },
});
