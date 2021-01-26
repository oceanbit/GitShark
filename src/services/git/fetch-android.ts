import type {FetchProps} from '@services';
import {NativeEventEmitter, NativeModules} from 'react-native';

export const fetchAndroid = async ({
  remote,
  fetchAll,
  prune,
  onProgress,
  repo,
}: FetchProps) => {
  const eventEmitter = new NativeEventEmitter(NativeModules.GitModule);

  const eventListener = eventEmitter.addListener(
    'FetchProgress',
    (event: {phase: string; loaded: number; total: number}) => {
      const {phase, loaded, total} = event;
      onProgress({phase, loaded, total});
    },
  );

  await NativeModules.GitModule.fetch(repo.path, remote, !fetchAll, prune);
  eventListener.remove();
};
