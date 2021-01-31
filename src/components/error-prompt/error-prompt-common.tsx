import * as React from 'react';
import {View, Text, StyleProp, ViewStyle, NativeModules} from 'react-native';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {openGitHubIssue} from '@services';
import {Icon} from '@components/shark-icon';
import {FullError} from '@types';
import RNRestart from 'react-native-restart';
import {useTranslation} from 'react-i18next';

interface CommonButtonProps {
  style?: StyleProp<ViewStyle>;
  props: FullError;
}

export const GitHubButton = ({style, props}: CommonButtonProps) => {
  const styles = useDynamicValue(ghButtonStyles);
  const {t} = useTranslation();

  return (
    <SharkButton
      style={[styles.githubButton, style]}
      type={'primary'}
      onPress={() => openGitHubIssue(props)}
      icon={'github'}
      text={t('createIssue')}
    />
  );
};

const ghButtonStyles = new DynamicStyleSheet({
  githubButton: {
    backgroundColor: theme.colors.label_high_emphasis,
  },
});

export const TryAgainButton = ({style}: CommonButtonProps) => {
  const {t} = useTranslation();

  return (
    <SharkButton
      style={style}
      type={'primary'}
      onPress={() => {
        RNRestart.Restart();
      }}
      icon={'refresh'}
      text={t('tryAgain')}
    />
  );
};

export const RedContainer = (props: FullError) => {
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
