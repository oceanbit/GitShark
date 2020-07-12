import * as React from 'react';

export type RepoHeaderDialogType = 'rename' | 'fetch' | 'push' | '';

interface RepoHeaderDialogContextType {
  activeDialog: RepoHeaderDialogType | null;
  setActiveDialog: (val: RepoHeaderDialogType) => void;
}

export const RepoHeaderDialogContext = React.createContext<
  RepoHeaderDialogContextType
>({
  activeDialog: null,
  setActiveDialog: () => {},
});
