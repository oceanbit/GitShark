import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {createNewRepo} from './createRepo';
import {getRepoNameFromUri} from '@utils';
import {Platform} from 'react-native';
import {cloneRepoAndroid} from '@services/git/cloneRepo-android';

export interface CloneRepoProps {
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
    return cloneRepoAndroid({path, name, uri, onProgress});
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
       * @see https://github.com/oceanbit-dev/GitShark/issues/33
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
