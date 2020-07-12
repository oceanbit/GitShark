import * as React from 'react';
import {PushPull} from '@entities';

export type RepoHeaderDialogType = 'rename' | 'fetch' | 'push' | '';

interface RepoHeaderContextType {
  activeDialog: RepoHeaderDialogType | null;
  setActiveDialog: (val: RepoHeaderDialogType) => void;
  pushPull: PushPull | null;
}

export const RepoHeaderContext = React.createContext<RepoHeaderContextType>({
  activeDialog: null,
  setActiveDialog: () => {},
  pushPull: null,
});
