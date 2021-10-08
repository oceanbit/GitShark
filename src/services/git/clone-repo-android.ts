import {createNewRepo} from './create-repo';
import {getRepoNameFromUri} from '@utils';
import {NativeEventEmitter, NativeModules} from 'react-native';
import type {CloneRepoProps} from './clone-repo';

export const cloneRepoAndroid = ({
  path,
  name,
  uri,
  onProgress,
}: CloneRepoProps) => {
  const newFolderName = getRepoNameFromUri(uri);
  const repoName = name || newFolderName;
  const repoDir = `${path}/${repoName}`;

  const eventEmitter = new NativeEventEmitter(NativeModules.GitModule);

  const eventListener = eventEmitter.addListener(
    'CloneProgress',
    (event: {phase: string; loaded: number; total: number}) => {
      const {phase, loaded, total} = event;
      onProgress({phase, loaded, total});
    },
  );

  return new Promise<void>((resolve, reject) => {
    NativeModules.GitModule.clone(uri, repoDir)
      .then(() => {
        eventListener.remove();
      })
      .then(() => createNewRepo(repoDir, repoName))
      .then(() => resolve())
      .catch((e: Error) => reject(e));
  });
};
