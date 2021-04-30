import {repositoryReducer} from './repo-slice';
import {combineReducers} from '@reduxjs/toolkit';
import {databaseReducer} from './database-slice';
import {changesReducer} from './git-changes-slice';
import {commitsReducer} from './git-log-slice';
import {branchesReducer} from './git-branches-slice';
import {repoListReducer} from './repo-list-slice';

export const rootReducer = combineReducers({
  changes: changesReducer,
  commits: commitsReducer,
  database: databaseReducer,
  branches: branchesReducer,
  repository: repositoryReducer,
  repoList: repoListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
