import * as React from 'react';
import {Linking, Platform} from 'react-native';
import * as queryString from 'query-string';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {getCurrentUser, getCurrentUserEmails} from '../services';
import DefaultPreference from 'react-native-default-preference';
import {CachedGithubUser} from '../types/cached-github-user';
import {GITHUB_STORAGE_KEY, GITHUB_USER_STORAGE_KEY} from '../constants';

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
          .then(async () => {
            const token = query.access_token as string;
            const currentUserRequest = await getCurrentUser(token);
            const currentUser = await currentUserRequest.json();
            // If the user has said "don't show email publicly", this is the only way to get their email
            const currentUserEmailsRequest = await getCurrentUserEmails(token);
            const currentUserEmails = await currentUserEmailsRequest.json();
            const userEmail = currentUserEmails.find(email => email.primary);
            return {
              ...currentUser,
              email: userEmail!.email,
            };
          })
          .then(data => {
            return DefaultPreference.set(
              GITHUB_USER_STORAGE_KEY,
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
