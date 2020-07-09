import React from 'react';
import {storiesOf} from '@storybook/react';
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
      />
    </StorybookProvider>
  );
};

storiesOf('Screens/Repo Changes', module).add('split view', () => (
  <RepositoryChangesSplitDemo />
));
