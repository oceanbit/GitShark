import React from 'react';
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

export default {title: 'Shark Components/Text Input'};

export const DefaultStyling = () => <SharkInputDemo />;
