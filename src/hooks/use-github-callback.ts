import * as React from 'react';
import {Linking, Platform} from 'react-native';
import * as queryString from 'query-string';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {getCurrentUser, getCurrentUserEmails} from '../services';
import DefaultPreference from 'react-native-default-preference';
import {CachedGithubUser} from '../types';
import {GITHUB_STORAGE_KEY, GITHUB_USER_STORAGE_KEY} from '../constants';

export const useGitHubCallback = () => {
  const [gitHubUser, setGitHubUser] = React.useState<CachedGithubUser | null>(
    null,
  );

  /**
   * If the deep link is called by the GH callback, cache the user data
   */
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
            const cachedGHUser: CachedGithubUser = {
              name: data.name,
              avatar_url: data.avatar_url,
              email: data.email,
            };
            setGitHubUser(cachedGHUser);
            return DefaultPreference.set(
              GITHUB_USER_STORAGE_KEY,
              JSON.stringify(cachedGHUser),
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

  /**
   * If data is already cached, set the user on initial load
   */
  React.useEffect(() => {
    DefaultPreference.get(GITHUB_USER_STORAGE_KEY)
      .then(data => {
        if (data) {
          setGitHubUser(JSON.parse(data) as CachedGithubUser);
        }
      })
      .catch(e => console.error(e));
  }, []);

  return gitHubUser;
};
