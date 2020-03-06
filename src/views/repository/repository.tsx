import * as React from 'react';
import {RepositoryChanges} from '../repository-changes/repository-changes';
import {StyleSheet, Alert} from 'react-native';
import {theme} from '../../constants/theme';
import {RepositoryHeader} from '../../components/repository-header/repository-header';
import {RepoContext} from '../../constants/repo-context';
import {useRoute} from '@react-navigation/native';
import {getRepository} from 'typeorm';
import {Repo} from '../../entities';
import {RepositoryHistory} from '../repository-history/repository-history';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export const Repository = () => {
  const {params} = useRoute();
  const {repoId} = params! as Record<string, string>;
  const [repo, setRepo] = React.useState<Repo | null>(null);

  React.useEffect(() => {
    const repoRepository = getRepository(Repo);
    repoRepository
      .findOne(repoId)
      .then(newRepo => {
        if (!newRepo) {
          Alert.alert(
            'There was an issue loading that repository. Please restart the app and try again',
          );
          return;
        }
        setRepo(newRepo!);
        console.log(newRepo);
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

  return (
    <RepoContext.Provider value={contextValue}>
      <RepositoryHeader />
      <Tab.Navigator
        labeled={true}
        shifting={false}
        barStyle={styles.bottomNav}
        inactiveColor={theme.colors.disabled}
        activeColor={theme.colors.accent}>
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
    </RepoContext.Provider>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineColor,
  },
});
