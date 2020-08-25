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
  if (Platform.OS === 'android') {
    console.log('DOING REVLIST ON ANDROID');
    return await revListAndroid({dir, branchName1, branchName2});
  }

  const [branch1Log, branch2Log] = await Promise.all([
    gitLog({
      repo: {
        path: dir,
      },
      ref: branchName1,
    }),
    gitLog({
      repo: {
        path: dir,
      },
      ref: branchName2,
    }),
  ]);

  const [branch1Diff, branch2Diff] = await Promise.all([
    getDiffNumber({
      path: dir,
      logList: branch2Log,
      parentOid: branch1Log[0].oid,
    }),
    getDiffNumber({
      path: dir,
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
