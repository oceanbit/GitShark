import React from 'react';
import {storiesOf} from '@storybook/react';
import {RepositoryListUI} from './repository-list.ui';
import {StorybookProvider} from '@components/storybook-provider';
import {boolean, withKnobs} from '@storybook/addon-knobs';
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

const RepositoryListDemo = ({showRepos}: any) => {
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
      />
    </StorybookProvider>
  );
};

storiesOf('Screens/Repo List', module)
  .addDecorator(withKnobs)
  .add('default styling', () => {
    const showRepos = boolean('Show repos', true);

    return <RepositoryListDemo showRepos={showRepos} />;
  });
