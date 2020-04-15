import * as React from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';
import {Repo} from '../../../entities';
import {DialogSelection, ExtendedFabBase} from './types';
import {NewRepoFab} from './new-repo-fab';
import {FabActions} from './fab-actions';
import {textStyles, theme} from '../../../constants';
import {ExtendedActionFab} from '../../../components/extended-action-fab';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {useSafeArea} from 'react-native-safe-area-context';

export interface RepoListExtendedFabProps {
  repos: Repo[] | null;
  isDBLoaded: boolean;
  isLoading: boolean;
  setSelectedAction: (val: DialogSelection | '') => void;
}

export const RepoListExtendedFab = ({
  isDBLoaded,
  repos,
  setSelectedAction,
  isLoading,
}: RepoListExtendedFabProps) => {
  const insets = useSafeArea();

  const styles = useDynamicStyleSheet(dynamicStyles);
  const fabBottom = React.useRef(new Animated.Value(16));
  const scale = React.useRef(new Animated.Value(0));
  const windowHeight = Dimensions.get('window').height;

  const newRepoFabCB = React.useCallback(
    (toggleAnimation: ExtendedFabBase['toggleAnimation']) => (
      <NewRepoFab toggleAnimation={toggleAnimation} />
    ),
    [],
  );

  const actionFabCB = React.useCallback(
    (toggleAnimation: ExtendedFabBase['toggleAnimation']) => (
      <FabActions
        toggleAnimation={toggleAnimation}
        onSelect={val => setSelectedAction(val)}
      />
    ),
    [setSelectedAction],
  );

  React.useEffect(() => {
    if (isLoading) {
      Animated.timing(scale.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(scale.current, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isLoading, scale]);

  React.useEffect(() => {
    if (!isDBLoaded) {
      return;
    }
    // There are no repos, show the FAB in the middle of the screen
    if (repos?.length) {
      Animated.timing(fabBottom.current, {
        toValue: 16 + insets.bottom,
        duration: 300,
        useNativeDriver: false,
      }).start();
      // There are repos, show it 16 from the bottom
    } else {
      Animated.timing(fabBottom.current, {
        toValue: windowHeight / 2 - 80 + insets.bottom,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [fabBottom, repos, isDBLoaded, windowHeight, insets]);

  const noReposBotttom = windowHeight / 2 + insets.bottom;

  return (
    <>
      {!isLoading && !repos?.length && (
        <Text style={[styles.noRepos, {bottom: noReposBotttom}]}>
          No repositories
        </Text>
      )}
      <View style={styles.fabview}>
        <ExtendedActionFab
          fab={newRepoFabCB}
          fabActions={actionFabCB}
          fabBottom={fabBottom}
          scale={scale}
        />
      </View>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  noRepos: {
    ...textStyles.headline_01,
    color: theme.colors.on_surface,
    opacity: 0.4,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    // Edgecase for parent padding
    // left: 16,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
