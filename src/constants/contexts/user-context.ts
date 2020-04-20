import * as React from 'react';
import {CachedGithubUser} from '../../types';

interface GitHubUserContextType {
  gitHubUser: null | CachedGithubUser;
  manualEmail: null | string;
  manualName: null | string;
  setEmailAndName: ({name, email}: {email: string; name: string}) => void;
  useGitHub: boolean;
  setUseGithub: (val: boolean) => void;
}

export const UserContext = React.createContext<GitHubUserContextType>({
  gitHubUser: null,
  manualEmail: null,
  manualName: null,
  setEmailAndName: () => {},
  setUseGithub: () => {},
  useGitHub: false,
});
