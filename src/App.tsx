import * as React from 'react';
// For typeorm
import 'reflect-metadata';
import {Portal, Provider as PaperProvider} from 'react-native-paper';

import {LogBox, StatusBar} from 'react-native';
import {RepositoryList} from './views/repository-list/repository-list';
import {Repository} from './views/repository/repository';
import {Account} from './views/account/account';
import {Settings} from './views/settings/settings';
import {StagingLayout} from './views/staging-layout/staging-layout';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  darkNavTheme,
  DialogContextProvider,
  lightNavTheme,
  SetDarkModeContext,
  STAGING_STYLE_STORAGE_KEY,
  StagingTypes,
  StyleOfStagingContext,
  UserContext,
} from '@constants';
import {ColorSchemeProvider} from 'react-native-dynamic';
import DefaultPreference from 'react-native-default-preference';
import {
  useGetAndroidPermissions,
  useGitHubUserData,
  useLocalDarkMode,
  useManualUserData,
  useThunkDispatch,
} from '@hooks';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {setupDatabase, store} from '@store';
import ErrorBoundary from 'react-native-error-boundary';

import './services/translations';
import {getSerializedErrorStr} from '@types';
import {ErrorPrompt} from '@components/error-prompt';
import {useTranslation} from 'react-i18next';

LogBox.ignoreLogs([
  /**
   * This is in place due to dependencies. Remove this once dep updates
   * https://github.com/react-navigation/react-navigation/issues/7933#issuecomment-608283552
   */
  'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead.',
  /**
   * I solemnly swear to handle all instances where serializable values are found in the navigation state and to use safegaurds
   * to move users back to places they're familiar with. Right now, this is only used for the commit screen and we move
   * the user back to the history screen if they're deep linked to that location somehow
   * https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
   */
  'Non-serializable values were found in the navigation state',
  'A DynamicStyleSheet was used without any DynamicValues. Consider replacing with a regular StyleSheet.',
]);

const AppBase = () => {
  const dispatch = useThunkDispatch();

  /**
   * Database
   */
  React.useEffect(() => {
    dispatch(setupDatabase());
  }, [dispatch]);

  /**
   * Get user deep linking
   */
  const {
    gitHubUser,
    setUseGithub,
    useGitHub,
    logoutGitHub,
  } = useGitHubUserData();

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

  React.useEffect(() => {
    DefaultPreference.get(STAGING_STYLE_STORAGE_KEY).then(val => {
      if (val) {
        setStyleOfStaging(val as StagingTypes);
      }
    });
  }, []);

  const updateStagingStyle = (val: StagingTypes) => {
    DefaultPreference.set(STAGING_STYLE_STORAGE_KEY, val);
    setStyleOfStaging(val);
  };

  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <StyleOfStagingContext.Provider
        value={{
          styleOfStaging,
          setStyleOfStaging: updateStagingStyle,
        }}>
        <DialogContextProvider>
          <UserContext.Provider
            value={{
              gitHubUser,
              setUseGithub,
              useGitHub,
              manualUser,
              setManualUser,
              logoutGitHub,
            }}>
            <Portal.Host>
              <Stack.Navigator headerMode={'none'}>
                <Stack.Screen name="RepoList" component={RepositoryList} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="StagingLayout" component={StagingLayout} />
                <Stack.Screen name="RepoDetails" component={Repository} />
              </Stack.Navigator>
            </Portal.Host>
          </UserContext.Provider>
        </DialogContextProvider>
      </StyleOfStagingContext.Provider>
    </SafeAreaProvider>
  );
};

const CustomFallback = ({error}: {error: Error}) => {
  const {t} = useTranslation();

  const {errorMessage, callStack} = getSerializedErrorStr(error);

  return (
    <ErrorPrompt
      explainMessage={t('unknownError')}
      errorMessage={errorMessage}
      callStack={callStack}
    />
  );
};

const App = () => {
  const {
    isDarkMode,
    paperTheme,
    updateLocalDarkMode,
    localDarkMode,
  } = useLocalDarkMode();

  return (
    <NavigationContainer theme={isDarkMode ? darkNavTheme : lightNavTheme}>
      <PaperProvider theme={paperTheme}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={'transparent'}
        />
        <SetDarkModeContext.Provider
          value={{
            setDarkMode: updateLocalDarkMode,
            localDarkMode,
          }}>
          <ColorSchemeProvider mode={isDarkMode ? 'dark' : 'light'}>
            <ErrorBoundary FallbackComponent={CustomFallback}>
              <Provider store={store}>
                <AppBase />
              </Provider>
            </ErrorBoundary>
          </ColorSchemeProvider>
        </SetDarkModeContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
