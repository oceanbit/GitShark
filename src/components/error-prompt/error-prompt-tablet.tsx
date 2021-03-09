import * as React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {useDimensions} from 'react-native-responsive-ui';
import {BaseDialog} from '@components/dialog';
import {SharkDivider} from '@components/shark-divider';

import {
  GitHubButton,
  RedContainer,
  TryAgainButton,
} from './error-prompt-common';
import {FullError} from '@types';

export const ErrorPromptTablet = (props: FullError) => {
  const {callStack} = props;
  const styles = useDynamicValue(dynamicStyles);

  const {height} = useDimensions();

  const maxHeight = height / 3;

  const callstackRef = React.useRef();

  const gitHubButton = (
    <GitHubButton
      props={props}
      style={styles.tabletButton}
      stacktraceRef={callstackRef}
    />
  );

  const tryAgainButton = (
    <TryAgainButton
      props={props}
      style={styles.tabletButton}
      stacktraceRef={callstackRef}
    />
  );

  return (
    <BaseDialog visible={true} dismissable={false} style={styles.dialog}>
      <View style={styles.tabletErrorContain}>
        <RedContainer {...props} />
      </View>
      <SharkDivider />
      <ScrollView style={{maxHeight}}>
        <Text
          style={[styles.tabletCallstack, styles.callstack]}
          ref={callstackRef as any}>
          {callStack}
        </Text>
      </ScrollView>
      <SharkDivider />
      <View style={styles.tabletButtons}>
        {gitHubButton}
        <View style={styles.tabletButtonSpacing} />
        {tryAgainButton}
      </View>
    </BaseDialog>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  dialog: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sheetContainer: {
    height: '100%',
    backgroundColor: theme.colors.surface,
  },
  tabletErrorContain: {
    padding: theme.spacing.xl,
  },
  tabletCallstack: {
    padding: theme.spacing.xl,
  },
  callstack: {
    ...theme.textStyles.code,
    backgroundColor: theme.colors.surface,
  },
  tabletButtons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: theme.spacing.xl,
  },
  tabletButtonSpacing: {
    width: theme.spacing.xl,
  },
  tabletButton: {
    flexGrow: 1,
  },
});
