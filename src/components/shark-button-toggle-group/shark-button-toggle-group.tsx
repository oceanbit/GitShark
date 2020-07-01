import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {borders, spacing, textStyles, theme} from '@constants';
import ButtonToggleGroup from 'react-native-button-toggle-group';

interface SharkButtonToggleGroupProps {
  values: string[];
  onSelect: (val: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SharkButtonToggleGroup = ({
  values,
  onSelect,
  style = {},
}: SharkButtonToggleGroupProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const primary = useDynamicValue(theme.colors.primary);
  const on_primary = useDynamicValue(theme.colors.on_primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  return (
    <ButtonToggleGroup
      highlightBackgroundColor={primary}
      highlightTextColor={on_primary}
      inactiveBackgroundColor={'transparent'}
      inactiveTextColor={on_surface_secondary}
      values={values}
      onSelect={onSelect}
      style={[styles.container, style]}
      textStyle={styles.buttonText}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    borderColor: theme.colors.divider,
    padding: spacing.xxs,
    borderWidth: borders.normal,
    borderRadius: theme.roundness,
    overflow: 'hidden',
  },
  buttonText: {
    ...textStyles.callout,
  },
});
