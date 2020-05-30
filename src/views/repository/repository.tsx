import * as React from 'react';
import {RepositoryChanges} from '../repository-changes/repository-changes';
import {theme} from '@constants';
import {useRoute} from '@react-navigation/native';
import {RepositoryHistory} from '../repository-history/repository-history';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {CommitAction} from '../commit-action/commit-action';
import {CommitDetails} from '../commit-details/commit-details';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharkSafeTop} from '@components/shark-safe-top';
import {useSelector} from 'react-redux';
import {RootState, findRepo, clearRepo} from '@store';
import {useThunkDispatch} from '@hooks';

const Tab = createMaterialBottomTabNavigator();

export const Repository = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const dispatch = useThunkDispatch();
  const insets = useSafeAreaInsets();

  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  const {params} = useRoute();
  const {repoId} = params! as Record<string, string>;

  React.useEffect(() => {
    dispatch(findRepo(repoId)).then(console.log);

    return () => {
      // When repo is exited, we need to dispatch a clearing of the repo data
      dispatch(clearRepo());
    };
  }, [repoId, dispatch]);

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

  if (!repo) return null;

  return (
    <SharkSafeTop isFloating={true}>
      <Stack.Navigator initialRouteName="Repository" headerMode={'none'}>
        <Stack.Screen name="Repository" component={Tabs} />
        <Stack.Screen name="CommitAction" component={CommitAction} />
        <Stack.Screen name="CommitDetails" component={CommitDetails} />
      </Stack.Navigator>
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
