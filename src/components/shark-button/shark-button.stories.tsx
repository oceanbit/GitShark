import React from 'react';
import {storiesOf} from '@storybook/react';
import {SharkButton} from './shark-button';

storiesOf('Shark Button', module).add('to Storybook', () => (
  <SharkButton text="Press Me" onPress={() => {}} />
));
