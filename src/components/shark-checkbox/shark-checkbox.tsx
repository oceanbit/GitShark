import * as React from 'react';
import {CheckmarkBase} from '../checkmark-base';
import {useDynamicValue} from 'react-native-dark-mode';
import {theme} from '@constants';

interface SharkCheckboxProps {
  checked: boolean;
  onValueChange?: (val: boolean) => void;
}

export const SharkCheckbox = ({checked, onValueChange}: SharkCheckboxProps) => {
  const accent = useDynamicValue(theme.colors.primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  return (
    <CheckmarkBase
      checked={checked}
      onValueChange={onValueChange}
      unselectedIcon={'checkbox_unselected'}
      selectedIcon={'checkbox_selected'}
      size={18}
      unselectedColor={on_surface_secondary}
      selectedColor={accent}
    />
  );
};
