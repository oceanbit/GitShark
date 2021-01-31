import * as React from 'react';
import {ErrorMessageBox} from '@components/error-message-box';
import {View, Text, ScrollView} from 'react-native';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {ErrorPromptProps, openGitHubIssue} from '@services';
import {mediaQuery, useDimensions} from 'react-native-responsive-ui';
import {BaseDialog} from '@components/dialog';
import {SharkDivider} from '@components/shark-divider';
import {Icon} from '@components/shark-icon';

export const ErrorPrompt = (props: ErrorPromptProps) => {
  const {explainMessage, callStack, errorMessage} = props;
  const styles = useDynamicValue(dynamicStyles);
  const error = useDynamicValue(theme.colors.error);

  const {width, height} = useDimensions();

  const isTablet = mediaQuery(
    {minWidth: theme.breakpoints.tablet},
    width,
    height,
  );

  const maxHeight = height / 3;

  const buttonClass = isTablet ? styles.tabletButton : {};

  const gitHubButton = (
    <SharkButton
      style={[styles.githubButton, buttonClass]}
      type={'primary'}
      onPress={() => openGitHubIssue(props)}
      icon={'github'}
      text={'Create issue'}
    />
  );

  const tryAgainButton = (
    <SharkButton
      style={buttonClass}
      type={'primary'}
      onPress={() => {}}
      icon={'refresh'}
      text={'Try again'}
    />
  );

  if (isTablet)
    return (
      <BaseDialog visible={true} dismissable={false} style={styles.dialog}>
        <View style={styles.tabletErrorContain}>
          <View style={styles.redContainer}>
            <Icon
              name={'error'}
              size={24}
              color={error}
              style={styles.errorIcon}
            />
            <Text style={[styles.redText, styles.explainText]}>
              {explainMessage}
            </Text>
            <Text style={[styles.redText, styles.errorMessageText]}>
              {errorMessage}
            </Text>
          </View>
        </View>
        <SharkDivider />
        <ScrollView style={{maxHeight}}>
          <Text style={[styles.tabletCallstack, styles.callstack]}>
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

  return (
    // TODO: Create translation for buttons
    <View>
      <ErrorMessageBox message={explainMessage} />
      {gitHubButton}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  dialog: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  githubButton: {
    backgroundColor: theme.colors.label_high_emphasis,
  },
  redContainer: {
    backgroundColor: theme.colors.error_background,
    borderRadius: theme.borderRadius.regular,
    padding: theme.spacing.m,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  errorIcon: {
    marginBottom: theme.spacing.s,
  },
  redText: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  explainText: {
    ...theme.textStyles.callout_01,
  },
  errorMessageText: {
    ...theme.textStyles.body_01,
  },
  tabletErrorContain: {
    padding: theme.spacing.xl,
  },
  tabletCallstack: {
    padding: theme.spacing.xl,
  },
  callstack: {
    ...theme.textStyles.code,
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
