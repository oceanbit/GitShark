import * as React from 'react';
import {CheckmarkBase} from '../checkmark-base';
import {useDynamicValue} from 'react-native-dark-mode';
import {theme} from '@constants';

interface SharkRadioProps {
  checked: boolean;
  onValueChange?: (val: boolean) => void;
}

export const SharkRadio = ({checked, onValueChange}: SharkRadioProps) => {
  const accent = useDynamicValue(theme.colors.primary);
  const surface = useDynamicValue(theme.colors.surface);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  return (
    <CheckmarkBase
      checked={checked}
      backgroundColor={accent}
      borderColor={on_surface_secondary}
      size={18}
      iconColor={surface}
      onValueChange={onValueChange}
      borderRadius={50}
    />
  );
};
