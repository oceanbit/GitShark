import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import ButtonToggleGroup from 'react-native-button-toggle-group';

interface SharkButtonToggleGroupProps {
  values: string[];
  value: string;
  onSelect: (val: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SharkButtonToggleGroup = ({
  values,
  value,
  onSelect,
  style = {},
}: SharkButtonToggleGroupProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const primary = useDynamicValue(theme.colors.primary);
  const on_primary = useDynamicValue(theme.colors.on_primary);
  const label_medium_emphasis = useDynamicValue(
    theme.colors.label_medium_emphasis,
  );

  return (
    <ButtonToggleGroup
      highlightBackgroundColor={primary}
      highlightTextColor={on_primary}
      inactiveBackgroundColor={'transparent'}
      inactiveTextColor={label_medium_emphasis}
      values={values}
      value={value}
      onSelect={onSelect}
      style={[styles.container, style]}
      textStyle={styles.buttonText}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    borderColor: theme.colors.tint_on_surface_01,
    padding: theme.spacing.xxs,
    borderWidth: theme.borders.normal,
    borderRadius: theme.borderRadius.regular,
    overflow: 'hidden',
  },
  buttonText: {
    ...theme.textStyles.callout_01,
  },
});
