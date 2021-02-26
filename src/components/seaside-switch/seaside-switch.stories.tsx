import React from 'react';
import {SeaSwitch} from './seaside-switch';

const SeaSwitchDemo = ({...props}: any) => {
  const [value, setValue] = React.useState(false);
  return <SeaSwitch enabled={value} setEnabled={setValue} {...props} />;
};

export default {title: 'Seaside Components/Switch'};

export const DefaultStyling = (args: {disabled: boolean}) => (
  <SeaSwitchDemo {...args} />
);

DefaultStyling.args = {disabled: false};
