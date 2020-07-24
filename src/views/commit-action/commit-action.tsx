import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {commit} from '@services';
import {useSelector} from 'react-redux';
import {RootState, getGitStatus} from '@store';
import {CommitActionUI} from './commit-action.ui';
import {useThunkDispatch} from '@hooks';
import {useUserData} from '@hooks/use-user';
import {Snackbar} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CommitAction = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const {staged} = useSelector((state: RootState) => state.changes);

  const {email, name} = useUserData();

  const dispatch = useThunkDispatch();

  const history = useNavigation();

  const getUpdate = () => {
    dispatch(getGitStatus());
  };

  const [noUserWarn, setNoUser] = React.useState(false);

  const insets = useSafeAreaInsets();

  const onSubmit = async ({
    commitBody,
    commitTitle,
  }: {
    commitTitle: string;
    commitBody: string;
  }) => {
    if (!email || !name) {
      setNoUser(true);
      return;
    }
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
    <>
      <CommitActionUI
        onSubmit={onSubmit}
        files={staged}
        onClose={() => history.goBack()}
      />
      <Snackbar
        visible={noUserWarn}
        duration={Snackbar.DURATION_MEDIUM}
        onDismiss={() => setNoUser(false)}
        style={{marginBottom: insets.bottom}}
        action={{
          label: 'Fix',
          onPress: () => {
            history.navigate('Account');
          },
        }}>
        You don't have commit author data set
      </Snackbar>
    </>
  );
};
