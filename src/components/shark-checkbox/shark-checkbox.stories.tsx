import React from 'react';
import {View} from 'react-native';
import {SharkCheckbox} from './shark-checkbox';

const SharkCheckboxDemo = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <SharkCheckbox
        checked={checked}
        onValueChange={() => setChecked(v => !v)}
      />
    </View>
  );
};

export default {title: 'Shark Components/Checkbox'};

export const DefaultStyling = () => <SharkCheckboxDemo />;
