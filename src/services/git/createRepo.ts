import {Repo} from '@entities';
import {getRepoNameFromPath} from '@utils';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';

export const createNewRepo = async (path: string, name?: string) => {
  const newRepo = new Repo();
  const currentBranchName = await git.currentBranch({fs, dir: path});

  if (!currentBranchName) {
    throw 'This path is not a git repository';
  }
  newRepo.currentBranchName = currentBranchName;

  newRepo.name = name || getRepoNameFromPath(path);
  newRepo.path = path;
  newRepo.lastUpdated = new Date(Date.now());
  await newRepo.save();
  return newRepo;
};
