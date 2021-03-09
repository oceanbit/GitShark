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
  const label_medium_emphasis = useDynamicValue(
    theme.colors.label_medium_emphasis,
  );

  return (
    <CheckmarkBase
      state={checked ? 'checked' : 'unchecked'}
      unselectedIcon={'radio_unselected'}
      selectedIcon={'radio_selected'}
      size={24}
      unselectedColor={label_medium_emphasis}
      selectedColor={accent}
    />
  );
};
