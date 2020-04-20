import * as React from 'react';
import {createConnection, getConnectionManager} from 'typeorm';
import {Branch, Commit, Remote, Repo} from '../entities';
import {Alert} from 'react-native';

export const useLoadDatabase = () => {
  const [isDBLoaded, setIsDBLoaded] = React.useState(false);

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

  return isDBLoaded;
};
