import * as React from 'react';
import {Alert} from 'react-native';
import {useThunkDispatch} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {findRepoList, RootState} from '@store';
import {RepositoryListUI} from './repository-list.ui';
import {renameRepo} from '@services';

export const RepositoryList = () => {
  const {isLoaded: isDBLoaded} = useSelector(
    (state: RootState) => state.database,
  );

  const dispatch = useThunkDispatch();

  const {repoList} = useSelector((state: RootState) => state.repoList);

  const history = useNavigation();

  const isLoading = !isDBLoaded || !repoList;

  const findRepos = React.useCallback(async () => {
    try {
      dispatch(findRepoList());
    } catch (e) {
      console.error(e);
      Alert.alert('There was an error finding the repos!');
    }
  }, [dispatch]);

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
      repos={repoList}
      findRepos={findRepos}
      renameRepo={(repo, newName) => {
        renameRepo(repo.id, newName).then(() => findRepos());
      }}
    />
  );
};
