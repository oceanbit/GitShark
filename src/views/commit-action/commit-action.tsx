import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {commit} from '@services';
import {useSelector} from 'react-redux';
import {RootState, getGitStatus} from '@store';
import {CommitActionUI} from './commit-action.ui';
import {useThunkDispatch} from '@hooks';
import {useUserData} from '@hooks/use-user';

export const CommitAction = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const {staged} = useSelector((state: RootState) => state.changes);

  const {email, name} = useUserData();

  const dispatch = useThunkDispatch();

  const history = useNavigation();

  const getUpdate = () => {
    dispatch(getGitStatus());
  };

  const onSubmit = async ({
    commitBody,
    commitTitle,
  }: {
    commitTitle: string;
    commitBody: string;
  }) => {
    if (!email || !name) return;
    await commit({
      repo: repo!,
      description: commitBody,
      title: commitTitle,
      email,
      name,
    });
    getUpdate();
    history.navigate('Repository');
  };

  return (
    <CommitActionUI
      onSubmit={onSubmit}
      files={staged}
      onClose={() => history.goBack()}
    />
  );
};
