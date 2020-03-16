import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '../../constants/fs';
import http from 'isomorphic-git/http/web/index.js';
import {createNewRepo} from './createRepo';

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
  await git.clone({
    fs,
    dir: path,
    url: uri,
    http,
    singleBranch: true,
    depth: 1,
    onProgress,
  });
  return await createNewRepo(path, name);
};
