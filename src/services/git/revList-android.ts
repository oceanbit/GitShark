import {NativeModules} from 'react-native';
import {RevListProps} from './revList';
import {jgitToIsoCommit} from '@utils';

export const revListAndroid = async ({
  dir,
  branchName1,
  branchName2,
}: RevListProps) => {
  let {branch1Diff, branch2Diff} = await NativeModules.GitModule.revList(
    dir,
    branchName1,
    branchName2,
  );

  branch1Diff = branch1Diff.map((c: string) => jgitToIsoCommit(c));
  branch2Diff = branch2Diff.map((c: string) => jgitToIsoCommit(c));

  return {
    // What was in "branch 2" but not in branch 1
    branch1Diff,
    // What was in "branch 1" but not in branch 2
    branch2Diff,
  };
};
