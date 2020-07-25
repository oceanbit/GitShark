import * as React from 'react';
import {theme} from '@constants';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Icon} from '@components/shark-icon';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharkSafeTop} from '@components/shark-safe-top';
import {RenameRepositoryDialog} from '@components/rename-repository-dialog';
import {PushDialog} from './components/push-dialog';
import {FetchDialog} from './components/fetch-dialog';
import {Remotes, RemoteBranch} from '@types';
import {RepoHeaderContext, RepoHeaderDialogType} from '@constants';
import {PushPull} from '@entities';

const Tab = createMaterialBottomTabNavigator();

interface RepositoryUIProps {
  localBranches: string[];
  remoteBranches: RemoteBranch[];
  remotes: Remotes[];
  // Adding as props, since the components they reference
  // Contain app logic, which we want to remove from .ui files
  repoChanges: React.ComponentType<any>;
  repoHistory: React.ComponentType<any>;
  commitActions: React.ComponentType<any>;
  commitDetails: React.ComponentType<any>;
  pushPull: PushPull | null;
  onRename: (newName: string) => void;
  onFetch: (props: {
    remote: Remotes;
    fetchAll: boolean;
    prune: boolean;
  }) => void;
  onPush: (props: {
    destination: RemoteBranch;
    forcePush: boolean;
    branch: string;
  }) => void;
  onPull: () => void;
  currentBranch: string;
  trackedBranch: RemoteBranch | null;
}

export const RepositoryUI = ({
  localBranches,
  remoteBranches,
  remotes,
  repoChanges,
  repoHistory,
  commitActions,
  commitDetails,
  pushPull,
  onRename,
  onFetch,
  onPush,
  onPull,
  currentBranch,
  trackedBranch,
}: RepositoryUIProps) => {
  const [activeDialog, setActiveDialog] = React.useState<RepoHeaderDialogType>(
    '',
  );

  React.useEffect(() => {
    // This is a shortcut to have the `onPull` action togged without having to trigger it with another UI-only dialog
    if (activeDialog === 'pull') {
      onPull();
      setActiveDialog('');
    }
  }, [activeDialog, onPull]);

  const insets = useSafeAreaInsets();

  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
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
          component={repoChanges}
          options={{
            tabBarLabel: 'Changes',
            tabBarIcon: ({color}) => (
              <Icon name="changes" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={repoHistory}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({color}) => (
              <Icon name="history" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }, [
    styles.bottomNav,
    repoHistory,
    repoChanges,
    accent,
    on_surface_secondary,
    insets.bottom,
  ]);

  const Stack = createStackNavigator();

  return (
    <RepoHeaderContext.Provider
      value={{
        setActiveDialog,
        activeDialog,
        pushPull,
      }}>
      <SharkSafeTop isFloating={true}>
        <Stack.Navigator initialRouteName="Repository" headerMode={'none'}>
          <Stack.Screen name="Repository" component={Tabs} />
          <Stack.Screen name="CommitAction" component={commitActions} />
          <Stack.Screen name="CommitDetails" component={commitDetails} />
        </Stack.Navigator>
      </SharkSafeTop>
      <PushDialog
        currentBranch={currentBranch}
        trackedBranch={trackedBranch}
        visible={activeDialog === 'push'}
        onDismiss={props => {
          setActiveDialog('');
          if (props) {
            onPush(props);
          }
        }}
        localBranches={localBranches}
        remoteBranches={remoteBranches}
      />
      <FetchDialog
        visible={activeDialog === 'fetch'}
        onDismiss={props => {
          setActiveDialog('');
          if (props) {
            onFetch(props);
          }
        }}
        remotes={remotes}
      />
      <RenameRepositoryDialog
        visible={activeDialog === 'rename'}
        onDismiss={newName => {
          setActiveDialog('');
          if (newName) {
            onRename(newName);
          }
        }}
      />
    </RepoHeaderContext.Provider>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  bottomNav: {
    backgroundColor: theme.colors.floating_surface,
    borderTopWidth: theme.borders.normal,
    borderTopColor: theme.colors.tint_on_surface_16,
  },
});
