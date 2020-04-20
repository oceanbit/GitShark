import * as React from 'react';
import {Linking, Platform} from 'react-native';
import * as queryString from 'query-string';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

export const useGitHubCallback = () => {
  React.useEffect(() => {
    type URLEventFn = Parameters<typeof Linking.removeEventListener>[1];
    const handleOpenURL: URLEventFn = event => {
      if (!event.url) {
        console.log('NO URL');
        return;
      }
      console.log('event.url', event.url);
      const {query} = queryString.parseUrl(event.url);
      if (query.access_token) {
        RNSecureKeyStore.set('ghToken', query.access_token as string, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        }).then(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          },
        );
      }

      // do something with the url, in our case navigate(route)
    };
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        handleOpenURL({url: url!});
      });
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }
    return () => {
      if (Platform.OS !== 'android') {
        Linking.removeEventListener('url', handleOpenURL);
      }
    };
  }, []);
};
