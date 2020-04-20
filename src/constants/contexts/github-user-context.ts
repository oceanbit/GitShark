import * as React from 'react';
import {CachedGithubUser} from '../../types';

interface GitHubUserContextType {
  gitHubUser: null | CachedGithubUser;
}

export const GitHubUserContext = React.createContext<GitHubUserContextType>({
  gitHubUser: null,
});
