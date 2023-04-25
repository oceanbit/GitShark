import * as React from 'react';
import {AppDialog} from '@components/dialog';
import {ErrorMessageBox} from '@components/error-message-box';
import {SharkTextInput} from '@components/shark-text-input';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkButton} from '@components/shark-button';
import {theme} from '@constants';
import {useTranslation} from 'react-i18next';

interface RenameRepositoryDialogProps {
  onDismiss: (newName: null | string) => void;
  visible: boolean;
}

export const RenameRepositoryDialog = ({
  onDismiss,
  visible,
}: RenameRepositoryDialogProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const [repoName, setRepoName] = React.useState('');
  const [errorStr, setErrorStr] = React.useState('');

  const renameRepoLocal = async () => {
    if (!repoName) {
      setErrorStr(t('noRepoNameErr')!);
    }
    onDismiss(repoName);
    setRepoName('');
    setErrorStr('');
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => onDismiss(null)}
      title={t('renameRepoDialogTitle')}
      text={t('renameRepoDialogText')}
      main={
        <>
          <SharkTextInput
            value={repoName}
            onChangeText={setRepoName}
            placeholder={t('renameRepoDialogInput')}
            style={styles.textInput}
          />
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
        </>
      }
      actions={
        <>
          <SharkButton
            onPress={() => onDismiss(null)}
            type="outline"
            style={styles.cancelBtn}
            text={t('cancelAction')}
          />
          <SharkButton
            onPress={() => renameRepoLocal()}
            type="primary"
            text={t('renameAction')}
          />
        </>
      }
    />
  );
};

export const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: theme.spacing.xs,
  },
  textInput: {
    marginTop: theme.spacing.xs,
  },
  cancelBtn: {
    marginRight: theme.spacing.m,
  },
  dialogActions: {
    marginTop: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
