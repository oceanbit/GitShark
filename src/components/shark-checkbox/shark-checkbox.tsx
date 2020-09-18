import * as React from 'react';
import {View} from 'react-native';
import {CheckmarkBase} from '../checkmark-base';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';

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
  const styles = useDynamicValue(dynamicStyles);

  const accent = useDynamicValue(theme.colors.primary);
  const label_medium_emphasis = useDynamicValue(
    theme.colors.label_medium_emphasis,
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
        unselectedColor={label_medium_emphasis}
        selectedColor={accent}
      />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  checkboxContainer: {
    padding: theme.spacing.xs,
  },
  disabledStyling: {
    opacity: theme.opacity.disabled,
  },
});
