import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {ThunkDispatchType} from '@hooks';
import {checkoutBranch} from './checkoutBranch';
import {fetch} from './fetch';

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
  await git.addRemote({
    fs,
    dir: repo.path,
    remote: remoteName,
    url: remoteURL,
  });

  await fetch({
    dir: repo.path,
    remote: remoteName,
    fetchAll: true,
    prune: false,
    onProgress,
    repo,
    dispatch,
  });
};
