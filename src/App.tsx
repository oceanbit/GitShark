/**
 * @format
 */
import * as React from 'react';
import 'reflect-metadata';
import {createConnection, getConnectionManager} from 'typeorm';
import {Branch, Commit, Remote, Repo} from './entities';
import {Provider as PaperProvider} from 'react-native-paper';

import {SafeAreaView, StatusBar, Alert, ActivityIndicator} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {RepositoryList} from './views/repository-list/repository-list';
import {theme} from './constants/theme';
import {Repository} from './views/repository/repository';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RepoListLoading} from "./components/repo-list-loading/repo-list-loading";

const App = () => {
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
      database: 'test',
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

  const Stack = createStackNavigator();

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        {isDBLoaded ? (
            <RepoListLoading/>
          // <Stack.Navigator headerMode={'none'}>
          //   <Stack.Screen name="RepoList" component={RepositoryList} />
          //   <Stack.Screen name="RepoDetails" component={Repository} />
          // </Stack.Navigator>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        <SafeAreaView />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
