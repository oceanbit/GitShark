import * as React from 'react';
import {cloneRepo} from '@services';
import {ProgressErrorDialog} from '@components/progress-error-dialog';

const pauseToRender = () => new Promise(resolve => setTimeout(resolve, 0));

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
  const [errorStr, setErrorStr] = React.useState('');

  /**
   * The state of the clone itself
   */
  const [loaded, setLoaded] = React.useState(0);
  const [total, setTotal] = React.useState(-1);
  const [phase, setPhase] = React.useState('');

  const cloneRepoCB = React.useCallback(() => {
    setErrorStr('');
    cloneRepo({
      path,
      name,
      uri,
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
  }, [path, name, uri, onDismiss]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }
    cloneRepoCB();
  }, [cloneRepoCB, visible]);

  return (
    <ProgressErrorDialog
      headerStr={'Clone repository'}
      errorBodyText={'There was an error cloning your repository.'}
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
