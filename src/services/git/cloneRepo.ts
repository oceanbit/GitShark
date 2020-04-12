import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '../../constants/fs';
import http from 'isomorphic-git/http/web/index.js';
import {createNewRepo} from './createRepo';
import {getRepoNameFromUri} from '../../utils';

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
  return await createNewRepo(repoDir, repoName);
};
