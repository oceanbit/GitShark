import * as React from 'react';
import {View, Text, StyleProp, ViewStyle} from 'react-native';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {ErrorPromptProps, openGitHubIssue} from '@services';
import {Icon} from '@components/shark-icon';

interface CommonButtonProps {
  style?: StyleProp<ViewStyle>;
  props: ErrorPromptProps;
}

export const GitHubButton = ({style, props}: CommonButtonProps) => {
  const styles = useDynamicValue(ghButtonStyles);

  return (
    <SharkButton
      style={[styles.githubButton, style]}
      type={'primary'}
      onPress={() => openGitHubIssue(props)}
      icon={'github'}
      text={'Create issue'}
    />
  );
};

const ghButtonStyles = new DynamicStyleSheet({
  githubButton: {
    backgroundColor: theme.colors.label_high_emphasis,
  },
});

export const TryAgainButton = ({style}: CommonButtonProps) => (
  <SharkButton
    style={style}
    type={'primary'}
    onPress={() => {}}
    icon={'refresh'}
    text={'Try again'}
  />
);

export const RedContainer = (props: ErrorPromptProps) => {
  const {explainMessage, errorMessage} = props;

  const error = useDynamicValue(theme.colors.error);
  const styles = useDynamicValue(redContainerStyles);

  return (
    <View style={styles.redContainer}>
      <Icon name={'error'} size={24} color={error} style={styles.errorIcon} />
      <Text style={[styles.redText, styles.explainText]}>{explainMessage}</Text>
      <Text style={[styles.redText, styles.errorMessageText]}>
        {errorMessage}
      </Text>
    </View>
  );
};

const redContainerStyles = new DynamicStyleSheet({
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
});
