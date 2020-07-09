import React from 'react';
import {storiesOf} from '@storybook/react';
import {RepositoryListUI} from './repository-list.ui';
import {StorybookProvider} from '@components/storybook-provider';

const RepositoryListDemo = ({...props}: any) => {
  return (
    <StorybookProvider>
      <RepositoryListUI
        isLoading={false}
        isDBLoaded={false}
        navigateToSettings={() => {}}
        repos={[]}
        findRepos={() => Promise.resolve()}
      />
    </StorybookProvider>
  );
};

storiesOf('Screens/Repo List', module).add('default styling', () => (
  <RepositoryListDemo />
));
