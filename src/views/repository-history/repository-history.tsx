import * as React from 'react';
import {useSelector} from 'react-redux';
import {getGitLog, RootState} from '@store';
import {useThunkDispatch} from '@hooks';
import {GitLogCommit} from '@services';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  RepositoryHistoryUI,
  RepositoryHistoryUIProps,
} from './repository-history.ui';
import {Branches} from '../branches';
import {CommitDetails} from '../commit-details/commit-details';
import {mediaQuery, useDimensions} from 'react-native-responsive-ui';
import {theme} from '@constants';
import {createStackNavigator} from '@react-navigation/stack';

const CommitDetailsMobile = React.memo(() => {
  const navigation = useNavigation<any>();

  const {
    params: {commitId},
  } = (useRoute() as any) as {params: {commitId: string}};

  const goBack = () => navigation.goBack();

  const navigateToParent = (parentOid: string) => {
    navigation.push('CommitDetails', {
      commitId: parentOid,
    });
  };

  return (
    <CommitDetails
      commitId={commitId}
      goBack={goBack}
      isMobile={true}
      navigateToParent={navigateToParent}
    />
  );
});

const RepositoryHistoryMobile = React.memo(
  (props: Omit<RepositoryHistoryUIProps, 'sideElement'>) => {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator initialRouteName="RepoHistoryMain" headerMode={'none'}>
        <Stack.Screen name="RepoHistoryMain">
          {() => <RepositoryHistoryUI {...props} sideElement={null} />}
        </Stack.Screen>
        <Stack.Screen name="CommitDetails">
          {() => {
            return <CommitDetailsMobile />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    );
  },
);

export const RepositoryHistory = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const {commits, error: commitsError} = useSelector(
    (state: RootState) => state.commits,
  );
  const dispatch = useThunkDispatch();

  React.useEffect(() => {
    dispatch(getGitLog()).then(({error}: any) => {
      if (error) console.error(error);
    });
  }, [dispatch]);

  const [commitDetailsId, setCommitDetailsId] = React.useState('');

  const {width, height} = useDimensions();

  const isTablet = mediaQuery(
    {minWidth: theme.breakpoints.tablet},
    width,
    height,
  );

  const navigation = useNavigation<any>();

  const onCommitNavigate = React.useCallback(
    (commit: GitLogCommit) => {
      if (isTablet) {
        setCommitDetailsId(commit.oid);
      } else {
        navigation.push('CommitDetails', {
          commitId: commit.oid,
        });
      }
    },
    [isTablet, navigation],
  );

  const topLayer = React.useMemo(() => <Branches />, []);

  const repoHistoryUIProps = React.useMemo(() => {
    return {
      commits: commits,
      onCommitNavigate: onCommitNavigate,
      topLayer: topLayer,
      repo: repo,
      branchName: repo?.currentBranchName || '',
      error: commitsError,
    };
  }, [commits, onCommitNavigate, repo, topLayer, commitsError]);

  if (!isTablet) {
    return <RepositoryHistoryMobile {...repoHistoryUIProps} />;
  }

  return (
    <RepositoryHistoryUI
      {...repoHistoryUIProps}
      sideElement={
        !!commitDetailsId ? (
          <CommitDetails
            commitId={commitDetailsId}
            goBack={() => setCommitDetailsId('')}
            isMobile={false}
            navigateToParent={parentOid => setCommitDetailsId(parentOid)}
          />
        ) : null
      }
    />
  );
};
