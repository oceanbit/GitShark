import * as React from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';
import {ReduxRepo} from '@entities';
import {DialogSelection, ExtendedFabBase} from './types';
import {NewRepoFab} from './new-repo-fab';
import {FabActions} from './fab-actions';
import {theme} from '@constants';
import {ExtendedActionFab} from '@components/extended-action-fab';
import {
  DynamicStyleSheet,
  useDynamicValue,
  ColorSchemeContext,
  useDarkMode,
} from 'react-native-dynamic';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

export interface RepoListExtendedFabProps {
  repos: ReduxRepo[] | null;
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
  const {t} = useTranslation();

  const insets = useSafeAreaInsets();
  const isDark = useDarkMode();

  const styles = useDynamicValue(dynamicStyles);
  const fabBottom = React.useRef(new Animated.Value(16));
  const scale = React.useRef(new Animated.Value(0));
  const windowHeight = Dimensions.get('window').height;

  const newRepoFabCB = React.useCallback(
    (toggleAnimation: ExtendedFabBase['toggleAnimation']) => (
      // I have no idea why this is happening, but without this provider, the `theme` is always set to the system value
      // and will not change when the user toggles in settings. If you're reading this and can figure out why this is,
      // please open a GitHub issue and teach us! <3 :)
      <ColorSchemeContext.Provider value={isDark ? 'dark' : 'light'}>
        <NewRepoFab toggleAnimation={toggleAnimation} />
      </ColorSchemeContext.Provider>
    ),
    [isDark],
  );

  const actionFabCB = React.useCallback(
    (toggleAnimation: ExtendedFabBase['toggleAnimation']) => (
      <ColorSchemeContext.Provider value={isDark ? 'dark' : 'light'}>
        <FabActions
          toggleAnimation={toggleAnimation}
          onSelect={val => setSelectedAction(val)}
        />
      </ColorSchemeContext.Provider>
    ),
    [isDark, setSelectedAction],
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
          {t('noRepos')}
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
    ...theme.textStyles.headline_04,
    color: theme.colors.label_high_emphasis,
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
