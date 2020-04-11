import * as React from 'react';
import RoundCheckbox from './round-checkbox';
import {useDynamicValue} from 'react-native-dark-mode';
import {theme} from '../../constants/theme';

interface SharkCheckboxProps {
  checked: boolean;
  onValueChange?: (val: boolean) => void;
}
export const SharkCheckbox = ({checked, onValueChange}: SharkCheckboxProps) => {
  const accent = useDynamicValue(theme.colors.primary);
  const surface = useDynamicValue(theme.colors.surface);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  return (
    <RoundCheckbox
      checked={checked}
      backgroundColor={accent}
      borderColor={on_surface_secondary}
      size={18}
      iconColor={surface}
      onValueChange={onValueChange}
    />
  );
};
