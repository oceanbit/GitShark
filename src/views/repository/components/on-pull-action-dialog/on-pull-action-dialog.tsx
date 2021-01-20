import * as React from 'react';
import {pull} from '@services';
import {ProgressErrorDialog} from '@components/progress-error-dialog';
import {ReduxRepo} from '@entities';
import {RemoteBranch} from '@types';
import {ThunkDispatchType, useUserData} from '@hooks';
import {phases} from '@constants/hacks';
import {useTranslation} from 'react-i18next';

const pauseToRender = () => new Promise(resolve => setTimeout(resolve, 0));

interface OnPullActionsDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  repo: ReduxRepo;
  dispatch: ThunkDispatchType;
  trackedBranch: RemoteBranch;
}

export const OnPullActionsDialog = ({
  onDismiss,
  visible,
  repo,
  trackedBranch,
  dispatch,
}: OnPullActionsDialogProps) => {
  const {t} = useTranslation();

  const [errorStr, setErrorStr] = React.useState('');

  /**
   * The state of the clone itself
   */
  const [loaded, setLoaded] = React.useState(0);
  const [total, setTotal] = React.useState(-1);
  const [phase, setPhase] = React.useState('');

  const {email, name} = useUserData();

  const fetchCB = React.useCallback(() => {
    setErrorStr('');
    pull({
      branch: repo.currentBranchName,
      dispatch,
      destination: trackedBranch,
      repo,
      email: email || 'pull@gitshark.dev',
      name: name || 'GitShark Pull',
      async onProgress({
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
  }, [repo, dispatch, trackedBranch, email, name, onDismiss]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }
    fetchCB();
  }, [fetchCB, visible]);

  return (
    <ProgressErrorDialog
      headerStr={t('onPullDialogTitle')}
      errorBodyText={t('onPullDialogText')}
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
