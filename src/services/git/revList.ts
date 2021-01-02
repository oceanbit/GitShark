/**
 * This is a hacky awful implementation of:
 * `git rev-list --count main ^asdf`
 *
 * It's meant to report the difference between two branches (one remote)
 * so that we can easily report "needs to push" and "needs to pull"
 *
 *
 * This is so unacceptably slow OML
 */
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {gitLog} from './gitLog';
import {Platform} from 'react-native';
import {revListAndroid} from './revList-android';
import {logService} from '../debug';
import {getRepoPath} from '@utils';

interface GetDiffNumberProps {
  logList: any[];
  path: string;
  parentOid: string;
}

const getDiffNumber = async ({
  logList,
  path,
  parentOid,
}: GetDiffNumberProps) => {
  const diffArr = [] as string[];
  for (const commit of logList) {
    if (parentOid === commit.oid) {
      // Don't go further down the log tree
      break;
    }
    const isDec = await git.isDescendent({
      fs,
      dir: path,
      oid: parentOid,
      ancestor: commit.oid,
      depth: -1,
    });
    if (isDec) {
      // Don't go further down the log tree
      break;
    }
    diffArr.push(commit.oid);
  }

  return diffArr;
};

export interface RevListProps {
  dir: string;
  branchName1: string;
  branchName2: string;
}

export const revList = async ({
  dir,
  branchName1,
  branchName2,
}: RevListProps) => {
  logService && console.log('service - revList');

  if (Platform.OS === 'android') {
    return await revListAndroid({dir, branchName1, branchName2});
  }

  const repoPath = getRepoPath(dir);

  const [branch1Log, branch2Log] = await Promise.all([
    gitLog({
      repo: {
        path: repoPath,
      },
      ref: branchName1,
    }),
    gitLog({
      repo: {
        path: repoPath,
      },
      ref: branchName2,
    }),
  ]);

  const [branch1Diff, branch2Diff] = await Promise.all([
    getDiffNumber({
      path: repoPath,
      logList: branch2Log,
      parentOid: branch1Log[0].oid,
    }),
    getDiffNumber({
      path: repoPath,
      logList: branch1Log,
      parentOid: branch2Log[0].oid,
    }),
  ]);

  return {
    // What was in "branch 2" but not in branch 1
    branch1Diff,
    // What was in "branch 1" but not in branch 2
    branch2Diff,
  };
};
