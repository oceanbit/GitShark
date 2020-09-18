import React from 'react';
import {storiesOf} from '@storybook/react';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {SeaSwitch} from './seaside-switch';

const SeaSwitchDemo = ({...props}: any) => {
  const [value, setValue] = React.useState(false);
  return <SeaSwitch enabled={value} setEnabled={setValue} {...props} />;
};

storiesOf('Seaside Components/Switch', module)
  .addDecorator(withKnobs)
  .add('default styling', () => (
    <SeaSwitchDemo disabled={boolean('Disabled', false)} />
  ));
