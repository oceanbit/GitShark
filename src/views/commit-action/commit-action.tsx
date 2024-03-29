import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {commit} from '@services';
import {useSelector} from 'react-redux';
import {RootState} from '@store';
import {CommitActionUI} from './commit-action.ui';
import {useThunkDispatch} from '@hooks';
import {useUserData} from '@hooks/use-user';
import {SharkSnackbar} from '@components/shack-snackbar';
import {OnCommitActionsDialog} from './on-commit-action-dialog';
import {Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NavProps} from '@types';

export const CommitAction = () => {
  const {t} = useTranslation();

  const {repo} = useSelector((state: RootState) => state.repository);
  const {staged, error: changesError} = useSelector(
    (state: RootState) => state.changes,
  );

  const {email, name} = useUserData();

  const dispatch = useThunkDispatch();

  const history = useNavigation<NavProps>();

  const [noUserWarn, setNoUser] = React.useState(false);

  const [showCommit, setShowCommit] = React.useState(false);

  const [commitErr, setCommitErr] = React.useState('');

  const onSubmit = async ({
    commitBody,
    commitTitle,
  }: {
    commitTitle: string;
    commitBody: string;
  }) => {
    try {
      if (!email || !name) {
        setNoUser(true);
        return;
      }
      setShowCommit(true);
      Keyboard.dismiss();
      await commit({
        repo: repo!,
        description: commitBody,
        title: commitTitle,
        email,
        name,
        dispatch,
      });
      setShowCommit(false);
      history.navigate('Repository');
    } catch (e) {
      setCommitErr((e as any).message || e);
    }
  };

  return (
    <>
      <CommitActionUI
        onSubmit={onSubmit}
        files={staged}
        error={changesError}
        onClose={() => history.goBack()}
      />
      <SharkSnackbar
        visible={noUserWarn}
        onDismiss={() => setNoUser(false)}
        action={{
          label: t('fixAction'),
          onPress: () => {
            history.navigate('Account');
          },
        }}
        message={t('noAuthorDataSet')}
      />
      <OnCommitActionsDialog visible={showCommit} commitErr={commitErr} />
    </>
  );
};
