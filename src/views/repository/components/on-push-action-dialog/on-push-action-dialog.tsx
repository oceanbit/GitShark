import * as React from 'react';
import {push} from '@services';
import {ProgressErrorDialog} from '@components/progress-error-dialog';
import {ReduxRepo} from '@entities';
import {RemoteBranch} from '@types';
import {ThunkDispatchType} from '@hooks';
import {phases} from '@constants/hacks';

const pauseToRender = () => new Promise(resolve => setTimeout(resolve, 0));

interface OnPushActionsDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  repo: ReduxRepo;
  data: {
    destination: RemoteBranch;
    forcePush: boolean;
    branch: string;
  };
  dispatch: ThunkDispatchType;
}

export const OnPushActionsDialog = ({
  onDismiss,
  visible,
  repo,
  data,
  dispatch,
}: OnPushActionsDialogProps) => {
  const [errorStr, setErrorStr] = React.useState('');

  /**
   * The state of the clone itself
   */
  const [loaded, setLoaded] = React.useState(0);
  const [total, setTotal] = React.useState(-1);
  const [phase, setPhase] = React.useState('');

  const fetchCB = React.useCallback(() => {
    setErrorStr('');
    push({
      ...data,
      dispatch,
      repo,
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
  }, [data, repo, dispatch, onDismiss]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }
    fetchCB();
  }, [fetchCB, visible]);

  return (
    <ProgressErrorDialog
      headerStr={'Push branch'}
      errorBodyText={'There was an error pushing your branch.'}
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
