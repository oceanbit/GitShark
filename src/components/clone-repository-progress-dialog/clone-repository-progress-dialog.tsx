import * as React from 'react';
import {
  StyleSheet,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../../constants/theme';
import {AppDialog} from '../dialog/dialog';
import {ErrorMessageBox} from '../error-message-box/error-message-box';
import {cloneRepo} from '../../services/git/cloneRepo';

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
      async onProgress({phase, loaded, total}) {
        if (phases[phase]) {
          console.log(phase, loaded, total);
          setPhase(phase);
          setLoaded(loaded);
          setTotal(total || 0);
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
  }, [path, uri, name]);

  React.useEffect(() => {
    if (!visible) return;
    cloneRepoCB();
  }, [cloneRepoCB, visible]);

  return (
    <>
      {/* The progress dialog */}
      <AppDialog
        visible={visible && !errorStr}
        onDismiss={() => onDismiss(false)}
        title={'Cloning repository'}
        text={phase}
        main={
          <>
            {Platform.OS === 'android' ? (
              <ProgressBarAndroid
                styleAttr="Horizontal"
                style={styles.progressBar}
                progress={total > 0 ? loaded / total : 0}
                indeterminate={!total}
              />
            ) : (
              <ProgressViewIOS
                progress={total > 0 ? loaded / total : 0}
                style={styles.progressBar}
              />
            )}
          </>
        }
      />
      {/* The error dialog */}
      <AppDialog
        visible={visible && !!errorStr}
        onDismiss={() => onDismiss(false)}
        title={'Clone repository'}
        text={'There was an error cloning your repository.'}
        main={<ErrorMessageBox message={errorStr} />}
        actions={
          <Button
            onPress={() => cloneRepoCB()}
            mode="contained"
            color={theme.colors.accent}>
            Retry
          </Button>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    margin: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  progressBar: {
    flex: 1,
  },
});
