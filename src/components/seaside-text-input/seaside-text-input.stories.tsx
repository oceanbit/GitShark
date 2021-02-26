import React from 'react';
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

export default {title: 'Seaside Components/Text Input'};

export const DefaultStyling = (args: {disabled: boolean}) => (
  <SeaInputDemo {...args} />
);

DefaultStyling.args = {disabled: false};
