import React from 'react';
import {storiesOf} from '@storybook/react';
import {SeaSwitch} from './seaside-switch';

const SeaSwitchDemo = ({...props}: any) => {
  const [value, setValue] = React.useState(false);
  return <SeaSwitch enabled={value} setEnabled={setValue} />;
};

storiesOf('Seaside Components/Switch', module).add('default styling', () => (
  <SeaSwitchDemo />
));
