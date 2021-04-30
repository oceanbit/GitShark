import {NativeEventEmitter, NativeModules} from 'react-native';
import {ProgressCallback} from '@types';

interface PullAndroidProps {
  remote: string;
  remoteRef: string;
  authToken: string;
  onProgress: ProgressCallback;
  path: string;
  forcePush: boolean;
}

export const pushAndroid = ({
  path,
  remote,
  remoteRef,
  authToken,
  forcePush,
  onProgress,
}: PullAndroidProps) => {
  const eventEmitter = new NativeEventEmitter(NativeModules.GitModule);

  const eventListener = eventEmitter.addListener(
    'PushProgress',
    (event: {phase: string; loaded: number; total: number}) => {
      const {phase, loaded, total} = event;
      onProgress({phase, loaded, total});
    },
  );

  return new Promise((resolve, reject) => {
    NativeModules.GitModule.push(path, remote, remoteRef, authToken, forcePush)
      .then(() => {
        eventListener.remove();
      })
      .then(() => resolve())
      .catch((e: Error) => reject(e));
  });
};
