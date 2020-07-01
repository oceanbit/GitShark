import * as React from 'react';
import {View} from 'react-native';
import {CheckmarkBase} from '../checkmark-base';
import {
  DynamicStyleSheet,
  useDynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import {spacing, theme} from '@constants';

interface SharkCheckboxProps {
  checked: boolean;
  // Checked takes priority over this. This is because it's easier to leave `indeterminate` as true than falsify it
  indeterminate?: boolean;
  onValueChange?: (val: boolean) => void;
  disabled?: boolean;
}

export const SharkCheckbox = ({
  checked,
  indeterminate,
  onValueChange,
  disabled,
}: SharkCheckboxProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const accent = useDynamicValue(theme.colors.primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  const disabledStyles = disabled ? styles.disabledStyling : {};

  return (
    <View style={[styles.checkboxContainer, disabledStyles]}>
      <CheckmarkBase
        state={
          checked ? 'checked' : indeterminate ? 'indeterminate' : 'unchecked'
        }
        onValueChange={!disabled ? onValueChange : () => {}}
        unselectedIcon={'checkbox_unselected'}
        selectedIcon={'checkbox_selected'}
        indetermindateIcon={'checkbox_intermediate'}
        size={24}
        unselectedColor={on_surface_secondary}
        selectedColor={accent}
      />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  checkboxContainer: {
    padding: spacing.xs,
  },
  disabledStyling: {
    opacity: theme.disabledOpacity,
  },
});
