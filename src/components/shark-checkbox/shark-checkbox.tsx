import * as React from 'react';
import {View} from 'react-native';
import {CheckmarkBase} from '../checkmark-base';
import {useDynamicValue} from 'react-native-dark-mode';
import {theme} from '@constants';

interface SharkCheckboxProps {
  checked: boolean;
  // Checked takes priority over this. This is because it's easier to leave `indeterminate` as true than falsify it
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
    <View style={{padding: 8}}>
      <CheckmarkBase
        state={
          checked ? 'checked' : indeterminate ? 'indeterminate' : 'unchecked'
        }
        onValueChange={onValueChange}
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
