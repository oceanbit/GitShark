import React from 'react';
import {storiesOf} from '@storybook/react';
import {SharkButton} from './shark-button';

storiesOf('Shark Components/Button', module).add('default styling', () => (
  <SharkButton text="Press Me" onPress={() => {}} />
));
