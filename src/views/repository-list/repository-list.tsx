import * as React from 'react';
import {Alert} from 'react-native';
import {Repo} from '@entities';
import {getRepository} from 'typeorm';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@store';
import {RepositoryListUI} from './repository-list.ui';

export const RepositoryList = () => {
  const {isLoaded: isDBLoaded} = useSelector(
    (state: RootState) => state.database,
  );

  const history = useNavigation();
  const [repos, setRepos] = React.useState<Repo[] | null>(null);

  const isLoading = !isDBLoaded || !repos;

  const findRepos = React.useCallback(async () => {
    try {
      const repoRepository = getRepository(Repo);
      const foundRepos = await repoRepository.find({});
      setRepos(foundRepos);
      return true; // Indicates this works
    } catch (e) {
      console.error(e);
      Alert.alert('There was an error finding the repos!');
    }
  }, []);

  React.useEffect(() => {
    if (!isDBLoaded) {
      return;
    }
    findRepos();
  }, [findRepos, isDBLoaded]);

  const navigateToSettings = () => {
    history.navigate('Settings');
  };

  return (
    <RepositoryListUI
      isLoading={isLoading}
      isDBLoaded={isDBLoaded}
      navigateToSettings={navigateToSettings}
      repos={repos}
      findRepos={findRepos}
    />
  );
};
