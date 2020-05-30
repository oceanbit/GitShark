import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react';
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

storiesOf('Shark Components/Checkbox', module).add('default styling', () => (
  <SharkCheckboxDemo />
));
