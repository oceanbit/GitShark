import * as React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
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

export const SharkCheckbox: React.FC<SharkCheckboxProps> = ({
  checked,
  indeterminate,
  onValueChange,
  disabled,
  children,
}) => {
  const styles = useDynamicValue(dynamicStyles);

  const accent = useDynamicValue(theme.colors.primary);
  const label_medium_emphasis = useDynamicValue(
    theme.colors.label_medium_emphasis,
  );

  const disabledStyles = disabled ? styles.disabledStyling : {};

  const state = checked
    ? 'checked'
    : indeterminate
    ? 'indeterminate'
    : 'unchecked';

  const onValueChangeLocal = (val: boolean) => {
    if (disabled) return;
    if (onValueChange) onValueChange(val);
  };

  const _onPress = () => {
    switch (state) {
      case 'checked':
        onValueChangeLocal(false);
        break;
      case 'indeterminate':
      case 'unchecked':
      default:
        onValueChangeLocal(true);
        break;
    }
  };

  const checkboxBase = (
    <View style={[styles.checkboxContainer, disabledStyles]}>
      <CheckmarkBase
        state={state}
        unselectedIcon={'checkbox_unselected'}
        selectedIcon={'checkbox_selected'}
        indetermindateIcon={'checkbox_intermediate'}
        size={24}
        unselectedColor={label_medium_emphasis}
        selectedColor={accent}
      />
    </View>
  );

  if (!onValueChange) {
    return <>{checkboxBase}</>;
  }

  return (
    <TouchableWithoutFeedback onPress={_onPress} disabled={disabled}>
      <View style={styles.checkboxFlex}>
        {checkboxBase}
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  checkboxFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    padding: theme.spacing.xs,
  },
  disabledStyling: {
    opacity: theme.opacity.disabled,
  },
});
