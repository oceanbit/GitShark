import * as React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Platform,
  ToastAndroid,
  Linking,
} from 'react-native';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {openGitHubIssue} from '@services';
import {Icon} from '@components/shark-icon';
import {FullError} from '@types';
import RNRestart from 'react-native-restart';
import {useTranslation} from 'react-i18next';
import {useGitHubUserData} from '@hooks';
import Clipboard from '@react-native-community/clipboard';
import {TFunction} from 'i18next';
import {captureRef} from 'react-native-view-shot';
import {DownloadDirectoryPath, writeFile} from 'react-native-fs';
import {v4 as uuidv4} from 'uuid';
import {RepoConfig} from '@constants/repo-config';

type SnapRefType = Parameters<typeof captureRef>[0];

interface CommonButtonProps {
  style?: StyleProp<ViewStyle>;
  props: FullError;
  stacktraceRef: SnapRefType;
}

const loggedOutReport = async (
  ref: SnapRefType,
  t: TFunction,
  props: CommonButtonProps['props'],
) => {
  Clipboard.setString(
    `${props.explainMessage}\n${props.errorMessage}\n${props.callStack}`,
  );

  let image = '';
  try {
    image = await captureRef(ref, {
      format: 'png',
      result: 'base64',
    });
  } catch (e) {
    console.error(e);
  }

  if (Platform.OS === 'android') {
    const path = DownloadDirectoryPath + '/' + uuidv4() + '.png';
    await writeFile(path, image, 'base64');
    ToastAndroid.show(t('weSavedImgAndroid'), ToastAndroid.LONG);
  }

  /**
   * Not done yet but something to do:
   * iOS we want to use notifications (with a set time delay to dismiss it automatically)
   * to notify the user of what we've done
   */

  await Linking.openURL(
    `https://github.com/${RepoConfig.owner}/${RepoConfig.name}/issues/new?template=bug_report.md`,
  );
};

export const GitHubButton = ({
  stacktraceRef,
  style,
  props,
}: CommonButtonProps) => {
  const styles = useDynamicValue(ghButtonStyles);
  const {t} = useTranslation();
  const {useGitHub} = useGitHubUserData();

  const onPress = useGitHub
    ? () => openGitHubIssue(props)
    : () => loggedOutReport(stacktraceRef, t, props);

  return (
    <SharkButton
      style={[styles.githubButton, style]}
      type={'primary'}
      onPress={onPress}
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
