import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {createNewRepo} from './createRepo';
import {getRepoNameFromUri} from '@utils';

interface CloneRepoProps {
  path: string;
  name?: string;
  uri: string;
  onProgress: ProgressCallback;
}

export const cloneRepo = async ({
  path,
  name,
  uri,
  onProgress,
}: CloneRepoProps) => {
  const newFolderName = getRepoNameFromUri(uri);
  const repoName = name || newFolderName;
  const repoDir = `${path}/${repoName}`;
  await git.clone({
    fs,
    dir: repoDir,
    url: uri,
    http,
    singleBranch: true,
    onProgress,
  });
  /**
   * Isomorphic git doesn't fetch as we might expect it to after a clone
   * @see https://github.com/crutchcorn/GitShark/issues/33
   */
  await git.fetch({
    fs,
    http,
    dir: repoDir,
    url: uri,
    singleBranch: false,
    prune: false,
    onProgress,
  });

  return await createNewRepo(repoDir, repoName);
};
