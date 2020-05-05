import * as React from 'react';
import {RepositoryChanges} from '../repository-changes/repository-changes';
import {Alert} from 'react-native';
import {RepoContext, theme} from '../../constants';
import {RepositoryHeader} from '../../components/repository-header';
import {useRoute} from '@react-navigation/native';
import {getRepository} from 'typeorm';
import {Repo} from '../../entities';
import {RepositoryHistory} from '../repository-history/repository-history';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {Commit} from '../commit/commit';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {useSafeArea} from 'react-native-safe-area-context';
import {SharkSafeTop} from '../../components/shark-safe-top';
import {getRepoData} from '../../services/git';

const Tab = createMaterialBottomTabNavigator();

export const Repository = () => {
  const insets = useSafeArea();

  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  const {params} = useRoute();
  const {repoId} = params! as Record<string, string>;
  const [repo, setRepo] = React.useState<Repo | null>(null);

  React.useEffect(() => {
    const repoRepository = getRepository(Repo);
    repoRepository
      .findOne(repoId, {relations: ['branches']})
      .then(newRepo => {
        if (!newRepo) {
          Alert.alert(
            'There was an issue loading that repository. Please restart the app and try again',
          );
          return;
        }
        setRepo(newRepo!);
      })
      .catch(e => {
        console.error(e);
        Alert.alert(
          'There was an issue loading that repository. Please restart the app and try again',
        );
      });
  }, [repoId, setRepo]);

  const contextValue = React.useMemo(
    () => ({
      repo,
      setRepo,
    }),
    [repo, setRepo],
  );

  const Tabs = React.useCallback(() => {
    return (
      <Tab.Navigator
        labeled={true}
        shifting={false}
        barStyle={[styles.bottomNav, {paddingBottom: insets.bottom}]}
        inactiveColor={on_surface_secondary}
        activeColor={accent}>
        <Tab.Screen
          name="Changes"
          component={RepositoryChanges}
          options={{
            tabBarLabel: 'Changes',
            tabBarIcon: ({color}) => (
              <Icon name="file-multiple" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={RepositoryHistory}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({color}) => (
              <Icon name="history" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }, [styles.bottomNav, accent, on_surface_secondary, insets.bottom]);

  const Stack = createStackNavigator();

  return (
    <SharkSafeTop isFloating={true}>
      <RepoContext.Provider value={contextValue}>
        <RepositoryHeader repo={repo!} />
        <Stack.Navigator initialRouteName="Repository" headerMode={'none'}>
          <Stack.Screen name="Repository" component={Tabs} />
          <Stack.Screen name="Commit" component={Commit} />
        </Stack.Navigator>
      </RepoContext.Provider>
    </SharkSafeTop>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  bottomNav: {
    backgroundColor: theme.colors.floating_surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
});
