import {changeBranch} from '@store';
import type {CheckoutBranchProps} from './checkoutBranch';
import {NativeModules} from 'react-native';

export const checkoutBranchAndroid = async ({
  repo,
  branchName,
  dispatch,
  remote,
}: CheckoutBranchProps) => {
  // Absolute path of branchName required, as GitCheckoutModule relies on the full path
  // to base it's decision of cloning locally or remotely
  // Local path
  let fullBranchPath = `refs/heads/${branchName}`;
  // Remote path
  if (remote) {
    fullBranchPath = `refs/remotes/${remote}/${branchName}`;
  }

  await NativeModules.GitCheckoutModule.checkout(repo.path, fullBranchPath, '');

  dispatch(changeBranch({repoId: repo.id, branchName}));
};
