import * as React from 'react';
import {CheckmarkBase} from '../checkmark-base';
import {useDynamicValue} from 'react-native-dark-mode';
import {theme} from '@constants';

interface SharkCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onValueChange?: (val: boolean) => void;
}

export const SharkCheckbox = ({
  checked,
  indeterminate,
  onValueChange,
}: SharkCheckboxProps) => {
  const accent = useDynamicValue(theme.colors.primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  return (
    <CheckmarkBase
      state={
        indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'
      }
      onValueChange={onValueChange}
      unselectedIcon={'checkbox_unselected'}
      selectedIcon={'checkbox_selected'}
      indetermindateIcon={'checkbox_intermediate'}
      size={18}
      unselectedColor={on_surface_secondary}
      selectedColor={accent}
    />
  );
};
