import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {createNewRepo} from './createRepo';
import {getRepoNameFromUri} from '@utils';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';

interface CloneRepoProps {
  path: string;
  name?: string;
  uri: string;
  onProgress: ProgressCallback;
}

export const cloneRepo = ({path, name, uri, onProgress}: CloneRepoProps) => {
  const newFolderName = getRepoNameFromUri(uri);
  const repoName = name || newFolderName;
  const repoDir = `${path}/${repoName}`;

  if (Platform.OS === 'android') {
    const eventEmitter = new NativeEventEmitter(NativeModules.GitModule);

    const eventListener = eventEmitter.addListener(
      'CloneProgress',
      (event: {phase: string; loaded: number; total: number}) => {
        const {phase, loaded, total} = event;
        onProgress({phase, loaded, total});
      },
    );

    return new Promise((resolve, reject) => {
      NativeModules.GitModule.clone(uri, repoDir)
        .then(() => {
          eventListener.remove();
        })
        .then(() => createNewRepo(repoDir, repoName))
        .then(() => resolve())
        .catch((e: Error) => reject(e));
    });
  }

  /**
   * Please be aware that this code will likely cause `OutOfMemory` errors on mobile platforms
   * As such, this code should be replaced with native `git` wrapper code. This is only here as a temporary safegaurd
   */
  return git
    .clone({
      fs,
      dir: repoDir,
      url: uri,
      http,
      singleBranch: true,
      onProgress,
    })
    .then(() =>
      /**
       * Isomorphic git doesn't fetch as we might expect it to after a clone
       * @see https://github.com/crutchcorn/GitShark/issues/33
       */
      git.fetch({
        fs,
        http,
        dir: repoDir,
        url: uri,
        singleBranch: false,
        prune: false,
        onProgress,
      }),
    )
    .then(() => createNewRepo(repoDir, repoName));
};
