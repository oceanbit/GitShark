/**
 * @format
 */
import * as React from 'react';
import 'reflect-metadata';
import {createConnection, getConnectionManager} from 'typeorm';
import {Branch, Commit, Remote, Repo} from './entities';
import {Provider as PaperProvider} from 'react-native-paper';

import {SafeAreaView, StatusBar, Alert, YellowBox} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {RepositoryList} from './views/repository-list/repository-list';
import {Repository} from './views/repository/repository';
import {Account} from './views/account/account';
import {Settings} from './views/settings/settings';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DatabaseLoadedContext} from './constants/database-loaded-context';
import {
  lightNavTheme,
  lightPaperTheme,
  darkNavTheme,
  darkPaperTheme,
} from './constants/theme';
import {DarkModeProvider, useDarkMode} from 'react-native-dark-mode';
import DefaultPreference from 'react-native-default-preference';
import {
  StagingTypes,
  StyleOfStagingContext,
} from './constants/style-of-staging-context';

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

const AppBase = () => {
  const isDarkMode = useDarkMode();

  const [isDBLoaded, setIsDBLoaded] = React.useState(false);

  React.useEffect(() => {
    const askedPermission = PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    askedPermission.then(granted => {
      if (
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use external storage');
      } else {
        console.log('External storage permission denied');
      }
    });
  }, []);

  React.useEffect(() => {
    // TODO: Add error handling
    createConnection({
      type: 'react-native',
      database: 'gitshark',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [Branch, Commit, Remote, Repo],
    })
      .then(() => {
        setIsDBLoaded(true);
      })
      .catch(err => {
        if (err.name === 'AlreadyHasActiveConnectionError') {
          const existentConn = getConnectionManager().get('default');
          setIsDBLoaded(true);
          return existentConn;
        }
        Alert.alert(
          "There was an error loading the app's cache. Please restart the app and try again",
        );
        console.error(err);
      });
  }, []);

  const [styleOfStaging, setStyleOfStaging] = React.useState<StagingTypes>(
    'split',
  );

  React.useEffect(() => {
    DefaultPreference.get('styleOfStaging').then(val => {
      if (val) {
        setStyleOfStaging(val as StagingTypes);
      }
    });
  }, []);

  const updateStagingStyle = (val: StagingTypes) => {
    DefaultPreference.set('styleOfStaging', val);
    setStyleOfStaging(val);
  };

  const Stack = createStackNavigator();

  const paperTheme = isDarkMode ? darkPaperTheme : lightPaperTheme;

  return (
    <NavigationContainer theme={isDarkMode ? darkNavTheme : lightNavTheme}>
      <PaperProvider theme={paperTheme}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={paperTheme.colors.background}
        />
        <DatabaseLoadedContext.Provider value={isDBLoaded}>
          <StyleOfStagingContext.Provider
            value={{
              styleOfStaging,
              setStyleOfStaging: updateStagingStyle,
            }}>
            <Stack.Navigator headerMode={'none'}>
              <Stack.Screen name="RepoList" component={RepositoryList} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="RepoDetails" component={Repository} />
            </Stack.Navigator>
          </StyleOfStagingContext.Provider>
        </DatabaseLoadedContext.Provider>
        <SafeAreaView />
      </PaperProvider>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <DarkModeProvider>
      <AppBase />
    </DarkModeProvider>
  );
};

export default App;
