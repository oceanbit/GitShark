import * as React from 'react';
import {CheckmarkBase} from '../checkmark-base';
import {useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';

interface SharkRadioProps {
  checked: boolean;
  onValueChange?: (val: boolean) => void;
}

export const SharkRadio = ({checked, onValueChange}: SharkRadioProps) => {
  const accent = useDynamicValue(theme.colors.primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  return (
    <CheckmarkBase
      state={checked ? 'checked' : 'unchecked'}
      onValueChange={onValueChange}
      unselectedIcon={'radio_unselected'}
      selectedIcon={'radio_selected'}
      size={24}
      unselectedColor={on_surface_secondary}
      selectedColor={accent}
    />
  );
};
