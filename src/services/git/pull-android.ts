import {NativeEventEmitter, NativeModules} from 'react-native';
import {ProgressCallback} from '@types';

interface PullAndroidProps {
  remote: string;
  remoteRef: string;
  authToken: string;
  onProgress: ProgressCallback;
  path: string;
}

export const pullAndroid = ({
  path,
  remote,
  remoteRef,
  authToken,
  onProgress,
}: PullAndroidProps) => {
  const eventEmitter = new NativeEventEmitter(NativeModules.GitModule);

  const eventListener = eventEmitter.addListener(
    'PullProgress',
    (event: {phase: string; loaded: number; total: number}) => {
      const {phase, loaded, total} = event;
      onProgress({phase, loaded, total});
    },
  );

  return new Promise<void>((resolve, reject) => {
    NativeModules.GitModule.pull(path, remote, remoteRef, authToken)
      .then(() => {
        eventListener.remove();
      })
      .then(() => resolve())
      .catch((e: Error) => reject(e));
  });
};
