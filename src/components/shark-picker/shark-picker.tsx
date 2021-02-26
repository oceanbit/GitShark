import * as React from 'react';
import {Picker} from '@react-native-picker/picker';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import tinycolor from 'tinycolor2';

type SharkPickerProps = Omit<
  React.ComponentProps<typeof Picker>,
  'style' | 'mode' | 'itemStyle' | 'dropdownIconColor'
>;

type SharkPicker = React.FC<SharkPickerProps> & {
  Item: typeof Picker.Item;
};

export const SharkPicker: SharkPicker = ({children, ...props}) => {
  const styles = useDynamicValue(dynamicStyles);
  const high_emphasis = useDynamicValue(theme.colors.label_high_emphasis);

  // A limitation of the native code for the picker
  // component is that you have to use a hex color
  // for the dropdown color input.
  const high_emphasis_hex = tinycolor(high_emphasis).toHex();

  return (
    <Picker
      style={styles.pickerStyle}
      {...props}
      mode={'dropdown'}
      dropdownIconColor={`#${high_emphasis_hex}`}
      itemStyle={styles.pickerLabel}>
      {children}
    </Picker>
  );
};

SharkPicker.Item = Picker.Item;

const dynamicStyles = new DynamicStyleSheet({
  pickerStyle: {
    color: theme.colors.label_high_emphasis,
  },
  pickerLabel: {
    color: theme.colors.label_high_emphasis,
  },
});
