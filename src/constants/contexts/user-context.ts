import * as React from 'react';
import {CachedGithubUser, ManualUser} from '@types';

interface GitHubUserContextType {
  gitHubUser: null | CachedGithubUser;
  manualUser: null | ManualUser;
  setManualUser: (val: ManualUser) => void;
  useGitHub: boolean;
  setUseGithub: (val: boolean) => void;
  logoutGitHub: () => void;
}

export const UserContext = React.createContext<GitHubUserContextType>({
  gitHubUser: null,
  manualUser: null,
  setManualUser: () => {},
  setUseGithub: () => {},
  useGitHub: false,
  logoutGitHub: () => {},
});
