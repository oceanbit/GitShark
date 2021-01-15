import * as React from 'react';
import {cloneRepo} from '@services';
import {ProgressErrorDialog} from '@components/progress-error-dialog';
import {useTranslation} from 'react-i18next';

interface CloneRepositoryProgressDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  uri: string;
  path: string;
  name?: string;
}

export const CloneRepositoryProgressDialog = ({
  onDismiss,
  visible,
  path,
  name,
  uri,
}: CloneRepositoryProgressDialogProps) => {
  const {t} = useTranslation();

  const [errorStr, setErrorStr] = React.useState('');

  /**
   * The state of the clone itself
   */
  const [loaded, setLoaded] = React.useState(0);
  const [total, setTotal] = React.useState(-1);
  const [phase, setPhase] = React.useState('');

  const cloneRepoCB = React.useCallback(() => {
    // If URI is "''", it should only be because THIS dialog has closed,
    // but the PARENT dialog has reset the URI to "''" for revalidation
    // Without this in place, we end up running a "clone" in the parent directory
    // That has a URI of "". Very annoying bug to track down
    if (!uri) return;
    setErrorStr('');
    cloneRepo({
      path,
      name,
      uri,
      onProgress({
        phase: progressPhase,
        loaded: progressLoaded,
        total: progressTotal,
      }) {
        setPhase(progressPhase);
        setLoaded(progressLoaded);
        setTotal(progressTotal || 0);
      },
    })
      .then(() => {
        onDismiss(true);
      })
      .catch((e: Error | string) => {
        setErrorStr((e as Error).message || (e as string));
      });
  }, [path, name, uri, onDismiss]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }
    cloneRepoCB();
  }, [cloneRepoCB, visible]);

  return (
    <ProgressErrorDialog
      headerStr={t('cloneProgressDialogTitle')}
      errorBodyText={t('cloneProgressDialogText')}
      onDismiss={onDismiss}
      onRetry={() => cloneRepoCB()}
      visible={visible}
      progress={total > 0 ? loaded / total : 0}
      indeterminate={!total}
      bodyText={phase}
      errorStr={errorStr}
    />
  );
};
