import React from 'react';
import {storiesOf} from '@storybook/react';
import {SeaTextInput} from './seaside-text-input';

const SeaInputDemo = ({...props}: any) => {
  const [value, setValue] = React.useState('');
  return (
    <SeaTextInput
      value={value}
      onChangeText={setValue}
      postfixIcon={'copy'}
      {...props}
    />
  );
};

storiesOf('Seaside Components/Text Input', module).add(
  'default styling',
  () => <SeaInputDemo />,
);
