import * as React from 'react';
import {View} from 'react-native';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkButton} from '@components/shark-button';
import {useTranslation} from 'react-i18next';

interface DeleteRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const DeleteRepositoryDialog = ({
  onDismiss,
  visible,
}: DeleteRepositoryDialogProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);
  const change_removal = useDynamicValue(theme.colors.change_removal);

  const parentOnDismiss = (bool: boolean) => {
    onDismiss(bool);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={t('deleteRepoDialogTitle')}
      text={t('deleteRepoDialogText')}
      main={
        <>
          {/* {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )} */}
        </>
      }
      actions={
        <View style={styles.buttonContainer}>
          <SharkButton
            onPress={() => parentOnDismiss(true)}
            type="primary"
            backgroundColor={change_removal}
            style={styles.fullWidthBtn}
            text={t('deleteAction')}
          />
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={[styles.cancelBtn, styles.fullWidthBtn]}
            text={t('cancelAction')}
          />
        </View>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: theme.spacing.xs,
  },
  cancelBtn: {
    marginTop: theme.spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  fullWidthBtn: {
    width: '100%',
  },
});
