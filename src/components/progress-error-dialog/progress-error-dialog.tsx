import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {ErrorMessageBox} from '@components/error-message-box';
import {SharkButton} from '@components/shark-button';
import {useDynamicValue} from 'react-native-dynamic';
import {useTranslation} from 'react-i18next';

interface ProgressErrorDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  onRetry: () => void;
  visible: boolean;
  errorStr: string;
  headerStr: string;
  errorBodyText: string;
  bodyText: string;
  indeterminate: boolean;
  progress: number;
}

export const ProgressErrorDialog = ({
  onDismiss,
  visible,
  onRetry,
  errorStr,
  headerStr,
  bodyText,
  errorBodyText,
  indeterminate,
  progress,
}: ProgressErrorDialogProps) => {
  const accent = useDynamicValue(theme.colors.primary);

  const {t} = useTranslation();

  return (
    <>
      {/* The progress dialog */}
      <AppDialog
        visible={visible && !errorStr}
        title={headerStr}
        text={bodyText}
        dismissable={false}
        main={
          <View style={styles.progressContainer}>
            <ProgressBar
              style={styles.progressBar}
              progress={progress}
              indeterminate={indeterminate}
              color={accent}
            />
          </View>
        }
      />
      {/* The error dialog */}
      <AppDialog
        visible={visible && !!errorStr}
        onDismiss={() => onDismiss(false)}
        title={headerStr}
        text={errorBodyText}
        main={<ErrorMessageBox message={errorStr || ''} />}
        actions={
          <SharkButton onPress={onRetry} type="primary" text={t('retry')} />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    margin: 0,
    paddingHorizontal: theme.spacing.l,
    paddingTop: 20,
    paddingBottom: theme.spacing.m,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {},
});
