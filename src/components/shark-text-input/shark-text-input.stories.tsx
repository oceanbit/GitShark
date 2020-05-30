import React from 'react';
import {storiesOf} from '@storybook/react';
import {SharkTextInput} from './shark-text-input';

const SharkInputDemo = ({...props}: any) => {
  const [value, setValue] = React.useState('');
  return (
    <SharkTextInput
      placeholder="Type in me"
      prefixIcon="link"
      value={value}
      onChangeText={setValue}
      {...props}
    />
  );
};

storiesOf('Shark Components/Text Input', module).add('default styling', () => (
  <SharkInputDemo />
));
