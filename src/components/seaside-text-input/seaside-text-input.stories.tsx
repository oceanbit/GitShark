import React from 'react';
import {storiesOf} from '@storybook/react';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {SeaTextInput} from './seaside-text-input';

const SeaInputDemo = ({...props}: any) => {
  const [value, setValue] = React.useState('');
  return (
    <SeaTextInput
      value={value}
      onChangeText={setValue}
      endIcon={'copy'}
      {...props}
    />
  );
};

storiesOf('Seaside Components/Text Input', module)
  .addDecorator(withKnobs)
  .add('default styling', () => (
    <SeaInputDemo disabled={boolean('Disabled', false)} />
  ));
