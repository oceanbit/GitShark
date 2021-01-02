import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {ThunkDispatchType} from '@hooks';
import {checkoutBranch} from './checkoutBranch';
import {fetch} from './fetch';
import {logService} from '../debug';
import {getRepoPath} from '@utils';

interface CreateRemoteProps {
  repo: ReduxRepo;
  remoteName: string;
  remoteURL: string;
  onProgress: ProgressCallback;
  dispatch: ThunkDispatchType;
}

export const createRemote = async ({
  repo,
  remoteName,
  remoteURL,
  onProgress,
  dispatch,
}: CreateRemoteProps) => {
  logService && console.log('service - createRemote');
  const repoPath = getRepoPath(repo.path);

  await git.addRemote({
    fs,
    dir: repoPath,
    remote: remoteName,
    url: remoteURL,
  });

  await fetch({
    dir: repoPath,
    remote: remoteName,
    fetchAll: true,
    prune: false,
    onProgress,
    repo,
    dispatch,
  });
};
