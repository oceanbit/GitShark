import {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {createNewRepo} from './createRepo';
import {getRepoNameFromUri} from '@utils';
import {NativeEventEmitter, NativeModules} from 'react-native';

interface CloneRepoProps {
  path: string;
  name?: string;
  uri: string;
  onProgress: ProgressCallback;
}

export const cloneRepo = ({path, name, uri, onProgress}: CloneRepoProps) => {
  const eventEmitter = new NativeEventEmitter(NativeModules.GitModule);

  const eventListener = eventEmitter.addListener(
    'CloneProgress',
    (event: {phase: string; loaded: number; total: number}) => {
      const {phase, loaded, total} = event;
      onProgress({phase, loaded, total});
    },
  );

  return new Promise((resolve, reject) => {
    const newFolderName = getRepoNameFromUri(uri);
    const repoName = name || newFolderName;
    const repoDir = `${path}/${repoName}`;

    NativeModules.GitModule.clone(uri, repoDir)
      .then(() => {
        eventListener.remove();
      })
      .then(() => createNewRepo(repoDir, repoName))
      .then(() => resolve())
      .catch((e: Error) => reject(e));
  });
};
