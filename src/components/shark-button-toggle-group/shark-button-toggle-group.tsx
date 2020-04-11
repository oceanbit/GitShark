import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {ButtonToggleGroup} from './button-toggle-group';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {theme} from '../../constants/theme';

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
  const surface = useDynamicValue(theme.colors.surface);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  return (
    <ButtonToggleGroup
      highlightBackgroundColor={primary}
      highlightTextColor={on_primary}
      inactiveBackgroundColor={surface}
      inactiveTextColor={on_surface_secondary}
      values={values}
      onSelect={onSelect}
      style={[styles.container, style]}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    borderColor: theme.colors.divider,
    padding: 4,
    borderWidth: 1,
    borderRadius: theme.roundness,
    overflow: 'hidden',
  },
});
