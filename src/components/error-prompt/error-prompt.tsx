import * as React from 'react';
import {theme} from '@constants';
import {ErrorPromptProps} from '@services';
import {mediaQuery, useDimensions} from 'react-native-responsive-ui';
import {ErrorPromptTablet} from './error-prompt-tablet';
import {ErrorPromptMobile} from './error-prompt-mobile';

export const ErrorPrompt = (props: ErrorPromptProps) => {
  const {width, height} = useDimensions();

  const isTablet = mediaQuery(
    {minWidth: theme.breakpoints.tablet},
    width,
    height,
  );

  if (isTablet) return <ErrorPromptTablet {...props} />;

  // Mobile view
  return <ErrorPromptMobile {...props} />;
};
