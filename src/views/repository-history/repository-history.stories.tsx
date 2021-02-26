import React from 'react';
import {RepositoryHistoryUI} from './repository-history.ui';
import {BranchesUI} from '../branches/branches.ui';
import {StorybookProvider} from '@components/storybook-provider';

const RepositoryListDemo = ({...props}: any) => {
  const topLayer = React.useMemo(
    () => (
      <BranchesUI
        localBranches={[]}
        repo={{currentBranchName: 'master'} as any}
        remotes={[]}
        remoteBranches={[]}
        onBranchRename={() => Promise.resolve()}
        onCheckoutBranch={() => Promise.resolve()}
        onCheckoutRemoteBranch={() => Promise.resolve()}
        onCreateRemote={() => {}}
        onCreateBranch={() => Promise.resolve()}
        onDeleteLocalBranch={() => Promise.resolve()}
      />
    ),
    [],
  );

  return (
    <StorybookProvider>
      <RepositoryHistoryUI
        commits={[]}
        onCommitNavigate={() => {}}
        topLayer={topLayer}
        repo={{} as any}
        branchName={'the_big_branch'}
        error={null}
      />
    </StorybookProvider>
  );
};

export default {title: 'Screens/Repo History'};

export const DefaultStyling = () => <RepositoryListDemo />;
