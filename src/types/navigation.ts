import {StackNavigationProp} from "@react-navigation/stack";

type ScreenNames =
  | 'RepoList'
  | 'Settings'
  | 'Account'
  | 'StagingLayout'
  | 'RepoDetails'
  | 'Repository'
  | 'CommitAction'
  | 'CommitDetails'
  | 'ChangesTab'
  | 'HistoryTab';

// TODO: Improve the typings
export type ScreenOpts = Record<ScreenNames, any>;

export type NavProps = StackNavigationProp<ScreenOpts>;
