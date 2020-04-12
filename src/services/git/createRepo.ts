import {Branch, Remote, Repo} from '../../entities';
import {getRepoNameFromPath} from '../../utils';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '../../constants/fs';
import {gitCommitToDBMapper} from './gitCommitToDBMapper';

export const createNewRepo = async (path: string, name?: string) => {
  const newRepo = new Repo();
  const currentBranchName = await git.currentBranch({fs, dir: path});

  if (!currentBranchName) {
    throw 'This path is not a git repository';
  }
  newRepo.currentBranchName = currentBranchName;

  /**
   * Create repo remotes
   */
  const repoRemoteList = await git.listRemotes({fs, dir: path});

  const repoRemotes = repoRemoteList.map(remoteInfo => {
    const remote = new Remote();
    remote.name = remoteInfo.remote;
    remote.url = remoteInfo.url;
    return remote;
  });

  // `cascade: ['insert']` will create these new items
  newRepo.remotes = repoRemotes;

  /**
   * Create branch commits
   */
  const localBranchNames = await git.listBranches({fs, dir: path});

  const localBranchPromiseArr = localBranchNames.map(async localBranchName => {
    // If `undefined`, it's not tracking anything
    const localBranchRemoteName = await git.getConfig({
      fs,
      dir: path,
      path: `branch.${currentBranchName}.remote`,
    });

    const _remoteBranchCommits = await git.log({
      fs,
      dir: path,
      ref: `${localBranchRemoteName}/${localBranchName}`,
    });

    const remoteBranchCommits = _remoteBranchCommits.map(_remoteCommit =>
      gitCommitToDBMapper(_remoteCommit),
    );

    const remoteBranch = new Branch();
    remoteBranch.name = localBranchName;
    remoteBranch.commits = remoteBranchCommits;
    remoteBranch.isLocal = false;
    remoteBranch.associatedRemote = localBranchRemoteName;

    const _localBranchCommits = await git.log({
      fs,
      dir: path,
      ref: localBranchName,
    });

    const localBranchCommits = _localBranchCommits.map(_localCommit =>
      gitCommitToDBMapper(_localCommit),
    );

    const localBranch = new Branch();
    localBranch.name = localBranchName;
    localBranch.commits = localBranchCommits;
    localBranch.isLocal = true;
    localBranch.trackedBranch = remoteBranch;
    return localBranch;
  });

  const localBranchArr = await Promise.all(localBranchPromiseArr);

  newRepo.branches = localBranchArr;

  newRepo.name = name || getRepoNameFromPath(path);
  newRepo.path = path;
  newRepo.lastUpdated = new Date(Date.now());
  await newRepo.save();
  return newRepo;
};
