import * as React from 'react';
import {Linking, Platform} from 'react-native';
import * as queryString from 'query-string';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {getCurrentUser, getCurrentUserEmails} from '@services';
import DefaultPreference from 'react-native-default-preference';
import {CachedGithubUser} from '@types';
import {
  GITHUB_TOKEN_STORAGE_KEY,
  GITHUB_USER_STORAGE_KEY,
  MANUAL_USER_STORAGE_KEY,
  SHOULD_USE_GITHUB_CREDS_KEY,
} from '@constants';

export const useGitHubUserData = () => {
  const [gitHubUser, setGitHubUser] = React.useState<CachedGithubUser | null>(
    null,
  );

  const [useGitHub, setUseGithubLocal] = React.useState<boolean>(false);

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
        RNSecureKeyStore.set(
          GITHUB_TOKEN_STORAGE_KEY,
          query.access_token as string,
          {
            accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
          },
        )
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
          .then(() => DefaultPreference.get(MANUAL_USER_STORAGE_KEY))
          .then(manualUserJSON => {
            const manualUser = JSON.parse(manualUserJSON);
            /**
             * If the user hasn't added any user info manually, then we just assume
             * that they want to use GH credentials OOTB
             */
            if (!manualUser) {
              setUseGithubLocal(true);
              return DefaultPreference.set(
                SHOULD_USE_GITHUB_CREDS_KEY,
                JSON.stringify(true),
              );
            }
          })
          .catch(err =>
            console.error(
              `An error saving your GitHub credentials occured`,
              err,
            ),
          );
      }
    };
    // If app closes on it's own, then on first load, we need to make sure we weren't receiving a callback
    Linking.getInitialURL().then(url => {
      handleOpenURL({url: url!});
    });
    // This is seemingly un-needed when device has low RAM requirements, but if app persists without closing,
    // this is needed on Android
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  /**
   * If data is already cached, set the user on initial load
   */
  React.useEffect(() => {
    Promise.all([
      DefaultPreference.get(GITHUB_USER_STORAGE_KEY),
      DefaultPreference.get(SHOULD_USE_GITHUB_CREDS_KEY),
    ])
      .then(([userData, useGHData]) => {
        if (userData) {
          setGitHubUser(JSON.parse(userData) as CachedGithubUser);
        }
        if (useGHData) {
          setUseGithubLocal(JSON.parse(useGHData) as boolean);
        }
      })
      .catch(e => console.error(e));
  }, []);

  const setUseGithub = React.useCallback((val: boolean) => {
    DefaultPreference.set(SHOULD_USE_GITHUB_CREDS_KEY, JSON.stringify(val))
      .then(() => setUseGithubLocal(val))
      .catch(e => console.error(e));
  }, []);

  const logoutGitHub = React.useCallback(() => {
    Promise.all([
      DefaultPreference.set(SHOULD_USE_GITHUB_CREDS_KEY, JSON.stringify(false)),
      RNSecureKeyStore.remove(GITHUB_TOKEN_STORAGE_KEY),
    ])
      .then(() => {
        setGitHubUser(null);
        setUseGithubLocal(false);
      })
      .catch(e => console.error(e));
  }, []);

  return {gitHubUser, useGitHub, setUseGithub, logoutGitHub};
};
