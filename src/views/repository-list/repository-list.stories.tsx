import React from 'react';
import {RepositoryListUI} from './repository-list.ui';
import {StorybookProvider} from '@components/storybook-provider';
import {ReduxRepo} from '@entities';

const mockRepos: ReduxRepo[] = [
  {
    id: 1,
    name: 'GitShark',
    currentBranchName: 'main',
    commitsToPull: ['1'],
    commitsToPush: ['2'],
    path: '/',
    lastUpdated: new Date(),
    commits: [],
  },
  {
    id: 1,
    name: 'batteries-not-included',
    currentBranchName: 'integration',
    commitsToPull: [],
    commitsToPush: ['2', '3'],
    path: '/',
    lastUpdated: new Date(),
    commits: [],
  },
  {
    id: 1,
    name: 'unicorn-utterances',
    currentBranchName: 'deploy',
    commitsToPull: ['1', '2'],
    commitsToPush: [],
    path: '/',
    lastUpdated: new Date(),
    commits: [],
  },
  {
    id: 1,
    name: 'react-native-responsive-ui',
    currentBranchName: 'build',
    commitsToPull: ['1', '2'],
    commitsToPush: ['2', '3'],
    path: '/',
    lastUpdated: new Date(),
    commits: [],
  },
];

interface DefaultArgs {
  showRepos: boolean;
}

const RepositoryListDemo = ({showRepos}: DefaultArgs) => {
  return (
    <StorybookProvider>
      <RepositoryListUI
        isLoading={false}
        isDBLoaded={false}
        navigateToSettings={() => {}}
        repos={showRepos ? mockRepos : []}
        findRepos={() => Promise.resolve()}
        renameRepo={() => {}}
        deleteRepo={() => {}}
        setComponentError={() => {}}
      />
    </StorybookProvider>
  );
};

export default {title: 'Screens/Repo List'};

export const DefaultStyling = (args: DefaultArgs) => {
  return <RepositoryListDemo {...args} />;
};

DefaultStyling.args = {showRepos: false};
