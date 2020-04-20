import * as React from 'react';
import {Linking, Platform} from 'react-native';
import * as queryString from 'query-string';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {getCurrentUser, getCurrentUserEmails} from '../services';
import DefaultPreference from 'react-native-default-preference';
import {CachedGithubUser} from '../types/cached-github-user';
import {GITHUB_STORAGE_KEY} from '../constants';

export const useGitHubCallback = () => {
  React.useEffect(() => {
    type URLEventFn = Parameters<typeof Linking.removeEventListener>[1];
    const handleOpenURL: URLEventFn = event => {
      if (!event.url) {
        return;
      }
      const {query} = queryString.parseUrl(event.url);
      if (query.access_token) {
        RNSecureKeyStore.set(GITHUB_STORAGE_KEY, query.access_token as string, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        })
          .then(() => getCurrentUser(query.access_token as string))
          .then(data => data.json())
          .then(data => {
            return DefaultPreference.set(
              'githubUser',
              JSON.stringify({
                name: data.name,
                avatar_url: data.avatar_url,
                email: data.email,
              } as CachedGithubUser),
            );
          })
          .catch(err =>
            console.error(
              `An error saving your GitHub credentials occured`,
              err,
            ),
          );
      }
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
