import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '../../constants/fs';
import {getRepoStatus} from './status';

export const getRepoData = async (path: string) => {
  const currentBranchNamePromise = await git.currentBranch({fs, dir: path});

  const gitLogPromise = await git.log({
    fs,
    dir: path,
    ref: currentBranchNamePromise as string,
  });

  const statusPromise = git.statusMatrix({
    fs,
    dir: `${path}`,
  });

  const repoRemoteListPromise = git
    .listRemotes({fs, dir: path})
    .then(async remotes => {
      const remoteBranches = await Promise.all(
        remotes.map(remote =>
          git.listBranches({fs, dir: path, remote: remote.remote}),
        ),
      );
      return {remotes, remoteBranches};
    });
  const localBranchesPromise = git.listBranches({fs, dir: path});

  const [
    {remotes, remoteBranches},
    localBranches,
    gitLog,
    status,
  ] = await Promise.all([
    repoRemoteListPromise,
    localBranchesPromise,
    gitLogPromise,
    statusPromise,
  ]);

  return {
    remotes,
    remoteBranches,
    localBranches,
    gitLog,
    status,
  };
};
