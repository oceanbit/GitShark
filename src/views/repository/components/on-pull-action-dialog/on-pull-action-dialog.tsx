import * as React from 'react';
import {pull} from '@services';
import {ProgressErrorDialog} from '@components/progress-error-dialog';
import {ReduxRepo} from '@entities';
import {RemoteBranch} from '@types';
import {ThunkDispatchType, useUserData} from '@hooks';
import {phases} from '@constants/hacks';

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
      email: email!,
      name: name!,
      async onProgress({
        phase: progressPhase,
        loaded: progressLoaded,
        total: progressTotal,
      }) {
        if (phases[progressPhase]) {
          setPhase(progressPhase);
          setLoaded(progressLoaded);
          setTotal(progressTotal || 0);
          await pauseToRender();
        }
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
      headerStr={'Pulling...'}
      errorBodyText={'There was an error pulling from remote.'}
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
