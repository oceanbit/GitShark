/**
 * @format
 */
import * as React from 'react';
import 'reflect-metadata';
import {createConnection, getConnectionManager} from 'typeorm';
import {Repo} from './entities';
import {NativeRouter, Route} from 'react-router-native';

import {SafeAreaView, StatusBar, Alert, ActivityIndicator} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {RepositoryList} from './views/repository-list/repository-list';

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
      entities: [Repo],
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

  return (
    <NativeRouter>
      <StatusBar barStyle="dark-content" />
      {isDBLoaded ? (
        <>
          <Route exact path="/" component={RepositoryList} />
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <SafeAreaView />
    </NativeRouter>
  );
};

export default App;
