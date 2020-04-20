import * as React from 'react';
import 'reflect-metadata';
import {Provider as PaperProvider} from 'react-native-paper';

import {SafeAreaView, StatusBar, YellowBox} from 'react-native';
import {RepositoryList} from './views/repository-list/repository-list';
import {Repository} from './views/repository/repository';
import {Account} from './views/account/account';
import {Settings} from './views/settings/settings';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  darkNavTheme,
  darkPaperTheme,
  lightNavTheme,
  lightPaperTheme,
  StagingTypes,
  StyleOfStagingContext,
  DatabaseLoadedContext,
  UserContext,
} from './constants';
import {DarkModeProvider} from 'react-native-dark-mode';
import DefaultPreference from 'react-native-default-preference';
import {
  useGetAndroidPermissions,
  useGitHubUserData,
  useLoadDatabase,
  useSystemDarkMode,
} from './hooks';
import {
  DARK_MODE_STORAGE_KEY,
  DarkModeOptionTypes,
  SetDarkModeContext,
  STAGING_STYLE_STORAGE_KEY,
} from './constants';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {changeBarColors} from 'react-native-immersive-bars';
import {useManualUserData} from './hooks/use-manual-user-data';

YellowBox.ignoreWarnings([
  /**
   * This is in place due to dependencies. Remove this once dep updates
   * https://github.com/react-navigation/react-navigation/issues/7933#issuecomment-608283552
   */
  'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead.',
  /**
   * I solumnly swear to handle all instances where serializable values are found in the navigation state and to use safegaurds
   * to move users back to places they're familiar with. Right now, this is only used for the commit screen and we move
   * the user back to the history screen if they're deep linked to that location somehow
   * https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
   */
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  /**
   * Database
   */
  const isDBLoaded = useLoadDatabase();

  /**
   * Get user deep linking
   */
  const {gitHubUser, setUseGithub, useGitHub} = useGitHubUserData();

  const {manualUser, setManualUser} = useManualUserData();

  /**
   * Get permissions to read/write from SD card
   */
  useGetAndroidPermissions();

  /**
   * User settings
   */
  const [styleOfStaging, setStyleOfStaging] = React.useState<StagingTypes>(
    'split',
  );

  const [localDarkMode, setLocalDarkMode] = React.useState<DarkModeOptionTypes>(
    'auto',
  );
  const isSystemDarkMode = useSystemDarkMode();

  const isDarkMode =
    localDarkMode === 'auto' ? isSystemDarkMode : localDarkMode === 'dark';

  React.useEffect(() => {
    changeBarColors(isDarkMode);
  }, [isDarkMode]);

  React.useEffect(() => {
    DefaultPreference.get(STAGING_STYLE_STORAGE_KEY).then(val => {
      if (val) {
        setStyleOfStaging(val as StagingTypes);
      }
    });
    DefaultPreference.get(DARK_MODE_STORAGE_KEY).then(val => {
      if (val) {
        setLocalDarkMode(val as DarkModeOptionTypes);
      }
    });
  }, []);

  const updateStagingStyle = (val: StagingTypes) => {
    DefaultPreference.set(STAGING_STYLE_STORAGE_KEY, val);
    setStyleOfStaging(val);
  };

  const updateLocalDarkMode = (val: DarkModeOptionTypes) => {
    DefaultPreference.set(DARK_MODE_STORAGE_KEY, val);
    setLocalDarkMode(val);
  };

  const Stack = createStackNavigator();

  const paperTheme = isDarkMode ? darkPaperTheme : lightPaperTheme;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDarkMode ? darkNavTheme : lightNavTheme}>
        <PaperProvider theme={paperTheme}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={'transparent'}
          />
          <DatabaseLoadedContext.Provider value={isDBLoaded}>
            <StyleOfStagingContext.Provider
              value={{
                styleOfStaging,
                setStyleOfStaging: updateStagingStyle,
              }}>
              <SetDarkModeContext.Provider
                value={{
                  setDarkMode: updateLocalDarkMode,
                }}>
                <UserContext.Provider
                  value={{
                    gitHubUser,
                    setUseGithub,
                    useGitHub,
                    manualUser,
                    setManualUser,
                  }}>
                  <DarkModeProvider mode={isDarkMode ? 'dark' : 'light'}>
                    <Stack.Navigator headerMode={'none'}>
                      <Stack.Screen
                        name="RepoList"
                        component={RepositoryList}
                      />
                      <Stack.Screen name="Settings" component={Settings} />
                      <Stack.Screen name="Account" component={Account} />
                      <Stack.Screen name="RepoDetails" component={Repository} />
                    </Stack.Navigator>
                  </DarkModeProvider>
                </UserContext.Provider>
              </SetDarkModeContext.Provider>
            </StyleOfStagingContext.Provider>
          </DatabaseLoadedContext.Provider>
          <SafeAreaView />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
