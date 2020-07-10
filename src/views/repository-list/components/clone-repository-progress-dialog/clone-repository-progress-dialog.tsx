import * as React from 'react';
import {cloneRepo} from '@services';
import {ProgressErrorDialog} from '@components/progress-error-dialog';

// Note that since we're running isomorphic-git in the main thread, we're competing with React trying to update the UI.
// In order to achieve smooth progress bars, we need to insert a little pause.
// Curiously (perhaps a bug in isomorphic-git? I haven't figured that out yet) when these setTimeouts are added,
// the 'Counting objects' and 'Receiving objects' phases were interleaved, as were
// the 'Compressing objects' and 'Resolving deltas' phases. Since we can't show two progress phases simultaneously
// on a single progress bar, and since they are perfectly in step anyway, we'll just whitelist certain phases.
const phases: {[key: string]: boolean} = {
  'Receiving objects': true,
  'Resolving deltas': true,
  'Analyzing workdir': true,
  'Updating workdir': true,
};

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
