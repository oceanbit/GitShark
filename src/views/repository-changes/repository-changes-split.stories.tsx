import React from 'react';
import {StorybookProvider} from '@components/storybook-provider';
import {StageSplitView} from './components/staging-screen-options';
import {RepositoryHeader} from '@components/repository-header';

const RepositoryChangesSplitDemo = () => {
  const repo = {currentBranchName: 'master'} as any;

  return (
    <StorybookProvider>
      <RepositoryHeader repo={repo} />
      <StageSplitView
        addToStaged={() => Promise.resolve()}
        unstagedChanges={[]}
        removeFromStaged={() => Promise.resolve()}
        stagedChanges={[]}
        onCommit={() => {}}
        onDiscard={() => Promise.resolve()}
        onIgnore={() => Promise.resolve()}
      />
    </StorybookProvider>
  );
};

export default {title: 'Screens/Repo Changes'};

export const SplitView = () => <RepositoryChangesSplitDemo />;
