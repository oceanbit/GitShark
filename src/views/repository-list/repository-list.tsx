import * as React from 'react';
import {Alert} from 'react-native';
import {useThunkDispatch} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {findRepoList, RootState} from '@store';
import {RepositoryListUI} from './repository-list.ui';
import {renameRepo, deleteRepo} from '@services';
import {ErrorPrompt} from '@components/error-prompt';
import {useTranslation} from 'react-i18next';

export const RepositoryList = () => {
  const {t} = useTranslation();

  const {isLoaded: isDBLoaded} = useSelector(
    (state: RootState) => state.database,
  );

  const dispatch = useThunkDispatch();

  const {repoList, error: listError} = useSelector(
    (state: RootState) => state.repoList,
  );

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

  if (listError) {
    return <ErrorPrompt explainMessage={t('repoListErrStr')} {...listError} />;
  }

  return (
    <RepositoryListUI
      isLoading={isLoading}
      isDBLoaded={isDBLoaded}
      navigateToSettings={navigateToSettings}
      repos={repoList}
      findRepos={findRepos}
      renameRepo={(repo, newName) => {
        renameRepo({repoId: repo.id, name: newName, dispatch});
      }}
      deleteRepo={repo => deleteRepo(repo).then(() => findRepos())}
    />
  );
};
