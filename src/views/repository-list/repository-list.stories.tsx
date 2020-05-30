import React from 'react';
import {storiesOf} from '@storybook/react';
import {RepositoryListUI} from './repository-list.ui';

const RepositoryListDemo = ({...props}: any) => {
  return (
    <RepositoryListUI
      isLoading={false}
      isDBLoaded={false}
      navigateToSettings={() => {}}
      repos={[]}
      findRepos={() => Promise.resolve(false)}
    />
  );
};

storiesOf('Screens/Repo List', module).add('default styling', () => (
  <RepositoryListDemo />
));
