import * as React from 'react';
import {Repo} from '../../entities';

interface RepoContextType {
  repo: Repo | null;
  setRepo: (newRepo: Repo | null) => void;
}

export const RepoContext = React.createContext<RepoContextType>({
  repo: null,
  setRepo: () => {},
});
