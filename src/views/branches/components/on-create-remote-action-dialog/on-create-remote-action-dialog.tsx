import * as React from 'react';
import {ProgressErrorDialog} from '@components/progress-error-dialog';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {createRemote} from '@services';
import {useTranslation} from 'react-i18next';

const pauseToRender = () => new Promise(resolve => setTimeout(resolve, 0));

interface OnCreateRemoteActionDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  repo: ReduxRepo;
  remoteName?: string;
  remoteURL?: string;
  dispatch: ThunkDispatchType;
}

export const OnCreateRemoteActionDialog = ({
  onDismiss,
  visible,
  repo,
  remoteName,
  remoteURL,
  dispatch,
}: OnCreateRemoteActionDialogProps) => {
  const {t} = useTranslation();

  const [errorStr, setErrorStr] = React.useState('');

  /**
   * The state of the clone itself
   */
  const [loaded, setLoaded] = React.useState(0);
  const [total, setTotal] = React.useState(-1);
  const [phase, setPhase] = React.useState('');

  const fetchCB = React.useCallback(() => {
    if (!remoteName || !remoteURL) {
      return;
    }

    setErrorStr('');
    createRemote({
      remoteName,
      remoteURL,
      dispatch,
      repo,
      async onProgress({
        phase: progressPhase,
        loaded: progressLoaded,
        total: progressTotal,
      }) {
        setPhase(progressPhase);
        setLoaded(progressLoaded);
        setTotal(progressTotal || 0);
        await pauseToRender();
      },
    })
      .then(() => {
        onDismiss(true);
      })
      .catch((e: Error | string) => {
        setErrorStr((e as Error).message || (e as string));
      });
  }, [remoteName, remoteURL, repo, dispatch, onDismiss]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }
    fetchCB();
  }, [fetchCB, visible]);

  return (
    <ProgressErrorDialog
      headerStr={t('onCreateRemoteDialogTitle')}
      errorBodyText={t('onCreateRemoteDialogText')}
      onDismiss={onDismiss}
      onRetry={() => fetchCB()}
      visible={visible}
      progress={total > 0 ? loaded / total : 0}
      indeterminate={!total}
      bodyText={phase}
      errorStr={errorStr}
    />
  );
};
